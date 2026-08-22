import { CertificateData } from "@/types/certificate";

export const REMARRIAGE_INITIAL_DATA: CertificateData = {
  id: "cert_remarriage",
  slug: "remarriage",
  titleBn: "পূনঃবিবাহ সনদ",
  titleEn: "Remarriage Certificate",
  badgeColor: "bg-amber-600",
  union: {
    up_name: "০৩ নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org"
  },
  meta: {
    serial_no: "00000078",
    cert_title: "পূনঃবিবাহ সনদ",
    issue_date: "05-08-2026"
  },
  applicant: {
    person_name: "মোছাঃ রোকেয়া সুলতানা",
    nid_no: "8790654321",
    father_name: "মোঃ আনিসুর রহমান",
    mother_name: "মোছাঃ ছালেহা বেগম",
    spouse_name: "মোঃ কামরুল হাসান",
    village: "আমঝুপি পশ্চিমপাড়া",
    house_no: "০৫",
    ward_no: "06",
    post_office: "আমঝুপি",
    person_upazila: "মেহেরপুর সদর",
    person_district: "মেহেরপুর"
  },
  signatory: {
    signatory_name: "মোঃ সিরাজুল ইসলাম",
    signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
    trn_no: "10428",
    qr_url: "https://www.lgoms.org/umc_certificates.php?id=10428"
  },
  remarriageReasonBn: "প্রথম স্বামীর ইন্তেকালের পর পারিবারিকভাবে গত ১০-০১-২০২৫ ইং তারিখে পুনরুদ্দেগ ও স্বীয় সম্মতিতে পুনঃবিবাহ বন্ধনে আবদ্ধ হন।"
};
