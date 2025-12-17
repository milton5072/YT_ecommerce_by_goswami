"use client";
import BreadCrumb from "../../../../../components/application/Admin/BreadCrumb";
import { ADMIN_DASHBOARD } from "../../../../../routes/AdminPanelRoute";
import UploadMedia from "../../../../../components/application/Admin/UploadMedia";

const breadcrumbData = [
	{ label: "Home", href: ADMIN_DASHBOARD },
	{ label: "Media", href: "" },
];
const MediaPage = () => {
	return (
		<div>
			<BreadCrumb breadcrumbData={breadcrumbData} />
			<UploadMedia isMultiple={true} />
		</div>
	);
};
export default MediaPage;
