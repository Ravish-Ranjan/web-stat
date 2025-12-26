import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Web Stat",
		short_name: "webstat",
		description: "The best way to check status of your websites.",
		start_url: "/",
		display: "standalone",
		background_color: "#ece6d9",
		theme_color: "#21262a",
		icons: [
			{
				src: "/assets/icons/logo-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/assets/icons/logo-512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		shortcuts: [
			{
				name: "Dashboard",
				url: "/dashboard",
				description: "Manage your websites",
			},
			{
				name: "Profile",
				url: "/profile",
				description: "Your profile",
			},
		],
	};
}
