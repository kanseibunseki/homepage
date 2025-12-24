import { useState, useEffect, useRef } from 'react'

export const useSectionScroll = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return

            const rect = sectionRef.current.getBoundingClientRect()
            const sectionHeight = sectionRef.current.offsetHeight
            const windowHeight = window.innerHeight

            // セクションが画面に入っているかチェック
            const sectionTop = rect.top
            const sectionBottom = rect.bottom

            // セクションが画面内にある場合のみ固定ビューポートを表示
            if (sectionTop < windowHeight && sectionBottom > 0) {
                setIsInView(true)
                // セクションが画面に入ってからの進行度を計算（0-1）
                const scrollIntoView = Math.max(0, -rect.top)
                const scrollThroughSection = Math.min(scrollIntoView / (sectionHeight - windowHeight), 1)
                setScrollProgress(scrollThroughSection)
            } else {
                setIsInView(false)
                setScrollProgress(0)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // 初期状態を設定

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return { sectionRef, scrollProgress, isInView }
}
