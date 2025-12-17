"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

const handleOnQueuesEnd = (result) => {
	console.log("Upload Result: ", result);
};
const UploadMedia = ({ isMultiple }) => {
	const handleOnError = (error) => {
		console.error("Upload Error: ", error);
	};

	return (
		<CldUploadWidget
			signatureEndpoint="api/cloudinary-signature"
			uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			onError={handleOnError}
			onQueuesEnd={handleOnQueuesEnd}
			config={{
				cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
				apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
			}}
			options={{
				multiple: isMultiple,
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
				folder: process.env.CLOUDINARY_FOLDER,
				maxFiles: isMultiple ? 10 : 1,
			}}
		>
			{({ open }) => {
				return (
					<Button onClick={() => open && open()}>
						<FilePlus className="mr-2 h-4 w-4" />
						Upload Media
					</Button>
				);
			}}
		</CldUploadWidget>
	);
};
export default UploadMedia;
