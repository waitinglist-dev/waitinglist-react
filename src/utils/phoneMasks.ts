export interface CountryData {
  code: string;
  name: string;
  mask: string;
  emoji?: string;
  dialCode: string;
}

export const COUNTRY_DATA: Record<string, CountryData> = {
  // North America
  US: {
    code: "US",
    name: "United States",
    mask: "+1 (999) 999-9999",
    emoji: "🇺🇸",
    dialCode: "+1",
  },
  CA: {
    code: "CA",
    name: "Canada",
    mask: "+1 (999) 999-9999",
    emoji: "🇨🇦",
    dialCode: "+1",
  },
  MX: {
    code: "MX",
    name: "Mexico",
    mask: "+52 999 999 9999",
    emoji: "🇲🇽",
    dialCode: "+52",
  },
  // South America
  BR: {
    code: "BR",
    name: "Brazil",
    mask: "+55 (99) 99999-9999",
    emoji: "🇧🇷",
    dialCode: "+55",
  },
  AR: {
    code: "AR",
    name: "Argentina",
    mask: "+54 9 9999 9999",
    emoji: "🇦🇷",
    dialCode: "+54",
  },
  CL: {
    code: "CL",
    name: "Chile",
    mask: "+56 9 9999 9999",
    emoji: "🇨🇱",
    dialCode: "+56",
  },
  CO: {
    code: "CO",
    name: "Colombia",
    mask: "+57 999 999 9999",
    emoji: "🇨🇴",
    dialCode: "+57",
  },
  PE: {
    code: "PE",
    name: "Peru",
    mask: "+51 999 999 999",
    emoji: "🇵🇪",
    dialCode: "+51",
  },
  UY: {
    code: "UY",
    name: "Uruguay",
    mask: "+598 99 999 999",
    emoji: "🇺🇾",
    dialCode: "+598",
  },
  VE: {
    code: "VE",
    name: "Venezuela",
    mask: "+58 999 999 9999",
    emoji: "🇻🇪",
    dialCode: "+58",
  },
  EC: {
    code: "EC",
    name: "Ecuador",
    mask: "+593 99 999 9999",
    emoji: "🇪🇨",
    dialCode: "+593",
  },
  // Europe
  GB: {
    code: "GB",
    name: "United Kingdom",
    mask: "+44 9999 999999",
    emoji: "🇬🇧",
    dialCode: "+44",
  },
  FR: {
    code: "FR",
    name: "France",
    mask: "+33 9 99 99 99 99",
    emoji: "🇫🇷",
    dialCode: "+33",
  },
  DE: {
    code: "DE",
    name: "Germany",
    mask: "+49 999 99999999",
    emoji: "🇩🇪",
    dialCode: "+49",
  },
  ES: {
    code: "ES",
    name: "Spain",
    mask: "+34 999 999 999",
    emoji: "🇪🇸",
    dialCode: "+34",
  },
  IT: {
    code: "IT",
    name: "Italy",
    mask: "+39 999 999 9999",
    emoji: "🇮🇹",
    dialCode: "+39",
  },
  PT: {
    code: "PT",
    name: "Portugal",
    mask: "+351 999 999 999",
    emoji: "🇵🇹",
    dialCode: "+351",
  },
  NL: {
    code: "NL",
    name: "Netherlands",
    mask: "+31 9 9999 9999",
    emoji: "🇳🇱",
    dialCode: "+31",
  },
  BE: {
    code: "BE",
    name: "Belgium",
    mask: "+32 999 99 99 99",
    emoji: "🇧🇪",
    dialCode: "+32",
  },
  CH: {
    code: "CH",
    name: "Switzerland",
    mask: "+41 99 999 99 99",
    emoji: "🇨🇭",
    dialCode: "+41",
  },
  AT: {
    code: "AT",
    name: "Austria",
    mask: "+43 999 999 9999",
    emoji: "🇦🇹",
    dialCode: "+43",
  },
  SE: {
    code: "SE",
    name: "Sweden",
    mask: "+46 99 999 99 99",
    emoji: "🇸🇪",
    dialCode: "+46",
  },
  NO: {
    code: "NO",
    name: "Norway",
    mask: "+47 999 99 999",
    emoji: "🇳🇴",
    dialCode: "+47",
  },
  DK: {
    code: "DK",
    name: "Denmark",
    mask: "+45 99 99 99 99",
    emoji: "🇩🇰",
    dialCode: "+45",
  },
  FI: {
    code: "FI",
    name: "Finland",
    mask: "+358 99 999 9999",
    emoji: "🇫🇮",
    dialCode: "+358",
  },
  PL: {
    code: "PL",
    name: "Poland",
    mask: "+48 999 999 999",
    emoji: "🇵🇱",
    dialCode: "+48",
  },
  CZ: {
    code: "CZ",
    name: "Czech Republic",
    mask: "+420 999 999 999",
    emoji: "🇨🇿",
    dialCode: "+420",
  },
  RU: {
    code: "RU",
    name: "Russia",
    mask: "+7 999 999 99 99",
    emoji: "🇷🇺",
    dialCode: "+7",
  },
  // Asia
  CN: {
    code: "CN",
    name: "China",
    mask: "+86 999 9999 9999",
    emoji: "🇨🇳",
    dialCode: "+86",
  },
  IN: {
    code: "IN",
    name: "India",
    mask: "+91 99999 99999",
    emoji: "🇮🇳",
    dialCode: "+91",
  },
  JP: {
    code: "JP",
    name: "Japan",
    mask: "+81 99 9999 9999",
    emoji: "🇯🇵",
    dialCode: "+81",
  },
  KR: {
    code: "KR",
    name: "South Korea",
    mask: "+82 99 9999 9999",
    emoji: "🇰🇷",
    dialCode: "+82",
  },
  SG: {
    code: "SG",
    name: "Singapore",
    mask: "+65 9999 9999",
    emoji: "🇸🇬",
    dialCode: "+65",
  },
  MY: {
    code: "MY",
    name: "Malaysia",
    mask: "+60 99 999 9999",
    emoji: "🇲🇾",
    dialCode: "+60",
  },
  TH: {
    code: "TH",
    name: "Thailand",
    mask: "+66 99 999 9999",
    emoji: "🇹🇭",
    dialCode: "+66",
  },
  VN: {
    code: "VN",
    name: "Vietnam",
    mask: "+84 999 999 999",
    emoji: "🇻🇳",
    dialCode: "+84",
  },
  PH: {
    code: "PH",
    name: "Philippines",
    mask: "+63 999 999 9999",
    emoji: "🇵🇭",
    dialCode: "+63",
  },
  ID: {
    code: "ID",
    name: "Indonesia",
    mask: "+62 999 9999 9999",
    emoji: "🇮🇩",
    dialCode: "+62",
  },
  // Oceania
  AU: {
    code: "AU",
    name: "Australia",
    mask: "+61 9 9999 9999",
    emoji: "🇦🇺",
    dialCode: "+61",
  },
  NZ: {
    code: "NZ",
    name: "New Zealand",
    mask: "+64 99 999 9999",
    emoji: "🇳🇿",
    dialCode: "+64",
  },
  // Africa
  ZA: {
    code: "ZA",
    name: "South Africa",
    mask: "+27 99 999 9999",
    emoji: "🇿🇦",
    dialCode: "+27",
  },
  NG: {
    code: "NG",
    name: "Nigeria",
    mask: "+234 999 999 9999",
    emoji: "🇳🇬",
    dialCode: "+234",
  },
  EG: {
    code: "EG",
    name: "Egypt",
    mask: "+20 999 999 9999",
    emoji: "🇪🇬",
    dialCode: "+20",
  },
  // Middle East
  AE: {
    code: "AE",
    name: "United Arab Emirates",
    mask: "+971 99 999 9999",
    emoji: "🇦🇪",
    dialCode: "+971",
  },
  SA: {
    code: "SA",
    name: "Saudi Arabia",
    mask: "+966 99 999 9999",
    emoji: "🇸🇦",
    dialCode: "+966",
  },
  IL: {
    code: "IL",
    name: "Israel",
    mask: "+972 99 999 9999",
    emoji: "🇮🇱",
    dialCode: "+972",
  },
  TR: {
    code: "TR",
    name: "Turkey",
    mask: "+90 999 999 99 99",
    emoji: "🇹🇷",
    dialCode: "+90",
  },
};

