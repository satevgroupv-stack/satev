import { IMAGES } from "./images";

export interface Drink {
  id: string;
  name_en: string;
  name_am: string;
  price: number; // ETB
  volume: string;
  image: string;
  inStock: boolean;
}

// Drinks menu (order & prices exactly as provided). Out-of-stock rendered in blue.
export const DRINKS: Drink[] = [
  {
    id: "coca",
    name_en: "Coca",
    name_am: "ኮካ",
    price: 70,
    volume: "300ml",
    image: "https://cdn3.evostore.io/productimages/vow_api/l/arn10943_01.jpg",
    inStock: true,
  },
  {
    id: "fanta",
    name_en: "Fanta",
    name_am: "ፋንታ",
    price: 70,
    volume: "300ml",
    image: "https://i.imgur.com/PmXE8vx.jpg",
    inStock: true,
  },
  {
    id: "mirinda",
    name_en: "Mirinda",
    name_am: "ሚሪንዳ",
    price: 70,
    volume: "300ml",
    image: "https://i.imgur.com/RnZIopP.jpg",
    inStock: true,
  },
  {
    id: "negus",
    name_en: "Negus",
    name_am: "ንጉስ",
    price: 70,
    volume: "300ml",
    image: "https://i.imgur.com/N4kyEMW.jpg",
    inStock: true,
  },
  {
    id: "sinq",
    name_en: "SinQ",
    name_am: "ስንቅ",
    price: 70,
    volume: "300ml",
    image: "https://i.imgur.com/LCyDiA5.jpg",
    inStock: true,
  },
  {
    id: "sprite",
    name_en: "Sprite",
    name_am: "ስፕራይት",
    price: 70,
    volume: "300ml",
    image: "https://i.imgur.com/uYvdb5g.jpg",
    inStock: true,
  },
  {
    id: "7up",
    name_en: "7 UP",
    name_am: "ሰበን ሃፕ",
    price: 70,
    volume: "300ml",
    image: "https://i.imgur.com/WCvpoz4.jpg",
    inStock: false,
  },
  {
    id: "novida",
    name_en: "Novida",
    name_am: "ኖቪዳ",
    price: 70,
    volume: "300ml",
    image: "https://i.imgur.com/aA6z1pu.jpg",
    inStock: true,
  },
  {
    id: "ambo",
    name_en: "Ambo Mineral Apple Water",
    name_am: "አምቦ ውሃ",
    price: 70,
    volume: "500ml",
    image: "https://i.imgur.com/0dhxIoO.jpg",
    inStock: true,
  },
  {
    id: "malta",
    name_en: "Malta Guinness",
    name_am: "ማልታ ጊኒስ",
    price: 70,
    volume: "300ml",
    image: "https://i.imgur.com/m3dI08V.jpg",
    inStock: false,
  },
  {
    id: "water",
    name_en: "Bottled Water",
    name_am: "የታሸገ ውሃ",
    price: 70,
    volume: "500ml",
    image: "https://i.imgur.com/72wigSz.jpg",
    inStock: true,
  },
];

export const MACHINE = {
  id: "RevoV-001",
  location_en: "AASTU - Kilinto Commercial Hub",
  location_am: "አዲስ አበባ ሳይንስ እና ቴክኖሎጂ ዩኒቨርሲቲ - ቂሊንጦ",
  status: "online" as "online" | "offline" | "low_stock" | "maintenance",
};

export interface TeamMember {
  id: string;
  name: string;
  name_am: string;
  role_en: string;
  role_am: string;
  expertise_en: string;
  expertise_am: string;
  image: string;
  linkedin: string;
  bio_en: string[];
  bio_am: string[];
}

