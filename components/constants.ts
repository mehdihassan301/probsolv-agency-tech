
import { Service, Post, Job, PortfolioItem } from '../types';
import { WebDevIcon, VibeCodeIcon, AIIcon } from './Icons';

export const serviceDetails: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Crafting high-performance, visually stunning websites that drive business growth.',
    icon: WebDevIcon,
    heroImage: '/images/services/web-dev-hero.jpg',
    overview: 'Our web development service focuses on creating responsive, scalable, and secure websites tailored to your brand. From corporate sites to complex e-commerce platforms, we build digital experiences that engage users and deliver results.',
    process: [
      { step: 'Discovery & Strategy', description: 'We start by understanding your goals, target audience, and technical requirements to create a comprehensive project roadmap.' },
      { step: 'UI/UX Design', description: 'Our designers craft intuitive and beautiful interfaces focused on providing an exceptional user experience.' },
      { step: 'Development', description: 'Our expert developers bring the designs to life using modern technologies and clean, efficient code.' },
      { step: 'Testing & QA', description: 'Rigorous testing across devices and browsers ensures a flawless, bug-free launch.' },
      { step: 'Deployment & Launch', description: 'We handle the entire deployment process for a smooth and seamless transition to a live environment.' },
    ],
    deliverables: ['Fully Responsive Website', 'Content Management System (CMS)', 'Source Code', 'SEO Foundations', 'Deployment'],
    timeframe: '4-8 Weeks',
    benefits: ['Enhanced Brand Credibility', 'Increased Lead Generation', 'Improved User Engagement', 'Scalable Architecture'],
    whyUs: [
        { title: 'Modern Technology Stack', description: 'We use the latest, most reliable technologies to build websites that are fast, secure, and future-proof.' },
        { title: 'User-Centric Design', description: 'Our design philosophy puts the user first, resulting in intuitive and enjoyable digital experiences.' },
        { title: 'Agile Methodology', description: 'We work in sprints, providing regular updates and incorporating your feedback throughout the process.' }
    ]
  },
  {
    id: 'vibe-coded',
    title: 'Vibe Coding Apps',
    description: 'Unique, aesthetic-driven app development that resonates with your brand\'s core identity.',
    icon: VibeCodeIcon,
    heroImage: '/images/services/vibe-coded-hero.jpg',
    overview: 'Vibe Coding Apps go beyond functionality. We focus on creating an emotional connection with users through bespoke design, micro-interactions, and a cohesive brand experience. These are apps that feel as good as they look.',
    process: [
      { step: 'Vibe Discovery', description: 'We dive deep into your brand\'s ethos, aesthetics, and target audience to define the core "vibe".' },
      { step: 'Conceptual Design', description: 'Creation of mood boards, style scapes, and initial design concepts that capture the desired feeling.' },
      { step: 'Interactive Prototyping', description: 'We build clickable prototypes to test the flow, feel, and micro-interactions of the app.' },
      { step: 'Aesthetic-Driven Development', description: 'Our developers meticulously implement the design, ensuring every pixel and animation is perfect.' },
      { step: 'Experience QA', description: 'We test not just for bugs, but for the overall feeling and emotional impact of the application.' },
    ],
    deliverables: ['Custom Mobile/Web App', 'Brand Style Guide', 'UI Kit', 'Interactive Prototypes', 'Source Code'],
    timeframe: '6-12 Weeks',
    benefits: ['Stronger Brand Loyalty', 'Higher User Engagement Rates', 'Differentiation in Crowded Markets', 'Memorable User Experience'],
    whyUs: [
        { title: 'Aesthetic First', description: 'We believe great design and a strong vibe are non-negotiable for modern applications.' },
        { title: 'Micro-Interaction Masters', description: 'We obsess over the small details that create a delightful and premium user experience.' },
        { title: 'Brand Storytelling', description: 'We build apps that are a true extension of your brand\'s story and values.' }
    ]
  },
  {
    id: 'ai-automations',
    title: 'AI Business Automations',
    description: 'Integrating intelligent AI to automate workflows, support, and business processes.',
    icon: AIIcon,
    heroImage: '/images/services/ai-automations-hero.jpg',
    overview: 'Leverage the power of Artificial Intelligence to streamline your operations. We develop and integrate custom AI solutions, including chatbots, internal assistants, and automated support systems, to increase efficiency and reduce costs.',
    process: [
      { step: 'Process Analysis', description: 'We identify key areas in your business that are ripe for automation and will deliver the highest ROI.' },
      { step: 'Solution Design', description: 'We design the AI architecture, select the right models, and plan the integration with your existing systems.' },
      { step: 'Model Training & Development', description: 'We develop and train custom AI models tailored to your specific data and business needs.' },
      { step: 'System Integration', description: 'Seamless integration of the AI solution into your current workflows, CRMs, or support platforms.' },
      { step: 'Monitoring & Optimization', description: 'We continuously monitor the AI\'s performance and optimize it for better accuracy and efficiency over time.' },
    ],
    deliverables: ['Custom AI Chatbot/Assistant', 'Workflow Automation Scripts', 'Integration Documentation', 'Performance Dashboard', 'Support & Maintenance Plan'],
    timeframe: '5-10 Weeks',
    benefits: ['24/7 Customer Support', 'Significant Cost Reduction', 'Increased Operational Efficiency', 'Data-Driven Insights'],
    whyUs: [
        { title: 'Practical AI Solutions', description: 'We focus on building AI tools that solve real-world business problems and deliver measurable results.' },
        { title: 'Seamless Integration', description: 'Our expertise ensures that new AI systems work perfectly with your existing software and processes.' },
        { title: 'Scalable & Secure', description: 'We build robust AI automations that can grow with your business and protect your data.' }
    ]
  }
];

