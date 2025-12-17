import { LuUserRound } from "react-icons/lu";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlinePermMedia, MdOutlineShoppingBag } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { TbBrandProducthunt } from "react-icons/tb";
import { IoMdStarOutline } from "react-icons/io";
import { ADMIN_MEDIA_SHOW } from "../routes/AdminPanelRoute";

const adminAppSidebarMenu = [
	{
		title: "Dashboard",
		icon: AiOutlineDashboard,
		url: "#",
	},
	{
		title: "Categories",
		icon: BiCategory,
		url: "#",
		submenu: [
			{
				title: "Add Category",
				url: "#",
			},
			{
				title: "All Category",
				url: "#",
			},
		],
	},
	{
		title: "Products",
		icon: IoShirtOutline,
		url: "#",
		submenu: [
			{
				title: "Add Product",
				url: "#",
			},
			{
				title: "Add Variant",
				url: "#",
			},
			{
				title: "All Products",
				url: "#",
			},
			{
				title: "Product Variants",
				url: "#",
			},
		],
	},
	{
		title: "Coupons",
		icon: RiCoupon3Line,
		url: "#",
		submenu: [
			{
				title: "Add Coupon",
				url: "#",
			},
			{
				title: "All Coupons",
				url: "#",
			},
		],
	},
	{
		title: "Orders",
		icon: MdOutlineShoppingBag,
		url: "#",
	},
	{
		title: "Customers",
		icon: LuUserRound,
		url: "#",
	},
	{
		title: "Ratings & Reviews",
		icon: IoMdStarOutline,
		url: "#",
	},
	{
		title: "Medias",
		icon: MdOutlinePermMedia,
		url: ADMIN_MEDIA_SHOW,
	},
];
export default adminAppSidebarMenu;
