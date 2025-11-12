import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loadingScreen}>
      {/* 3Dパーティクル背景エフェクト */}
      <div className={styles.particleLoader}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>

      {/* 会社ロゴ */}
      <img
        src="/img/top/logo.png"
        alt="Loading..."
        className={styles.logo}
      />

      {/* ドットアニメーション */}
      <div className={styles.loadingAnimation}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>

      {/* プログレスバー */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>

      {/* ローディングテキスト */}
      <p className={styles.loadingText}>感性を分析中...</p>
    </div>
  )
}