export const portfolioItems: PortfolioItem[] = [
    { 
        id: 'agency-website',
        title: 'Agency Website', 
        category: 'Web Development', 
        image: '/images/portfolio/agency-website/thumbnail.jpg',
        heroImage: '/images/portfolio/agency-website/hero.jpg',
        challenge: "A creative agency needed a new website to reflect their cutting-edge brand identity and showcase their portfolio in a visually stunning way. Their old site was slow, not mobile-friendly, and difficult to update.",
        solution: [
            {
                title: "Discovery & Strategy",
                description: "We started with a deep-dive into their brand, target audience, and competitors. This allowed us to define a clear strategy for a user-centric design that highlighted their unique value proposition.",
                image: '/images/portfolio/agency-website/solution-1.jpg'
            },
            {
                title: "Vibe-Coded Frontend",
                description: "Using modern frameworks like React and GSAP for animations, we built a highly interactive and aesthetically pleasing frontend. The 'vibe' was crucial, so we focused on micro-interactions and smooth page transitions to create a premium feel.",
                image: '/images/portfolio/agency-website/solution-2.jpg'
            },
            {
                title: "Headless CMS Integration",
                description: "To make content updates seamless, we integrated a headless CMS (Contentful). This gave the agency's team the power to update their portfolio and blog without needing any technical help, ensuring the site stays fresh.",
                image: '/images/portfolio/agency-website/solution-3.jpg'
            }
        ],
        results: [
            { metric: "Page Load Time", value: "-75%", description: "Reduced average page load time from 4.8s to 1.2s through performance optimization." },
            { metric: "Lead Conversion", value: "+200%", description: "A redesigned contact flow and clearer calls-to-action led to a tripling of qualified leads." },
            { metric: "Mobile Engagement", value: "+50%", description: "A fully responsive design resulted in a significant increase in session duration for mobile users." }
        ],
        technologies: ['React', 'TypeScript', 'TailwindCSS', 'GSAP', 'Contentful', 'Vercel']
    },
    { 
        id: 'ai-automation-setup',
        title: 'AI Automation Setup', 
        category: 'AI Automations', 
        image: '/images/portfolio/ai-automation/thumbnail.jpg',
        heroImage: '/images/portfolio/ai-automation/hero.jpg',
        challenge: "A rapidly growing e-commerce brand was struggling with customer support volume. Their team was overwhelmed with repetitive questions, leading to slow response times and customer dissatisfaction.",
        solution: [
            {
                title: "Process Analysis",
                description: "We analyzed over 5,000 support tickets to identify the most common customer queries. We found that 80% of questions were related to order tracking, returns, and product information.",
                image: '/images/portfolio/ai-automation/solution-1.jpg'
            },
            {
                title: "Custom Chatbot Development",
                description: "We built a custom AI chatbot using Google's Dialogflow and integrated it with their Shopify store data. The chatbot could instantly answer common questions and provide real-time order status updates.",
                image: '/images/portfolio/ai-automation/solution-2.jpg'
            },
            {
                title: "Seamless Human Handoff",
                description: "For complex issues, the chatbot was designed to seamlessly escalate the conversation to a human agent, providing the agent with the full conversation history for context.",
                image: '/images/portfolio/ai-automation/solution-3.jpg'
            }
        ],
        results: [
            { metric: "Ticket Volume", value: "-65%", description: "The AI chatbot successfully resolved two-thirds of all incoming customer support queries automatically." },
            { metric: "Response Time", value: "Instant", description: "Average first response time went from 2 hours to immediate for common questions." },
            { metric: "Customer Satisfaction", value: "+30%", description: "CSAT scores increased significantly due to faster and more efficient support." }
        ],
        technologies: ['Dialogflow', 'Node.js', 'Shopify API', 'WebSocket', 'Google Cloud']
    },
    { 
        id: 'saas-dashboard',
        title: 'SaaS Dashboard', 
        category: 'Vibe Coding Apps', 
        image: '/images/portfolio/saas-dashboard/thumbnail.jpg',
        heroImage: '/images/portfolio/saas-dashboard/hero.jpg',
        challenge: "A B2B SaaS startup had a powerful backend but their user dashboard was cluttered, unintuitive, and visually dated. This was leading to poor user adoption and high churn rates.",
        solution: [
             {
                title: "User-Centric Redesign",
                description: "We conducted user interviews and workflow analysis to completely rethink the information architecture. The new design prioritized key user actions and presented complex data in a clean, digestible format.",
                image: '/images/portfolio/saas-dashboard/solution-1.jpg'
            },
            {
                title: "Interactive Data Visualizations",
                description: "Using D3.js, we created beautiful and interactive charts and graphs that allowed users to explore their data in a more engaging way. This turned a static dashboard into a powerful analytics tool.",
                image: '/images/portfolio/saas-dashboard/solution-2.jpg'
            },
            {
                title: "Component-Based Frontend",
                description: "We rebuilt the entire frontend using React and a component-based design system. This not only improved performance but also made the dashboard more scalable and easier to maintain.",
                image: '/images/portfolio/saas-dashboard/solution-3.jpg'
            }
        ],
        results: [
            { metric: "User Engagement", value: "+80%", description: "Key feature adoption increased by 80% within the first three months of launching the new dashboard." },
            { metric: "Support Tickets", value: "-50%", description: "A more intuitive UI led to a 50% reduction in user-generated support tickets related to the dashboard." },
            { metric: "User Churn", value: "-25%", description: "The improved user experience was a key factor in reducing monthly customer churn by 25%." }
        ],
        technologies: ['React', 'D3.js', 'Figma', 'Storybook', 'Node.js', 'PostgreSQL']
    },
    { 
        id: 'mobile-web-app',
        title: 'Mobile Web App', 
        category: 'Vibe Coding Apps', 
        image: '/images/portfolio/mobile-web-app/thumbnail.jpg',
        heroImage: '/images/portfolio/mobile-web-app/hero.jpg',
        challenge: "A lifestyle brand wanted to create a mobile app for their community, but lacked the budget and timeline for native iOS and Android development. They needed a solution that was fast to build and accessible on all devices.",
        solution: [
            {
                title: "Progressive Web App (PWA)",
                description: "We proposed a PWA to deliver a native-app-like experience on the web. This allowed for a single codebase, faster deployment, and discoverability through search engines.",
                image: '/images/portfolio/mobile-web-app/solution-1.jpg'
            },
            {
                title: "Offline Functionality",
                description: "Using service workers, we enabled core features of the app to work offline. Users could browse content and access their profiles even without a stable internet connection.",
                image: '/images/portfolio/mobile-web-app/solution-2.jpg'
            },
            {
                title: "Aesthetic-Driven UI",
                description: "The UI was designed to match the brand's 'vibe'—minimalist, elegant, and calming. We used subtle animations and a thoughtful color palette to create a premium and engaging user experience.",
                image: '/images/portfolio/mobile-web-app/solution-3.jpg'
            }
        ],
        results: [
            { metric: "Development Cost", value: "-60%", description: "Building a PWA was 60% more cost-effective than developing and maintaining separate native iOS and Android apps." },
            { metric: "User Acquisition", value: "+300%", description: "Being on the web made the app easily shareable and discoverable, leading to faster user growth." },
            { metric: "Engagement", value: "2.5x", description: "Users who added the PWA to their home screen had 2.5 times higher engagement rates than regular mobile web visitors." }
        ],
        technologies: ['Vue.js', 'Nuxt.js', 'Service Workers', 'Firebase', 'Figma']
    },
    { 
        id: 'branding-ui-work',
        title: 'Branding + UI Work', 
        category: 'Web Development', 
        image: '/images/portfolio/branding-ui/thumbnail.jpg',
        heroImage: '/images/portfolio/branding-ui/hero.jpg',
        challenge: "A new fintech startup needed a strong brand identity and a trustworthy user interface to attract its first customers. They needed to look polished and credible from day one.",
        solution: [
            {
                title: "Brand Strategy Workshop",
                description: "We facilitated a workshop to define their brand's mission, values, and personality. This formed the foundation for the visual identity, including the logo, color scheme, and typography.",
                image: '/images/portfolio/branding-ui/solution-1.jpg'
            },
            {
                title: "UI Kit & Design System",
                description: "We designed a comprehensive UI kit in Figma, creating a scalable design system with reusable components. This ensured consistency across all their digital touchpoints and sped up the development process.",
                image: '/images/portfolio/branding-ui/solution-2.jpg'
            },
            {
                title: "High-Fidelity Prototypes",
                description: "We delivered interactive, high-fidelity prototypes that allowed the startup to test user flows and gather feedback before writing a single line of code. This was crucial for securing early-stage investor funding.",
                image: '/images/portfolio/branding-ui/solution-3.jpg'
            }
        ],
        results: [
            { metric: "Investor Funding", value: "$1.5M", description: "The professional branding and polished UI prototype were instrumental in helping the startup secure $1.5M in seed funding." },
            { metric: "Design Handoff", value: "Seamless", description: "The detailed design system allowed their in-house development team to implement the UI with pixel-perfect accuracy." },
            { metric: "Brand Perception", value: "Trustworthy", description: "User feedback consistently highlighted the brand's trustworthy and professional appearance, a key factor in fintech." }
        ],
        technologies: ['Figma', 'Adobe Illustrator', 'Storybook', 'Brand Strategy']
    },
    { 
        id: 'ecommerce-platform',
        title: 'E-commerce Platform', 
        category: 'Web Development', 
        image: '/images/portfolio/ecommerce-platform/thumbnail.jpg',
        heroImage: '/images/portfolio/ecommerce-platform/hero.jpg',
        challenge: "A specialty coffee retailer's online store was built on a restrictive, template-based platform that couldn't keep up with their growth. They needed a custom solution to improve performance and user experience.",
        solution: [
             {
                title: "Headless Commerce Architecture",
                description: "We migrated them to a headless architecture using Shopify Plus for the backend and a custom Next.js frontend. This provided blazing-fast performance and complete design freedom.",
                image: '/images/portfolio/ecommerce-platform/solution-1.jpg'
            },
            {
                title: "Subscription Builder",
                description: "We developed a custom subscription builder that allowed customers to create their own personalized coffee subscription boxes. This created a new recurring revenue stream for the business.",
                image: '/images/portfolio/ecommerce-platform/solution-2.jpg'
            },
            {
                title: "Performance Optimization",
                description: "We implemented static site generation (SSG) for product pages and optimized all images, resulting in near-instant page loads and a perfect Google Lighthouse score.",
                image: '/images/portfolio/ecommerce-platform/solution-3.jpg'
            }
        ],
        results: [
            { metric: "Conversion Rate", value: "+40%", description: "The faster site speed and improved user experience led to a 40% increase in the e-commerce conversion rate." },
            { metric: "Average Order Value", value: "+20%", description: "The new subscription builder and product up-sells increased the average order value by 20%." },
            { metric: "Recurring Revenue", value: "+150%", description: "The subscription model became a huge success, growing their monthly recurring revenue by 150% in six months." }
        ],
        technologies: ['Next.js', 'React', 'Shopify Plus API', 'GraphQL', 'Vercel', 'Stripe']
    }
];

