
const properties = [
    {
        id: '1',
        name: 'شقة فاخرة في وسط المدينة',
        type: 'شقة',
        city: 'الرياض',
        price: '1,200,000 د.ج',
        area: '200 متر مربع',
        bedrooms: 3,
        bathrooms: 3,
        description: 'شقة فاخرة بتصميم عصري في قلب الرياض، تتميز بإطلالات بانورامية على المدينة وقربها من جميع الخدمات والمرافق الحيوية.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+1+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+1+Image+2',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+1+Image+3'
        ],
        location: 'وسط المدينة، الرياض',
        featured: true,
        ownerPhone: '+213555123456'
    },
    {
        id: '2',
        name: 'فيلا عائلية في حي هادئ',
        type: 'فيلا',
        city: 'جدة',
        price: '2,500,000 د.ج',
        area: '450 متر مربع',
        bedrooms: 5,
        bathrooms: 5,
        description: 'فيلا واسعة ومريحة مثالية للعائلات الكبيرة، تقع في حي هادئ وآمن مع حديقة خاصة ومسبح.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+2+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+2+Image+2',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+2+Image+3'
        ],
        location: 'حي الروضة، جدة',
        featured: false,
        ownerPhone: '+213555123457'
    },
    {
        id: '3',
        name: 'محل تجاري في منطقة حيوية',
        type: 'محل',
        city: 'الدمام',
        price: '800,000 د.ج',
        area: '100 متر مربع',
        bedrooms: 0,
        bathrooms: 1,
        description: 'محل تجاري ممتاز في موقع استراتيجي بمنطقة تجارية نشطة، مناسب لمختلف أنواع الأعمال.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+3+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+3+Image+2'
        ],
        location: 'شارع الملك فهد، الدمام',
        featured: false,
        ownerPhone: '+213555123458'
    },
    {
        id: '4',
        name: 'أرض سكنية للبيع',
        type: 'أرض',
        city: 'بامنديل',
        price: '300 دج',
        area: '192 متر مربع',
        bedrooms: 0,
        bathrooms: 0,
        description: 'المساحة: 192 مترالموقع: موقع استراتيجي هادئ ومناسب للسكن، قريبة جدًا من المسجد والمحلات التجارية الوثائق: عقد ملكية الفاص: 3 📌 موقع الأرض يجعلها مثالية لبناء منزل عائلي أو استثمار طويل المدى.📞 للاستفسار والتواصل مباشرة:0699908764',
        images: [
            'https://i.postimg.cc/wTZvJqT4/photo-2025-08-04-14-17-39.jpg',
			'https://i.postimg.cc/Zn1x1k4b/photo-2025-08-04-14-17-41.jpg',
			'https://i.postimg.cc/SjFcgWfj/photo-2025-08-04-14-17-38.jpg',
            'https://i.postimg.cc/GmDpxW4L/photo-2025-08-04-14-17-35.jpg'
        ],
        location: 'حي بامنديل',
        featured: true,
		ownerPhone: '+213540076713'
    },
    {
        id: '5',
        name: 'شقة مفروشة للإيجار اليومي',
        type: 'شقة',
        city: 'مكة المكرمة',
        price: '300 د.ج/يوم',
        area: '80 متر مربع',
        bedrooms: 1,
        bathrooms: 1,
        description: 'شقة مفروشة بالكامل ومجهزة للإيجار اليومي، قريبة من الحرم المكي الشريف، مثالية للزوار والمعتمرين.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+5+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+5+Image+2'
        ],
        location: 'حي العزيزية، مكة المكرمة',
        featured: false,
        ownerPhone: '+213555123460'
    },
    {
        id: '6',
        name: 'فيلا فاخرة مع إطلالة بحرية',
        type: 'فيلا',
        city: 'الخبر',
        price: '3,800,000 د.ج',
        area: '700 متر مربع',
        bedrooms: 6,
        bathrooms: 7,
        description: 'فيلا فخمة بتصميم فريد وإطلالة مباشرة على البحر، تحتوي على مسبح خاص وحديقة واسعة ومرافق ترفيهية متكاملة.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+6+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+6+Image+2',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+6+Image+3'
        ],
        location: 'كورنيش الخبر، الخبر',
        featured: true,
        ownerPhone: '+213555123461'
    },
    {
        id: '7',
        name: 'مكتب إداري للبيع',
        type: 'مكتب',
        city: 'الرياض',
        price: '650,000 د.ج',
        area: '75 متر مربع',
        bedrooms: 0,
        bathrooms: 1,
        description: 'مكتب إداري جاهز للبيع في برج تجاري حديث، موقع مميز وسهولة الوصول، مثالي للشركات الصغيرة والمتوسطة.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+7+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+7+Image+2'
        ],
        location: 'طريق الملك فهد، الرياض',
        featured: false,
        ownerPhone: '+213555123462'
    },
    {
        id: '8',
        name: 'أرض زراعية كبيرة',
        type: 'أرض',
        city: 'القصيم',
        price: '1,500,000 د.ج',
        area: '5000 متر مربع',
        bedrooms: 0,
        bathrooms: 0,
        description: 'أرض زراعية خصبة بمساحة كبيرة، مناسبة للاستثمار الزراعي أو بناء استراحة خاصة.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+8+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+8+Image+2'
        ],
        location: 'بريدة، القصيم',
        featured: false,
        ownerPhone: '+213555123463'
    },
    {
        id: '9',
        name: 'شقة استوديو عصرية',
        type: 'شقة',
        city: 'الرياض',
        price: '450,000 د.ج',
        area: '50 متر مربع',
        bedrooms: 0,
        bathrooms: 1,
        description: 'شقة استوديو بتصميم عصري ومساحة عملية، مثالية للأفراد أو الأزواج، قريبة من الجامعات والمرافق الترفيهية.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+9+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+9+Image+2'
        ],
        location: 'حي الياسمين، الرياض',
        featured: true,
        ownerPhone: '+213555123464'
    },
    {
        id: '10',
        name: 'فيلا دوبلكس للبيع',
        type: 'فيلا',
        city: 'جدة',
        price: '1,800,000 د.ج',
        area: '300 متر مربع',
        bedrooms: 4,
        bathrooms: 4,
        description: 'فيلا دوبلكس بتصميم أنيق وتشطيبات عالية الجودة، توفر مساحة معيشة مريحة للعائلة.',
        images: [
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+10+Image+1',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+10+Image+2',
            'https://via.placeholder.com/600x400/000000/FFFFFF?text=Property+10+Image+3'
        ],
        location: 'حي السلامة، جدة',
        featured: false,
        ownerPhone: '+213555123465'
    }
];

// Categories data
const categories = [
    { id: 'apartment', name: 'شقق', icon: '🏠', count: 3 },
    { id: 'villa', name: 'فيلات', icon: '🏡', count: 3 },
    { id: 'shop', name: 'محلات', icon: '🏪', count: 1 },
    { id: 'land', name: 'أراضي', icon: '🌍', count: 2 },
    { id: 'office', name: 'مكاتب', icon: '🏢', count: 1 }
];



