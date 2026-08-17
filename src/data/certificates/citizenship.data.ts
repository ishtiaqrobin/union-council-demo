import { CertificateData } from "@/types/certificate";

export const CITIZENSHIP_INITIAL_DATA: CertificateData = {
  id: "cert_citizenship",
  slug: "citizenship",
  titleBn: "নাগরিক সনদ",
  titleEn: "Citizenship Certificate",
  badgeColor: "bg-teal-600",
  union: {
    up_name: "০৩নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000042",
    cert_title: "নাগরিক সনদ",
    issue_date: "10-08-2026"
  },
  applicant: {
    person_name: "মোঃ তরিকুল ইসলাম",
    nid_no: "1987654321098",
    father_name: "মোঃ সামসুল হক",
    mother_name: "মোছাঃ ফরিদা বেগম",
    village: "চকশ্যামনগর",
    house_no: "০৮",
    ward_no: "01",
    post_office: "আমঝুপি",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "10425",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10425"
  }
};
