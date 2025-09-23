/**
 * 共通定数の定義ファイル
 */

// ブレークポイント
export const BREAKPOINTS = {
  MOBILE: 860
} as const;

// セクションの高さ設定
export const SECTION_HEIGHTS = {
  HERO: {
    mobile: '190.46vw',
    desktop: '99.27vw'
  },
  PROBLEM: '120.34vw',
  SOLUTION: '78.60vw',
  DIFFERENCE: '139.41vw',
  INTRODUCTION: '251.39vw',
  PRICE: '165.46vw',
  CV: 'auto', // CVSectionは高さ自動
  LECTURE: 'auto' // LectureSectionは高さ自動
} as const;

// 画像パス
export const IMAGE_PATHS = {
  sections: {
    hero: {
      desktop: '/wordpress-img/top/section_1.jpg',
      mobile: '/wordpress-img/top/sp/section_1.jpg'
    },
    problem: '/wordpress-img/top/section_2.jpg',
    solution: '/wordpress-img/top/section_3.jpg',
    lecture: '/wordpress-img/top/section_4.jpg',
    difference: '/wordpress-img/top/section_5.jpg',
    introduction: '/wordpress-img/top/section_6.jpg',
    price: '/wordpress-img/top/section_7.jpg'
  },
  logos: {
    base: '/wordpress-img/logo/',
    decorative: [
      'age.png',
      'ase.png',
      'batsu.png',
      'denkyu.png',
      'exclamation.png',
      'fire.png',
      'good.png',
      'heart.png',
      'heartarrow.png',
      'heartbreak.png',
      'ikari.png',
      'kirakira.png',
      'kirakirasmall.png',
      'lol.png',
      'no.png',
      'oh.png',
      'onpu.png',
      'sage.png',
      'skull.png',
      'tereru.png',
      'www.png',
      'zzz.png'
    ]
  }
} as const;