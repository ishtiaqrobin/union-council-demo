import { CertificateData } from "@/types/certificate";

export const CITIZENSHIP_INITIAL_DATA: CertificateData = {
  id: "cert_citizenship",
  slug: "citizenship",
  titleBn: "নাগরিক সনদ",
  titleEn: "Citizenship Certificate",
  badgeColor: "bg-red-800",
  union: {
    up_name: "০৩ নং আমঝুপি ইউনিয়ন পরিষদ",
    up_name_en: "03 No Amjhupi Union Parishad",
    upazila: "মেহেরপুর সদর",
    upazila_en: "Meherpur Sadar",
    district: "মেহেরপুর",
    district_en: "Meherpur",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00002692",
    serial_no_en: "00002692",
    cert_title: "নাগরিক সনদপত্র",
    cert_title_en: "Citizenship Certificate",
    issue_date: "12-08-2026",
    issue_date_en: "12-08-2026"
  },
  applicant: {
    person_name: "ফরিদা",
    person_name_en: "Farida",
    nid_no: "3251971085",
    nid_no_en: "3251971085",
    father_name: "মোঃ মঙ্গল সরদার",
    father_name_en: "Md. Monggol Sardar",
    mother_name: "রুবি",
    mother_name_en: "Rubi",
    village: "উদয়পুর",
    village_en: "Udaypur",
    house_no: "০০-০০-০০০০-০০",
    house_no_en: "00-00-0000-00",
    ward_no: "03",
    ward_no_en: "03",
    post_office: "উদয়পুর-৭৮০০",
    post_office_en: "Udaypur-7800",
    person_upazila: "রাজবাড়ী সদর",
    person_upazila_en: "Rajbari Sadar",
    person_district: "রাজবাড়ী",
    person_district_en: "Rajbari",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_name_en: "Md. Sirajul Islam",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    signatory_role_en: "Chairman (Acting)",
    trn_no: "669745",
    qr_url: "https://www.lgoms.org/cc_certificates.php?id=669745"
  }
};
