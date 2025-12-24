import * as THREE from 'three'

export const createHeartPositions = (totalParticleCount: number, side: 'left' | 'right' = 'right') => {
    const heartPos = new Float32Array(totalParticleCount * 3)

    // ハートシェイプの生成（正しい向き）
    const shape = new THREE.Shape()
    shape.moveTo(2.5, -2.5)
    shape.bezierCurveTo(2.5, -2.5, 2, 0, 0, 0)
    shape.bezierCurveTo(-3, 0, -3, -3.5, -3, -3.5)
    shape.bezierCurveTo(-3, -5.5, -1.5, -7.7, 2.5, -9.5)
    shape.bezierCurveTo(6, -7.7, 8, -5.5, 8, -3.5)
    shape.bezierCurveTo(8, -3.5, 8, 0, 5, 0)
    shape.bezierCurveTo(3.5, 0, 2.5, -2.5, 2.5, -2.5)

    const extrudeSettings = {
        depth: 2,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.scale(2, 2, 2)
    geometry.center()

    // 左右で回転方向を変える
    if (side === 'left') {
        geometry.rotateY(Math.PI / 6)  // 左向きに回転
    } else {
        geometry.rotateY(-Math.PI / 6)  // 右向きに回転
    }

    // サーフェスサンプリング
    const positionAttribute = geometry.getAttribute('position')
    const vertices = positionAttribute.array
    const vertexCount = vertices.length / 3

    // X座標のオフセット（左:-100, 右:+100）
    const xOffset = side === 'left' ? -100 : 100

    for (let i = 0; i < totalParticleCount; i++) {
        // ランダムに頂点を選択
        const idx = Math.floor(Math.random() * vertexCount) * 3

        // スケールと位置調整
        heartPos[i * 3] = vertices[idx] * 15 + xOffset      // X: 左右に配置
        heartPos[i * 3 + 1] = vertices[idx + 1] * 15        // Y
        heartPos[i * 3 + 2] = vertices[idx + 2] * 15        // Z
    }

    return heartPos
}
