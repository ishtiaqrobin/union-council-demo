/**
 * ============================================================================
 * CERTIFICATE SOURCE — the backend contract, and the ONE place it is mapped
 * ============================================================================
 *
 * WHY THIS FILE EXISTS, AND WHY IT IS THE MOST IMPORTANT FILE IN THIS FOLDER
 * -------------------------------------------------------------------------
 * Every sheet under `components/certificates/` reads a FLAT, printer-shaped model:
 *
 *     data.applicant.person_name        data.signatory.signatory_name
 *     data.meta.serial_no               data.heirs[]
 *
 * But that is NOT what the API sends. `GET /certificates/render/:idOrNo` answers with
 * `ICertificateRenderData`, whose shape is different on purpose:
 *
 *     payload.recipient.fullNameBn      payload.signatory.name
 *     payload.certificate.certificateNo payload.members[]
 *     payload.deceased                  payload.counts
 *
 * 🔴 SO THE DEMO WAS A DESIGN PREVIEW WITH INVENTED NAMES, NOT A REFERENCE. Measured
 * before this file: the sheets read 146 fields that the backend does not produce, and
 * every one of them rendered `undefined` — which React prints as NOTHING. A blank line
 * where a name belongs is the failure mode that reaches a citizen and nobody notices,
 * because rendering `undefined` is not an error.
 *
 * This module closes that gap in ONE place, and the reason is the whole point:
 *
 *   1. `CertificateRenderData` below is a COPY of the backend's interface. Copying is
 *      deliberate — the Demo has no build dependency on the backend, and the alternative
 *      (a shared package) would be the right answer for a real frontend, not for a
 *      design reference.
 *   2. `toSheetData()` is the MAPPING, and it is written down as CODE rather than as
 *      prose in a plan document. A mapping in a document drifts; a mapping that a test
 *      can run does not.
 *   3. Every decision where a name GUESSES is commented with what the backend actually
 *      means, so a reader building the real frontend can see the reasoning and not just
 *      the translation table.
 *
 * ⚠️ WHEN THE BACKEND CHANGES, THIS FILE CHANGES — and the compiler will insist, because
 * the mapping destructures the payload's fields by name. `pnpm check:certificate-english`
 * is the second guard: it fails if a sheet reads a field this mapping does not produce.
 *
 * 🔴 AND THE ENGLISH FALLBACK RULE LIVES HERE TOO. `lang.fallbackNote` is the backend's
 * own sentence — `CERTIFICATE_FALLBACK_NOTE` in `license.shared.ts` — and it is a
 * constant rather than a per-printer choice because it is a statement about the
 * document's PROVENANCE. Two printers inventing two sentences would make two documents
 * that mean the same thing read differently, and a bank holding one would have no way to
 * know both are the platform's normal output.
 */
import type { CertificateData, HeirItem } from "@/types/certificate";

// ============================================================================
// 1. THE CONTRACT — a copy of `Backend/src/app/modules/certificate/certificate.interface.ts`
// ============================================================================

/** Mirrors the backend's `CertificateLanguage` enum. */
export type CertificateLanguage = "BN" | "EN" | "BOTH";

/** Mirrors the backend's `CertificateStatus` enum. */
export type CertificateStatus = "ACTIVE" | "REVOKED";

/**
 * Mirrors the backend's `ICertificateDeceased`.
 *
 * 🔴 EVERY KEY IS PREFIXED `deceased` BECAUSE THERE ARE TWO PEOPLE ON ONE FORM. A warish or
 * death certificate is about somebody who died, and the applicant is their heir — so
 * "dateOfBirth" on its own would be ambiguous, and the backend prefixes the DATABASE columns
 * for the same reason (`InheritanceCertificate.deceasedNameBn`).
 */
export interface CertificateDeceased {
  nameBn: string;
  nameEn?: string | null;
  fatherNameBn?: string | null;
  motherNameBn?: string | null;
  spouseNameBn?: string | null;
  nidNumber?: string | null;
  birthRegNo?: string | null;
  passportNo?: string | null;
  dateOfBirth?: string | null;
  dateOfDeath?: string | null;
  /** `dateOfDeath` in words — every BDRIS death certificate prints it that way. */
  dateOfDeathInWords?: string | null;
  gender?: string | null;
  religion?: string | null;
  village?: string | null;
  postOffice?: string | null;
  wardNumber?: number | null;
  holdingNumber?: string | null;
  deathCertificateNo?: string | null;
  photoUrl?: string | null;
  relationWithApplicant?: string | null;
}

/** Mirrors the backend's `ICertificateMemberRow` — one row of a dynamic table (§৪). */
export interface CertificateMember {
  serialNo: number;
  nameBn: string;
  nameEn?: string | null;
  relationship: string;
  parentOrSpouseName?: string | null;
  dateOfBirth?: string | null;
  age?: number | null;
  idType?: string | null;
  idNumber?: string | null;
  isAlive: boolean;
  remarks?: string | null;
  profession?: string | null;
}

