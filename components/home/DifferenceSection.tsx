'use client'

import { useEffect } from 'react'
import { getSectionBackgroundStyle } from './sectionStyles'

const DifferenceSection = () => {
  useEffect(() => {
    // Swiperの初期化をクライアントサイドで実行
    const loadSwiper = async () => {
      if (typeof window !== 'undefined' && (window as any).Swiper) {
        const swiper = new (window as any).Swiper('.swiper-container', {
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
          },
          spaceBetween: 30,
          slidesPerView: 1
        })
      }
    }

    loadSwiper()
  }, [])

  return (
    <section className="top-section_5" style={getSectionBackgroundStyle(
      '139.41vw',
      '/img/top/section_5.jpg'
    )}>
      
      <h2 className="top-section_5__title c-section-title">
        <span className="top-section_5__title__en c-section-title__en">
          difference
        </span>
        <span className="top-section_5__title__ja c-section-title__ja">
          他社との違い
        </span>
      </h2>
      
      <div className="top-section_5__slider top-slider">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide" id="lecture_1">
              <picture>
                <source srcSet="/img/slider/sp/slider_1.png" media="(max-width: 860px)" />
                <img src="/img/slider/slider_1.png" alt="lecture_1" width={780} height={493} decoding="async" loading="lazy" />
              </picture>
            </div>
            <div className="swiper-slide" id="lecture_2">
              <picture>
                <source srcSet="/img/slider/sp/slider_2.png" media="(max-width: 860px)" />
                <img src="/img/slider/slider_2.png" alt="lecture_2" width={780} height={493} decoding="async" loading="lazy" />
              </picture>
            </div>
            <div className="swiper-slide" id="lecture_3">
              <picture>
                <source srcSet="/img/slider/sp/slider_3.png" media="(max-width: 860px)" />
                <img src="/img/slider/slider_3.png" alt="lecture_3" width={780} height={493} decoding="async" loading="lazy" />
              </picture>
            </div>
            <div className="swiper-slide" id="lecture_4">
              <picture>
                <source srcSet="/img/slider/sp/slider_4.png" media="(max-width: 860px)" />
                <img src="/img/slider/slider_4.png" alt="lecture_4" width={780} height={493} decoding="async" loading="lazy" />
              </picture>
            </div>
          </div>
          <div className="swiper-scrollbar"></div>
        </div>
      </div>
      
      <div className="top-section_5__logo-age u-pc">
        <img src="/img/logo/age.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
    </section>
  )
}

export default DifferenceSection