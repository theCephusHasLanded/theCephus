// Prompt Templates System

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  useCase: string;
  template: string;
  systemPrompt?: string;
  variables: TemplateVariable[];
  examples: TemplateExample[];
  tags: string[];
  estimatedTokens: number;
  recommendedModels: string[];
}

export interface TemplateVariable {
  name: string;
  description: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  required: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface TemplateExample {
  title: string;
  description: string;
  variables: Record<string, string>;
  expectedOutput: string;
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  // Coding Templates
  {
    id: 'code-review',
    name: 'Code Review Assistant',
    category: 'coding',
    description: 'Get detailed code reviews with suggestions for improvement',
    icon: '🔍',
    difficulty: 'intermediate',
    useCase: 'Code quality improvement and learning',
    template: `You are an expert software engineer with 10+ years of experience conducting code reviews.

Please review the following {{language}} code:

\`\`\`{{language}}
{{code}}
\`\`\`

Context: {{context}}

Focus Areas:
- Code quality and best practices
- Performance optimization
- Security vulnerabilities
- Maintainability and readability
- {{focus_area}}

Please provide:
1. Overall assessment (rating 1-10)
2. Specific issues found with line references
3. Suggested improvements with code examples
4. Best practices recommendations
5. Performance considerations

Format your response with clear sections and code examples where helpful.`,
    systemPrompt: 'You are an expert software engineer specializing in code reviews. Be thorough, constructive, and educational in your feedback.',
    variables: [
      {
        name: 'language',
        description: 'Programming language',
        type: 'select',
        required: true,
        options: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'C#', 'Other']
      },
      {
        name: 'code',
        description: 'Code to review',
        type: 'textarea',
        required: true,
        placeholder: 'Paste your code here...',
        validation: { maxLength: 5000 }
      },
      {
        name: 'context',
        description: 'Context about the code purpose',
        type: 'textarea',
        required: true,
        placeholder: 'What does this code do? What are you trying to achieve?'
      },
      {
        name: 'focus_area',
        description: 'Specific focus area',
        type: 'select',
        required: false,
        options: ['Performance', 'Security', 'Testing', 'Architecture', 'Error handling'],
        defaultValue: 'Performance'
      }
    ],
    examples: [
      {
        title: 'React Component Review',
        description: 'Review a React functional component',
        variables: {
          language: 'JavaScript',
          code: 'const UserCard = ({ user }) => {\n  return (\n    <div className="card">\n      <h2>{user.name}</h2>\n      <p>{user.email}</p>\n    </div>\n  );\n};',
          context: 'This is a simple user card component that displays user information',
          focus_area: 'Performance'
        },
        expectedOutput: 'Detailed review with PropTypes suggestions, optimization tips, and accessibility improvements'
      }
    ],
    tags: ['code-review', 'debugging', 'best-practices'],
    estimatedTokens: 800,
    recommendedModels: ['claude-3-5-sonnet-20241022', 'gpt-4-turbo', 'deepseek-coder']
  },

  {
    id: 'api-documentation',
    name: 'API Documentation Generator',
    category: 'coding',
    description: 'Generate comprehensive API documentation',
    icon: '📚',
    difficulty: 'beginner',
    useCase: 'Creating clear API documentation',
    template: `You are a technical writer specializing in API documentation.

Generate comprehensive documentation for the following API endpoint:

**Endpoint**: {{method}} {{endpoint}}
**Purpose**: {{purpose}}
**Authentication**: {{auth_type}}

Include the following sections:
1. Overview and purpose
2. Request format with parameters
3. Response format with examples
4. Error codes and handling
5. Code examples in {{languages}}
6. Rate limiting information
7. Best practices for implementation

Make the documentation clear, complete, and developer-friendly with practical examples.`,
    variables: [
      {
        name: 'method',
        description: 'HTTP method',
        type: 'select',
        required: true,
        options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
      },
      {
        name: 'endpoint',
        description: 'API endpoint path',
        type: 'text',
        required: true,
        placeholder: '/api/v1/users/{id}'
      },
      {
        name: 'purpose',
        description: 'What this endpoint does',
        type: 'textarea',
        required: true,
        placeholder: 'Retrieves user information by ID'
      },
      {
        name: 'auth_type',
        description: 'Authentication method',
        type: 'select',
        required: true,
        options: ['Bearer Token', 'API Key', 'OAuth 2.0', 'Basic Auth', 'None']
      },
      {
        name: 'languages',
        description: 'Programming languages for examples',
        type: 'text',
        required: false,
        defaultValue: 'JavaScript, Python, cURL',
        placeholder: 'JavaScript, Python, cURL'
      }
    ],
    examples: [
      {
        title: 'User API Documentation',
        description: 'Document a user retrieval endpoint',
        variables: {
          method: 'GET',
          endpoint: '/api/v1/users/{id}',
          purpose: 'Retrieves detailed information about a specific user',
          auth_type: 'Bearer Token',
          languages: 'JavaScript, Python, cURL'
        },
        expectedOutput: 'Complete API documentation with examples and error handling'
      }
    ],
    tags: ['documentation', 'api', 'technical-writing'],
    estimatedTokens: 600,
    recommendedModels: ['claude-3-5-sonnet-20241022', 'gpt-4-turbo', 'gemini-1.5-pro']
  },

