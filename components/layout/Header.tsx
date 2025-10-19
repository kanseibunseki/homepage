'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MENU_NAVIGATION } from './navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <header className="l-header">
      <div ref={hamburgerRef} className={`c-hamburger js-hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
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
        <div ref={menuRef} className={`l-header__container js-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav className="l-header__menu">
            <ul className="l-header__menu__list">
              {MENU_NAVIGATION.map((link) => (
                <li key={link.href} className="l-header__menu__list__item">
                  <Link href={link.href} className="l-header__menu__list__item__link is-hover" onClick={closeMenu}>
                    <h2 className="l-header__menu__list__item__link__title">{link.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="l-header__menu__contact">
              <span className="l-header__menu__contact__sentence">お気軽にご相談ください。</span>
              <Link href="/contact" className="l-header__menu__contact__btn is-hover" onClick={closeMenu}>
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