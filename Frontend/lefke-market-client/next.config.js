const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withSvgr = require('next-svgr')
const withPlugins = require('next-compose-plugins')


module.exports = withPlugins([
    withBundleAnalyzer,
    withSvgr
], {
  reactStrictMode: true,
})
    typescript: {
      ignoreBuildErrors: true
    }

