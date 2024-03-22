# 生成AIバトラー 画像生成処理

## 実行方法
### 依存関係のインストール:

```bash
bun install
```

### 実行:
実行の際、OPENAIのAPIキーが必要になります。
```bash
export OPENAI_API_KEY=<your_api_key>
bun run src/index.ts
```

### 解説
この画像生成は、以下のような流れで行われます。

1. インプットされた画像の説明文を生成
2. 生成された説明文から、カード用のタイトル、文章、パラメータを生成 (Json modeを利用)
3. 1および2で生成した情報を元に、OpenAIのDALL-E3を用いて画像を生成


#### JSON modeについて
上記2で生成する内容はOpenAIのAPIが提供するJSON Modeを利用し、結果をJson形式で取得します。
プロンプトで以下のような指定をすることで、概ね要望通りのJsonを返してくれます。
```
format:
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
```
個人的には、Union型の指定がちゃんと伝わってくれるのが嬉しかったポイントです。
また、プロンプトで渡すJsonへのコメントの有無でかなり生成結果が変わるので、ぜひ色々試してみてください。

### 悩み
カードゲームのイラストを生成するのですが、DALL-Eは生成画像自体にステータス表示をしてしまう
クセがあるようです。 うまくそういった生成を防ぐ方法があれば、ぜひ教えていただきたいです。