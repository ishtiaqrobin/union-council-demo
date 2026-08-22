import { CertificateData } from "@/types/certificate";

export const REMARRIAGE_INITIAL_DATA: CertificateData = {
  id: "cert_remarriage",
  slug: "remarriage",
  titleBn: "পূনঃবিবাহ সনদ",
  titleEn: "Remarriage Certificate",
  badgeColor: "bg-green-700",
  union: {
    up_name: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
    upazila: "রাজবাড়ী সদর",
    district: "রাজবাড়ী",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000008",
    cert_title: "পূনবিবাহ না হওয়া সনদ",
    issue_date: "09-08-2026"
  },
  applicant: {
    person_name: "মোছাঃ জুলেখা বেগম",
    nid_no: "3253480820",
    father_name: "মৃত- মোঃ ফজের আলী মোল্লা",
    mother_name: "হাজেরা বেগম",
    spouse_name: "মৃত- মোঃ ফজের আলী মোল্লা",
    village: "মহারাজপুর",
    house_no: "00-00-0000-00",
    ward_no: "০৪",
    post_office: "উদয়পুর-৭৮০০",
    person_upazila: "রাজবাড়ী সদর",
    person_district: "রাজবাড়ী",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ জাকির হোসেন সরদার",
    signatory_role: "চেয়ারম্যান",
    trn_no: "1500",
    qr_url: "https://www.lgoms.org/rmc_certificates_view.php?id=1500"
  }
};
