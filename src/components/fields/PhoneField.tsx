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

  // Determine if we should show the country selector
  // If showFlag is false AND allowCountryChange is false, hide the selector entirely
  // If showFlag is false BUT allowCountryChange is true, show selector without flags
  const finalShowFlag = fieldConfig.showFlag ?? showFlag;
  const finalAllowCountryChange =
    fieldConfig.allowCountryChange ?? allowCountryChange;
  const shouldShowCountrySelect =
    finalShowFlag === false && finalAllowCountryChange === false
      ? false
      : fieldConfig.showCountrySelect ?? showCountrySelect;

  // Determine country from value or use default
  // If allowCountryChange is false, always use the configured default country
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const configuredCountry = fieldConfig.defaultCountry || defaultCountry;

    // If country change is not allowed, always use the configured country
    if (finalAllowCountryChange === false) {
      return configuredCountry;
    }

    // Otherwise, try to detect from value first
    if (value) {
      const detected = detectCountryFromPhone(value);
      return COUNTRY_DATA[detected] ? detected : configuredCountry;
    }
    return configuredCountry;
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
      // Ensure we always have the correct country data
      const currentCountryData = COUNTRY_DATA[selectedCountry];

      // Combine dial code with phone number for the full value, with a space for readability
      const fullPhoneNumber = phoneNumber
        ? `${currentCountryData?.dialCode || ""} ${phoneNumber}`.trim()
        : "";
      onChange(fullPhoneNumber);

      // Auto-detect country only if country change is allowed and we have a value with dial code
      if (
        finalAllowCountryChange &&
        phoneNumber &&
        phoneNumber.startsWith("+")
      ) {
        const detected = detectCountryFromPhone(phoneNumber);
        if (detected !== selectedCountry && COUNTRY_DATA[detected]) {
          setSelectedCountry(detected);
        }
      }
    },
    [onChange, selectedCountry, finalAllowCountryChange]
  );

  // For validation, use the full phone number that includes the dial code
  const isValid = value ? validatePhoneNumber(value, selectedCountry) : true;

  return (
    <div
      style={{
        marginBottom: noMargin ? "0" : "1rem",
        position: noMargin ? "relative" : "static",
      }}
    >
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
        {shouldShowCountrySelect && (
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
              minWidth: finalShowFlag ? "80px" : "120px",
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
                  {finalShowFlag && country.emoji ? `${country.emoji} ` : ""}
                  {finalShowFlag
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
            marginTop: noMargin ? "0.125rem" : "0.25rem",
            fontSize: "0.875rem",
            color: "#ef4444",
            position: noMargin ? "absolute" : "static",
            top: noMargin ? "100%" : "auto",
            left: noMargin ? "0" : "auto",
            right: noMargin ? "0" : "auto",
            zIndex: noMargin ? "10" : "auto",
            backgroundColor: noMargin ? "white" : "transparent",
            padding: noMargin ? "0.125rem 0.25rem" : "0",
            borderRadius: noMargin ? "0.25rem" : "0",
            boxShadow: noMargin ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
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
