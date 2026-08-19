import { ProfessionLicenseData } from "@/types/license";

export const PROFESSION_LICENSE_INITIAL_DATA: ProfessionLicenseData = {
  id: "profession-license",
  slug: "profession-license",
  titleBn: "পেশা ও জীবিকা লাইসেন্স",
  titleEn: "Profession & Occupation License",
  fiscalYearBn: "২০২৫-২০২৬",
  union: {
    up_name: "০৩নং আমঝুপি ইউনিয়ন পরিষদ",
    upazila: "মেহেরপুর সদর",
    district: "মেহেরপুর",
    website: "www.lgoms.org",
  },
  meta: {
    license_no: "২৮৯",
    issue_date: "১১-০৮-২০২৫",
    renewal_date: "০১-০৭-২০২৫",
    valid_until_date: "৩০-০৬-২০২৬",
  },
  business: {
    institution_name: "মেসার্স জোনাইদ স্টোর",
    business_type: "স্টেশন নারী ও কসমেটিক্স পণ্য সরবরাহকারী",
    business_place: "কোলা",
  },
  owner: {
    name: "মোঃ শাহীদুজ্জামান খান (7346189520)",
    father_or_husband_name: "আব্দুল কাদের আলী খান",
    mother_name: "মোছাঃ জাহানারা খাতুন",
    address: "০০,কোলা ,বিলকোলা ,মেহেরপুর সদর,মেহেরপুর",
    photo_url: "/assets/image/person.webp",
  },
  financials: {
    fee_amount: "৩৪৫/-/-",
    amount_in_words: "তিন শত পঁতাল্লিশ টাকা মাত্র।",
  },
  signatory: {
    name: "মোঃ সিরাজুল ইসলাম",
    role: "চেয়ারম্যান",
    trn_no: "289",
    qr_url: "https://www.lgoms.org/prof_certificates_view.php?id=289",
  },
};
