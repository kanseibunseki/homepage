import styles from '../ScrollAnimationSection.module.css'

interface Frame2CardsProps {
    card1X: number
    card2X: number
    card3Scale: number
}

export const Frame2Cards = ({ card1X, card2X, card3Scale }: Frame2CardsProps) => {
    return (
        <div className={styles.frame2}>
            <div
                className={styles.card1}
                style={{ transform: `translateX(${card1X}px)` }}
            >
                <div className={styles.cardContent}>
                    <h3>Performance</h3>
                    <p>軽量で高速な実装</p>
                </div>
            </div>

            <div
                className={styles.card2}
                style={{ transform: `translateX(${card2X}px)` }}
            >
                <div className={styles.cardContent}>
                    <h3>Accessibility</h3>
                    <p>アクセシブルなHTML</p>
                </div>
            </div>

            <div
                className={styles.card3}
                style={{ transform: `scale(${card3Scale})` }}
            >
                <div className={styles.cardContent}>
                    <h3>Simplicity</h3>
                    <p>シンプルな実装</p>
                </div>
            </div>
        </div>
    )
}
