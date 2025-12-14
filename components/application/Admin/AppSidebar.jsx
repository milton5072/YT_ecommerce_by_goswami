import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AiOutlineDashboard } from "react-icons/ai";
import adminAppSidebarMenu from "../../../lib/adminSidebarMenu";
import Link from "next/link";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LuChevronRight } from "react-icons/lu";

const AppSidebar = () => {
	return (
		<Sidebar className="z-50">
			<div className="flex justify-between items-center font-bold dark:text-white px-4 border-b py-3">
				Logo
				<button type="button">X</button>
			</div>
			<SidebarContent className="p-2">
				<SidebarMenu>
					{adminAppSidebarMenu.map((menu, index) => (
						<Collapsible
							key={index}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton asChild className = "font-semibold px-2 py-5">
										<Link href={menu?.url}>
											<menu.icon />
											<span>{menu.title}</span>
											{menu?.submenu && menu.submenu.length > 0 && (
												<LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											)}
										</Link>
									</SidebarMenuButton>
								</CollapsibleTrigger>
								{menu?.submenu && menu.submenu.length > 0 && (
									<CollapsibleContent>
										<SidebarGroup className="mt-1 mb-2">
											<SidebarGroupContent>
												{menu.submenu.map((subMenu, subIndex) => (
													<SidebarGroupLabel key={subIndex}>
														<Link
															href={subMenu.url}
															className="w-full pl-2 py-3 hover:bg-gray-100"
														>
															{subMenu.title}
														</Link>
													</SidebarGroupLabel>
												))}
											</SidebarGroupContent>
										</SidebarGroup>
									</CollapsibleContent>
								)}
							</SidebarMenuItem>
						</Collapsible>
					))}
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
};

export default AppSidebar;
