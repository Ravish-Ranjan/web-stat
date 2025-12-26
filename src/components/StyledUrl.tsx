import { LinkIcon } from "@/assets/misc";

function StyledUrl({
	url,
	urlDepth = 5,
	showIcon = true,
}: {
	url: string;
	urlDepth?: number;
	showIcon?: boolean;
}) {
	const removedProtocolUrl = url.split("//")[1];
	let routeSection = removedProtocolUrl.split("/").splice(1);
	if (routeSection.length > urlDepth) {
		routeSection = routeSection.splice(0, urlDepth);
		routeSection[routeSection.length - 1] += "/...";
	}
	return (
		<span className="flex items-end-safe">
			{removedProtocolUrl.split("/")[0]}
			{routeSection.length > 0 && (
				<span className="text-gray-500">/{routeSection.join("/")}</span>
			)}
			{showIcon && (
				<LinkIcon className="ml-2 stroke-blue-500 dark:stroke-blue-400" />
			)}
		</span>
	);
}

export default StyledUrl;
