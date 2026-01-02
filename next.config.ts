import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "avatars.githubusercontent.com" },
			{ protocol: "https", hostname: "lh3.googleusercontent.com" },
			{ protocol: "https", hostname: "www.gravatar.com" },
		],
	},
	allowedDevOrigins: ["192.168.x.x", "192.168.x.x:3000"],
};

export default nextConfig;
