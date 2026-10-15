/**
 * ============================================================================
 * LICENSE SOURCE — backend contract mirror & sheet mapping adapter
 * ============================================================================
 *
 * Mirrors Backend/src/app/modules/license/license.interface.ts (ILicenceRenderData,
 * ILicenceCertificate) and provides the adapter to map to TradeLicenseData,
 * VehicleLicenseData, and ProfessionLicenseData for the Demo sheets.
 */

import type {
  TradeLicenseData,
  VehicleLicenseData,
  ProfessionLicenseData,
  LicenseCertificateLang,
} from "@/types/license";

// ============================================================================
// 1. BACKEND LICENCE CONTRACT TYPES
// ============================================================================

export interface LicenceUnionBlock {
  id: string;
  code: string;
  nameBn: string;
  nameEn: string | null;
  upazilaNameBn: string | null;
  upazilaNameEn: string | null;
  districtNameBn: string | null;
  districtNameEn: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logoUrl: string | null;
}

export interface LicenceCertificateMeta {
  license_no: string;
  license_no_en: string;
  license_id: string;
  license_id_en: string;
  ward_no: string;
  ward_no_en: string;
  circle_road_mohalla: string;
  circle_road_mohalla_en: string;
  issue_date: string;
  issue_date_en: string;
  renewal_date: string;
  renewal_date_en: string;
  valid_until_date: string;
  valid_until_date_en: string;
  renewal_deadline_date: string;
  renewal_deadline_date_en: string;
}

export interface LicenceCertificateVehicle {
  name: string;
  name_en: string;
  type: string;
  type_en: string;
  route_place: string;
  route_place_en: string;
}

export interface LicenceCertificateBusiness {
  institution_name: string;
  institution_name_en: string;
  business_type: string;
  business_type_en: string;
  business_nature: string;
  business_nature_en: string;
  business_place: string;
  business_place_en: string;
}

export interface LicenceCertificateOwner {
  name: string;
  name_en: string;
  father_or_husband_name: string;
  father_or_husband_name_en: string;
  mother_name: string;
  mother_name_en: string;
  permanent_address: string;
  permanent_address_en: string;
  present_address: string;
  present_address_en: string;
  nid_no: string;
  nid_no_en: string;
  mobile_no: string;
  mobile_no_en: string;
  spouse_name: string;
  spouse_name_en: string;
  photo_url: string | null;
}

export interface LicenceCertificateFinancials {
  license_fee: string;
  arrear_fee: string;
  signboard_tax: string | null;
  nameplate_tax: string | null;
  profession_tax: string;
  miscellaneous: string;
  penalty?: string;
  vat: string;
  vat_income_tax: string;
  total_amount: string;
  amount_in_words: string;
  amount_in_words_en: string;
}

export interface LicenceCertificateSignatory {
  left_name: string;
  left_name_en: string;
  left_role: string;
  left_role_en: string;
  right_name: string;
  right_name_en: string;
  right_role: string;
  right_role_en: string;
  trn_no: string | null;
  qr_url: string;
}

export interface LicenceCertificateFleet {
  index: number;
  size: number;
  labelBn: string;
  labelEn: string;
}

export interface LicenceCertificateLang {
  available: ("bn" | "en")[];
  missingEnglish: string[];
  fallbackNote: string;
}

export interface LicenceCertificate {
  meta: LicenceCertificateMeta;
  vehicle: LicenceCertificateVehicle | null;
  business: LicenceCertificateBusiness | null;
  owner: LicenceCertificateOwner;
  financials: LicenceCertificateFinancials;
  signatory: LicenceCertificateSignatory;
  fleet: LicenceCertificateFleet | null;
  lang: LicenceCertificateLang;
}

