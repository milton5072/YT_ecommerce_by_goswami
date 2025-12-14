import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/application/Admin/AppSidebar";

const layout = ({ children }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				{/* <SidebarTrigger /> */}
				{children}
			</main>
		</SidebarProvider>
	);
};
export default layout;
