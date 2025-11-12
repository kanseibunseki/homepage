import { getSectionBackgroundStyle } from './sectionStyles'

const PriceSection = () => {
  return (
    <section className="top-section_7" id="price" style={getSectionBackgroundStyle(
      '165.46vw',
      '/img/top/section_7.jpg'
    )}>
      
      <h2 className="top-section_7__title c-section-title">
        <span className="top-section_7__title__en c-section-title__en">
          price
        </span>
        <span className="top-section_7__title__ja c-section-title__ja">
          金額
        </span>
      </h2>
      
      <div className="top-section_7__logo-good">
        <img src="/img/logo/good.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
      <div className="top-section_7__logo-ase u-pc">
        <img src="/img/logo/ase.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
    </section>
  )
}

export default PriceSection