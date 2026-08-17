import { CertificateData } from "@/types/certificate";

export const WARISH_INITIAL_DATA: CertificateData = {
  id: "cert_warish",
  slug: "warish",
  titleBn: "ওয়ারিশ সনদ",
  titleEn: "Warish Certificate",
  badgeColor: "bg-indigo-600",
  union: {
    up_name: "০৩নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000031",
    cert_title: "ওয়ারিশ সনদ",
    issue_date: "02-08-2026"
  },
  applicant: {
    person_name: "মোঃ খোরশেদ আলম",
    nid_no: "5647382910",
    father_name: "মৃত মোঃ মকবুল হোসেন",
    mother_name: "মৃত সুফিয়া খাতুন",
    village: "হিজলকান্দি",
    house_no: "৪৫",
    ward_no: "05",
    post_office: "হিজলকান্দি",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "10424",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10424"
  },
  heirs: [
    { id: "1", name: "মোঃ খোরশেদ আলম", relation: "পুত্র", age_or_dob: "৩৮ বছর", nid_or_bc: "5647382910", comments: "জীবিত" },
    { id: "2", name: "মোঃ জাহাঙ্গীর আলম", relation: "পুত্র", age_or_dob: "৩৫ বছর", nid_or_bc: "6758493021", comments: "জীবিত" },
    { id: "3", name: "মোছাঃ পারভীন আক্তার", relation: "কন্যা", age_or_dob: "৩১ বছর", nid_or_bc: "7869504132", comments: "জীবিত" }
  ]
};
