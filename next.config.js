/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['www.artic.edu', 'images.unsplash.com', 'res.cloudinary.com', 'www.casian.fr'],
//   },
// }

// module.exports = nextConfig

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.artic.edu', 'images.unsplash.com', 'res.cloudinary.com', 'www.casian.fr'],
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = Object.assign({}, nextConfig, withBundleAnalyzer)
