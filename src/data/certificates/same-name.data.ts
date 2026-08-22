import { CertificateData } from "@/types/certificate";

export const SAME_NAME_INITIAL_DATA: CertificateData = {
  id: "cert_same_name",
  slug: "same-name",
  titleBn: "একই নামের প্রত্যয়ন",
  titleEn: "Same Name Certificate",
  badgeColor: "bg-green-700",
  union: {
    up_name: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
    upazila: "রাজবাড়ী সদর",
    district: "রাজবাড়ী",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000816",
    cert_title: "একই নামের প্রত্যয়ন",
    issue_date: "12-08-2026"
  },
  applicant: {
    person_name: "রহমান পাল",
    nid_no: "1903607958",
    father_name: "ফেলু পাল",
    mother_name: "তারা বেগম",
    village: "খালিশা সোনাপুর",
    house_no: "00-00-0000-00",
    ward_no: "০৬",
    post_office: "উদয়পুর-৭৮০০",
    person_upazila: "রাজবাড়ী সদর",
    person_district: "রাজবাড়ী",
    photo_url: "/assets/image/person.webp"
  },
  signatory: {
    signatory_name: "মোঃ জাকির হোসেন সরদার",
    signatory_role: "চেয়ারম্যান",
    trn_no: "57637",
    qr_url: "https://www.lgoms.org/snp_certificates_view.php?id=57637"
  },
  aliasNameBn: "মোহাঃ রহমত পাল"
};
