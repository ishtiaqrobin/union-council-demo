import { CertificateData } from "@/types/certificate";

export const UNMARRIED_INITIAL_DATA: CertificateData = {
  id: "cert_unmarried",
  slug: "unmarried",
  titleBn: "অবিবাহিত সনদ",
  titleEn: "Unmarried Certificate",
  badgeColor: "bg-emerald-600",
  union: {
    up_name: "০৩ নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000018",
    cert_title: "অবিবাহিত সনদ",
    issue_date: "29-06-2026"
  },
  applicant: {
    person_name: "মুনতাহির রহমান রহিত",
    nid_no: "7382309735",
    father_name: "মৃত মোঃ আবু তালেব",
    mother_name: "মোছাঃ কাজল রেখা",
    village: "আমঝুপি",
    house_no: "০০",
    ward_no: "04",
    post_office: "আমঝুপি",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "10422",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10422"
  }
};