export const testimonials = [
    { name: 'Sarah L.', role: 'CEO, Innovate Co.', message: 'ProbSolv transformed our online presence. Their attention to detail and modern design sense is unparalleled. Our new website is fast, beautiful, and generating more leads than ever.', stars: 5 },
    { name: 'Michael B.', role: 'Founder, TechStream', message: 'The AI chatbot they built for us has cut down our support tickets by 40%. It\'s incredibly smart and has freed up our team to focus on bigger issues. A total game-changer.', stars: 5 },
    { name: 'Jessica T.', role: 'Creative Director, Aura Studios', message: 'I\'ve never worked with a team that understood our "vibe" so perfectly. The app they delivered is not just functional, it\'s a work of art that our users absolutely love.', stars: 5 },
    { name: 'David R.', role: 'CTO, DataFlow', message: 'Professional, efficient, and highly skilled. The ProbSolv team delivered our project on time and exceeded all our expectations. We will definitely be working with them again.', stars: 5 },
];

export const blogPosts: Post[] = [
    {
        id: 'why-vibe-matters',
        title: 'Beyond the Pixels: Why "Vibe" is the Most Underrated Metric in App Development',
        author: 'Alex Chen',
        date: 'October 26, 2023',
        category: 'Vibe Coding Apps',
        image: '/images/blog/why-vibe-matters.jpg',
        excerpt: 'In a saturated app market, functionality is just the ticket to entry. The real differentiator? Vibe. We explore how aesthetic-driven design and micro-interactions create memorable experiences that build lasting brand loyalty.',
        content: `
            <p class="mb-6">In today's digital landscape, users have endless choices. An app that simply "works" is no longer enough. To capture attention and retain users, you need to create an experience that resonates on an emotional level. This is where "vibe" comes in.</p>
            <h3 class="text-2xl font-bold mb-4">What Exactly is "Vibe"?</h3>
            <p class="mb-6">Vibe is the intangible feeling your application evokes. It's a combination of your UI design, the smoothness of animations, the satisfaction of a button click, and the overall personality that shines through. It’s not just about looking good; it's about feeling right. A well-defined vibe turns a transactional tool into a delightful experience.</p>
            <h3 class="text-2xl font-bold mb-4">The ROI of Great Aesthetics</h3>
            <ul class="list-disc list-inside mb-6 space-y-2">
                <li><strong>Increased Engagement:</strong> Users spend more time in apps they enjoy using.</li>
                <li><strong>Higher Perceived Value:</strong> A polished, premium feel allows for better pricing power.</li>
                <li><strong>Stronger Brand Recall:</strong> A unique vibe makes your app unforgettable in a sea of competitors.</li>
            </ul>
            <p>At ProbSolv, we call this "Vibe-Coding." It's a philosophy that places the user's emotional journey at the forefront of the development process. We obsess over the details—from haptic feedback to loading screen animations—to ensure your app doesn't just function flawlessly, but also feels incredible to use. In a world of fleeting digital trends, a strong vibe is what creates a classic.</p>
        `
    },
    {
        id: 'ai-is-eating-the-world',
        title: 'Your New Hardest-Working Employee is an AI: A Guide to Business Automation',
        author: 'Samantha Riley',
        date: 'October 22, 2023',
        category: 'AI Automations',
        image: '/images/blog/ai-is-eating-the-world.jpg',
        excerpt: 'Repetitive tasks are draining your team\'s potential. We break down how custom AI assistants and automated workflows can handle the grunt work, freeing up your human talent to focus on innovation and growth.',
        content: `
            <p class="mb-6">Imagine an employee who never sleeps, never makes a mistake, and handles thousands of customer queries simultaneously. This isn't science fiction; it's the reality of AI-powered business automation. Companies that leverage AI are not just becoming more efficient; they're fundamentally redesigning what's possible.</p>
            <h3 class="text-2xl font-bold mb-4">Where to Start with AI Automation?</h3>
            <p class="mb-6">The key is to identify high-volume, low-complexity tasks. Here are some of the most impactful areas we see for AI integration:</p>
            <ul class="list-disc list-inside mb-6 space-y-2">
                <li><strong>Customer Support:</strong> AI chatbots can handle 80% of common questions, providing instant 24/7 support and escalating complex issues to human agents.</li>
                <li><strong>Data Entry & Processing:</strong> AI can read documents, extract key information, and input it into your systems with perfect accuracy, saving thousands of hours.</li>
                <li><strong>Internal Workflows:</strong> From scheduling meetings to generating reports, an internal AI assistant can streamline operations and reduce administrative overhead.</li>
            </ul>
            <h3 class="text-2xl font-bold mb-4">The ProbSolv Approach</h3>
            <p>We don't believe in one-size-fits-all AI. Our process begins with a deep analysis of your unique business processes to identify the automation opportunities with the highest ROI. We then design and integrate custom AI solutions that work seamlessly with your existing systems, whether it's a customer-facing chatbot or an internal automation script. The goal isn't to replace your team, but to supercharge them.</p>
        `
    },
    {
        id: 'future-of-web',
        title: 'Is Your Website Ready for 2024? 5 Tech Trends You Can\'t Ignore',
        author: 'David Chen',
        date: 'October 18, 2023',
        category: 'Web Development',
        image: '/images/blog/future-of-web.jpg',
        excerpt: 'The web is evolving faster than ever. From server-side rendering to the rise of edge computing, we cover the essential web development trends that will define the next year and how to leverage them for a faster, more secure online presence.',
        content: `
            <p class="mb-6">A website is no longer a static brochure; it's a dynamic, interactive platform that serves as the core of your digital presence. To stay competitive, you need to be aware of the technological shifts that are shaping the future of the web. Here are five trends we're building our projects around.</p>
            <ol class="list-decimal list-inside mb-6 space-y-4">
                <li><strong>Component-Based Architecture:</strong> Frameworks like React and Vue have made building complex interfaces more manageable and scalable. Reusable components mean faster development and easier maintenance.</li>
                <li><strong>Headless CMS:</strong> Decoupling the content management backend from the frontend presentation layer gives brands ultimate flexibility to deliver content to any device—websites, apps, smartwatches, and beyond.</li>
                <li><strong>Static Site Generation (SSG) & SSR:</strong> Pre-rendering pages as static files delivers lightning-fast performance and enhanced security. For dynamic content, Server-Side Rendering (SSR) offers the best of both worlds.</li>
                <li><strong>AI-Powered Search & Personalization:</strong> Generic content is dead. Modern websites are using AI to provide personalized experiences and intelligent search capabilities that understand user intent.</li>
                <li><strong>WebAssembly (WASM):</strong> This technology allows you to run high-performance code (written in languages like C++ or Rust) directly in the browser, opening up new possibilities for complex web applications like video editors and 3D games.</li>
            </ol>
            <p>At ProbSolv, we're not just following trends; we're implementing them. Our commitment to using a modern, robust tech stack ensures that the websites we build today are not just beautiful and functional, but are also engineered to be fast, secure, and ready for the future.</p>
        `
    },
];