export const DEFAULT_COUNTRY = "US";

export function detectCountryFromPhone(phone: string): string {
  if (!phone || !phone.startsWith("+")) {
    return DEFAULT_COUNTRY;
  }

  // Sort by dial code length (longest first) to match more specific codes first
  const sortedCountries = Object.values(COUNTRY_DATA).sort(
    (a, b) => b.dialCode.length - a.dialCode.length
  );

  for (const country of sortedCountries) {
    if (phone.startsWith(country.dialCode)) {
      return country.code;
    }
  }

  return DEFAULT_COUNTRY;
}

export function validatePhoneNumber(
  phone: string,
  countryCode?: string
): boolean {
  if (!phone) return false;

  const country = countryCode ? COUNTRY_DATA[countryCode] : null;
  if (!country) {
    // Generic validation for unknown countries
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  // Check if phone starts with the correct dial code
  if (!phone.startsWith(country.dialCode)) {
    return false;
  }

  // Count digits (excluding dial code)
  const phoneDigits = phone.replace(/\D/g, "").length;
  const expectedDigits = country.mask.replace(/[^9]/g, "").length;

  return phoneDigits === expectedDigits;
}

export function formatPhoneNumber(phone: string, countryCode?: string): string {
  if (!phone) return "";

  const country = countryCode ? COUNTRY_DATA[countryCode] : null;
  if (!country) return phone;

  // Simple formatting - just ensure it starts with dial code
  if (!phone.startsWith(country.dialCode)) {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length > 0) {
      return country.dialCode + " " + cleaned;
    }
  }

  return phone;
}