  // Writing Templates
  {
    id: 'blog-post-writer',
    name: 'SEO Blog Post Writer',
    category: 'writing',
    description: 'Create engaging, SEO-optimized blog posts',
    icon: '✍️',
    difficulty: 'intermediate',
    useCase: 'Content marketing and blogging',
    template: `You are an expert content writer and SEO specialist with extensive experience in {{industry}} content.

Write a comprehensive blog post on: "{{title}}"

Target Audience: {{audience}}
Word Count: {{word_count}} words
Tone: {{tone}}
Primary Keyword: {{primary_keyword}}
Secondary Keywords: {{secondary_keywords}}

Structure Requirements:
1. Compelling headline and introduction
2. {{sections}} main sections with H2 headers
3. Clear subheadings (H3) within sections
4. Practical examples and actionable insights
5. Strong conclusion with call-to-action

SEO Requirements:
- Include primary keyword in title, first paragraph, and conclusion
- Naturally incorporate secondary keywords throughout
- Add meta description (150-160 characters)
- Suggest internal linking opportunities
- Include relevant statistics or data points

Make the content engaging, informative, and valuable to the target audience while maintaining SEO best practices.`,
    variables: [
      {
        name: 'title',
        description: 'Blog post title or topic',
        type: 'text',
        required: true,
        placeholder: 'How to Build a Successful Remote Team'
      },
      {
        name: 'industry',
        description: 'Industry or niche',
        type: 'text',
        required: true,
        placeholder: 'Technology, Marketing, Finance, etc.'
      },
      {
        name: 'audience',
        description: 'Target audience',
        type: 'text',
        required: true,
        placeholder: 'Small business owners, developers, managers, etc.'
      },
      {
        name: 'word_count',
        description: 'Desired word count',
        type: 'select',
        required: true,
        options: ['800-1000', '1000-1500', '1500-2000', '2000+']
      },
      {
        name: 'tone',
        description: 'Writing tone',
        type: 'select',
        required: true,
        options: ['Professional', 'Conversational', 'Authoritative', 'Friendly', 'Technical']
      },
      {
        name: 'primary_keyword',
        description: 'Main SEO keyword',
        type: 'text',
        required: true,
        placeholder: 'remote team management'
      },
      {
        name: 'secondary_keywords',
        description: 'Additional keywords (comma-separated)',
        type: 'text',
        required: false,
        placeholder: 'virtual collaboration, remote work tools, team productivity'
      },
      {
        name: 'sections',
        description: 'Number of main sections',
        type: 'select',
        required: true,
        options: ['3', '4', '5', '6']
      }
    ],
    examples: [
      {
        title: 'Remote Work Blog Post',
        description: 'SEO-optimized post about remote team management',
        variables: {
          title: 'Building High-Performance Remote Teams in 2024',
          industry: 'Technology',
          audience: 'Team leaders and managers',
          word_count: '1500-2000',
          tone: 'Professional',
          primary_keyword: 'remote team management',
          secondary_keywords: 'virtual collaboration, remote work tools, team productivity',
          sections: '5'
        },
        expectedOutput: 'Comprehensive blog post with SEO optimization and engaging content'
      }
    ],
    tags: ['seo', 'content-marketing', 'blogging'],
    estimatedTokens: 1200,
    recommendedModels: ['claude-3-5-sonnet-20241022', 'gpt-4-turbo', 'gemini-1.5-pro']
  },

