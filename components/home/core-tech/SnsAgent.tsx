import styles from '../CoreTechSection.module.css'

interface SnsMetrics {
    valence: number
    arousal: number
    dominance: number
}

interface SnsAgentProps {
    isVisible: boolean
    snsMetrics: SnsMetrics
    metricsHistory: SnsMetrics[]
}

export const SnsAgent = ({ isVisible, snsMetrics, metricsHistory }: SnsAgentProps) => {
    // 履歴データからSVGパスを生成する関数
    const generatePath = (key: keyof SnsMetrics) => {
        if (!metricsHistory || metricsHistory.length === 0) return ""

        const width = 400
        const height = 200
        const maxPoints = 40 // 履歴の最大保持数と合わせる

        // ポイントの生成
        const points = metricsHistory.map((metric, index) => {
            // X座標: 古いデータ(index 0)が左(0)、新しいデータ(index length-1)が右(width)
            // ただし、左に流れるように見せるため、新しいデータが右端に来るように配置
            const x = (index / (maxPoints - 1)) * width

            // Y座標: 値(0-100)を高さ(0-200)にマッピング（反転させる、100が上）
            // マージンを少し持たせる (10-190)
            const y = height - ((metric[key] / 100) * (height - 20) + 10)

            return `${x},${y}`
        })

        return `M${points.join(' L')}`
    }

    return (
        <div className={`${styles.agentSection} ${styles.agentSectionAlt} ${isVisible ? styles.sectionVisible : ''}`}>
            <div className={styles.snsAgentGrid}>
                {/* 上段：タイトルとメトリクス */}
                <div className={styles.topRow}>
                    <div className={styles.agentHeader}>
                        <h3 className={styles.agentTitle}>
                            <span className={styles.agentNumber}>02</span>
                            SNS Agent
                        </h3>
                        <p className={styles.agentSubtitle}>
                            雑音から真意を掴む分析官
                        </p>
                        <p className={styles.agentDescription}>
                            ポジティブか、ネガティブか。そんな表層的な分析では意味がない。
                            私たちのエージェントは、SNSの膨大なノイズの中から、感情の根本原因を特定。
                            インタラクティブなダッシュボードで、市場のリアルな脈動をその手に。
                        </p>
                    </div>

                    {/* リアルタイムメトリクス */}
                    <div className={styles.metricsContainer}>
                        <div className={styles.metricCard}>
                            <div className={styles.metricIcon}>
                                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#00ff88' }}>sentiment_satisfied</span>
                            </div>
                            <div className={styles.metricValue} style={{ color: '#00ff88' }}>
                                {snsMetrics.valence.toFixed(1)}
                            </div>
                            <div className={styles.metricLabel}>感情価 (Valence)</div>
                            <div className={styles.metricChange}>+24.5%</div>
                        </div>

                        <div className={styles.metricCard}>
                            <div className={styles.metricIcon}>
                                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#ff00ff' }}>bolt</span>
                            </div>
                            <div className={styles.metricValue} style={{ color: '#ff00ff' }}>
                                {snsMetrics.arousal.toFixed(1)}
                            </div>
                            <div className={styles.metricLabel}>覚醒度 (Arousal)</div>
                            <div className={styles.metricChange} style={{ color: '#00ff88' }}>+8.2%</div>
                        </div>

                        <div className={styles.metricCard}>
                            <div className={styles.metricIcon}>
                                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#00ccff' }}>psychology</span>
                            </div>
                            <div className={styles.metricValue} style={{ color: '#00ccff' }}>
                                {snsMetrics.dominance.toFixed(1)}
                            </div>
                            <div className={styles.metricLabel}>支配性 (Dominance)</div>
                            <div className={styles.metricChange}>+5.7%</div>
                        </div>
                    </div>
                </div>

                {/* 下段：グラフとワードクラウド */}
                <div className={styles.bottomRow}>
                    {/* トレンドグラフ */}
                    <div className={styles.trendGraph}>
                        <div className={styles.graphHeader}>
                            <h4>リアルタイム感情フロー分析</h4>
                            <div className={styles.graphLegend}>
                                <span><i style={{ background: '#00ff88' }}></i> 感情価</span>
                                <span><i style={{ background: '#ff00ff' }}></i> 覚醒度</span>
                                <span><i style={{ background: '#00ccff' }}></i> 支配性</span>
                            </div>
                        </div>
                        <svg className={styles.graphSvg} viewBox="0 0 400 200">
                            {/* グリッドライン */}
                            {[0, 50, 100, 150].map(y => (
                                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" />
                            ))}

                            {/* 感情価 (Green) */}
                            <path
                                d={generatePath('valence')}
                                fill="none"
                                stroke="#00ff88"
                                strokeWidth="2"
                                opacity="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* 覚醒度 (Magenta) */}
                            <path
                                d={generatePath('arousal')}
                                fill="none"
                                stroke="#ff00ff"
                                strokeWidth="2"
                                opacity="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* 支配性 (Cyan) */}
                            <path
                                d={generatePath('dominance')}
                                fill="none"
                                stroke="#00ccff"
                                strokeWidth="2"
                                opacity="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* ワードクラウド */}
                    <div className={styles.wordCloud}>
                        <span className={styles.word} style={{ fontSize: '26px', color: '#00ff88' }}>使いやすさ向上</span>
                        <span className={styles.word} style={{ fontSize: '20px', color: '#00ffcc' }}>コスパ最高</span>
                        <span className={styles.word} style={{ fontSize: '18px', color: '#ff6600' }}>設定が複雑</span>
                        <span className={styles.word} style={{ fontSize: '22px', color: '#8a2be2' }}>サポート充実</span>
                        <span className={styles.word} style={{ fontSize: '24px', color: '#00ff88' }}>機能豊富</span>
                        <span className={styles.word} style={{ fontSize: '16px', color: '#ff6600' }}>料金が高い</span>
                        <span className={styles.word} style={{ fontSize: '21px', color: '#00ffcc' }}>直感的</span>
                        <span className={styles.word} style={{ fontSize: '19px', color: '#8a2be2' }}>安定性</span>
                        <span className={styles.word} style={{ fontSize: '17px', color: '#00ff88' }}>カスタマイズ性</span>
                        <span className={styles.word} style={{ fontSize: '23px', color: '#00ffcc' }}>アップデート期待</span>
                        <span className={styles.word} style={{ fontSize: '15px', color: '#8a2be2' }}>レスポンス良好</span>
                        <span className={styles.word} style={{ fontSize: '20px', color: '#00ff88' }}>高品質</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
