import React, { useState, useCallback } from "react";
import { IMaskInput } from "react-imask";
import type { FieldProps } from "@/types";
import {
  COUNTRY_DATA,
  DEFAULT_COUNTRY,
  detectCountryFromPhone,
  validatePhoneNumber,
} from "@/utils/phoneMasks";

export interface PhoneFieldProps extends FieldProps {
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultCountry?: string;
  customMask?: string;
  showCountrySelect?: boolean;
  showFlag?: boolean;
  allowCountryChange?: boolean;
  noMargin?: boolean;
  errorMessage?: string;
}

export const PhoneField: React.FC<PhoneFieldProps> = ({
  value,
  onChange,
  config,
  error,
  disabled,
  placeholder,
  className,
  style,
  defaultCountry = DEFAULT_COUNTRY,
  customMask,
  showCountrySelect = true,
  showFlag = true,
  allowCountryChange = true,
  noMargin = false,
  errorMessage,
}) => {
  const fieldConfig = config || {};

  // Determine country from value or use default
  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (value) {
      const detected = detectCountryFromPhone(value);
      return COUNTRY_DATA[detected] ? detected : defaultCountry;
    }
    return fieldConfig.defaultCountry || defaultCountry;
  });

  const countryData = COUNTRY_DATA[selectedCountry];

  // Create mask without dial code since we have a separate country selector
  const createMaskWithoutDialCode = (originalMask: string) => {
    if (!originalMask) return "(000) 000-0000";
    // Remove the dial code part (everything up to and including the first space)
    const maskWithoutDialCode = originalMask.replace(/^\+\d+\s*/, "");
    return maskWithoutDialCode || "(000) 000-0000";
  };

  const mask =
    customMask ||
    fieldConfig.customMask ||
    (countryData?.mask
      ? createMaskWithoutDialCode(countryData.mask)
      : "(000) 000-0000");

  const finalPlaceholder =
    placeholder || fieldConfig.placeholder || "Enter phone number";

  const fieldClassName = className || fieldConfig.className || "";
  const fieldStyle = { ...fieldConfig.style, ...style };

  const handleCountryChange = useCallback(
    (newCountry: string) => {
      if (!allowCountryChange) return;

      setSelectedCountry(newCountry);
      // Don't automatically set dial code - let user type their number
    },
    [allowCountryChange]
  );

  const handlePhoneChange = useCallback(
    (phoneNumber: string) => {
      // Combine dial code with phone number for the full value, with a space for readability
      const fullPhoneNumber = phoneNumber
        ? `${countryData?.dialCode || ""} ${phoneNumber}`.trim()
        : "";
      onChange(fullPhoneNumber);
    },
    [onChange, countryData?.dialCode]
  );

  // For validation, use the full phone number that includes the dial code
  const isValid = value ? validatePhoneNumber(value, selectedCountry) : true;

  return (
    <div style={{ marginBottom: noMargin ? "0" : "1rem" }}>
      {fieldConfig.label && (
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
            color: "#374151",
          }}
        >
          {fieldConfig.label}
          {fieldConfig.required && (
            <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>
          )}
        </label>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {showCountrySelect && (
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            disabled={disabled || fieldConfig.disabled || !allowCountryChange}
            style={{
              padding: "0.75rem 0.5rem",
              border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
              borderRadius: "0.375rem",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.2s",
              backgroundColor: "white",
              cursor:
                disabled || fieldConfig.disabled || !allowCountryChange
                  ? "not-allowed"
                  : "pointer",
              minWidth: showFlag ? "80px" : "120px",
            }}
            onFocus={(e) => {
              if (!error) {
                e.target.style.borderColor = "#3b82f6";
              }
            }}
            onBlur={(e) => {
              if (!error) {
                e.target.style.borderColor = "#d1d5db";
              }
            }}
          >
            {Object.values(COUNTRY_DATA)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((country) => (
                <option key={country.code} value={country.code}>
                  {showFlag && country.emoji ? `${country.emoji} ` : ""}
                  {showFlag
                    ? country.dialCode
                    : `${country.name} (${country.dialCode})`}
                </option>
              ))}
          </select>
        )}

        <IMaskInput
          mask={mask}
          value={value ? value.replace(/^\+\d+\s*/, "").trim() : ""}
          onAccept={handlePhoneChange}
          placeholder={finalPlaceholder}
          disabled={disabled || fieldConfig.disabled}
          lazy={true}
          placeholderChar={""}
          definitions={{
            "9": /[0-9]/, // Redefine '9' to be a required digit instead of optional
          }}
          inputRef={(ref) => {
            // Store ref for focus/blur handling
            if (ref) {
              ref.type = "tel";
              ref.required = fieldConfig.required || false;
              ref.className = fieldClassName;

              // Apply styles
              Object.assign(ref.style, {
                flex: "1",
                padding: "0.75rem",
                border: `1px solid ${
                  error || !isValid ? "#ef4444" : "#d1d5db"
                }`,
                borderRadius: "0.375rem",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
                ...fieldStyle,
              });

              // Add event listeners
              ref.addEventListener("focus", () => {
                if (!error && isValid) {
                  ref.style.borderColor = "#3b82f6";
                }
              });

              ref.addEventListener("blur", () => {
                if (!error && isValid) {
                  ref.style.borderColor = "#d1d5db";
                }
              });
            }
          }}
        />
      </div>

      {(error || (!isValid && value)) && (
        <div
          style={{
            marginTop: "0.25rem",
            fontSize: "0.875rem",
            color: "#ef4444",
          }}
        >
          {error ||
            errorMessage ||
            fieldConfig.errorMessage ||
            "Please enter a valid phone number"}
        </div>
      )}
    </div>
  );
};