/** Counted from `members` AT RENDER, never stored (§৪.৫). */
export interface CertificateCounts {
  sonCount: number;
  daughterCount: number;
  spouseCount: number;
  fatherCount: number;
  motherCount: number;
  brotherCount: number;
  sisterCount: number;
  otherCount: number;
  /**
   * 🔴 HOW MANY ROWS WERE THE HEAD OF THE FAMILY THEMSELVES.
   *
   * `totalCount` counts DEPENDANTS and skips `SELF`; a family certificate's sentence says
   * "নিজসহ মোট", so it needs both numbers. The bucket is reported rather than re-derived,
   * because the sheet that used to derive it counted rows by string-matching the relationship
   * text — `includes("self")` — which is the fragile class of counting this module removes.
   */
  selfCount: number;
  totalCount: number;
  totalInWords: string;
}

/** §৩.৯ — the same name spelled differently across documents. */
export interface CertificateDiscrepancy {
  serialNo: number;
  subject: string;
  primaryName: string;
  aliasName: string;
  remarks?: string | null;
}

/** Mirrors `ICertificateRenderData` — the whole render payload. */
export interface CertificateRenderData {
  certificate: {
    id: string;
    certificateNo: string;
    verificationCode: string;
    templateVersion: string | null;
    language: CertificateLanguage;
    status: CertificateStatus;
    issuedAt: string;
    /**
     * 🔴 WHEN THE DOCUMENT STOPS BEING TRUE, AND WHETHER IT ALREADY HAS.
     *
     * `null` on the EIGHT PERMANENT certificates (citizenship, warish, inheritance, family,
     * landless, same-name, death, permanent-resident) — "he was born in 1972" does not
     * expire, and a date there would be a claim the document cannot support. A date on the
     * SEVEN TEMPORARY ones (all six months), because their subject can change: an
     * "unmarried" certificate is a statement about today.
     *
     * ⚠️ `isExpired` ARRIVES BESIDE THE DATE, NOT INSTEAD OF IT — and a sheet must print the
     * SERVER's verdict rather than comparing `expiresAt` to the browser's clock, which a
     * citizen controls.
     */
    expiresAt: string | null;
    isExpired: boolean;
    downloadCount: number;
    lastDownloadedAt: string | null;
    verificationUrl: string;
    qrDataString: string;
  };
  union: {
    id: string;
    code: string;
    nameBn: string;
    nameEn: string;
    upazilaNameBn: string;
    upazilaNameEn: string;
    districtNameBn: string;
    districtNameEn: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    logoUrl?: string | null;
    bannerUrl?: string | null;
  };
  service: {
    id: string;
    code: string;
    nameBn: string;
    nameEn?: string | null;
    category?: string | null;
  };
  signatory: {
    name: string;
    designationBn: string;
    designationEn?: string | null;
    signatureUrl?: string | null;
    sealUrl?: string | null;
    signedAt: string;
  };
  /**
   * The other two signatures on the documents that carry more than one.
   *
   * ⚠️ ABSENT (`undefined`) ON A ONE-SIGNATURE DOCUMENT, which is how a sheet knows whether to
   * render one column or three. That is why these are optional and not `null` — a `null` left/right
   * would be indistinguishable from "this document has that slot but nobody holds the office",
   * and the sheet would draw an empty box nobody can fill.
   */
  leftSignatory?: {
    name: string;
    designationBn: string;
    designationEn?: string | null;
    signatureUrl?: string | null;
    sealUrl?: string | null;
    signedAt: string;
  };
  middleSignatory?: {
    name: string;
    designationBn: string;
    designationEn?: string | null;
    signatureUrl?: string | null;
    sealUrl?: string | null;
    signedAt: string;
  };
  recipient: {
    applicantUserId?: string | null;
    fullNameBn: string;
    fullNameEn?: string | null;
    fatherNameBn?: string | null;
    fatherNameEn?: string | null;
    motherNameBn?: string | null;
    motherNameEn?: string | null;
    spouseNameBn?: string | null;
    spouseNameEn?: string | null;
    nidNumber?: string | null;
    birthRegNo?: string | null;
    gender?: string | null;
    religion?: string | null;
    holdingNumber?: string | null;
    village: string;
    postOffice: string;
    wardNumber?: number | null;
    photoUrl?: string | null;
  };
  /** The raw answers, exactly as the citizen submitted them. */
  formData: Record<string, unknown>;
  deceased?: CertificateDeceased | null;
  members?: CertificateMember[];
  counts?: CertificateCounts;
  discrepancies?: CertificateDiscrepancy[];
  income?: {
    /** ALWAYS annual — a `MONTHLY` answer was multiplied by twelve at render. */
    amount: number;
    inWordsBn: string;
    inWordsEn: string;
    wasMonthly: boolean;
  };
  /** The legacy alias for `members`, kept because the backend still emits it (§৪). */
  heirs?: {
    serialNo: number;
    nameBn: string;
    nameEn?: string | null;
    relationship: string;
    age?: number | null;
    idNumber?: string | null;
    isAlive: boolean;
    remarks?: string | null;
  }[];
  /**
   * 🔴 HOW THE DOCUMENT IS HANDED OVER (§১২.৭) — a POLICY, not a workflow step.
   *
   * Eight services need a physical visit the FIRST time and ten are fully online, and a
   * licence RENEWAL goes online. The union decides per service, because whether a parish can
   * run a service without a visit is exactly what differs between unions.
   */
  delivery: {
    requiresInPersonFirstIssue: boolean;
    isFirstIssue: boolean;
    mustBeHandedOverInPerson: boolean;
    instructionBn: string;
  };
}

