'use client'

import { useEffect, useState } from 'react'
import styles from './GlobalDataStream.module.css'

export default function GlobalDataStream() {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    // 1秒遅延後に表示
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className={styles.dataStreamContainer}>
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className={`${styles.streamLine} ${visible ? styles.streamLineActive : ''}`} 
          style={{ 
            left: `${i * 3.3}%`,
            animationDelay: visible ? `${i * 0.15}s` : undefined
          }}
        />
      ))}
    </div>
  )
}