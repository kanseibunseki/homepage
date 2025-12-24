import { useEffect, MutableRefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

// GSAPプラグインの登録
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface UseEmotionScrollProps {
    meshRef: MutableRefObject<THREE.Points | null>
    onHeartFormationChange?: (forming: boolean) => void
    setVisibleCount: (count: number) => void
    baseParticleCount: number
    totalParticleCount: number
    morphProgressLeft: MutableRefObject<number>
    morphProgressRight: MutableRefObject<number>
    currentHeartSide: MutableRefObject<'left' | 'right' | null>
    isFormingHeart: MutableRefObject<boolean>
}

export const useEmotionScroll = ({
    meshRef,
    onHeartFormationChange,
    setVisibleCount,
    baseParticleCount,
    totalParticleCount,
    morphProgressLeft,
    morphProgressRight,
    currentHeartSide,
    isFormingHeart
}: UseEmotionScrollProps) => {
    useEffect(() => {
        if (typeof window === 'undefined' || !meshRef.current) return

        // ブロックの監視とハート形成
        const setupScrollTriggers = () => {
            // VisionSection全体（最初の右ハート）
            // IDセレクタを使用して確実に要素を取得
            const visionSection = document.getElementById('vision-section')

            if (!visionSection) {
                // 要素が見つからない場合は再試行（最大5回）
                const retryCount = parseInt(meshRef.current?.userData.retryCount || '0')
                if (retryCount < 5) {
                    console.log(`Vision section not found, retrying... (${retryCount + 1}/5)`)
                    if (meshRef.current) {
                        meshRef.current.userData.retryCount = (retryCount + 1).toString()
                    }
                    setTimeout(setupScrollTriggers, 500)
                }
                return
            }

            if (visionSection) {
                ScrollTrigger.create({
                    trigger: visionSection,
                    start: "top center",     // セクションの上端が画面中央
                    end: "top top",          // セクションの上端が画面上端
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        morphProgressRight.current = self.progress

                        if (self.progress > 0) {
                            currentHeartSide.current = 'right'
                            if (!isFormingHeart.current) {
                                console.log('Starting initial right heart formation (VisionSection)')
                                isFormingHeart.current = true
                                onHeartFormationChange?.(true)
                                setVisibleCount(totalParticleCount)
                            }
                        } else if (self.progress === 0 && isFormingHeart.current) {
                            // 上スクロールでトップに戻る時
                            console.log('Returning to top from VisionSection')
                            morphProgressRight.current = 0
                            morphProgressLeft.current = 0
                            isFormingHeart.current = false
                            currentHeartSide.current = null
                            onHeartFormationChange?.(false)
                            setVisibleCount(baseParticleCount)
                        }

                        // console.log(`VisionSection heart progress: ${(self.progress * 100).toFixed(1)}%`)
                    },
                    onLeave: () => {
                        // 下スクロールでセクションを離れる時
                        console.log('Leaving VisionSection (downward)')
                        // progressはそのまま維持（次のトリガーへスムーズに遷移）
                    },
                    onEnterBack: () => {
                        // 上スクロールで戻ってきた時
                        console.log('Entering back to VisionSection (upward)')
                        currentHeartSide.current = 'right'
                        morphProgressLeft.current = 0  // 左ハートをリセット
                        if (!isFormingHeart.current) {
                            isFormingHeart.current = true
                            onHeartFormationChange?.(true)
                            setVisibleCount(totalParticleCount)
                        }
                    },
                    onLeaveBack: () => {
                        // 上スクロールでトップに戻る時
                        console.log('Leaving VisionSection back to top')
                        morphProgressRight.current = 0
                        morphProgressLeft.current = 0
                        isFormingHeart.current = false
                        currentHeartSide.current = null
                        onHeartFormationChange?.(false)
                        setVisibleCount(baseParticleCount)
                    }
                })
            }

            // ブロック1（左ハート）
            const block1 = document.getElementById('vision-block-1')
            if (block1) {
                ScrollTrigger.create({
                    trigger: block1,
                    start: "center center",  // ブロック中央が画面中央
                    end: "bottom top",       // ブロック下部が画面上端
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        morphProgressLeft.current = self.progress
                        morphProgressRight.current = 1 - self.progress  // 右ハートは逆進行

                        if (self.progress > 0) {
                            currentHeartSide.current = 'left'
                            if (!isFormingHeart.current) {
                                console.log('Starting left heart formation')
                                isFormingHeart.current = true
                                onHeartFormationChange?.(true)
                                setVisibleCount(totalParticleCount)
                            }
                        }

                        // console.log(`Block1: Left=${(self.progress * 100).toFixed(1)}%, Right=${((1-self.progress) * 100).toFixed(1)}%`)
                    },
                    onLeave: () => {
                        // 下スクロールでblock2へ
                        console.log('Leaving Block1 (downward)')
                        // progressは維持
                    },
                    onEnterBack: () => {
                        // 上スクロールでblock2から戻る
                        console.log('Entering back to Block1 (upward)')
                        currentHeartSide.current = 'left'
                        if (!isFormingHeart.current) {
                            isFormingHeart.current = true
                            onHeartFormationChange?.(true)
                            setVisibleCount(totalParticleCount)
                        }
                    },
                    onLeaveBack: () => {
                        // 上スクロールでVisionSectionへ戻る
                        console.log('Leaving Block1 back to VisionSection')
                        morphProgressLeft.current = 0
                        morphProgressRight.current = 1  // 右ハートへ完全遷移
                        currentHeartSide.current = 'right'
                    }
                })
            }

            // ブロック2（右ハート）
            const block2 = document.getElementById('vision-block-2')
            if (block2) {
                ScrollTrigger.create({
                    trigger: block2,
                    start: "center center",  // ブロック中央が画面中央
                    end: "bottom top",       // ブロック下部が画面上端
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        morphProgressRight.current = self.progress
                        morphProgressLeft.current = 1 - self.progress  // 左ハートは逆進行

                        if (self.progress > 0) {
                            currentHeartSide.current = 'right'
                            if (!isFormingHeart.current) {
                                console.log('Starting second right heart formation')
                                isFormingHeart.current = true
                                onHeartFormationChange?.(true)
                                setVisibleCount(totalParticleCount)
                            }
                        }

                        // console.log(`Block2: Right=${(self.progress * 100).toFixed(1)}%, Left=${((1-self.progress) * 100).toFixed(1)}%`)
                    },
                    onEnterBack: () => {
                        // 上スクロールで下から戻る
                        console.log('Entering back to Block2 (upward)')
                        currentHeartSide.current = 'right'
                        if (!isFormingHeart.current) {
                            isFormingHeart.current = true
                            onHeartFormationChange?.(true)
                            setVisibleCount(totalParticleCount)
                        }
                    },
                    onLeaveBack: () => {
                        // 上スクロールでblock1へ戻る
                        console.log('Leaving Block2 back to Block1')
                        morphProgressRight.current = 0
                        morphProgressLeft.current = 1  // 左ハートへ完全遷移
                        currentHeartSide.current = 'left'
                    },
                    onLeave: () => {
                        // 下スクロールで完全に離れた時
                        console.log('Leaving Block2 completely')
                        // 最後のハート状態を維持または通常状態へ
                        setTimeout(() => {
                            morphProgressLeft.current = 0
                            morphProgressRight.current = 0
                            isFormingHeart.current = false
                            currentHeartSide.current = null
                            onHeartFormationChange?.(false)
                            setVisibleCount(baseParticleCount)
                        }, 1000)
                    }
                })
            }
        }

        // DOM読み込み後に実行
        const timer = setTimeout(setupScrollTriggers, 1000)

        return () => {
            clearTimeout(timer)
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [baseParticleCount, totalParticleCount, meshRef, onHeartFormationChange, setVisibleCount, morphProgressLeft, morphProgressRight, currentHeartSide, isFormingHeart])
}