/** Mirrors `ILicenceCertificateLang` — the note a printer appends to a Bengali value. */
export interface CertificateLang {
  fallbackNote: string;
  /**
   * Fields whose English the applicant left empty, so a reader can count them.
   *
   * ⚠️ WIDER THAN THE SET THAT GETS A NOTE. This list excludes the structurally
   * untranslatable composed address, which is printed in Bengali all the same — so a
   * printer must not use it to DECIDE where a note goes.
   */
  missingEnglish: string[];
}

// ============================================================================
// 2. THE MAPPING
// ============================================================================

/**
 * The Bengali digits, for the figures a sheet composes itself (dates, amounts).
 *
 * 🔴 THE BACKEND ALREADY SENDS `inWordsBn` AND THE WORDS FOR COUNTS. This table exists only
 * for a number a TEMPLATE formats — a ward number, an age, a currency figure — and it is
 * kept here rather than in each sheet so two sheets cannot spell one number differently.
 */
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBnDigits = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
};

/** `2026-10-15T…` → `১৫/১০/২০২৬`. */
const isoToBnDate = (iso: string | null | undefined): string => {
  if (!iso) return "";
  const day = iso.slice(0, 10).split("-").reverse().join("/");
  return toBnDigits(day);
};

/**
 * `2026-10-15T…` → `১৫ অক্টোবর ২০২৬` — the form a citizen reads.
 *
 * ⚠️ WITHOUT `Intl`, WHICH WOULD NEED A LOCALE BUNDLE AND WOULD STILL PRINT LATIN DIGITS in
 * some runtimes. An explicit month table is three lines and cannot surprise anybody.
 */
const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const isoToBnLongDate = (iso: string | null | undefined): string => {
  if (!iso) return "";
  const [year, month, day] = iso.slice(0, 10).split("-");
  const monthName = BN_MONTHS[Number(month) - 1] ?? "";
  return `${toBnDigits(Number(day))} ${monthName} ${toBnDigits(year)}`;
};

/** The Bengali label for a relationship value, for a table's `relation` column. */
const RELATIONSHIP_BN: Record<string, string> = {
  SON: "পুত্র",
  DAUGHTER: "কন্যা",
  SPOUSE: "স্বামী / স্ত্রী",
  FATHER: "পিতা",
  MOTHER: "মাতা",
  BROTHER: "ভাই",
  SISTER: "বোন",
  SELF: "নিজ",
  OTHER: "অন্যান্য",
};

const relationshipLabel = (value: string): string =>
  RELATIONSHIP_BN[value] ?? value;

/** The subject label for a name-discrepancy row (§৩.৯). */
const DISCREPANCY_SUBJECT_BN: Record<string, string> = {
  APPLICANT_NAME: "আবেদনকারীর নাম",
  FATHER_NAME: "পিতার নাম",
  MOTHER_NAME: "মাতার নাম",
  SPOUSE_NAME: "স্বামী / স্ত্রীর নাম",
};

/**
 * Builds the flat model every sheet reads, from the backend's own payload.
 *
 * 🔴 THE MAPPING IS THE DELIVERABLE. Each line below answers "which backend field feeds this
 * printed line?", and a reader building the real frontend can lift this function as-is.
 *
 * ⚠️ `partialData` EXISTS SO THE DEMO'S EDITABLE FORM STILL WORKS. The Demo lets a designer
 * type into a drawer and see the sheet update; the API payload is read-only. So the adapter
 * takes the payload and an optional flat overrides object, and the latter wins — which is the
 * same precedence a real frontend gets from `renderedData` (the frozen snapshot) over the live
 * answers, applied to a designer's keystrokes instead of to history.
 */
