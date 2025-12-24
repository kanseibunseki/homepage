import styles from '../HeroSection.module.css'
import type { EmotionData } from '@/types'

interface EmotionRadarProps {
    emotionData: EmotionData
}

export const EmotionRadar = ({ emotionData }: EmotionRadarProps) => {
    return (
        <div className={styles.emotionRadar}>
            <div className={styles.radarContainer}>
                {/* スキャンライン */}
                <div className={styles.scanLine} />

                {/* 円形グリッド */}
                <svg className={styles.radarSvg} viewBox="0 0 300 300">
                    {/* 背景の円 */}
                    <circle cx="150" cy="150" r="140" className={styles.radarCircle} />
                    <circle cx="150" cy="150" r="105" className={styles.radarCircle} />
                    <circle cx="150" cy="150" r="70" className={styles.radarCircle} />
                    <circle cx="150" cy="150" r="35" className={styles.radarCircle} />

                    {/* 五角形のライン */}
                    <line x1="150" y1="10" x2="150" y2="290" className={styles.radarAxis} />
                    <line x1="10" y1="150" x2="290" y2="150" className={styles.radarAxis} />
                    <line x1="50" y1="50" x2="250" y2="250" className={styles.radarAxis} />
                    <line x1="250" y1="50" x2="50" y2="250" className={styles.radarAxis} />

                    {/* データポリゴン */}
                    <polygon
                        points={`
              ${150 + emotionData.joy * 1.4 * Math.cos(-Math.PI / 2)},${150 + emotionData.joy * 1.4 * Math.sin(-Math.PI / 2)}
              ${150 + emotionData.surprise * 1.4 * Math.cos(-Math.PI / 2 + 2 * Math.PI / 5)},${150 + emotionData.surprise * 1.4 * Math.sin(-Math.PI / 2 + 2 * Math.PI / 5)}
              ${150 + emotionData.excitement * 1.4 * Math.cos(-Math.PI / 2 + 4 * Math.PI / 5)},${150 + emotionData.excitement * 1.4 * Math.sin(-Math.PI / 2 + 4 * Math.PI / 5)}
              ${150 + emotionData.creativity * 1.4 * Math.cos(-Math.PI / 2 + 6 * Math.PI / 5)},${150 + emotionData.creativity * 1.4 * Math.sin(-Math.PI / 2 + 6 * Math.PI / 5)}
              ${150 + emotionData.empathy * 1.4 * Math.cos(-Math.PI / 2 + 8 * Math.PI / 5)},${150 + emotionData.empathy * 1.4 * Math.sin(-Math.PI / 2 + 8 * Math.PI / 5)}
            `}
                        className={styles.radarData}
                    />
                </svg>

                {/* 感情アイコン（円周上に配置） */}
                <div className={styles.radarIcons}>
                    <div className={styles.radarIcon} style={{ top: '0', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <img src="/img/logo/lol.png" alt="" />
                        <span className={styles.radarValue}>{Math.round(emotionData.joy)}</span>
                    </div>
                    <div className={styles.radarIcon} style={{ top: '30%', right: '5%', transform: 'translate(50%, -50%)' }}>
                        <img src="/img/logo/exclamation.png" alt="" />
                        <span className={styles.radarValue}>{Math.round(emotionData.surprise)}</span>
                    </div>
                    <div className={styles.radarIcon} style={{ bottom: '20%', right: '15%', transform: 'translate(50%, 50%)' }}>
                        <img src="/img/logo/fire.png" alt="" />
                        <span className={styles.radarValue}>{Math.round(emotionData.excitement)}</span>
                    </div>
                    <div className={styles.radarIcon} style={{ bottom: '20%', left: '15%', transform: 'translate(-50%, 50%)' }}>
                        <img src="/img/logo/denkyu.png" alt="" />
                        <span className={styles.radarValue}>{Math.round(emotionData.creativity)}</span>
                    </div>
                    <div className={styles.radarIcon} style={{ top: '30%', left: '5%', transform: 'translate(-50%, -50%)' }}>
                        <img src="/img/logo/heart.png" alt="" />
                        <span className={styles.radarValue}>{Math.round(emotionData.empathy)}</span>
                    </div>
                </div>

                {/* 中央のパルス */}
                <div className={styles.radarCenter}>
                    <div className={styles.radarPulse} />
                </div>
            </div>
        </div>
    )
}
