import {Status} from "./types.ts";

export const generateImageDescription = async (base64Image: string): Promise<string> => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
  };

  const payload = {
    "model": "gpt-4-vision-preview",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `
                        この画像に関する情報を、以下の観点に基づいて回答してください。
                        - 画像の概要
                        - 主に写っているもの
                        - 主に写っているものの説明
                        - 画像の雰囲気
                        `
          },
          {
            "type": "image_url",
            "image_url": {
              "url": `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    "max_tokens": 1000
  };

  // fetch the response
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)
  });
  // return the response
  const responseBody = await response.json();
  console.log(JSON.stringify(responseBody, null, 2));
  return responseBody.choices[0].message.content;
}


export const generateStatus = async (inputName: string, imageDescription: string) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
  };

  const payload = {
    "model": "gpt-4-0125-preview",
    "response_format": {type: "json_object"},
    "messages": [
      {
        "role": "user",
        "content": `
          トレーディングカードゲーム用のカードデータを構築しようとしています。
          上記の情報から、以下のJSONフォーマットでキャラクターのステータスを回答してください。
          レアリティなどもあなたの主観で決定して構いません。
          
          inputName: ${inputName}
          description: ${imageDescription}
          {
              rarity: "SSR|SR|N",
              // inputNameの面影を残しつつ、画像の要素を取り入れた名前
              name: string,
              // 名前の英語表記
              nameEn: string, 
              // 0-99999
              health: number,
              // 0-99999
              stamina: number,
              // 0-99999
              laziness: number,
              // 0-99999
              skill: number,
              // 説明テキスト（100字）
              description: string,
              // このカードの特殊効果 (100文字)
              specialEffect: string,
          }
          `
      }

    ],
    "max_tokens": 1000
  };

  // fetch the response
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)
  });
  // return the response
  const responseBody = await response.json();
  console.log(JSON.stringify(responseBody, null, 2));

  // 厳密には正しい型で返される保証はないので注意
  return JSON.parse(responseBody.choices[0].message.content);
}


export const generateCharacterImage = async (status: Status, imageDescription: string) => {

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
  };

  const payload = {
    "model": "dall-e-3",
    "prompt":
      `以下に示す情報から、キャラクターあるいはアイテムのイラストを生成してください。小説の挿絵に利用します。
            ---
            名称: ${status.name}
            画像の説明文: ${status.description}
            画像の効果: ${status.specialEffect}
            `,
    "n": 1,
    "size": "1024x1024"
  };
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)
  });
  const responseBody = await response.json();
  console.log(JSON.stringify(responseBody, null, 2));

  return responseBody.data[0].url;
}