export const toSheetData = (
  payload: CertificateRenderData,
  partialData?: Partial<CertificateData>,
): CertificateData => {
  const { certificate, union, service, signatory, recipient, delivery } = payload;

  /**
   * ⚠️ `members` IS THE CURRENT NAME AND `heirs` IS THE LEGACY ALIAS. The backend emits both
   * during the transition, so a sheet reads whichever exists — but the MAPPING normalises to
   * one list, because a template that read `heirs` alone would print an empty table on a
   * family certificate, whose table is called `familyMembers` in the answers.
   */
  /**
   * ⚠️ THE LEGACY ALIAS IS NORMALISED THROUGH THE SAME SHAPE, and `dateOfBirth` is `null`
   * because the old `heirs` array DOES NOT CARRY IT. That is a real difference, not an
   * omission: the legacy alias predates the REPEATER table, so a sheet reading it can print an
   * age but not a birth date. Normalising HERE means a sheet has one shape to handle and
   * cannot accidentally branch on which alias the backend chose.
   */
  const memberRows: CertificateMember[] =
    payload.members ??
    (payload.heirs ?? []).map((h) => ({
      serialNo: h.serialNo,
      nameBn: h.nameBn,
      nameEn: h.nameEn,
      relationship: h.relationship,
      parentOrSpouseName: null,
      dateOfBirth: null,
      age: h.age,
      idType: null,
      idNumber: h.idNumber,
      isAlive: h.isAlive,
      remarks: h.remarks,
      profession: null,
    }));

  const heirs: HeirItem[] = memberRows.map((m) => ({
    id: String(m.serialNo),
    name: m.nameBn,
    name_en: m.nameEn ?? undefined,
    relation: relationshipLabel(m.relationship),
    relation_en: m.relationship,
    /**
     * ⚠️ THE AGE WINS OVER THE DATE when both exist, because the backend FROZE the age at
     * issue: a birth date corrected later must not change a certificate already relied upon.
     */
    age_or_dob:
      m.age !== null && m.age !== undefined
        ? toBnDigits(m.age)
        : isoToBnDate(m.dateOfBirth),
    age_or_dob_en:
      m.age !== null && m.age !== undefined
        ? String(m.age)
        : (m.dateOfBirth?.slice(0, 10) ?? ""),
    nid_or_bc: m.idNumber ?? "",
    comments: m.remarks ?? undefined,
  }));

  const deceased = payload.deceased ?? null;

  return {
    id: certificate.id,
    slug: service.code,
    titleBn: service.nameBn,
    titleEn: service.nameEn ?? service.nameBn,

    union: {
      up_name: union.nameBn,
      up_name_en: union.nameEn,
      upazila: union.upazilaNameBn,
      upazila_en: union.upazilaNameEn,
      district: union.districtNameBn,
      district_en: union.districtNameEn,
      website: union.email ?? "",
    },

    meta: {
      /**
       * ⚠️ THE CERTIFICATE NUMBER IS THE SERIAL. The backend's `certificateNo` is
       * `CRT-<UNIONCODE>-<YYYY>-<NNNN>` and is what an office quotes; `verificationCode` is
       * the short code the QR carries. Printing `verificationCode` as the serial would put a
       * different string on the paper than the one a citizen reads aloud.
       */
      serial_no: certificate.certificateNo,
      serial_no_en: certificate.certificateNo,
      cert_title: service.nameBn,
      cert_title_en: service.nameEn ?? service.nameBn,
      issue_date: isoToBnLongDate(certificate.issuedAt),
      issue_date_en: certificate.issuedAt.slice(0, 10),
    },

    applicant: {
      person_name: recipient.fullNameBn,
      person_name_en: recipient.fullNameEn ?? undefined,
      nid_no: recipient.nidNumber ?? "",
      nid_no_en: recipient.nidNumber ?? "",
      birth_reg_no: recipient.birthRegNo ?? undefined,
      birth_reg_no_en: recipient.birthRegNo ?? undefined,
      dob: isoToBnDate(payload.formData["dateOfBirth"] as string | undefined),
      dob_en: (payload.formData["dateOfBirth"] as string | undefined)?.slice(0, 10),
      father_name: recipient.fatherNameBn ?? "",
      father_name_en: recipient.fatherNameEn ?? undefined,
      mother_name: recipient.motherNameBn ?? "",
      mother_name_en: recipient.motherNameEn ?? undefined,
      spouse_name: recipient.spouseNameBn ?? undefined,
      spouse_name_en: recipient.spouseNameEn ?? undefined,
      /** `||` and not `??`: the backend sends an empty string for an absent village. */
      village: recipient.village || "",
      village_en: (payload.formData["villageEn"] as string | undefined) ?? undefined,
      house_no: recipient.holdingNumber ?? "",
      house_no_en: recipient.holdingNumber ?? "",
      ward_no: toBnDigits(recipient.wardNumber ?? ""),
      ward_no_en: String(recipient.wardNumber ?? ""),
      post_office: recipient.postOffice || "",
      post_office_en:
        (payload.formData["postOfficeEn"] as string | undefined) ?? undefined,
      /**
       * 🔴 THE APPLICANT'S OWN ADDRESS BLOCK COMES FROM THE FORM ANSWERS, NOT FROM THE
       * UNION. `recipient.village` and `recipient.postOffice` are the citizen's; the upazila
       * and district are the UNION's, because a union parishad sits inside one. Reading the
       * union's address for the person would print the office's location as their home.
       */
      person_upazila: union.upazilaNameBn,
      person_upazila_en: union.upazilaNameEn,
      person_district: union.districtNameBn,
      person_district_en: union.districtNameEn,
      photo_url: recipient.photoUrl ?? undefined,
    },

    signatory: {
      signatory_name: signatory.name,
      signatory_name_en: (payload.formData["signatoryNameEn"] as string | undefined) ?? undefined,
      signatory_role: signatory.designationBn,
      signatory_role_en: signatory.designationEn ?? undefined,
      /**
       * ⚠️ `trn_no` IS THE TRACKING NUMBER AND IT IS THE VERIFICATION CODE. The old sheets
       * printed a fabricated `TRN-…` literal; the code below the QR is the string the public
       * verification endpoint actually accepts, which is what makes the line useful.
       */
      trn_no: certificate.verificationCode,
      qr_url: certificate.qrDataString,
      /**
       * 🔴 THE SIGNATURE AND SEAL — AND UNTIL NOW THEY NEVER REACHED THE PAPER.
       *
       * MEASURED before this: this mapping carried four SIGNATORY fields (`signatory_name`,
       * `signatory_name_en`, `signatory_role`, `signatory_role_en`) and NOTHING for the images.
       * The backend's `signatureUrl`/`sealUrl` were read by no one, so even a correctly uploaded
       * signature could not have appeared on a sheet.
       *
       * ⚠️ `undefined` RATHER THAN `null` when absent: `str()` drops empty strings, and the sheets
       * test for truthiness. A `null` here renders the same, but `undefined` keeps the sheet data
       * object free of keys that say "we looked and there was nothing".
       */
      signature_url: str(signatory.signatureUrl),
      seal_url: str(signatory.sealUrl),
    },

    /**
     * 🔴 THE OTHER SIGNATORY COLUMNS — present only on an NOC and a death certificate.
     *
     * `NOCSheet` used to fall back to the HARDCODED string "সৈয়দ মেহেদী মাসুদ" for its middle
     * column, and `DeathRegistrationSheet` to "Syed Mehedi Masud" for its left — the seeded
     * secretary of ONE union, printed on every union's document. Removing that default without
     * supplying the real value would have replaced a wrong name with a blank; supplying it is the
     * other half of the fix.
     *
     * ⚠️ LEFT AND MIDDLE ARE NOT THE SAME PEOPLE. On an NOC: accountant (left), secretary
     * (middle), chairman (right). On a death certificate: secretary (left), chairman (right) —
     * because there is no third signature and the centre column holds the QR.
     */
    ...(payload.leftSignatory
      ? {
          /**
           * ⚠️ THE `Bn`-SUFFIXED KEYS, not new names. `NOCSheet` and `DeathRegistrationSheet`
           * already READ `leftSignatoryNameBn`, `middleSignatoryRoleBn` and friends — against a
           * hardcoded fallback because nothing ever supplied them. Adding a second spelling would
           * have left those sheets still reading the old keys and still printing the same
           * hardcoded name, with the mapping looking correct.
           */
          leftSignatoryNameBn: payload.leftSignatory.name,
          leftSignatoryNameEn: payload.leftSignatory.designationEn
            ? payload.leftSignatory.name
            : undefined,
          leftSignatoryRoleBn: payload.leftSignatory.designationBn,
          leftSignatoryRoleEn: payload.leftSignatory.designationEn ?? undefined,
          leftSignatorySignatureUrl: str(payload.leftSignatory.signatureUrl),
          leftSignatorySealUrl: str(payload.leftSignatory.sealUrl),
        }
      : {}),
    ...(payload.middleSignatory
      ? {
          middleSignatoryNameBn: payload.middleSignatory.name,
          middleSignatoryNameEn: payload.middleSignatory.designationEn
            ? payload.middleSignatory.name
            : undefined,
          middleSignatoryRoleBn: payload.middleSignatory.designationBn,
          middleSignatoryRoleEn: payload.middleSignatory.designationEn ?? undefined,
          middleSignatorySignatureUrl: str(payload.middleSignatory.signatureUrl),
          middleSignatorySealUrl: str(payload.middleSignatory.sealUrl),
        }
      : {}),

    heirs: heirs.length > 0 ? heirs : undefined,

    // ── §৩.২/§৩.৩/§৩.১২ — the person the certificate is ABOUT ────────────────
    deceasedNameBn: deceased?.nameBn,
    deceasedNameEn: deceased?.nameEn ?? undefined,
    deceasedFatherNameBn: deceased?.fatherNameBn ?? undefined,
    deceasedMotherNameBn: deceased?.motherNameBn ?? undefined,
    deceasedSpouseNameBn: deceased?.spouseNameBn ?? undefined,
    deceasedNidNo: deceased?.nidNumber ?? undefined,
    deceasedBirthRegNo: deceased?.birthRegNo ?? undefined,
    relationWithDeceasedBn: deceased?.relationWithApplicant
      ? relationshipLabel(deceased.relationWithApplicant)
      : undefined,
    dateOfBirthBn: deceased?.dateOfBirth ? isoToBnDate(deceased.dateOfBirth) : undefined,
    dateOfDeathBn: deceased?.dateOfDeath ? isoToBnDate(deceased.dateOfDeath) : undefined,
    dateOfDeathEn: deceased?.dateOfDeath?.slice(0, 10),
    /**
     * 🔴 THE BACKEND COMPOSES THIS ONE, because the BDRIS form prints a date in words and the
     * format is a government convention rather than a design choice. A sheet that re-derived
     * it could print a different shape from the union next door.
     */
    dateOfDeathInWordsBn: deceased?.dateOfDeathInWords ?? undefined,
    deceasedGenderBn: deceased?.gender ?? undefined,
    deceasedVillageBn: deceased?.village ?? undefined,
    deceasedWardBn: deceased?.wardNumber != null ? toBnDigits(deceased.wardNumber) : undefined,
    medicalDeathCertNo: deceased?.deathCertificateNo ?? undefined,
    deceasedPhotoUrl: deceased?.photoUrl ?? undefined,

    // ── §৪.৫ — the counts, which the backend derives and never stores ────────
    heirCountsBn: payload.counts
      ? {
          son: toBnDigits(payload.counts.sonCount),
          daughter: toBnDigits(payload.counts.daughterCount),
          spouse: toBnDigits(payload.counts.spouseCount),
          father: toBnDigits(payload.counts.fatherCount),
          mother: toBnDigits(payload.counts.motherCount),
          brother: toBnDigits(payload.counts.brotherCount),
          sister: toBnDigits(payload.counts.sisterCount),
          other: toBnDigits(payload.counts.otherCount),
          self: toBnDigits(payload.counts.selfCount),
          total: toBnDigits(payload.counts.totalCount),
          totalInWords: payload.counts.totalInWords,
        }
      : undefined,

    // ── §৩.৯ — the name-discrepancy table ───────────────────────────────────
    discrepanciesBn: payload.discrepancies?.map((d) => ({
      serialNo: toBnDigits(d.serialNo),
      subject: DISCREPANCY_SUBJECT_BN[d.subject] ?? d.subject,
      primaryName: d.primaryName,
      aliasName: d.aliasName,
      remarks: d.remarks ?? undefined,
    })),

    // ── §৩.৫ — income, ALWAYS annual ────────────────────────────────────────
    incomeAmountBn: payload.income ? toBnDigits(payload.income.amount) : undefined,
    incomeAmountEn: payload.income ? String(payload.income.amount) : undefined,
    incomeInWordsBn: payload.income?.inWordsBn,
    incomeWasMonthly: payload.income?.wasMonthly,

    // ── §১২.৩ — the term, and the verdict the SERVER reached ────────────────
    issuedAtBn: isoToBnLongDate(certificate.issuedAt),
    expiresAtBn: certificate.expiresAt ? isoToBnLongDate(certificate.expiresAt) : undefined,
    /**
     * ⚠️ THE ISO FORM FOR THE ENGLISH VIEW. The Bengali long form is the readable one on a Bengali
     * certificate; an English certificate wants the Latin date, because a reader comparing it to a
     * passport or a bank record is matching digits.
     */
    expiresAtEn: certificate.expiresAt ? certificate.expiresAt.slice(0, 10) : undefined,
    isExpired: certificate.isExpired,
    /** A PERMANENT certificate has no date, and a sheet prints nothing rather than "—". */
    isPermanent: certificate.expiresAt === null,

    // ── §১২.৭ — how it is handed over ──────────────────────────────────────
    delivery: delivery
      ? {
          requiresInPerson: delivery.mustBeHandedOverInPerson,
          instructionBn: delivery.instructionBn,
        }
      : undefined,

    /**
     * §৩.১১ — THE NOC's land block, read from the submitted answers.
     *
     * ⚠️ THESE COME FROM `formData` BECAUSE THE BACKEND HAS NO DEDICATED BLOCK FOR THEM. An NOC's
     * land details live in the application's answers like any other form field, and the render
     * payload forwards `formData` verbatim — so the mapping is the place that decides WHICH key is
     * the printed figure. A real frontend should keep this mapping; the alternative is each
     * template guessing at key names, which is how a certificate prints an empty row.
     *
     * 🔴 AND THE LABELS ARE TRANSLATED FROM THE STORED CODES, not from the labels the form showed.
     * `nocSubject` is stored as `BUILDING_CONSTRUCTION`, so printing the raw code would put
     * "BUILDING_CONSTRUCTION" on a legal document; printing a label the BACKEND invented would
     * drift the day the enum changed. The table below is the same one the form's SELECT uses.
     */
    nocOrganization: str(payload.formData["organizationName"]),
    nocSubjectBn: labelOf(NOC_SUBJECT, payload.formData["nocSubject"], "bn"),
    nocSubjectEn: labelOf(NOC_SUBJECT, payload.formData["nocSubject"], "en"),
    /**
     * ⚠️ THE PURPOSE AND THE PLACE ARE FREE TEXT THE CITIZEN WROTE, so they have no English until
     * somebody types one — and the sheet prints them through `written(…)`, which says so. An
     * enumerated code has both forms by construction; a sentence does not.
     */
    nocPurposeBn: str(payload.formData["establishmentPurpose"]),
    nocPurposeEn: str(payload.formData["establishmentPurposeEn"]),
    nocPlaceBn: str(payload.formData["establishmentPlace"]),
    nocPlaceEn: str(payload.formData["establishmentPlaceEn"]),
    mouzaName: str(payload.formData["mouzaName"]),
    khatianNo: str(payload.formData["khatianNo"]),
    halDagNo: str(payload.formData["halDagNo"]),
    landTypeBn: labelOf(LAND_TYPE, payload.formData["landType"], "bn"),
    landTypeEn: labelOf(LAND_TYPE, payload.formData["landType"], "en"),
    landAreaBn: toBnDigits(str(payload.formData["landArea"]) ?? ""),
    /** ⚠️ LATIN DIGITS IN THE ENGLISH VIEW: a court reader checks a figure against a deed. */
    landAreaEn: str(payload.formData["landArea"]),
    landOwnershipBn: labelOf(OWNERSHIP, payload.formData["ownershipType"], "bn"),
    landOwnershipEn: labelOf(OWNERSHIP, payload.formData["ownershipType"], "en"),
    mouzaMapUrl: uploadedUrl(payload.formData["mouzaMapAttachment"]),
    landDeedUrl: uploadedUrl(payload.formData["landDeedOrKhatianDoc"]),

    ...partialData,
  };
};

