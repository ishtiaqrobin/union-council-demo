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
    business_type: string; // ব্যবসার ধরন
    business_type_en?: string;
    business_nature: string; // ব্যবসার প্রকৃতি
    business_nature_en?: string;
    business_place: string; // ব্যবসার স্থান
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
    penalty?: string;
    miscellaneous?: string;
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
  /**
   * Which languages this certificate can be printed in, and the words to use when an
   * English field has no English (plan §১৬).
   *
   * 🔴 WHY THE NOTE COMES FROM THE CONTRACT AND NOT FROM THIS COMPONENT. It is a
   * statement about the document's provenance — "this is the Bengali record's name,
   * not a translation" — and the platform fixes the wording so that two unions
   * cannot print two different sentences for the same fact. A literal here would be
   * a second home for one fact, and the two would drift.
   *
   * ⚠️ `missingEnglish` is NOT what the sheet uses. The sheet resolves every line as
   * it renders it, so it already knows which ones fell back; the list exists for a
   * printer that renders blind, and for auditing a union whose data is untranslated.
   *
   * ⚠️ A NAMED INTERFACE, REFERENCED BY ALL THREE LICENCE TYPES. Written out three
   * times it would be three places to forget when the backend's
   * `ILicenceCertificateLang` gains a field — and the sheet that was forgotten would
   * silently print no note.
   */
  lang?: LicenseCertificateLang;
}

/** The `lang` block every licence certificate carries. See the note above. */
export interface LicenseCertificateLang {
  available?: ("bn" | "en")[];
  missingEnglish?: string[];
  fallbackNote?: string;
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
    name: string; // যানবাহনের নাম e.g. P.S.V PLUS DOLPHIN LINE
    name_en?: string;
    type: string; // যানবাহনের ধরণ
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
  /**
   * Where this certificate sits among the licences of one application — e.g.
   * "ফ্লিটের ২ / ৩" — or absent for an ordinary single licence.
   *
   * 🔴 WHY IT IS ON THE DOCUMENT AND NOT IN THE NUMBER. One application may license
   * several vehicles, and the union rejected `-A/-B/-C` suffixes: a second numbering
   * rule would also leave gaps in the sequence, because a fleet of three consumes three
   * numbers and a later single licence would then appear to skip one. The grouping is
   * therefore printed, and the backend derives it by counting siblings — never by
   * parsing the serial.
   *
   * `null` (never `১ / ১`) for a single licence, so the line disappears rather than
   * claiming that a second certificate exists.
   */
  fleet?: {
    index: number;
    size: number;
    labelBn: string;
    labelEn: string;
  } | null;
  /**
   * The same language contract the trade certificate carries, and for the same reason:
   * a Bengali value printed on the English sheet must say so.
   *
   * 🔴 ADDED WHEN THE PLAN CLAIMED IT ALREADY EXISTED. The trade sheet printed the
   * note and this one did not, so the SAME fact read two ways across two documents —
   * exactly what plan §১৬.৪ forbids. This sheet printed a bare Bengali name with
   * nothing to mark it as untranslated, and a reader of the English document could
   * not tell it from a name that really had been transliterated.
   */
  lang?: LicenseCertificateLang;
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
    business_type: string; // ব্যবসার ধরণ
    business_type_en?: string;
    business_place: string; // ব্যবসার স্থান
    business_place_en?: string;
  };
  owner: {
    name: string;
    name_en?: string;
    father_or_husband_name: string;
    father_or_husband_name_en?: string;
    mother_name: string;
    mother_name_en?: string;
    /**
     * ⚠️ TWO ADDRESSES, NAMED AS THE SHARED CERTIFICATE CONTRACT NAMES THEM.
     *
     * This block used to carry a single `address`, which could not express what the form
     * collects — a present AND a permanent address — so one of them was silently dropped.
     * `TradeLicenseData` and `VehicleLicenseData` already read `present_address` /
     * `permanent_address`, so the odd name is gone rather than aliased: a contract three
     * certificates share must not grow a duplicate of a field it already has, for the
     * benefit of one consumer.
     */
    present_address: string;
    present_address_en?: string;
    mobile_no?: string;
    mobile_no_en?: string;
    photo_url?: string;
  };
  financials: {
    /**
     * The fee paid, VAT included — e.g. `৳৩৪৫` on the printed specimen.
     *
     * ✅ `total_amount` AND NO `_en` TWIN. A figure is written in Latin on both sheets, so
     * there is nothing to translate and no English field that could ever be empty. The old
     * `fee_amount_en || fee_amount` pair therefore carried a fallback that could never fire,
     * under a name (`fee_amount`) that neither sibling used.
     */
    total_amount: string;
    amount_in_words: string; // কথায় e.g. "তিন শত পঁতাল্লিশ টাকা মাত্র।"
    amount_in_words_en?: string;
  };
  signatory: {
    /**
     * ⚠️ THE LEFT SLOT IS THE ISSUING OFFICER. `buildCertificateBlock` maps the secretary
     * to `left_*` and the chairman to `right_*`, and a profession certificate carries ONE
     * signature — the counter that issued it. The trade and vehicle sheets print both.
     */
    left_name: string;
    left_name_en?: string;
    left_role: string;
    left_role_en?: string;
    trn_no: string;
    qr_url: string;
  };
  /** The language contract — see `LicenseCertificateLang`. */
  lang?: LicenseCertificateLang;
}
