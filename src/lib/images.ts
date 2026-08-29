// Central registry of all externally-provided image URLs.
// Imgur "page" links (imgur.com/<id>) are converted to direct file links (i.imgur.com/<id>.jpg).
// The SmartImage component gracefully handles any link imgur blocks via hotlink protection.

const imgur = (id: string) => `https://i.imgur.com/${id}.jpg`;

export const IMAGES = {
  // Brand
  companyLogo: imgur('b605rId'), // SATEV Group — the ultimate engineering
  productLogo: imgur('Bhcm6I3'), // RevoV — revolutionized your life
  productImage: imgur('UYxAo1A'), // RevoV product render

  // The real machine photo (used on order / verification pages, per user)
  machinePhoto: imgur('mDVbeBY'),

  // Users using the machine (auto-scrolling gallery) — real photos, no AI
  users: [
  imgur('MkrNJL5'),
  imgur('mutqKHA'),
  imgur('9U3Ilru'),
  imgur('nQBn2dU'),
  imgur('vNAMCQ6'),
  imgur('cTuaG4a'),
  imgur('GIFUmgP'),
  imgur('r0bu6C1'),
  imgur('ddw5sV0'),
  imgur('YNh5ioQ'),
  imgur('GZ38Ls3'),
  imgur('FAOKLX0'),
  imgur('C1DjKJN'),
  imgur('EbHb16m'),
  imgur('h6e81UW'),
  imgur('mvOUsc4'),
  imgur('GHYn3mX'),
  imgur('hpyAxPP'),
  imgur('mMKCqJk'),
  imgur('kGvcFGW'),
  imgur('gaSbJDv'),
  imgur('VYLUxUW'),
  imgur('g62mFy3'),
  imgur('qkSRc6R'),
  imgur('aHt80Yi'),
  imgur('mdBIhhq'),
  imgur('QtaKZzt'),
  imgur('XXBvorY')],


  firstVersionSite: imgur('8cehbuf'),

  // Payment brand logos
  santimpay: imgur('rGcduK7'),
  telebirr: imgur('yKquWEE'),
  cbeBirr: imgur('185FFZj'),
  mpesa: imgur('Ej8ig3g'),
  visa: imgur('3wC1thn'),
  mastercard: imgur('ueSL6Nd'),

  // Team
  team: {
    samuel: imgur('IPNI3wE'),
    ermias: imgur('Ws6jLoM'),
    abdi: imgur('FYPyA5x'),
    natnael: imgur('LD91U04')
  }
};

// A neutral inline SVG placeholder used when a remote image fails to load.
export const IMAGE_FALLBACK =
'data:image/svg+xml;utf8,' +
encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#0E1A40"/>
      <rect x="1" y="1" width="398" height="398" fill="none" stroke="#D9D9D9" stroke-opacity="0.2"/>
      <g fill="none" stroke="#D9D9D9" stroke-opacity="0.35" stroke-width="6">
        <circle cx="200" cy="170" r="52"/>
        <path d="M120 300c0-44 36-72 80-72s80 28 80 72"/>
      </g>
      <text x="200" y="360" text-anchor="middle" fill="#D9D9D9" fill-opacity="0.5" font-family="sans-serif" font-size="20">Image unavailable</text>
    </svg>`
);