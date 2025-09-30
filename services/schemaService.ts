import { Translations, View } from "../App";
import { Post } from "../types";
import { pricingData } from "../components/pricing/PricingGrid";
import { KEYWORDS } from "../constants";

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
        case 'services':
            return {
                "@type": "WebPage",
                "name": t.services,
                "description": t.servicesDescription,
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://picsum.photos/seed/stahovanie1/1200/630"
                }
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
    const bratislavaDistricts = [
        'Staré Mesto', 'Ružinov', 'Petržalka', 'Nové Mesto', 'Karlova Ves', 'Dúbravka', 'Rača', 'Vajnory', 'Devín', 'Devínska Nová Ves', 'Záhorská Bystrica', 'Podunajské Biskupice', 'Vrakuňa', 'Jarovce', 'Rusovce', 'Čunovo'
    ];

    const satelliteTowns = ['Senec', 'Pezinok', 'Malacky'];

    const movingCompanySchema = {
        "@type": "MovingCompany",
        "@id": `${BASE_URL}#company`,
        "name": "VI and MO s. r. o.",
        "url": BASE_URL,
        "telephone": "+421-911-275-755",
        "email": "info@viandmo.com",
        "description": t.seoDescHome,
        "sameAs": [
            "https://www.facebook.com/",
            "https://www.instagram.com/",
            "https://www.linkedin.com/"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Karpatské námestie 7770/10A",
            "addressLocality": "Bratislava",
            "postalCode": "831 06",
            "addressCountry": "SK"
        },
        "areaServed": [
            { "@type": "City", "name": "Bratislava" },
            ...bratislavaDistricts.map(d => ({ "@type": "City", "name": d }))
        ],
        "priceRange": "€€",
        "logo": `${BASE_URL}/public/icons/icon-512x512.png`,
        "image": "https://picsum.photos/seed/stahovanie1/1200/630",
        "knowsAbout": [
            "Sťahovanie bytov",
            "Kancelárske sťahovanie",
            "Odvoz odpadu",
            "Vypratávanie priestorov",
            "Balenie a logistika",
            "Likvidácia nábytku"
        ]
    };
    
    const serviceSchema = {
        "@type": "Service",
        "@id": `${BASE_URL}#moving-service`,
        "serviceType": "Moving service",
        "provider": { "@id": `${BASE_URL}#company` },
        "areaServed": { "@type": "City", "name": "Bratislava" },
        "name": t.services,
        "description": t.servicesDescription,
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": Math.min(...pricingData.map(p => p.price)),
            "priceCurrency": "EUR",
            "offerCount": pricingData.length,
            "availability": "https://schema.org/InStock"
        }
    };

    // Granular service entities derived from keyword clusters (primary + secondary)
    const granularServices = [KEYWORDS.primary, ...KEYWORDS.secondary].map(kw => ({
        "@type": "Service",
        "@id": `${BASE_URL}#service-${encodeURIComponent(kw)}`,
        "name": kw,
        "serviceType": kw,
        "provider": { "@id": `${BASE_URL}#company` },
        "areaServed": { "@type": "City", "name": "Bratislava" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": Math.min(...pricingData.map(p => p.price)),
            "availability": "https://schema.org/InStock"
        }
    }));
    
    const breadcrumbSchema = generateBreadcrumbs(view, t, post);
    const pageSchema = generatePageSchema(view, t, post);

    // Add a lightweight FAQ block on homepage/services if none triggered by view
    const homepageFaq = view === 'services' ? {
        "@type": "FAQPage",
        "@id": `${BASE_URL}#faq-home`,
        "mainEntity": faqs.slice(0,2).map(faq => ({
            "@type": "Question",
            "name": t[faq.q as keyof Translations] as string,
            "acceptedAnswer": { "@type": "Answer", "text": t[faq.a as keyof Translations] as string }
        }))
    } : null;
    
    // Separate service for satellite towns (service area extension)
    const satelliteService = {
        "@type": "Service",
        "@id": `${BASE_URL}#moving-service-satellites`,
        "serviceType": "Moving service (satellite towns)",
        "provider": { "@id": `${BASE_URL}#company` },
        "areaServed": satelliteTowns.map(town => ({ "@type": "City", "name": town })),
        "name": t.services + ' – Satelitné Lokality',
        "description": t.servicesDescription,
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": Math.min(...pricingData.map(p => p.price)),
            "priceCurrency": "EUR",
            "offerCount": pricingData.length,
            "availability": "https://schema.org/InStock"
        }
    };

    // OfferCatalog aggregating all service offers (improves commercial entity linking)
    const offerCatalog = {
        "@type": "OfferCatalog",
        "@id": `${BASE_URL}#offer-catalog`,
        "name": "Ponuka služieb sťahovania a logistiky",
        "itemListElement": [
            { "@id": `${BASE_URL}#moving-service` },
            ...granularServices.map(s => ({ "@id": s['@id'] })),
            { "@id": `${BASE_URL}#moving-service-satellites` }
        ]
    };

    const schemaGraph: object[] = [
        movingCompanySchema,
        serviceSchema,
        ...granularServices,
        satelliteService,
        offerCatalog,
        breadcrumbSchema,
    ];
    if (pageSchema) {
        schemaGraph.push(pageSchema);
    }
    if (homepageFaq) {
        schemaGraph.push(homepageFaq);
    }

    return {
        "@context": "https://schema.org",
        "@graph": schemaGraph
    };
};