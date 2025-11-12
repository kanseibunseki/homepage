import { getSectionBackgroundStyle } from './sectionStyles'

const ProblemSection = () => {
  return (
    <section className="top-section_2" style={getSectionBackgroundStyle(
      '120.34vw',
      '/img/top/section_2.jpg'
    )}>
      
      <h2 className="top-section_2__title c-section-title">
        <span className="top-section_2__title__en c-section-title__en">
          problem
        </span>
        <span className="top-section_2__title__ja c-section-title__ja">
          課題設定
        </span>
      </h2>
      
      <div className="top-section_2__logo-skull">
        <img src="/img/logo/skull.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
      <div className="top-section_2__logo-oh">
        <img src="/img/logo/oh.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
    </section>
  )
}

export default ProblemSection