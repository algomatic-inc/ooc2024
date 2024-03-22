export type Status = {
  // レアリティ
  rarity: "SSR" | "SR" | "N";
  // キャラクター名
  name: string;
  // キャラクター名（英語表記）
  nameEn: string;
  // 体力
  health: number;
  // 気力
  stamina: number;
  // 怠惰力
  laziness: number;
  // 技術力
  skill: number;
  // 説明テキスト（100字）
  description: string;
  // このカードの特殊効果
  specialEffect: string;
}

export type ImageDescription = {
  // 画像の概要
  summary: string;
  // 主に写っているもの
  mainSubject: string;
  // 主に写っているものの説明
  mainSubjectDescription: string;
  // 画像の雰囲気
  mood: string;
}
