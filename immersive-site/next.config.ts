import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Verhindert falsche Workspace-Root-Erkennung durch übergeordnete Lockfiles.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
