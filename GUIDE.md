# React Three Fiber スクロール連動ビジュアルテクニックガイド

## 概要
このガイドでは、`react-three-fiber-scroll-delay`プロジェクトで実装されている、スクロールと連動した美しい3Dビジュアルエフェクトのテクニックを解説します。

---

## 1. 基本概念の理解

### スクロール連動3Dとは？
ユーザーのスクロール操作に応じて、3D空間内のオブジェクトが動的に変化する仕組みです。
通常のWebページのスクロールを、3D空間での「カメラ移動」や「オブジェクト変形」のトリガーとして活用します。

### なぜ美しく見えるのか？
- **視差効果（パララックス）**: 異なる速度で動く要素が奥行き感を生む
- **段階的アニメーション**: 要素が順番に動き始めることで、リズムが生まれる
- **スムーズな補間**: 60FPSでの連続的な値の変化が滑らかさを実現

---

## 2. 核心技術の解説

### 2.1 ScrollControls - スクロール制御の中核

```javascript
<ScrollControls
  damping={3}        // 慣性の強さ（大きいほど滑らか）
  pages={2}          // 仮想ページ数（実際のコンテンツ高さを拡張）
  horizontal={false} // 垂直スクロール
  infinite={false}   // 無限スクロールoff
>
```

**damping（減衰）パラメータの効果:**
- `1`: 即座に停止（カクカク）
- `3`: 適度な慣性（推奨）
- `10`: 強い慣性（ヌルヌル）

### 2.2 useScroll - スクロール進行度の取得

```javascript
const data = useScroll();
// data.offset: 現在のスクロール位置（0-1）
// data.range(start, length): 特定範囲での進行度を取得
```

**range関数の仕組み:**
```javascript
data.range(0, 1/3)     // 最初の1/3区間での進行度（0→1）
data.range(1/3, 1/3)   // 中間1/3区間での進行度（0→1）
data.range(2/3, 1/3)   // 最後の1/3区間での進行度（0→1）
```

### 2.3 useFrame - アニメーションループ

```javascript
useFrame(() => {
  // 毎フレーム実行される（通常60FPS）
  // スクロール位置に基づいてオブジェクトを更新
})
```

---

## 3. 実装テクニック詳解

### 3.1 段階的ズーム効果

```javascript
// 画像1,2: 即座にズーム開始
group.current.children[0].material.zoom = 1 + data.range(0, 1/3) / 3;
group.current.children[1].material.zoom = 1 + data.range(0, 1/3) / 3;

// 画像3,4: 遅延してズーム開始（1.15/3の位置から）
group.current.children[2].material.zoom = 1 + data.range(1.15/3, 1/3) / 3;
group.current.children[3].material.zoom = 1 + data.range(1.15/3, 1/3) / 3;
```

**計算式の解説:**
- 基本倍率: `1`（100%）
- 追加倍率: `data.range() / 3`（最大33%増）
- 最終倍率: `1.0 〜 1.33`

### 3.2 3D空間での配置戦略

```javascript
// Y軸: 垂直位置
// - 0: 1ページ目の中央
// - -height: 2ページ目の中央

// Z軸: 奥行き（視差効果）
// - 1: 手前
// - 3.2: 奥

<Image position={[-1, 0, 1]} />        // 1ページ目、手前
<Image position={[-2.3, -height, 2]} /> // 2ページ目、中間
<Image position={[1.3, -height, 3.2]} />// 2ページ目、奥
```

### 3.3 Imageコンポーネントの特性

```javascript
<Image 
  url="./img.jpg"           // 画像パス
  scale={[4, height, 1]}    // [幅, 高さ, 厚み]
  position={[x, y, z]}      // 3D位置
/>
```

**scaleの工夫:**
- `[4, height, 1]`: ビューポート高さに合わせた縦長
- `[3, 3, 1]`: 正方形
- `[1.4, 2, 1]`: カスタム比率

---

## 4. 視覚的効果の演出パターン

### 4.1 視差スクロール（Parallax）
```javascript
// 異なるZ位置 = 異なる移動速度の錯覚
position={[x, y, 1]}  // 手前: 速く動く
position={[x, y, 2]}  // 中間: 普通
position={[x, y, 3]}  // 奥: ゆっくり動く
```

### 4.2 シーケンシャルアニメーション
```javascript
// 開始タイミングをずらす
item1: data.range(0.0, 0.3)    // 0%から開始
item2: data.range(0.1, 0.3)    // 10%から開始
item3: data.range(0.2, 0.3)    // 20%から開始
```

