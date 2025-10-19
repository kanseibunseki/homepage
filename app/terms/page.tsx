import type { Metadata } from 'next'
import styles from './terms.module.css'

export const metadata: Metadata = {
  title: '利用規約 - 株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
  description: '株式会社感性分析の利用規約をご紹介します。',
}

export default function TermsPage() {
  return (
    <section className={styles.termsSection}>
      <div className={styles.container}>
        {/* タイトルセクション */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <span className={styles.titleJa}>利用規約</span>
            <span className={styles.titleEn}>Terms of Service</span>
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
          </div>

          <div className={styles.introduction}>
            <p>
              この利用規約（以下「本規約」といいます。）は、株式会社感性分析（以下「当社」といいます。）が提供するサービス（以下「本サービス」といいます。）の利用条件を定めるものです。本サービスをご利用される方（以下「利用者」といいます。）は、本規約に同意したものとみなされます。
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第1条（適用）</h2>
            <div className={styles.sectionContent}>
              <ol className={styles.orderedList}>
                <li>本規約は、本サービスの利用に関する当社と利用者との間の権利義務関係を定めることを目的とし、利用者と当社との間の本サービスの利用に関わる一切の関係に適用されます。</li>
                <li>当社が本サービス上で掲載する本サービス利用に関するルール等は、本規約の一部を構成するものとします。</li>
                <li>本規約の内容と、前項のルール等その他の本規約外における本サービスの説明等が異なる場合は、本規約の規定が優先して適用されるものとします。</li>
              </ol>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第2条（利用登録）</h2>
            <div className={styles.sectionContent}>
              <ol className={styles.orderedList}>
                <li>本サービスの利用を希望する方は、本規約を遵守することに同意し、当社の定める方法によって利用登録を申請するものとします。</li>
                <li>当社は、当社の基準に従って、利用登録の可否を判断し、当社が登録を認める場合にはその旨を申請者に通知します。申請者の利用者としての登録は、当社が本項の通知を行ったことをもって完了したものとします。</li>
                <li>当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録を拒否することがあります。
                  <ul className={styles.nestedList}>
                    <li>本規約に違反したことがある者からの申請である場合</li>
                    <li>当社に提供された登録事項の全部または一部につき虚偽、誤記または記載漏れがあった場合</li>
                    <li>反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。）である、または資金提供その他を通じて反社会的勢力等の維持、運営もしくは経営に協力もしくは関与する等反社会的勢力等との何らかの交流もしくは関与を行っていると当社が判断した場合</li>
                    <li>その他、当社が利用登録を相当でないと判断した場合</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第3条（登録情報の変更）</h2>
            <div className={styles.sectionContent}>
              <p>
                利用者は、登録情報に変更があった場合、当社の定める方法により当該変更事項を遅滞なく当社に通知するものとします。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第4条（アカウント情報の管理）</h2>
            <div className={styles.sectionContent}>
              <ol className={styles.orderedList}>
                <li>利用者は、自己の責任において、本サービスに関するアカウント情報を適切に管理および保管するものとし、これを第三者に利用させ、または貸与、譲渡、名義変更、売買等をしてはならないものとします。</li>
                <li>アカウント情報の管理不十分、使用上の過誤、第三者の使用等による損害の責任は利用者が負うものとし、当社は一切の責任を負いません。</li>
              </ol>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第5条（禁止事項）</h2>
            <div className={styles.sectionContent}>
              <p>利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
              <ol className={styles.orderedList}>
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社、本サービスの他の利用者、または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
                <li>本サービスを通じ、以下に該当し、または該当すると当社が判断する情報を当社または本サービスの他の利用者に送信すること
                  <ul className={styles.nestedList}>
                    <li>過度に暴力的な表現を含む情報</li>
                    <li>コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報</li>
                    <li>当社、本サービスの他の利用者またはその他の第三者の名誉または信用を毀損する表現を含む情報</li>
                    <li>過度にわいせつな表現を含む情報</li>
                    <li>差別を助長する表現を含む情報</li>
                    <li>自殺、自傷行為を助長する表現を含む情報</li>
                    <li>その他反社会的な内容を含み他人に不快感を与える表現を含む情報</li>
                  </ul>
                </li>
                <li>本サービスのネットワークまたはシステム等に過度な負荷をかける行為</li>
                <li>当社が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為</li>
                <li>本サービスの運営を妨害するおそれのある行為</li>
                <li>当社のネットワークまたはシステム等への不正アクセス</li>
                <li>第三者に成りすます行為</li>
                <li>本サービスの他の利用者のアカウント情報を利用する行為</li>
                <li>当社が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
                <li>本サービスの他の利用者の情報の収集</li>
                <li>反社会的勢力等への利益供与</li>
                <li>前各号の行為を直接または間接に惹起し、または容易にする行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ol>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第6条（本サービスの停止等）</h2>
            <div className={styles.sectionContent}>
              <ol className={styles.orderedList}>
                <li>当社は、以下のいずれかに該当する場合には、利用者に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。
                  <ul className={styles.nestedList}>
                    <li>本サービスに係るコンピューター・システムの点検または保守作業を定期的または緊急に行う場合</li>
                    <li>コンピューター、通信回線等が事故により停止した場合</li>
                    <li>地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合</li>
                    <li>その他、当社が停止または中断を必要と判断した場合</li>
                  </ul>
                </li>
                <li>当社は、本条に基づき当社が行った措置に基づき利用者に生じた損害について一切の責任を負いません。</li>
              </ol>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第7条（利用制限および登録抹消）</h2>
            <div className={styles.sectionContent}>
              <ol className={styles.orderedList}>
                <li>当社は、利用者が以下のいずれかに該当する場合には、事前の通知なく、利用者に対して、本サービスの全部もしくは一部の利用を制限し、または利用者としての登録を抹消することができるものとします。
                  <ul className={styles.nestedList}>
                    <li>本規約のいずれかの条項に違反した場合</li>
                    <li>登録事項に虚偽の事実があることが判明した場合</li>
                    <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
                  </ul>
                </li>
                <li>当社は、本条に基づき当社が行った行為により利用者に生じた損害について、一切の責任を負いません。</li>
              </ol>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第8条（免責事項）</h2>
            <div className={styles.sectionContent}>
              <ol className={styles.orderedList}>
                <li>当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</li>
                <li>当社は、本サービスに起因して利用者に生じたあらゆる損害について、一切の責任を負いません。ただし、本サービスに関する当社と利用者との間の契約が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。</li>
                <li>前項ただし書に定める場合であっても、当社は、当社の過失（重過失を除きます。）による債務不履行または不法行為により利用者に生じた損害のうち特別な事情から生じた損害（当社または利用者が損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。</li>
                <li>当社は、本サービスに関して、利用者と他の利用者または第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</li>
              </ol>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第9条（サービス内容の変更等）</h2>
            <div className={styles.sectionContent}>
              <p>
                当社は、利用者に通知することなく、本サービスの内容を変更し、または本サービスの提供を中止することができるものとし、これによって利用者に生じた損害について一切の責任を負いません。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第10条（利用規約の変更）</h2>
            <div className={styles.sectionContent}>
              <ol className={styles.orderedList}>
                <li>当社は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。</li>
                <li>変更後の本規約は、当社ウェブサイトに掲示された時点より効力を生じるものとします。</li>
                <li>本規約の変更後、本サービスの利用を開始した場合には、当該利用者は変更後の規約に同意したものとみなします。</li>
              </ol>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第11条（通知または連絡）</h2>
            <div className={styles.sectionContent}>
              <p>
                利用者と当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、利用者から当社が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時に利用者へ到達したものとみなします。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第12条（権利義務の譲渡の禁止）</h2>
            <div className={styles.sectionContent}>
              <p>
                利用者は、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>第13条（準拠法および管轄裁判所）</h2>
            <div className={styles.sectionContent}>
              <ol className={styles.orderedList}>
                <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                <li>本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。</li>
              </ol>
            </div>
          </div>

          <div className={styles.finalNote}>
            <p>以上</p>
          </div>
        </div>
      </div>
    </section>
  )
}
