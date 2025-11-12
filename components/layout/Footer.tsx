import Link from 'next/link'
import styles from './Footer.module.css'
import { FOOTER_NAVIGATION_SECTIONS } from './navigation'

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
            {/* Left side - Contact button and Navigation */}
            <div className={styles.leftSection}>
              {/* Contact button */}
              <div className={styles.contactButtonArea}>
                <Link href="/contact" className={styles.contactButtonLarge}>
                  <span className={styles.contactButtonTextLarge}>お問い合わせはこちら</span>
                  <span className={styles.contactButtonArrowLarge}>→</span>
                </Link>
              </div>

              {/* Navigation section */}
              <div className={styles.navSection}>
                <div className={styles.navGrid}>
                  {FOOTER_NAVIGATION_SECTIONS.map((section) => (
                    <div key={section.title} className={styles.navColumn}>
                      <h3 className={styles.navTitle}>{section.title}</h3>
                      <ul className={styles.navLinks}>
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} className={styles.navLink}>
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Logo section */}
            <div className={styles.logoSection}>
              <div className={styles.logoWrapper}>
                <img
                  src="/img/common/footer_logo.png"
                  alt="Kanseibunseki"
                  className={styles.footerMainLogo}
                />
                <span className={styles.copyright}>
                  © 2024 Kanseibunseki Inc. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer