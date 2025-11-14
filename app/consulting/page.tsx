import type { Metadata } from 'next'
import styles from './consulting.module.css'

export const metadata: Metadata = {
  title: 'コンサルティング - 株式会社感性分析｜一流データサイエンティストによるデータ活用支援',
  description: 'DX推進、データ活用方法の提案、データ収集・分析・運用・システム化まで、圧倒的な知見と実績でサポートします。',
}

export default function ConsultingPage() {
  const emotionIcons = [
    { id: 1, icon: 'heart', top: '7%', left: '15%', delay: 0, size: 85 },
    { id: 2, icon: 'kirakira', top: '3%', left: '72%', delay: 1, size: 90 },
    { id: 3, icon: 'onpu', top: '18%', left: '48%', delay: 2, size: 70 },
    { id: 4, icon: 'denkyu', top: '11%', left: '85%', delay: 0.5, size: 95 },
    { id: 5, icon: 'fire', top: '26%', left: '8%', delay: 1.5, size: 75 },
    { id: 6, icon: 'good', top: '23%', left: '62%', delay: 2.5, size: 80 },
    { id: 7, icon: 'lol', top: '35%', left: '30%', delay: 1, size: 85 },
    { id: 8, icon: 'heartarrow', top: '31%', left: '88%', delay: 2, size: 70 },
    { id: 9, icon: 'exclamation', top: '44%', left: '18%', delay: 1.2, size: 75 },
    { id: 10, icon: 'oh', top: '41%', left: '55%', delay: 0.8, size: 90 },
    { id: 11, icon: 'kirakirasmall', top: '49%', left: '78%', delay: 1.8, size: 65 },
    { id: 12, icon: 'www', top: '57%', left: '12%', delay: 0.3, size: 80 },
    { id: 13, icon: 'age', top: '54%', left: '42%', delay: 1.6, size: 70 },
    { id: 14, icon: 'ase', top: '63%', left: '68%', delay: 0.7, size: 85 },
    { id: 15, icon: 'tereru', top: '69%', left: '25%', delay: 2.2, size: 75 },
    { id: 16, icon: 'zzz', top: '74%', left: '82%', delay: 1.4, size: 70 },
    { id: 17, icon: 'heart', top: '77%', left: '50%', delay: 0.9, size: 90 },
    { id: 18, icon: 'kirakira', top: '85%', left: '10%', delay: 1.7, size: 80 },
    { id: 19, icon: 'onpu', top: '89%', left: '38%', delay: 2.3, size: 75 },
    { id: 20, icon: 'fire', top: '93%', left: '65%', delay: 0.4, size: 85 },
  ]

  return (
    <div className={styles.consultingPage}>
      {/* 浮遊する感情アイコン */}
      <div className={styles.floatingEmotions}>
        {emotionIcons.map((emotion) => (
          <img
            key={emotion.id}
            src={`/img/logo/${emotion.icon}.png`}
            alt=""
            className={styles.floatingEmotion}
            style={{
              top: emotion.top,
              left: emotion.left,
              width: `${emotion.size}px`,
              height: `${emotion.size}px`,
              animationDelay: `${emotion.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ヒーローセクション */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleMain}>コンサルティング</span>
            <span className={styles.heroTitleSub}>Consulting Services</span>
          </h1>
          <p className={styles.heroDescription}>
            一流データサイエンティストが<br />
            貴社に最適なデータ活用についてアドバイス・レクチャー
          </p>
        </div>
      </section>

      {/* 課題設定セクション */}
      <section className={styles.challengeSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>こんな課題を抱えていませんか？</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          <div className={styles.challengeGrid}>
            <div className={styles.challengeCard}>
              <span className={`material-symbols-outlined ${styles.challengeIcon}`}>analytics</span>
              <h3 className={styles.challengeTitle}>DXを進めたい</h3>
              <p className={styles.challengeText}>
                デジタルトランスフォーメーションの必要性は感じているが、何から始めればよいか分からない
              </p>
            </div>

            <div className={styles.challengeCard}>
              <span className={`material-symbols-outlined ${styles.challengeIcon}`}>lightbulb</span>
              <h3 className={styles.challengeTitle}>データの活用方法が分からない</h3>
              <p className={styles.challengeText}>
                データ収集・分析・運用など、具体的にどう進めればよいか分からない
              </p>
            </div>

            <div className={styles.challengeCard}>
              <span className={`material-symbols-outlined ${styles.challengeIcon}`}>groups</span>
              <h3 className={styles.challengeTitle}>社内に専門家がいない</h3>
              <p className={styles.challengeText}>
                データサイエンスの専門知識を持った人材が社内にいない
              </p>
            </div>
          </div>

          <div className={styles.challengeCta}>
            <p className={styles.challengeCtaText}>そんな企業様に・・・</p>
          </div>
        </div>
      </section>

      {/* 解決方法セクション */}
      <section className={styles.solutionSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>私たちの解決方法</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          <div className={styles.solutionContent}>
            <div className={styles.solutionMain}>
              <h3 className={styles.solutionMainTitle}>
                一流のデータサイエンティストが<br />
                貴社に最適なデータ活用について<br />
                アドバイス・レクチャーをします
              </h3>
              <p className={styles.solutionMainText}>
                別途見積りですが、必要に応じて<br />
                分析実施・システム構築まで可能
              </p>
            </div>

            <div className={styles.solutionDetail}>
              <h4 className={styles.solutionDetailTitle}>主なレクチャー内容</h4>
              <ul className={styles.solutionList}>
                <li className={styles.solutionListItem}>
                  <span className={`material-symbols-outlined ${styles.solutionListIcon}`}>download</span>
                  <span className={styles.solutionListText}>データ収集</span>
                </li>
                <li className={styles.solutionListItem}>
                  <span className={`material-symbols-outlined ${styles.solutionListIcon}`}>search</span>
                  <span className={styles.solutionListText}>データ分析</span>
                </li>
                <li className={styles.solutionListItem}>
                  <span className={`material-symbols-outlined ${styles.solutionListIcon}`}>settings</span>
                  <span className={styles.solutionListText}>データ運用</span>
                </li>
                <li className={styles.solutionListItem}>
                  <span className={`material-symbols-outlined ${styles.solutionListIcon}`}>computer</span>
                  <span className={styles.solutionListText}>システム化</span>
                </li>
              </ul>
            </div>

            <div className={styles.solutionMessage}>
              <p>データが何に役立つか分からない。そんな状況から力になれます。</p>
              <p className={styles.solutionMessageEmphasis}>
                貴社が、どのようにデータを活用すべきか？ゼロから提案します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 他社との違いセクション */}
      <section className={styles.differenceSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>他社との違い</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          <div className={styles.differenceIntro}>
            <h3 className={styles.differenceIntroTitle}>
              これら全ての圧倒的な知見・実績
            </h3>
            <div className={styles.differenceIntroGrid}>
              <div className={styles.differenceIntroItem}>データ収集</div>
              <div className={styles.differenceIntroItem}>データ分析</div>
              <div className={styles.differenceIntroItem}>データ運用</div>
              <div className={styles.differenceIntroItem}>システム化</div>
            </div>
          </div>

          {/* データ収集 */}
          <div className={styles.expertiseCard}>
            <div className={styles.expertiseHeader}>
              <h3 className={styles.expertiseTitle}>データ収集</h3>
            </div>
            <div className={styles.expertiseContent}>
              <ul className={styles.expertiseList}>
                <li><span className={styles.expertiseEmphasis}>AI</span>による自動化に精通</li>
                <li><span className={styles.expertiseEmphasis}>大規模かつ迅速</span>なデータ収集</li>
                <li><span className={styles.expertiseEmphasis}>豊富なデータソース</span>に精通</li>
              </ul>
              <div className={styles.expertiseTags}>
                <span className={styles.expertiseTag}>レビュー</span>
                <span className={styles.expertiseTag}>生体情報</span>
                <span className={styles.expertiseTag}>行動</span>
                <span className={styles.expertiseTag}>POS</span>
                <span className={styles.expertiseTag}>アンケート</span>
                <span className={styles.expertiseTag}>映像</span>
                <span className={styles.expertiseTag}>音声</span>
                <span className={styles.expertiseTag}>インタビュー</span>
              </div>
            </div>
          </div>

          {/* データ分析 */}
          <div className={styles.expertiseCard}>
            <div className={styles.expertiseHeader}>
              <h3 className={styles.expertiseTitle}>データ分析</h3>
            </div>
            <div className={styles.expertiseContent}>
              <ul className={styles.expertiseList}>
                <li><span className={styles.expertiseEmphasis}>AI予測</span>に精通</li>
                <li><span className={styles.expertiseEmphasis}>購買理由・思考回路・需要計測</span></li>
                <li><span className={styles.expertiseEmphasis}>感性工学</span>に基づく感性分析に精通</li>
              </ul>
              <div className={styles.expertiseTags}>
                <span className={styles.expertiseTag}>操作性</span>
                <span className={styles.expertiseTag}>快適性</span>
                <span className={styles.expertiseTag}>審美性</span>
                <span className={styles.expertiseTag}>ブランドイメージ</span>
                <span className={styles.expertiseTag}>五感全て</span>
              </div>
            </div>
          </div>

          {/* データ運用 */}
          <div className={styles.expertiseCard}>
            <div className={styles.expertiseHeader}>
              <h3 className={styles.expertiseTitle}>データ運用</h3>
            </div>
            <div className={styles.expertiseContent}>
              <ul className={styles.expertiseList}>
                <li>データに基づく戦略開発に精通</li>
                <li className={styles.expertiseHighlight}>
                  弊社開発のホテルが<span className={styles.impactSuccess}>沖縄県で、口コミ1位</span>を達成<br />
                  <span className={styles.expertiseNote}>※一休.com・Google map</span>
                </li>
                <li className={styles.expertiseHighlight}>
                  弊社開発の病院が<span className={styles.impactSuccess}>日本全国で、口コミ1位</span>を達成<br />
                  <span className={styles.expertiseNote}>※Google map</span>
                </li>
                <li className={styles.expertiseHighlight}><span className={styles.impactSuccess}>150社以上</span>の支援実績</li>
              </ul>
            </div>
          </div>

          {/* システム化 */}
          <div className={styles.expertiseCard}>
            <div className={styles.expertiseHeader}>
              <h3 className={styles.expertiseTitle}>システム化</h3>
            </div>
            <div className={styles.expertiseContent}>
              <ul className={styles.expertiseList}>
                <li>データ収集～分析～運用の<span className={styles.expertiseEmphasis}>DX</span>に精通</li>
                <li>システム化の実績多数（<span className={styles.expertiseEmphasis}>特許技術</span>含む）</li>
              </ul>
              <div className={styles.expertiseCases}>
                <div className={styles.expertiseCase}>
                  <span className={`material-symbols-outlined ${styles.expertiseCaseIcon}`}>directions_car</span>
                  <span><span className={styles.expertiseEmphasis}>大手自動車メーカー</span>のマーケティング自動化</span>
                </div>
                <div className={styles.expertiseCase}>
                  <span className={`material-symbols-outlined ${styles.expertiseCaseIcon}`}>ac_unit</span>
                  <span><span className={styles.expertiseEmphasis}>大手電機メーカー</span>の空調管理</span>
                </div>
                <div className={styles.expertiseCase}>
                  <span className={`material-symbols-outlined ${styles.expertiseCaseIcon}`}>piano</span>
                  <span><span className={styles.expertiseEmphasis}>大手楽器メーカー</span>の感性分析</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* システム化事例セクション */}
      <section className={styles.caseStudySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>システム化事例</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          {/* 事例① N1インタビュー */}
          <div className={styles.caseStudy}>
            <h3 className={styles.caseStudyTitle}>事例① N1インタビュー自動化</h3>

            <div className={styles.comparisonContainer}>
              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader}>従来のN1インタビュー</div>
                <div className={styles.comparisonContent}>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>件数</span>
                    <span className={styles.comparisonValue}>人力で30人が限界</span>
                  </div>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>労働</span>
                    <span className={styles.comparisonValue}>1件で2時間<br />30件で60時間</span>
                  </div>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>費用</span>
                    <span className={styles.comparisonValue}>300万円</span>
                  </div>
                </div>
              </div>

              <div className={styles.comparisonArrow}>→</div>

              <div className={`${styles.comparisonCard} ${styles.comparisonCardAfter}`}>
                <div className={styles.comparisonHeader}>N1インタビュー自動化システム</div>
                <div className={styles.comparisonContent}>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>件数</span>
                    <span className={styles.comparisonValue}>無制限</span>
                  </div>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>労働</span>
                    <span className={styles.comparisonValue}>URLを送るだけで<br />調査完了</span>
                  </div>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>費用</span>
                    <span className={styles.comparisonValue}>1人あたり<br />5,000円</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.caseStudyResult}>
              <span className={`material-symbols-outlined ${styles.caseStudyResultIcon}`}>auto_awesome</span>
              <span className={styles.caseStudyResultText}><span className={styles.impactSuccess}>96.3%</span>のコスト削減を実現</span>
            </div>
          </div>

          {/* 事例② レビュー分析 */}
          <div className={styles.caseStudy}>
            <h3 className={styles.caseStudyTitle}>事例② 大規模レビュー分析</h3>

            <div className={styles.comparisonContainer}>
              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader}>従来のレビュー分析</div>
                <div className={styles.comparisonContent}>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>件数</span>
                    <span className={styles.comparisonValue}>人力で1,000件が限界</span>
                  </div>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>労働</span>
                    <span className={styles.comparisonValue}>1,000件で83時間<br />（1件5分）</span>
                  </div>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>費用</span>
                    <span className={styles.comparisonValue}>約25万円<br />（83時間×時給3,000円）</span>
                  </div>
                </div>
              </div>

              <div className={styles.comparisonArrow}>→</div>

              <div className={`${styles.comparisonCard} ${styles.comparisonCardAfter}`}>
                <div className={styles.comparisonHeader}>大規模レビューシステム</div>
                <div className={styles.comparisonContent}>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>件数</span>
                    <span className={styles.comparisonValue}>1億件以上を<br />収集・分析可能</span>
                  </div>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>労働</span>
                    <span className={styles.comparisonValue}>20分</span>
                  </div>
                  <div className={styles.comparisonItem}>
                    <span className={styles.comparisonLabel}>費用</span>
                    <span className={styles.comparisonValue}>約25万円<br />（システム・サーバー費）</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.caseStudyImpact}>
              <p className={styles.caseStudyImpactText}>
                仮に、1億件のレビュー分析を人力で実施すれば
              </p>
              <p className={styles.caseStudyImpactNumbers}>
                労働に<span className={styles.impactHighlight}>833万時間</span>、
                人件費に<span className={styles.impactHighlight}>249億円</span>が必要
              </p>
              <div className={styles.caseStudyImpactArrow}>⬇</div>
              <p className={styles.caseStudyImpactResult}>
                DX化により労働を<span className={styles.impactSuccess}>20分</span>・
                人件費を<span className={styles.impactSuccess}>25万円</span>に
              </p>
            </div>

            <div className={styles.caseStudyResult}>
              <span className={`material-symbols-outlined ${styles.caseStudyResultIcon}`}>auto_awesome</span>
              <span className={styles.caseStudyResultText}>約<span className={styles.impactSuccess}>99.9%</span>のコスト削減を実現</span>
            </div>
          </div>
        </div>
      </section>

      {/* 価格比較セクション */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>料金比較</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3 className={styles.pricingCardTitle}>一流データサイエンティストを雇う場合</h3>
              <div className={styles.pricingCardContent}>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>費用</span>
                  <span className={styles.pricingValue}>年収1,500万円<br />＋社会保険</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>リスク</span>
                  <span className={styles.pricingValue}>雇ったら解雇できない</span>
                </div>
              </div>
            </div>

            <div className={styles.pricingCard}>
              <h3 className={styles.pricingCardTitle}>同業他社</h3>
              <div className={styles.pricingCardContent}>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>費用</span>
                  <span className={styles.pricingValue}>年間1,200万円</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>課題</span>
                  <span className={styles.pricingValue}>感性の分析技術が無い</span>
                </div>
              </div>
            </div>

            <div className={`${styles.pricingCard} ${styles.pricingCardRecommended}`}>
              <div className={styles.pricingCardBadge}>おすすめ</div>
              <h3 className={styles.pricingCardTitle}>株式会社感性分析</h3>
              <div className={styles.pricingCardContent}>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>費用</span>
                  <span className={styles.pricingValue}>お見積り<br />（柔軟な料金体系）</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingLabel}>強み</span>
                  <span className={styles.pricingValue}>
                    圧倒的な知見と実績<br />
                    感性分析技術を保有
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>
            データ活用でお困りなら<br />
            まずはお気軽にご相談ください
          </h2>
          <a href="/contact" className={styles.ctaButton}>
            <span className={styles.ctaButtonText}>お問い合わせ</span>
            <span className={styles.ctaButtonArrow}>→</span>
          </a>
        </div>
      </section>
    </div>
  )
}
