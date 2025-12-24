import { useState, useEffect } from 'react'
import styles from '../ScrollAnimationSection.module.css'

interface Frame4MessageProps {
    opacity: number
    scale: number
    particlesOpacity: number
}

export const Frame4Message = ({ opacity, scale, particlesOpacity }: Frame4MessageProps) => {
    // 粒子の位置を管理（Hydrationエラー対策）
    const [particles, setParticles] = useState<Array<{ left: number, top: number, delay: number }>>([])

    // クライアントサイドでのみ粒子の位置を生成
    useEffect(() => {
        const particleData = Array.from({ length: 20 }, () => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 3
        }))
        setParticles(particleData)
    }, [])

    return (
        <div
            className={styles.frame4}
            style={{ opacity }}
        >
            {/* 装飾的な粒子 */}
            <div className={styles.particles} style={{ opacity: particlesOpacity }}>
                {particles.map((particle, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animationDelay: `${particle.delay}s`
                        }}
                    />
                ))}
            </div>

            <div
                className={styles.finalMessage}
                style={{ transform: `scale(${scale})` }}
            >
                <h2>完成！</h2>
                <p>これがCanvasを使わないスクロールアニメーションです</p>
                <div className={styles.ctaButton}>
                    もっと見る
                </div>
            </div>
        </div>
    )
}