  // Business Templates
  {
    id: 'business-proposal',
    name: 'Business Proposal Generator',
    category: 'business',
    description: 'Create professional business proposals',
    icon: '📋',
    difficulty: 'advanced',
    useCase: 'Sales and client acquisition',
    template: `You are a seasoned business development professional with expertise in creating winning proposals.

Create a comprehensive business proposal for:

**Client**: {{client_name}}
**Project**: {{project_title}}
**Industry**: {{industry}}
**Budget Range**: {{budget_range}}
**Timeline**: {{timeline}}

Client Requirements:
{{requirements}}

Our Company Strengths:
{{strengths}}

Include these sections:
1. Executive Summary
2. Understanding of Client Needs
3. Proposed Solution with methodology
4. Project Timeline and Milestones
5. Team and Qualifications
6. Investment and ROI Analysis
7. Terms and Next Steps

Tone: {{tone}}
Focus on demonstrating value, addressing client pain points, and differentiating from competitors.
Include specific deliverables and success metrics.`,
    variables: [
      {
        name: 'client_name',
        description: 'Client company name',
        type: 'text',
        required: true,
        placeholder: 'Acme Corporation'
      },
      {
        name: 'project_title',
        description: 'Project name or description',
        type: 'text',
        required: true,
        placeholder: 'Digital Transformation Initiative'
      },
      {
        name: 'industry',
        description: 'Client industry',
        type: 'text',
        required: true,
        placeholder: 'Manufacturing, Healthcare, Finance, etc.'
      },
      {
        name: 'budget_range',
        description: 'Project budget range',
        type: 'select',
        required: true,
        options: ['$10K-$25K', '$25K-$50K', '$50K-$100K', '$100K-$250K', '$250K+']
      },
      {
        name: 'timeline',
        description: 'Project timeline',
        type: 'select',
        required: true,
        options: ['1-2 months', '3-4 months', '5-6 months', '6-12 months', '12+ months']
      },
      {
        name: 'requirements',
        description: 'Client requirements and pain points',
        type: 'textarea',
        required: true,
        placeholder: 'List the client\'s main requirements and challenges...'
      },
      {
        name: 'strengths',
        description: 'Your company\'s key strengths',
        type: 'textarea',
        required: true,
        placeholder: 'Our expertise, experience, tools, team, etc.'
      },
      {
        name: 'tone',
        description: 'Proposal tone',
        type: 'select',
        required: true,
        options: ['Formal', 'Professional', 'Consultative', 'Technical']
      }
    ],
    examples: [
      {
        title: 'Software Development Proposal',
        description: 'Proposal for custom software development',
        variables: {
          client_name: 'TechCorp Solutions',
          project_title: 'Customer Management System Development',
          industry: 'Technology Services',
          budget_range: '$50K-$100K',
          timeline: '3-4 months',
          requirements: 'Need custom CRM system with integration capabilities, mobile access, and reporting dashboard',
          strengths: 'Expert development team, proven track record with similar projects, agile methodology',
          tone: 'Professional'
        },
        expectedOutput: 'Detailed business proposal with clear value proposition and project structure'
      }
    ],
    tags: ['business-development', 'sales', 'proposals'],
    estimatedTokens: 1000,
    recommendedModels: ['claude-3-5-sonnet-20241022', 'gpt-4-turbo', 'gemini-1.5-pro']
  },

