import type { Metadata } from 'next'
import styles from './n1-interview.module.css'

export const metadata: Metadata = {
  title: 'N1インタビューサービス - 株式会社感性分析｜AI自動化で95%コスト削減を実現',
  description: 'N1インタビューを自動化。手間なし・高精度・最安値・短期間で顧客の本音を引き出します。従来の95%コスト削減、98%時間短縮を実現。',
}

export default function N1InterviewPage() {
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
    <div className={styles.n1InterviewPage}>
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
            <span className={styles.heroTitleMain}>N1インタビューサービス</span>
            <span className={styles.heroTitleSub}>AI-Powered N1 Interview System</span>
          </h1>
          <p className={styles.heroDescription}>
            AI自動化で<span className={styles.highlightSuccess}>95%コスト削減</span>、<span className={styles.highlightSuccess}>98%時間短縮</span><br />
            顧客の本音を引き出す、革新的なインタビューシステム
          </p>
        </div>
      </section>

      {/* N1インタビューの重要性セクション */}
      <section className={styles.importanceSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>N1インタビューの重要性</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          <div className={styles.importanceContent}>
            <div className={styles.importanceCard}>
              <h3 className={styles.importanceTitle}>
                顧客の<span className={styles.highlight}>ニーズ・不満</span>を聞き出すには、<br />
                <span className={styles.highlight}>時間をかけたインタビュー</span>が不可欠
              </h3>
              <p className={styles.importanceText}>
                <span className={styles.highlight}>アンケート・数字で本音は見えない</span>
              </p>
              <div className={styles.importanceIcon}>
                <span className="material-symbols-outlined">record_voice_over</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 従来の課題セクション */}
      <section className={styles.challengeSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>N1インタビューの課題</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          <div className={styles.challengeGrid}>
            <div className={styles.challengeCard}>
              <span className={`material-symbols-outlined ${styles.challengeIcon}`}>schedule</span>
              <h3 className={styles.challengeTitle}>手間</h3>
              <p className={styles.challengeText}>日程調整・質問準備<br />文字起こし〜分析〜報告</p>
            </div>

            <div className={styles.challengeCard}>
              <span className={`material-symbols-outlined ${styles.challengeIcon}`}>trending_down</span>
              <h3 className={styles.challengeTitle}>低精度</h3>
              <p className={styles.challengeText}>聞き手の力に左右される<br />よく思われようとする</p>
            </div>

            <div className={styles.challengeCard}>
              <span className={`material-symbols-outlined ${styles.challengeIcon}`}>payments</span>
              <h3 className={styles.challengeTitle}>高単価</h3>
              <p className={styles.challengeText}>調査会社<br />10万円/1人</p>
            </div>

            <div className={styles.challengeCard}>
              <span className={`material-symbols-outlined ${styles.challengeIcon}`}>hourglass_empty</span>
              <h3 className={styles.challengeTitle}>長期間</h3>
              <p className={styles.challengeText}>30人が限界<br />60時間の労働時間</p>
            </div>
          </div>
        </div>
      </section>

      {/* システムの強みセクション */}
      <section className={styles.strengthSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>N1インタビュー自動化システムの強み</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          <div className={styles.strengthGrid}>
            <div className={styles.strengthCard}>
              <span className={`material-symbols-outlined ${styles.strengthIcon}`}>check_circle</span>
              <h3 className={styles.strengthTitle}>手間無し</h3>
            </div>

            <div className={styles.strengthCard}>
              <span className={`material-symbols-outlined ${styles.strengthIcon}`}>trending_up</span>
              <h3 className={styles.strengthTitle}>高精度</h3>
            </div>

            <div className={styles.strengthCard}>
              <span className={`material-symbols-outlined ${styles.strengthIcon}`}>verified</span>
              <h3 className={styles.strengthTitle}>最安値</h3>
            </div>

            <div className={styles.strengthCard}>
              <span className={`material-symbols-outlined ${styles.strengthIcon}`}>bolt</span>
              <h3 className={styles.strengthTitle}>短期間</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 詳細比較セクション */}
      <section className={styles.comparisonSection}>
        <div className={styles.container}>
          {/* 手間の比較 */}
          <div className={styles.comparisonBlock}>
            <div className={styles.comparisonBefore}>
              <h3 className={styles.comparisonLabel}>手間</h3>
              <ul className={styles.comparisonList}>
                <li>日程調整</li>
                <li>質問準備</li>
                <li>文字起こし〜分析〜報告</li>
              </ul>
            </div>
            <div className={styles.comparisonArrow}>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
            <div className={styles.comparisonAfter}>
              <h3 className={styles.comparisonLabel}>手間無し</h3>
              <ul className={styles.comparisonList}>
                <li>日程調整不要（リンクを送るだけ）</li>
                <li>AIが質問・文字起こし・分析・報告まで実行</li>
              </ul>
            </div>
          </div>

          {/* 精度の比較 */}
          <div className={styles.comparisonBlock}>
            <div className={styles.comparisonBefore}>
              <h3 className={styles.comparisonLabel}>低精度</h3>
              <ul className={styles.comparisonList}>
                <li>聞き手の力に左右する</li>
                <li>よく思われようとする</li>
              </ul>
            </div>
            <div className={styles.comparisonArrow}>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
            <div className={styles.comparisonAfter}>
              <h3 className={styles.comparisonLabel}>高精度</h3>
              <ul className={styles.comparisonList}>
                <li>過去のデータを<span className={styles.highlightNumber}>1000万以上</span>学習</li>
                <li><span className={styles.highlight}>AIには本音で話せる</span></li>
              </ul>
            </div>
          </div>

          {/* 単価の比較 */}
          <div className={styles.comparisonBlock}>
            <div className={styles.comparisonBefore}>
              <h3 className={styles.comparisonLabel}>高単価</h3>
              <div className={styles.priceBox}>
                <p className={styles.priceLabel}>調査会社</p>
                <p className={styles.priceAmount}>10万円/1人</p>
              </div>
            </div>
            <div className={styles.comparisonArrow}>
              <span className="material-symbols-outlined">arrow_forward</span>
              <div className={styles.reductionBadge}>
                約95%<br />のコスト削減
              </div>
            </div>
            <div className={styles.comparisonAfter}>
              <h3 className={styles.comparisonLabel}>最安値</h3>
              <div className={styles.priceBox}>
                <p className={styles.priceLabel}>弊社</p>
                <p className={styles.priceAmount}>5千円/1人</p>
              </div>
            </div>
          </div>

          {/* 期間の比較 */}
          <div className={styles.comparisonBlock}>
            <div className={styles.comparisonBefore}>
              <h3 className={styles.comparisonLabel}>長期間（調査会社など）</h3>
              <ul className={styles.comparisonList}>
                <li>件数：<span className={styles.highlightNumber}>30人が限界</span></li>
                <li>労働：1人で2時間</li>
                <li>　　　30人で<span className={styles.highlightNumber}>60時間</span></li>
              </ul>
            </div>
            <div className={styles.comparisonArrow}>
              <span className="material-symbols-outlined">arrow_forward</span>
              <div className={styles.reductionBadge}>
                約98%<br />の短縮
              </div>
            </div>
            <div className={styles.comparisonAfter}>
              <h3 className={styles.comparisonLabel}>短期間</h3>
              <ul className={styles.comparisonList}>
                <li>件数：<span className={styles.highlightSuccess}>無制限</span></li>
                <li>労働：<span className={styles.highlight}>URLを送るだけ</span></li>
                <li>　　　可視化・分析・報告まで</li>
                <li>　　　<span className={styles.highlightSuccess}>最短1日</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 実績セクション */}
      <section className={styles.achievementSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>弊社の圧倒的な実績</span>
            <div className={styles.titleDecoration}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorLine}></span>
            </div>
          </h2>

          <div className={styles.achievementGrid}>
            <div className={styles.achievementCard}>
              <div className={styles.achievementIcon}>
                <span className="material-symbols-outlined">hotel</span>
              </div>
              <h3 className={styles.achievementTitle}><span className={styles.highlightSuccess}>沖縄県で口コミランキング1位</span></h3>
              <p className={styles.achievementText}>
                のホテルを開発
              </p>
              <div className={styles.achievementBadge}>
                <span className="material-symbols-outlined">star</span>
                <span>口コミ1位達成</span>
              </div>
            </div>

            <div className={styles.achievementCard}>
              <div className={styles.achievementIcon}>
                <span className="material-symbols-outlined">local_hospital</span>
              </div>
              <h3 className={styles.achievementTitle}><span className={styles.highlightSuccess}>日本全国で口コミランキング1位</span></h3>
              <p className={styles.achievementText}>
                の病院を開発
              </p>
              <div className={styles.achievementBadge}>
                <span className="material-symbols-outlined">star</span>
                <span>口コミ1位達成</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>
            顧客の本音を引き出す<br />
            N1インタビュー自動化システムを<br />
            ぜひお試しください
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
