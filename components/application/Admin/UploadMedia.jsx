"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { showToast } from "@/lib/showToast";

const UploadMedia = ({ isMultiple }) => {
	const handleOnError = (error) => {
		console.error("Upload Error:", error);
		showToast("error", error?.statusText || "Upload failed");
	};

	const handleOnQueuesEnd = async (results) => {
		console.log("Upload Result:", results);
		showToast("success", "Upload completed successfully");
	};

	return (
		<CldUploadWidget
			signatureEndpoint="/api/cloudinary-signature"
			uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			onError={handleOnError}
			onQueuesEnd={handleOnQueuesEnd}
			config={{
				cloud: {
					cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
					apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
				},
			}}
			options={{
				multiple: isMultiple,
				maxFiles: isMultiple ? 10 : 1,
				folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
				sources: [
					"local",
					"url",
					"camera",
					"image_search",
					"google_drive",
					"facebook",
					"dropbox",
					"instagram",
				],
			}}
		>
			{({ open }) => (
				<Button onClick={() => open?.()}>
					<FilePlus className="mr-2 h-4 w-4" />
					Upload Media
				</Button>
			)}
		</CldUploadWidget>
	);
};

export default UploadMedia;
