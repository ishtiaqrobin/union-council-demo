import { CertificateData } from "@/types/certificate";

export const FAMILY_INITIAL_DATA: CertificateData = {
  id: "cert_family",
  slug: "family",
  titleBn: "পারিবারিক সনদ",
  titleEn: "Family Certificate",
  badgeColor: "bg-red-800",
  union: {
    up_name: "০৩ নং আমঝুপি ইউনিয়ন পরিষদ",
    up_name_en: "03 No. Amjhupi Union Parishad",
    upazila: "মেহেরপুর সদর",
    upazila_en: "Meherpur Sadar",
    district: "মেহেরপুর",
    district_en: "Meherpur",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000279",
    serial_no_en: "00000279",
    cert_title: "পারিবারিক সনদ",
    cert_title_en: "Family Certificate",
    issue_date: "10-08-2026",
    issue_date_en: "10-08-2026"
  },
  applicant: {
    person_name: "মোঃ এলাহী আলামিন",
    person_name_en: "Md. Elahi Alamin",
    nid_no: "3452617890",
    nid_no_en: "3452617890",
    father_name: "মোঃ ইলফাজ উদ্দিন",
    father_name_en: "Md. Ilfaz Uddin",
    mother_name: "মোছাঃ জাহানারা খাতুন",
    mother_name_en: "Mst. Jahanara Khatun",
    village: "হিজুলী",
    village_en: "Hijuli",
    house_no: "00-00-0000-00",
    house_no_en: "00-00-0000-00",
    ward_no: "07",
    ward_no_en: "07",
    post_office: "হিজুলী",
    post_office_en: "Hijuli",
    person_upazila: "মেহেরপুর সদর",
    person_upazila_en: "Meherpur Sadar",
    person_district: "মেহেরপুর",
    person_district_en: "Meherpur",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_name_en: "Md. Sirajul Islam",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    signatory_role_en: "Chairman (Acting)",
    trn_no: "7450",
    qr_url: "https://www.lgoms.org/re_certificates_view.php?id=7450"
  },
  heirs: [
    { id: "1", name: "মোঃ ইলফাজদ্দীন", name_en: "Md. Ilfazuddin", relation: "পিতা", relation_en: "Father", dob: "11-03-1962", age_or_dob: "৬৪ বছর", nid_or_bc: "", comments: "" },
    { id: "2", name: "মোছাঃ জাহানারা খাতুন", name_en: "Mst. Jahanara Khatun", relation: "মাতা", relation_en: "Mother", dob: "28-03-1967", age_or_dob: "৫৯ বছর", nid_or_bc: "", comments: "" },
    { id: "3", name: "মোছাঃ মুক্তা খাতুন", name_en: "Mst. Mukta Khatun", relation: "বোন", relation_en: "Sister", dob: "27-03-1988", age_or_dob: "৩৮ বছর", nid_or_bc: "", comments: "" },
    { id: "4", name: "মোঃ এলাহী আলামিন", name_en: "Md. Elahi Alamin", relation: "নিজ", relation_en: "Self", dob: "12-01-1991", age_or_dob: "৩৫ বছর", nid_or_bc: "", comments: "" }
  ]
};
