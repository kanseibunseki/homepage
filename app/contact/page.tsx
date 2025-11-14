'use client'

import { useState, FormEvent } from 'react'
import styles from './contact.module.css'

type Status = 'idle' | 'loading' | 'success' | 'error'

type FormData = {
  company: string
  name: string
  tel: string
  email: string
  message: string
}

type FormErrors = {
  company?: string
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    name: '',
    tel: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FormErrors>({})

  const emotionIcons = [
    { id: 1, icon: 'heart', top: '8%', left: '10%', size: 70 },
    { id: 2, icon: 'kirakira', top: '20%', left: '88%', size: 75 },
    { id: 3, icon: 'good', top: '45%', left: '6%', size: 80 },
    { id: 4, icon: 'denkyu', top: '65%', left: '92%', size: 70 },
    { id: 5, icon: 'lol', top: '80%', left: '12%', size: 65 },
  ]

  // バリデーション関数
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.company.trim()) {
      newErrors.company = '企業名を入力してください'
    }

    if (!formData.name.trim()) {
      newErrors.name = '氏名を入力してください'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '正しいメールアドレス形式で入力してください'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 入力変更ハンドラー
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // エラーをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // フォーム送信ハンドラー
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // バリデーション
    if (!validateForm()) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL

      if (!apiUrl) {
        console.error('API URL is not configured')
        throw new Error('設定エラー: お問い合わせ先が設定されていません')
      }

      await fetch(apiUrl, {
        method: 'POST',
        mode: 'no-cors', // GASはCORS対応していないため
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: formData.company,
          name: formData.name,
          tel: formData.tel,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      })

      // no-corsモードのため、常に成功として扱う
      setStatus('success')

      // フォームをリセット
      setFormData({
        company: '',
        name: '',
        tel: '',
        email: '',
        message: '',
      })
      setErrors({})

      // 5秒後に成功メッセージを消去
      setTimeout(() => {
        setStatus('idle')
      }, 5000)

    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
    }
  }

  return (
    <div className={styles.contactPage}>
      {/* 浮遊する感情アイコン */}
      <div className={styles.floatingEmotions}>
        {emotionIcons.map((emotion) => (
          <img
            key={emotion.id}
            src={`/img/logo/${emotion.icon}.png`}
            alt=""
            className={styles.floatingEmotion}
            style={{
              top: emotion.top,
              left: emotion.left,
              width: `${emotion.size}px`,
              height: `${emotion.size}px`,
            }}
          />
        ))}
      </div>

      {/* ヒーローセクション */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleMain}>お問い合わせ</span>
            <span className={styles.heroTitleSub}>Contact Us</span>
          </h1>
          <p className={styles.heroDescription}>
            データ活用、DX推進、感性分析に関する<br />
            ご相談を承ります
          </p>
        </div>
      </section>

      {/* フォームセクション */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={styles.formIntro}>
              <p className={styles.formIntroText}>
                下記フォームへ必要事項をご入力の上、送信をお願いいたします。<br />
                内容を確認後、担当より折り返しご連絡いたします。
              </p>
            </div>

            {/* ステータスメッセージ */}
            {status === 'success' && (
              <div className={`${styles.statusMessage} ${styles.successMessage}`}>
                <span className="material-symbols-outlined">check_circle</span>
                <span>お問い合わせを送信しました。ありがとうございます。</span>
              </div>
            )}

            {status === 'error' && Object.keys(errors).length > 0 && (
              <div className={`${styles.statusMessage} ${styles.errorMessage}`}>
                入力内容にエラーがあります。ご確認ください。
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* 企業名 */}
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  企業名<span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`${styles.formInput} ${errors.company ? styles.formInputError : ''}`}
                  placeholder="企業名をご入力ください"
                  required
                />
                {errors.company && (
                  <div className={styles.fieldError}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                    <span>{errors.company}</span>
                  </div>
                )}
              </div>

              {/* 氏名 */}
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  氏名<span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
                  placeholder="氏名をご入力ください"
                  required
                />
                {errors.name && (
                  <div className={styles.fieldError}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* 電話番号 */}
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  電話番号
                </label>
                <input
                  type="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="電話番号をご入力ください"
                />
              </div>

              {/* メールアドレス */}
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  メールアドレス<span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
                  placeholder="メールアドレスをご入力ください"
                  required
                />
                {errors.email && (
                  <div className={styles.fieldError}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* お問い合わせ内容 */}
              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  お問い合わせ内容<span className={styles.required}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.formTextarea} ${errors.message ? styles.formTextareaError : ''}`}
                  placeholder="お問い合わせ内容をご入力ください"
                  required
                />
                {errors.message && (
                  <div className={styles.fieldError}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* 送信ボタン */}
              <div className={styles.submitWrapper}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className={styles.loadingSpinner}></span>
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <span>送信</span>
                      <span className={`material-symbols-outlined ${styles.submitIcon}`}>send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
