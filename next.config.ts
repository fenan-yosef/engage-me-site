import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web.archive.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'web-static.archive.org',
        port: '',
        pathname: '/**',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/ProfilePictures',
        destination: '/staffapplication/ProfilePictures',
        permanent: true,
      },
      {
        source: '/ProfilePictures/:path*',
        destination: '/staffapplication/ProfilePictures/:path*',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
