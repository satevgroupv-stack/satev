import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext } from
'react';
export type Lang = 'en' | 'am';
type Dict = Record<
  string,
  {
    en: string;
    am: string;
  }>;

// Full translation dictionary. Every user-facing string routes through here so the
// EN/አማ toggle swaps ALL text live.
const DICT: Dict = {
  // Brand
  brand_group: {
    en: 'Group',
    am: 'ግሩፕ'
  },
  tagline_company: {
    en: 'The Ultimate Engineering',
    am: 'የላቀ ኢንጂነሪንግ'
  },
  // Nav
  nav_home: {
    en: 'Home',
    am: 'መነሻ'
  },
  nav_about: {
    en: 'About Us',
    am: 'ስለ እኛ'
  },
  nav_journey: {
    en: 'Our Journey',
    am: 'ጉዞአችን'
  },
  nav_contact: {
    en: 'Contact Us',
    am: 'አግኙን'
  },
  nav_menu: {
    en: 'Menu',
    am: 'ማውጫ'
  },
  close: {
    en: 'Close',
    am: 'ዝጋ'
  },
  // Support
  need_help: {
    en: 'Need Help?',
    am: 'እገዛ ይፈልጋሉ?'
  },
  telegram_support: {
    en: 'Telegram Support',
    am: 'የቴሌግራም ድጋፍ'
  },
  report_issue: {
    en: 'Report Issue',
    am: 'ችግር ሪፖርት ያድርጉ'
  },
  // Landing
  hero_headline: {
    en: 'Smart Vending. Instant Refreshment.',
    am: 'ዘመናዊ ማሽን ለፈጣን እርካታ'
  },
  hero_sub: {
    en: 'Modern Vending Machine for Instant Refreshment.',
    am: 'ለፈጣን እርካታ ዘመናዊ ማሽን።'
  },
  hero_desc: {
    en: 'Purchase your favorite drink in seconds.',
    am: 'የሚወዱትን መጠጥ በሰከንዶች ውስጥ ይግዙ።'
  },
  start_order: {
    en: 'Start Order',
    am: 'ትዕዛዝ ጀምር'
  },
  machine: {
    en: 'Machine',
    am: 'ማሽን'
  },
  status: {
    en: 'Status',
    am: 'ሁኔታ'
  },
  online: {
    en: 'Online',
    am: 'በመስመር ላይ'
  },
  offline: {
    en: 'Offline',
    am: 'ከመስመር ውጭ'
  },
  low_stock: {
    en: 'Low Stock',
    am: 'ክምችት ዝቅተኛ'
  },
  maintenance: {
    en: 'Maintenance',
    am: 'ጥገና ላይ'
  },
  location: {
    en: 'Location',
    am: 'አድራሻ'
  },
  products_available: {
    en: 'Products Available',
    am: 'ያሉ ምርቶች'
  },
  last_online: {
    en: 'Last Online',
    am: 'መጨረሻ በመስመር ላይ'
  },
  min_ago: {
    en: 'min ago',
    am: 'ደቂቃ በፊት'
  },
  how_it_works: {
    en: 'How It Works',
    am: 'እንዴት እንደሚሰራ'
  },
  step_scan: {
    en: 'Scan QR',
    am: 'QR ስካን'
  },
  step_scan_d: {
    en: 'Scan the QR code on the machine',
    am: 'በማሽኑ ላይ ያለውን QR ኮድ ስካን ያድርጉ'
  },
  step_select: {
    en: 'Select Drinks',
    am: 'መጠጥ ይምረጡ'
  },
  step_select_d: {
    en: 'Choose your favorite drinks',
    am: 'የሚወዱትን መጠጥ ይምረጡ'
  },
  step_pay: {
    en: 'Pay',
    am: 'ይክፈሉ'
  },
  step_pay_d: {
    en: 'Complete secure payment',
    am: 'ደህንነቱ የተጠበቀ ክፍያ ይፈጽሙ'
  },
  step_enjoy: {
    en: 'Enjoy Drink',
    am: 'መጠጥዎን ይውሰዱ'
  },
  step_enjoy_d: {
    en: 'Collect and enjoy',
    am: 'ወስደው ይደሰቱ'
  },
  users_title: {
    en: 'People Love RevoV',
    am: 'ሰዎች RevoV ይወዳሉ'
  },
  users_sub: {
    en: 'Real customers, real refreshment.',
    am: 'እውነተኛ ደንበኞች፣ እውነተኛ እርካታ።'
  },
  // Verification
  verifying: {
    en: 'Verifying machine…',
    am: 'ማሽኑ በመረጋገጥ ላይ…'
  },
  machine_ready: {
    en: 'Machine Ready',
    am: 'ማሽኑ ዝግጁ ነው'
  },
  ready_to_serve: {
    en: 'is online and ready to serve.',
    am: 'በመስመር ላይ ሆኖ ለአገልግሎት ዝግጁ ነው።'
  },
  drinks_available_n: {
    en: 'drinks available',
    am: 'መጠጦች ይገኛሉ'
  },
  continue: {
    en: 'Continue',
    am: 'ቀጥል'
  },
  // Selection
  select_your_drink: {
    en: 'Select Your Drink',
    am: 'መጠጥዎን ይምረጡ'
  },
  in_stock: {
    en: 'In Stock',
    am: 'በክምችት'
  },
  out_of_stock: {
    en: 'Out of Stock',
    am: 'አልቋል'
  },
  add: {
    en: 'Add',
    am: 'ጨምር'
  },
  review_order: {
    en: 'Review Order',
    am: 'ትዕዛዝ ይገምግሙ'
  },
  drink_types: {
    en: 'drink types',
    am: 'የመጠጥ አይነቶች'
  },
  items: {
    en: 'items',
    am: 'እቃዎች'
  },
  total: {
    en: 'Total',
    am: 'ጠቅላላ'
  },
  subtotal: {
    en: 'Subtotal',
    am: 'ንዑስ ድምር'
  },
  proceed_checkout: {
    en: 'Proceed to Checkout',
    am: 'ወደ ክፍያ ቀጥል'
  },
  // Checkout
  review_your_order: {
    en: 'Review Your Order',
    am: 'ትዕዛዝዎን ይገምግሙ'
  },
  clear_cart: {
    en: 'Clear Cart',
    am: 'ጋሪ አጽዳ'
  },
  proceed_payment: {
    en: 'Proceed to Payment',
    am: 'ወደ ክፍያ ቀጥል'
  },
  empty_cart: {
    en: 'Your cart is empty.',
    am: 'ጋሪዎ ባዶ ነው።'
  },
  back_to_menu: {
    en: 'Back to Menu',
    am: 'ወደ ማውጫ ተመለስ'
  },
  qty: {
    en: 'Qty',
    am: 'ብዛት'
  },
  // Payment
  secure_payment: {
    en: 'Secure Payment',
    am: 'ደህንነቱ የተጠበቀ ክፍያ'
  },
  order: {
    en: 'Order',
    am: 'ትዕዛዝ'
  },
  powered_by_santimpay: {
    en: 'Powered by SantimPay',
    am: 'በ SantimPay የተጎላበተ'
  },
  select_payment_method: {
    en: 'Select a payment method',
    am: 'የክፍያ ዘዴ ይምረጡ'
  },
  wallets_title: {
    en: 'Mobile Wallets & Digital Money',
    am: 'ሞባይል ዋሌቶች እና ዲጂታል ገንዘብ'
  },
  banks_title: {
    en: 'Supported Banks',
    am: 'የሚደገፉ ባንኮች'
  },
  cards_title: {
    en: 'International Cards',
    am: 'አለም አቀፍ ካርዶች'
  },
  cards_desc: {
    en: 'Visa & Mastercard (Credit & Debit) for secure, real-time online payments.',
    am: 'Visa እና Mastercard (ክሬዲት እና ዴቢት) ለደህንነቱ የተጠበቀ የቅጽበት ክፍያ።'
  },
  pay: {
    en: 'Pay',
    am: 'ክፈል'
  },
  processing_payment: {
    en: 'Processing Payment…',
    am: 'ክፍያ በሂደት ላይ…'
  },
  payment_failed: {
    en: 'Payment Failed',
    am: 'ክፍያ አልተሳካም'
  },
  retry_payment: {
    en: 'Retry Payment',
    am: 'ክፍያ ደግመው ይሞክሩ'
  },
  secured_by: {
    en: 'Secured by SATEV Group PLC',
    am: 'በ SATEV ግሩፕ የተጠበቀ'
  },
  encrypted_note: {
    en: 'Your payment is encrypted and secure.',
    am: 'ክፍያዎ የተመሰጠረ እና ደህንነቱ የተጠበቀ ነው።'
  },
  // Success
  payment_successful: {
    en: 'Payment Successful!',
    am: 'ክፍያ ተሳክቷል!'
  },
  thank_you: {
    en: 'Thank you for your purchase.',
    am: 'ስለ ግዢዎ እናመሰግናለን።'
  },
  receipt_no: {
    en: 'Receipt #',
    am: 'ደረሰኝ #'
  },
  transaction_id: {
    en: 'Transaction ID',
    am: 'የግብይት መለያ'
  },
  date: {
    en: 'Date',
    am: 'ቀን'
  },
  products: {
    en: 'Products',
    am: 'ምርቶች'
  },
  download_receipt: {
    en: 'Download PDF Receipt',
    am: 'ደረሰኝ አውርድ'
  },
  dispensing_status: {
    en: 'Dispensing Status',
    am: 'የማሽን ሁኔታ'
  },
  dispensing_completed: {
    en: 'Completed — Collect your drink!',
    am: 'ተጠናቀቀ — መጠጥዎን ይውሰዱ!'
  },
  rate_experience: {
    en: 'Rate your experience',
    am: 'ተሞክሮዎን ይገምግሙ'
  },
  report_problem: {
    en: 'Report a Problem',
    am: 'ችግር ሪፖርት ያድርጉ'
  },
  buy_again: {
    en: 'Buy Again',
    am: 'እንደገና ግዛ'
  },
  return_home: {
    en: 'Return Home',
    am: 'ወደ መነሻ ተመለስ'
  },
  thanks_feedback: {
    en: 'Thanks for your feedback!',
    am: 'ስለ አስተያየትዎ እናመሰግናለን!'
  },
  // About
  about_title: {
    en: 'About SATEV Group',
    am: 'ስለ SATEV ግሩፕ'
  },
  company_overview: {
    en: 'Company Overview',
    am: 'የኩባንያ አጠቃላይ እይታ'
  },
  company_overview_body: {
    en: 'SATEV Group PLC is a technology-driven engineering company dedicated to the development, manufacture, and deployment of intelligent, IoT-enabled vending solutions. The company specializes in integrating electromechanical engineering, industrial automation, embedded hardware, and cloud-based software systems to deliver autonomous retail solutions.',
    am: 'SATEV ግሩፕ ኃላፊነቱ የተወሰነ ኩባንያ ብልህ የ IoT ማሽኖችን በማልማት፣ በማምረት እና በማሰማራት ላይ ያተኮረ የቴክኖሎጂ ኢንጂነሪንግ ኩባንያ ነው። ኩባንያው ኤሌክትሮሜካኒካል ኢንጂነሪንግ፣ የኢንዱስትሪ አውቶሜሽን፣ ኤምቤድድ ሃርድዌር እና ክላውድ ላይ የተመሰረቱ ሶፍትዌሮችን በማዋሃድ ራስን የቻሉ የችርቻሮ መፍትሔዎችን ያቀርባል።'
  },
  mission: {
    en: 'Mission',
    am: 'ተልእኮ'
  },
  mission_body: {
    en: 'To design, manufacture, and deploy intelligent IoT-enabled vending and automation infrastructures that deliver secure, reliable, and scalable access to essential products and services while fostering national technological capacity, supporting digital transformation, and enabling data-driven institutional performance.',
    am: 'ለዜጎች አስፈላጊ የሆኑ ምርቶችን እና አገልግሎቶችን ደህንነቱ በተጠበቀ፣ አስተማማኝ እና ሊሰፋ በሚችል መንገድ የሚያቀርቡ ብልህ የ IoT ማሽኖችን መንደፍ፣ ማምረት እና ማሰማራት፤ በተጨማሪም ብሔራዊ የቴክኖሎጂ አቅምን ማጎልበት እና ዲጂታል ሽግግርን መደገፍ።'
  },
  vision: {
    en: 'Vision',
    am: 'ራዕይ'
  },
  vision_body: {
    en: "To become Ethiopia's leading autonomous systems and engineering innovation company, expanding to Africa and beyond, enabling institutions and communities to access modern, efficient, and intelligent machine-driven services.",
    am: 'ኢትዮጵያ ውስጥ ግንባር ቀደም ራስን የቻሉ ስርዓቶች እና የኢንጂነሪንግ ፈጠራ ኩባንያ ሆኖ ወደ አፍሪካ እና ከዚያ በላይ በመስፋፋት፣ ተቋማት እና ማህበረሰቦች ዘመናዊ እና ብልህ አገልግሎቶችን እንዲያገኙ ማድረግ።'
  },
  objectives: {
    en: 'Objectives',
    am: 'ዓላማዎች'
  },
  obj_1: {
    en: 'Develop cutting-edge smart systems and advanced automation solutions',
    am: 'ዘመናዊ ብልህ ስርዓቶችን እና የላቀ አውቶሜሽን መፍትሄዎችን ማልማት'
  },
  obj_2: {
    en: 'Build scalable IoT, AI, and robotics technologies',
    am: 'ሊሰፉ የሚችሉ IoT፣ AI እና ሮቦቲክስ ቴክኖሎጂዎችን መገንባት'
  },
  obj_3: {
    en: 'Drive innovation through continuous research and product development',
    am: 'በቀጣይ ምርምር እና የምርት ልማት ፈጠራን ማራመድ'
  },
  obj_4: {
    en: 'Design and manufacture high-performance engineering systems locally',
    am: 'ከፍተኛ አፈጻጸም ያላቸው የኢንጂነሪንግ ስርዓቶችን በአገር ውስጥ መንደፍ እና ማምረት'
  },
  obj_5: {
    en: 'Expand solutions from Africa to global markets',
    am: 'መፍትሄዎችን ከአፍሪካ ወደ ዓለም አቀፍ ገበያ ማስፋፋት'
  },
  the_product: {
    en: 'The Product',
    am: 'ምርቱ'
  },
  // Journey
  journey_title: {
    en: 'Our Journey',
    am: 'ጉዞአችን'
  },
  journey_sub: {
    en: 'From a paper sketch to autonomous commerce.',
    am: 'ከወረቀት ንድፍ እስከ ራስ-ገዝ ንግድ።'
  },
  the_team: {
    en: 'The Team',
    am: 'ቡድናችን'
  },
  view_profile: {
    en: 'View Profile',
    am: 'መገለጫ ይመልከቱ'
  },
  role: {
    en: 'Role',
    am: 'ሚና'
  },
  expertise: {
    en: 'Expertise',
    am: 'ሙያ'
  },
  contributions: {
    en: 'Contributions',
    am: 'አስተዋፅኦዎች'
  },
  back_to_journey: {
    en: 'Back to Our Journey',
    am: 'ወደ ጉዞአችን ተመለስ'
  },
  // Contact
  contact_title: {
    en: 'Contact Us',
    am: 'አግኙን'
  },
  phone: {
    en: 'Phone',
    am: 'ስልክ'
  },
  email: {
    en: 'Email',
    am: 'ኢሜይል'
  },
  address: {
    en: 'Address',
    am: 'አድራሻ'
  },
  hours: {
    en: 'Mon–Fri: 8:00 AM – 6:00 PM',
    am: 'ሰኞ–አርብ: 8:00 – 6:00 ከሰዓት'
  },
  name: {
    en: 'Name',
    am: 'ስም'
  },
  subject: {
    en: 'Subject',
    am: 'ርዕስ'
  },
  message: {
    en: 'Message',
    am: 'መልእክት'
  },
  send_message: {
    en: 'Send Message',
    am: 'መልእክት ላክ'
  },
  message_sent: {
    en: 'Message sent! We will get back to you soon.',
    am: 'መልእክት ተልኳል! በቅርቡ እንመልስልዎታለን።'
  },
  connect_with_us: {
    en: 'Connect With SATEV',
    am: 'ከ SATEV ጋር ይገናኙ'
  },
  required: {
    en: 'required',
    am: 'የግድ'
  },
  // Footer / legal
  company: {
    en: 'Company',
    am: 'ኩባንያ'
  },
  legal: {
    en: 'Legal',
    am: 'ህጋዊ'
  },
  social: {
    en: 'Social',
    am: 'ማህበራዊ'
  },
  privacy_policy: {
    en: 'Privacy Policy',
    am: 'የግላዊነት ፖሊሲ'
  },
  terms_of_service: {
    en: 'Terms of Service',
    am: 'የአገልግሎት ውል'
  },
  rights_reserved: {
    en: 'All rights reserved.',
    am: 'መብቱ በህግ የተጠበቀ ነው።'
  },
  last_updated: {
    en: 'Last updated',
    am: 'መጨረሻ የተሻሻለው'
  }
};
interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: keyof typeof DICT | string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // MUST be the same during SSR and initial client render
  const [lang, setLangState] = useState<Lang>("en");

  // Load saved language AFTER hydration
  useEffect(() => {
    const savedLang = localStorage.getItem("revov_lang");

    if (savedLang === "en" || savedLang === "am") {
      setLangState(savedLang);
    }
  }, []);

  // Persist language changes
  useEffect(() => {
    localStorage.setItem("revov_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
  }, []);

  const toggle = useCallback(() => {
    setLangState((p) => (p === "en" ? "am" : "en"));
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = DICT[key];

      if (!entry) return key;

      return entry[lang];
    },
    [lang]
  );

  return (
    <I18nContext.Provider
      value={{
        lang,
        setLang,
        toggle,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);

  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return ctx;
}