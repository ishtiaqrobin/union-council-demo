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
  union: {
    up_name: string;
    upazila: string;
    district: string;
    website: string;
  };
  meta: {
    license_no: string;
    license_id: string;
    ward_no: string;
    circle_road_mohalla: string;
    issue_date: string;
    renewal_date: string;
    valid_until_date: string;
  };
  business: {
    institution_name: string; // প্রতিষ্ঠানের নাম
    business_type: string;    // ব্যবসার ধরন
    business_nature: string;  // ব্যবসার প্রকৃতি
    business_place: string;   // ব্যবসার স্থান
  };
  owner: {
    name: string;
    father_name: string;
    mother_name: string;
    spouse_name?: string;
    permanent_address: string;
    present_address: string;
    nid_or_bc: string;
    tin_no?: string;
    bin_no?: string;
    tax_zone?: string;
    mobile_no: string;
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
  };
  signatory: {
    left_name: string;
    left_role: string;
    right_name: string;
    right_role: string;
    trn_no: string;
    qr_url: string;
  };
}
