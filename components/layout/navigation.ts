/**
 * ナビゲーションリンク定義
 * フッターとヘッダーメニューで共通利用
 */

export interface NavigationLink {
  title: string
  href: string
  subLinks?: NavigationLink[]
}

export interface NavigationSection {
  title: string
  links: NavigationLink[]
}

/**
 * メインナビゲーション（Navigation）
 */
export const MAIN_NAVIGATION: NavigationLink[] = [
  { title: 'トップページ', href: '/' },
  { title: '会社概要', href: '/company' },
  { title: '経営メンバー', href: '/members' },
]

/**
 * サービスナビゲーション（Services）
 */
export const SERVICES_NAVIGATION: NavigationLink[] = [
  { title: 'コンサルティング', href: '/#consulting' },
  { title: 'N1インタビューサービス', href: '/#n1-interview' },
]

/**
 * 法的情報ナビゲーション（Legal）
 */
export const LEGAL_NAVIGATION: NavigationLink[] = [
  { title: 'プライバシーポリシー', href: '/privacy' },
  { title: '利用規約', href: '/terms' },
]

/**
 * フッター用のナビゲーションセクション
 */
export const FOOTER_NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    title: 'Navigation',
    links: MAIN_NAVIGATION,
  },
  {
    title: 'Services',
    links: SERVICES_NAVIGATION,
  },
  {
    title: 'Legal',
    links: LEGAL_NAVIGATION,
  },
]

/**
 * メニュー用のナビゲーションリンク（MainとServicesを統合）
 */
export const MENU_NAVIGATION: NavigationLink[] = [
  ...MAIN_NAVIGATION,
  {
    title: 'toB向けサービス',
    href: '/#business-domain',
    subLinks: SERVICES_NAVIGATION,
  },
]
