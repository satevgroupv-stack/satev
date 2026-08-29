import React, { useState } from "react";
import { IMAGE_FALLBACK } from "../../lib/images";
interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}
/**
 * Image wrapper that swaps to a neutral placeholder if the remote source
 * fails to load (e.g. imgur hotlink protection). Never shows a broken icon.
 */
export function SmartImage({
  src,
  alt,
  fallbackSrc = IMAGE_FALLBACK,
  ...rest
}: SmartImageProps) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
