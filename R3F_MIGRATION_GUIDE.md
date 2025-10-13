# React Three Fiber 移行ガイド

## 📋 概要
このドキュメントは、現在のvanilla Three.jsからReact Three Fiber（R3F）への安全な移行計画を記載しています。

## 🎯 移行の目的
- Reactとの親和性向上
- 宣言的なコード記述
- 保守性の向上
- パフォーマンスの最適化
- 将来的な拡張性の確保

## 📊 現状分析

### 現在のThree.js/Canvas実装
| コンポーネント | 場所 | 機能 | 技術 | 優先度 |
|---|---|---|---|---|
| ThreeBackground.tsx | components/ | データポイントと接続線のアニメーション | Three.js | **1（最初）** |
| EmotionParticleSystem.tsx | components/three/ | 感情パーティクルシステム | Three.js | **2** |
| CursorRipple.tsx | components/effects/ | カーソルリップルエフェクト | Canvas API | 対象外 |
| GlobalDataStream.tsx | components/effects/ | データストリーム演出 | CSS only | 対象外 |

### 依存関係
- three: ^0.180.0
- @types/three: ^0.180.0
- react: ^19.1.1
- next: ^15.5.3

## 🚀 移行計画（3週間）

### Week 1: 準備とThreeBackground移行
#### Day 1-2: 環境準備
- [ ] パッケージインストール（具体的バージョン指定）
- [ ] .env.local設定
- [ ] フィーチャーフラグ実装
- [ ] エラーバウンダリー実装

#### Day 3-5: ThreeBackground移行
- [ ] ThreeBackgroundFiber.tsx作成
- [ ] パーティクルと接続線の実装
- [ ] 既存のwindowイベントとの競合解決
- [ ] 動作確認とA/Bテスト

### Week 2: EmotionParticleSystem移行
- [ ] EmotionParticleSystemFiber.tsx作成
- [ ] テクスチャアトラス移行
- [ ] パーティクル・接続マネージャー実装
- [ ] useEffectクリーンアップの適切な実装
- [ ] パフォーマンステスト

### Week 3: 統合と切り替え
- [ ] 統合テスト
- [ ] パフォーマンス最終確認
- [ ] 問題修正
- [ ] 本番環境での段階的切り替え
- [ ] モニタリング

## 🛠 技術的実装詳細

### パッケージインストール（具体的バージョン）
```bash
# React 19対応の最新安定版
npm install @react-three/fiber@8.15.12 @react-three/drei@9.88.17
```

### 環境変数設定（.env.local）
```bash
# R3F使用フラグ（開発時）
NEXT_PUBLIC_USE_R3F=false

# 本番切り替え時
# NEXT_PUBLIC_USE_R3F=true
```

### Next.js SSR対応
```tsx
import dynamic from 'next/dynamic'

const ThreeScene = dynamic(
  () => import('./ThreeScene'),
  { 
    ssr: false,
    loading: () => <div>Loading 3D...</div>
  }
)
```

### フィーチャーフラグ実装
```tsx
// config/features.ts
export const features = {
  useR3F: process.env.NEXT_PUBLIC_USE_R3F === 'true'
}

// コンポーネント内
import { features } from '@/config/features'

export default function Background() {
  if (features.useR3F) {
    return <ThreeBackgroundFiber />
  }
  return <ThreeBackground />
}
```

### エラーバウンダリー実装
```tsx
class R3FErrorBoundary extends React.Component {
  state = { hasError: false }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  
  render() {
    if (this.state.hasError) {
      return <div>3D rendering failed. Using fallback.</div>
    }
    return this.props.children
  }
}
```

### 基本的なR3Fコンポーネント構造
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ position: 'fixed', top: 0, left: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight />
      <OrbitControls enableZoom={false} />
      {process.env.NODE_ENV === 'development' && <Stats />}
      {/* 3Dコンテンツ */}
    </Canvas>
  )
}
```

### TypeScript型定義
```tsx
import { ThreeElements, useFrame } from '@react-three/fiber'