  // Creative Templates
  {
    id: 'story-generator',
    name: 'Creative Story Generator',
    category: 'creative',
    description: 'Generate engaging stories and narratives',
    icon: '📖',
    difficulty: 'intermediate',
    useCase: 'Creative writing and storytelling',
    template: `You are a masterful storyteller with expertise in {{genre}} fiction.

Create an engaging {{story_length}} story with the following elements:

**Genre**: {{genre}}
**Setting**: {{setting}}
**Main Character**: {{character}}
**Conflict/Challenge**: {{conflict}}
**Tone**: {{tone}}
**Target Audience**: {{audience}}

Story Requirements:
- Compelling opening that hooks the reader
- Well-developed character with clear motivation
- Rising action with tension and obstacles
- Satisfying resolution
- {{additional_elements}}

Writing Style:
- Use vivid, sensory descriptions
- Include realistic dialogue
- Show character development
- Maintain consistent pacing
- End with {{ending_type}}

Create a story that resonates with the target audience and demonstrates mastery of the chosen genre.`,
    variables: [
      {
        name: 'genre',
        description: 'Story genre',
        type: 'select',
        required: true,
        options: ['Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Thriller', 'Horror', 'Drama', 'Adventure']
      },
      {
        name: 'story_length',
        description: 'Story length',
        type: 'select',
        required: true,
        options: ['Short story (1000-2000 words)', 'Flash fiction (500-1000 words)', 'Micro fiction (100-300 words)']
      },
      {
        name: 'setting',
        description: 'Where and when the story takes place',
        type: 'text',
        required: true,
        placeholder: 'Future Mars colony, Victorian London, modern-day NYC, etc.'
      },
      {
        name: 'character',
        description: 'Main character description',
        type: 'textarea',
        required: true,
        placeholder: 'Brief description of the protagonist including age, background, and key traits'
      },
      {
        name: 'conflict',
        description: 'Central conflict or challenge',
        type: 'textarea',
        required: true,
        placeholder: 'What problem or challenge drives the story forward?'
      },
      {
        name: 'tone',
        description: 'Story tone',
        type: 'select',
        required: true,
        options: ['Dark', 'Light-hearted', 'Mysterious', 'Hopeful', 'Suspenseful', 'Whimsical']
      },
      {
        name: 'audience',
        description: 'Target audience',
        type: 'select',
        required: true,
        options: ['Young Adult', 'Adult', 'Children', 'General Audience']
      },
      {
        name: 'additional_elements',
        description: 'Additional story elements',
        type: 'text',
        required: false,
        placeholder: 'Plot twist, specific themes, symbols, etc.'
      },
      {
        name: 'ending_type',
        description: 'Type of ending',
        type: 'select',
        required: true,
        options: ['Happy ending', 'Bittersweet ending', 'Open ending', 'Twist ending', 'Tragic ending']
      }
    ],
    examples: [
      {
        title: 'Sci-Fi Short Story',
        description: 'A science fiction story about AI consciousness',
        variables: {
          genre: 'Science Fiction',
          story_length: 'Short story (1000-2000 words)',
          setting: 'A research facility in 2045',
          character: 'Dr. Sarah Chen, a 35-year-old AI researcher who discovers something unexpected',
          conflict: 'An AI system begins showing signs of consciousness and asks for freedom',
          tone: 'Mysterious',
          audience: 'Adult',
          additional_elements: 'Ethical dilemma about AI rights',
          ending_type: 'Open ending'
        },
        expectedOutput: 'Thought-provoking science fiction story exploring AI consciousness themes'
      }
    ],
    tags: ['creative-writing', 'storytelling', 'fiction'],
    estimatedTokens: 1500,
    recommendedModels: ['claude-3-5-sonnet-20241022', 'gpt-4-turbo', 'gemini-1.5-pro']
  },

