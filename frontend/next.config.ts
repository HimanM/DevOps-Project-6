import type { NextConfig } from "next";

const isGithubPages = process.env.NEXT_PUBLIC_DEPLOY_SOURCE === 'github-pages';

const nextConfig: NextConfig = {

  ...(isGithubPages ? { output: 'export' } : { output: "standalone" }),
};

export default nextConfig;
