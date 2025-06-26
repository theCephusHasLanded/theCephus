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
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-light dark:bg-dark max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] rounded-lg shadow-xl overflow-hidden relative my-2 sm:my-0">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-1rem)] sm:max-h-none">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center pr-8">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-accent flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h7A2.5 2.5 0 0114 2.5v10.5a.5.5 0 01-.777.416L8 8.101 2.777 13.416A.5.5 0 012 13V2.5z"></path>
            </svg>
            <span className="break-words">{project.name}</span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            {project.description || 'No description available'}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 sm:mb-6">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Project Information</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2 flex-shrink-0">•</span>
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium">Created:</span> <span className="break-words">{formatDate(project.created_at)}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 flex-shrink-0">•</span>
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium">Last Updated:</span> <span className="break-words">{formatDate(project.updated_at)}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 flex-shrink-0">•</span>
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium">Primary Language:</span> <span className="break-words">{project.language || 'Not specified'}</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">GitHub Stats</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2 flex-shrink-0">•</span>
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium">Stars:</span> {project.stargazers_count}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 flex-shrink-0">•</span>
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium">Forks:</span> {project.forks_count}
                  </div>
                </li>
                {project.topics && project.topics.length > 0 && (
                  <li className="flex items-start">
                    <span className="text-accent mr-2 flex-shrink-0">•</span>
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium">Topics:</span> <span className="break-words">{project.topics.join(', ')}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
            {project.homepage && (
              <a 
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 text-center"
              >
                Visit Site
              </a>
            )}
            <a 
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;