import { CertificateData } from "@/types/certificate";

export const UNMARRIED_INITIAL_DATA: CertificateData = {
  id: "cert_unmarried",
  slug: "unmarried",
  titleBn: "অবিবাহিত সনদ",
  titleEn: "Unmarried Certificate",
  badgeColor: "bg-emerald-600",
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
    serial_no: "00000018",
    serial_no_en: "00000018",
    cert_title: "অবিবাহিত সনদ",
    cert_title_en: "Unmarried Certificate",
    issue_date: "29-06-2026",
    issue_date_en: "29-06-2026"
  },
  applicant: {
    person_name: "মুনতাহির রহমান রহিত",
    person_name_en: "Muntahir Rahman Rohit",
    nid_no: "7382309735",
    nid_no_en: "7382309735",
    father_name: "মৃত মোঃ আবু তালেব",
    father_name_en: "Late Md. Abu Taleb",
    mother_name: "মোছাঃ কাজল রেখা",
    mother_name_en: "Mst. Kajol Rekha",
    village: "আমঝুপি",
    village_en: "Amjhupi",
    house_no: "০০",
    house_no_en: "00",
    ward_no: "04",
    ward_no_en: "04",
    post_office: "আমঝুপি",
    post_office_en: "Amjhupi",
    person_upazila: "মেহেরপুর সদর",
    person_upazila_en: "Meherpur Sadar",
    person_district: "মেহেরপুর",
    person_district_en: "Meherpur"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_name_en: "Md. Sirajul Islam",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    signatory_role_en: "Chairman (Acting)",
    trn_no: "10422",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10422"
  }
};
