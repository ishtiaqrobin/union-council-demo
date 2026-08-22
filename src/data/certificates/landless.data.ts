import { CertificateData } from "@/types/certificate";

export const LANDLESS_INITIAL_DATA: CertificateData = {
  id: "cert_landless",
  slug: "landless",
  titleBn: "ভূমিহীন প্রত্যয়ন",
  titleEn: "Landless Certificate",
  badgeColor: "bg-cyan-700",
  union: {
    up_name: "০৩ নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000115",
    cert_title: "ভূমিহীন প্রত্যয়ন",
    issue_date: "16-08-2026"
  },
  applicant: {
    person_name: "মোঃ লালচাঁদ শেখ",
    nid_no: "1234567890123",
    father_name: "মৃত মেহের আলী শেখ",
    mother_name: "মৃত আনোয়ারা বেগম",
    village: "আমঝুপি নদীর ধার",
    house_no: "০০",
    ward_no: "০২",
    post_office: "আমঝুপি",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "10432",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10432"
  },
  landDetailsBn: "আমার জানামতে তার কোন জায়গা জমি নাই। তিনি একজন ভূমিহীন।"
};
