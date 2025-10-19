import type { Metadata } from 'next'
import styles from './privacy.module.css'

export const metadata: Metadata = {
  title: 'プライバシーポリシー - 株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
  description: '株式会社感性分析のプライバシーポリシーをご紹介します。',
}

export default function PrivacyPage() {
  return (
    <section className={styles.privacySection}>
      <div className={styles.container}>
        {/* タイトルセクション */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <span className={styles.titleJa}>プライバシーポリシー</span>
            <span className={styles.titleEn}>Privacy Policy</span>
          </h1>
          <div className={styles.titleDivider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerDot}></div>
            <div className={styles.dividerLine}></div>
          </div>
        </div>

        {/* コンテンツ */}
        <div className={styles.content}>
          <div className={styles.dateInfo}>
            <p>制定日: 2024年12月1日</p>
            <p>株式会社感性分析</p>
            <p>代表取締役 田中丈士</p>
          </div>

          <div className={styles.introduction}>
            <p>
              株式会社感性分析（以下「当社」といいます。）は、お客様、当社の役員・従業員、その他当社関係者のすべてのステークホルダーからお預かりした個人情報を適切に取り扱うために、以下の取り組みを実施します。
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. 個人情報の取得、利用及び提供</h2>
            <div className={styles.sectionContent}>
              <p>
                個人情報の取得、利用及び提供を事業遂行のために必要な範囲内で適切に行います。取得した個人情報は利用目的の範囲内でのみ利用し、目的外利用を行わないための措置を講じます。
              </p>
              <p>
                また、個人情報の取扱いの全部、または、一部を委託する場合には、十分に選定基準を満たした先を選定いたします。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. 個人情報に関する法令や指針、規範の遵守</h2>
            <div className={styles.sectionContent}>
              <p>
                個人情報の取り扱いに関しては、個人情報保護に関する法令、国が定める指針、その他の規範を遵守します。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. 個人情報の適切な管理</h2>
            <div className={styles.sectionContent}>
              <p>
                個人情報の漏洩、紛失、改竄等を防止するため、必要な安全管理措置を適切に講じます。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. 苦情及び相談への対応</h2>
            <div className={styles.sectionContent}>
              <p>個人情報に関する苦情及び相談には、速やかに対処します。</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. 個人情報保護の取り組みについて</h2>
            <div className={styles.sectionContent}>
              <p>
                個人情報の取り扱いと個人情報保護体制について、適切な運用が実施されるよう管理するとともに、個人情報保護の取り組みを継続的に見直し、改善します。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>取得する個人情報の項目</h2>
            <div className={styles.sectionContent}>
              <p>当社は、以下の個人情報を取得することがあります。</p>
              <ul className={styles.list}>
                <li>氏名、メールアドレス、電話番号、会社名、部署名、役職名</li>
                <li>Cookie、IPアドレス、ブラウザ情報、アクセス日時、参照元URL等のアクセスログ情報</li>
                <li>お問い合わせ内容、サービス利用履歴</li>
                <li>その他、サービス提供に必要な情報</li>
              </ul>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>個人情報の利用目的</h2>
            <div className={styles.sectionContent}>
              <p>当社がお預かりする個人情報は、以下の目的のために利用します。</p>
              <ul className={styles.list}>
                <li>当社が提供するサービスのご利用登録および本人確認に関する各種手続き</li>
                <li>お問い合わせ、ないしは、お申し込みいただいたサービスのご案内、ご提供</li>
                <li>サービスおよび関連する情報のご案内・ご提供およびご要望の聴取</li>
                <li>電子メールやお電話、インターネット広告（ターゲティング広告を含む）によるマーケティング活動</li>
                <li>サービスの開発・改善のための分析、統計処理、機械学習、AIモデル開発</li>
                <li>通話内容の正確な記録および再確認ならびに応対の品質向上への活用</li>
                <li>その他、上記業務に関連または付随する業務</li>
              </ul>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>個人情報の第三者への提供</h2>
            <div className={styles.sectionContent}>
              <p>
                当社は、個人情報保護法その他の法令により認められる場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。なお、当社は、クラウドサービスの利用等により、個人情報を外国にあるサーバーに保管する場合があります。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>個人情報提供の任意性について</h2>
            <div className={styles.sectionContent}>
              <p>
                当社は、ここに掲げる目的のために必要な範囲で皆さまに個人情報のご提供を求めます。ご提供は任意ですが、当社の求めに応じられない場合やご提供いただいた内容に不備があった場合は、サービスのご提供その他のご要望にお応えできないことがありますのでご了承ください。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>安全管理措置</h2>
            <div className={styles.sectionContent}>
              <p>当社では、個人情報にかかる安全管理措置として、以下を講じています。</p>
              <ul className={styles.list}>
                <li>
                  <strong>組織的安全管理措置:</strong> 個人情報の安全管理措置を講ずるため、管理責任者を設置し、個人情報の取扱いについて定期的な確認を行っています。
                </li>
                <li>
                  <strong>人的安全管理措置:</strong> 個人情報の取扱いにおけるルールや留意事項について、従業員に定期的な研修を行っています。
                </li>
                <li>
                  <strong>物理的安全管理措置:</strong> オフィス内への入退館にあたっては、適切なセキュリティ対策を行っています。個人情報の破棄にあたっては、復元ができない処理を行っています。
                </li>
                <li>
                  <strong>技術的安全管理措置:</strong> 個人情報へのアクセス制御や、セキュリティ対策ソフトの導入を徹底しています。
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Cookieの使用について</h2>
            <div className={styles.sectionContent}>
              <p>
                当社のウェブサイトでは、サービス向上やアクセス状況などの統計的情報を取得する目的で、Cookieを使用することがあります。Cookieの送受信に関する設定は、お使いのブラウザで変更できます。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>プライバシーポリシーの変更について</h2>
            <div className={styles.sectionContent}>
              <p>
                当社は本プライバシーポリシーを法令に違反しない範囲で任意に変更することができるものとします。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>個人情報の開示等の請求</h2>
            <div className={styles.sectionContent}>
              <p>
                当社で保有している個人情報に関する、ご本人またはその代理人からの利用目的の通知、開示、訂正、追加、削除、利用の停止、消去、第三者提供の停止の請求につきましては、下記のお問い合わせ窓口までご連絡ください。ご本人確認のための書類の提出をお願いする場合があります。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>お問い合わせ窓口</h2>
            <div className={styles.sectionContent}>
              <div className={styles.contactInfo}>
                <p>〒532-0004</p>
                <p>大阪府大阪市淀川区西宮原1丁目5-33 新大阪飯田ビル1F</p>
                <p>株式会社感性分析</p>
                <p>個人情報お問い合わせ窓口</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
