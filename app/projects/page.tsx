import { fetchGitHubRepositories, GitHubRepo } from '@/lib/github';
import ProjectGrid from './page-client';

export const metadata = {
  title: 'Projects - Christina Cephus | Software Developer',
  description: 'Explore my GitHub repositories and software projects',
};

// Set revalidate to update the page periodically in production
export const revalidate = 3600; // revalidate every hour

// This function loads data server-side (during build or revalidation)
async function getGitHubProjects() {
  const repos = await fetchGitHubRepositories('theCephusHasLanded'); // Using your actual GitHub username
  
  // Create a fallback in case GitHub API fails
  return repos.length > 0 ? repos : [
    {
      name: 'Portfolio Website',
      description: 'My personal portfolio website built with Next.js and TailwindCSS.',
      html_url: 'https://github.com/github/portfolio',
      language: 'TypeScript',
      topics: ['nextjs', 'tailwindcss'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      pushed_at: new Date().toISOString(),
      stargazers_count: 0,
      forks_count: 0,
      homepage: ''
    },
    {
      name: 'LKHN Universal Wealth',
      description: 'Financial platform with AI-powered wealth management tools.',
      html_url: 'https://github.com/github/lkhn-wealth',
      language: 'JavaScript',
      topics: ['react', 'tailwindcss'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      pushed_at: new Date().toISOString(),
      stargazers_count: 0,
      forks_count: 0,
      homepage: ''
    }
  ];
}

// Main page component - a Server Component
export default async function ProjectsPage() {
  const projects = await getGitHubProjects();

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">My GitHub Projects</h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        Browse through my portfolio of software projects directly imported from GitHub. 
        These projects showcase my skills in software development, web technologies, and more.
        Click on any project to view more details.
      </p>
      
      {/* Pass the server data to the client component */}
      <ProjectGrid initialProjects={projects} />
    </div>
  );
}