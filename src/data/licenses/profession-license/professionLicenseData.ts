import { ProfessionLicenseData } from "@/types/license";

export const PROFESSION_LICENSE_INITIAL_DATA: ProfessionLicenseData = {
  id: "profession-license",
  slug: "profession-license",
  titleBn: "পেশা ও জীবিকা লাইসেন্স",
  titleEn: "Profession & Occupation License",
  fiscalYearBn: "২০২৫-২০২৬",
  fiscalYearEn: "2025-2026",
  union: {
    up_name: "০৩ নং আমঝুপি ইউনিয়ন পরিষদ",
    up_name_en: "03 No Amjhupi Union Parishad",
    upazila: "মেহেরপুর সদর",
    upazila_en: "Meherpur Sadar",
    district: "মেহেরপুর",
    district_en: "Meherpur",
    website: "www.lgoms.org",
  },
  meta: {
    license_no: "২৮৯",
    license_no_en: "289",
    issue_date: "১১-০৮-২০২৫",
    issue_date_en: "11-08-2025",
    renewal_date: "০১-০৭-২০২৫",
    renewal_date_en: "01-07-2025",
    valid_until_date: "৩০-০৬-২০২৬",
    valid_until_date_en: "30-06-2026",
  },
  business: {
    institution_name: "মেসার্স জোনাইদ স্টোর",
    institution_name_en: "M/S Jonayed Store",
    business_type: "স্টেশন নারী ও কসমেটিক্স পণ্য সরবরাহকারী",
    business_type_en: "Stationery & Cosmetics Supplier",
    business_place: "কোলা",
    business_place_en: "Kola",
  },
  owner: {
    name: "মোঃ শাহীদুজ্জামান খান (7346189520)",
    name_en: "Md. Shahiduzzaman Khan (7346189520)",
    father_or_husband_name: "আব্দুল কাদের আলী খান",
    father_or_husband_name_en: "Abdul Kader Ali Khan",
    mother_name: "মোছাঃ জাহানারা খাতুন",
    mother_name_en: "Mst. Jahanara Khatun",
    /**
     * ⚠️ ONE ADDRESS LINE BECOMES TWO, as the form collects them. The sheet prints the
     * PRESENT address (the line it always printed) and the type now also carries the
     * permanent one, because a single `address` field could not hold both and dropped one
     * of the applicant's answers.
     */
    present_address: "০০, কোলা, বিলকোলা, মেহেরপুর সদর, মেহেরপুর",
    present_address_en: "00, Kola, Bilkola, Meherpur Sadar, Meherpur",
    mobile_no: "01752242603",
    mobile_no_en: "01752242603",
    photo_url: "/assets/image/person.webp",
  },
  financials: {
    /**
     * ✅ ONE FIELD, NO ENGLISH TWIN. A figure is written in Latin on both sheets, so
     * `total_amount` needs no `_en` partner — and the old `fee_amount_en` therefore had a
     * fallback that could never fire.
     */
    total_amount: "৩৪৫/-",
    amount_in_words: "তিন শত পঁতাল্লিশ টাকা মাত্র।",
    amount_in_words_en: "Three Hundred Forty-Five Taka Only.",
  },
  signatory: {
    /**
     * The ISSUING officer, which `buildCertificateBlock` puts in the LEFT slot. A
     * profession certificate carries one signature — the counter that issued it — where a
     * trade or vehicle certificate carries the secretary and the chairman.
     */
    left_name: "মোঃ সিরাজুল ইসলাম",
    left_name_en: "Md. Sirajul Islam",
    left_role: "চেয়ারম্যান",
    left_role_en: "Chairman",
    trn_no: "289",
    qr_url: "https://www.lgoms.org/prof_certificates_view.php?id=289",
  },
  /**
   * The block the backend's `ILicenceCertificate` carries.
   *
   * `missingEnglish: []` because this sample is fully translated, so the sheet prints
   * no fallback note — which is the correct output. To SEE the note, clear an English
   * field in the form and switch the sheet to English: the Bengali value stays and the
   * note appears beside it.
   */
  lang: {
    available: ["bn", "en"],
    missingEnglish: [],
    fallbackNote: "(as per the Bengali record)",
  },
};
