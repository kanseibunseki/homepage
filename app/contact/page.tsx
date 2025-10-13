import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問い合わせ - 株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
  description: '株式会社感性分析へのお問い合わせはこちらから。',
}

export default function ContactPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/contact.css" />
      
      <section className="contact">
        <picture>
          <source srcSet="/wordpress-img/contact/sp/contact-bg.jpg" media="(max-width: 860px)" />
          <img className="contact-bg" src="/wordpress-img/contact/contact-bg.jpg" alt="" width={860} height={1295} decoding="async" loading="lazy" />
        </picture>
        
        <div className="contact__inner">
          <h1 className="c-page__title">
            <span className="c-page__title__ja">
              お問い合わせ
            </span>
            <span className="c-page__title__en">
              contact
            </span>
          </h1>

          <div className="contact__container">
            <p className="contact__sentence">
              下記フォームへ必要事項をご入力の上、弊社まで送信をお願いいたします。<br />
              内容を確認後、担当より折り返しご連絡いたします。
            </p>

            <form className="wpcf7-form" action="/contact" method="post">
              <div className="wpcf7-form-control-wrap">
                <label>
                  <span className="wpcf7-form-control-title">企業名</span>
                  <input 
                    type="text" 
                    name="company" 
                    className="wpcf7-form-control wpcf7-text"
                    placeholder="企業名をご入力ください"
                  />
                </label>
              </div>

              <div className="wpcf7-form-control-wrap">
                <label>
                  <span className="wpcf7-form-control-title">
                    氏名<span className="required">*</span>
                  </span>
                  <input 
                    type="text" 
                    name="name" 
                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                    placeholder="氏名をご入力ください"
                    required
                  />
                </label>
              </div>

              <div className="wpcf7-form-control-wrap">
                <label>
                  <span className="wpcf7-form-control-title">
                    電話番号<span className="required">*</span>
                  </span>
                  <input 
                    type="tel" 
                    name="tel" 
                    className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required"
                    placeholder="電話番号をご入力ください"
                    required
                  />
                </label>
              </div>

              <div className="wpcf7-form-control-wrap">
                <label>
                  <span className="wpcf7-form-control-title">
                    メールアドレス<span className="required">*</span>
                  </span>
                  <input 
                    type="email" 
                    name="email" 
                    className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
                    placeholder="メールアドレスをご入力ください"
                    required
                  />
                </label>
              </div>

              <div className="wpcf7-form-control-wrap">
                <label>
                  <span className="wpcf7-form-control-title">
                    お問い合わせ内容<span className="required">*</span>
                  </span>
                  <textarea 
                    name="message" 
                    className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required"
                    rows={8}
                    required
                  />
                </label>
              </div>

              <div className="wpcf7-form-control-wrap submit-wrapper">
                <button type="submit" className="wpcf7-form-control wpcf7-submit">
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}