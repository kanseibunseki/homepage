import { getSectionBackgroundStyle } from './sectionStyles'

const IntroductionSection = () => {
  return (
    <section className="top-section_6" style={getSectionBackgroundStyle(
      '251.39vw',
      '/img/top/section_6.jpg'
    )}>
      
      <div className="top-section_6__logo-woman u-pc">
        <img src="/img/top/logo-woman.png" alt="" width={264} height={383} decoding="async" loading="lazy" />
      </div>
    </section>
  )
}

export default IntroductionSection