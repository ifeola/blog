import { Outlet } from "react-router";
import NavBar from "@/components/ui/nav";

const LandingPageLayout = () => {
	return (
		<div className="min-h-svh bg-gray-50 dark:bg-brand-dark">
			{/* <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
			<NavBar />
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
};

export default LandingPageLayout;
