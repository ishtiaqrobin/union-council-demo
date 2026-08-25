import { CertificateData } from "@/types/certificate";

export const REMARRIAGE_INITIAL_DATA: CertificateData = {
  id: "cert_remarriage",
  slug: "remarriage",
  titleBn: "পূনঃবিবাহ সনদ",
  titleEn: "Non-Remarriage Certificate",
  badgeColor: "bg-green-700",
  union: {
    up_name: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
    up_name_en: "08 No. Basantapur Union Parishad",
    upazila: "রাজবাড়ী সদর",
    upazila_en: "Rajbari Sadar",
    district: "রাজবাড়ী",
    district_en: "Rajbari",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000008",
    serial_no_en: "00000008",
    cert_title: "পূনবিবাহ না হওয়া সনদ",
    cert_title_en: "Non-Remarriage Certificate",
    issue_date: "09-08-2026",
    issue_date_en: "09-08-2026"
  },
  applicant: {
    person_name: "মোছাঃ জুলেখা বেগম",
    person_name_en: "Mst. Zulekha Begum",
    nid_no: "3253480820",
    nid_no_en: "3253480820",
    father_name: "",
    father_name_en: "",
    mother_name: "হাজেরা বেগম",
    mother_name_en: "Hajera Begum",
    spouse_name: "মৃত- মোঃ ফজের আলী মোল্লা",
    spouse_name_en: "Late Md. Fazer Ali Molla",
    village: "মহারাজপুর",
    village_en: "Maharajpur",
    house_no: "00-00-0000-00",
    house_no_en: "00-00-0000-00",
    ward_no: "০৪",
    ward_no_en: "04",
    post_office: "উদয়পুর-৭৮০০",
    post_office_en: "Udaypur-7800",
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
    trn_no: "1500",
    qr_url: "https://www.lgoms.org/rmc_certificates_view.php?id=1500"
  }
};
