import { UNMARRIED_INITIAL_DATA } from "./unmarried.data";
import { INHERITANCE_INITIAL_DATA } from "./inheritance.data";
import { WARISH_INITIAL_DATA } from "./warish.data";
import { CITIZENSHIP_INITIAL_DATA } from "./citizenship.data";
import { FAMILY_INITIAL_DATA } from "./family.data";
import { SAME_NAME_INITIAL_DATA } from "./same-name.data";
import { REMARRIAGE_INITIAL_DATA } from "./remarriage.data";
import { TESTIMONIAL_INITIAL_DATA } from "./testimonial.data";
import { ANNUAL_INCOME_INITIAL_DATA } from "./annual-income.data";
import { LANDLESS_INITIAL_DATA } from "./landless.data";
import { DEATH_REGISTRATION_INITIAL_DATA } from "./deathRegistrationData";
import { CertificateData } from "@/types/certificate";

export {
  UNMARRIED_INITIAL_DATA,
  INHERITANCE_INITIAL_DATA,
  WARISH_INITIAL_DATA,
  CITIZENSHIP_INITIAL_DATA,
  FAMILY_INITIAL_DATA,
  SAME_NAME_INITIAL_DATA,
  REMARRIAGE_INITIAL_DATA,
  TESTIMONIAL_INITIAL_DATA,
  ANNUAL_INCOME_INITIAL_DATA,
  LANDLESS_INITIAL_DATA,
  DEATH_REGISTRATION_INITIAL_DATA,
};

export const CERTIFICATES_DATA_MAP: Record<string, CertificateData> = {
  unmarried: UNMARRIED_INITIAL_DATA,
  inheritance: INHERITANCE_INITIAL_DATA,
  warish: WARISH_INITIAL_DATA,
  citizenship: CITIZENSHIP_INITIAL_DATA,
  family: FAMILY_INITIAL_DATA,
  "same-name": SAME_NAME_INITIAL_DATA,
  remarriage: REMARRIAGE_INITIAL_DATA,
  testimonial: TESTIMONIAL_INITIAL_DATA,
  "annual-income": ANNUAL_INCOME_INITIAL_DATA,
  landless: LANDLESS_INITIAL_DATA,
  "death-registration": DEATH_REGISTRATION_INITIAL_DATA,
};
