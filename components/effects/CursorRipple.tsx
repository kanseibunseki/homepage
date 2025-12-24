'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './CursorRipple.module.css'

export default function CursorRipple() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number | undefined>(undefined)
  const ripplesRef = useRef<Array<{
    x: number
    y: number
    radius: number
    maxRadius: number
    opacity: number
    speed: number
  }>>([])



  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return
    contextRef.current = context

    // キャンバスサイズ設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // マウス移動ハンドラー
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY }

      // マウス移動時に小さな波紋を生成
      if (Math.random() > 0.9) {
        ripplesRef.current.push({
          x: event.clientX,
          y: event.clientY,
          radius: 0,
          maxRadius: 30,
          opacity: 0.4,
          speed: 1
        })
      }
    }

    // クリックハンドラー
    const handleClick = (event: MouseEvent) => {
      // クリック時に大きな波紋を生成
      ripplesRef.current.push({
        x: event.clientX,
        y: event.clientY,
        radius: 0,
        maxRadius: 100,
        opacity: 0.6,
        speed: 2
      })
    }

    // アニメーションループ
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!contextRef.current || !canvasRef.current) return

      // キャンバスクリア
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      // カーソル位置に常に表示される波紋
      const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5
      contextRef.current.strokeStyle = `rgba(138, 43, 226, ${0.3 * pulse})`
      contextRef.current.lineWidth = 2
      contextRef.current.beginPath()
      contextRef.current.arc(mouseRef.current.x, mouseRef.current.y, 15 + pulse * 10, 0, Math.PI * 2)
      contextRef.current.stroke()

      // 拡大する波紋の更新と描画
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        ripple.radius += ripple.speed
        ripple.opacity *= 0.98

        if (ripple.opacity < 0.01) return false

        // 波紋を描画
        const gradient = contextRef.current!.createRadialGradient(
          ripple.x, ripple.y, 0,
          ripple.x, ripple.y, ripple.radius
        )
        gradient.addColorStop(0, `rgba(138, 43, 226, 0)`)
        gradient.addColorStop(0.7, `rgba(138, 43, 226, ${ripple.opacity * 0.5})`)
        gradient.addColorStop(0.9, `rgba(0, 255, 204, ${ripple.opacity})`)
        gradient.addColorStop(1, `rgba(0, 255, 204, 0)`)

        contextRef.current!.fillStyle = gradient
        contextRef.current!.beginPath()
        contextRef.current!.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        contextRef.current!.fill()

        // エッジの輝き
        contextRef.current!.strokeStyle = `rgba(0, 255, 204, ${ripple.opacity * 0.8})`
        contextRef.current!.lineWidth = 1
        contextRef.current!.beginPath()
        contextRef.current!.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        contextRef.current!.stroke()

        return ripple.radius < ripple.maxRadius
      })

      // 最大波紋数を制限
      if (ripplesRef.current.length > 20) {
        ripplesRef.current = ripplesRef.current.slice(-20)
      }
    }

    // アニメーション開始
    animate()

    // イベントリスナー登録
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    // クリーンアップ
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  if (isMobile) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={styles.rippleCanvas}
    />
  )
}