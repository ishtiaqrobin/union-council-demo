import { TRADE_LICENSE_INITIAL_DATA } from "./trade-license/tradeLicenseData";
import { TradeLicenseData } from "@/types/license";

export { TRADE_LICENSE_INITIAL_DATA };

export const LICENSES_DATA_MAP: Record<string, TradeLicenseData> = {
  "trade-license": TRADE_LICENSE_INITIAL_DATA,
};

export const LICENSE_MENU_ITEMS = [
  {
    slug: "trade-license",
    titleBn: "ট্রেড লাইসেন্স",
    titleEn: "Trade License (Portrait)",
    iconName: "Briefcase",
    description: "ইউনিয়ন পরিষদ এলাকার পেশা ও ব্যবসা পরিচালনাকারী প্রতিষ্ঠানের ট্রেড লাইসেন্স",
  },
];
