import Link from 'next/link'

const CVSection = () => {
  return (
    <section className="top-cv">
      <div className="top-cv__inner">
        <Link href="/contact" className="top-cv__btn is-hover">
          <picture>
            <source srcSet="/wordpress-img/top/sp/cv-btn.png" media="(max-width: 860px)" />
            <img src="/wordpress-img/top/cv-btn.png" alt="" width={780} height={130} decoding="async" loading="lazy" />
          </picture>
        </Link>
      </div>
    </section>
  )
}

export default CVSection