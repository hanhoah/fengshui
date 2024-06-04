// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.media-amazon.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
