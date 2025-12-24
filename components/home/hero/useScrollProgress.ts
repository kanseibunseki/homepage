import { useState, useEffect, useRef } from 'react'

export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [documentHeight, setDocumentHeight] = useState('100vh')
    const animationFrameRef = useRef<number | null>(null)
    const lastScrollProgressRef = useRef(0)

    useEffect(() => {
        // ドキュメント高さの計算
        const updateDocumentHeight = () => {
            const docHeight = document.documentElement.scrollHeight
            setDocumentHeight(`${docHeight}px`)
        }
        updateDocumentHeight()

        // スクロール位置の監視（requestAnimationFrameで最適化）
        const handleScroll = () => {
            // 既存のアニメーションフレームをキャンセル
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }

            // 新しいアニメーションフレームをリクエスト
            animationFrameRef.current = requestAnimationFrame(() => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
                const scrolled = (winScroll / height) * 100

                // 値が変わった時のみ更新（無駄な再レンダリング防止）
                if (Math.abs(scrolled - lastScrollProgressRef.current) > 0.1) {
                    setScrollProgress(scrolled)
                    lastScrollProgressRef.current = scrolled
                }
            })
        }

        // リサイズ時にドキュメント高さを再計算
        const handleResize = () => {
            updateDocumentHeight()
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleResize)

        // MutationObserverでコンテンツの変更を監視
        const observer = new MutationObserver(() => {
            updateDocumentHeight()
        })
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
            observer.disconnect()
        }
    }, [])

    return { scrollProgress, documentHeight }
}
