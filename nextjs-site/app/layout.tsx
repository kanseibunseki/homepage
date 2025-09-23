import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import './section-overrides.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollTopButton from '@/components/ui/ScrollTopBtn'
import GlobalDataStream from '@/components/effects/GlobalDataStream'

export const metadata: Metadata = {
  title: '株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します - 一流のデータサイエンティストが、貴社の最適なデータ活用を提案・実現します。',
  description: '一流のデータサイエンティストが、貴社の最適なデータ活用を提案・実現します。',
  robots: 'max-image-preview:large',
  keywords: 'データサイエンス,AI,機械学習,データ分析,感性分析',
  openGraph: {
    title: '株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
    description: '一流のデータサイエンティストが、貴社の最適なデータ活用を提案・実現します。',
    type: 'website',
    locale: 'ja_JP',
    siteName: '株式会社感性分析',
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社感性分析｜ＡＩをフル活用し、企業のデータ活用を支援します',
    description: '一流のデータサイエンティストが、貴社の最適なデータ活用を提案・実現します。',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/css/common.css" />
        <link rel="stylesheet" href="/css/index.css" />
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/css/edit.css" />
        <style>{`img:is([sizes="auto" i], [sizes^="auto," i]) { contain-intrinsic-size: 3000px 1500px }`}</style>
        <script src="/js/swiper-bundle.min.js" defer></script>
      </head>
      <body className="home blog wp-embed-responsive wp-theme-kanseibunseki_dist" suppressHydrationWarning>
        <Script
          id="adobe-fonts"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d) {
                var config = {
                    kitId: 'aju1sly',
                    scriptTimeout: 3000,
                    async: true
                  },
                  h = d.documentElement,
                  t = setTimeout(function() {
                    h.className = h.className.replace(/\\bwf-loading\\b/g, "") + " wf-inactive";
                  }, config.scriptTimeout),
                  tk = d.createElement("script"),
                  f = false,
                  s = d.getElementsByTagName("script")[0],
                  a;
                h.className += " wf-loading";
                tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
                tk.async = true;
                tk.onload = tk.onreadystatechange = function() {
                  a = this.readyState;
                  if (f || a && a != "complete" && a != "loaded") return;
                  f = true;
                  clearTimeout(t);
                  try {
                    Typekit.load(config)
                  } catch (e) {}
                };
                s.parentNode.insertBefore(tk, s)
              })(document);
            `
          }}
        />
        <GlobalDataStream />
        <Header />
        <main className="l-main">
          {children}
        </main>
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  )
}