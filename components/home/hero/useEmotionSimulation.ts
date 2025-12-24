import { useState, useEffect } from 'react'
import type { EmotionData } from '@/types'

export const useEmotionSimulation = () => {
    const [emotionData, setEmotionData] = useState<EmotionData>({
        joy: 85,
        surprise: 72,
        excitement: 90,
        creativity: 78,
        empathy: 65
    })

    useEffect(() => {
        // 感情データのリアルタイム変動シミュレーション
        const interval = setInterval(() => {
            setEmotionData(prev => ({
                joy: Math.max(60, Math.min(95, prev.joy + (Math.random() - 0.5) * 5)),
                surprise: Math.max(60, Math.min(95, prev.surprise + (Math.random() - 0.5) * 5)),
                excitement: Math.max(60, Math.min(95, prev.excitement + (Math.random() - 0.5) * 5)),
                creativity: Math.max(60, Math.min(95, prev.creativity + (Math.random() - 0.5) * 5)),
                empathy: Math.max(60, Math.min(95, prev.empathy + (Math.random() - 0.5) * 5))
            }))
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return emotionData
}
