import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const AppSidebar = () => {
    return <Sidebar>
      <div className="flex justify-between items-center font-bold dark:text-white px-4">Logo
        <button type="button">X</button>
      </div>
      <SidebarContent>
        
      </SidebarContent>
    </Sidebar>;
};

export default AppSidebar;