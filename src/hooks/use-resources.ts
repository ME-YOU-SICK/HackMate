"use client";

import { useState, useEffect } from 'react';
import { ResourceMetadata, fetchMultipleResources } from '@/lib/metadata-fetcher';

export function useResources() {
  const [resources, setResources] = useState<ResourceMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResources() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the URLs from the txt file
        const response = await fetch('/resources-urls.txt');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch resources file: ${response.status}`);
        }
        
        const text = await response.text();
        
        // Parse URLs from the text file
        const urls = text
          .split('\n')
          .map(line => line.trim())
          .filter(line => line && line.startsWith('http'));
        
        if (urls.length === 0) {
          throw new Error('No valid URLs found in resources file');
        }
        
        console.log(`Loading ${urls.length} resources...`);
        
        // Fetch metadata for all URLs
        const resourcesData = await fetchMultipleResources(urls);
        
        console.log(`Successfully loaded ${resourcesData.length} resources`);
        setResources(resourcesData);
      } catch (err) {
        console.error('Error loading resources:', err);
        setError(err instanceof Error ? err.message : 'Failed to load resources');
        
        // Set some fallback resources if loading fails completely
        const fallbackResources = [
          {
            title: 'React',
            description: 'Official React documentation and guides',
            image: '/default-favicon.svg',
            url: 'https://react.dev',
            domain: 'react.dev'
          },
          {
            title: 'MDN Web Docs',
            description: 'Web development resources and documentation',
            image: '/default-favicon.svg',
            url: 'https://developer.mozilla.org',
            domain: 'developer.mozilla.org'
          },
          {
            title: 'GitHub',
            description: 'Code hosting and collaboration platform',
            image: '/default-favicon.svg',
            url: 'https://github.com',
            domain: 'github.com'
          }
        ];
        setResources(fallbackResources);
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, []);

  return { resources, loading, error };
}
