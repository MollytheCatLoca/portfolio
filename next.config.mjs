/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID,
  },
  trailingSlash: true,
  // output: 'export', // Comentar o eliminar esta línea
  distDir: 'out',
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiTimeout: 30000, // 30 seconds
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiTimeout: 30000, // 30 seconds
  },
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    if (!dev && isServer) {
      config.externals.push({
        puppeteer: "require('puppeteer-core')",
        '@sparticuz/chromium-min': "require('@sparticuz/chromium-min')"
      })
    }
    return config
  },
};

export default nextConfig;