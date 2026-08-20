import { CertificateData } from "@/types/certificate";

export const CITIZENSHIP_INITIAL_DATA: CertificateData = {
  id: "cert_citizenship",
  slug: "citizenship",
  titleBn: "নাগরিক সনদ",
  titleEn: "Citizenship Certificate",
  badgeColor: "bg-red-800",
  union: {
    up_name: "০৩নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00002692",
    cert_title: "নাগরিক সনদপত্র",
    issue_date: "12-08-2026"
  },
  applicant: {
    person_name: "মোঃ শিপন",
    nid_no: "1513835494",
    father_name: "মৃত আঃ জলিল",
    mother_name: "মোছাঃ সুফিয়া খাতুন",
    village: "খোকসা",
    house_no: "০০",
    ward_no: "01",
    post_office: "আমঝুপি",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "669745",
    qr_url: "https://www.lgoms.org/cc_certificates.php?id=669745"
  }
};
