import { Translations, View } from "../App";
import { Post } from "../types";
import { generateSchema } from "./schemaService";

const BASE_URL = "https://viandmo.com";

/**
 * Updates a meta tag in the document's head. Creates it if it doesn't exist.
 */
const updateMetaTag = (property: string, content: string, isOg: boolean = false) => {
    const selector = isOg ? `meta[property='${property}']` : `meta[name='${property}']`;
    let element = document.querySelector<HTMLMetaElement>(selector);
    if (!element) {
        element = document.createElement('meta');
        if (isOg) {
            element.setAttribute('property', property);
        } else {
            element.setAttribute('name', property);
        }
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

/**
 * Updates the canonical link tag.
 */
const updateCanonicalLink = (href: string) => {
    let element = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
    }
    element.setAttribute('href', href);
};


/**
 * Injects or updates the JSON-LD schema script in the document's head.
 */
const injectJsonLd = (schema: object) => {
    let script = document.getElementById('schema-ld') as HTMLScriptElement | null;
    if (!script) {
        script = document.createElement('script');
        script.id = 'schema-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema, null, 2);
};


/**
 * Central service to update all SEO-related tags based on the current view.
 */
const updateSeoTags = (view: View, t: Translations, post?: Post) => {
    let title = t.seoTitleHome;
    let description = t.seoDescHome;
    let canonicalUrl = BASE_URL;
    let imageUrl = "https://picsum.photos/seed/stahovanie1/1200/630";
    let keywords = "sťahovanie Bratislava, cenník sťahovania, cenová ponuka sťahovanie, vypratávanie Bratislava, upratovanie Bratislava, sťahovacia služba, odvoz nábytku, čistenie firiem, VI&MO, lacné sťahovanie, sťahovanie firiem, likvidácia odpadu, kalkulácia sťahovania";

    switch(view) {
        case 'pricing':
            title = t.seoTitlePricing;
            description = t.seoDescPricing;
            canonicalUrl = `${BASE_URL}/#pricing`;
            break;
        case 'references':
            title = t.seoTitleReferences;
            description = t.seoDescReferences;
            canonicalUrl = `${BASE_URL}/#references`;
            break;
        case 'about':
            title = t.seoTitleAbout;
            description = t.seoDescAbout;
            keywords = t.seoKeywordsAbout;
            canonicalUrl = `${BASE_URL}/#about`;
            break;
        case 'blog':
            if (post) {
                title = `${post.title} | VI&MO Blog`;
                description = post.excerpt;
                canonicalUrl = `${BASE_URL}/#blog/${post.id}`;
                imageUrl = post.imageUrl;
                keywords = post.tags.join(', ');
            } else {
                title = t.seoTitleBlog;
                description = t.seoDescBlog;
                canonicalUrl = `${BASE_URL}/#blog`;
            }
            break;
        case 'services':
        default:
            // Default values are already set
            break;
    }

    // Update Title
    document.title = title;

    // Update Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Update Open Graph Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', imageUrl, true);
    
    // Update Twitter Card Tags
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:image', imageUrl, false);

    // Update Canonical URL
    updateCanonicalLink(canonicalUrl);

    // Generate and Inject JSON-LD Schema
    const schema = generateSchema(view, t, post);
    injectJsonLd(schema);
};

export const seoService = {
    updateSeoTags,
};