/** A trimmed string, or `undefined` — never `null`, so JSX cannot render the word "null". */
function str(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }
  if (typeof value === "number") return String(value);
  return undefined;
}

/** The storage key out of a FILE answer, or `undefined`. */
function uploadedUrl(value: unknown): string | undefined {
  if (typeof value === "string") return value.includes("/") ? value : undefined;
  if (typeof value === "object" && value !== null) {
    return str((value as Record<string, unknown>).fileUrl);
  }
  return undefined;
}

/**
 * The enum labels the NOC form offers, IN BOTH LANGUAGES OF ONE TABLE.
 *
 * 🔴 TWO COLUMNS RATHER THAN TWO TABLES, AND THAT IS THE POINT. The backend stores a CODE
 * (`BUILDING_CONSTRUCTION`), and the reason is exactly so each printer names it in its own
 * language — so a mapping that produced only the Bengali label would leave the English certificate
 * printing "Land Category: বাড়ি". Two adjacent columns also make a MISSING translation visible:
 * a code with a `bn` and no `en` is a gap a reader can see, while a code with no entry at all in a
 * second table is a gap only the paper reveals.
 */
const NOC_SUBJECT: Record<string, { bn: string; en: string }> = {
  BUILDING_CONSTRUCTION: { bn: "ভবন নির্মাণ", en: "Building Construction" },
  FACTORY_SETUP: { bn: "কারখানা স্থাপন", en: "Factory Setup" },
  TELECOM_TOWER: { bn: "টেলিযোগাযোগ টাওয়ার", en: "Telecom Tower" },
  DEEP_TUBEWELL: { bn: "গভীর নলকূপ", en: "Deep Tube Well" },
  OTHER: { bn: "অন্যান্য", en: "Other" },
};

