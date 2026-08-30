/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Dev-only proxy so `next dev` can talk to a local PHP server at
  // http://127.0.0.1:8000 (see start_local.sh). Production is same-origin
  // (PHP lives at /api on the same host) so no rewrites are shipped.
  async rewrites() {
    const backend = process.env.PHP_BACKEND || "http://127.0.0.1:8000";
    return [
      { source: "/api/:path*", destination: `${backend}/:path*.php` },
    ];
  },
};

export default nextConfig;
