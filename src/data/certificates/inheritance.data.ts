import { CertificateData } from "@/types/certificate";

export const INHERITANCE_INITIAL_DATA: CertificateData = {
  id: "cert_inheritance",
  slug: "inheritance",
  titleBn: "উত্তরাধিকার সনদ",
  titleEn: "Inheritance Certificate",
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
    serial_no: "00000025",
    serial_no_en: "00000025",
    cert_title: "উত্তরাধিকার সনদ",
    cert_title_en: "Inheritance Certificate",
    issue_date: "15-07-2026",
    issue_date_en: "15-07-2026"
  },
  applicant: {
    person_name: "মোহাম্মদ আলী ফকির",
    person_name_en: "Mohammad Ali Fakir",
    nid_no: "0000000000",
    nid_no_en: "0000000000",
    father_name: "জহির উদ্দিন ফকির",
    father_name_en: "Zahir Uddin Fakir",
    mother_name: "ফুলজান বিবি",
    mother_name_en: "Fuljan Bibi",
    village: "বড় ভবানীপুর",
    village_en: "Boro Bhabanipur",
    house_no: "00-00-0000-00",
    house_no_en: "00-00-0000-00",
    ward_no: "09",
    ward_no_en: "09",
    post_office: "বসন্তপুর",
    post_office_en: "Basantapur",
    person_upazila: "রাজবাড়ী সদর",
    person_upazila_en: "Rajbari Sadar",
    person_district: "রাজবাড়ী",
    person_district_en: "Rajbari",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ জাকির হোসেন সরদার",
    signatory_name_en: "Md. Zakir Hossain Sardar",
    signatory_role: "চেয়ারম্যান",
    signatory_role_en: "Chairman",
    trn_no: "5708",
    qr_url: "https://www.lgoms.org/inheritance_certificates.php?id=10423"
  },
  heirs: [
    { id: "1", name: "মোছাঃ খাদিজা বেগম", name_en: "Mst. Khadija Begum", relation: "স্ত্রী", relation_en: "Wife", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "2", name: "বিল্লাল ফকির", name_en: "Billal Fakir", relation: "পুত্র", relation_en: "Son", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "3", name: "মোঃ শাহিন ফকির", name_en: "Md. Shahin Fakir", relation: "পুত্র", relation_en: "Son", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "4", name: "মোঃ কামাল ফকির", name_en: "Md. Kamal Fakir", relation: "পুত্র", relation_en: "Son", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "5", name: "মোঃ মিলন ফকির", name_en: "Md. Milon Fakir", relation: "পুত্র", relation_en: "Son", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "6", name: "লায়লানূর লতা", name_en: "Laylanur Lota", relation: "কন্যা", relation_en: "Daughter", age_or_dob: "", nid_or_bc: "", comments: "" }
  ]
};
