import { TRADE_LICENSE_INITIAL_DATA } from "./trade-license/tradeLicenseData";
import { VEHICLE_LICENSE_INITIAL_DATA } from "./vehicle-license/vehicleLicenseData";

export { TRADE_LICENSE_INITIAL_DATA, VEHICLE_LICENSE_INITIAL_DATA };

export const LICENSES_DATA_MAP = {
  "trade-license": TRADE_LICENSE_INITIAL_DATA,
  "vehicle-license": VEHICLE_LICENSE_INITIAL_DATA,
};

export const LICENSE_MENU_ITEMS = [
  {
    slug: "trade-license",
    titleBn: "ট্রেড লাইসেন্স",
    titleEn: "Trade License (Portrait)",
    iconName: "Briefcase",
    description: "ইউনিয়ন পরিষদ এলাকার পেশা ও ব্যবসা পরিচালনাকারী প্রতিষ্ঠানের ট্রেড লাইসেন্স",
  },
  {
    slug: "vehicle-license",
    titleBn: "যানবাহন লাইসেন্স",
    titleEn: "Vehicle License (Portrait)",
    iconName: "Briefcase",
    description: "ইউনিয়ন পরিষদ এলাকার সকল প্রকার যানবাহনের সরকারি লাইসেন্স",
  },
];
