export interface UnionInfo {
  up_name: string;
  up_name_en?: string;
  upazila: string;
  upazila_en?: string;
  district: string;
  district_en?: string;
  website: string;
}

export interface CertMeta {
  serial_no: string;
  serial_no_en?: string;
  cert_title: string;
  cert_title_en?: string;
  issue_date: string;
  issue_date_en?: string;
  cert_id?: string;
  cert_id_en?: string;
  ward_no?: string;
  ward_no_en?: string;
  circle_road_mohalla?: string;
  circle_road_mohalla_en?: string;
  application_date?: string;
  application_date_en?: string;
}

export interface ApplicantInfo {
  person_name: string;
  person_name_en?: string;
  nid_no: string;
  nid_no_en?: string;
  birth_reg_no?: string;
  birth_reg_no_en?: string;
  dob?: string;
  dob_en?: string;
  father_name: string;
  father_name_en?: string;
  mother_name: string;
  mother_name_en?: string;
  spouse_name?: string;
  spouse_name_en?: string;
  village: string;
  village_en?: string;
  house_no: string;
  house_no_en?: string;
  ward_no: string;
  ward_no_en?: string;
  post_office: string;
  post_office_en?: string;
  person_upazila: string;
  person_upazila_en?: string;
  person_district: string;
  person_district_en?: string;
  mobile_no?: string;
  mobile_no_en?: string;
  photo_url?: string;
}

export interface SignatoryInfo {
  signatory_name: string;
  signatory_name_en?: string;
  signatory_role: string;
  signatory_role_en?: string;
  trn_no: string;
  qr_url: string;
}

export interface HeirItem {
  id: string;
  name: string;
  name_en?: string;
  relation: string;
  relation_en?: string;
  age_or_dob: string;
  age_or_dob_en?: string;
  dob?: string;
  dob_en?: string;
  nid_or_bc: string;
  comments?: string;
  comments_en?: string;
}

export interface CertificateData {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  badgeColor?: string;
  union: UnionInfo;
  meta: CertMeta;
  applicant: ApplicantInfo;
  signatory: SignatoryInfo;
  // Specific extras
  heirs?: HeirItem[];
  /**
   * ========================================================================
   * THE BLOCKS THE BACKEND PRODUCES — added when the Demo was reconciled with
   * `ICertificateRenderData` (see `lib/certificate-source.ts`).
   * ========================================================================
   *
   * 🔴 EVERY FIELD BELOW IS OPTIONAL, AND THAT IS THE CONTRACT, NOT LAZINESS. Each one
   * belongs to SOME certificates and not others — a deceased person exists on a warish or
   * death certificate and on no other; a name-discrepancy table exists only on "one name";
   * an income figure only on the income certificate. A REQUIRED field would force every
   * sheet to invent a value for a fact it does not have, and an invented value on a signed
   * document is worse than a blank one.
   *
   * ⚠️ A SHEET MUST PRINT NOTHING FOR AN ABSENT BLOCK — never a dash, never "—", never an
   * empty table with headers. A dash reads as "this fact is empty", which on a certificate
   * is a claim; the truth is "this fact does not belong to this document".
   */

  // ── §৩.২ · §৩.৩ · §৩.১২ — the person the certificate is ABOUT ─────────────
  deceasedNameBn?: string;
  deceasedNameEn?: string;
  deceasedFatherNameBn?: string;
  deceasedMotherNameBn?: string;
  deceasedSpouseNameBn?: string;
  deceasedNidNo?: string;
  deceasedBirthRegNo?: string;
  deceasedGenderBn?: string;
  deceasedVillageBn?: string;
  deceasedWardBn?: string;
  deceasedPhotoUrl?: string;
  /** Relation of the APPLICANT to the person who died. */
  relationWithDeceasedBn?: string;
  dateOfBirthBn?: string;
  dateOfDeathBn?: string;
  dateOfDeathEn?: string;
  /**
   * ⚠️ COMPOSED BY THE BACKEND, NOT BY A SHEET. BDRIS prints a death date in words, and the
   * format is a government convention rather than a design choice — a sheet that re-derived
   * it could print a different shape from the union next door.
   */
  dateOfDeathInWordsBn?: string;
  medicalDeathCertNo?: string;

  // ── §৪.৫ — counts, DERIVED at render and never stored ─────────────────────
  /**
   * 🔴 WHY THE COUNTS ARRIVE SEPARATELY FROM `heirs`. A stored "৪ জন" and a list will
   * disagree one day, and the paper would then say four while the table shows five names. So
   * the backend computes them at print time — and a sheet must READ them rather than counting
   * the rows itself, because a sheet that counted would show a different number from the
   * public verification page for the same document.
   */
  heirCountsBn?: {
    son: string;
    daughter: string;
    spouse: string;
    father: string;
    mother: string;
    brother: string;
    sister: string;
    other: string;
    /** Rows that were the head of the family themselves — `total` excludes them. */
    self: string;
    total: string;
    totalInWords: string;
  };

  // ── §৩.৯ — the same name spelled differently across documents ─────────────
  discrepanciesBn?: {
    serialNo: string;
    subject: string;
    primaryName: string;
    aliasName: string;
    remarks?: string;
  }[];

