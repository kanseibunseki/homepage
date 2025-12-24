import styles from '../ScrollAnimationSection.module.css'

interface Frame3ImagesProps {
    image1Opacity: number
    image2Opacity: number
    text1Y: number
    text2Y: number
}

export const Frame3Images = ({ image1Opacity, image2Opacity, text1Y, text2Y }: Frame3ImagesProps) => {
    return (
        <div className={styles.frame3}>
            <div className={styles.imageTextPair}>
                <div
                    className={styles.imageBox}
                    style={{ opacity: image1Opacity }}
                >
                    <div className={styles.imagePlaceholder}>
                        <span>IMAGE 1</span>
                    </div>
                </div>
                <div
                    className={styles.textBox}
                    style={{
                        opacity: image1Opacity,
                        transform: `translateY(${text1Y}px)`
                    }}
                >
                    <h3>スムーズな遷移</h3>
                    <p>スクロールに合わせて要素が自然に変化します。</p>
                </div>
            </div>

            <div className={styles.imageTextPair}>
                <div
                    className={styles.textBox}
                    style={{
                        opacity: image2Opacity,
                        transform: `translateY(${text2Y}px)`
                    }}
                >
                    <h3>パララックス効果</h3>
                    <p>異なる速度で動く要素が奥行きを演出します。</p>
                </div>
                <div
                    className={styles.imageBox}
                    style={{ opacity: image2Opacity }}
                >
                    <div className={styles.imagePlaceholder}>
                        <span>IMAGE 2</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
