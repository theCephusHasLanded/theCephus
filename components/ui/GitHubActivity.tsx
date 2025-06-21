'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  GitHubActivityData, 
  fetchGitHubActivity, 
  formatRelativeTime, 
  formatNumber, 
  getEventInfo,
  truncateMessage 
} from '@/lib/github-activity';
import Typography from '@/components/ui/Typography';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface GitHubActivityProps {
  username: string;
  pollInterval?: number; // in milliseconds, default 5 minutes
  className?: string;
}

export default function GitHubActivity({ 
  username, 
  pollInterval = 5 * 60 * 1000, // 5 minutes
  className = ''
}: GitHubActivityProps) {
  const [data, setData] = useState<GitHubActivityData>({
    user: null,
    repos: [],
    events: [],
    lastUpdated: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const activityData = await fetchGitHubActivity(username);
      
      if (activityData.error) {
        setError(activityData.error);
      } else {
        setData(activityData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [username]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Setup polling
  useEffect(() => {
    if (pollInterval > 0) {
      const interval = setInterval(() => {
        fetchData(true);
      }, pollInterval);

      return () => clearInterval(interval);
    }
  }, [fetchData, pollInterval]);

  const handleManualRefresh = () => {
    fetchData(true);
  };

  if (loading) {
    return (
      <div className={`glow-card p-8 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-glow-primary/20 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-glow-primary/20 rounded w-1/2"></div>
              <div className="h-3 bg-glow-secondary/20 rounded w-3/4"></div>
            </div>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-glow-primary/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`glow-card p-8 border-red-500/30 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <Typography variant="subhead" color="primary" className="mb-2">
            Failed to load GitHub data
          </Typography>
          <Typography variant="body" color="secondary" className="mb-4">
            {error}
          </Typography>
          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded text-glow-primary hover:bg-glow-primary/30 transition-colors disabled:opacity-50"
          >
            {refreshing ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  const { user, repos, events, lastUpdated } = data;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* User Profile Section */}
      {user && (
        <ScrollReveal>
          <div className="glow-card p-8 relative overflow-hidden">
            <div className="flex items-start space-x-6">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-20 h-20 rounded-full border-2 border-glow-primary/30"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Typography variant="subhead" color="primary" className="text-glow-subtle">
                    {user.name || user.login}
                  </Typography>
                  <button
                    onClick={handleManualRefresh}
                    disabled={refreshing}
                    className="text-glow-secondary hover:text-glow-primary transition-colors disabled:opacity-50"
                    title="Refresh GitHub data"
                  >
                    <span className={`text-lg ${refreshing ? 'animate-spin' : ''}`}>🔄</span>
                  </button>
                </div>
                
                {user.bio && (
                  <Typography variant="body" color="secondary" className="mb-4">
                    {user.bio}
                  </Typography>
                )}
                
                <div className="flex flex-wrap gap-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-glow-primary">📚</span>
                    <Typography variant="caption" color="secondary">
                      {formatNumber(user.public_repos)} repos
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-glow-secondary">👥</span>
                    <Typography variant="caption" color="secondary">
                      {formatNumber(user.followers)} followers
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-glow-primary">👤</span>
                    <Typography variant="caption" color="secondary">
                      {formatNumber(user.following)} following
                    </Typography>
                  </div>
                </div>
                
                <Typography variant="caption" color="secondary" className="opacity-60">
                  Last updated: {formatRelativeTime(lastUpdated)}
                </Typography>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Recent Activity Section */}
      {events.length > 0 && (
        <ScrollReveal delay={100}>
          <div className="glow-card p-8">
            <Typography variant="subhead" color="primary" className="mb-6 text-glow-subtle">
              Recent Activity
            </Typography>
            
            <div className="space-y-4">
              {events.slice(0, 8).map((event, index) => {
                const eventInfo = getEventInfo(event.type);
                
                return (
                  <div 
                    key={event.id} 
                    className="flex items-start space-x-4 p-4 bg-glow-primary/5 rounded-lg border border-glow-primary/10 hover:border-glow-primary/20 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-xl">{eventInfo.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Typography variant="body" color="primary" className="font-medium">
                          {eventInfo.description}
                        </Typography>
                        <Typography variant="caption" color="secondary" className="opacity-60">
                          {formatRelativeTime(event.created_at)}
                        </Typography>
                      </div>
                      
                      <Typography variant="caption" color="secondary" className="mb-2">
                        {event.repo.name}
                      </Typography>
                      
                      {event.type === 'PushEvent' && event.payload.commits && (
                        <div className="space-y-1">
                          {event.payload.commits.slice(0, 2).map((commit: any, i: number) => (
                            <Typography key={i} variant="caption" color="secondary" className="block opacity-80">
                              • {truncateMessage(commit.message, 60)}
                            </Typography>
                          ))}
                          {event.payload.commits.length > 2 && (
                            <Typography variant="caption" color="secondary" className="opacity-60">
                              +{event.payload.commits.length - 2} more commits
                            </Typography>
                          )}
                        </div>
                      )}
                      
                      {event.type === 'CreateEvent' && event.payload.ref_type && (
                        <Typography variant="caption" color="secondary" className="opacity-80">
                          Created {event.payload.ref_type}: {event.payload.ref || 'main'}
                        </Typography>
                      )}
                      
                      {event.type === 'PullRequestEvent' && event.payload.pull_request && (
                        <Typography variant="caption" color="secondary" className="opacity-80">
                          #{event.payload.pull_request.number}: {truncateMessage(event.payload.pull_request.title, 50)}
                        </Typography>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Top Repositories Section */}
      {repos.length > 0 && (
        <ScrollReveal delay={200}>
          <div className="glow-card p-8">
            <Typography variant="subhead" color="primary" className="mb-6 text-glow-subtle">
              Recent Repositories
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.slice(0, 6).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-glow-secondary/5 rounded-lg border border-glow-secondary/10 hover:border-glow-secondary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Typography variant="body" color="primary" className="font-medium group-hover:text-glow-secondary transition-colors">
                      {repo.name}
                    </Typography>
                    <div className="flex items-center space-x-3 text-sm">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center space-x-1 text-yellow-400">
                          <span>⭐</span>
                          <span>{formatNumber(repo.stargazers_count)}</span>
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center space-x-1 text-glow-primary">
                          <span>🍴</span>
                          <span>{formatNumber(repo.forks_count)}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {repo.description && (
                    <Typography variant="caption" color="secondary" className="mb-3 opacity-80">
                      {truncateMessage(repo.description, 80)}
                    </Typography>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {repo.language && (
                      <span className="px-2 py-1 bg-glow-primary/20 rounded text-xs text-glow-primary">
                        {repo.language}
                      </span>
                    )}
                    <Typography variant="caption" color="secondary" className="opacity-60">
                      Updated {formatRelativeTime(repo.updated_at)}
                    </Typography>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}