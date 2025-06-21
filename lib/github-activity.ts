export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  repository: {
    name: string;
    html_url: string;
  };
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  company?: string;
  location?: string;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: any;
  public: boolean;
  created_at: string;
}

export interface GitHubActivityData {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  events: GitHubEvent[];
  lastUpdated: string;
  error?: string;
}

// Helper function to get GitHub API headers with optional auth
function getGitHubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App'
  };
  
  // Add auth token if available (for higher rate limits)
  if (typeof window !== 'undefined') {
    // Client-side: get from environment or local storage
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
  } else {
    // Server-side: get from environment
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
  }
  
  return headers;
}

// Fetch GitHub user profile data (no caching)
export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: getGitHubHeaders(),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

// Fetch top repositories for a user (no caching)
export async function fetchTopRepositories(username: string, count: number = 6): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${count}&type=owner`,
      {
        headers: getGitHubHeaders(),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// Fetch recent public events for a user (no caching)
export async function fetchGitHubEvents(username: string, count: number = 10): Promise<GitHubEvent[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=${count}`,
      {
        headers: getGitHubHeaders(),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub events:', error);
    return [];
  }
}

// Fetch recent commits from a specific repository (no caching)
export async function fetchRepoCommits(username: string, repo: string, count: number = 5): Promise<GitHubCommit[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=${count}`,
      {
        headers: getGitHubHeaders(),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits = await response.json();
    
    // Add repository information to each commit
    return commits.map((commit: any) => ({
      ...commit,
      repository: {
        name: repo,
        html_url: `https://github.com/${username}/${repo}`
      }
    }));
  } catch (error) {
    console.error(`Error fetching commits for ${repo}:`, error);
    return [];
  }
}

