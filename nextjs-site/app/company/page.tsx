import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '会社概要 - 株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
  description: '株式会社感性分析の会社概要をご紹介します。',
}

export default function CompanyPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/company.css" />
      
      <section className="company">
        <div className="company__inner">
          <h1 className="c-page__title">
            <span className="c-page__title__ja">
              会社概要
            </span>
            <span className="c-page__title__en">
              company
            </span>
          </h1>

          <ul className="company__list">
            <li className="company__listitem">
              <div className="company__listitem__head">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/title.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/title.png" alt="" width={448} height={99} decoding="async" loading="lazy" />
                </picture>
                <h2 className="company__listitem__title">
                  企業名
                </h2>
              </div>
              <div className="company__listitem__body">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/detail.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/detail.png" alt="" width={606} height={115} decoding="async" loading="lazy" />
                </picture>
                <p className="company__listitem__detail">
                  株式会社感性分析
                </p>
              </div>
            </li>

            <li className="company__listitem">
              <div className="company__listitem__head">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/title.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/title.png" alt="" width={448} height={99} decoding="async" loading="lazy" />
                </picture>
                <h2 className="company__listitem__title">
                  代表者
                </h2>
              </div>
              <div className="company__listitem__body m-name">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/detail.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/detail.png" alt="" width={606} height={115} decoding="async" loading="lazy" />
                </picture>
                <p className="company__listitem__detail m-name">
                  <span>宮嶋大輔</span>
                  <span>田中丈士</span>
                </p>
              </div>
            </li>

            <li className="company__listitem">
              <div className="company__listitem__head">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/title.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/title.png" alt="" width={448} height={99} decoding="async" loading="lazy" />
                </picture>
                <h2 className="company__listitem__title">
                  所在地
                </h2>
              </div>
              <div className="company__listitem__body">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/detail.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/detail.png" alt="" width={606} height={115} decoding="async" loading="lazy" />
                </picture>
                <p className="company__listitem__detail m-address">
                  大阪府大阪市淀川区西宮原1丁目5-33<br />新大阪飯田ビル1Ｆ
                </p>
              </div>
            </li>

            <li className="company__listitem">
              <div className="company__listitem__head">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/title.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/title.png" alt="" width={448} height={99} decoding="async" loading="lazy" />
                </picture>
                <h2 className="company__listitem__title">
                  連絡先
                </h2>
              </div>
              <div className="company__listitem__body">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/detail.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/detail.png" alt="" width={606} height={115} decoding="async" loading="lazy" />
                </picture>
                <p className="company__listitem__detail">
                  08067582220
                </p>
              </div>
            </li>

            <li className="company__listitem">
              <div className="company__listitem__head">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/title.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/title.png" alt="" width={448} height={99} decoding="async" loading="lazy" />
                </picture>
                <h2 className="company__listitem__title">
                  事業内容
                </h2>
              </div>
              <div className="company__listitem__body">
                <picture>
                  <source srcSet="/wordpress-img/company/sp/detail.png" media="(max-width: 860px)" />
                  <img src="/wordpress-img/company/detail.png" alt="" width={606} height={115} decoding="async" loading="lazy" />
                </picture>
                <p className="company__listitem__detail">
                  データ活用全般
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        <picture>
          <source srcSet="/wordpress-img/company/sp/company-bg.jpg" media="(max-width: 860px)" />
          <img className="company-bg" src="/wordpress-img/company/company-bg.jpg" alt="" width={860} height={764} decoding="async" loading="lazy" />
        </picture>
      </section>
    </>
  )
}