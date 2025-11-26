import type { Metadata } from 'next'
import styles from './company.module.css'

export const metadata: Metadata = {
  title: '会社概要 - 株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
  description: '株式会社感性分析の会社概要をご紹介します。',
}

export default function CompanyPage() {
  return (
    <section className={styles.companySection}>
      <div className={styles.container}>
        {/* タイトルセクション */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <span className={styles.titleJa}>会社概要</span>
            <span className={styles.titleEn}>Company</span>
          </h1>
          <div className={styles.titleDivider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerDot}></div>
            <div className={styles.dividerLine}></div>
          </div>
        </div>

        {/* 会社情報リスト */}
        <ul className={styles.companyList}>
          <li className={styles.companyItem}>
            <div className={styles.companyItemInner}>
              <div className={styles.companyLabel}>
                <h2 className={styles.companyLabelTitle}>企業名</h2>
              </div>
              <div className={styles.companyContent}>
                <p className={styles.companyDetail}>株式会社感性分析</p>
              </div>
            </div>
          </li>

          <li className={styles.companyItem}>
            <div className={styles.companyItemInner}>
              <div className={styles.companyLabel}>
                <h2 className={styles.companyLabelTitle}>代表者</h2>
              </div>
              <div className={styles.companyContent}>
                <p className={styles.companyDetail}>
                  <span>田中丈士</span>
                  <span>宮嶋大輔</span>
                </p>
              </div>
            </div>
          </li>

          <li className={styles.companyItem}>
            <div className={styles.companyItemInner}>
              <div className={styles.companyLabel}>
                <h2 className={styles.companyLabelTitle}>所在地</h2>
              </div>
              <div className={styles.companyContent}>
                <p className={styles.companyDetail}>
                  大阪府大阪市淀川区西宮原1丁目5-33<br />新大阪飯田ビル1Ｆ
                </p>
              </div>
            </div>
          </li>

          <li className={styles.companyItem}>
            <div className={styles.companyItemInner}>
              <div className={styles.companyLabel}>
                <h2 className={styles.companyLabelTitle}>事業内容</h2>
              </div>
              <div className={styles.companyContent}>
                <p className={styles.companyDetail}>データ活用、AI活用、モデル開発等</p>
              </div>
            </div>
          </li>

        </ul>

        {/* 子会社セクション - 特別なカードデザイン */}
        <div className={styles.subsidiarySection}>
          <div className={styles.subsidiarySectionTitle}>
            <h2 className={styles.subsidiarySectionTitleText}>子会社</h2>
            <div className={styles.subsidiarySectionTitleLine}></div>
          </div>

          <div className={styles.subsidiaryCard}>
            <div className={styles.subsidiaryCardGlow}></div>

            <div className={styles.subsidiaryLogoArea}>
              <img
                src="/img/company/omnius-logo.png"
                alt="Omnius株式会社"
                className={styles.subsidiaryLogo}
              />
            </div>

            <div className={styles.subsidiaryContent}>
              <h3 className={styles.subsidiaryName}>Omnius株式会社</h3>
              <div className={styles.subsidiaryDivider}></div>
              <p className={styles.subsidiaryOwnership}>
                <span className={styles.ownershipLabel}>出資比率</span>
                <span className={styles.ownershipValue}>50%</span>
              </p>
              <a
                href="https://www.omnius.jp"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.subsidiaryLink}
              >
                <span>ウェブサイトを見る</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.subsidiaryFloatingIcons}>
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`material-symbols-outlined ${styles.floatingIcon}`}>
            {['star', 'rocket_launch', 'psychology', 'groups', 'speed', 'trending_up', 'workspace_premium', 'emoji_events'][i]}
          </span>
        ))}
      </div>
    </section>
  )
}