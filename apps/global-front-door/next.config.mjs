/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/page-a",
          destination: "http://localhost:3001/page-a",
        },
        {
          source: "/page-a/:path*",
          destination: "http://localhost:3001/page-a/:path*",
        },
        {
          source: "/page-b",
          destination: "http://localhost:3002/page-b",
        },
        {
          source: "/page-b/:path*",
          destination: "http://localhost:3002/page-b/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
