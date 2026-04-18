import { useEffect, useState } from "react";

export default function CachedImage({ src, className, alt }: any) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc || src}
      alt={alt}
      className={className}
    />
  );
}