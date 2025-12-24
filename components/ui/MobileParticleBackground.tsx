'use client'

import { useEffect, useState } from 'react'
import styles from './MobileParticleBackground.module.css'

interface BokehParticle {
    id: number
    left: number
    size: number
    duration: number
    delay: number
    iconPath: string
    depth: number
}

const ICONS = [
    '/img/logo/heart.png',
    '/img/logo/kirakira.png',
    '/img/logo/onpu.png',
    '/img/logo/denkyu.png',
    '/img/logo/good.png'
]

export const MobileParticleBackground = () => {
    const [particles, setParticles] = useState<BokehParticle[]>([])

    useEffect(() => {
        const newParticles: BokehParticle[] = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: 50 + (Math.random() * 60), // 50px - 110px
            duration: 12 + (Math.random() * 18), // 12s - 30s
            delay: Math.random() * -30,
            iconPath: ICONS[i % ICONS.length],
            depth: Math.random() // 0(手前) - 1(奥)
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className={styles.container}>
            {/* フィルムノイズ */}
            <div className={styles.filmGrain} />

            {particles.map((p) => (
                <div
                    key={p.id}
                    className={styles.particleWrapper}
                    style={{
                        left: `${p.left}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        zIndex: Math.floor((1 - p.depth) * 10),
                        // 奥にあるほど小さく、移動を遅く見せる視差効果
                        transform: `scale(${0.8 + (1 - p.depth) * 0.4})`
                    }}
                >
                    {/* レイヤー1: メイン像 (不透明度高) */}
                    <img
                        src={p.iconPath}
                        alt=""
                        className={`${styles.iconLayer} ${styles.mainLayer}`}
                    />

                    {/* レイヤー2: ゴースト像 (左下にずらす・不透明度低) */}
                    <img
                        src={p.iconPath}
                        alt=""
                        className={`${styles.iconLayer} ${styles.ghostLayer}`}
                    />
                </div>
            ))}
        </div>
    )
}