export interface LicenceRenderData {
  license: {
    id: string;
    licenseNo: string;
    licenseType: "TRADE" | "VEHICLE" | "PROFESSION" | string;
    status: string;
    verificationCode: string;
    verificationUrl: string;
    qrDataString: string;
    templateVersion: string | null;
    issuedAt: string | Date;
    expiresAt: string | Date | null;
    daysRemaining: number | null;
    downloadCount: number;
    lastDownloadedAt: string | Date | null;
    renewalCount: number;
    lastRenewedAt: string | Date | null;
    revokedAt: string | Date | null;
    revokedReason: string | null;
    suspendedAt: string | Date | null;
    suspendedReason: string | null;
  };
  fiscalYear: {
    id: string | null;
    name: string | null;
    startDate: string | Date | null;
    endDate: string | Date | null;
  };
  union: LicenceUnionBlock;
  service: {
    id: string;
    code: string;
    nameBn: string;
    nameEn: string | null;
    category: string | null;
  };
  holder: {
    ownerNameBn: string;
    ownerNameEn: string | null;
    identityNumber: string | null;
    ownerMobile: string | null;
  };
  formData: Record<string, unknown>;
  dataProvenance: "SNAPSHOT_AT_ISSUE" | "LIVE_APPLICATION";
  financials: Record<string, unknown> | null;
  signatory: {
    issuedByName: string | null;
    designationBn: string | null;
    designationEn: string | null;
    signedAt: string | Date;
  };
  certificate: LicenceCertificate | null;
}

export const LICENCE_FALLBACK_NOTE = "(as per the Bengali record)";

// ============================================================================
// 2. MAPPING ADAPTERS
// ============================================================================

/**
 * Maps backend LicenceRenderData into TradeLicenseData used by TradeLicenseSheet.
 */
