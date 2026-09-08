/**
 * Robots.txt for Search Engine Crawling
 * Route: /robots.txt
 */

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/admin', '/api/*', '/private/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
      },
    ],
    sitemap: 'https://www.ourdreams.us/sitemap.xml',
  };
}