export const jobOpenings: Job[] = [
    {
        id: 'frontend-engineer',
        title: 'Senior Frontend Engineer',
        location: 'Remote',
        type: 'Full-time',
        description: 'We are looking for a passionate Senior Frontend Engineer to build beautiful, high-performance user interfaces. You will work with modern technologies to create aesthetic-driven apps and websites that our clients and their users love.',
        responsibilities: [
            'Develop and maintain user-facing features using React and TypeScript.',
            'Collaborate with UI/UX designers to translate wireframes into high-quality code.',
            'Optimize applications for maximum speed and scalability.',
            'Write clean, maintainable, and well-documented code.',
            'Mentor junior developers and contribute to our team\'s best practices.'
        ],
        qualifications: [
            '5+ years of professional experience in frontend development.',
            'Expertise in React, TypeScript, HTML5, and CSS3.',
            'Strong understanding of UI/UX design principles.',
            'Experience with performance optimization techniques.',
            'Excellent problem-solving and communication skills.'
        ]
    },
    {
        id: 'ai-engineer',
        title: 'AI/ML Engineer',
        location: 'Remote',
        type: 'Full-time',
        description: 'Join our AI team to build intelligent automation solutions that solve real-world business problems. You will design, develop, and deploy machine learning models and AI-powered systems for our diverse range of clients.',
        responsibilities: [
            'Design and implement machine learning models for tasks like NLP, computer vision, and predictive analytics.',
            'Develop and integrate custom AI solutions, including chatbots and internal assistants.',
            'Analyze large datasets to extract actionable insights.',
            'Work with clients to understand their needs and design effective AI strategies.',
            'Stay up-to-date with the latest advancements in AI and machine learning.'
        ],
        qualifications: [
            '3+ years of experience in a similar AI/ML role.',
            'Proficiency in Python and machine learning frameworks (e.g., TensorFlow, PyTorch).',
            'Experience with cloud platforms (GCP, AWS, Azure).',
            'Strong background in algorithms, data structures, and statistical modeling.',
            'Ability to communicate complex technical concepts to non-technical stakeholders.'
        ]
    },
    {
        id: 'ui-ux-designer',
        title: 'UI/UX "Vibe" Designer',
        location: 'Remote',
        type: 'Contract',
        description: 'Are you obsessed with creating digital experiences that feel as good as they look? We\'re seeking a UI/UX Designer who specializes in "vibe." You will be responsible for creating the aesthetic vision for our "Vibe Coding Apps," focusing on emotional connection and brand identity.',
        responsibilities: [
            'Create wireframes, storyboards, user flows, and site maps.',
            'Design visually stunning and intuitive user interfaces.',
            'Develop UI mockups and prototypes that clearly illustrate how sites function and look.',
            'Conduct user research and evaluate user feedback.',
            'Establish and promote design guidelines, best practices, and standards.'
        ],
        qualifications: [
            'A strong portfolio showcasing your expertise in UI/UX design, especially for mobile and web apps.',
            'Proficiency in design tools like Figma, Sketch, or Adobe XD.',
            'Excellent visual design skills with a sensitivity to user-system interaction.',
            'Ability to solve problems creatively and effectively.',
            'Up-to-date with the latest UI trends, techniques, and technologies.'
        ]
    }
];
