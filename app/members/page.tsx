import type { Metadata } from 'next'
import styles from './members.module.css'

export const metadata: Metadata = {
  title: '経営メンバー - 株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
  description: '株式会社感性分析の経営メンバーをご紹介します。',
}

export default function MembersPage() {
  return (
    <section className={styles.membersSection}>
      <div className={styles.container}>
        {/* タイトルセクション */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <span className={styles.titleJa}>経営メンバー</span>
            <span className={styles.titleEn}>Members</span>
          </h1>
          <div className={styles.titleDivider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerDot}></div>
            <div className={styles.dividerLine}></div>
          </div>
        </div>

        {/* メンバー1: 宮嶋大輔 */}
        <div className={styles.memberCard} id="miyajima">
          <div className={styles.memberCardInner}>
            <div className={styles.memberImageWrapper}>
              <div className={styles.memberImageGlow}></div>
              <img
                src="/wordpress-img/members/members_2.png"
                alt="宮嶋大輔"
                className={styles.memberImage}
                width={300}
                height={300}
              />
            </div>

            <div className={styles.memberInfo}>
              <h2 className={styles.memberName}>宮嶋 大輔</h2>
              <p className={styles.memberRole}>データサイエンティスト</p>
              <p className={styles.memberDuty}>担当：消費者分析の設計</p>

              <div className={styles.memberDetails}>
                <h3 className={styles.detailsTitle}>受賞歴・実績</h3>
                <ul className={styles.detailsList}>
                  <li>優勝/2連続金賞 MUFG Data Science Champion Ship<br />
                  Jリーグの観客動員数予測、クラウドファンの成功予測など</li>
                  <li>デロイトアナリティクス 金賞</li>
                  <li>電子情報通信学会MVE研究会での発表論文がMVE賞を受賞<br />
                  （NTTも参画する日本最大級の学会）</li>
                  <li>関西学院大学 首席卒業</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* メンバー2: 田中文士 */}
        <div className={styles.memberCard} id="tanaka">
          <div className={styles.memberCardInner}>
            <div className={styles.memberImageWrapper}>
              <div className={styles.memberImageGlow}></div>
              <img
                src="/wordpress-img/members/members_3.png"
                alt="田中文士"
                className={styles.memberImage}
                width={300}
                height={300}
              />
            </div>

            <div className={styles.memberInfo}>
              <h2 className={styles.memberName}>田中 文士</h2>
              <p className={styles.memberRole}>システムエンジニア</p>
              <p className={styles.memberDuty}>担当：システム開発</p>

              <div className={styles.memberDetails}>
                <h3 className={styles.detailsTitle}>経歴</h3>
                <ul className={styles.detailsList}>
                  <li>学生時からWEBサイト制作事業を収益化</li>
                  <li>完全オリジナルのゲーム開発<br />
                  ゲームのルール設計からUI/UXデザインまで全て自ら設計、<br />
                  アプリのリリース＆収益化を実現。</li>
                  <li>音楽分野のSNS開発<br />
                  ユーザー管理・データベース設計・セキュリティ向上、<br />
                  UI最適化・リアルタイム通信機能など全て自ら実装。</li>
                  <li>Salesforce プロジェクトマネージャー<br />
                  10社以上のDXを推進。顧客管理システムの導入など、<br />
                  業務プロセスの効率化を成功に導く。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}