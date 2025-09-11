import { Translations, View } from "../App";
import { Post } from "../types";
import { pricingData } from "../components/pricing/PricingGrid";

const BASE_URL = "https://viandmo.com";

const faqs = [
    { q: 'faqQ1', a: 'faqA1' },
    { q: 'faqQ2', a: 'faqA2' },
    { q: 'faqQ3', a: 'faqA3' },
];

const generateBreadcrumbs = (view: View, t: Translations, post?: Post) => {
    const itemListElement = [
        { "@type": "ListItem", "position": 1, "name": "VI&MO", "item": BASE_URL }
    ];

    switch (view) {
        case 'about':
            // FIX: Use the simple t.about string for the breadcrumb name, as t.about is no longer an object.
            itemListElement.push({ "@type": "ListItem", "position": 2, "name": t.about, "item": `${BASE_URL}/#about` });
            break;
        case 'services':
            itemListElement.push({ "@type": "ListItem", "position": 2, "name": t.services, "item": `${BASE_URL}/#services` });
            break;
        case 'pricing':
            itemListElement.push({ "@type": "ListItem", "position": 2, "name": t.pricing, "item": `${BASE_URL}/#pricing` });
            break;
        case 'references':
             itemListElement.push({ "@type": "ListItem", "position": 2, "name": t.referencie, "item": `${BASE_URL}/#references` });
            break;
        case 'blog':
            itemListElement.push({ "@type": "ListItem", "position": 2, "name": t.blog, "item": `${BASE_URL}/#blog` });
            if (post) {
                itemListElement.push({ "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}/#blog/${post.id}` });
            }
            break;
    }

    return { "@type": "BreadcrumbList", itemListElement };
};

const generatePageSchema = (view: View, t: Translations, post?: Post) => {
    switch (view) {
        case 'pricing':
            return {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": t[faq.q as keyof Translations] as string,
                    "acceptedAnswer": { "@type": "Answer", "text": t[faq.a as keyof Translations] as string }
                }))
            };
        case 'references':
            return {
                "@type": "WebPage",
                "name": t.references.title,
                "description": t.references.description,
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": t.references.testimonials.map((testimonial, index) => ({
                        "@type": "Review",
                        "position": index + 1,
                        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                        "author": { "@type": "Person", "name": testimonial.author },
                        "publisher": { "@type": "Organization", "name": testimonial.company },
                        "reviewBody": testimonial.quote
                    }))
                }
            };
        case 'blog':
            if (post) {
                return {
                    "@type": "Article",
                    "headline": post.title,
                    "image": post.imageUrl,
                    "datePublished": post.datePublished,
                    "author": { "@type": "Organization", "name": post.author },
                    "publisher": { "@type": "Organization", "name": "VI and MO s. r. o.", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/public/icons/icon-512x512.png` } }
                };
            }
            return null;
        default:
            return null;
    }
};

export const generateSchema = (view: View, t: Translations, post?: Post) => {
    const movingCompanySchema = {
        "@type": "MovingCompany",
        "name": "VI and MO s. r. o.",
        "url": BASE_URL,
        "telephone": "+421-911-275-755",
        "email": "info@viandmo.com",
        "description": t.seoDescHome,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Karpatské námestie 7770/10A",
            "addressLocality": "Bratislava",
            "postalCode": "831 06",
            "addressCountry": "SK"
        },
        "areaServed": [
            { "@type": "City", "name": "Bratislava" },
            { "@type": "City", "name": "Ružinov" },
            { "@type": "City", "name": "Petržalka" },
            { "@type": "City", "name": "Nové Mesto" },
            { "@type": "City", "name": "Rača" },
            { "@type": "City", "name": "Karlova Ves" },
            { "@type": "City", "name": "Dúbravka" },
            { "@type": "City", "name": "Senec" },
            { "@type": "City", "name": "Pezinok" },
            { "@type": "City", "name": "Malacky" }
        ],
        "priceRange": "€€",
        "logo": `${BASE_URL}/public/icons/icon-512x512.png`,
        "image": "https://picsum.photos/seed/stahovanie1/1200/630"
    };
    
    const serviceSchema = {
        "@type": "Service",
        "serviceType": "Moving service",
        "provider": { "@id": BASE_URL },
        "areaServed": { "@type": "City", "name": "Bratislava" },
        "name": t.services,
        "description": t.servicesDescription,
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": Math.min(...pricingData.map(p => p.price)),
            "priceCurrency": "EUR",
            "offerCount": pricingData.length,
        }
    };
    
    const breadcrumbSchema = generateBreadcrumbs(view, t, post);
    const pageSchema = generatePageSchema(view, t, post);
    
    const schemaGraph: object[] = [
        movingCompanySchema,
        serviceSchema,
        breadcrumbSchema,
    ];
    if (pageSchema) {
        // FIX: Explicitly type schemaGraph as object[] to allow pushing different schema types.
        (schemaGraph as object[]).push(pageSchema);
    }

    return {
        "@context": "https://schema.org",
        "@graph": schemaGraph
    };
};