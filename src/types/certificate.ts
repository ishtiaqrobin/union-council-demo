export interface UnionInfo {
  up_name: string;
  upazila: string;
  district: string;
  website: string;
}

export interface CertMeta {
  serial_no: string;
  cert_title: string;
  issue_date: string;
}

export interface ApplicantInfo {
  person_name: string;
  nid_no: string;
  father_name: string;
  mother_name: string;
  spouse_name?: string;
  village: string;
  house_no: string;
  ward_no: string;
  post_office: string;
  person_upazila: string;
  person_district: string;
}

export interface SignatoryInfo {
  signatory_name: string;
  signatory_role: string;
  trn_no: string;
  qr_url: string;
}

export interface HeirItem {
  id: string;
  name: string;
  relation: string;
  age_or_dob: string;
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
}

export interface CertificateMenuItem {
  slug: string;
  titleBn: string;
  titleEn: string;
  iconName: string;
  description: string;
}
