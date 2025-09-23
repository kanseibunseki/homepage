'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="l-header">
      <div className={`c-hamburger js-hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="c-hamburger__menubtn">
          <picture>
            <source srcSet="/wordpress-img/common/sp/menu.png" media="(max-width: 860px)" />
            <img src="/wordpress-img/common/menu.png" alt="menu" width={101} height={92} decoding="async" loading="lazy" />
          </picture>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className="l-header__inner">
        <div className={`l-header__container js-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav className="l-header__menu">
            <ul className="l-header__menu__list">
              <li className="l-header__menu__list__item">
                <Link href="/" className="l-header__menu__list__item__link is-hover">
                  <h2 className="l-header__menu__list__item__link__title">トップページ</h2>
                </Link>
              </li>
              <li className="l-header__menu__list__item">
                <Link href="/members" className="l-header__menu__list__item__link is-hover">
                  <h2 className="l-header__menu__list__item__link__title">経営メンバー</h2>
                </Link>
              </li>
              <li className="l-header__menu__list__item">
                <Link href="/#price" className="l-header__menu__list__item__link is-hover">
                  <h2 className="l-header__menu__list__item__link__title">金額</h2>
                </Link>
              </li>
              <li className="l-header__menu__list__item">
                <Link href="/company" className="l-header__menu__list__item__link is-hover">
                  <h2 className="l-header__menu__list__item__link__title">会社概要</h2>
                </Link>
              </li>
            </ul>
            
            <div className="l-header__menu__contact">
              <span className="l-header__menu__contact__sentence">お気軽にご相談ください。</span>
              <Link href="/contact" className="l-header__menu__contact__btn is-hover">
                <picture>
                  <source srcSet="/wordpress-img/common/sp/contact-btn.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/common/contact-btn.png" alt="お問い合わせへ" width={780} height={137} decoding="async" loading="lazy" />
                </picture>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header