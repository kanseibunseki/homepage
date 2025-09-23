/**
 * セクション共通のスタイルを生成するユーティリティ関数
 */

export const getSectionBackgroundStyle = (
  minHeight: string,
  imageUrl: string,
  spImageUrl?: string
) => {
  // 背景画像を削除し、minHeightのみ維持
  return {
    minHeight,
    // 背景画像を削除（パーティクルシステムを見やすくするため）
    // backgroundImage: `url('${imageUrl}')`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center top',
    // backgroundRepeat: 'no-repeat',
    position: 'relative' as const
  };
};

/**
 * HeroSection専用のスタイル（レスポンシブ対応のminHeight）
 */
export const getHeroSectionStyle = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 860;
  return {
    minHeight: isMobile ? '190.46vw' : '99.27vw',
    // 背景画像を削除（パーティクルシステムを見やすくするため）
    // backgroundImage: isMobile 
    //   ? `url('/wordpress-img/top/sp/section_1.jpg')`
    //   : `url('/wordpress-img/top/section_1.jpg')`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center top',
    // backgroundRepeat: 'no-repeat',
    position: 'relative' as const
  };
};