import styles from '../VisionSection.module.css'

interface VisionContentProps {
    isVisible: boolean
}

export const VisionContent = ({ isVisible }: VisionContentProps) => {
    return (
        <div className={`${styles.content} ${isVisible ? styles.contentVisible : ''}`}>
            {/* タイトル部分 */}
            <div className={styles.titleWrapper}>
                <h1 className={styles.mainTitle}>OUR VISION</h1>
                <h2 className={styles.subTitle}>感性が価値になる社会へ</h2>
                <div className={styles.titleDecoration}>
                    <span className={styles.decorLine}></span>
                    <span className={styles.decorDot}></span>
                    <span className={styles.decorLine}></span>
                </div>
            </div>

            {/* 3つのブロックをコンテナで囲む */}
            <div className={styles.blocksContainer}>
                {/* ブロック1: テクノロジーと感性 */}
                <div className={styles.block1} id="vision-block-1">
                    <div className={styles.paragraph}>
                        <div className={styles.paragraphInner}>
                            <span className={styles.paragraphIcon}>
                                <img src="/img/logo/kirakirasmall.png" alt="" />
                            </span>
                            <p>
                                私たちが目指すのは、テクノロジーが人の心を置き去りにする未来ではありません。
                                <br /><br />
                                むしろ、テクノロジーによって、これまで可視化できなかった一人ひとりの「感性」が尊重され、
                                新しい価値を生み出す社会です。
                            </p>
                        </div>
                    </div>
                    <div className={styles.blockDivider}></div>
                </div>

                {/* ブロック2: データと心 */}
                <div className={styles.block2} id="vision-block-2">
                    <div className={styles.paragraph}>
                        <div className={styles.paragraphInner}>
                            <span className={styles.paragraphIcon}>
                                <img src="/img/logo/heart.png" alt="" />
                            </span>
                            <p>
                                SNSの投稿、商品のレビュー、日々の会話。
                                <br />
                                その言葉の奥に眠る、測定できないはずの「心」。
                                <br /><br />
                                私たちはその膨大なデータを、単なる数字の羅列としてではなく、
                                人々の感情の集合体として捉えます。
                            </p>
                        </div>
                    </div>
                    <div className={styles.blockDivider}></div>
                </div>

                {/* ブロック3: 左下に配置（タイトルなし） */}
                <div className={styles.block3}>
                    <div className={styles.paragraphLeft}>
                        <div className={styles.paragraphInnerLeft}>
                            <span className={styles.paragraphIcon}>
                                <img src="/img/logo/denkyu.png" alt="" />
                            </span>
                            <p>
                                データと感性が交差する点に、
                                <br />
                                ビジネスの革新と、より豊かなコミュニケーションの未来が生まれる。
                                <br /><br />
                                私たちはそう信じて、AIに「ココロ」を実装していきます。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
