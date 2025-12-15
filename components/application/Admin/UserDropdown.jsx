import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import LogoutButton from "./LogoutButton";
const UserDropdown = () => {
	return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="me-5 w-44">
        <DropdownMenuLabel>
          <p className="font-semibold text-md">Hello Asad!</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="#">
          <IoShirtOutline/>
          New Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">
          <MdOutlineShoppingBag/>
          Orders
          </Link>
        </DropdownMenuItem>
        <LogoutButton/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};
export default UserDropdown;
