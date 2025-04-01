
export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Mock data
export const authors: Author[] = [
  {
    id: "1",
    name: "Jane Doe",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Jane is a tech enthusiast and software engineer with over 10 years of experience in web development."
  },
  {
    id: "2",
    name: "John Smith",
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "John is a UX designer passionate about creating intuitive and accessible user experiences."
  },
  {
    id: "3",
    name: "Emily Johnson",
    avatarUrl: "https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Emily is a content strategist who helps businesses tell their stories effectively."
  }
];

export const categories: Category[] = [
  { id: "1", name: "Technology", slug: "technology" },
  { id: "2", name: "Design", slug: "design" },
  { id: "3", name: "Development", slug: "development" },
  { id: "4", name: "Business", slug: "business" },
  { id: "5", name: "Lifestyle", slug: "lifestyle" }
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-with-react-and-typescript",
    excerpt: "Learn how to set up a new React project with TypeScript and understand the basics of typing your components.",
    content: `
# Getting Started with React and TypeScript

React and TypeScript are a powerful combination for building robust web applications. TypeScript adds static typing to JavaScript, which can help catch errors during development and improve the developer experience with better tooling.

## Setting Up Your Project

You can create a new React TypeScript project using Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

Or if you prefer Vite:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Basic TypeScript Concepts for React

### Typing Props

When creating a React component, you can define the shape of its props using interfaces or types:

\`\`\`tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
\`\`\`

### Typing State

Similarly, you can type your state:

\`\`\`tsx
const [count, setCount] = useState<number>(0);
\`\`\`

## Benefits of Using TypeScript with React

1. **Catch Errors Early**: TypeScript helps catch type-related errors during development.
2. **Improved Developer Experience**: Better autocompletion and inline documentation.
3. **Easier Refactoring**: TypeScript makes it safer to refactor your code.
4. **Self-Documenting Code**: Types serve as documentation for your components.

## Conclusion

TypeScript may have a learning curve, but the benefits it brings to your React projects are well worth the investment. Start small and gradually adopt more TypeScript features as you become comfortable with them.
    `,
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "2023-05-15",
    author: authors[0],
    tags: ["React", "TypeScript", "Frontend"],
    featured: true
  },
  {
    id: "2",
    title: "Designing Better User Interfaces",
    slug: "designing-better-user-interfaces",
    excerpt: "Discover principles and practices that will help you create more intuitive and user-friendly interfaces.",
    content: `
# Designing Better User Interfaces

Creating intuitive and user-friendly interfaces is essential for the success of any digital product. In this article, we'll explore some key principles and practices to improve your UI design skills.

## Understanding Your Users

Before diving into design, it's crucial to understand who your users are and what they need. User research methods like interviews, surveys, and usability testing can provide valuable insights.

## Design Principles for Better UIs

### 1. Hierarchy and Organization

Visual hierarchy helps users understand the importance of different elements on the screen. Use size, color, contrast, and spacing to guide users' attention.

### 2. Consistency

Consistent design elements (buttons, icons, typography) create a sense of familiarity and make your interface more predictable.

### 3. Feedback

Always provide feedback for user actions. This could be visual (color changes, animations) or functional (success messages, error indicators).

### 4. Simplicity

Remove unnecessary elements and streamline your interface. Every component should serve a purpose.

## Practical Tips for UI Improvement

1. **Use whitespace effectively**: Give your elements room to breathe.
2. **Choose readable typography**: Ensure good contrast and appropriate font sizes.
3. **Make interactive elements obvious**: Users should easily identify what's clickable.
4. **Design for different states**: Consider how elements look when hovered, focused, active, or disabled.
5. **Test with real users**: Get feedback on your designs to identify pain points.

## Tools for UI Design

- Figma
- Adobe XD
- Sketch
- InVision

## Conclusion

Good UI design doesn't happen by accident. It requires understanding users, applying design principles, and continuously iterating based on feedback. Start with these foundational concepts, and you'll be on your way to creating more effective user interfaces.
    `,
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "2023-06-02",
    author: authors[1],
    tags: ["Design", "UI/UX", "Creativity"]
  },
  {
    id: "3",
    title: "The Future of Web Development",
    slug: "the-future-of-web-development",
    excerpt: "Explore emerging technologies and trends that are shaping the future of web development.",
    content: `
# The Future of Web Development

The web development landscape is constantly evolving. New frameworks, tools, and methodologies emerge regularly, changing how we build web applications. Let's look at some trends that are likely to shape the future of web development.

## Web Assembly (WASM)

WebAssembly allows high-performance applications to run in the browser. It enables languages like C++, Rust, and Go to be compiled to a binary format that browsers can execute efficiently.

## AI-Assisted Development

Artificial intelligence is increasingly being integrated into development workflows:

- Code completion and generation
- Automated testing
- Bug prediction and prevention
- Design-to-code conversion

## No-Code and Low-Code Platforms

These platforms are making web development more accessible to non-developers, allowing them to create applications with minimal coding knowledge.

## Progressive Web Apps (PWAs)

PWAs continue to gain traction by offering app-like experiences on the web with features like offline functionality, push notifications, and home screen installation.

## Jamstack Architecture

The Jamstack approach (JavaScript, APIs, and Markup) separates the frontend from the backend and relies heavily on CDNs for delivery, resulting in faster, more secure websites.

## Serverless Architecture

Serverless computing allows developers to build and run applications without managing servers, focusing solely on writing code.

## Conclusion

The future of web development is exciting, with technologies that promise to make the web faster, more powerful, and more accessible. Staying informed about these trends will help you prepare for the changing landscape and make strategic decisions about which technologies to adopt.
    `,
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "2023-07-20",
    author: authors[2],
    tags: ["Web Development", "Technology", "Future"]
  },
  {
    id: "4",
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt: "Learn how to create web applications that are accessible to all users, including those with disabilities.",
    content: `
# Building Accessible Web Applications

Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with the web. In this article, we'll explore practical steps to make your web applications more accessible.

## Why Accessibility Matters

- **Inclusivity**: Everyone deserves access to information and services.
- **Legal Requirements**: Many countries have laws requiring digital accessibility.
- **Better UX for Everyone**: Accessible design often improves usability for all users.
- **SEO Benefits**: Many accessibility practices also improve search engine optimization.

## WCAG Guidelines

The Web Content Accessibility Guidelines (WCAG) provide a framework for accessibility with four main principles:

1. **Perceivable**: Information must be presentable in ways all users can perceive.
2. **Operable**: User interface components must be operable by all users.
3. **Understandable**: Information and operation must be understandable.
4. **Robust**: Content must be robust enough to work with current and future technologies.

## Practical Accessibility Tips

### Semantic HTML

Use HTML elements according to their intended purpose:

\`\`\`html
<!-- Instead of this -->
<div class="heading">Title</div>

<!-- Use this -->
<h1>Title</h1>
\`\`\`

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:
- Logical tab order
- Visible focus indicators
- Keyboard event handlers

### Alternative Text

Provide meaningful alt text for images:

\`\`\`html
<img src="chart.png" alt="Bar chart showing sales increasing by 25% in Q2">
\`\`\`

### ARIA Attributes

Use ARIA (Accessible Rich Internet Applications) when HTML isn't sufficient:

\`\`\`html
<button aria-expanded="false" aria-controls="menu">
  Toggle Menu
</button>
\`\`\`

### Color Contrast

Ensure sufficient contrast between text and background colors. Tools like the WebAIM Contrast Checker can help.

## Testing Accessibility

- Use browser extensions like axe or WAVE
- Test with keyboard-only navigation
- Use screen readers (VoiceOver, NVDA, JAWS)
- Conduct user testing with people with disabilities

## Conclusion

Building accessible web applications is not just a nice-to-have feature; it's a responsibility. By following these guidelines and continuously learning about accessibility, you'll create web experiences that truly work for everyone.
    `,
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "2023-08-05",
    author: authors[0],
    tags: ["Accessibility", "Web Development", "Inclusion"],
    featured: true
  },
  {
    id: "5",
    title: "Introduction to State Management in React",
    slug: "introduction-to-state-management-in-react",
    excerpt: "Understand the concepts of state management in React and explore different solutions available.",
    content: `
# Introduction to State Management in React

State management is a critical aspect of React applications, especially as they grow in complexity. This article introduces the concept of state management and explores various solutions available in the React ecosystem.

## Understanding State in React

State refers to the data that can change over time and affects the rendering of components. In React, state can be managed in several ways:

### Component State

React's built-in useState hook allows functional components to manage local state:

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

### Context API

React's Context API provides a way to share state between components without prop drilling:

\`\`\`jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
\`\`\`

## State Management Libraries

As applications grow, dedicated state management libraries can help manage complex state logic:

### Redux

Redux offers a predictable state container with a unidirectional data flow:

- Single source of truth (store)
- State is read-only and changed only by actions
- Changes are made with pure functions (reducers)

### Zustand

A lightweight alternative to Redux with a simpler API:

\`\`\`jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
\`\`\`

### Jotai

Jotai takes an atomic approach to state management:

\`\`\`jsx
const countAtom = atom(0);
const doubleCountAtom = atom((get) => get(countAtom) * 2);
\`\`\`

### Recoil

Facebook's experimental state management library designed specifically for React:

\`\`\`jsx
const countState = atom({
  key: 'countState',
  default: 0,
});
\`\`\`

## Choosing the Right Solution

The best state management solution depends on your application's needs:

- **Simple applications**: React's built-in state management is often sufficient
- **Medium complexity**: Context API can work well
- **Complex applications**: Consider Redux, Zustand, or another dedicated library
- **Specific requirements**: Some libraries excel at particular use cases (e.g., Recoil for derived state)

## Conclusion

Effective state management is crucial for building maintainable React applications. Start with the simplest solution that meets your needs, and don't be afraid to refactor as your application grows. Understanding the principles behind state management is more important than the specific tool you choose.
    `,
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "2023-09-10",
    author: authors[1],
    tags: ["React", "State Management", "Frontend"]
  },
  {
    id: "6",
    title: "Optimizing Website Performance",
    slug: "optimizing-website-performance",
    excerpt: "Learn techniques to improve your website's loading speed and overall performance.",
    content: `
# Optimizing Website Performance

Website performance is crucial for user experience and search engine rankings. A fast-loading website keeps users engaged and can lead to higher conversion rates. This article covers essential techniques to optimize your website's performance.

## Why Performance Matters

- **User Experience**: Users expect pages to load quickly; even small delays can lead to frustration.
- **Conversion Rates**: Faster sites typically have higher conversion rates.
- **SEO**: Page speed is a ranking factor for search engines.
- **Mobile Users**: Performance is especially important for users on mobile networks.

## Core Web Vitals

Google's Core Web Vitals are metrics that measure user experience in terms of loading, interactivity, and visual stability:

- **Largest Contentful Paint (LCP)**: Measures loading performance (optimal: < 2.5s)
- **First Input Delay (FID)**: Measures interactivity (optimal: < 100ms)
- **Cumulative Layout Shift (CLS)**: Measures visual stability (optimal: < 0.1)

## Performance Optimization Techniques

### 1. Optimize Images

Images often account for most of the downloaded bytes on a webpage:

- Use modern formats like WebP or AVIF
- Compress images without significant quality loss
- Implement responsive images with srcset
- Lazy load images below the fold

### 2. Minimize HTTP Requests

Each file your page requests adds loading time:

- Combine CSS and JavaScript files
- Use CSS sprites for small images
- Implement icon fonts or SVGs
- Use CSS for simple animations instead of GIFs

### 3. Leverage Browser Caching

Set appropriate cache headers to let browsers store resources locally:

\`\`\`
Cache-Control: max-age=31536000
\`\`\`

### 4. Use a Content Delivery Network (CDN)

CDNs distribute your content across multiple locations worldwide, reducing latency for users.

### 5. Optimize CSS and JavaScript

- Minify and compress files
- Remove unused code
- Load critical CSS inline
- Defer non-critical JavaScript

### 6. Implement Code Splitting

Split your JavaScript bundle into smaller chunks that load on demand:

\`\`\`javascript
// Using dynamic imports in React
const SomeComponent = React.lazy(() => import('./SomeComponent'));
\`\`\`

### 7. Optimize Web Fonts

Web fonts can slow down rendering:

- Limit the number of font variations
- Use font-display: swap
- Consider system fonts for non-brand text

## Measuring Performance

Use these tools to analyze and monitor your website's performance:

- Lighthouse (in Chrome DevTools)
- WebPageTest
- PageSpeed Insights
- Chrome User Experience Report

## Conclusion

Performance optimization is an ongoing process. Start with the highest-impact changes and continuously measure and refine. Remember that the ultimate goal is to provide a better user experience, which will also benefit your business objectives.
    `,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "2023-10-15",
    author: authors[2],
    tags: ["Performance", "Web Development", "Optimization"]
  }
];

// Helper functions
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
