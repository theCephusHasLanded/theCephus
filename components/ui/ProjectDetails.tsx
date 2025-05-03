import React from 'react';
import { GitHubRepo } from '@/lib/github';

interface ProjectDetailsProps {
  project: GitHubRepo;
  onClose: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-light dark:bg-dark max-w-3xl w-full rounded-lg shadow-xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <svg className="h-6 w-6 mr-2 text-accent" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h7A2.5 2.5 0 0114 2.5v10.5a.5.5 0 01-.777.416L8 8.101 2.777 13.416A.5.5 0 012 13V2.5z"></path>
            </svg>
            {project.name}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {project.description || 'No description available'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Project Information</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <div>
                    <span className="font-medium">Created:</span> {formatDate(project.created_at)}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <div>
                    <span className="font-medium">Last Updated:</span> {formatDate(project.updated_at)}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <div>
                    <span className="font-medium">Primary Language:</span> {project.language || 'Not specified'}
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">GitHub Stats</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <div>
                    <span className="font-medium">Stars:</span> {project.stargazers_count}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <div>
                    <span className="font-medium">Forks:</span> {project.forks_count}
                  </div>
                </li>
                {project.topics && project.topics.length > 0 && (
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <div>
                      <span className="font-medium">Topics:</span> {project.topics.join(', ')}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            {project.homepage && (
              <a 
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Visit Site
              </a>
            )}
            <a 
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;