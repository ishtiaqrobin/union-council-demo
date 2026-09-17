import { CertificateData } from "@/types/certificate";

export const PERMANENT_RESIDENT_INITIAL_DATA: CertificateData = {
  id: "cert_permanent_resident",
  slug: "permanent-resident",
  titleBn: "স্থায়ী বাসিন্দা সনদ",
  titleEn: "Permanent Resident Certificate",
  badgeColor: "bg-teal-700",
  union: {
    up_name: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
    up_name_en: "08 No Basantapur Union Parishad",
    upazila: "রাজবাড়ী সদর",
    upazila_en: "Rajbari Sadar",
    district: "রাজবাড়ী",
    district_en: "Rajbari",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000845",
    serial_no_en: "00000845",
    cert_title: "স্থায়ী বাসিন্দা সনদপত্র",
    cert_title_en: "Permanent Resident Certificate",
    issue_date: "12-08-2026",
    issue_date_en: "12-08-2026"
  },
  applicant: {
    person_name: "মোঃ তানভীর আহমেদ",
    person_name_en: "Md. Tanvir Ahmed",
    nid_no: "19985012345678901",
    nid_no_en: "19985012345678901",
    father_name: "মোঃ আব্দুল কাদের",
    father_name_en: "Md. Abdul Kader",
    mother_name: "মোছাঃ সুফিয়া খাতুন",
    mother_name_en: "Mosammat Sufia Khatun",
    village: "বসন্তপুর",
    village_en: "Basantapur",
    house_no: "০০-০০-০০০০-০০",
    house_no_en: "00-00-0000-00",
    ward_no: "০২",
    ward_no_en: "02",
    post_office: "বসন্তপুর-৭৮০০",
    post_office_en: "Basantapur-7800",
    person_upazila: "রাজবাড়ী সদর",
    person_upazila_en: "Rajbari Sadar",
    person_district: "রাজবাড়ী",
    person_district_en: "Rajbari",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ জাকির হোসেন সরদার",
    signatory_name_en: "Md. Zakir Hossain Sardar",
    signatory_role: "চেয়ারম্যান",
    signatory_role_en: "Chairman",
    trn_no: "72328",
    qr_url: "https://www.lgoms.org/prot_certificates.php?id=72328"
  },
  customDescriptionBn: "স্থানীয় ইউপি সদস্যের তদন্ত ও পরিষদীয় রেকর্ড অনুযায়ী জানা যায় যে, তিনি এবং তাহার পরিবার জন্মসূত্রে ও বংশানুক্রমিকভাবে অত্র ইউনিয়ন পরিষদের উল্লিখিত ঠিকানার স্থায়ী বাসিন্দা। তিনি কোনো সমাজ বা রাষ্ট্রবিরোধী কার্যকলাপে জড়িত নন এবং তার নৈতিক চরিত্র উত্তম।",
  customDescriptionEn: "According to investigation by the local UP Member and Parishad records, he/she and his/her family are permanent residents of the aforementioned address of this Union Parishad by birth and lineage. He/She is not involved in any anti-social or anti-state activities and bears an excellent moral character.",
  closingWishBn: "আমি তার ভবিষ্যৎ জীবনের সর্বাঙ্গীন কল্যাণ ও উন্নতি কামনা করি।",
  closingWishEn: "I wish him/her all success and prosperity in life."
};
