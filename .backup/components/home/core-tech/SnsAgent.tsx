import styles from '../CoreTechSection.module.css'

interface SnsAgentProps {
    isVisible: boolean
    snsMetrics: {
        positive: number
        negative: number
        neutral: number
    }
}

export const SnsAgent = ({ isVisible, snsMetrics }: SnsAgentProps) => {
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
                            <div className={styles.metricIcon}>📈</div>
                            <div className={styles.metricValue} style={{ color: '#00ff88' }}>
                                {snsMetrics.positive.toLocaleString()}
                            </div>
                            <div className={styles.metricLabel}>ポジティブな言及</div>
                            <div className={styles.metricChange}>+24.5%</div>
                        </div>

                        <div className={styles.metricCard}>
                            <div className={styles.metricIcon}>⚠️</div>
                            <div className={styles.metricValue} style={{ color: '#ff6600' }}>
                                {snsMetrics.negative.toLocaleString()}
                            </div>
                            <div className={styles.metricLabel}>ネガティブ検出</div>
                            <div className={styles.metricChange} style={{ color: '#00ff88' }}>-18.2%</div>
                        </div>

                        <div className={styles.metricCard}>
                            <div className={styles.metricIcon}>💭</div>
                            <div className={styles.metricValue}>
                                {snsMetrics.neutral.toLocaleString()}
                            </div>
                            <div className={styles.metricLabel}>中立的な言及</div>
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
                                <span><i style={{ background: '#00ff88' }}></i> ポジティブ</span>
                                <span><i style={{ background: '#ff6600' }}></i> ネガティブ</span>
                                <span><i style={{ background: '#8a2be2' }}></i> ニュートラル</span>
                            </div>
                        </div>
                        <svg className={styles.graphSvg} viewBox="0 0 400 200">
                            {/* グリッドライン */}
                            {[0, 50, 100, 150].map(y => (
                                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" />
                            ))}

                            {/* ポジティブライン */}
                            <polyline
                                points="0,100 40,95 80,85 120,70 160,75 200,60 240,65 280,50 320,55 360,45 400,40"
                                fill="none"
                                stroke="#00ff88"
                                strokeWidth="2"
                            />

                            {/* ネガティブライン */}
                            <polyline
                                points="0,120 40,115 80,118 120,140 160,135 200,145 240,140 280,150 320,148 360,155 400,160"
                                fill="none"
                                stroke="#ff6600"
                                strokeWidth="2"
                            />

                            {/* エリアフィル */}
                            <polygon
                                points="0,100 40,95 80,85 120,70 160,75 200,60 240,65 280,50 320,55 360,45 400,40 400,200 0,200"
                                fill="url(#positiveGradient)"
                                opacity="0.2"
                            />

                            <defs>
                                <linearGradient id="positiveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#00ff88" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
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
