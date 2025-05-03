import {
  fetchTopRepositories,
  fetchAllRecentCommits,
  formatDate,
  truncateMessage,
  GitHubCommit
} from '@/lib/github-activity';

export const metadata = {
  title: 'GitHub Activity - Christina Cephus',
  description: 'Recent GitHub repositories and commits by Christina Cephus'
};

export const revalidate = 3600; // Revalidate every hour

export default async function GitHubActivityPage() {
  const username = 'theCephusHasLanded'; // Using your actual GitHub username
  
  // Fetch top 3 repositories and recent commits in parallel
  const [repositories, recentCommits] = await Promise.all([
    fetchTopRepositories(username, 3),
    fetchAllRecentCommits(username, 10)
  ]);

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">My GitHub Activity</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Repositories Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-accent/30">
            Top Repositories
          </h2>
          
          <div className="space-y-6">
            {repositories.length > 0 ? (
              repositories.map((repo: any) => (
                <div key={repo.id} className="card p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    <a 
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors flex items-center"
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h7A2.5 2.5 0 0114 2.5v10.5a.5.5 0 01-.777.416L8 8.101 2.777 13.416A.5.5 0 012 13V2.5zm2.5-1A1.5 1.5 0 003 2.5v9.793l4.777-4.947a.5.5 0 01.723 0L13 12.293V2.5A1.5 1.5 0 0011.5 1h-7z"></path>
                      </svg>
                      {repo.name}
                    </a>
                  </h3>
                  
                  {repo.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {repo.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {repo.language && (
                      <span className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent">
                        {repo.language}
                      </span>
                    )}
                    {(repo.topics?.length > 0) && 
                      repo.topics.slice(0, 3).map((topic: string) => (
                        <span 
                          key={topic} 
                          className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent"
                        >
                          {topic}
                        </span>
                      ))
                    }
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated: {formatDate(repo.updated_at)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">
                No repositories found.
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Commits Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-accent/30">
            Recent Commits
          </h2>
          
          <div className="space-y-4">
            {recentCommits.length > 0 ? (
              recentCommits.map((commit: GitHubCommit) => (
                <a 
                  key={commit.sha}
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block card p-4 hover:shadow-cyber transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs bg-accent/10 rounded px-2 py-1">
                      {commit.sha.substring(0, 7)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(commit.commit.author.date)}
                    </span>
                  </div>
                  
                  <p className="font-medium mb-2">
                    {truncateMessage(commit.commit.message)}
                  </p>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Repository: <span className="text-accent">{commit.repository.name}</span>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">
                No recent commits found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}