export function toTradeLicenseSheetData(
  payload: LicenceRenderData,
  initial?: Partial<TradeLicenseData>
): TradeLicenseData {
  const cert = payload.certificate;
  const form = payload.formData || {};

  const getString = (key: string, fb = ""): string => {
    const v = form[key];
    return typeof v === "string" ? v : typeof v === "number" ? String(v) : fb;
  };

  const unionBlock = {
    up_name: payload.union.nameBn || initial?.union?.up_name || "",
    up_name_en: payload.union.nameEn || initial?.union?.up_name_en || "",
    upazila: payload.union.upazilaNameBn || initial?.union?.upazila || "",
    upazila_en: payload.union.upazilaNameEn || initial?.union?.upazila_en || "",
    district: payload.union.districtNameBn || initial?.union?.district || "",
    district_en: payload.union.districtNameEn || initial?.union?.district_en || "",
    website: payload.union.website || initial?.union?.website || "www.lgoms.org",
  };

  const metaBlock = cert?.meta
    ? {
        license_no: cert.meta.license_no,
        license_no_en: cert.meta.license_no_en,
        license_id: cert.meta.license_id,
        license_id_en: cert.meta.license_id_en,
        ward_no: cert.meta.ward_no,
        ward_no_en: cert.meta.ward_no_en,
        circle_road_mohalla: cert.meta.circle_road_mohalla,
        circle_road_mohalla_en: cert.meta.circle_road_mohalla_en,
        issue_date: cert.meta.issue_date,
        issue_date_en: cert.meta.issue_date_en,
        renewal_date: cert.meta.renewal_date,
        renewal_date_en: cert.meta.renewal_date_en,
        valid_until_date: cert.meta.valid_until_date,
        valid_until_date_en: cert.meta.valid_until_date_en,
      }
    : {
        license_no: payload.license.licenseNo || initial?.meta?.license_no || "",
        license_no_en: payload.license.licenseNo || initial?.meta?.license_no_en || "",
        license_id: payload.license.verificationCode || initial?.meta?.license_id || "",
        license_id_en: payload.license.verificationCode || initial?.meta?.license_id_en || "",
        ward_no: getString("ward_no", initial?.meta?.ward_no || ""),
        ward_no_en: getString("ward_no_en", initial?.meta?.ward_no_en || ""),
        circle_road_mohalla: getString("circle_road_mohalla", initial?.meta?.circle_road_mohalla || ""),
        circle_road_mohalla_en: getString("circle_road_mohalla_en", initial?.meta?.circle_road_mohalla_en || ""),
        issue_date: getString("issue_date", initial?.meta?.issue_date || ""),
        issue_date_en: getString("issue_date_en", initial?.meta?.issue_date_en || ""),
        renewal_date: getString("renewal_date", initial?.meta?.renewal_date || ""),
        renewal_date_en: getString("renewal_date_en", initial?.meta?.renewal_date_en || ""),
        valid_until_date: getString("valid_until_date", initial?.meta?.valid_until_date || ""),
        valid_until_date_en: getString("valid_until_date_en", initial?.meta?.valid_until_date_en || ""),
      };

  const businessBlock = cert?.business
    ? {
        institution_name: cert.business.institution_name,
        institution_name_en: cert.business.institution_name_en,
        business_type: cert.business.business_type,
        business_type_en: cert.business.business_type_en,
        business_nature: cert.business.business_nature,
        business_nature_en: cert.business.business_nature_en,
        business_place: cert.business.business_place,
        business_place_en: cert.business.business_place_en,
      }
    : {
        institution_name: getString("institution_name", initial?.business?.institution_name || ""),
        institution_name_en: getString("institution_name_en", initial?.business?.institution_name_en || ""),
        business_type: getString("business_type", initial?.business?.business_type || ""),
        business_type_en: getString("business_type_en", initial?.business?.business_type_en || ""),
        business_nature: getString("business_nature", initial?.business?.business_nature || ""),
        business_nature_en: getString("business_nature_en", initial?.business?.business_nature_en || ""),
        business_place: getString("business_place", initial?.business?.business_place || ""),
        business_place_en: getString("business_place_en", initial?.business?.business_place_en || ""),
      };

  const ownerBlock = cert?.owner
    ? {
        name: cert.owner.name,
        name_en: cert.owner.name_en,
        father_name: cert.owner.father_or_husband_name,
        father_name_en: cert.owner.father_or_husband_name_en,
        mother_name: cert.owner.mother_name,
        mother_name_en: cert.owner.mother_name_en,
        spouse_name: cert.owner.spouse_name,
        spouse_name_en: cert.owner.spouse_name_en,
        permanent_address: cert.owner.permanent_address,
        permanent_address_en: cert.owner.permanent_address_en,
        present_address: cert.owner.present_address,
        present_address_en: cert.owner.present_address_en,
        nid_or_bc: cert.owner.nid_no,
        nid_or_bc_en: cert.owner.nid_no_en,
        tin_no: getString("tin_no", initial?.owner?.tin_no || "--------"),
        bin_no: getString("bin_no", initial?.owner?.bin_no || "--------"),
        tax_zone: getString("tax_zone", initial?.owner?.tax_zone || "রাজবাড়ী"),
        tax_zone_en: getString("tax_zone_en", initial?.owner?.tax_zone_en || "Rajbari"),
        mobile_no: cert.owner.mobile_no,
        mobile_no_en: cert.owner.mobile_no_en,
        email: getString("email", initial?.owner?.email || "--------"),
        photo_url: cert.owner.photo_url || initial?.owner?.photo_url || "/assets/avatar/avatar.webp",
      }
    : {
        name: payload.holder.ownerNameBn || initial?.owner?.name || "",
        name_en: payload.holder.ownerNameEn || initial?.owner?.name_en || "",
        father_name: getString("father_name", initial?.owner?.father_name || ""),
        father_name_en: getString("father_name_en", initial?.owner?.father_name_en || ""),
        mother_name: getString("mother_name", initial?.owner?.mother_name || ""),
        mother_name_en: getString("mother_name_en", initial?.owner?.mother_name_en || ""),
        spouse_name: getString("spouse_name", initial?.owner?.spouse_name || ""),
        spouse_name_en: getString("spouse_name_en", initial?.owner?.spouse_name_en || ""),
        permanent_address: getString("permanent_address", initial?.owner?.permanent_address || ""),
        permanent_address_en: getString("permanent_address_en", initial?.owner?.permanent_address_en || ""),
        present_address: getString("present_address", initial?.owner?.present_address || ""),
        present_address_en: getString("present_address_en", initial?.owner?.present_address_en || ""),
        nid_or_bc: payload.holder.identityNumber || initial?.owner?.nid_or_bc || "",
        nid_or_bc_en: payload.holder.identityNumber || initial?.owner?.nid_or_bc_en || "",
        tin_no: getString("tin_no", initial?.owner?.tin_no || "--------"),
        bin_no: getString("bin_no", initial?.owner?.bin_no || "--------"),
        tax_zone: getString("tax_zone", initial?.owner?.tax_zone || "রাজবাড়ী"),
        tax_zone_en: getString("tax_zone_en", initial?.owner?.tax_zone_en || "Rajbari"),
        mobile_no: payload.holder.ownerMobile || initial?.owner?.mobile_no || "",
        mobile_no_en: payload.holder.ownerMobile || initial?.owner?.mobile_no_en || "",
        email: getString("email", initial?.owner?.email || "--------"),
        photo_url: initial?.owner?.photo_url || "/assets/avatar/avatar.webp",
      };

  const fin = cert?.financials;
  const financialsBlock = {
    license_fee: fin?.license_fee || initial?.financials?.license_fee || "0.00",
    arrear_fee: fin?.arrear_fee || initial?.financials?.arrear_fee || "0.00",
    signboard_tax: fin?.signboard_tax ?? initial?.financials?.signboard_tax ?? "0.00",
    vat: fin?.vat || initial?.financials?.vat || "0.00",
    profession_tax: fin?.profession_tax || initial?.financials?.profession_tax || "0.00",
    penalty: fin?.penalty || initial?.financials?.penalty,
    miscellaneous: fin?.miscellaneous || initial?.financials?.miscellaneous,
    total_amount: fin?.total_amount || initial?.financials?.total_amount || "0.00",
    amount_in_words: fin?.amount_in_words || initial?.financials?.amount_in_words || "",
    amount_in_words_en: fin?.amount_in_words_en || initial?.financials?.amount_in_words_en || "",
  };

  const sig = cert?.signatory;
  const signatoryBlock = {
    left_name: sig?.left_name || initial?.signatory?.left_name || "",
    left_name_en: sig?.left_name_en || initial?.signatory?.left_name_en || "",
    left_role: sig?.left_role || initial?.signatory?.left_role || "",
    left_role_en: sig?.left_role_en || initial?.signatory?.left_role_en || "",
    right_name: sig?.right_name || initial?.signatory?.right_name || "",
    right_name_en: sig?.right_name_en || initial?.signatory?.right_name_en || "",
    right_role: sig?.right_role || initial?.signatory?.right_role || "",
    right_role_en: sig?.right_role_en || initial?.signatory?.right_role_en || "",
    trn_no: sig?.trn_no || initial?.signatory?.trn_no || payload.license.verificationCode || "",
    qr_url: sig?.qr_url || initial?.signatory?.qr_url || payload.license.verificationUrl || "",
  };

  const langBlock: LicenseCertificateLang = cert?.lang
    ? {
        available: cert.lang.available,
        missingEnglish: cert.lang.missingEnglish,
        fallbackNote: cert.lang.fallbackNote,
      }
    : initial?.lang || {
        available: ["bn", "en"],
        missingEnglish: [],
        fallbackNote: LICENCE_FALLBACK_NOTE,
      };

  return {
    id: payload.license.id || initial?.id || "trade-license",
    slug: "trade-license",
    titleBn: initial?.titleBn || "ট্রেড লাইসেন্স",
    titleEn: initial?.titleEn || "Trade License",
    fiscalYearBn: payload.fiscalYear.name || initial?.fiscalYearBn || "২০২৫-২০২৬",
    fiscalYearEn: initial?.fiscalYearEn || "2025-2026",
    union: unionBlock,
    meta: metaBlock,
    business: businessBlock,
    owner: ownerBlock,
    financials: financialsBlock,
    signatory: signatoryBlock,
    lang: langBlock,
  };
}
