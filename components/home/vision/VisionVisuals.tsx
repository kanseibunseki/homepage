import styles from '../VisionSection.module.css'

interface VisionVisualsProps {
    isVisible: boolean
}

export const VisionVisuals = ({ isVisible }: VisionVisualsProps) => {
    return (
        <>
            {/* ビジュアル要素 */}
            <div className={styles.visualElements}>
                {/* 中央の光る球体 */}
                <div className={styles.centralOrb}>
                    <div className={styles.orbCore}></div>
                    <div className={styles.orbGlow}></div>
                    <div className={styles.orbPulse}></div>
                </div>

                {/* 周回する感情アイコン */}
                <div className={styles.orbitingIcons}>
                    <div className={styles.orbitIcon} style={{ animationDelay: '0s' }}>
                        <img src="/img/logo/lol.png" alt="" />
                    </div>
                    <div className={styles.orbitIcon} style={{ animationDelay: '2s' }}>
                        <img src="/img/logo/onpu.png" alt="" />
                    </div>
                    <div className={styles.orbitIcon} style={{ animationDelay: '4s' }}>
                        <img src="/img/logo/fire.png" alt="" />
                    </div>
                    <div className={styles.orbitIcon} style={{ animationDelay: '6s' }}>
                        <img src="/img/logo/good.png" alt="" />
                    </div>
                </div>
            </div>

            {/* データストリームビジュアライゼーション */}
            <div className={styles.dataStream}>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.streamLine}
                        style={{
                            animationDelay: `${i * 0.2}s`,
                            opacity: isVisible ? 1 : 0
                        }}
                    />
                ))}
            </div>
        </>
    )
}
