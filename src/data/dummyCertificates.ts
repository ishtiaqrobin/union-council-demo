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
  },
  {
    slug: "new-voter",
    titleBn: "নতুন ভোটার প্রত্যয়ন",
    titleEn: "New Voter Certificate",
    iconName: "UserPlus",
    description: "নতুন ভোটার তালিকায় নাম অন্তর্ভুক্তির জন্য অফিসিয়াল প্রত্যয়নপত্র"
  },
  {
    slug: "voter-transfer",
    titleBn: "ভোটার এলাকা স্থানান্তর প্রত্যয়ন",
    titleEn: "Voter Area Transfer Certificate",
    iconName: "ArrowRightLeft",
    description: "এক এলাকা বা স্বামীর ঠিকানায় ভোটার এলাকা স্থানান্তরের প্রত্যয়ন ও সুপারিশপত্র"
  },
  {
    slug: "permanent-resident",
    titleBn: "স্থায়ী বাসিন্দা সনদ",
    titleEn: "Permanent Resident Certificate",
    iconName: "Home",
    description: "বংশানুক্রমিক ও স্থায়ী নাগরিকত্ব প্রমাণের অফিসিয়াল সনদপত্র"
  },
  {
    /**
     * 🔴 THE FIFTEENTH CERTIFICATE, AND THE ONLY LAND-BASED ONE.
     *
     * It was absent from this list because it was absent from the CATALOGUE: the v3 guideline
     * names `NOC_CERTIFICATE` among the fifteen services, and the backend answered `ABSENT` for it
     * — no service row, no seed, no form, no sheet. A menu is the visible half of that gap: a union
     * could not offer the certificate, and a designer could not see what it should look like.
     *
     * ⚠️ `FileCheck` IS THE ICON BECAUSE THE DOCUMENT IS AN OPINION ABOUT A PLOT rather than a fact
     * about a person — a reader of this menu should be able to tell at a glance that this is the one
     * certificate asking for a mouza, a khatian and a dag.
     */
    slug: "noc",
    titleBn: "অনাপত্তি সনদ (এনওসি)",
    titleEn: "No Objection Certificate (NOC)",
    iconName: "FileCheck",
    description:
      "ভবন নির্মাণ, কারখানা বা টাওয়ার স্থাপনের জন্য জমির দলিল-খতিয়ানসহ অনাপত্তি সনদ"
  }
];

export const DUMMY_CERTIFICATES_DATA = CERTIFICATES_DATA_MAP;
