import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '経営メンバー - 株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
  description: '株式会社感性分析の経営メンバーをご紹介します。',
}

export default function MembersPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/members.css" />
      
      <section className="members">
        <div className="members__head">
          <picture>
            <source srcSet="/wordpress-img/members/sp/members_1.jpg" media="(max-width: 860px)" />
            <img src="/wordpress-img/members/members_1.jpg" alt="" width={860} height={1035} decoding="async" loading="lazy" />
          </picture>
          
          <Link href="/members/#miyajima" className="members__head__anchor m-miyajima">
            <picture>
              <source srcSet="/wordpress-img/members/sp/anchor-miyajima.png" media="(max-width: 860px)" />
              <img src="/wordpress-img/members/anchor-miyajima.png" alt="データサイエンティスト 担当：消費者分析の設計 宮嶋大輔" width={344} height={244} decoding="async" loading="lazy" />
            </picture>
          </Link>
          
          <Link href="/members/#tanaka" className="members__head__anchor m-tanaka">
            <picture>
              <source srcSet="/wordpress-img/members/sp/anchor-tanaka.png" media="(max-width: 860px)" />
              <img src="/wordpress-img/members/anchor-tanaka.png" alt="システムエンジニア 担当：システム開発 田中丈士" width={344} height={244} decoding="async" loading="lazy" />
            </picture>
          </Link>
          
          <h1 className="c-page__title">
            <span className="c-page__title__ja">
              経営メンバー
            </span>
            <span className="c-page__title__en">
              members
            </span>
          </h1>
          
          <div className="members__logo-kirakira">
            <img src="/wordpress-img/logo/kirakira.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
          </div>
          <div className="members__logo-fire">
            <img src="/wordpress-img/logo/fire.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
          </div>
        </div>
        
        <div className="members__contents" id="miyajima">
          <picture>
            <source srcSet="/wordpress-img/members/sp/members_2.jpg" media="(max-width: 860px)" />
            <img src="/wordpress-img/members/members_2.jpg" alt="宮嶋大輔" width={860} height={689} decoding="async" loading="lazy" />
          </picture>
          <div className="members__logo-kirakira_2">
            <img src="/wordpress-img/logo/kirakira.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
          </div>
          <div className="members__logo-tereru">
            <img src="/wordpress-img/logo/tereru.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
          </div>
        </div>
        
        <div className="members__contents" id="tanaka">
          <picture>
            <source srcSet="/wordpress-img/members/sp/members_3.jpg" media="(max-width: 860px)" />
            <img src="/wordpress-img/members/members_3.jpg" alt="田中丈士" width={860} height={1000} decoding="async" loading="lazy" />
          </picture>
          <div className="members__logo-denkyu">
            <img src="/wordpress-img/logo/denkyu.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
          </div>
          <div className="members__logo-age">
            <img src="/wordpress-img/logo/age.png" alt="" width={100} height={100} decoding="async" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  )
}