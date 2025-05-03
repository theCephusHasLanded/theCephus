export const metadata = {
  title: 'Contact - Christina Cephus | Software Developer',
  description: 'Get in touch to discuss projects, collaborations, or consulting opportunities',
};

export default function ContactPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Interested in working together? Have questions about AI solutions or software development? 
          I'd love to hear from you. Feel free to reach out to discuss projects, collaborations, or just to connect.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white dark:bg-secondary rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:contact@thecephus.dev" className="text-accent hover:underline">contact@thecephus.dev</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                </svg>
                <div>
                  <h3 className="font-medium">GitHub</h3>
                  <a 
                    href="https://github.com/thecephushaslanded" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    github.com/thecephushaslanded
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-medium">Work Inquiries</h3>
                  <p className="text-gray-600 dark:text-gray-400">Open for freelance and consulting opportunities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-secondary rounded-lg shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">Quick Message</h2>
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Contact form functionality will be implemented soon. In the meantime, please reach out via email or GitHub.
              </p>
              <a 
                href="mailto:contact@thecephus.dev" 
                className="btn btn-primary inline-block"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <h2 className="text-xl font-semibold mb-4">Looking Forward to Connecting!</h2>
          <p className="text-gray-600 dark:text-gray-400">
            I typically respond within 24-48 hours. Let's create something amazing together!
          </p>
        </div>
      </div>
    </div>
  );
}