type ParticleProps = ThreeElements['mesh'] & {
  position: [number, number, number]
  speed: number
}
```

### 重要な実装注意点

#### 1. イベントリスナーの競合対策
```tsx
// R3F Canvas内でイベントを処理
<Canvas
  onCreated={({ gl }) => {
    // R3F専用のイベント領域として設定
    gl.domElement.style.pointerEvents = 'auto'
  }}
>
```

#### 2. useEffectクリーンアップ順序
```tsx
useEffect(() => {
  // セットアップ
  
  return () => {
    // 1. アニメーション停止
    // 2. イベントリスナー削除
    // 3. Three.jsオブジェクト破棄
    // 4. メモリ解放
  }
}, [])
```

#### 3. 既存スタイル維持
```tsx
// 既存のcanvasスタイルをそのまま適用
style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  pointerEvents: 'none'
}}

## ⚠️ リスク管理

### 潜在的リスク
1. レンダリングパフォーマンスの低下
2. ブラウザ互換性の問題
3. 既存アニメーションの不具合
4. メモリリーク
5. SSR/SSGビルドエラー
6. React 19との互換性問題
7. バンドルサイズの増加
8. WebGL非対応環境での動作

### 対策
- 各フェーズでのパフォーマンステスト
- 複数ブラウザでの動作確認
- 既存コンポーネントの並行運用
- 段階的なロールアウト
- dynamic importによるSSR回避
- エラーバウンダリーの実装
- コード分割によるバンドル最適化
- フォールバックUIの準備

## 🧪 テスト計画

### パフォーマンステスト
- FPS測定
- メモリ使用量監視
- CPU使用率確認
- ロード時間測定

### 視覚テスト
- スクリーンショット比較
- アニメーションの滑らかさ確認
- インタラクションの反応性

### ブラウザテスト
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📈 進捗トラッキング

### 完了状況
- [ ] フェーズ1: 準備
- [ ] フェーズ2: ThreeBackground移行
- [ ] フェーズ3: EmotionParticleSystem移行
- [ ] フェーズ4: 統合と最適化

### KPI
- パフォーマンス: 60fps維持
- バンドルサイズ: 20%以内の増加
- 初期ロード時間: 3秒以内
- メモリ使用量: 100MB以内

## 🔄 ロールバック計画

### 即時ロールバック手順
1. 環境変数 `NEXT_PUBLIC_USE_R3F=false` に設定
2. デプロイ実施
3. キャッシュクリア

### 問題別対応
| 問題 | 対応 | 復旧時間 |
|---|---|---|
| パフォーマンス低下 | フィーチャーフラグでOFF | 5分 |
| ビルドエラー | 以前のコミットに戻す | 10分 |
| 表示不具合 | vanilla実装に切り替え | 5分 |
| メモリリーク | 即座にロールバック | 5分 |

## 🛠️ 最小限の開発ツール

### 必須ツール
- Chrome DevTools Performance Tab - パフォーマンス計測
- [Stats.js](https://github.com/mrdoob/stats.js/) - FPS監視（開発時のみ）

### デバッグ方法
```tsx
// 開発時のみStatsを表示
{process.env.NODE_ENV === 'development' && <Stats />}

// コンソールでR3Fの状態確認
window.__R3F__
```

## 📚 参考資料

- [React Three Fiber公式ドキュメント](https://docs.pmnd.rs/react-three-fiber)
- [Drei（ヘルパーライブラリ）](https://github.com/pmndrs/drei)
- [Three.js → R3F移行ガイド](https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide)
- [Next.js + R3F ベストプラクティス](https://github.com/pmndrs/react-three-next)

## 📝 メモ・備考

- 移行は段階的に実施し、各段階で動作確認を行う
- ユーザーへの影響を最小限に抑える
- パフォーマンスと見た目の維持を最優先とする
- React 19の新機能（Suspense、Concurrent Features）を活用
- Next.js 15.5の最適化機能を最大限利用

## ✅ 実装開始チェックリスト

### 必須項目のみ
- [ ] 現在のFPS測定（ベースライン記録）
- [ ] Gitブランチ作成（feature/r3f-migration）
- [ ] .env.local作成
- [ ] フィーチャーフラグ動作確認

### 成功基準
- FPS: 60fps維持（±5fps許容）
- 見た目: 100%同一
- エラー: なし

---

最終更新日: 2024年12月