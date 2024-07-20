import { Outlet } from "react-router-dom";
import Navbar from "../molecules/navbar";

const Layout = () => {
	return (
		<div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6">
			<main className="flex flex-col min-h-[100dvh] space-y-10">
				<Outlet />
			</main>
			<Navbar />
		</div>
	);
};

export default Layout;
