"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import React from "react";

type ButtonLoadingProps = {
	text: string;
	loading?: boolean;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	className?: string;
};

const ButtonLoading: React.FC<ButtonLoadingProps> = ({
	type,
	text,
	loading = false,
	className,
	onClick,
	...props
}) => {
	return (
		<Button
			type={type}
			disabled={loading}
			onClick={onClick}
			className={cn("flex items-center gap-2", className)}
			{...props}
		>
			{loading && <Spinner />}
			<span>{text}</span>
		</Button>
	);
};

export default ButtonLoading;
