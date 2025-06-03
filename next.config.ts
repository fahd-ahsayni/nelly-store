import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL ? [{
        protocol: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).protocol.slice(0, -1) as 'http' | 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
        pathname: '/**',
      }] : [])
    ]
  }
};

export default nextConfig;
