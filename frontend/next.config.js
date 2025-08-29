// frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',   // handles with or without trailing slash
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
