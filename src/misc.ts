import * as fs from "fs";

export const encodeImage = (imagePath: string) => {
  console.log("imagePath", imagePath)
  const imageFile = fs.readFileSync(imagePath);
  return Buffer.from(imageFile).toString('base64');
}
