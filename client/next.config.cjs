//Configuración para usar ECMAScript modules y poder conectar con bases de datos MySql a traves de Google Cloud Platform
module.exports = async (phase, { defaultConfig }) => {
/**  @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
      swcMinify: true,
      }
    return nextConfig
  }