import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/application/Admin/AppSidebar";
import Topbar from "@/components/application/Admin/Topbar";
import ThemeProvider from "../../../../components/application/Admin/ThemeProvider";

const layout = ({ children }) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<SidebarProvider>
				<AppSidebar />
				<main className="md:w-[calc(100%-var(--sidebar-width))]">
					<div className="px-5 pt-[70px] pb-10 min-h-[calc(100vh-40px)]">
						<Topbar />
						{children}
					</div>
					<div className="border-t h-10 bg-gray-50 dark:bg-background flex items-center justify-center text-sm">
						<p>All rights reserved by YT_ecommerce</p>
					</div>
				</main>
			</SidebarProvider>
		</ThemeProvider>
	);
};
export default layout;
