import React from 'react';
import { SmartImage } from '../common/SmartImage';
import { IMAGES } from '../../lib/images';
/**
 * Auto-scrolling marquee of real customer photos (no AI images).
 * Duplicated once so the CSS marquee loops seamlessly.
 */
export function UserGallery() {
  const items = [...IMAGES.users, ...IMAGES.users];
  return (
    <div className="relative overflow-hidden">
      <div className="flex w-max animate-marquee gap-4">
        {items.map((src, i) =>
        <div
          key={i}
          className="h-56 w-44 flex-shrink-0 overflow-hidden rounded-xl border border-[rgba(217,217,217,0.15)] sm:h-72 sm:w-56">
          
            <SmartImage
            src={src}
            alt="Customer using a RevoV vending machine"
            className="h-full w-full object-cover" />
          
          </div>
        )}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy to-transparent" />
    </div>);

}