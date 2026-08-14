/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "music-player-backend-bobe.onrender.com",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;