import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "http://localhost:3000",
      },
    ],
  },
};

export default withPayload(nextConfig);
