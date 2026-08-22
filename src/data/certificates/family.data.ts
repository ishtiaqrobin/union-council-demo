import { CertificateData } from "@/types/certificate";

export const FAMILY_INITIAL_DATA: CertificateData = {
  id: "cert_family",
  slug: "family",
  titleBn: "পারিবারিক সনদ",
  titleEn: "Family Certificate",
  badgeColor: "bg-red-800",
  union: {
    up_name: "০৩নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000279",
    cert_title: "পারিবারিক সনদ",
    issue_date: "10-08-2026"
  },
  applicant: {
    person_name: "মোঃ এলাহী আলামিন",
    nid_no: "3452617890",
    father_name: "মোঃ ইলফাজ উদ্দিন",
    mother_name: "মোছাঃ জাহানারা খাতুন",
    village: "হিজুলী",
    house_no: "00-00-0000-00",
    ward_no: "07",
    post_office: "হিজুলী",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "7450",
    qr_url: "https://www.lgoms.org/re_certificates_view.php?id=7450"
  },
  heirs: [
    { id: "1", name: "মোঃ ইলফাজদ্দীন", relation: "পিতা", dob: "11-03-1962", age_or_dob: "৬৪ বছর", nid_or_bc: "", comments: "" },
    { id: "2", name: "মোছাঃ জাহানারা খাতুন", relation: "মাতা", dob: "28-03-1967", age_or_dob: "৫৯ বছর", nid_or_bc: "", comments: "" },
    { id: "3", name: "মোছাঃ মুক্তা খাতুন", relation: "বোন", dob: "27-03-1988", age_or_dob: "৩৮ বছর", nid_or_bc: "", comments: "" },
    { id: "4", name: "মোঃ এলাহী আলামিন", relation: "নিজ", dob: "12-01-1991", age_or_dob: "৩৫ বছর", nid_or_bc: "", comments: "" }
  ]
};
