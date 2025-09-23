import { getSectionBackgroundStyle } from './sectionStyles'

const SolutionSection = () => {
  return (
    <section className="top-section_3" style={getSectionBackgroundStyle(
      '78.60vw',
      '/wordpress-img/top/section_3.jpg'
    )}>
      
      <div className="top-section_3__title-solution">
        <picture>
          <source srcSet="/wordpress-img/top/sp/title-solution.png" media="(max-width: 860px)" />
          <img src="/wordpress-img/top/title-solution.png" alt="解決方法" width={236} height={103} decoding="async" loading="lazy" />
        </picture>
      </div>
      
      <div className="top-section_3__logo-kirakira">
        <img src="/wordpress-img/logo/kirakira.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
      <div className="top-section_3__logo-tereru">
        <img src="/wordpress-img/logo/tereru.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
      <div className="top-section_3__logo-akushu">
        <picture>
          <source srcSet="/wordpress-img/top/sp/logo-akushu.png" media="(max-width: 860px)" />
          <img src="/wordpress-img/top/logo-akushu.png" alt="" width={173} height={360} decoding="async" loading="lazy" />
        </picture>
      </div>
      <div className="top-section_3__logo-lol u-pc">
        <img src="/wordpress-img/logo/lol.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
    </section>
  )
}

export default SolutionSection