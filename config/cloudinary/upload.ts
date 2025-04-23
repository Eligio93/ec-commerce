// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";

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

export async function uploadCategoryImage(file: File, categoryTitle: string) {
  const existingFolder = await cloudinary.search
    .expression(`folder:satur/categories/${categoryTitle}/*`)
    .execute();
  if (existingFolder) {
    for (let asset of existingFolder.resources) {
      await cloudinary.uploader.destroy(asset.public_id);
    }
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const uploadResult: UploadApiResponse = await new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream(
        { folder: `satur/categories/${categoryTitle}` },
        (error, uploadResult) => {
          return resolve(uploadResult as UploadApiResponse);
        }
      )
      .end(buffer);
  });
  return uploadResult.secure_url;
}
