// src/components/SeoHead.tsx
import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articlePublished?: string;
  articleAuthor?: string;
  /** JSON-LD structured data — pass an array of schema objects */
  jsonLd?: Record<string, unknown>[];
}

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export const SeoHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  articlePublished,
  articleAuthor,
  jsonLd = [],
}: SeoHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Basic meta
    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    });
    if (keywords?.length) {
      upsertMeta('meta[name="keywords"]', {
        name: 'keywords',
        content: keywords.join(', '),
      });
    }

    // Canonical
    if (canonical) upsertLink('canonical', canonical);

    // Open Graph
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: ogType,
    });
    if (ogImage) {
      upsertMeta('meta[property="og:image"]', {
        property: 'og:image',
        content: ogImage,
      });
    }
    if (canonical) {
      upsertMeta('meta[property="og:url"]', {
        property: 'og:url',
        content: canonical,
      });
    }

    // Twitter
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    if (ogImage) {
      upsertMeta('meta[name="twitter:image"]', {
        name: 'twitter:image',
        content: ogImage,
      });
    }

    // Article meta
    if (ogType === 'article') {
      if (articlePublished) {
        upsertMeta('meta[property="article:published_time"]', {
          property: 'article:published_time',
          content: articlePublished,
        });
      }
      if (articleAuthor) {
        upsertMeta('meta[property="article:author"]', {
          property: 'article:author',
          content: articleAuthor,
        });
      }
    }

    // JSON-LD
    document
      .querySelectorAll('script[data-seo-jsonld="true"]')
      .forEach((n) => n.remove());
    jsonLd.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      document
        .querySelectorAll('script[data-seo-jsonld="true"]')
        .forEach((n) => n.remove());
    };
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    articlePublished,
    articleAuthor,
    jsonLd,
  ]);

  return null;
};