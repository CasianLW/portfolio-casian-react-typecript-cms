/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.artic.edu', 'images.unsplash.com', 'res.cloudinary.com', 'www.casian.fr'],
  },
}

module.exports = nextConfig
