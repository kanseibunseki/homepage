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

    // パルスアニメーションのループ
    const pulseInterval = setInterval(() => {
      setPulseAnimation(prev => (prev + 1) % 100)
    }, 50)

    return () => clearInterval(pulseInterval)
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
      {/* ニューラルネットワーク背景 */}
      <div className={styles.neuralNetwork}>
        <svg className={styles.neuralSvg}>
          {/* コネクション描画 */}
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
                  className={styles.neuralConnection}
                  style={{
                    opacity: pulseAnimation > node.id * 5 && pulseAnimation < node.id * 5 + 30 ? 1 : 0.2
                  }}
                />
              )
            })
          )}
          {/* ノード描画 */}
          {neuralNodes.map(node => (
            <circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              className={styles.neuralNode}
              style={{
                animation: `${styles.nodePulse} 3s ease-in-out ${node.id * 0.1}s infinite`
              }}
            />
          ))}
        </svg>
      </div>

      {/* ホログラフィックグリッド */}
      <div className={styles.holographicGrid}>
        <div className={styles.gridLines} />
      </div>

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

        {/* エージェントカード */}
        <div className={`${styles.agentsGrid} ${isVisible ? styles.agentsVisible : ''}`}>
          {/* Interview Agent カード */}
          <div className={styles.agentCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <div className={styles.iconCube}>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                </div>
              </div>
              <h3 className={styles.agentName}>
                Interview Agent
              </h3>
              <p className={styles.agentDescription}>
                AIによる深層心理の探求者
              </p>
              <p className={styles.agentDetail}>
                AIが、生身のインタビュアーのように、ユーザーとの対話から本音のさらに奥にある無意識のインサイトを抽出。
                発話の一つひとつが、リアルタイムで構造化され、感性の地図を描き出します。
              </p>
              
              {/* インタビューデータビジュアル */}
              <div className={styles.interviewVisual}>
                <div className={styles.chatLog}>
                  <div className={styles.chatEntry}>
                    <span className={styles.chatLabel}>User:</span>
                    <span className={styles.chatText}>「デザインは良いですね」</span>
                  </div>
                  <div className={styles.analysisBox}>
                    <div className={styles.sentimentBar}>
                      <span>Sentiment: Positive</span>
                      <div className={styles.barContainer}>
                        <div className={styles.barFill} style={{width: '80%', background: '#00ff88'}}></div>
                      </div>
                      <span>0.8</span>
                    </div>
                    <div className={styles.tags}>
                      <span className={styles.tag}>デザイン</span>
                      <span className={styles.emotionTag}>好意</span>
                    </div>
                  </div>
                  <div className={styles.chatEntry}>
                    <span className={styles.chatLabel}>User:</span>
                    <span className={styles.chatText}>「でも、少し重いかな...」</span>
                  </div>
                  <div className={styles.analysisBox}>
                    <div className={styles.sentimentBar}>
                      <span>Sentiment: Negative</span>
                      <div className={styles.barContainer}>
                        <div className={styles.barFill} style={{width: '60%', background: '#ff6600'}}></div>
                      </div>
                      <span>0.6</span>
                    </div>
                    <div className={styles.tags}>
                      <span className={styles.tag}>重い</span>
                      <span className={styles.tag}>起動</span>
                      <span className={styles.emotionTag}>不満</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardGlow} />
          </div>

          {/* SNS Agent カード */}
          <div className={styles.agentCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <div className={styles.iconCube}>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                </div>
              </div>
              <h3 className={styles.agentName}>
                SNS Agent
              </h3>
              <p className={styles.agentDescription}>
                雑音から真意を掴む分析官
              </p>
              <p className={styles.agentDetail}>
                ポジティブか、ネガティブか。そんな表層的な分析では意味がない。
                私たちのエージェントは、SNSの膨大なノイズの中から、感情の根本原因を特定。
              </p>
              
              {/* SNSデータビジュアル */}
              <div className={styles.snsVisual}>
                <div className={styles.statsGrid}>
                  <div className={styles.statBox}>
                    <div className={styles.statValue}>1,280</div>
                    <div className={styles.statLabel}>Positive Mentions</div>
                  </div>
                  <div className={styles.statBox}>
                    <div className={styles.statValue} style={{color: '#ff6600'}}>+35%</div>
                    <div className={styles.statLabel}>Negative Spike</div>
                    <div className={styles.statSub}>vs Yesterday</div>
                  </div>
                </div>
                <div className={styles.trendChart}>
                  <div className={styles.chartTitle}>Weekly Sentiment Trend</div>
                  <svg className={styles.chartSvg} viewBox="0 0 300 100">
                    <polyline
                      points="0,70 50,60 100,65 150,40 200,45 250,30 300,35"
                      fill="none"
                      stroke="#00ffcc"
                      strokeWidth="2"
                    />
                    <polyline
                      points="0,70 50,60 100,65 150,40 200,45 250,30 300,35"
                      fill="url(#trendGradient)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00ffcc" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.cardGlow} />
          </div>

          {/* Review Agent カード */}
          <div className={styles.agentCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <div className={styles.iconCube}>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                  <div className={styles.cubeFace}></div>
                </div>
              </div>
              <h3 className={styles.agentName}>
                Review Agent
              </h3>
              <p className={styles.agentDescription}>
                無数の声から価値を再構築する建築家
              </p>
              <p className={styles.agentDetail}>
                Webに散らばる無数のレビュー。それは不満と満足の混沌。
                エージェントは、その一つひとつの声を構造的に解析し、製品やサービスが持つべき「真の価値構造」を可視化します。
              </p>
              
              {/* レビューデータビジュアル */}
              <div className={styles.reviewVisual}>
                <div className={styles.productMatrix}>
                  <div className={styles.matrixHeader}>Product A</div>
                  <div className={styles.matrixRow}>
                    <span className={styles.matrixLabel}>Design</span>
                    <div className={styles.matrixBar}>
                      <div className={styles.matrixFill} style={{width: '85%'}}></div>
                    </div>
                    <span className={styles.matrixTags}>
                      <span className={styles.posTag}>+ Sleek</span>
                    </span>
                  </div>
                  <div className={styles.matrixRow}>
                    <span className={styles.matrixLabel}>Performance</span>
                    <div className={styles.matrixBar}>
                      <div className={styles.matrixFill} style={{width: '70%'}}></div>
                    </div>
                    <span className={styles.matrixTags}>
                      <span className={styles.posTag}>+ Fast</span>
                      <span className={styles.negTag}>- Battery</span>
                    </span>
                  </div>
                  <div className={styles.matrixRow}>
                    <span className={styles.matrixLabel}>Price</span>
                    <div className={styles.matrixBar}>
                      <div className={styles.matrixFill} style={{width: '90%'}}></div>
                    </div>
                    <span className={styles.matrixTags}>
                      <span className={styles.posTag}>+ Affordable</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardGlow} />
          </div>
        </div>

        {/* テクノロジーインジケーター */}
        <div className={styles.techIndicators}>
          <div className={styles.indicator}>
            <div className={styles.indicatorBar}>
              <div className={styles.indicatorFill} style={{ width: '95%' }} />
            </div>
            <span className={styles.indicatorLabel}>精度</span>
            <span className={styles.indicatorValue}>95%</span>
          </div>
          <div className={styles.indicator}>
            <div className={styles.indicatorBar}>
              <div className={styles.indicatorFill} style={{ width: '88%' }} />
            </div>
            <span className={styles.indicatorLabel}>速度</span>
            <span className={styles.indicatorValue}>88%</span>
          </div>
          <div className={styles.indicator}>
            <div className={styles.indicatorBar}>
              <div className={styles.indicatorFill} style={{ width: '92%' }} />
            </div>
            <span className={styles.indicatorLabel}>深度</span>
            <span className={styles.indicatorValue}>92%</span>
          </div>
        </div>

        {/* 中央のコアビジュアル */}
        <div className={styles.coreVisual}>
          <div className={styles.coreContainer}>
            <div className={styles.coreSphere}>
              <div className={styles.sphereInner} />
              <div className={styles.sphereMiddle} />
              <div className={styles.sphereOuter} />
            </div>
            <div className={styles.coreParticles}>
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className={styles.coreParticle}
                  style={{
                    transform: `rotate(${i * 45}deg) translateX(100px)`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* データストリームエフェクト */}
      <div className={styles.dataStreams}>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className={styles.streamLine}
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default CoreTechSection