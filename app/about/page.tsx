export const metadata = {
  title: 'About - Christina Cephus | Software Developer',
  description: 'Learn more about my background and expertise in AI and software development',
};

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">About Me</h1>
        
        <div className="space-y-8 text-lg">
          <p className="text-gray-700 dark:text-gray-300">
            I'm <span className="font-semibold">Christina Cephus</span>, known online as <span className="font-semibold text-accent">theCephus</span>. 
            I'm a software developer specializing in ultra-fast shipped content and AI-engineered web applications. 
            With deep expertise in building intelligent, user-centered software, I create solutions that deliver exceptional user experiences while solving complex problems.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12">My Journey</h2>
          <p className="text-gray-700 dark:text-gray-300">
            My fascination with technology and artificial intelligence has driven my professional journey. 
            I've developed advanced skills in rapid development and deployment, focusing on creating applications 
            that leverage AI capabilities to deliver maximum value with minimal latency.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300">
            I'm particularly passionate about the intersection of AI and user experience, finding ways to 
            create software that feels intuitive and responsive while harnessing sophisticated machine learning capabilities.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12">Professional Expertise</h2>
          <p className="text-gray-700 dark:text-gray-300">
            In my professional career, I've developed expertise in:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Building AI-powered web applications with React, Next.js, and modern JavaScript frameworks
            </li>
            <li>
              Designing ultra-fast content delivery systems with optimized performance
            </li>
            <li>
              Creating prompt engineering solutions to extract maximum value from AI language models
            </li>
            <li>
              Developing intuitive user interfaces for complex AI-driven applications
            </li>
            <li>
              Implementing wealth management and financial technology platforms
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-12">Projects</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Some of my notable projects include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Ultra Fast Content Engine</span> - An AI-powered system for generating optimized content with minimal latency
            </li>
            <li>
              <span className="font-medium">LKHN Universal Wealth</span> - Financial platform with AI-powered wealth management tools
            </li>
            <li>
              <span className="font-medium">Final Mile Astro Logistics</span> - Space logistics optimization using advanced AI algorithms
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-12">Let's Connect</h2>
          <p className="text-gray-700 dark:text-gray-300">
            I'm always interested in discussing new projects, AI developments, or potential collaborations. 
            Whether you have a specific project in mind or just want to chat about technology and AI, 
            don't hesitate to reach out through the <a href="/contact" className="text-accent hover:underline">contact page</a> 
            or connect with me on <a href="https://github.com/thecephushaslanded" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </div>
      </div>
    </div>
  );
}