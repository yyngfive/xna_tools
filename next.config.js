//onst withMDX = require('@next/mdx')();
const withMDX = require('@next/mdx')()
const nextTranslate = require('next-translate-plugin')

 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
  
}

const config = nextTranslate(nextConfig)
config.i18n = undefined;
 
module.exports = withMDX(config)
//export default nextConfig;
