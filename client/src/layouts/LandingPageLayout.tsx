import { Outlet } from "react-router";
import NavBar from "@/components/ui/nav";

const LandingPageLayout = () => {
	return (
		<div className="min-h-svh bg-background">
			{/* <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
			<NavBar />
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
};

export default LandingPageLayout;
