'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './CoreTechSection.module.css'

import { NeuralNode } from './core-tech/types'
import { chatMessages } from './core-tech/constants'
import { InterviewAgent } from './core-tech/InterviewAgent'
import { SnsAgent } from './core-tech/SnsAgent'
import { ReviewAgent } from './core-tech/ReviewAgent'

const CoreTechSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [neuralNodes, setNeuralNodes] = useState<NeuralNode[]>([])
  const [pulseAnimation, setPulseAnimation] = useState(0)
  const [typingIndex, setTypingIndex] = useState(0)
  const [sentimentValue, setSentimentValue] = useState(0)
  const [snsMetrics, setSnsMetrics] = useState({ valence: 65.4, arousal: 42.8, dominance: 78.2 })
  const [metricsHistory, setMetricsHistory] = useState<Array<{ valence: number, arousal: number, dominance: number }>>([])
  const [reviewScores, setReviewScores] = useState([85, 70, 90, 65, 88])

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
          connections.push(...Array.from(uniqueTargets))
        }

        nodes.push({ id: nodeId++, x, y, connections })
      }
    }
    setNeuralNodes(nodes)

    // メトリクス計算ロジック（時間ベース）
    const calculateMetrics = (t: number) => {
      // 異なる周波数と位相で3つの波を作る
      // ランダム要素も時間ベースのノイズ（疑似的）にして連続性を保つ
      const noise1 = Math.sin(t * 2.5) * 5 + Math.cos(t * 7.1) * 3
      const noise2 = Math.sin(t * 3.2 + 1) * 5 + Math.cos(t * 5.5) * 3
      const noise3 = Math.sin(t * 1.8 + 2) * 5 + Math.cos(t * 8.3) * 3

      return {
        valence: Math.min(100, Math.max(0, 50 + Math.sin(t * 0.4) * 30 + noise1)),
        arousal: Math.min(100, Math.max(0, 50 + Math.sin(t * 0.7 + 2.0) * 30 + noise2)),
        dominance: Math.min(100, Math.max(0, 50 + Math.sin(t * 0.3 + 4.0) * 30 + noise3))
      }
    }

    // 初期データ生成（過去の時間に遡って計算し、連続性を担保）
    const now = Date.now() / 1000
    const initialHistory = Array(40).fill(0).map((_, i) => {
      // 40個前（左端）から現在（右端）に向かって生成
      const t = now - (39 - i) * 0.2
      return calculateMetrics(t)
    })
    setMetricsHistory(initialHistory)

    // Webサイト表示時の初期値を最新の履歴データに合わせる
    setSnsMetrics(initialHistory[39])

    // アニメーションループ (200msごとに更新)
    const interval = setInterval(() => {
      const currentTime = Date.now() / 1000

      setPulseAnimation(prev => (prev + 1) % 100)
      setSentimentValue(prev => Math.sin(currentTime) * 50 + 50)

      const newMetrics = calculateMetrics(currentTime)
      setSnsMetrics(newMetrics)

      setMetricsHistory(history => {
        const newHistory = [...history, newMetrics]
        if (newHistory.length > 40) newHistory.shift()
        return newHistory
      })

      setReviewScores(prev => prev.map(score =>
        Math.max(0, Math.min(100, score + (Math.random() - 0.5) * 2))
      ))
    }, 200)

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
          <InterviewAgent
            isVisible={isVisible}
            neuralNodes={neuralNodes}
            pulseAnimation={pulseAnimation}
          />

          {/* SNS Agent */}
          <SnsAgent
            isVisible={isVisible}
            snsMetrics={snsMetrics}
            metricsHistory={metricsHistory}
          />

          {/* Review Agent */}
          <ReviewAgent
            isVisible={isVisible}
            reviewScores={reviewScores}
          />

        </div>
      </div>
    </section>
  )
}

export default CoreTechSection