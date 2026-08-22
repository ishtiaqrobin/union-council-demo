import { CertificateData } from "@/types/certificate";

export const WARISH_INITIAL_DATA: CertificateData = {
  id: "cert_warish",
  slug: "warish",
  titleBn: "ওয়ারিশ সনদ",
  titleEn: "Warish Certificate",
  badgeColor: "bg-red-800",
  union: {
    up_name: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
    upazila: "রাজবাড়ী সদর",
    district: "রাজবাড়ী",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000002",
    cert_title: "ওয়ারিশ সনদ",
    issue_date: "12-02-2023"
  },
  applicant: {
    person_name: "মৃত- লতিফ খাঁ",
    nid_no: "5647382910",
    father_name: "মৃত- হোচন খাঁ",
    mother_name: "-",
    village: "উদয়পুর",
    house_no: "00-00-0000-00",
    ward_no: "03",
    post_office: "বসন্তপুর",
    person_upazila: "রাজবাড়ী সদর",
    person_district: "রাজবাড়ী",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "10424",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10424"
  },
  heirs: [
    { id: "1", name: "শরিফুন্নেছা (এন আইডি)", relation: "স্ত্রী", age_or_dob: "৬৬ বছর", dob: "05-11-1957", nid_or_bc: "", comments: "" },
    { id: "2", name: "মোঃ রহিম খাঁন (এন আইডি)", relation: "পুত্র", age_or_dob: "৪৬ বছর", dob: "05-03-1977", nid_or_bc: "", comments: "" },
    { id: "3", name: "মোঃ আবু জাফর খাঁন (এন আইডি)", relation: "পুত্র", age_or_dob: "৪২ বছর", dob: "02-11-1981", nid_or_bc: "", comments: "" },
    { id: "4", name: "রেবেকা বেগম (এন আইডি)", relation: "কন্যা", age_or_dob: "৪০ বছর", dob: "17-02-1983", nid_or_bc: "", comments: "" },
    { id: "5", name: "মোছাঃ রুবি (এন আইডি)", relation: "কন্যা", age_or_dob: "৩৬ বছর", dob: "12-03-1987", nid_or_bc: "", comments: "" },
    { id: "6", name: "রেখা বেগম (জন্ম নিবন্ধন)", relation: "কন্যা", age_or_dob: "৩৩ বছর", dob: "04-02-1990", nid_or_bc: "", comments: "" },
    { id: "7", name: "মোঃ বাচ্চু খান (এন আইডি)", relation: "পুত্র", age_or_dob: "৩১ বছর", dob: "20-11-1992", nid_or_bc: "", comments: "" },
    { id: "8", name: "মোঃ সাচ্চু খান (এন আইডি)", relation: "পুত্র", age_or_dob: "২৬ বছর", dob: "20-10-1997", nid_or_bc: "", comments: "" }
  ]
};