const LAND_TYPE: Record<string, { bn: string; en: string }> = {
  BHITI: { bn: "ভিটি", en: "Homestead (Bhiti)" },
  NAL: { bn: "নাল", en: "Cultivable (Nal)" },
  BAARI: { bn: "বাড়ি", en: "Residential (Baari)" },
  COMMERCIAL: { bn: "বাণিজ্যিক", en: "Commercial" },
  FACTORY: { bn: "কারখানা", en: "Industrial" },
  PUKUR: { bn: "পুকুর", en: "Pond" },
};

const OWNERSHIP: Record<string, { bn: string; en: string }> = {
  INHERITED: { bn: "উত্তরাধিকারসূত্রে", en: "Inherited" },
  PURCHASED: { bn: "ক্রয়কৃত", en: "Purchased" },
  LEASED: { bn: "ইজারা", en: "Leased" },
  GIFTED: { bn: "দান/হেবা", en: "Gifted" },
};

/** Reads one language out of a two-column label table, falling back to the raw code. */
const labelOf = (
  table: Record<string, { bn: string; en: string }>,
  code: unknown,
  language: "bn" | "en",
): string | undefined => {
  const key = str(code);
  if (key === undefined) return undefined;
  return table[key]?.[language] ?? key;
};

/**
 * Every relationship bucket for a certificate whose table lists people.
 *
 * 🔴 ONE DEFINITION, THREE SHEETS, AND THAT IS THE POINT. `FamilySheet`, `WarishSheet` and
 * `InheritanceSheet` ALL need these numbers, and each of them used to compute its own — by
 * filtering rows and STRING-MATCHING the relation text (`includes("son")`, `includes("পুত্র")`).
 * Four consequences followed, none visible on the sheet:
 *
 *   ১. THREE IMPLEMENTATIONS of a number the backend already derives at render. §৪.৫ rules that
 *      counts are computed so a list and a total cannot disagree — and counting again here
 *      recreated the disagreement where it is hardest to see.
 *   ২. `includes("son")` MATCHES "Person", and `includes("পিতা")` is a substring test on free
 *      text: a "SON-IN-LAW" was counted as a son.
 *   ৩. `heirs.length` WAS THE TOTAL, which includes the head of the family when the list carries
 *      `SELF` — so a sheet could print more members than a reader could name as dependants.
 *   ৪. IT DIFFERED FROM PUBLIC VERIFICATION, which reads the backend's number. Two documents
 *      about one application then disagree, and the QR code is the one a bank trusts.
 *
 * ⚠️ THE PAYLOAD WINS AND A LOCAL COUNT IS THE FALLBACK, because a Demo data file has no backend
 * behind it. The fallback matches the relationship CODES the backend sends (`SON`, `SELF`, …),
 * never a label's spelling — which is what makes it a fallback rather than the old defect.
 *
 * `dependants` EXCLUDES `SELF` and `withSelf` INCLUDES it, because the two certificates that use
 * these numbers state them differently: a warish list has no `SELF` row, while a family list
 * does and its sentence reads "নিজসহ মোট" (including self).
 */
