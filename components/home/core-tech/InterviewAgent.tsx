import styles from '../CoreTechSection.module.css'
import { NeuralNode } from './types'

interface InterviewAgentProps {
    isVisible: boolean
    neuralNodes: NeuralNode[]
    pulseAnimation: number
}

export const InterviewAgent = ({ isVisible, neuralNodes, pulseAnimation }: InterviewAgentProps) => {
    return (
        <div className={`${styles.agentSection} ${isVisible ? styles.sectionVisible : ''}`}>
            <div className={styles.interviewAgentGrid}>
                {/* 左側：タイトルとニューラルネットワーク */}
                <div className={styles.leftColumn}>
                    <div className={styles.agentHeader}>
                        <h3 className={styles.agentTitle}>
                            <span className={styles.agentNumber}>01</span>
                            Interview Agent
                        </h3>
                        <p className={styles.agentSubtitle}>
                            AIによる深層心理の探求者
                        </p>
                        <p className={styles.agentDescription}>
                            AIが、生身のインタビュアーのように、ユーザーとの対話から本音のさらに奥にある無意識のインサイトを抽出。
                            発話の一つひとつが、リアルタイムで構造化され、感性の地図を描き出します。
                        </p>
                    </div>

                    {/* ニューラルネットワークビジュアル */}
                    <div className={styles.neuralVisual}>
                        <svg className={styles.neuralSvg}>
                            {neuralNodes.map(node =>
                                node.connections.map(targetId => {
                                    const targetNode = neuralNodes.find(n => n.id === targetId)
                                    if (!targetNode) return null
                                    return (
                                        <line
                                            key={`${node.id}-${targetId}`}
                                            x1={`${node.x}%`}
                                            y1={`${node.y}%`}
                                            x2={`${targetNode.x}%`}
                                            y2={`${targetNode.y}%`}
                                            className={styles.neuralLine}
                                            style={{
                                                opacity: pulseAnimation > node.id * 5 && pulseAnimation < node.id * 5 + 30 ? 0.8 : 0.1
                                            }}
                                        />
                                    )
                                })
                            )}
                            {neuralNodes.map(node => (
                                <circle
                                    key={node.id}
                                    cx={`${node.x}%`}
                                    cy={`${node.y}%`}
                                    r="3"
                                    className={styles.neuralNode}
                                />
                            ))}
                        </svg>
                        <div className={styles.neuralLabel}>感情パターン認識システム</div>
                    </div>
                </div>

                {/* 右側：チャットインターフェース */}
                <div className={styles.chatInterface}>
                    <div className={styles.chatHeader}>
                        <span className={styles.statusDot}></span>
                        <span>リアルタイムインタビューセッション</span>
                    </div>
                    <div className={styles.chatMessages}>
                        <div className={styles.messageUser}>
                            <span className={styles.messageAvatar}>U</span>
                            <div className={styles.messageContent}>
                                <p>新しい検索機能、すごく便利になりましたね！<br />以前より格段に使いやすいです</p>
                                <span className={styles.messageTime}>10:24</span>
                            </div>
                        </div>

                        <div className={styles.analysisPanel}>
                            <div className={styles.sentimentMeter}>
                                <span>インサイト深度</span>
                                <div className={styles.meterBar}>
                                    <div className={styles.meterFill} style={{ width: '85%', background: 'linear-gradient(90deg, #0088ff, #00ccff)' }}></div>
                                </div>
                                <div className={styles.meterLabels}>
                                    <span>顕在的</span>
                                    <span className={styles.score} style={{ color: '#00ccff' }}>潜在欲求: 有能感</span>
                                    <span>潜在的</span>
                                </div>
                            </div>

                            <div className={styles.keywordsExtracted}>
                                <span className={styles.keywordTag} style={{ borderColor: '#0088ff', color: '#0088ff' }}>#自己効力感</span>
                                <span className={styles.keywordTag} style={{ borderColor: '#00ccff', color: '#00ccff' }}>#業務効率化</span>
                                <span className={styles.keywordTag} style={{ borderColor: '#00ccff', color: '#00ccff' }}>#達成感</span>
                            </div>
                        </div>

                        <div className={styles.messageUser}>
                            <span className={styles.messageAvatar}>U</span>
                            <div className={styles.messageContent}>
                                <p>初期設定が少し複雑でした。<br />もう少しガイドがあると嬉しいです</p>
                                <span className={styles.messageTime}>10:25</span>
                            </div>
                        </div>

                        <div className={styles.analysisPanel}>
                            <div className={styles.sentimentMeter}>
                                <span>心理的摩擦 (Friction)</span>
                                <div className={styles.meterBar}>
                                    <div className={styles.meterFill} style={{ width: '75%', background: 'linear-gradient(90deg, #aa00ff, #ff0066)' }}></div>
                                </div>
                                <div className={styles.meterLabels}>
                                    <span>スムーズ</span>
                                    <span className={styles.score} style={{ color: '#ff0066' }}>認知負荷: 高</span>
                                    <span>高負荷</span>
                                </div>
                            </div>

                            <div className={styles.keywordsExtracted}>
                                <span className={styles.keywordTag} style={{ borderColor: '#aa00ff', color: '#aa00ff' }}>#認知的不協和</span>
                                <span className={styles.keywordTag} style={{ borderColor: '#ff0066', color: '#ff0066' }}>#安心感の欠如</span>
                                <span className={styles.keywordTag} style={{ borderColor: '#ff0066', color: '#ff0066' }}>#メンタルモデル不一致</span>
                            </div>
                        </div>

                        <div className={styles.messageUser}>
                            <span className={styles.messageAvatar}>U</span>
                            <div className={styles.messageContent}>
                                <p>AIの提案が的確で、まるで自分のことを<br />理解してくれているようです。</p>
                                <span className={styles.messageTime}>10:28</span>
                            </div>
                        </div>

                        <div className={styles.analysisPanel}>
                            <div className={styles.sentimentMeter}>
                                <span>インサイト深度</span>
                                <div className={styles.meterBar}>
                                    <div className={styles.meterFill} style={{ width: '95%', background: 'linear-gradient(90deg, #0088ff, #00ffcc)' }}></div>
                                </div>
                                <div className={styles.meterLabels}>
                                    <span>顕在的</span>
                                    <span className={styles.score} style={{ color: '#00ffcc' }}>潜在欲求: 受容</span>
                                    <span>潜在的</span>
                                </div>
                            </div>

                            <div className={styles.keywordsExtracted}>
                                <span className={styles.keywordTag} style={{ borderColor: '#00ffcc', color: '#00ffcc' }}>#信頼構築</span>
                                <span className={styles.keywordTag} style={{ borderColor: '#0088ff', color: '#0088ff' }}>#自己重要感</span>
                                <span className={styles.keywordTag} style={{ borderColor: '#00ffcc', color: '#00ffcc' }}>#パートナーシップ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
