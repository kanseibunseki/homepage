import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="l-footer">
      <div className="l-footer__inner">
        <div className="l-footer__logo">
          <picture>
            <source srcSet="/wordpress-img/common/sp/footer_logo.png" media="(max-width: 860px)" />
            <img src="/wordpress-img/common/footer_logo.png" alt="感性分析" width={362} height={429} decoding="async" loading="lazy" />
          </picture>
        </div>
        
        <div className="l-footer__logo-kirakirasmall">
          <img src="/wordpress-img/logo/kirakirasmall.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
        </div>
        <div className="l-footer__logo-exclamation">
          <img src="/wordpress-img/logo/exclamation.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
        </div>
        <div className="l-footer__logo-heartbreak">
          <img src="/wordpress-img/logo/heartbreak.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
        </div>

        <div className="l-footer__container">
          <nav className="l-footer__menu">
            <ul className="l-footer__menu__list">
              <li className="l-footer__menu__list__item">
                <Link href="/" className="l-footer__menu__list__item__link is-hover">
                  <h2 className="l-footer__menu__list__item__link__title">トップページ</h2>
                </Link>
              </li>
              <li className="l-footer__menu__list__item">
                <Link href="/members" className="l-footer__menu__list__item__link is-hover">
                  <h2 className="l-footer__menu__list__item__link__title">経営メンバー</h2>
                </Link>
              </li>
              <li className="l-footer__menu__list__item">
                <Link href="/#price" className="l-footer__menu__list__item__link is-hover">
                  <h2 className="l-footer__menu__list__item__link__title">金額</h2>
                </Link>
              </li>
              <li className="l-footer__menu__list__item">
                <Link href="/company" className="l-footer__menu__list__item__link is-hover">
                  <h2 className="l-footer__menu__list__item__link__title">会社概要</h2>
                </Link>
              </li>
              <li className="l-footer__menu__list__item u-pc"></li>
            </ul>

            <div className="l-footer__menu__contact">
              <span className="l-footer__menu__contact__sentence">お気軽にご相談ください。</span>
              <Link href="/contact" className="l-footer__menu__contact__btn is-hover">
                <picture>
                  <source srcSet="/wordpress-img/common/sp/footer_contact-btn.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/common/footer_contact-btn.png" alt="お問い合わせへ" width={748} height={136} decoding="async" loading="lazy" />
                </picture>
              </Link>
            </div>
          </nav>
          
          <span className="l-footer__copyright">Copyright © Kanseibunseki Inc.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer