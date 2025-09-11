export const en = {
    backToHomeAria: 'Back to homepage',
    toggleThemeAria: 'Toggle theme',
    toggleLanguageAria: 'Change language',
    toggleMenuAria: 'Open/close main menu',
    readMore: 'Read More',
    readMoreAria: (title: string) => `Read more about ${title}`,
    backToPosts: 'Back to all posts',
    authorBy: 'By',
    publishedOn: 'on',
    sharePost: 'Share this post',
    shareOn: (name: string) => `Share on ${name}`,
    comments: 'Comments',
    noComments: 'No comments yet.',
    beFirstComment: 'Be the first to share your thoughts!',
    leaveComment: 'Leave a Comment',
    yourName: 'Your Name',
    yourNamePlaceholder: 'John Doe',
    yourComment: 'Your Comment',
    yourCommentPlaceholder: 'Share your thoughts...',
    submitComment: 'Submit Comment',
    submitting: 'Submitting...',
    formError: 'Please fill in both your name and comment.',
    postNotFound: 'Post not found.',
    footerRights: 'All Rights Reserved.',
    footerBuiltWith: 'Built with React, Tailwind CSS, and Gemini AI.',
    services: 'Services',
    blog: 'Blog',
    pricing: 'Pricing',
    referencie: 'References',
    about: 'About Us',
    ourServices: 'Our Services',
    servicesDescription: 'We provide comprehensive moving, clearing, and cleaning services with a focus on quality, reliability, and customer satisfaction.',
    servicesContent: [
        {
            icon: 'HomeModernIcon',
            title: 'Apartment Moving',
            usp: 'Move your apartment without stress. VI&MO offers complete moving services from studio to 4-bedroom apartments, including packing, assembly, and safe transport.',
            featuresTitle: 'Complete Service for Apartments',
            features: [
                { text: 'Furniture disassembly and assembly' },
                { text: 'Reliable logistics in Bratislava (transport up to €30)' },
                { text: 'Fair prices and a transparent price list', link: 'pricing' },
                { text: 'Property protection and insurance included' }
            ],
            faqs: [
                { q: 'How much does it cost to move an apartment in Bratislava?', a: 'The price varies by apartment size. A studio starts from €65, a 2-bedroom from €140. For an exact price, see our price list or contact us.' },
                { q: 'What is included in the price?', a: 'The price includes the labor of our workers, transport within Bratislava, and basic furniture protection. Additional services like packing are extra.' },
                { q: 'Do you also provide box packing?', a: 'Yes, we offer complete packing services including the supply of materials. You can order this service separately.' },
                { q: 'How is furniture protected during transport?', a: 'We wrap your furniture in protective foils and blankets. All cargo is securely fastened in the vehicle and insured.' },
                { q: 'How many workers will come for the move?', a: 'Usually two workers for smaller apartments. For larger ones, we deploy three or more for maximum efficiency.' }
            ]
        },
        {
            icon: 'BuildingOfficeIcon',
            title: 'Company Moving',
            usp: 'Reliable corporate moving with minimal operational downtime. We move offices, warehouses, and commercial spaces—efficiently and on schedule.',
            featuresTitle: 'Efficient Corporate Relocation Plan',
            features: [
                { text: 'Scheduling with minimal business disruption' },
                { text: 'Expert handling of IT equipment and furniture' },
                { text: 'Insurance and professional approach' },
                { text: 'References from companies in Bratislava', link: 'references' }
            ],
            faqs: [
                { q: 'How long does it take to move an office?', a: 'It depends on the size, but an average office (5-10 employees) can be moved in 4-8 hours.' },
                { q: 'What if we need to move overnight?', a: 'We offer moving services on weekends or at night to minimize the impact on your business operations.' },
                { q: 'Can you handle packing of IT equipment?', a: 'Yes, our staff is trained to safely pack and transport computers, servers, and other sensitive equipment.' },
                { q: 'Is it possible to insure the entire move?', a: 'Yes, the entire move is covered by our liability insurance for damages.' },
                { q: 'Do you also move archive documents?', a: 'Of course, we ensure the discreet and secure transport of your archives and important documents.' }
            ]
        },
        {
            icon: 'TrashIcon',
            title: 'Clearing & Disposal',
            usp: 'We clear out apartments, basements, garages, and entire companies. We also handle eco-friendly waste disposal. We take care of everything for you, hassle-free.',
            featuresTitle: 'Fast and Complete Clearing',
            features: [
                { text: 'Clearing of apartments, houses, offices, warehouses' },
                { text: 'Eco-friendly waste disposal and landfill transport' },
                { text: 'Transparent pricing and price list', link: 'pricing' },
                { text: 'Reliable team with references', link: 'references' }
            ],
            faqs: [
                { q: 'How quickly can you clear out an apartment?', a: 'We can typically clear a standard apartment within a single day. We will schedule a time that suits your needs.' },
                { q: 'Do you also handle waste removal?', a: 'Yes, complete removal and eco-friendly disposal at approved sites are part of our service.' },
                { q: 'What about large furniture?', a: 'Our team can handle the disassembly and removal of large furniture pieces like wardrobes or sofas.' },
                { q: 'Do you dispose of electronic appliances?', a: 'Yes, we ensure the eco-friendly disposal of old electronics in accordance with current legislation.' },
                { q: 'Is the service available on weekends?', a: 'Yes, we provide clearing services on weekends at no extra charge.' }
            ]
        },
        {
            icon: 'TruckIcon',
            title: 'Transportation',
            usp: 'Fast and reliable transport of furniture, parcels, and goods in and out of Bratislava. Fair prices: up to €30 within BA, €0.80/km outside the city.',
            featuresTitle: 'Transport in and around Bratislava',
            features: [
                { text: 'Transport for apartments, offices, and smaller moves' },
                { text: 'Outside the city for a fair rate of €0.80/km' },
                { text: 'High-quality and spacious vehicles' },
                { text: 'Price list with a minimum trip charge', link: 'pricing' }
            ],
            faqs: [
                { q: 'How much does transport cost within Bratislava?', a: 'The transport price within Bratislava is a fixed rate of up to €30.' },
                { q: 'Do you transport furniture outside the city?', a: 'Yes, we provide transport throughout Slovakia and abroad at a rate of €0.80/km.' },
                { q: 'What is the size of your cargo space?', a: 'We have vans with cargo space volumes ranging from 12 m³ to 18 m³.' },
                { q: 'Can I order a driver with an assistant?', a: 'Yes, you can also order one or more of our workers to help with loading and unloading.' },
                { q: 'Is the minimum price fixed?', a: 'Yes, the minimum charge for a trip is €70, which covers our basic operational costs.' }
            ]
        },
        {
            icon: 'BoxIcon',
            title: 'Packing',
            usp: 'Professional packing for your move. Boxes, foils, wrapping of fragile items, furniture disassembly and assembly. We save your time and protect your property.',
            featuresTitle: 'Complete Packing for Homes and Businesses',
            features: [
                { text: 'Supply of packing materials (boxes, foils)' },
                { text: 'Expert wrapping of fragile items' },
                { text: 'Disassembly and subsequent assembly of furniture' },
                { text: 'Clear price list as an additional service', link: 'pricing' }
            ],
            faqs: [
                { q: 'Do you supply boxes and foils?', a: 'Yes, we can arrange and deliver all necessary packing materials directly to you.' },
                { q: 'How do you pack fragile items?', a: 'We pack glass, porcelain, and electronics in bubble wrap and place them in sturdy boxes with padding.' },
                { q: 'What if I don\'t have time to prepare things in advance?', a: 'That\'s exactly where our packing service helps. We will come and safely pack everything for you.' },
                { q: 'Can you disassemble and assemble furniture?', a: 'Yes, our workers have the tools and experience to disassemble and assemble most types of furniture.' },
                { q: 'Is packing included in the moving price?', a: 'Packing is an additional service. The basic moving price includes loading, transport, and unloading of already prepared items.' }
            ]
        },
    ],
    servicesCtaTitle: 'Need a Professional Move?',
    servicesCtaDescription: 'Want to know the exact price? Fill out the non-binding form or check our indicative price list. We will respond within 24 hours.',
    servicesCtaPricingBtn: 'View Price List',
    servicesCtaContactBtn: 'Contact for a Quote',
    includedServices: 'Included Services',
    getOffer: 'Get an offer',
    getQuote: 'Get a Quote',
    nonBindingOffer: 'Non-binding price offer today',
    offerDescription: 'Planning a move in or around Bratislava? Fill out the short form and we will prepare a free price offer tailored to your needs. No obligations, just fast and fair information.',
    offerDescriptionShort: 'Fill out the short form and we will prepare a free price offer tailored to your needs.',
    writeEmail: 'Write an Email',
    contactUs: 'Contact Us',
    movingContact: 'Moving contact',
    cleaningContact: 'Cleaning contact',
    businessInfo: 'Business Information',
    privacy: 'Privacy Policy',
    areYouMoving: 'Are you moving? Write to us.',
    nameOrCompany: 'Name / Company *',
    mobile: 'Mobile *',
    email: 'Email *',
    address: 'Address',
    sendRequest: 'Send Request',
    pricingAndQuote: 'Pricing & Quote',
    pricingDescription: 'We provide transparent prices and individual offers. See our basic price list or request a custom quote.',
    basePriceList: 'Base Price List',
    fromPrice: 'from',
    priceTooltip: 'Prices are indicative. The final price depends on the scope and conditions.',
    familyHouse: 'Family House',
    familyHousePrice: 'Price on request',
    workersPrice: 'Price of Workers',
    oneWorker: 'One worker - driver + mover',
    twoWorkers: 'Two workers',
    threeOrMoreWorkers: 'Three or more',
    pricePerHour: '€ / hr.',
    priceByAgreement: 'price by agreement',
    transportPrice: 'Transport Price',
    withinBratislava: 'Within Bratislava up to',
    outsideCity: 'Outside the city',
    pricePerKm: '€/km',
    minTripPrice: 'Minimum trip amount:',
    formFullName: 'Full Name *',
    formEmail: 'E-mail *',
    formPhone: 'Phone *',
    formServiceType: 'Type of Service',
    formFromAddress: 'Address from',
    formToAddress: 'Address to',
    formFromFloor: 'Floor from',
    formToFloor: 'Floor to',
    formElevator: 'Elevator',
    formYes: 'Yes',
    formNo: 'No',
    formMoveDate: 'Moving Date',
    formExtraServices: 'Additional Services',
    servicePacking: 'Packing',
    serviceBubbleWrap: 'Bubble wrap',
    serviceAssembly: 'Disassembly/assembly of furniture',
    serviceDisposal: 'Waste disposal',
    formNotes: 'Notes',
    formGdpr: 'I agree to the processing of personal data for the purpose of processing the price offer.',
    formSubmit: 'Send Request',
    formSubmitting: 'Submitting...',
    formSuccess: 'Thank you! Your request has been sent. We will get back to you within 24 hours.',
    formQueued: 'You are offline. Your request has been saved and will be sent when you reconnect.',
    formNewRequest: 'New Request',
    errorRequired: 'This field is required.',
    errorEmail: 'Please enter a valid email.',
    errorPhone: 'Please enter a valid phone number.',
    errorGdpr: 'You must agree to the data processing.',
    faqTitle: 'Frequently Asked Questions',
    faqQ1: 'How is the transport price calculated?',
    faqA1: 'Within Bratislava, we charge a fixed fee of up to €30. For moves outside the city, the price is €0.80 per kilometer for the round trip.',
    faqQ2: 'Is there a minimum charge?',
    faqA2: 'Yes, the minimum invoiced amount for any trip is €70. This covers our basic costs and time.',
    faqQ3: 'How quickly will I receive a quote?',
    faqA3: 'After submitting the form, we will usually get back to you with a precise price offer within 24 hours on business days.',
    estimateTitle: 'Price Estimate',
    estimateDescription: 'This calculation is an estimate. We will send you the exact price after you submit the form.',
    estimateBase: 'Base rate',
    estimateFloors: 'Surcharge for floors',
    estimateServices: 'Additional services',
    estimateTotal: 'Total estimate',
    skipToContent: 'Skip to main content',
    references: {
        title: 'Our Satisfied Customers',
        description: 'The trust and satisfaction of our clients are our greatest reward. Read what those we have already helped have to say about us.',
        testimonials: [
            {
                quote: 'The move of our 3-bedroom apartment went absolutely smoothly and professionally. The guys were fast, careful, and very nice. Everything went according to plan. I definitely recommend them!',
                author: 'Katarína V.',
                company: 'Apartment Move, Bratislava'
            },
            {
                quote: 'We needed to move our office over the weekend to avoid disrupting business. The VI&MO team handled it perfectly. On Monday, we were able to operate without any issues. Great job.',
                author: 'Martin S.',
                company: 'CEO, IT Firm Ltd.'
            },
            {
                quote: 'Quick and hassle-free clearing of a basement after my grandparents. They took everything away and handled the disposal. They saved me a lot of time and worry.',
                author: 'Peter K.',
                company: 'Clearing Service, Petržalka'
            },
            {
                quote: 'We used the complete services including packing. It was amazing to see how professionally and quickly they could pack up an entire household. Nothing was damaged. Thank you!',
                author: 'Lenka & Tomáš M.',
                company: 'House Move, Stupava'
            },
            {
                quote: 'Reliable transport service. I needed to transport larger furniture from a store and everything was done quickly and at a good price. The driver was very helpful.',
                author: 'Jana D.',
                company: 'Transport Service, Bratislava'
            },
            {
                quote: 'Maximum satisfaction. Moving a company is always stressful, but with VI&MO it was a breeze. Efficient, organized, and everything exactly according to plan. I recommend them to all companies.',
                author: 'Eva H.',
                company: 'Office Manager, Marketing Agency'
            }
        ]
    },
    aboutPageContent: {
        heroTitle: 'About Us – VI&MO',
        heroSubtitle: 'Strong Hands & Honest Approach',
        heroText: 'Professional moving for apartments, houses, companies, waste removal and disposal, and cleaning. Fast, reliable, and affordable – for 7 years in and around Bratislava.',
        companyTitle: 'We are a strong team in "moving & logistic" services',
        companyText1: 'We have more than 7 years of experience in professional moving, eco-friendly waste disposal, and premium cleaning services. We move apartments in Ružinov and Petržalka, houses, offices, and entire companies, remove unwanted items, and ensure perfect order. Our services also include packing for moving and special tasks like piano or safe moving.',
        companyText2: 'We work quickly, efficiently, and with a human touch. We operate mainly in Bratislava (Nové Mesto, Rača, Karlova Ves, Dúbravka) and its surroundings (Senec, Pezinok, Šamorín, Malacky) and pride ourselves on a fair approach, reliability, and honest work. Whether it\'s company moving, clearing out apartments, or a general cleaning after renovation – we are here for you, with a transparent moving price list and the option for moving insurance. We also offer weekend and night moving.',
        servicesTitle: 'Our Services',
        services: [
            { title: 'Apartment and House Moving', description: 'We will move you without stress and unnecessary worries. We provide furniture disassembly and assembly, wrapping of fragile items, handling, and transport – quickly, safely, and responsibly.' },
            { title: 'Company, Warehouse, and Facility Moving', description: 'Relocation of offices, warehouses, or commercial premises with minimal operational downtime – effective planning and reliable logistics, experienced team.' },
            { title: 'Clearing, Disposal, and Waste Removal', description: 'Clearing of apartments, basements, garages, and complete company clear-outs including eco-friendly disposal of unwanted furniture and waste – no worries, we will handle everything for you.' },
            { title: 'Professional Cleaning Services', description: 'One-time and regular cleaning of apartments, houses, offices, and companies after renovation or preparing a space before moving in – cleanliness you can rely on.' }
        ],
        ctaTitle: '👉 Want to know the price or book a date right away?',
        ctaButtonPrimary: 'Price Quote',
        ctaButtonSecondary: 'Contact Us',
        ctaButtonTertiary: 'References'
    },
    // FIX: Add translations for chatbot component.
    chatbot: {
        welcomeMessage: 'Hello! I am your VI&MO AI assistant. How can I help you with your moving or cleaning needs?',
        errorInit: 'Error initializing AI assistant.',
        errorResponse: 'Sorry, an error occurred. Please try again later.',
        title: 'AI Assistant',
        placeholder: 'Ask me anything...',
        openChat: 'Open Chat',
        closeChat: 'Close Chat',
    },
    // SEO Titles
    seoTitleHome: 'VI&MO | Moving, Cleaning, and Clearing Services in Bratislava',
    seoTitlePricing: 'Pricing for Moving and Services | VI&MO Bratislava',
    seoTitleReferences: 'Customer References and Reviews | VI&MO Bratislava',
    seoTitleBlog: 'Blog About Moving and Living | VI&MO Tips and Advice',

    seoTitleAbout: 'About Us | VI&MO - Your Moving Partner in Bratislava',
    // SEO Descriptions
    seoDescHome: 'Professional moving for apartments and companies, cellar clearing and waste removal, and cleaning services in and around Bratislava. Get a non-binding price offer from VI&MO.',
    seoDescPricing: 'Clear price list for VI&MO moving and cleaning services in Bratislava. Get an online price estimate or request a non-binding custom quote.',
    seoDescReferences: 'Read reviews and experiences from our satisfied customers. Find out why VI&MO is the best choice for your move in Bratislava.',
    seoDescBlog: 'Tips, tricks, and advice for hassle-free moving, effective cleaning, and home organization from the experts at VI&MO.',
    seoDescAbout: 'Learn more about VI&MO. We are your reliable partner for apartment and company moving, clearing, and transport services in Bratislava and its surroundings (Senec, Pezinok, Malacky).',
    seoKeywordsAbout: 'about us, moving Bratislava, company moving, apartment clearing, transport Bratislava, Ružinov, Petržalka, Nové Mesto, Rača, Karlova Ves, Dúbravka, Senec, Pezinok, Šamorín, Malacky, piano moving, safe moving, weekend moving, night moving, moving insurance'
  };