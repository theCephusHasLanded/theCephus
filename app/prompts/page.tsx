export const metadata = {
  title: 'Prompts - Christina Cephus | Software Developer',
  description: 'Browse my collection of AI prompts for various applications',
};

import CyberTabs from '@/components/ui/CyberTabs';

export default function PromptsPage() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 terminal-text">AI Prompt Collection</h1>
      
      <p className="text-lg text-sepia-300 mb-8 max-w-3xl">
        As a prompt engineer, I've designed and refined these prompts to extract maximum value from AI tools like ChatGPT, 
        Claude, and other large language models. Feel free to use them in your own projects!
      </p>
      
      <div className="mb-12">
        <CyberTabs tabs={[
          {
            id: 'all',
            label: 'All Prompts',
            content: <PromptCollection filter="all" />
          },
          {
            id: 'creative',
            label: 'Creative',
            content: <PromptCollection filter="creative" />
          },
          {
            id: 'business',
            label: 'Business',
            content: <PromptCollection filter="business" />
          },
          {
            id: 'technical',
            label: 'Technical',
            content: <PromptCollection filter="technical" />
          },
        ]} />
      </div>
    </div>
  );
}

type PromptCollectionProps = {
  filter: string;
};

function PromptCollection({ filter }: PromptCollectionProps) {
  // Filter prompts based on the selected category
  const filteredPrompts = filter === 'all' 
    ? prompts 
    : prompts.filter(prompt => prompt.tags.includes(filter));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPrompts.map((prompt, index) => (
        <div key={index} className="cyber-card h-full">
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold terminal-text">{prompt.title}</h3>
            </div>
            <p className="text-sepia-300 text-sm mb-4">
              {prompt.description}
            </p>
            <div className="bg-sepia-900/50 border border-accent/20 p-3 rounded-md text-xs font-mono text-sepia-200 overflow-hidden mb-4">
              {prompt.content}
            </div>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent animate-pulse-slow">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Sample prompts data
const prompts = [
  {
    title: "Ultra-Fast Content Writer",
    description: "Generate highly optimized content that's ready to publish with minimal editing",
    content: "I need you to write [content type] about [topic] for [audience]. The tone should be [tone] and it should include [specific elements]. The content should be optimized for [purpose] and no longer than [length]. Make it engaging, factually accurate, and ready to publish with minimal editing.",
    tags: ["marketing", "content", "professional", "business"]
  },
  {
    title: "Code Debugger's Assistant",
    description: "Help identify and fix bugs in your code with detailed explanations",
    content: "I'm debugging an issue in my [language] code. Here's what's happening: [describe the bug]. The expected behavior is [expected behavior]. Here's the relevant code:\n\n```\n[paste your code here]\n```\n\nPlease help me identify the cause of the bug and suggest a fix with explanation.",
    tags: ["technical", "programming", "debugging"]
  },
  {
    title: "AI App Architect",
    description: "Get detailed architectural plans for AI-powered applications",
    content: "Design an architecture for an AI-powered [type of application] that solves [problem]. The application should include [specific features] and be built using [technologies/frameworks]. Please provide:\n\n1. Overall system architecture\n2. Key components and their interactions\n3. Data flow diagram\n4. API specifications\n5. Considerations for scalability and performance\n6. Potential challenges and solutions",
    tags: ["technical", "architecture", "AI"]
  },
  {
    title: "Executive Briefing Creator",
    description: "Generate concise, professional executive summaries on any topic",
    content: "Create an executive briefing on [topic/issue/trend]. The briefing should be concise but comprehensive, and include:\n\n1. Executive summary (3-4 sentences)\n2. Key findings or developments (bullet points)\n3. Strategic implications\n4. Recommendations\n5. Next steps or action items\n\nFormat it professionally and ensure it can be read in under 5 minutes.",
    tags: ["business", "professional", "executive"]
  },
  {
    title: "Modern UI Component Generator",
    description: "Generate clean, professional UI components with React and Tailwind CSS",
    content: "Create a [component type] component using React and Tailwind CSS. The component should:\n\n1. Be responsive and mobile-friendly\n2. Follow modern design principles\n3. Include [specific features/functionality]\n4. Handle [specific edge cases/states]\n5. Be accessible (WCAG compliant)\n\nProvide the complete TSX code with TypeScript props interface and comments explaining key design decisions.",
    tags: ["technical", "UI/UX", "React"]
  },
  {
    title: "AI Strategy Advisor",
    description: "Get strategic advice on implementing AI solutions in your business",
    content: "I'm looking to implement AI solutions in [specific business area] for [company type/size]. Our goals are [business goals] and our current challenges include [challenges]. Our current tech stack includes [technologies].\n\nPlease provide a strategic implementation plan that includes:\n\n1. Recommended AI solutions and technologies\n2. Implementation roadmap (phases)\n3. Required resources and potential ROI\n4. Risks and mitigation strategies\n5. Success metrics and KPIs",
    tags: ["business", "strategy", "AI"]
  },
  {
    title: "Creative Story Starter",
    description: "Get help starting your next creative writing piece with engaging character and plot elements",
    content: "I want to write a [genre] story with the following elements: [specific elements]. The main character is [character description] and the setting is [setting description]. Please provide me with:\n\n1. An engaging opening paragraph\n2. Three potential plot directions\n3. A unique twist or conflict to add depth\n4. Two supporting character ideas\n5. Suggested themes to explore",
    tags: ["creative", "writing", "storytelling"]
  }
];