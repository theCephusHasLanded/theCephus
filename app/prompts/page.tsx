export const metadata = {
  title: 'AI Prompts - Christina Cephus | Prompt Engineering Expertise',
  description: 'Curated collection of Claude 4-level AI prompts for creative, technical, and business applications',
};

import EditorialCard from '@/components/ui/EditorialCard';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function PromptsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 md:py-40">
        <div className="container-custom">
          <div className="asymmetric-grid items-start">
            <ScrollReveal>
              <Typography variant="display" color="primary" className="mb-6" balance>
                AI Prompt Engineering Collection
              </Typography>
              
              <Typography variant="body-lg" color="secondary" className="leading-relaxed mb-8">
                Meticulously crafted prompts designed for Claude 4, GPT-4, and other advanced language models. 
                Each prompt leverages modern AI capabilities for superior reasoning, creativity, and task execution.
              </Typography>
              
              <Button variant="outline" size="lg" href="#prompts">
                Explore Prompts
              </Button>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="bg-secondary border border-subtle p-8 rounded-lg">
                <Typography variant="subhead" color="primary" className="mb-4">
                  Prompt Engineering Philosophy
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  Modern AI systems require sophisticated prompt design that combines clear instruction, 
                  contextual awareness, and systematic thinking patterns.
                </Typography>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Prompts Collection */}
      <section id="prompts" className="py-32 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <header className="mb-16">
              <Typography variant="headline" color="primary" className="mb-4">
                Curated Prompt Library
              </Typography>
              <Typography variant="body-lg" color="secondary" className="max-w-3xl leading-relaxed">
                Each prompt is optimized for Claude 4's advanced reasoning capabilities, 
                including chain-of-thought processing, multi-step analysis, and contextual understanding.
              </Typography>
            </header>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {prompts.map((prompt, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <EditorialCard variant="default" className="h-full group">
                  <div className="flex items-start justify-between mb-6">
                    <Typography 
                      variant="subhead" 
                      color="primary" 
                      className="group-hover:text-accent transition-colors duration-300"
                    >
                      {prompt.title}
                    </Typography>
                    <span className="text-caption text-secondary bg-primary/10 px-3 py-1 rounded-full">
                      Claude 4
                    </span>
                  </div>
                  
                  <Typography variant="body" color="secondary" className="mb-6 leading-relaxed">
                    {prompt.description}
                  </Typography>
                  
                  <div className="bg-primary border border-subtle p-6 rounded-lg mb-6 overflow-hidden">
                    <Typography variant="caption" color="secondary" className="font-mono leading-relaxed whitespace-pre-wrap">
                      {prompt.content}
                    </Typography>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {prompt.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 text-caption rounded-full bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="minimal" className="ml-4">
                      Copy →
                    </Button>
                  </div>
                </EditorialCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-32">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <Typography variant="headline" color="primary" className="mb-8 text-center">
                Prompt Engineering Best Practices
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EditorialCard variant="minimal">
                  <Typography variant="subhead" color="primary" className="mb-4">
                    Context & Clarity
                  </Typography>
                  <Typography variant="body" color="secondary" className="leading-relaxed">
                    Provide comprehensive context and clear instructions. Claude 4 excels with detailed, 
                    well-structured prompts that define the task, desired output format, and success criteria.
                  </Typography>
                </EditorialCard>
                
                <EditorialCard variant="minimal">
                  <Typography variant="subhead" color="primary" className="mb-4">
                    Chain-of-Thought
                  </Typography>
                  <Typography variant="body" color="secondary" className="leading-relaxed">
                    Leverage Claude's reasoning capabilities by requesting step-by-step analysis, 
                    asking for work to be shown, and encouraging systematic problem-solving approaches.
                  </Typography>
                </EditorialCard>
                
                <EditorialCard variant="minimal">
                  <Typography variant="subhead" color="primary" className="mb-4">
                    Role Definition
                  </Typography>
                  <Typography variant="body" color="secondary" className="leading-relaxed">
                    Define specific expertise roles (architect, strategist, editor) to activate 
                    domain-specific knowledge and professional communication patterns.
                  </Typography>
                </EditorialCard>
                
                <EditorialCard variant="minimal">
                  <Typography variant="subhead" color="primary" className="mb-4">
                    Output Specification
                  </Typography>
                  <Typography variant="body" color="secondary" className="leading-relaxed">
                    Clearly specify desired output format, length, tone, and structure. 
                    Include examples when possible to ensure consistent, high-quality results.
                  </Typography>
                </EditorialCard>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// Enhanced prompts optimized for Claude 4's capabilities
const prompts = [
  {
    title: "Advanced System Architect",
    description: "Leverage Claude 4's reasoning for comprehensive system design with security, scalability, and maintainability considerations",
    content: `Act as a senior software architect with 15+ years of experience. I need you to design a [system type] for [use case] that handles [scale/requirements].

Please think through this systematically:

1. **Requirements Analysis**: Break down functional and non-functional requirements
2. **Architecture Design**: Propose a scalable, maintainable architecture
3. **Technology Stack**: Recommend specific technologies with justifications
4. **Security Considerations**: Identify potential vulnerabilities and mitigation strategies
5. **Performance Optimization**: Suggest performance bottlenecks and solutions
6. **Deployment Strategy**: Outline CI/CD pipeline and infrastructure needs

For each section, explain your reasoning and provide alternative approaches where applicable. Consider cost, complexity, and team expertise in your recommendations.`,
    tags: ["technical", "architecture", "systems", "advanced"]
  },
  {
    title: "Strategic Business Analyst",
    description: "Utilize Claude 4's analytical capabilities for comprehensive business strategy and market analysis",
    content: `You are a strategic business consultant with deep expertise in [industry]. I need a comprehensive analysis for [business challenge/opportunity].

Please structure your analysis as follows:

1. **Situation Assessment**: Current state analysis with SWOT framework
2. **Market Dynamics**: Competitive landscape, trends, and opportunities
3. **Strategic Options**: 3-5 viable strategic approaches with pros/cons
4. **Financial Implications**: Revenue impact, cost analysis, ROI projections
5. **Implementation Roadmap**: Phased approach with timelines and milestones
6. **Risk Assessment**: Key risks with mitigation strategies
7. **Success Metrics**: KPIs and measurement framework

For each recommendation, provide data-driven reasoning and consider both short-term and long-term implications. Include assumptions and suggest validation methods.`,
    tags: ["business", "strategy", "analysis", "advanced"]
  },
  {
    title: "Creative Writing Catalyst",
    description: "Harness Claude 4's creativity and narrative understanding for sophisticated creative writing assistance",
    content: `I'm working on a [genre] piece set in [setting/time period] exploring themes of [themes]. The protagonist is [character description] facing [central conflict].

Please help me develop this story with your creative expertise:

1. **Narrative Structure**: Suggest a compelling story arc with key plot points
2. **Character Development**: Create a character web with motivations, flaws, and growth arcs
3. **World Building**: Develop rich, consistent details about the setting and its rules
4. **Dialogue Samples**: Write 2-3 dialogue exchanges that reveal character and advance plot
5. **Thematic Integration**: Show how themes can be woven throughout the narrative
6. **Stylistic Approach**: Recommend narrative techniques and writing style choices
7. **Opening Hook**: Craft 2-3 alternative opening paragraphs

Consider literary devices, pacing, and emotional resonance. Explain your creative choices and how they serve the overall narrative goals.`,
    tags: ["creative", "writing", "storytelling", "advanced"]
  },
  {
    title: "Technical Documentation Specialist",
    description: "Use Claude 4's clarity and structure for creating professional, comprehensive technical documentation",
    content: `Act as a technical documentation expert. I need comprehensive documentation for [project/system/API]. The audience is [target audience] with [skill level].

Please create documentation that includes:

1. **Executive Summary**: High-level overview for stakeholders
2. **Architecture Overview**: System components, data flow, and integrations
3. **Setup & Installation**: Step-by-step installation with prerequisites
4. **API Reference**: Complete endpoint documentation with examples
5. **Usage Patterns**: Common use cases with code examples
6. **Troubleshooting Guide**: Common issues and solutions
7. **Maintenance Procedures**: Regular maintenance tasks and schedules

For each section:
- Use clear, concise language appropriate for the audience
- Include practical examples and code snippets
- Provide visual aids recommendations (diagrams, flowcharts)
- Ensure documentation is maintainable and version-controlled

Focus on usability and discoverability. The documentation should enable users to be productive quickly while serving as a comprehensive reference.`,
    tags: ["technical", "documentation", "professional", "advanced"]
  },
  {
    title: "Product Strategy Designer",
    description: "Leverage Claude 4's product thinking for comprehensive product strategy and user experience design",
    content: `You are a senior product strategist working on [product type] for [target market]. The goal is [business objective] while solving [user problem].

Please develop a comprehensive product strategy:

1. **User Research Insights**: Persona development and user journey mapping
2. **Problem-Solution Fit**: Clear problem definition and solution hypothesis
3. **Feature Prioritization**: Core features vs. nice-to-haves with reasoning
4. **Go-to-Market Strategy**: Launch approach, positioning, and competitive differentiation
5. **Success Metrics**: OKRs and success criteria for each development phase
6. **Technical Feasibility**: High-level technical requirements and constraints
7. **Roadmap Planning**: 6-month and 18-month product evolution

Consider user psychology, market dynamics, and technical constraints. Provide data collection strategies to validate assumptions and measure success. Include risk mitigation for key product decisions.`,
    tags: ["product", "strategy", "UX", "advanced"]
  },
  {
    title: "AI Implementation Consultant",
    description: "Utilize Claude 4's AI knowledge for strategic AI adoption and implementation planning",
    content: `Act as an AI strategy consultant helping [organization type] implement AI solutions for [business area]. Current state: [current situation and capabilities].

Provide a comprehensive AI implementation strategy:

1. **AI Readiness Assessment**: Evaluate data quality, infrastructure, and organizational readiness
2. **Use Case Identification**: Prioritized AI opportunities with impact/effort matrix
3. **Technology Stack**: Recommended AI tools, platforms, and frameworks
4. **Implementation Phases**: Detailed roadmap with pilot projects and scaling strategy
5. **Team & Skills**: Required roles, training needs, and change management
6. **Ethics & Governance**: AI ethics framework, bias detection, and compliance
7. **ROI & Measurement**: Success metrics, cost-benefit analysis, and performance tracking

Consider industry best practices, regulatory requirements, and organizational culture. Address common implementation challenges and provide change management strategies. Include vendor evaluation criteria and build vs. buy recommendations.`,
    tags: ["AI", "strategy", "implementation", "advanced"]
  },
  {
    title: "Content Strategy Architect",
    description: "Harness Claude 4's content understanding for comprehensive content strategy and creation frameworks",
    content: `I need a comprehensive content strategy for [business/brand] targeting [audience] to achieve [business goals]. Current content challenges: [specific challenges].

Develop a strategic content framework:

1. **Content Audit**: Assess current content performance and gaps
2. **Audience Segmentation**: Detailed buyer personas and content preferences
3. **Content Pillars**: Core themes and messaging architecture
4. **Channel Strategy**: Platform-specific content approaches and distribution
5. **Content Calendar**: Editorial planning with seasonal and evergreen content
6. **Production Workflow**: Content creation, review, and publishing processes
7. **Performance Framework**: Analytics, optimization, and success measurement

For each content type, provide:
- Optimal format and length
- Distribution timing and frequency
- Engagement tactics and calls-to-action
- Repurposing opportunities across channels

Consider SEO, brand voice, and resource constraints. Include templates and guidelines for consistent execution.`,
    tags: ["content", "marketing", "strategy", "advanced"]
  }
];