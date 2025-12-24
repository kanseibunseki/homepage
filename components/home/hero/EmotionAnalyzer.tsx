import styles from '../HeroSection.module.css'

export const EmotionAnalyzer = () => {
    return (
        <div className={styles.emotionAnalyzer}>
            <div className={styles.analyzerRing}>
                <div className={styles.analyzerIcon} data-emotion="joy">
                    <img src="/img/logo/lol.png" alt="" />
                </div>
                <div className={styles.analyzerIcon} data-emotion="love">
                    <img src="/img/logo/heartarrow.png" alt="" />
                </div>
                <div className={styles.analyzerIcon} data-emotion="surprise">
                    <img src="/img/logo/exclamation.png" alt="" />
                </div>
                <div className={styles.analyzerIcon} data-emotion="think">
                    <img src="/img/logo/oh.png" alt="" />
                </div>
            </div>
        </div>
    )
}
