import { CertificateData } from "@/types/certificate";

export const INHERITANCE_INITIAL_DATA: CertificateData = {
  id: "cert_inheritance",
  slug: "inheritance",
  titleBn: "উত্তরাধিকার সনদ",
  titleEn: "Inheritance Certificate",
  badgeColor: "bg-red-800",
  union: {
    up_name: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
    upazila: "রাজবাড়ী সদর",
    district: "রাজবাড়ী",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000025",
    cert_title: "উত্তরাধিকার সনদ",
    issue_date: "15-07-2026"
  },
  applicant: {
    person_name: "মোহাম্মদ আলী ফকির",
    nid_no: "0000000000",
    father_name: "জহির উদ্দিন ফকির",
    mother_name: "ফুলজান বিবি",
    village: "বড় ভবানীপুর",
    house_no: "00-00-0000-00",
    ward_no: "09",
    post_office: "বসন্তপুর",
    person_upazila: "রাজবাড়ী সদর",
    person_district: "রাজবাড়ী",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ জাকির হোসেন সরদার",
    signatory_role: "চেয়ারম্যান",
    trn_no: "5708",
    qr_url: "https://www.lgoms.org/inheritance_certificates.php?id=10423"
  },
  heirs: [
    { id: "1", name: "মোছাঃ খাদিজা বেগম", relation: "স্ত্রী", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "2", name: "বিল্লাল ফকির", relation: "পুত্র", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "3", name: "মোঃ শাহিন ফকির", relation: "পুত্র", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "4", name: "মোঃ কামাল ফকির", relation: "পুত্র", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "5", name: "মোঃ মিলন ফকির", relation: "পুত্র", age_or_dob: "", nid_or_bc: "", comments: "" },
    { id: "6", name: "লায়লানূর লতা", relation: "কন্যা", age_or_dob: "", nid_or_bc: "", comments: "" }
  ]
};
