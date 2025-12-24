import { useState, useEffect } from 'react'

export interface Particle {
    id: number
    left: number
    top: number
    delay: number
    duration: number
}

export const useVisionParticles = () => {
    const [particles, setParticles] = useState<Particle[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // クライアントサイドでのみパーティクルを生成
        setMounted(true)
        const newParticles: Particle[] = []
        for (let i = 0; i < 20; i++) {
            newParticles.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                delay: Math.random() * 10,
                duration: 15 + Math.random() * 10
            })
        }
        setParticles(newParticles)
    }, [])

    return { particles, mounted }
}