  // ── §৩.৫ — income, ALWAYS annual (a monthly answer was ×12 at render) ─────
  incomeAmountBn?: string;
  incomeAmountEn?: string;
  incomeInWordsBn?: string;
  /** `true` when the citizen answered monthly and the figure above was annualised. */
  incomeWasMonthly?: boolean;

  // ── §১২.৩ — the term, and the verdict the SERVER reached ─────────────────
  issuedAtBn?: string;
  expiresAtBn?: string;
  /**
   * ⚠️ THE ENGLISH FORM OF THE TERM, FOR THE SAME REASON `meta.issue_date_en` EXISTS. `expiresAtBn`
   * holds Bengali words ("১৫ এপ্রিল ২০২৭"), so an English certificate printing it said
   * "Valid until: ১৫ এপ্রিল ২০২৭" — a Bengali date under an English heading, which is the exact
   * class of silent value the platform's English guard exists to catch.
   */
  expiresAtEn?: string;
  /**
   * 🔴 THE SERVER'S VERDICT, NOT A COMPARISON. A sheet must never compute this from
   * `expiresAt` against `new Date()`: the browser's clock is the citizen's to change, and a
   * certificate that claimed to be valid because a laptop was set back a year would be the
   * exact false assurance §১২.৩ exists to remove.
   */
  isExpired?: boolean;
  /** `true` on the eight permanent certificates — no date is printed at all. */
  isPermanent?: boolean;

  // ── §১২.৭ — how the document is handed over ─────────────────────────────
  delivery?: {
    requiresInPerson: boolean;
    instructionBn: string;
  };

  // ── §৩.১১ — the NOC's land block, the only land-based certificate in the system ──
  /**
   * 🔴 WHY THE LAND DETAILS ARE A BLOCK AND NOT A SENTENCE.
   *
   * An NOC is an OPINION — not a permission — and it is the only certificate here that reaches a
   * court or RAJUK. Its opinion is about a SPECIFIC PLOT, so a khata number that does not identify
   * one makes the document useless: "the union has no objection" without saying to what. The
   * block exists so a reader can check each identifier against the deed, which a prose paragraph
   * would make impossible.
   */
  nocOrganization?: string;
  nocSubjectBn?: string;
  /**
   * ⚠️ EVERY ENUMERATED FIELD HAS BOTH FORMS, BECAUSE THE BACKEND STORES A CODE. `nocSubject` is
   * `BUILDING_CONSTRUCTION`, so each printer names it in its own language — and an NOC reaches a
   * court, where an English reader is checking the line against a deed.
   */
  nocSubjectEn?: string;
  nocPurposeBn?: string;
  nocPurposeEn?: string;
  nocPlaceBn?: string;
  nocPlaceEn?: string;
  /** মৌজার নাম — the revenue village, which is NOT the same as the postal village. */
  mouzaName?: string;
  khatianNo?: string;
  halDagNo?: string;
  landTypeBn?: string;
  landTypeEn?: string;
  /** ১ শতাংশ ≈ ৪০ m². Printed with its unit, because "৫৫" alone is not a quantity. */
  landAreaBn?: string;
  landAreaEn?: string;
  landOwnershipBn?: string;
  landOwnershipEn?: string;
  /** The scanned map and the deed, as the form collected them. */
  mouzaMapUrl?: string;
  landDeedUrl?: string;

  // ── Legacy design-preview fields, kept so the older sheets still type-check ──
  incomeAmountBnLegacy?: string;
  businessNameBn?: string;
  businessTypeBn?: string;
  licenseFeeBn?: string;
  aliasNameBn?: string;
  aliasNameEn?: string;
  remarriageReasonBn?: string;
  remarriageReasonEn?: string;
  landDetailsBn?: string;
  landDetailsEn?: string;
  attestationSubjectBn?: string;
  attestationSubjectEn?: string;
  customDescriptionBn?: string;
  customDescriptionEn?: string;
  closingWishBn?: string;
  closingWishEn?: string;
  // Death Registration extras
  registrationDateBn?: string;
  registrationDateEn?: string;
  registrationNoBn?: string;
  registrationNoEn?: string;
  genderBn?: string;
  genderEn?: string;
  permanentAddressBn?: string;
  permanentAddressEn?: string;
  presentAddressBn?: string;
  presentAddressEn?: string;
  causeOfDeathBn?: string;
  causeOfDeathEn?: string;
  placeOfDeathBn?: string;
  placeOfDeathEn?: string;
  leftSignatoryNameBn?: string;
  leftSignatoryNameEn?: string;
  leftSignatoryRoleBn?: string;
  leftSignatoryRoleEn?: string;
  middleSignatoryNameBn?: string;
  middleSignatoryNameEn?: string;
  middleSignatoryRoleBn?: string;
  middleSignatoryRoleEn?: string;
  fiscalYearBn?: string;
  fiscalYearEn?: string;
  nocFeeAmount?: string;
}

export interface CertificateMenuItem {
  slug: string;
  titleBn: string;
  titleEn: string;
  iconName: string;
  description: string;
}