export const TEAM: TeamMember[] = [
  {
    id: "samuel",
    name: "Samuel Alemu",
    name_am: "ሳሙኤል አለሙ",
    role_en: "Founder & Chief Executive Officer (CEO)",
    role_am: "መስራች እና ዋና ስራ አስፈፃሚ (CEO)",
    expertise_en: "AI & Mechatronics Engineer",
    expertise_am: "AI እና ሜካትሮኒክስ ኢንጂነር",
    image: IMAGES.team.samuel,
    linkedin: "https://et.linkedin.com/in/samuel-alemu-03005b224",
    bio_en: [
      "Samuel founded SATEV Group PLC with a vision to bring autonomous, IoT-enabled commerce to Ethiopia and beyond.",
      "As CEO, he drives the company strategy and the mechatronics architecture behind the machines.",
      "He led the effort from the first freehand MVP sketch to a patented, revenue-generating deployment.",
    ],

    bio_am: [
      "ሳሙኤል ራስን የቻለ የ IoT ንግድ ወደ ኢትዮጵያ እና ከዚያም በላይ ለማምጣት ባለው ራዕይ SATEV ግሩፕን መስርቷል።",
      "እንደ CEO የኩባንያውን ስትራቴጂ እና የማሽኖቹን የሜካትሮኒክስ አርክቴክቸር ይመራል።",
      "ከመጀመሪያው የእጅ ንድፍ እስከ በፓተንት የተመዘገበ ገቢ አመንጪ ማሰማራት ያለውን ጥረት መርቷል።",
    ],
  },
  {
    id: "ermias",
    name: "Ermias Tigistu",
    name_am: "ኤርሚያስ ትግስቱ",
    role_en: "Co-Founder & Chief Product Officer (CPO)",
    role_am: "ተባባሪ መስራች እና ዋና የምርት ኃላፊ (CPO)",
    expertise_en: "Mechatronics Engineer",
    expertise_am: "ሜካትሮኒክስ ኢንጂነር",
    image: IMAGES.team.ermias,
    linkedin: "http://et.linkedin.com/in/ermias-tigistu-36bbb3288",
    bio_en: [
      "Ermias co-founded SATEV Group and leads product across hardware and user experience.",
      "He engineered the electromechanical dispensing system and drove the successful real-world deployment tests.",
      "His work ensures every RevoV machine is reliable, serviceable, and delightful to use.",
    ],

    bio_am: [
      "ኤርሚያስ SATEV ግሩፕን በጋራ የመሰረተ ሲሆን በሃርድዌር እና በተጠቃሚ ተሞክሮ ላይ የምርት ልማትን ይመራል።",
      "የኤሌክትሮሜካኒካል የመስጫ ስርዓቱን ነድፎ ስኬታማ የመስክ ሙከራዎችን መርቷል።",
      "ስራው እያንዳንዱ RevoV ማሽን አስተማማኝ እና ለአጠቃቀም ምቹ መሆኑን ያረጋግጣል።",
    ],
  },
  {
    id: "abdi",
    name: "Abdi Geremew",
    name_am: "አብዲ ገረመው",
    role_en: "Shareholder & Chief Technology Officer (CTO)",
    role_am: "ባለአክሲዮን እና ዋና የቴክኖሎጂ ኃላፊ (CTO)",
    expertise_en: "Software Engineer",
    expertise_am: "ሶፍትዌር ኢንጂነር",
    image: IMAGES.team.abdi,
    linkedin: "https://et.linkedin.com/in/abdigeremew",
    bio_en: [
      "Abdi joined SATEV Group as Shareholder and CTO on July 11, 2026.",
      "He architects the cloud platform, payment integrations, and the IoT telemetry that keeps every machine connected.",
      "His software powers the end-to-end customer journey — from QR scan to secure payment.",
    ],

    bio_am: [
      "አብዲ በሐምሌ 11 ቀን 2026 እንደ ባለአክሲዮን እና CTO SATEV ግሩፕን ተቀላቅሏል።",
      "የክላውድ መድረኩን፣ የክፍያ ውህደቶችን እና እያንዳንዱን ማሽን የሚያገናኘውን የ IoT ስርዓት ይነድፋል።",
      "ሶፍትዌሩ ከ QR ስካን እስከ ደህንነቱ የተጠበቀ ክፍያ ያለውን ሙሉ የደንበኛ ጉዞ ያንቀሳቅሳል።",
    ],
  },
  {
    id: "natnael",
    name: "Natnael Tamirat",
    name_am: "ናትናኤል ታምራት",
    role_en: "Shareholder & Chief Operational Officer (COO)",
    role_am: "ባለአክሲዮን እና ዋና የስራ ክንውን ኃላፊ (COO)",
    expertise_en: "Mechatronics Engineer",
    expertise_am: "ሜካትሮኒክስ ኢንጂነር",
    image: IMAGES.team.natnael,
    linkedin: "https://et.linkedin.com/in/natnael-tamrat-866334176",
    bio_en: [
      "Natnael joined SATEV Group as Shareholder and COO on July 11, 2026.",
      "He leads operations, deployment logistics, and machine maintenance across all sites.",
      "His mechatronics expertise keeps the fleet running smoothly and scaling reliably.",
    ],

    bio_am: [
      "ናትናኤል በሐምሌ 11 ቀን 2026 እንደ ባለአክሲዮን እና COO SATEV ግሩፕን ተቀላቅሏል።",
      "የስራ ክንውን፣ የማሰማራት ሎጂስቲክስ እና የማሽን ጥገናን ይመራል።",
      "የሜካትሮኒክስ ሙያው ማሽኖቹ በተቀላጠፈ ሁኔታ እንዲሰሩ ያደርጋል።",
    ],
  },
];

