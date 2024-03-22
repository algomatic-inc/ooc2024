import {encodeImage} from "./misc.ts";
import {program} from "commander";
import {generateCharacterImage, generateImageDescription, generateStatus} from "./openai.ts";

program
  .command("gen")
  .option("-n, --name <name>", "プレイヤー名")
  .option("-i, --image-path <image>", "画像のパス")
  .action(async ({name, imagePath}: { name: string; imagePath: string }) => {
    console.log("starting to process", name, imagePath);
    const imageBuffer = encodeImage(imagePath);

    // 画像の説明文を生成
    const imageDescription = await generateImageDescription(imageBuffer);
    console.log("imageDescription", imageDescription);

    // カードに表示するステータスを生成
    const status = await generateStatus(name, imageDescription);
    console.log("status", status);

    // DALL-Eで画像を生成
    const imageUrl = await generateCharacterImage(status, imageDescription);
    console.log("imageUrl", imageUrl);

    return;
  })
  .parse(process.argv);

