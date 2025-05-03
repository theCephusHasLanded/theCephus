export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
}

export async function fetchGitHubRepositories(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.log(`GitHub API returned status ${response.status} for user ${username}`);
      // Return fallback data instead of throwing
      return getFallbackRepositories();
    }

    const repos = await response.json();
    return repos as GitHubRepo[];
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return getFallbackRepositories();
  }
}

// Provide realistic fallback data for demo purposes
function getFallbackRepositories(): GitHubRepo[] {
  return [
    {
      name: 'Portfolio Website',
      description: 'My personal portfolio website built with Next.js and TailwindCSS.',
      html_url: 'https://github.com/theCephusHasLanded/portfolio',
      homepage: 'https://portfolio-demo.vercel.app',
      language: 'TypeScript',
      topics: ['nextjs', 'tailwindcss', 'portfolio'],
      created_at: '2023-01-15T12:00:00Z',
      updated_at: '2023-04-20T15:30:00Z',
      pushed_at: '2023-04-20T15:30:00Z',
      stargazers_count: 12,
      forks_count: 3,
    },
    {
      name: 'LKHN Universal Wealth',
      description: 'Financial platform with AI-powered wealth management tools.',
      html_url: 'https://github.com/theCephusHasLanded/lkhn-wealth',
      homepage: 'https://lkhn-wealth.vercel.app',
      language: 'JavaScript',
      topics: ['react', 'tailwindcss', 'finance', 'ai'],
      created_at: '2022-11-05T10:15:00Z',
      updated_at: '2023-03-18T09:45:00Z',
      pushed_at: '2023-03-18T09:45:00Z',
      stargazers_count: 24,
      forks_count: 7,
    },
    {
      name: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with real-time inventory management.',
      html_url: 'https://github.com/theCephusHasLanded/ecommerce',
      homepage: 'https://demo-ecommerce.vercel.app',
      language: 'TypeScript',
      topics: ['react', 'node', 'mongodb', 'ecommerce'],
      created_at: '2022-08-10T14:20:00Z',
      updated_at: '2023-02-25T11:10:00Z',
      pushed_at: '2023-02-25T11:10:00Z',
      stargazers_count: 18,
      forks_count: 5,
    }
  ];
}

// Helper function to get tech stack based on repository language and topics
export function getTechStack(repo: GitHubRepo): string[] {
  const techStack: string[] = [];
  
  // Add primary language if available
  if (repo.language) {
    techStack.push(repo.language);
  }
  
  // Add relevant topics (limit to 3 total technologies)
  if (repo.topics && repo.topics.length > 0) {
    const relevantTopics = repo.topics
      .filter(topic => 
        !topic.includes('project') && 
        !topic.includes('portfolio') &&
        !techStack.includes(topic)
      )
      .slice(0, 3 - techStack.length);
    
    techStack.push(...relevantTopics);
  }
  
  // Ensure we have some tech tags even if none are specified
  if (techStack.length === 0) {
    const fillerTech = ['JavaScript', 'CSS', 'HTML'].filter(tech => 
      tech.toLowerCase() !== repo.language?.toLowerCase()
    ).slice(0, 2);
    
    techStack.push(...fillerTech);
  }
  
  // Format topic names (capitalize, replace hyphens with spaces)
  return techStack.map(tech => 
    tech.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}