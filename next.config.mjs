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
      {
        protocol: "https",
        hostname: "*.websale.*",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.kopp-verlag.de",
        port: "",
      },
    ],
  },
};

export default nextConfig;
