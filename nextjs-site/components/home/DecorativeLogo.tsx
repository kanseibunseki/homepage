/**
 * 装飾的なロゴ画像を表示する共通コンポーネント
 */

interface DecorativeLogoProps {
  src: string;
  className: string;
  width?: number;
  height?: number;
  alt?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'sync' | 'async';
}

export const DecorativeLogo = ({ 
  src, 
  className, 
  width = 100, 
  height = 100,
  alt = '',
  loading = 'lazy',
  decoding = 'async'
}: DecorativeLogoProps) => (
  <div className={className}>
    <img 
      src={src} 
      alt={alt}
      width={width} 
      height={height} 
      decoding={decoding}
      loading={loading}
    />
  </div>
);

export default DecorativeLogo;