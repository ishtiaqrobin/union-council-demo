export interface LicenseFinancialItem {
  id: string;
  label: string;
  amount: string;
}

export interface TradeLicenseData {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  fiscalYearBn: string; // অর্থ বছর e.g. "২০২৫-২০২৬"
  fiscalYearEn?: string;
  union: {
    up_name: string;
    up_name_en?: string;
    upazila: string;
    upazila_en?: string;
    district: string;
    district_en?: string;
    website: string;
  };
  meta: {
    license_no: string;
    license_no_en?: string;
    license_id: string;
    license_id_en?: string;
    ward_no: string;
    ward_no_en?: string;
    circle_road_mohalla: string;
    circle_road_mohalla_en?: string;
    issue_date: string;
    issue_date_en?: string;
    renewal_date: string;
    renewal_date_en?: string;
    valid_until_date: string;
    valid_until_date_en?: string;
  };
  business: {
    institution_name: string; // প্রতিষ্ঠানের নাম
    institution_name_en?: string;
    business_type: string;    // ব্যবসার ধরন
    business_type_en?: string;
    business_nature: string;  // ব্যবসার প্রকৃতি
    business_nature_en?: string;
    business_place: string;   // ব্যবসার স্থান
    business_place_en?: string;
  };
  owner: {
    name: string;
    name_en?: string;
    father_name: string;
    father_name_en?: string;
    mother_name: string;
    mother_name_en?: string;
    spouse_name?: string;
    spouse_name_en?: string;
    permanent_address: string;
    permanent_address_en?: string;
    present_address: string;
    present_address_en?: string;
    nid_or_bc: string;
    nid_or_bc_en?: string;
    tin_no?: string;
    bin_no?: string;
    tax_zone?: string;
    tax_zone_en?: string;
    mobile_no: string;
    mobile_no_en?: string;
    email?: string;
    photo_url?: string;
  };
  financials: {
    license_fee: string;
    arrear_fee: string;
    signboard_tax: string;
    vat: string;
    profession_tax: string;
    total_amount: string;
    amount_in_words: string;
    amount_in_words_en?: string;
  };
  signatory: {
    left_name: string;
    left_name_en?: string;
    left_role: string;
    left_role_en?: string;
    right_name: string;
    right_name_en?: string;
    right_role: string;
    right_role_en?: string;
    trn_no: string;
    qr_url: string;
  };
}

export interface VehicleLicenseData {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  fiscalYearBn: string; // অর্থ বছর e.g. "২০২২-২০২৩"
  fiscalYearEn?: string;
  union: {
    up_name: string;
    up_name_en?: string;
    upazila: string;
    upazila_en?: string;
    district: string;
    district_en?: string;
    website: string;
  };
  meta: {
    license_no: string;
    license_no_en?: string;
    license_id: string;
    license_id_en?: string;
    issue_date: string;
    issue_date_en?: string;
    renewal_date: string;
    renewal_date_en?: string;
    valid_until_date: string;
    valid_until_date_en?: string;
    renewal_deadline_date: string;
    renewal_deadline_date_en?: string;
  };
  vehicle: {
    name: string;        // যানবাহনের নাম e.g. P.S.V PLUS DOLPHIN LINE
    name_en?: string;
    type: string;        // যানবাহনের ধরণ
    type_en?: string;
    route_place: string; // চলাচলের স্থান e.g. ঢাকা-ফরিদপুর-রাজবাড়ী
    route_place_en?: string;
  };
  owner: {
    name: string;
    name_en?: string;
    father_or_husband_name: string;
    father_or_husband_name_en?: string;
    mother_name: string;
    mother_name_en?: string;
    permanent_address: string;
    permanent_address_en?: string;
    present_address: string;
    present_address_en?: string;
    nid_no: string;
    nid_no_en?: string;
    mobile_no: string;
    mobile_no_en?: string;
    photo_url?: string;
  };
  financials: {
    license_fee: string;
    arrear_fee: string;
    profession_tax: string;
    nameplate_tax: string;
    miscellaneous: string;
    vat_income_tax: string;
    total_amount: string;
    amount_in_words: string;
    amount_in_words_en?: string;
  };
  signatory: {
    left_name: string;
    left_name_en?: string;
    left_role: string;
    left_role_en?: string;
    right_name: string;
    right_name_en?: string;
    right_role: string;
    right_role_en?: string;
    trn_no: string;
    qr_url: string;
  };
}

export interface ProfessionLicenseData {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  fiscalYearBn: string; // অর্থ বছর e.g. "২০২৫-২০২৬"
  fiscalYearEn?: string;
  union: {
    up_name: string;
    up_name_en?: string;
    upazila: string;
    upazila_en?: string;
    district: string;
    district_en?: string;
    website: string;
  };
  meta: {
    license_no: string;
    license_no_en?: string;
    issue_date: string;
    issue_date_en?: string;
    renewal_date: string;
    renewal_date_en?: string;
    valid_until_date: string;
    valid_until_date_en?: string;
  };
  business: {
    institution_name: string; // প্রতিষ্ঠানের নাম
    institution_name_en?: string;
    business_type: string;    // ব্যবসার ধরণ
    business_type_en?: string;
    business_place: string;   // ব্যবসার স্থান
    business_place_en?: string;
  };
  owner: {
    name: string;
    name_en?: string;
    father_or_husband_name: string;
    father_or_husband_name_en?: string;
    mother_name: string;
    mother_name_en?: string;
    address: string;          // ঠিকানা
    address_en?: string;
    mobile_no?: string;
    mobile_no_en?: string;
    photo_url?: string;
  };
  financials: {
    fee_amount: string;       // ফি প্রদানের পরিমাণ (১৫% ভ্যাটসহ) e.g. "৩৪৫/-/-"
    fee_amount_en?: string;
    amount_in_words: string;  // কথায় e.g. "তিন শত পঁতাল্লিশ টাকা মাত্র।"
    amount_in_words_en?: string;
  };
  signatory: {
    name: string;
    name_en?: string;
    role: string;
    role_en?: string;
    trn_no: string;
    qr_url: string;
  };
}
