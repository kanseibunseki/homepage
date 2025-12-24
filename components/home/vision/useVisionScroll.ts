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

        // Layout caching variables
        let sectionTop = 0
        let sectionHeight = 0
        let windowHeight = 0

        const updateLayout = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                // Cache absolute top position considering current scroll
                sectionTop = rect.top + window.pageYOffset
                sectionHeight = rect.height
                windowHeight = window.innerHeight
                // Recalculate progress immediately on resize
                handleScroll()
            }
        }

        // Optimized scroll handler using cached values
        const handleScroll = () => {
            if (!sectionRef.current) return

            // Calculate current relative position using scrollY
            // rect.top is effectively (sectionTop - scrollY)
            const currentRectTop = sectionTop - window.pageYOffset

            const progress = Math.max(0, Math.min(1, (windowHeight - currentRectTop) / (windowHeight + sectionHeight)))
            setScrollProgress(progress)
        }

        // Initial layout calculation
        updateLayout()

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', updateLayout)

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', updateLayout)
        }
    }, [])

    return { sectionRef, isVisible, scrollProgress }
}
