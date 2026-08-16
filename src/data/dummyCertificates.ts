import { CertificateData, CertificateMenuItem } from "@/types/certificate";

export const CERTIFICATE_MENU_ITEMS: CertificateMenuItem[] = [
  {
    slug: "unmarried",
    titleBn: "অবিবাহিত সনদ",
    titleEn: "Unmarried Certificate",
    iconName: "UserCheck",
    description: "আবেদনকারীর অবিবাহিত অবস্থা নিশ্চিতকরণ প্রত্যয়নপত্র"
  },
  {
    slug: "inheritance",
    titleBn: "উত্তরাধিকার সনদ",
    titleEn: "Inheritance Certificate",
    iconName: "Users",
    description: "মৃত ব্যক্তির সকল বৈধ উত্তরাধিকারীদের নামের তালিকা সম্বলিত সনদ"
  },
  {
    slug: "warish",
    titleBn: "ওয়ারিশ সনদ",
    titleEn: "Warish Certificate",
    iconName: "UserCheck2",
    description: "ওয়ারিশগণের নাম ও সম্পর্কের সরকারি প্রত্যয়ন"
  },
  {
    slug: "citizenship",
    titleBn: "নাগরিক সনদ",
    titleEn: "Citizenship Certificate",
    iconName: "ShieldCheck",
    description: "ইউনিয়ন পরিষদের স্থায়ী নাগরিকত্বের অফিসিয়াল সনদ"
  },
  {
    slug: "family",
    titleBn: "পারিবারিক সনদ",
    titleEn: "Family Certificate",
    iconName: "Home",
    description: "পরিবারের সদস্য ও কাঠামোর বিবরণ সনদ"
  },
  {
    slug: "same-name",
    titleBn: "একই নামের প্রত্যয়ন",
    titleEn: "Same Name Certificate",
    iconName: "FileCheck",
    description: "একই ব্যক্তির একাধিক ভিন্ন নামের সত্যতা প্রত্যয়ন"
  },
  {
    slug: "remarriage",
    titleBn: "পূনঃবিবাহ সনদ",
    titleEn: "Remarriage Certificate",
    iconName: "HeartHandshake",
    description: "পুনর্বিবাহের বিবরণ ও প্রত্যয়নপত্র"
  },
  {
    slug: "trade-license",
    titleBn: "পেশা ও জীবিকা লাইসেন্স",
    titleEn: "Trade & Occupation License",
    iconName: "Briefcase",
    description: "ইউনিয়ন পরিষদ এলাকার পেশা ও ব্যবসা পরিচালনার লাইসেন্স"
  },
  {
    slug: "testimonial",
    titleBn: "প্রত্যয়নপত্র",
    titleEn: "General Testimonial",
    iconName: "Award",
    description: "চারিত্রিক ও সাধারণ নাগরিক প্রত্যয়নপত্র"
  },
  {
    slug: "annual-income",
    titleBn: "বার্ষিক আয় প্রত্যয়ন",
    titleEn: "Annual Income Certificate",
    iconName: "Banknote",
    description: "আবেদনকারীর বা পরিবারের বার্ষিক আয়ের অফিসিয়াল সনদ"
  },
  {
    slug: "landless",
    titleBn: "ভূমিহীন প্রত্যয়ন",
    titleEn: "Landless Certificate",
    iconName: "MapPinOff",
    description: "ভূমিহীন পরিবারের তথ্য ও সরকারি সহায়তার প্রত্যয়ন"
  }
];

export const DEFAULT_UNION_INFO = {
  up_name: "০৩নং আমঝুপি ইউনিয়ন পরিষদ",
  upazila: "মেহেরপুর সদর",
  district: "মেহেরপুর",
  website: "www.lgoms.org"
};

