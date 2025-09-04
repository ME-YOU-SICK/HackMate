export interface ResourceMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  domain: string;
}

// Function to extract domain from URL
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

// Function to get favicon URL
export function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
  } catch {
    return '/default-favicon.svg';
  }
}

// Function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  // Create a temporary DOM element to decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

// Function to clean and normalize text
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, ' ') // Replace multiple newlines with single space
    .trim();
}

// Function to fetch metadata from a URL
export async function fetchResourceMetadata(url: string): Promise<ResourceMetadata> {
  try {
    // Try multiple CORS proxies for better reliability
    const proxies = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      `https://cors-anywhere.herokuapp.com/${url}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
      `https://thingproxy.freeboard.io/fetch/${url}`,
      `https://corsproxy.io/?${encodeURIComponent(url)}`
    ];
    
    let html = '';
    let success = false;
    
    for (const proxyUrl of proxies) {
      try {
        const response = await fetch(proxyUrl, {
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        if (response.ok) {
          html = await response.text();
          success = true;
          break;
        }
      } catch (proxyError) {
        console.warn(`Proxy failed for ${url}:`, proxyError);
        continue;
      }
    }
    
    if (!success) {
      // Instead of throwing an error, return fallback metadata immediately
      console.warn(`All proxies failed for ${url}, using fallback metadata`);
      return getFallbackMetadata(url);
    }
    
    // Parse HTML to extract metadata
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                           html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
    
    // Decode HTML entities and clean text
    const rawTitle = titleMatch ? titleMatch[1].trim() : extractDomain(url);
    const rawDescription = descriptionMatch ? descriptionMatch[1].trim() : 'Visit this resource to learn more';
    
    const title = cleanText(decodeHtmlEntities(rawTitle)).substring(0, 100);
    const description = cleanText(decodeHtmlEntities(rawDescription)).substring(0, 200);
    const image = imageMatch ? imageMatch[1] : getFaviconUrl(url);
    
    return {
      title,
      description,
      image,
      url,
      domain: extractDomain(url)
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error);
    return getFallbackMetadata(url);
  }
}

// Function to get fallback metadata
function getFallbackMetadata(url: string): ResourceMetadata {
  const domain = extractDomain(url);
  const fallbackDescriptions: { [key: string]: string } = {
    'react.dev': 'Official React documentation and guides',
    'javascript.info': 'Modern JavaScript tutorial and reference',
    'developer.mozilla.org': 'MDN Web Docs - Web development resources',
    'github.com': 'GitHub - Code hosting and collaboration platform',
    'stackoverflow.com': 'Stack Overflow - Developer Q&A community',
    'freecodecamp.org': 'FreeCodeCamp - Learn to code for free',
    'codecademy.com': 'Codecademy - Interactive coding lessons',
    'udemy.com': 'Udemy - Online learning platform',
    'coursera.org': 'Coursera - Online courses from top universities',
    'figma.com': 'Figma - Collaborative design tool',
    'aws.amazon.com': 'Amazon Web Services - Cloud computing platform',
    'docker.com': 'Docker - Containerization platform',
    'kubernetes.io': 'Kubernetes - Container orchestration platform',
    'nodejs.org': 'Node.js - JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    'python.org': 'Python - Programming language',
    'docs.python.org': 'Python Documentation',
    'vuejs.org': 'Vue.js - Progressive JavaScript framework',
    'angular.io': 'Angular - Web application framework',
    'nextjs.org': 'Next.js - React framework for production',
    'nuxtjs.org': 'Nuxt.js - Vue.js framework',
    'svelte.dev': 'Svelte - Cybernetically enhanced web apps',
    'tailwindcss.com': 'Tailwind CSS - Utility-first CSS framework',
    'getbootstrap.com': 'Bootstrap - CSS framework',
    'material-ui.com': 'Material-UI - React components',
    'ant.design': 'Ant Design - React UI library',
    'chakra-ui.com': 'Chakra UI - Simple, modular and accessible component library',
    'storybook.js.org': 'Storybook - Tool for building UI components',
    'jestjs.io': 'Jest - JavaScript testing framework',
    'testing-library.com': 'Testing Library - Simple and complete testing utilities',
    'cypress.io': 'Cypress - End-to-end testing framework',
    'playwright.dev': 'Playwright - End-to-end testing for web apps',
    'webpack.js.org': 'Webpack - Module bundler',
    'vitejs.dev': 'Vite - Next generation frontend tooling',
    'parceljs.org': 'Parcel - Zero configuration build tool',
    'rollupjs.org': 'Rollup - Module bundler',
    'eslint.org': 'ESLint - JavaScript linter',
    'prettier.io': 'Prettier - Code formatter',
    'typescriptlang.org': 'TypeScript - Typed JavaScript',
    'graphql.org': 'GraphQL - Query language for APIs',
    'apollographql.com': 'Apollo - GraphQL platform',
    'prisma.io': 'Prisma - Database toolkit',
    'supabase.com': 'Supabase - Open source Firebase alternative',
    'firebase.google.com': 'Firebase - Google\'s mobile and web app development platform',
    'vercel.com': 'Vercel - Frontend cloud platform',
    'netlify.com': 'Netlify - Web development platform',
    'heroku.com': 'Heroku - Cloud platform',
    'digitalocean.com': 'DigitalOcean - Cloud infrastructure',
    'cloudflare.com': 'Cloudflare - Web performance and security',
    'stripe.com': 'Stripe - Online payment processing',
    'paypal.com': 'PayPal - Online payment system',
    'twilio.com': 'Twilio - Cloud communications platform',
    'sendgrid.com': 'SendGrid - Email delivery service',
    'mailchimp.com': 'Mailchimp - Marketing automation platform',
    'canva.com': 'Canva - Graphic design platform',
    'unsplash.com': 'Unsplash - Free stock photos',
    'pexels.com': 'Pexels - Free stock photos and videos',
    'fontawesome.com': 'Font Awesome - Icon library',
    'feathericons.com': 'Feather Icons - Simply beautiful open source icons',
    'heroicons.com': 'Heroicons - Beautiful hand-crafted SVG icons',
    'lucide.dev': 'Lucide - Beautiful & consistent icon toolkit',
    'codepen.io': 'CodePen - Front-end development playground',
    'jsfiddle.net': 'JSFiddle - Online code editor',
    'codesandbox.io': 'CodeSandbox - Online code editor',
    'replit.com': 'Replit - Online IDE and coding platform',
    'glitch.com': 'Glitch - Friendly community where everyone can discover and create',
    'notion.so': 'Notion - All-in-one workspace',
    'trello.com': 'Trello - Project management tool',
    'asana.com': 'Asana - Work management platform',
    'slack.com': 'Slack - Business communication platform',
    'discord.com': 'Discord - Voice, video and text communication',
    'zoom.us': 'Zoom - Video communications platform',
    'meet.google.com': 'Google Meet - Video conferencing',
    'teams.microsoft.com': 'Microsoft Teams - Collaboration platform'
  };
  
  return {
    title: domain,
    description: fallbackDescriptions[domain] || 'Visit this resource to learn more',
    image: getFaviconUrl(url),
    url,
    domain
  };
}

// Function to fetch multiple resources
export async function fetchMultipleResources(urls: string[]): Promise<ResourceMetadata[]> {
  const promises = urls.map(url => fetchResourceMetadata(url));
  const results = await Promise.allSettled(promises);
  
  // Return all results, including fallback metadata for failed requests
  return results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      // If a promise was rejected, create fallback metadata
      console.warn('Failed to fetch metadata, using fallback:', result.reason);
      const url = urls[results.indexOf(result)] || '';
      return getFallbackMetadata(url);
    }
  });
}