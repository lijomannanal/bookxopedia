/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'books.google.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