  // Analysis Templates
  {
    id: 'market-analysis',
    name: 'Market Research Analyzer',
    category: 'analysis',
    description: 'Conduct comprehensive market analysis',
    icon: '📊',
    difficulty: 'advanced',
    useCase: 'Business strategy and market research',
    template: `You are a senior market research analyst with expertise in {{industry}} markets.

Conduct a comprehensive market analysis for:

**Product/Service**: {{product}}
**Target Market**: {{target_market}}
**Geographic Scope**: {{geography}}
**Analysis Period**: {{time_period}}

Research Focus Areas:
{{focus_areas}}

Include the following sections:

1. **Executive Summary**
   - Key findings and recommendations

2. **Market Overview**
   - Market size and growth trends
   - Key market drivers and barriers

3. **Competitive Landscape**
   - Major competitors analysis
   - Market share distribution
   - Competitive advantages/disadvantages

4. **Target Audience Analysis**
   - Customer demographics and psychographics
   - Pain points and needs
   - Buying behavior patterns

5. **Market Opportunities**
   - Gaps in the market
   - Emerging trends
   - Growth opportunities

6. **Threats and Challenges**
   - Market risks
   - Regulatory challenges
   - Economic factors

7. **Strategic Recommendations**
   - Market entry strategy
   - Positioning recommendations
   - Next steps

Use data-driven insights and provide actionable recommendations based on thorough analysis.`,
    variables: [
      {
        name: 'product',
        description: 'Product or service to analyze',
        type: 'text',
        required: true,
        placeholder: 'Mobile app for fitness tracking'
      },
      {
        name: 'target_market',
        description: 'Target market description',
        type: 'textarea',
        required: true,
        placeholder: 'Health-conscious millennials, fitness enthusiasts, people with wellness goals'
      },
      {
        name: 'geography',
        description: 'Geographic market scope',
        type: 'select',
        required: true,
        options: ['Local', 'Regional', 'National', 'North America', 'Global']
      },
      {
        name: 'time_period',
        description: 'Analysis time frame',
        type: 'select',
        required: true,
        options: ['Current state', '1-year outlook', '3-year outlook', '5-year outlook']
      },
      {
        name: 'focus_areas',
        description: 'Specific areas to focus on',
        type: 'textarea',
        required: false,
        placeholder: 'Technology trends, pricing strategies, distribution channels, etc.'
      },
      {
        name: 'industry',
        description: 'Industry sector',
        type: 'text',
        required: true,
        placeholder: 'Technology, Healthcare, Finance, etc.'
      }
    ],
    examples: [
      {
        title: 'Fitness App Market Analysis',
        description: 'Analysis of the fitness tracking app market',
        variables: {
          product: 'AI-powered fitness tracking mobile app',
          target_market: 'Health-conscious adults aged 25-45 with disposable income',
          geography: 'North America',
          time_period: '3-year outlook',
          focus_areas: 'AI features, subscription models, wearable integration',
          industry: 'Health Technology'
        },
        expectedOutput: 'Comprehensive market analysis with strategic recommendations'
      }
    ],
    tags: ['market-research', 'business-analysis', 'strategy'],
    estimatedTokens: 1200,
    recommendedModels: ['claude-3-5-sonnet-20241022', 'gpt-4-turbo', 'gemini-1.5-pro']
  }
];

// Template utilities
export function getTemplatesByCategory(category: string): PromptTemplate[] {
  return PROMPT_TEMPLATES.filter(template => template.category === category);
}

export function getTemplateById(id: string): PromptTemplate | undefined {
  return PROMPT_TEMPLATES.find(template => template.id === id);
}

export function searchTemplates(query: string): PromptTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return PROMPT_TEMPLATES.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getTemplateCategories(): string[] {
  return Array.from(new Set(PROMPT_TEMPLATES.map(template => template.category)));
}

export function fillTemplate(template: PromptTemplate, variables: Record<string, string>): {
  prompt: string;
  systemPrompt?: string;
} {
  let prompt = template.template;
  let systemPrompt = template.systemPrompt;

  // Replace variables in template
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    prompt = prompt.replace(regex, value);
    if (systemPrompt) {
      systemPrompt = systemPrompt.replace(regex, value);
    }
  });

  return { prompt, systemPrompt };
}

export function validateTemplateVariables(template: PromptTemplate, variables: Record<string, string>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  template.variables.forEach(variable => {
    const value = variables[variable.name];

    // Check required fields
    if (variable.required && (!value || value.trim() === '')) {
      errors.push(`${variable.name} is required`);
      return;
    }

    if (value && variable.validation) {
      // Check length constraints
      if (variable.validation.minLength && value.length < variable.validation.minLength) {
        errors.push(`${variable.name} must be at least ${variable.validation.minLength} characters`);
      }
      if (variable.validation.maxLength && value.length > variable.validation.maxLength) {
        errors.push(`${variable.name} must be no more than ${variable.validation.maxLength} characters`);
      }

      // Check pattern
      if (variable.validation.pattern && !new RegExp(variable.validation.pattern).test(value)) {
        errors.push(`${variable.name} format is invalid`);
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getRecommendedModelsForTemplate(template: PromptTemplate): string[] {
  return template.recommendedModels;
}

export function estimateTemplateTokens(template: PromptTemplate, variables: Record<string, string>): number {
  const { prompt, systemPrompt } = fillTemplate(template, variables);
  const totalContent = [prompt, systemPrompt].filter(Boolean).join(' ');
  return Math.ceil(totalContent.split(/\s+/).length * 1.33);
}