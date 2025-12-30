import Topbar from "@/components/Topbar";

function Page() {
	return (
		<>
			<Topbar
				links={[
					{ label: "Dashboard", path: "/dashboard" },
					{ label: "Profile",path:"/profile" },
				]}
			/>
		</>
	);
}

export default Page;
