import { CertificateData } from "@/types/certificate";

/**
 * অনাপত্তি সনদ (NOC) — The 15th certificate (Environmental & Construction NOC)
 * Exactly mirrors the real-world Union Council PDF format:
 * - Portrait A4 page layout
 * - QR code on top left, Passport Photo on top right
 * - 6-row metadata section (সনদ নং, সনদ আইডি, ওয়ার্ড নং, সার্কেল/রাস্তা/মহল্লা, ইস্যু তারিখ, আবেদন তারিখ)
 * - Preamble legal authorization under Union Parishad Act 2009
 * - 10-point numbered details list
 * - 11. Schedule of Land (১১। তফসীল বিবরণী) table
 * - Financial acknowledgement receipt line
 * - 3-column official signatories (হিসাবসহকারী/প্রস্তুতকারী, প্রশাসনিক কর্মকর্তা, চেয়ারম্যান)
 */
export const NOC_INITIAL_DATA: CertificateData = {
  id: "cert_noc",
  slug: "noc",
  titleBn: "অনাপত্তি সনদ",
  titleEn: "No Objection Certificate",
  badgeColor: "bg-red-800",
  fiscalYearBn: "2025-2026",
  fiscalYearEn: "2025-2026",
  union: {
    up_name: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
    up_name_en: "08 No Basantapur Union Parishad",
    upazila: "রাজবাড়ী সদর",
    upazila_en: "Rajbari Sadar",
    district: "রাজবাড়ী",
    district_en: "Rajbari",
    website: "www.lgoms.org",
  },
  meta: {
    serial_no: "00000001",
    serial_no_en: "00000001",
    cert_id: "29-0166-0674-00000001",
    cert_id_en: "29-0166-0674-00000001",
    ward_no: "03",
    ward_no_en: "03",
    circle_road_mohalla: "বসন্তপুর ইউপি",
    circle_road_mohalla_en: "Basantapur UP",
    issue_date: "06-10-2025",
    issue_date_en: "06-10-2025",
    application_date: "06-10-2025",
    application_date_en: "06-10-2025",
    cert_title: "অনাপত্তি সনদ",
    cert_title_en: "No Objection Certificate",
  },
  applicant: {
    person_name: "মোঃ বাবুল মিয়া",
    person_name_en: "Md. Babul Mia",
    father_name: "মোঃ মহিউদ্দীন মিয়া",
    father_name_en: "Md. Mohiuddin Mia",
    mother_name: "সুফিয়া বেগম",
    mother_name_en: "Sufia Begum",
    nid_no: "9131605223",
    nid_no_en: "9131605223",
    mobile_no: "01874291799",
    mobile_no_en: "01874291799",
    village: "নিথরিয়া",
    village_en: "Nitharia",
    post_office: "মাকড়াইল-৭৮৫০",
    post_office_en: "Makrail-7850",
    person_upazila: "মধুখালী",
    person_upazila_en: "Madhukhali",
    person_district: "ফরিদপুর",
    person_district_en: "Faridpur",
    house_no: "",
    ward_no: "03",
    ward_no_en: "03",
    photo_url: "/assets/image/person.jpg",
  },
  nocOrganization: "কবিতা ডক্টর্স ল্যাব",
  nocSubjectBn: "পরিবেশগত অনাপত্তি",
  nocSubjectEn: "Environmental Clearance",
  nocPurposeBn: "পরিবেশগত অনাপত্তি,ছোট বাণিজ্যিক স্থাপনা বা ব্যবসা প্রতিষ্ঠান নির্মান",
  nocPurposeEn: "Environmental Clearance, Construction of Small Commercial Structure or Business Establishment",
  nocPlaceBn: "উদয়পুর",
  nocPlaceEn: "Udaypur",
  permanentAddressBn: "গ্রামঃ নিথরিয়া, ডাকঘরঃ মাকড়াইল-৭৮৫০, মধুখালী, ফরিদপুর।",
  permanentAddressEn: "Village: Nitharia, Post: Makrail-7850, Madhukhali, Faridpur.",
  presentAddressBn: "গ্রামঃ নিথরিয়া, ডাকঘরঃ মাকড়াইল-৭৮৫০, মধুখালী, ফরিদপুর।",
  presentAddressEn: "Village: Nitharia, Post: Makrail-7850, Madhukhali, Faridpur.",

  // Schedule of Land (১১। তফসীল বিবরণী)
  mouzaName: "উদয়পুর",
  khatianNo: "1457",
  halDagNo: "24",
  landAreaBn: "12",
  landAreaEn: "12",

  // Acknowledgement receipt fee
  nocFeeAmount: "1000.00",

  // Signatories (3 columns as in official PDF)
  leftSignatoryNameBn: "হিসাবসহকারী/প্রস্তুতকারী",
  leftSignatoryNameEn: "Accounts Assistant / Prepared by",
  leftSignatoryRoleBn: "০৮ নং বসন্তপুর ইউনিয়ন পরিষদ",
  leftSignatoryRoleEn: "08 No Basantapur Union Parishad",

  middleSignatoryNameBn: "সৈয়দ মেহেদী মাসুদ",
  middleSignatoryNameEn: "Syed Mehdi Masud",
  middleSignatoryRoleBn: "প্রশাসনিক কর্মকর্তা",
  middleSignatoryRoleEn: "Administrative Officer",

  signatory: {
    signatory_name: "মোঃ জাকির হোসেন সরদার",
    signatory_name_en: "Md. Zakir Hossain Sardar",
    signatory_role: "চেয়ারম্যান",
    signatory_role_en: "Chairman",
    trn_no: "29-0166-0674-00000001",
    qr_url: "https://www.lgoms.org/verify?id=29-0166-0674-00000001",
  },

  issuedAtBn: "06-10-2025",
  expiresAtBn: "06-04-2026",
  expiresAtEn: "2026-04-06",
  isExpired: false,
  isPermanent: false,
};