### 4.3 イージング効果
```javascript
// 線形
const linear = data.range(0, 1);

// イーズアウト
const easeOut = 1 - Math.pow(1 - data.range(0, 1), 3);

// イーズインアウト
const easeInOut = data.range(0, 1) < 0.5
  ? 2 * Math.pow(data.range(0, 1), 2)
  : 1 - Math.pow(-2 * data.range(0, 1) + 2, 2) / 2;
```

---

## 5. HTMLとCanvasの連携

### 5.1 Scroll HTMLレイヤー
```javascript
<Scroll html>
  {/* HTML要素をCanvas上に重ねる */}
  <h1 style={{ 
    position: "absolute", 
    top: "60vh",    // ビューポート基準
    left: "1.5em" 
  }}>
    テキスト
  </h1>
</Scroll>
```

### 5.2 位置の同期
```javascript
// Canvas内の画像位置
<Image position={[0, -height * 0.6, 1]} />

// 対応するHTML要素
<h1 style={{ top: "160vh" }}>  {/* 1 + 0.6 = 1.6 */}
```

---

## 6. パフォーマンス最適化

### 6.1 レンダリング設定
```javascript
<Canvas 
  gl={{ 
    antialias: false,           // アンチエイリアスoff（軽量化）
    powerPreference: 'high-performance'
  }} 
  dpr={[1, 1.5]}               // デバイスピクセル比制限
>
```

### 6.2 Suspenseによる遅延読み込み
```javascript
<Suspense fallback={null}>
  {/* 画像の読み込み完了まで待機 */}
  <Images />
</Suspense>
```

---

## 7. スタイリングのポイント

### 7.1 大胆なタイポグラフィ
```css
h1 {
  font-size: 17em;        /* 超大型サイズ */
  font-weight: 400;       /* 細めのウェイト */
  letter-spacing: -0.05em;/* 文字詰め */
  line-height: 0.7em;     /* 行間を詰める */
  color: white;
  text-shadow: 1px 0px 35px #383838; /* ソフトシャドウ */
}
```

### 7.2 カスタムカーソル
```css
body {
  cursor: url("data:image/svg+xml;base64,..."), auto;
  /* SVGで円形カーソルを定義 */
}
```

---

## 8. 実装チェックリスト

### 必須要素
- [ ] ScrollControlsコンポーネントの設定
- [ ] useScrollフックでのデータ取得
- [ ] useFrameでのアニメーション更新
- [ ] 適切なdamping値の設定

### 推奨要素
- [ ] Suspenseによる読み込み制御
- [ ] 複数のZ軸レイヤー配置
- [ ] 段階的なアニメーション開始
- [ ] HTMLとCanvasの連携

### パフォーマンス
- [ ] dpr制限の設定
- [ ] 不要なアンチエイリアスの無効化
- [ ] 画像の最適化
- [ ] メモ化の活用

---

## 9. トラブルシューティング

### よくある問題と解決策

**Q: スクロールがカクカクする**
- A: damping値を3-5に調整

**Q: 画像がぼやける**
- A: dpr値を上げる `dpr={[1, 2]}`

**Q: ズーム効果が効かない**
- A: Imageコンポーネントの使用を確認

**Q: HTMLとCanvasがずれる**
- A: position計算の単位を統一（vh使用推奨）

---

## 10. 応用アイデア

### ホームページへの実装案

1. **ヒーローセクション強化**
   - ロゴが徐々に拡大
   - キャッチコピーが順番に出現

2. **サービス紹介の視覚化**
   - 各サービスアイコンが回転しながら登場
   - スクロールで詳細が展開

3. **実績ギャラリー**
   - プロジェクト画像が立体的に配置
   - スクロールで焦点が移動

4. **チームメンバー紹介**
   - メンバー写真が段階的にズームイン
   - 役職・説明が遅延表示

5. **技術スタック表示**
   - 使用技術のロゴが浮遊
   - スクロールで接続線が描画

---

## まとめ

react-three-fiber-scroll-delayの実装は、以下の要素の組み合わせで美しいビジュアルを実現しています：

1. **ScrollControls** による滑らかなスクロール制御
2. **useScroll** での細かな進行度管理
3. **視差効果** による奥行き感の演出
4. **段階的アニメーション** によるリズムの創出
5. **HTMLとCanvasの連携** による豊かな表現

これらのテクニックを組み合わせることで、印象的でモダンなWebエクスペリエンスを構築できます。