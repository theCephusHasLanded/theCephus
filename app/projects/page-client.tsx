'use client';

import { useState } from 'react';
import { GitHubRepo, getTechStack } from '@/lib/github';
import ProjectDetails from '@/components/ui/ProjectDetails';

// Client component that will receive the server data
export default function ProjectGrid({ initialProjects }: { initialProjects: GitHubRepo[] }) {
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(null);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialProjects.map((project: GitHubRepo) => {
          const techStack = getTechStack(project);
          return (
            <div 
              key={project.name}
              onClick={() => setSelectedProject(project)}
              className="card card-hover border border-gray-100 dark:border-gray-800 h-full overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description || 'No description available'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {techStack.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Show GitHub stats */}
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                  <div className="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {project.stargazers_count}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {project.forks_count}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}