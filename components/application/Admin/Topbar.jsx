import ThemeSwitch from "./ThemeSwitch";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { RiMenu4Fill } from "react-icons/ri";

const Topbar = () => {
	return (
		<div className="fixed border-b border-gray-200 h-12 top-0 left-0 right-0 z-30 pr-4 md:pl-70 flex justify-between items-center bg-white dark:bg-card">
			<div>
				<p>Search Component</p>
			</div>
			<div className="flex items-center gap-2">
				<ThemeSwitch />
				<UserDropdown />
				<Button
					type="button"
					size="icon"
					className="md:hidden"
				>
					<RiMenu4Fill />
				</Button>
			</div>
		</div>
	);
};

export default Topbar;