export const DEFAULT_SIGNATORY_INFO = {
  signatory_name: "মোঃ সিরাজুল ইসলাম",
  signatory_role: "চেয়ারম্যান(ভারপ্রাপ্ত)",
  trn_no: "10422",
  qr_url: "https://www.lgoms.org/umc_certificates.php?id=10422"
};

export const DUMMY_CERTIFICATES_DATA: Record<string, CertificateData> = {
  unmarried: {
    id: "cert_unmarried",
    slug: "unmarried",
    titleBn: "অবিবাহিত সনদ",
    titleEn: "Unmarried Certificate",
    badgeColor: "bg-emerald-600",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000018",
      cert_title: "অবিবাহিত সনদ",
      issue_date: "29-06-2026"
    },
    applicant: {
      person_name: "মুনতাহির রহমান রহিত",
      nid_no: "7382309735",
      father_name: "মৃত মোঃ আবু তালেব",
      mother_name: "মোছাঃ কাজল রেখা",
      village: "আমঝুপি",
      house_no: "০০",
      ward_no: "04",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO }
  },

  inheritance: {
    id: "cert_inheritance",
    slug: "inheritance",
    titleBn: "উত্তরাধিকার সনদ",
    titleEn: "Inheritance Certificate",
    badgeColor: "bg-blue-600",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000025",
      cert_title: "উত্তরাধিকার সনদ",
      issue_date: "15-07-2026"
    },
    applicant: {
      person_name: "মোসাঃ রহিমা খাতুন",
      nid_no: "8273645190",
      father_name: "মৃত আব্দুল কুদ্দুস",
      mother_name: "মৃত জাহানারা বেগম",
      spouse_name: "মৃত রফিকুল ইসলাম",
      village: "আমঝুপি পূর্বপাড়া",
      house_no: "১২/এ",
      ward_no: "02",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10423", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10423" },
    heirs: [
      { id: "1", name: "মোসাঃ রহিমা খাতুন", relation: "স্ত্রী", age_or_dob: "৪৫ বছর", nid_or_bc: "8273645190", comments: "জীবিত" },
      { id: "2", name: "মোঃ শরিফুল ইসলাম", relation: "পুত্র", age_or_dob: "২৬ বছর", nid_or_bc: "9182736450", comments: "জীবিত" },
      { id: "3", name: "মোসাঃ নাসরিন আক্তার", relation: "কন্যা", age_or_dob: "২২ বছর", nid_or_bc: "5463728190", comments: "জীবিত" }
    ]
  },

  warish: {
    id: "cert_warish",
    slug: "warish",
    titleBn: "ওয়ারিশ সনদ",
    titleEn: "Warish Certificate",
    badgeColor: "bg-indigo-600",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000031",
      cert_title: "ওয়ারিশ সনদ",
      issue_date: "02-08-2026"
    },
    applicant: {
      person_name: "মোঃ খোরশেদ আলম",
      nid_no: "5647382910",
      father_name: "মৃত মোঃ মকবুল হোসেন",
      mother_name: "মৃত সুফিয়া খাতুন",
      village: "হিজলকান্দি",
      house_no: "৪৫",
      ward_no: "05",
      post_office: "হিজলকান্দি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10424", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10424" },
    heirs: [
      { id: "1", name: "মোঃ খোরশেদ আলম", relation: "পুত্র", age_or_dob: "৩৮ বছর", nid_or_bc: "5647382910", comments: "জীবিত" },
      { id: "2", name: "মোঃ জাহাঙ্গীর আলম", relation: "পুত্র", age_or_dob: "৩৫ বছর", nid_or_bc: "6758493021", comments: "জীবিত" },
      { id: "3", name: "মোছাঃ পারভীন আক্তার", relation: "কন্যা", age_or_dob: "৩১ বছর", nid_or_bc: "7869504132", comments: "জীবিত" }
    ]
  },

  citizenship: {
    id: "cert_citizenship",
    slug: "citizenship",
    titleBn: "নাগরিক সনদ",
    titleEn: "Citizenship Certificate",
    badgeColor: "bg-teal-600",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000042",
      cert_title: "নাগরিক সনদ",
      issue_date: "10-08-2026"
    },
    applicant: {
      person_name: "মোঃ তরিকুল ইসলাম",
      nid_no: "1987654321098",
      father_name: "মোঃ সামসুল হক",
      mother_name: "মোছাঃ ফরিদা বেগম",
      village: "চকশ্যামনগর",
      house_no: "০৮",
      ward_no: "01",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10425", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10425" }
  },

  family: {
    id: "cert_family",
    slug: "family",
    titleBn: "পারিবারিক সনদ",
    titleEn: "Family Certificate",
    badgeColor: "bg-purple-600",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000050",
      cert_title: "পারিবারিক সনদ",
      issue_date: "12-08-2026"
    },
    applicant: {
      person_name: "মোঃ আকরাম হোসেন",
      nid_no: "3452617890",
      father_name: "মোঃ জহিরুল ইসলাম",
      mother_name: "মোছাঃ আছিয়া বেগম",
      spouse_name: "মোছাঃ শাহানাজ পারভীন",
      village: "আমঝুপি মধ্যপাড়া",
      house_no: "১৭",
      ward_no: "03",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10426", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10426" },
    heirs: [
      { id: "1", name: "মোঃ আকরাম হোসেন", relation: "নিজ (গৃহপ্রধান)", age_or_dob: "৪০ বছর", nid_or_bc: "3452617890" },
      { id: "2", name: "মোছাঃ শাহানাজ পারভীন", relation: "স্ত্রী", age_or_dob: "৩৪ বছর", nid_or_bc: "4563728109" },
      { id: "3", name: "মোঃ তানভীর হোসেন", relation: "পুত্র", age_or_dob: "১২ বছর", nid_or_bc: "201473829102" }
    ]
  },

  "same-name": {
    id: "cert_same_name",
    slug: "same-name",
    titleBn: "একই নামের প্রত্যয়ন",
    titleEn: "Same Name Certificate",
    badgeColor: "bg-rose-600",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000064",
      cert_title: "একই নামের প্রত্যয়ন",
      issue_date: "14-08-2026"
    },
    applicant: {
      person_name: "মোঃ শাহজাহান আলী",
      nid_no: "6574839201",
      father_name: "মৃত মোঃ নিয়ামত আলী",
      mother_name: "মোছাঃ রমেছা খাতুন",
      village: "আমঝুপি উত্তরপাড়া",
      house_no: "২৩",
      ward_no: "04",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10427", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10427" },
    aliasNameBn: "মোঃ শাহজাহান শেখ"
  },

  remarriage: {
    id: "cert_remarriage",
    slug: "remarriage",
    titleBn: "পূনঃবিবাহ সনদ",
    titleEn: "Remarriage Certificate",
    badgeColor: "bg-amber-600",
    union: { ...DEFAULT_UNION_INFO },
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
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10428", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10428" },
    remarriageReasonBn: "প্রথম স্বামীর ইন্তেকালের পর পারিবারিকভাবে গত ১০-০১-২০২৫ ইং তারিখে পুনরুদ্দেগ ও স্বীয় সম্মতিতে পুনঃবিবাহ বন্ধনে আবদ্ধ হন।"
  },

  "trade-license": {
    id: "cert_trade_license",
    slug: "trade-license",
    titleBn: "পেশা ও জীবিকা লাইসেন্স",
    titleEn: "Trade & Occupation License",
    badgeColor: "bg-blue-700",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000089",
      cert_title: "পেশা ও জীবিকা লাইসেন্স",
      issue_date: "01-07-2026"
    },
    applicant: {
      person_name: "মোঃ আশরাফুল আলম",
      nid_no: "9081726354",
      father_name: "মোঃ আলতাফ হোসেন",
      mother_name: "মোছাঃ আমেনা খাতুন",
      village: "আমঝুপি বাজার রোড",
      house_no: "১০১",
      ward_no: "04",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10429", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10429" },
    businessNameBn: "মেসার্স আলম ট্রেডার্স",
    businessTypeBn: "মুদি ও সাধারণ ষ্টোর ব্যবসা",
    licenseFeeBn: "১,৫০০/- (এক হাজার পাঁচশত টাকা)",
    customDescriptionBn: "মেয়াদ ৩০-জুন-২০২৭ পর্যন্ত কার্যকর থাকিবে।"
  },

  testimonial: {
    id: "cert_testimonial",
    slug: "testimonial",
    titleBn: "প্রত্যয়নপত্র",
    titleEn: "General Testimonial",
    badgeColor: "bg-slate-700",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000095",
      cert_title: "প্রত্যয়নপত্র",
      issue_date: "11-08-2026"
    },
    applicant: {
      person_name: "মোঃ মাহমুদুল হাসান",
      nid_no: "7685940321",
      father_name: "মোঃ লিয়াকত আলী",
      mother_name: "মোছাঃ ফাতেমা বেগম",
      village: "আমঝুপি",
      house_no: "১৫",
      ward_no: "04",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10430", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10430" },
    customDescriptionBn: "তিনি অত্র ইউনিয়নের একজন স্থায়ী বাসিন্দা ও সৎ, চরিত্রবান ও আইনমান্যকারী নাগরিক। রাষ্ট্র বা সমাজ বিরোধী কোন কার্যকলাপে তাহার জড়িত থাকার তথ্য পাওয়া যায় নাই।"
  },

  "annual-income": {
    id: "cert_annual_income",
    slug: "annual-income",
    titleBn: "বার্ষিক আয় প্রত্যয়ন",
    titleEn: "Annual Income Certificate",
    badgeColor: "bg-emerald-700",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000102",
      cert_title: "বার্ষিক আয় প্রত্যয়ন",
      issue_date: "13-08-2026"
    },
    applicant: {
      person_name: "মোঃ রফিকুল ইসলাম",
      nid_no: "5463728109",
      father_name: "মৃত মোঃ ইসমাইল হোসেন",
      mother_name: "মোছাঃ সফুরা বেগম",
      village: "আমঝুপি মাঠপাড়া",
      house_no: "৭৭",
      ward_no: "05",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10431", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10431" },
    incomeAmountBn: "১,৮০,০০০/- (এক লক্ষ আশি হাজার টাকা মাত্র)"
  },

  landless: {
    id: "cert_landless",
    slug: "landless",
    titleBn: "ভূমিহীন প্রত্যয়ন",
    titleEn: "Landless Certificate",
    badgeColor: "bg-cyan-700",
    union: { ...DEFAULT_UNION_INFO },
    meta: {
      serial_no: "00000115",
      cert_title: "ভূমিহীন প্রত্যয়ন",
      issue_date: "16-08-2026"
    },
    applicant: {
      person_name: "মোঃ লালচাঁদ শেখ",
      nid_no: "1234567890123",
      father_name: "মৃত মেহের আলী শেখ",
      mother_name: "মৃত আনোয়ারা বেগম",
      village: "আমঝুপি নদীর ধার",
      house_no: "০০",
      ward_no: "02",
      post_office: "আমঝুপি",
      person_upazila: "মেহেরপুর সদর",
      person_district: "মেহেরপুর"
    },
    signatory: { ...DEFAULT_SIGNATORY_INFO, trn_no: "10432", qr_url: "https://www.lgoms.org/umc_certificates.php?id=10432" },
    landDetailsBn: "উহার নিজের নামে বা পরিবারের কোন সদস্যের নামে কোন প্রকার কৃষি বা অকৃষি জমিজমা নাই। তিনি সম্পূর্ণ ভূমিহীন ও দিনমজুর।"
  }
};
