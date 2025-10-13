/**
 * セクション共通のスタイルを生成するユーティリティ関数
 */

export const getSectionBackgroundStyle = (
  minHeight: string,
  imageUrl: string,
  spImageUrl?: string
) => {
  return {
    minHeight,
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
    position: 'relative' as const
  };
};