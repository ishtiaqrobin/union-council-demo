import { CertificateData } from "@/types/certificate";

export const INHERITANCE_INITIAL_DATA: CertificateData = {
  id: "cert_inheritance",
  slug: "inheritance",
  titleBn: "উত্তরাধিকার সনদ",
  titleEn: "Inheritance Certificate",
  badgeColor: "bg-blue-600",
  union: {
    up_name: "০৩নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000025",
    cert_title: "উত্তরাধিকার সনদ",
    issue_date: "15-07-2026"
  },
  applicant: {
    person_name: "মোসাঃ রহিমা খাতুন",
    nid_no: "8273645190",
    father_name: "মৃত আব্দুল কুদ্দুস",
    mother_name: "মৃত জাহানারা বেগম",
    spouse_name: "মৃত রফিকুল ইসলাম",
    village: "আমঝুপি পূর্বপাড়া",
    house_no: "১২/এ",
    ward_no: "02",
    post_office: "আমঝুপি",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "10423",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10423"
  },
  heirs: [
    { id: "1", name: "মোসাঃ রহিমা খাতুন", relation: "স্ত্রী", age_or_dob: "৪৫ বছর", nid_or_bc: "8273645190", comments: "জীবিত" },
    { id: "2", name: "মোঃ শরিফুল ইসলাম", relation: "পুত্র", age_or_dob: "২৬ বছর", nid_or_bc: "9182736450", comments: "জীবিত" },
    { id: "3", name: "মোসাঃ নাসরিন আক্তার", relation: "কন্যা", age_or_dob: "২২ বছর", nid_or_bc: "5463728190", comments: "জীবিত" }
  ]
};
