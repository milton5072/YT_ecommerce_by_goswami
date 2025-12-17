import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({ breadcrumbData = [] }) => {
	return (
		<Breadcrumb className="mb-4">
			<BreadcrumbList>
				{breadcrumbData.map((item, index) => (
					<React.Fragment key={item.href ?? item.label ?? index}>
						<BreadcrumbItem>
							{item.href ? (
								<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>

						{index < breadcrumbData.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default BreadCrumb;
