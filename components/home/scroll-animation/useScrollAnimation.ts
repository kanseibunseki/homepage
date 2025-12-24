import { useState, useEffect } from 'react'

export const useScrollAnimation = (scrollProgress: number, isInView: boolean) => {
    // フレーム1の状態
    const [frame1Opacity, setFrame1Opacity] = useState(0)
    const [frame1Y, setFrame1Y] = useState(100)

    // フレーム2の状態
    const [card1X, setCard1X] = useState(-100)
    const [card2X, setCard2X] = useState(100)
    const [card3Scale, setCard3Scale] = useState(0)

    // フレーム3の状態
    const [image1Opacity, setImage1Opacity] = useState(0)
    const [image2Opacity, setImage2Opacity] = useState(0)
    const [text1Y, setText1Y] = useState(50)
    const [text2Y, setText2Y] = useState(50)

    // フレーム4の状態
    const [finalMessageOpacity, setFinalMessageOpacity] = useState(0)
    const [finalMessageScale, setFinalMessageScale] = useState(0.5)
    const [particlesOpacity, setParticlesOpacity] = useState(0)

    useEffect(() => {
        // アニメーション制御（isInViewがtrueの場合のみ）
        if (!isInView) return

        // フレーム1（0-25%）
        if (scrollProgress <= 0.25) {
            const progress = scrollProgress * 4 // 0-1に正規化
            setFrame1Opacity(progress)
            setFrame1Y(100 - progress * 100)

            // 他のフレームをリセット
            setCard1X(-100)
            setCard2X(100)
            setCard3Scale(0)
        }

        // フレーム2（25-50%）
        if (scrollProgress > 0.25 && scrollProgress <= 0.5) {
            const progress = (scrollProgress - 0.25) * 4
            setFrame1Opacity(1 - progress) // フレーム1をフェードアウト

            setCard1X(-100 + progress * 100)
            setCard2X(100 - progress * 100)
            setCard3Scale(progress)

            // フレーム3をリセット
            setImage1Opacity(0)
            setImage2Opacity(0)
        }

        // フレーム3（50-75%）
        if (scrollProgress > 0.5 && scrollProgress <= 0.75) {
            const progress = (scrollProgress - 0.5) * 4

            // フレーム2をフェードアウト
            setCard3Scale(1 - progress * 0.5)

            // パララックス効果で画像とテキストを表示
            setImage1Opacity(Math.min(progress * 2, 1))
            setImage2Opacity(Math.max(0, (progress - 0.3) * 2))
            setText1Y(50 - progress * 50)
            setText2Y(50 - (progress - 0.3) * 50)

            // フレーム4をリセット
            setFinalMessageOpacity(0)
            setFinalMessageScale(0.5)
        }

        // フレーム4（75-100%）
        if (scrollProgress > 0.75) {
            const progress = (scrollProgress - 0.75) * 4

            // フレーム3をフェードアウト
            setImage1Opacity(1 - progress)
            setImage2Opacity(1 - progress)

            // 最終メッセージを表示
            setFinalMessageOpacity(progress)
            setFinalMessageScale(0.5 + progress * 0.5)
            setParticlesOpacity(progress * 0.5)
        }
    }, [scrollProgress, isInView])

    return {
        frame1Opacity,
        frame1Y,
        card1X,
        card2X,
        card3Scale,
        image1Opacity,
        image2Opacity,
        text1Y,
        text2Y,
        finalMessageOpacity,
        finalMessageScale,
        particlesOpacity
    }
}
