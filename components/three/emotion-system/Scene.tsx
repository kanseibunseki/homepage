import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { EMOTION_CONFIG } from '../constants/emotionConfig'
import { TextureAtlasGenerator } from '../utils/textureAtlasGenerator'
import { EmotionParticles } from './EmotionParticles'

/**
 * シーンコンポーネント
 */
export function Scene() {
    const [texture, setTexture] = useState<THREE.Texture | null>(null)
    const groupRef = useRef<THREE.Group>(null)
    const isFormingHeart = useRef(false)

    // テクスチャアトラスの生成
    useEffect(() => {
        const atlasGenerator = new TextureAtlasGenerator()

        atlasGenerator.generate(
            EMOTION_CONFIG.emotions,
            EMOTION_CONFIG.atlas
        ).then(({ texture }) => {
            setTexture(texture)
        }).catch((error) => {
            console.error('Failed to generate texture atlas:', error)
        })

        return () => {
            atlasGenerator.dispose()
        }
    }, [])

    // グループの回転（ハート形成中は停止）
    useFrame((state, delta) => {
        if (groupRef.current && !isFormingHeart.current) {
            groupRef.current.rotation.y += EMOTION_CONFIG.animation.rotationSpeed
        }
    })

    if (!texture) {
        return null // テクスチャ読み込み中
    }

    return (
        <group ref={groupRef}>
            <EmotionParticles
                texture={texture}
                onHeartFormationChange={(forming: boolean) => {
                    isFormingHeart.current = forming
                }}
            />
        </group>
    )
}
