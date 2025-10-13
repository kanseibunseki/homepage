import Link from 'next/link'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Grid pattern background */}
        <div className={styles.gridPattern} />
        
        <div className={styles.footerInner}>
          {/* Large background text */}
          <div className={styles.bgText}>KANSEIBUNSEKI</div>
          
          {/* Floating accent circles */}
          <div className={`${styles.floatingAccent} ${styles.floatingAccent1}`} />
          <div className={`${styles.floatingAccent} ${styles.floatingAccent2}`} />
          
          {/* Main footer content */}
          <div className={styles.footerMainContent}>
            {/* Contact button */}
            <div className={styles.contactButtonArea}>
              <Link href="/contact" className={styles.contactButtonLarge}>
                <span className={styles.contactButtonTextLarge}>お問い合わせはこちら</span>
                <span className={styles.contactButtonArrowLarge}>→</span>
              </Link>
            </div>

            {/* Logo section - same height as contact button */}
            <div className={styles.logoSection}>
              <div className={styles.logoWrapper}>
                <img 
                  src="/wordpress-img/common/footer_logo.png" 
                  alt="Kanseibunseki" 
                  className={styles.footerMainLogo}
                />
                <span className={styles.copyright}>
                  © 2024 Kanseibunseki Inc. All rights reserved.
                </span>
              </div>
            </div>
          </div>

          {/* Navigation section - below */}
          <div className={styles.navSection}>
            <div className={styles.navGrid}>
              <div className={styles.navColumn}>
                <h3 className={styles.navTitle}>Navigation</h3>
                <ul className={styles.navLinks}>
                  <li>
                    <Link href="/" className={styles.navLink}>
                      トップページ
                    </Link>
                  </li>
                  <li>
                    <Link href="/company" className={styles.navLink}>
                      会社概要
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className={styles.navColumn}>
                <h3 className={styles.navTitle}>Services</h3>
                <ul className={styles.navLinks}>
                  <li>
                    <Link href="/#consulting" className={styles.navLink}>
                      コンサルティング
                    </Link>
                  </li>
                  <li>
                    <Link href="/#ai-poc" className={styles.navLink}>
                      AI PoC開発
                    </Link>
                  </li>
                  <li>
                    <Link href="/#saas" className={styles.navLink}>
                      SaaSサービス
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className={styles.navColumn}>
                <h3 className={styles.navTitle}>Company</h3>
                <ul className={styles.navLinks}>
                  <li>
                    <Link href="/members" className={styles.navLink}>
                      経営メンバー
                    </Link>
                  </li>
                  <li>
                    <Link href="/#price" className={styles.navLink}>
                      料金プラン
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className={styles.navColumn}>
                <h3 className={styles.navTitle}>Legal</h3>
                <ul className={styles.navLinks}>
                  <li>
                    <Link href="/privacy" className={styles.navLink}>
                      プライバシーポリシー
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className={styles.navLink}>
                      利用規約
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer