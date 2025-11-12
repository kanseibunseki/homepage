import Link from 'next/link'

const LectureSection = () => {
  return (
    <section className="top-section_4">
      <div className="top-section_4__inner">
        <h2 className="top-section_4__title c-section-title">
          <span className="top-section_4__title__en c-section-title__en">
            lecture
          </span>
          <span className="top-section_4__title__ja c-section-title__ja">
            主なレクチャー内容
          </span>
        </h2>
        
        <div className="top-section_4__container">
          <Link href="/#lecture_1" className="top-section_4__lecture top-section_4__lecture_1 is-hover">
            <picture>
              <source srcSet="/img/top/sp/lecture_1.png" media="(max-width: 860px)" />
              <img src="/img/top/lecture_1.png" alt="データ収集" width={330} height={330} decoding="async" loading="lazy" />
            </picture>
          </Link>
          <Link href="/#lecture_2" className="top-section_4__lecture top-section_4__lecture_2 is-hover">
            <picture>
              <source srcSet="/img/top/sp/lecture_2.png" media="(max-width: 860px)" />
              <img src="/img/top/lecture_2.png" alt="データ分析" width={330} height={330} decoding="async" loading="lazy" />
            </picture>
          </Link>
          <Link href="/#lecture_3" className="top-section_4__lecture top-section_4__lecture_3 is-hover">
            <picture>
              <source srcSet="/img/top/sp/lecture_3.png" media="(max-width: 860px)" />
              <img src="/img/top/lecture_3.png" alt="データ運用" width={330} height={330} decoding="async" loading="lazy" />
            </picture>
          </Link>
          <Link href="/#lecture_4" className="top-section_4__lecture top-section_4__lecture_4 is-hover">
            <picture>
              <source srcSet="/img/top/sp/lecture_4.png" media="(max-width: 860px)" />
              <img src="/img/top/lecture_4.png" alt="システム化" width={330} height={330} decoding="async" loading="lazy" />
            </picture>
          </Link>
        </div>
      </div>
      
      <div className="top-section_4__logo-fire">
        <img src="/img/logo/fire.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
      <div className="top-section_4__logo-denkyu">
        <img src="/img/logo/denkyu.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
      <div className="top-section_4__logo-heartarrow">
        <img src="/img/logo/heartarrow.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
      </div>
    </section>
  )
}

export default LectureSection