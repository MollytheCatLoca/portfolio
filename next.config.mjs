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
  //distDir: 'out',  // Puedes mantener esta configuración para especificar el directorio de salida
};

export default nextConfig;
