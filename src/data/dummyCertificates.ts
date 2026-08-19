import { CertificateMenuItem } from "@/types/certificate";
import { CERTIFICATES_DATA_MAP } from "@/data/certificates";

export const CERTIFICATE_MENU_ITEMS: CertificateMenuItem[] = [
  {
    slug: "unmarried",
    titleBn: "অবিবাহিত সনদ",
    titleEn: "Unmarried Certificate",
    iconName: "UserCheck",
    description: "আবেদনকারীর অবিবাহিত অবস্থা নিশ্চিতকরণ প্রত্যয়নপত্র"
  },
  {
    slug: "inheritance",
    titleBn: "উত্তরাধিকার সনদ",
    titleEn: "Inheritance Certificate",
    iconName: "Users",
    description: "মৃত ব্যক্তির সকল বৈধ উত্তরাধিকারীদের নামের তালিকা সম্বলিত সনদ"
  },
  {
    slug: "warish",
    titleBn: "ওয়ারিশ সনদ",
    titleEn: "Warish Certificate",
    iconName: "UserCheck2",
    description: "ওয়ারিশগণের নাম ও সম্পর্কের সরকারি প্রত্যয়ন"
  },
  {
    slug: "citizenship",
    titleBn: "নাগরিক সনদ",
    titleEn: "Citizenship Certificate",
    iconName: "ShieldCheck",
    description: "ইউনিয়ন পরিষদের স্থায়ী নাগরিকত্বের অফিসিয়াল সনদ"
  },
  {
    slug: "family",
    titleBn: "পারিবারিক সনদ",
    titleEn: "Family Certificate",
    iconName: "Home",
    description: "পরিবারের সদস্য ও কাঠামোর বিবরণ সনদ"
  },
  {
    slug: "same-name",
    titleBn: "একই নামের প্রত্যয়ন",
    titleEn: "Same Name Certificate",
    iconName: "FileCheck",
    description: "একই ব্যক্তির একাধিক ভিন্ন নামের সত্যতা প্রত্যয়ন"
  },
  {
    slug: "remarriage",
    titleBn: "পূনঃবিবাহ সনদ",
    titleEn: "Remarriage Certificate",
    iconName: "HeartHandshake",
    description: "পুনর্বিবাহের বিবরণ ও প্রত্যয়নপত্র"
  },
  {
    slug: "trade-license",
    titleBn: "পেশা ও জীবিকা লাইসেন্স",
    titleEn: "Trade & Occupation License",
    iconName: "Briefcase",
    description: "ইউনিয়ন পরিষদ এলাকার পেশা ও ব্যবসা পরিচালনার লাইসেন্স"
  },
  {
    slug: "testimonial",
    titleBn: "প্রত্যয়নপত্র",
    titleEn: "General Testimonial",
    iconName: "Award",
    description: "চারিত্রিক ও সাধারণ নাগরিক প্রত্যয়নপত্র"
  },
  {
    slug: "annual-income",
    titleBn: "বার্ষিক আয় প্রত্যয়ন",
    titleEn: "Annual Income Certificate",
    iconName: "Banknote",
    description: "আবেদনকারীর বা পরিবারের বার্ষিক আয়ের অফিসিয়াল সনদ"
  },
  {
    slug: "landless",
    titleBn: "ভূমিহীন প্রত্যয়ন",
    titleEn: "Landless Certificate",
    iconName: "MapPinOff",
    description: "ভূমিহীন পরিবারের তথ্য ও সরকারি সহায়তার প্রত্যয়ন"
  },
  {
    slug: "death-registration",
    titleBn: "মৃত্যু নিবন্ধন সনদ",
    titleEn: "Death Registration Certificate",
    iconName: "FileText",
    description: "জন্ম ও মৃত্যু নিবন্ধকের কার্যালয় কর্তৃক প্রস্তুতকৃত মৃত্যু নিবন্ধন সনদ"
  }
];

export const DUMMY_CERTIFICATES_DATA = CERTIFICATES_DATA_MAP;