// Fetch all GitHub activity data for a user
export async function fetchGitHubActivity(username: string): Promise<GitHubActivityData> {
  try {
    const [user, repos, events] = await Promise.all([
      fetchGitHubUser(username),
      fetchTopRepositories(username, 6),
      fetchGitHubEvents(username, 15)
    ]);

    return {
      user,
      repos,
      events,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return {
      user: null,
      repos: [],
      events: [],
      lastUpdated: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Fetch recent commits across all repositories (legacy function)
export async function fetchAllRecentCommits(username: string, count: number = 10): Promise<GitHubCommit[]> {
  try {
    // First, get the top repositories
    const repos = await fetchTopRepositories(username, 5);
    
    if (repos.length === 0) {
      return getFallbackCommits();
    }
    
    // Fetch commits from each repository
    const commitsPromises = repos.map(repo => 
      fetchRepoCommits(username, repo.name, 5)
    );
    
    // Wait for all commit requests to complete
    const commitsArrays = await Promise.all(commitsPromises);
    
    // Flatten the array of arrays and sort by date
    const allCommits = commitsArrays
      .flat()
      .sort((a, b) => 
        new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
      );
    
    // Return the most recent commits
    return allCommits.length > 0 ? allCommits.slice(0, count) : getFallbackCommits();
  } catch (error) {
    console.error('Error fetching all recent commits:', error);
    return getFallbackCommits();
  }
}

// Provide fallback commit data for demonstration
function getFallbackCommits(): GitHubCommit[] {
  return [
    {
      sha: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
      commit: {
        message: 'Add responsive design for mobile devices',
        author: {
          name: 'Christina Cephus',
          date: '2023-04-18T14:22:10Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/portfolio/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e',
      repository: {
        name: 'Portfolio Website',
        html_url: 'https://github.com/theCephusHasLanded/portfolio'
      }
    },
    {
      sha: 'a5054b1c2d7f7b09c3a0671792c008e7db898d6e',
      commit: {
        message: 'Implement dark mode toggle with local storage persistence',
        author: {
          name: 'Christina Cephus',
          date: '2023-04-15T10:31:45Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/portfolio/commit/a5054b1c2d7f7b09c3a0671792c008e7db898d6e',
      repository: {
        name: 'Portfolio Website',
        html_url: 'https://github.com/theCephusHasLanded/portfolio'
      }
    },
    {
      sha: 'c3d0be41ecbe669545ee3e94d31ed9a4bc91ee3c',
      commit: {
        message: 'Fix currency conversion bug in financial calculator',
        author: {
          name: 'Christina Cephus',
          date: '2023-04-10T16:45:22Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth/commit/c3d0be41ecbe669545ee3e94d31ed9a4bc91ee3c',
      repository: {
        name: 'LKHN Universal Wealth',
        html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth'
      }
    },
    {
      sha: 'fb940a3f36d0bc6511c68cf2b894abd00e5bda68',
      commit: {
        message: 'Add investment portfolio visualization component',
        author: {
          name: 'Christina Cephus',
          date: '2023-04-08T09:15:30Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth/commit/fb940a3f36d0bc6511c68cf2b894abd00e5bda68',
      repository: {
        name: 'LKHN Universal Wealth',
        html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth'
      }
    },
    {
      sha: '038bb51e9d6901b982c5f73ee52d8e383c894508',
      commit: {
        message: 'Optimize product image loading with lazy loading and blur placeholders',
        author: {
          name: 'Christina Cephus',
          date: '2023-04-05T11:27:15Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/ecommerce/commit/038bb51e9d6901b982c5f73ee52d8e383c894508',
      repository: {
        name: 'E-Commerce Platform',
        html_url: 'https://github.com/theCephusHasLanded/ecommerce'
      }
    },
    {
      sha: '23ead94b9a1d76b9f6d85ba987b499f9f0aae717',
      commit: {
        message: 'Implement real-time inventory tracking with socket.io',
        author: {
          name: 'Christina Cephus',
          date: '2023-04-03T15:42:18Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/ecommerce/commit/23ead94b9a1d76b9f6d85ba987b499f9f0aae717',
      repository: {
        name: 'E-Commerce Platform',
        html_url: 'https://github.com/theCephusHasLanded/ecommerce'
      }
    },
    {
      sha: 'cf21ae5f1dafe99236d9fc3fe83f745fe25e89a1',
      commit: {
        message: 'Add end-to-end tests for checkout workflow',
        author: {
          name: 'Christina Cephus',
          date: '2023-04-01T13:56:40Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/ecommerce/commit/cf21ae5f1dafe99236d9fc3fe83f745fe25e89a1',
      repository: {
        name: 'E-Commerce Platform',
        html_url: 'https://github.com/theCephusHasLanded/ecommerce'
      }
    },
    {
      sha: 'bc9b43a8cb6cfa125a56f84f17e489a7cd10410d',
      commit: {
        message: 'Update API documentation with new endpoints',
        author: {
          name: 'Christina Cephus',
          date: '2023-03-28T09:12:35Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/portfolio/commit/bc9b43a8cb6cfa125a56f84f17e489a7cd10410d',
      repository: {
        name: 'Portfolio Website',
        html_url: 'https://github.com/theCephusHasLanded/portfolio'
      }
    },
    {
      sha: 'e45fd392c22a48ad3e12438a2af49b2a86eb2a36',
      commit: {
        message: 'Add AI-powered investment recommendation engine',
        author: {
          name: 'Christina Cephus',
          date: '2023-03-25T14:30:20Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth/commit/e45fd392c22a48ad3e12438a2af49b2a86eb2a36',
      repository: {
        name: 'LKHN Universal Wealth',
        html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth'
      }
    },
    {
      sha: 'a8d6f363f2edb48f8de4da5c64d8d568773eae4b',
      commit: {
        message: 'Fix mobile responsiveness issues in dashboard',
        author: {
          name: 'Christina Cephus',
          date: '2023-03-22T11:15:00Z'
        }
      },
      html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth/commit/a8d6f363f2edb48f8de4da5c64d8d568773eae4b',
      repository: {
        name: 'LKHN Universal Wealth',
        html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth'
      }
    }
  ];
}

// Format date to a readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Truncate commit message to a reasonable length
export function truncateMessage(message: string, maxLength: number = 80): string {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
}

// Get event type icon and description
export function getEventInfo(eventType: string): { icon: string; description: string; color: string } {
  switch (eventType) {
    case 'PushEvent':
      return { icon: '📝', description: 'Pushed commits', color: 'text-glow-primary' };
    case 'CreateEvent':
      return { icon: '🎉', description: 'Created repository', color: 'text-glow-secondary' };
    case 'WatchEvent':
      return { icon: '⭐', description: 'Starred repository', color: 'text-yellow-400' };
    case 'ForkEvent':
      return { icon: '🍴', description: 'Forked repository', color: 'text-glow-primary' };
    case 'IssuesEvent':
      return { icon: '🐛', description: 'Opened issue', color: 'text-red-400' };
    case 'PullRequestEvent':
      return { icon: '🔀', description: 'Pull request', color: 'text-glow-secondary' };
    case 'ReleaseEvent':
      return { icon: '🚀', description: 'Released version', color: 'text-green-400' };
    case 'PublicEvent':
      return { icon: '🌐', description: 'Made repository public', color: 'text-blue-400' };
    default:
      return { icon: '📊', description: 'Activity', color: 'text-accent' };
  }
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return formatDate(dateString);
  }
}

// Format numbers with K/M suffixes
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}