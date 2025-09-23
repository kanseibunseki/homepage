/**
 * セクション共通のスタイルを生成するユーティリティ関数
 */

export const getSectionBackgroundStyle = (
  minHeight: string,
  imageUrl: string,
  spImageUrl?: string
) => {
  // モバイル用画像URLがある場合はレスポンシブ対応
  if (spImageUrl && typeof window !== 'undefined') {
    const isMobile = window.innerWidth <= 860;
    return {
      minHeight,
      backgroundImage: `url('${isMobile ? spImageUrl : imageUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      position: 'relative' as const
    };
  }
  
  // モバイル用画像がない場合は同じ画像を使用
  return {
    minHeight,
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
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
    backgroundImage: isMobile 
      ? `url('/wordpress-img/top/sp/section_1.jpg')`
      : `url('/wordpress-img/top/section_1.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    position: 'relative' as const
  };
};