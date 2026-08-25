import { CertificateData } from "@/types/certificate";

export const WARISH_INITIAL_DATA: CertificateData = {
  id: "cert_warish",
  slug: "warish",
  titleBn: "ওয়ারিশ সনদ",
  titleEn: "Warish Certificate",
  badgeColor: "bg-red-800",
  union: {
    up_name: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
    up_name_en: "08 No Basantapur Union Parishad",
    upazila: "রাজবাড়ী সদর",
    upazila_en: "Rajbari Sadar",
    district: "রাজবাড়ী",
    district_en: "Rajbari",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000002",
    serial_no_en: "00000002",
    cert_title: "ওয়ারিশ সনদ",
    cert_title_en: "Warish Certificate",
    issue_date: "12-02-2023",
    issue_date_en: "12-02-2023"
  },
  applicant: {
    person_name: "মৃত- লতিফ খাঁ",
    person_name_en: "Late Latif Khan",
    nid_no: "5647382910",
    nid_no_en: "5647382910",
    father_name: "মৃত- হোচন খাঁ",
    father_name_en: "Late Hochan Khan",
    mother_name: "-",
    mother_name_en: "-",
    village: "উদয়পুর",
    village_en: "Udaypur",
    house_no: "00-00-0000-00",
    house_no_en: "00-00-0000-00",
    ward_no: "03",
    ward_no_en: "03",
    post_office: "বসন্তপুর",
    post_office_en: "Basantapur",
    person_upazila: "রাজবাড়ী সদর",
    person_upazila_en: "Rajbari Sadar",
    person_district: "রাজবাড়ী",
    person_district_en: "Rajbari",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_name_en: "Md. Sirajul Islam",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    signatory_role_en: "Chairman (Acting)",
    trn_no: "10424",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10424"
  },
  heirs: [
    { id: "1", name: "শরিফুন্নেছা (এন আইডি)", name_en: "Sharifunnesa (NID)", relation: "স্ত্রী", relation_en: "Wife", age_or_dob: "৬৬ বছর", age_or_dob_en: "66 Years", dob: "০৫-১১-১৯৫৭", dob_en: "05-11-1957", nid_or_bc: "", comments: "" },
    { id: "2", name: "মোঃ রহিম খাঁন (এন আইডি)", name_en: "Md. Rahim Khan (NID)", relation: "পুত্র", relation_en: "Son", age_or_dob: "৪৬ বছর", age_or_dob_en: "46 Years", dob: "০৫-০৩-১৯৭৭", dob_en: "05-03-1977", nid_or_bc: "", comments: "" },
    { id: "3", name: "মোঃ আবু জাফর খাঁন (এন আইডি)", name_en: "Md. Abu Jafar Khan (NID)", relation: "পুত্র", relation_en: "Son", age_or_dob: "৪২ বছর", age_or_dob_en: "42 Years", dob: "০২-১১-১৯৮১", dob_en: "02-11-1981", nid_or_bc: "", comments: "" },
    { id: "4", name: "রেবেকা বেগম (এন আইডি)", name_en: "Rebeka Begum (NID)", relation: "কন্যা", relation_en: "Daughter", age_or_dob: "৪০ বছর", age_or_dob_en: "40 Years", dob: "১৭-০২-১৯৮৩", dob_en: "17-02-1983", nid_or_bc: "", comments: "" },
    { id: "5", name: "মোছাঃ রুবি (এন আইডি)", name_en: "Mst. Rubi (NID)", relation: "কন্যা", relation_en: "Daughter", age_or_dob: "৩৬ বছর", age_or_dob_en: "36 Years", dob: "১২-০৩-১৯৮৭", dob_en: "12-03-1987", nid_or_bc: "", comments: "" },
    { id: "6", name: "রেখা বেগম (জন্ম নিবন্ধন)", name_en: "Rekha Begum (BC)", relation: "কন্যা", relation_en: "Daughter", age_or_dob: "৩৩ বছর", age_or_dob_en: "33 Years", dob: "০৪-০২-১৯৯০", dob_en: "04-02-1990", nid_or_bc: "", comments: "" },
    { id: "7", name: "মোঃ বাচ্চু খান (এন আইডি)", name_en: "Md. Bachchu Khan (NID)", relation: "পুত্র", relation_en: "Son", age_or_dob: "৩১ বছর", age_or_dob_en: "31 Years", dob: "২০-১১-১৯৯২", dob_en: "20-11-1992", nid_or_bc: "", comments: "" },
    { id: "8", name: "মোঃ সাচ্চু খান (এন আইডি)", name_en: "Md. Sachchu Khan (NID)", relation: "পুত্র", relation_en: "Son", age_or_dob: "২৬ বছর", age_or_dob_en: "26 Years", dob: "২০-১০-১৯৯৭", dob_en: "20-10-1997", nid_or_bc: "", comments: "" }
  ]
};
