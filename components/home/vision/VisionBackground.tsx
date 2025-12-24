import styles from '../VisionSection.module.css'
import { Particle } from './useVisionParticles'

interface VisionBackgroundProps {
    particles: Particle[]
    mounted: boolean
}

export const VisionBackground = ({ particles, mounted }: VisionBackgroundProps) => {
    return (
        <>
            {/* 背景のパーティクル効果 */}
            <div className={styles.particleBackground}>
                {mounted && particles.map((particle) => (
                    <div
                        key={particle.id}
                        className={styles.particle}
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`
                        }}
                    />
                ))}
            </div>

            {/* 光のグリッドパターン */}
            <div className={styles.gridPattern}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(138, 43, 226, 0.1)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
        </>
    )
}
