'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './CoreTechSection.module.css'

interface NeuralNode {
  id: number
  x: number
  y: number
  connections: number[]
}

const CoreTechSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [neuralNodes, setNeuralNodes] = useState<NeuralNode[]>([])
  const [pulseAnimation, setPulseAnimation] = useState(0)
  const [typingIndex, setTypingIndex] = useState(0)
  const [sentimentValue, setSentimentValue] = useState(0)
  const [snsMetrics, setSnsMetrics] = useState({ positive: 1280, negative: 450, neutral: 890 })
  const [reviewScores, setReviewScores] = useState([85, 70, 90, 65, 88])

  // タイピングアニメーション
  const chatMessages = [
    { text: "デザインは良いですね", sentiment: 0.8, type: 'positive' },
    { text: "でも、少し重いかな...", sentiment: -0.6, type: 'negative' }
  ]

  useEffect(() => {
    // ニューラルネットワークノードの生成
    const nodes: NeuralNode[] = []
    const layers = 4
    const nodesPerLayer = [3, 5, 5, 3]
    let nodeId = 0

    for (let layer = 0; layer < layers; layer++) {
      const layerNodeCount = nodesPerLayer[layer]
      for (let i = 0; i < layerNodeCount; i++) {
        const x = (layer / (layers - 1)) * 100
        const y = ((i + 1) / (layerNodeCount + 1)) * 100
        
        const connections: number[] = []
        if (layer < layers - 1) {
          const nextLayerStart = nodeId + layerNodeCount
          const nextLayerCount = nodesPerLayer[layer + 1]
          const uniqueTargets = new Set<number>()
          while (uniqueTargets.size < Math.min(2, nextLayerCount)) {
            uniqueTargets.add(nextLayerStart + Math.floor(Math.random() * nextLayerCount))
          }
          connections.push(...uniqueTargets)
        }
        
        nodes.push({ id: nodeId++, x, y, connections })
      }
    }
    setNeuralNodes(nodes)

    // アニメーションループ
    const interval = setInterval(() => {
      setPulseAnimation(prev => (prev + 1) % 100)
      setSentimentValue(prev => Math.sin(Date.now() / 1000) * 50 + 50)
      setSnsMetrics(prev => ({
        positive: prev.positive + Math.floor(Math.random() * 10 - 3),
        negative: prev.negative + Math.floor(Math.random() * 5 - 2),
        neutral: prev.neutral + Math.floor(Math.random() * 8 - 4)
      }))
      setReviewScores(prev => prev.map(score => 
        Math.max(0, Math.min(100, score + (Math.random() - 0.5) * 2))
      ))
    }, 100)

    // タイピングアニメーション
    const typingInterval = setInterval(() => {
      setTypingIndex(prev => (prev + 1) % 50)
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(typingInterval)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.coreTechSection}>
      <div className={styles.container}>
        {/* メインヘッダー */}
        <div className={`${styles.header} ${isVisible ? styles.headerVisible : ''}`}>
          <h2 className={styles.mainTitle}>
            CORE TECHNOLOGY
          </h2>
          <p className={styles.subtitle}>
            テクノロジーの核心
          </p>
          <div className={styles.titleDecoration}>
            <span className={styles.techLine} />
            <span className={styles.techCore} />
            <span className={styles.techLine} />
          </div>
        </div>

        {/* メイン説明文 */}
        <div className={`${styles.mainDescription} ${isVisible ? styles.descriptionVisible : ''}`}>
          <p>
            我々の技術的特異点、それが自社開発AI「<span className={styles.highlight}>KANSEI Agents</span>」。
            <br />
            単なるデータ処理を超え、人間の感情の奥底にある「なぜ」を解き明かす、知性の集合体です。
          </p>
        </div>

        {/* エージェントセクション */}
        <div className={styles.agentsContainer}>
          
          {/* Interview Agent */}
          <div className={`${styles.agentSection} ${isVisible ? styles.sectionVisible : ''}`}>
            <div className={styles.agentContent}>
              <div className={styles.agentInfo}>
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

              <div className={styles.agentVisual}>
                <div className={styles.interviewContainer}>
                  {/* チャットインターフェース */}
                  <div className={styles.chatInterface}>
                    <div className={styles.chatHeader}>
                      <span className={styles.statusDot}></span>
                      <span>Live Interview Session</span>
                    </div>
                    <div className={styles.chatMessages}>
                      <div className={styles.messageUser}>
                        <span className={styles.messageAvatar}>U</span>
                        <div className={styles.messageContent}>
                          <p>デザインは良いですね</p>
                          <span className={styles.messageTime}>10:24</span>
                        </div>
                      </div>
                      
                      <div className={styles.analysisPanel}>
                        <div className={styles.sentimentMeter}>
                          <span>Sentiment Analysis</span>
                          <div className={styles.meterBar}>
                            <div className={styles.meterFill} style={{width: '80%', background: 'linear-gradient(90deg, #00ff88, #00ffcc)'}}></div>
                          </div>
                          <div className={styles.meterLabels}>
                            <span>Negative</span>
                            <span className={styles.score}>+0.8</span>
                            <span>Positive</span>
                          </div>
                        </div>
                        
                        <div className={styles.keywordsExtracted}>
                          <span className={styles.keywordTag}>デザイン</span>
                          <span className={styles.emotionTag}>好意</span>
                          <span className={styles.contextTag}>UI/UX</span>
                        </div>
                      </div>

                      <div className={styles.messageUser}>
                        <span className={styles.messageAvatar}>U</span>
                        <div className={styles.messageContent}>
                          <p>でも、少し重いかな...特に起動が...</p>
                          <span className={styles.messageTime}>10:25</span>
                        </div>
                      </div>

                      <div className={styles.analysisPanel}>
                        <div className={styles.sentimentMeter}>
                          <span>Sentiment Analysis</span>
                          <div className={styles.meterBar}>
                            <div className={styles.meterFill} style={{width: '35%', background: 'linear-gradient(90deg, #ff6600, #ff9933)'}}></div>
                          </div>
                          <div className={styles.meterLabels}>
                            <span>Negative</span>
                            <span className={styles.score}>-0.6</span>
                            <span>Positive</span>
                          </div>
                        </div>
                        
                        <div className={styles.keywordsExtracted}>
                          <span className={styles.keywordTag}>パフォーマンス</span>
                          <span className={styles.emotionTag}>不満</span>
                          <span className={styles.keywordTag}>起動速度</span>
                        </div>
                      </div>
                    </div>
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
                    <div className={styles.neuralLabel}>Emotional Pattern Recognition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SNS Agent */}
          <div className={`${styles.agentSection} ${styles.agentSectionAlt} ${isVisible ? styles.sectionVisible : ''}`}>
            <div className={styles.agentContent}>
              <div className={styles.agentInfo}>
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

              <div className={styles.agentVisual}>
                <div className={styles.snsContainer}>
                  {/* リアルタイムメトリクス */}
                  <div className={styles.metricsGrid}>
                    <div className={styles.metricCard}>
                      <div className={styles.metricIcon}>📈</div>
                      <div className={styles.metricValue} style={{color: '#00ff88'}}>
                        {snsMetrics.positive.toLocaleString()}
                      </div>
                      <div className={styles.metricLabel}>Positive Mentions</div>
                      <div className={styles.metricChange}>+12.3%</div>
                    </div>
                    
                    <div className={styles.metricCard}>
                      <div className={styles.metricIcon}>⚠️</div>
                      <div className={styles.metricValue} style={{color: '#ff6600'}}>
                        {snsMetrics.negative.toLocaleString()}
                      </div>
                      <div className={styles.metricLabel}>Negative Spike</div>
                      <div className={styles.metricChange} style={{color: '#ff6600'}}>+35%</div>
                    </div>
                    
                    <div className={styles.metricCard}>
                      <div className={styles.metricIcon}>💭</div>
                      <div className={styles.metricValue}>
                        {snsMetrics.neutral.toLocaleString()}
                      </div>
                      <div className={styles.metricLabel}>Neutral Mentions</div>
                      <div className={styles.metricChange}>-2.1%</div>
                    </div>
                  </div>

                  {/* トレンドグラフ */}
                  <div className={styles.trendGraph}>
                    <div className={styles.graphHeader}>
                      <h4>Real-time Sentiment Flow</h4>
                      <div className={styles.graphLegend}>
                        <span><i style={{background: '#00ff88'}}></i> Positive</span>
                        <span><i style={{background: '#ff6600'}}></i> Negative</span>
                        <span><i style={{background: '#8a2be2'}}></i> Neutral</span>
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
                    <span className={styles.word} style={{fontSize: '24px', color: '#00ff88'}}>革新的</span>
                    <span className={styles.word} style={{fontSize: '18px', color: '#00ffcc'}}>使いやすい</span>
                    <span className={styles.word} style={{fontSize: '20px', color: '#ff6600'}}>高い</span>
                    <span className={styles.word} style={{fontSize: '16px', color: '#8a2be2'}}>デザイン</span>
                    <span className={styles.word} style={{fontSize: '22px', color: '#00ff88'}}>満足</span>
                    <span className={styles.word} style={{fontSize: '14px', color: '#ff6600'}}>遅い</span>
                    <span className={styles.word} style={{fontSize: '19px', color: '#00ffcc'}}>便利</span>
                    <span className={styles.word} style={{fontSize: '17px', color: '#8a2be2'}}>期待</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Agent */}
          <div className={`${styles.agentSection} ${isVisible ? styles.sectionVisible : ''}`}>
            <div className={styles.agentContent}>
              <div className={styles.agentInfo}>
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

              <div className={styles.agentVisual}>
                <div className={styles.reviewContainer}>
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
                      <text x="150" y="30" textAnchor="middle" fill="#00ffcc" fontSize="12">Design</text>
                      <text x="270" y="120" textAnchor="start" fill="#00ffcc" fontSize="12">Performance</text>
                      <text x="210" y="270" textAnchor="middle" fill="#00ffcc" fontSize="12">Price</text>
                      <text x="90" y="270" textAnchor="middle" fill="#00ffcc" fontSize="12">Support</text>
                      <text x="30" y="120" textAnchor="end" fill="#00ffcc" fontSize="12">Quality</text>
                    </svg>
                  </div>

                  {/* 詳細分析マトリックス */}
                  <div className={styles.analysisMatrix}>
                    <h4>Structured Review Analysis</h4>
                    
                    <div className={styles.matrixItem}>
                      <div className={styles.matrixCategory}>Design</div>
                      <div className={styles.matrixBarContainer}>
                        <div className={styles.matrixBarFill} style={{width: `${reviewScores[0]}%`}}></div>
                      </div>
                      <div className={styles.matrixScore}>{reviewScores[0].toFixed(1)}%</div>
                      <div className={styles.matrixTags}>
                        <span className={styles.posTag}>+ Modern</span>
                        <span className={styles.posTag}>+ Intuitive</span>
                        <span className={styles.negTag}>- Complex</span>
                      </div>
                    </div>

                    <div className={styles.matrixItem}>
                      <div className={styles.matrixCategory}>Performance</div>
                      <div className={styles.matrixBarContainer}>
                        <div className={styles.matrixBarFill} style={{width: `${reviewScores[1]}%`}}></div>
                      </div>
                      <div className={styles.matrixScore}>{reviewScores[1].toFixed(1)}%</div>
                      <div className={styles.matrixTags}>
                        <span className={styles.posTag}>+ Fast</span>
                        <span className={styles.negTag}>- Memory</span>
                      </div>
                    </div>

                    <div className={styles.matrixItem}>
                      <div className={styles.matrixCategory}>Value</div>
                      <div className={styles.matrixBarContainer}>
                        <div className={styles.matrixBarFill} style={{width: `${reviewScores[2]}%`}}></div>
                      </div>
                      <div className={styles.matrixScore}>{reviewScores[2].toFixed(1)}%</div>
                      <div className={styles.matrixTags}>
                        <span className={styles.posTag}>+ Worth it</span>
                        <span className={styles.posTag}>+ Affordable</span>
                      </div>
                    </div>

                    <div className={styles.insightBox}>
                      <div className={styles.insightHeader}>
                        <span className={styles.insightIcon}>💡</span>
                        Key Insight
                      </div>
                      <p className={styles.insightText}>
                        ユーザーは機能性を高く評価しているが、初期設定の複雑さが導入障壁となっている。
                        オンボーディング体験の改善により、満足度の大幅な向上が見込まれる。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CoreTechSection