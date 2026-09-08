/**
 * SEO Configuration for OurDreams
 * Optimized for Google and Bing with curated keywords
 */

export const SEO_KEYWORDS = [
  'curated shopping',
  'corporate gifts',
  'customized gifts',
  'personalized gifts',
  'gift ideas',
  'executive gifts',
  'business gifts',
  'Shiva Dhanuskodi',
  'Richa Shivarajkumar',
  'Rohit Shivarajkumar',
  'AniShiv',
  'Mesonsoft',
  'Anita Shiva',
  'Anitha Nellaiappan',
  'unique gifts online',
  'premium corporate gifts',
  'luxury gift shopping',
  'bulk gift orders',
  'customizable products',
];

export const SEO_CONFIG = {
  site: {
    name: 'OurDreams',
    url: 'https://www.ourdreams.us',
    description: 'Discover curated shopping for corporate gifts, customized gifts, and unique personalized presents. Founded by Shiva Dhanuskodi, Richa Shivarajkumar, and Rohit Shivarajkumar of AniShiv and Mesonsoft.',
    image: 'https://www.ourdreams.us/og-image.png',
    twitterHandle: '@OurDreamsGifts',
  },
  pages: {
    home: {
      title: 'OurDreams - Curated Shopping for Corporate Gifts & Customized Presents',
      description: 'Discover personalized corporate gifts, customized gift ideas, and unique shopping experiences. Founded by Shiva Dhanuskodi, Richa Shivarajkumar, Rohit Shivarajkumar. Explore AniShiv and Mesonsoft\'s curated collection.',
      keywords: 'curated shopping, corporate gifts, customized gifts, Shiva Dhanuskodi, AniShiv, Mesonsoft',
      ogTitle: 'OurDreams - Curated Corporate Gifts & Customized Presents',
      ogDescription: 'Premium curated shopping experience for corporate gifts and personalized presents by the founders of AniShiv and Mesonsoft.',
    },
    catalog: {
      title: 'Corporate Gifts & Customized Presents | OurDreams Catalog',
      description: 'Browse our curated collection of corporate gifts, executive gifts, and customized presents. Premium gift ideas for businesses and individuals. Explore thousands of personalized gift options.',
      keywords: 'corporate gifts, customized gifts, executive gifts, business gifts, personalized presents, bulk orders',
      ogTitle: 'Corporate Gifts Catalog - Premium Customized Presents | OurDreams',
      ogDescription: 'Curated corporate gifts and customized presents for businesses and individuals. Explore thousands of personalized gift options in our premium catalog.',
    },
    about: {
      title: 'About OurDreams - Curated Gifts by AniShiv & Mesonsoft Team',
      description: 'Learn about OurDreams, founded by Shiva Dhanuskodi, Richa Shivarajkumar, and Rohit Shivarajkumar. Discover our mission for curated shopping and personalized corporate gifts through AniShiv and Mesonsoft.',
      keywords: 'Shiva Dhanuskodi, Richa Shivarajkumar, Rohit Shivarajkumar, AniShiv, Mesonsoft, about us',
      ogTitle: 'About OurDreams - Founded by AniShiv & Mesonsoft',
      ogDescription: 'Discover the story behind OurDreams curated shopping platform founded by Shiva Dhanuskodi, Richa Shivarajkumar, and Rohit Shivarajkumar.',
    },
    contact: {
      title: 'Contact OurDreams - Curated Corporate Gifts & Customized Presents',
      description: 'Get in touch with OurDreams for corporate gifts, customized presents, and bulk gift orders. Contact our team for personalized shopping assistance.',
      keywords: 'contact us, corporate gifts, customized gifts, customer support',
      ogTitle: 'Contact OurDreams - Corporate Gifts Support',
      ogDescription: 'Reach out to OurDreams for personalized assistance with corporate gifts and customized presents.',
    },
  },
};

export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OurDreams',
    url: 'https://www.ourdreams.us',
    logo: 'https://www.ourdreams.us/logo.png',
    description: 'Curated shopping platform for corporate gifts and customized presents',
    foundingDate: '2023',
    founders: [
      {
        '@type': 'Person',
        name: 'Shiva Dhanuskodi',
        affiliation: 'AniShiv, Mesonsoft',
      },
      {
        '@type': 'Person',
        name: 'Richa Shivarajkumar',
        affiliation: 'AniShiv, Mesonsoft',
      },
      {
        '@type': 'Person',
        name: 'Rohit Shivarajkumar',
        affiliation: 'AniShiv, Mesonsoft',
      },
    ],
    sameAs: [
      'https://www.anishiv.com',
      'https://www.mesonsoft.com',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://www.ourdreams.us/contact',
    },
  },
  product: (name: string, price: number, description: string, image: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
    },
  }),
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
};

export function getMetadata(page: keyof typeof SEO_CONFIG.pages) {
  const pageConfig = SEO_CONFIG.pages[page];
  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    openGraph: {
      title: pageConfig.ogTitle,
      description: pageConfig.ogDescription,
      url: `${SEO_CONFIG.site.url}`,
      siteName: SEO_CONFIG.site.name,
      images: [
        {
          url: SEO_CONFIG.site.image,
          width: 1200,
          height: 630,
          alt: 'OurDreams - Curated Corporate Gifts',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageConfig.ogTitle,
      description: pageConfig.ogDescription,
      image: SEO_CONFIG.site.image,
      creator: SEO_CONFIG.site.twitterHandle,
    },
    canonical: `${SEO_CONFIG.site.url}`,
  };
}

export function getProductStructuredData(
  id: string,
  name: string,
  price: number,
  description: string,
  image: string,
  category: string,
  inStock: boolean
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SEO_CONFIG.site.url}/shop/product/${id}`,
    name,
    description,
    image,
    category,
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'USD',
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SEO_CONFIG.site.url}/shop/product/${id}`,
    },
  };
}
