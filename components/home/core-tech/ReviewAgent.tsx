import styles from '../CoreTechSection.module.css'

interface ReviewAgentProps {
    isVisible: boolean
    reviewScores: number[]
}

export const ReviewAgent = ({ isVisible, reviewScores }: ReviewAgentProps) => {
    return (
        <div className={`${styles.agentSection} ${isVisible ? styles.sectionVisible : ''}`}>
            <div className={styles.reviewAgentGrid}>
                {/* メインコンテンツエリア */}
                <div className={styles.reviewMainContent}>
                    {/* 左側：タイトル、レーダーチャート、サマリー */}
                    <div className={styles.reviewLeftPanel}>
                        <div className={styles.agentHeader}>
                            <h3 className={styles.agentTitle}>
                                <span className={styles.agentNumber}>03</span>
                                Review Agent
                            </h3>
                            <p className={styles.agentSubtitle}>
                                無数の声から価値を再構築する建築家
                            </p>
                            <p className={styles.agentDescription}>
                                Webに散らばる無数のレビュー。それは不満と満足の混沌。
                                エージェントは、その一つひとつの声を構造的に解析し、
                                製品やサービスが持つべき「真の価値構造」を可視化します。
                            </p>
                        </div>
                        {/* レーダーチャート */}
                        <div className={styles.radarChart}>
                            <svg className={styles.radarSvg} viewBox="0 0 300 300">
                                {/* 背景の五角形 */}
                                {[1, 0.75, 0.5, 0.25].map((scale, i) => (
                                    <polygon
                                        key={i}
                                        points={`
                      150,${150 - 100 * scale}
                      ${150 + 95 * scale},${150 - 31 * scale}
                      ${150 + 59 * scale},${150 + 81 * scale}
                      ${150 - 59 * scale},${150 + 81 * scale}
                      ${150 - 95 * scale},${150 - 31 * scale}
                    `}
                                        fill="none"
                                        stroke="rgba(0, 255, 204, 0.1)"
                                        strokeWidth="1"
                                    />
                                ))}

                                {/* データプロット */}
                                <polygon
                                    points={`
                    150,${150 - reviewScores[0]}
                    ${150 + reviewScores[1] * 0.95},${150 - reviewScores[1] * 0.31}
                    ${150 + reviewScores[2] * 0.59},${150 + reviewScores[2] * 0.81}
                    ${150 - reviewScores[3] * 0.59},${150 + reviewScores[3] * 0.81}
                    ${150 - reviewScores[4] * 0.95},${150 - reviewScores[4] * 0.31}
                  `}
                                    fill="rgba(0, 255, 204, 0.2)"
                                    stroke="#00ffcc"
                                    strokeWidth="2"
                                />

                                {/* ラベル */}
                                <text x="150" y="30" textAnchor="middle" fill="#00ffcc" fontSize="12">デザイン性</text>
                                <text x="270" y="120" textAnchor="start" fill="#00ffcc" fontSize="12">パフォーマンス</text>
                                <text x="210" y="270" textAnchor="middle" fill="#00ffcc" fontSize="12">価格満足度</text>
                                <text x="90" y="270" textAnchor="middle" fill="#00ffcc" fontSize="12">サポート品質</text>
                                <text x="30" y="120" textAnchor="end" fill="#00ffcc" fontSize="12">総合品質</text>
                            </svg>
                        </div>

                        {/* サマリー統計 */}
                        <div className={styles.reviewSummaryBar}>
                            <div className={styles.summaryMetric}>
                                <span className={styles.metricValue}>4.5</span>
                                <span className={styles.metricLabel}>総合評価</span>
                            </div>
                            <div className={styles.summaryMetric}>
                                <span className={styles.metricValue}>89%</span>
                                <span className={styles.metricLabel}>満足度</span>
                            </div>
                            <div className={styles.summaryMetric}>
                                <span className={styles.metricValue}>2.8k</span>
                                <span className={styles.metricLabel}>レビュー数</span>
                            </div>
                            <div className={styles.summaryMetric}>
                                <span className={styles.metricValue} style={{ color: '#00ff88' }}>+15%</span>
                                <span className={styles.metricLabel}>成長率</span>
                            </div>
                        </div>
                    </div>

                    {/* 右側：詳細分析 */}
                    <div className={styles.reviewRightPanel}>
                        {/* 詳細分析マトリックス */}
                        <div className={styles.analysisMatrix}>
                            <h4>構造化レビュー解析</h4>

                            <div className={styles.matrixItem}>
                                <div className={styles.matrixCategory}>デザイン性</div>
                                <div className={styles.matrixBarContainer}>
                                    <div className={styles.matrixBarFill} style={{ width: `${reviewScores[0]}%` }}></div>
                                </div>
                                <div className={styles.matrixScore}>{reviewScores[0].toFixed(1)}%</div>
                                <div className={styles.matrixTags}>
                                    <span className={styles.posTag}>+ 洗練された</span>
                                    <span className={styles.posTag}>+ わかりやすい</span>
                                    <span className={styles.negTag}>- 初期設定が難しい</span>
                                </div>
                            </div>

                            <div className={styles.matrixItem}>
                                <div className={styles.matrixCategory}>パフォーマンス</div>
                                <div className={styles.matrixBarContainer}>
                                    <div className={styles.matrixBarFill} style={{ width: `${reviewScores[1]}%` }}></div>
                                </div>
                                <div className={styles.matrixScore}>{reviewScores[1].toFixed(1)}%</div>
                                <div className={styles.matrixTags}>
                                    <span className={styles.posTag}>+ 高速処理</span>
                                    <span className={styles.negTag}>- メモリ消費</span>
                                </div>
                            </div>

                            <div className={styles.matrixItem}>
                                <div className={styles.matrixCategory}>コストパフォーマンス</div>
                                <div className={styles.matrixBarContainer}>
                                    <div className={styles.matrixBarFill} style={{ width: `${reviewScores[2]}%` }}></div>
                                </div>
                                <div className={styles.matrixScore}>{reviewScores[2].toFixed(1)}%</div>
                                <div className={styles.matrixTags}>
                                    <span className={styles.posTag}>+ 投資価値あり</span>
                                    <span className={styles.posTag}>+ 適正価格</span>
                                </div>
                            </div>

                            <div className={styles.insightBox}>
                                <div className={styles.insightHeader}>
                                    <span className={styles.insightIcon}>💡</span>
                                    重要な発見
                                </div>
                                <p className={styles.insightText}>
                                    「機能の富裕さ」と「パフォーマンス」は特に高評価を得ています。
                                    一方で、オンボーディングプロセスの簡素化がユーザー獲得の鍵となりそうです。
                                    チュートリアル動画やFAQの充実が推奨されます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
