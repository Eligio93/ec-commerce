// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary";

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Log the configuration

export async function uploadMultipleImages(
  files: File[],
  productTitle: string
) {
  const urlArray: string[] = [];
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = file.type;
    const dataUri = `data:${mimeType};base64,${base64}`;
    const res = await cloudinary.uploader.upload(dataUri, {
      folder: `satur/${productTitle}`,
    });
    urlArray.push(res.secure_url);
  }
  return urlArray;
}
