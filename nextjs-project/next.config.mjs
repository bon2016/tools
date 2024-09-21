/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    output: 'export',
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
    publicRuntimeConfig: {
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    },

};

export default nextConfig;
