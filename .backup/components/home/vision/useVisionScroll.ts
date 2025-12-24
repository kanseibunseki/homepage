import { useState, useEffect, useRef } from 'react'

export const useVisionScroll = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

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

        // パララックススクロール効果
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                const windowHeight = window.innerHeight
                const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))
                setScrollProgress(progress)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return { sectionRef, isVisible, scrollProgress }
}
