import { CertificateData } from "@/types/certificate";

export const FAMILY_INITIAL_DATA: CertificateData = {
  id: "cert_family",
  slug: "family",
  titleBn: "পারিবারিক সনদ",
  titleEn: "Family Certificate",
  badgeColor: "bg-purple-600",
  union: {
    up_name: "০৩নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000050",
    cert_title: "পারিবারিক সনদ",
    issue_date: "12-08-2026"
  },
  applicant: {
    person_name: "মোঃ আকরাম হোসেন",
    nid_no: "3452617890",
    father_name: "মোঃ জহিরুল ইসলাম",
    mother_name: "মোছাঃ আছিয়া বেগম",
    spouse_name: "মোছাঃ শাহানাজ পারভীন",
    village: "আমঝুপি মধ্যপাড়া",
    house_no: "১৭",
    ward_no: "03",
    post_office: "আমঝুপি",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "10426",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10426"
  },
  heirs: [
    { id: "1", name: "মোঃ আকরাম হোসেন", relation: "নিজ (গৃহপ্রধান)", age_or_dob: "৪০ বছর", nid_or_bc: "3452617890" },
    { id: "2", name: "মোছাঃ শাহানাজ পারভীন", relation: "স্ত্রী", age_or_dob: "৩৪ বছর", nid_or_bc: "4563728109" },
    { id: "3", name: "মোঃ তানভীর হোসেন", relation: "পুত্র", age_or_dob: "১২ বছর", nid_or_bc: "201473829102" }
  ]
};
