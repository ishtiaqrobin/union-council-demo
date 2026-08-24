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
}

export interface ApplicantInfo {
  person_name: string;
  person_name_en?: string;
  nid_no: string;
  nid_no_en?: string;
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
  relation: string;
  age_or_dob: string;
  dob?: string;
  nid_or_bc: string;
  comments?: string;
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
  incomeAmountBn?: string;
  businessNameBn?: string;
  businessTypeBn?: string;
  licenseFeeBn?: string;
  aliasNameBn?: string;
  remarriageReasonBn?: string;
  landDetailsBn?: string;
  customDescriptionBn?: string;
  closingWishBn?: string;
  // Death Registration extras
  registrationDateBn?: string;
  registrationNoBn?: string;
  dateOfDeathBn?: string;
  dateOfDeathInWordsBn?: string;
  genderBn?: string;
  permanentAddressBn?: string;
  presentAddressBn?: string;
  causeOfDeathBn?: string;
  placeOfDeathBn?: string;
  leftSignatoryNameBn?: string;
  leftSignatoryRoleBn?: string;
}

export interface CertificateMenuItem {
  slug: string;
  titleBn: string;
  titleEn: string;
  iconName: string;
  description: string;
}