export interface Milestone {
  date_en: string;
  date_am: string;
  title_en: string;
  title_am: string;
}

export const MILESTONES: Milestone[] = [
  {
    date_en: "Jun 30, 2025",
    date_am: "ሰኔ 30, 2025",
    title_en: "First MVP RevoV Vending Machine concept design.",
    title_am: "የመጀመሪያው MVP ንድፍ ።",
  },
  {
    date_en: "Dec 29, 2025",
    date_am: "ታህሳስ 29, 2025",
    title_en: "SATEV Office established.",
    title_am: "የ SATEV ቢሮ ተቋቋመ።",
  },
  {
    date_en: "Feb 18, 2026",
    date_am: "የካቲት 18, 2026",
    title_en: "Patent registration filed.",
    title_am: "የፓተንት ምዝገባ ቀረበ።",
  },
  {
    date_en: "Mar 26, 2026",
    date_am: "መጋቢት 26, 2026",
    title_en: "First MVP machine deployed.",
    title_am: "የመጀመሪያው MVP ማሽን ተሰማራ።",
  },
  {
    date_en: "Apr 9, 2026",
    date_am: "ሚያዝያ 9, 2026",
    title_en: "Electromechanical test success.",
    title_am: "የኤሌክትሮሜካኒካል ሙከራ ተሳካ።",
  },
  {
    date_en: "Apr 29, 2026",
    date_am: "ሚያዝያ 29, 2026",
    title_en: "Final real-world deployment success.",
    title_am: "የመጨረሻው የመስክ ማሰማራት ተሳካ።",
  },
  {
    date_en: "May 21, 2026",
    date_am: "ግንቦት 21, 2026",
    title_en: "First real-money sale.",
    title_am: "የመጀመሪያው በገንዘብ ሽያጭ።",
  },
  {
    date_en: "Jun 10, 2026",
    date_am: "ሰኔ 10, 2026",
    title_en: "Patent granted.",
    title_am: "ፓተንት ተሰጠ።",
  },
  {
    date_en: "Jun 12, 2026",
    date_am: "ሰኔ 12, 2026",
    title_en: "Machine relocated to AASTU Commercial Hub.",
    title_am: "ማሽኑ ወደ AASTU ንግድ ማዕከል ተዛወረ።",
  },
  {
    date_en: "Jul 11, 2026",
    date_am: "ሐምሌ 11, 2026",
    title_en:
      "Natnael Tamirat and Abdi Geremew officially joined SATEV Group PLC as core team members and shareholders.",
    title_am:
      "ናትናኤል ታምራት እና አብዲ ገረመው እንደ ዋና የቡድን አባላት እና ባለአክሲዮኖች SATEV ግሩፕን ተቀላቀሉ።",
  },
];

export const CONTACT = {
  phones: ["+251969459060", "+251913911454"],
  emails: ["SATEVGroupV@gmail.com", "SATEVGroup2018@gmail.com"],
  addressUrl: "https://maps.app.goo.gl/YMzecQDDqWRhJSZq6",
  linkedin: "https://www.linkedin.com/company/satev-group/",
  linktree: "https://linktr.ee/SATEV_Group",
  telegramChannel: "https://t.me/Satev_Group",
  facebook: "https://www.facebook.com/profile.php?id=61587278017149",
  tiktok: "https://www.tiktok.com/@satev_group",
  instagram: "https://www.instagram.com/satev_group",
  website: "https://satevgroup.lovable.app",
  supportBot: "https://t.me/Revov_bot",
};

export interface PayMethod {
  id: string;
  name: string;
  logo?: string;
}

export const WALLETS: PayMethod[] = [
  { id: "telebirr", name: "Telebirr", logo: IMAGES.telebirr },
  { id: "cbebirr", name: "CBE Birr", logo: IMAGES.cbeBirr },
  { id: "mpesa", name: "M-Pesa", logo: IMAGES.mpesa },
];

export const BANKS: PayMethod[] = [
  { id: "boa", name: "Bank of Abyssinia" },
  { id: "awash", name: "Awash Bank" },
  { id: "amhara", name: "Amhara Bank" },
  { id: "zamzam", name: "ZamZam Bank" },
  { id: "oromia", name: "Oromia Bank" },
  { id: "gadaa", name: "Gadaa Bank" },
  { id: "ahadu", name: "Ahadu Bank" },
  { id: "anbessa", name: "Anbessa Bank (Anbessa HelloCash)" },
  { id: "bunna", name: "Bunna Bank" },
];

export const CARDS: PayMethod[] = [
  { id: "visa", name: "Visa", logo: IMAGES.visa },
  { id: "mastercard", name: "Mastercard", logo: IMAGES.mastercard },
];
