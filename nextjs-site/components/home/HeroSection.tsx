'use client'

import { useEffect, useState } from 'react'
import ThreeBackground from '../ThreeBackground'
import { getHeroSectionStyle } from './sectionStyles'

const HeroSection = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <section className="top-section_1" style={getHeroSectionStyle()}>
      {mounted && <ThreeBackground />}
      
      <h1 className="top-section_1__logo">
        <picture>
          <source srcSet="/wordpress-img/top/sp/logo.png" media="(max-width: 860px)" />
          <img src="/wordpress-img/top/logo.png" alt="感性分析" width={783} height={268} decoding="sync" loading="eager" />
        </picture>
      </h1>
      
      <div className="top-section_1__catch">
        <picture>
          <source srcSet="/wordpress-img/top/sp/catch.png" media="(max-width: 860px)" />
          <img src="/wordpress-img/top/catch.png" alt="貴社のデータサイエンティストとしてデータ活用による事業成長を実現する" width={660} height={144} decoding="sync" loading="eager" />
        </picture>
      </div>
      
      <div className="top-section_1__logo-onpu">
        <img src="/wordpress-img/logo/onpu.png" alt="" width={100} height={100} decoding="sync" loading="eager" />
      </div>
      <div className="top-section_1__logo-heart">
        <img src="/wordpress-img/logo/heart.png" alt="" width={100} height={100} decoding="sync" loading="eager" />
      </div>
      <div className="top-section_1__logo-zzz">
        <img src="/wordpress-img/logo/zzz.png" alt="" width={100} height={100} decoding="sync" loading="eager" />
      </div>
      <div className="top-section_1__logo-sage">
        <img src="/wordpress-img/logo/sage.png" alt="" width={100} height={100} decoding="sync" loading="eager" />
      </div>
      <div className="top-section_1__logo-ikari">
        <img src="/wordpress-img/logo/ikari.png" alt="" width={100} height={100} decoding="sync" loading="eager" />
      </div>
      <div className="top-section_1__logo-ai u-pc">
        <img src="/wordpress-img/top/logo-ai.png" alt="" width={764} height={824} decoding="sync" loading="eager" />
      </div>
      <div className="top-section_1__logo-engineer u-pc">
        <img src="/wordpress-img/top/logo-engineer.png" alt="" width={404} height={511} decoding="sync" loading="eager" />
      </div>
    </section>
  )
}

export default HeroSection