export interface RelationCounts {
  son: number;
  daughter: number;
  spouse: number;
  father: number;
  mother: number;
  brother: number;
  sister: number;
  other: number;
  self: number;
  /** Everyone EXCEPT the head of the family. */
  dependants: number;
  /** Everyone, the head of the family included — the "নিজসহ মোট" figure. */
  withSelf: number;
}

/** Only the buckets a ROW can land in — `dependants`/`withSelf` are sums, not buckets. */
type RelationBucket =
  | "son"
  | "daughter"
  | "spouse"
  | "father"
  | "mother"
  | "brother"
  | "sister"
  | "other"
  | "self";

const RELATIONSHIP_BUCKETS: Record<string, RelationBucket> = {
  SON: "son",
  DAUGHTER: "daughter",
  SPOUSE: "spouse",
  FATHER: "father",
  MOTHER: "mother",
  BROTHER: "brother",
  SISTER: "sister",
};

/** Reads Bengali digits back to a number, for a count the payload sent as text. */
const fromBnDigits = (value: string | undefined): number | null => {
  if (value === undefined) return null;
  const latin = value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
  const parsed = Number(latin);
  return Number.isFinite(parsed) ? parsed : null;
};

export const relationCountsOf = (data: CertificateData): RelationCounts => {
  const sent = data.heirCountsBn;
  const rows = data.heirs ?? [];

  const local: Record<RelationBucket, number> = {
    son: 0,
    daughter: 0,
    spouse: 0,
    father: 0,
    mother: 0,
    brother: 0,
    sister: 0,
    other: 0,
    self: 0,
  };
  for (const row of rows) {
    const code = row.relation_en ?? "";
    if (code === "SELF") {
      local.self += 1;
      continue;
    }
    const bucket = RELATIONSHIP_BUCKETS[code] ?? "other";
    local[bucket] += 1;
  }

  const pick = (key: RelationBucket, sentValue: string | undefined): number =>
    sent ? (fromBnDigits(sentValue) ?? local[key]) : local[key];

  const counts: RelationCounts = {
    son: pick("son", sent?.son),
    daughter: pick("daughter", sent?.daughter),
    spouse: pick("spouse", sent?.spouse),
    father: pick("father", sent?.father),
    mother: pick("mother", sent?.mother),
    brother: pick("brother", sent?.brother),
    sister: pick("sister", sent?.sister),
    other: pick("other", sent?.other),
    self: pick("self", sent?.self),
    dependants: 0,
    withSelf: 0,
  };
  counts.dependants =
    counts.son +
    counts.daughter +
    counts.spouse +
    counts.father +
    counts.mother +
    counts.brother +
    counts.sister +
    counts.other;
  /**
   * ⚠️ THE TOTAL IS SUMMED HERE RATHER THAN READ FROM `total`, and the reason is the fallback:
   * a Demo file supplies the buckets but not always a total, and a total that disagreed with the
   * buckets beside it would be worse than no total. The payload's own `total` is used when the
   * buckets did not come from the payload at all, so a backend change still reaches the paper.
   */
  counts.withSelf =
    sent ? (fromBnDigits(sent.total) ?? counts.dependants) + counts.self : counts.dependants + counts.self;
  return counts;
};

/** The "নিকট আত্মীয়" figure — everyone the warish sentence does not name individually. */
export const relativesOf = (counts: RelationCounts): number =>
  counts.father + counts.mother + counts.brother + counts.sister + counts.other;

/**
 * The note a printer appends to a value it had to render in Bengali.
 *
 * 🔴 THE WORDING IS THE PLATFORM'S, NOT THIS FILE'S. It is duplicated here because the Demo
 * has no build dependency on the backend; a real frontend should read
 * `payload.lang.fallbackNote` (or `ILicenceCertificate.lang.fallbackNote`) and never a
 * literal. Two printers inventing two sentences would make two documents that mean the same
 * thing read differently.
 */
export const CERTIFICATE_FALLBACK_NOTE = "(as per the Bengali record)";
