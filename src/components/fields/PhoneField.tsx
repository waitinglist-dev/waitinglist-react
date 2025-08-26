import React, { useState, useCallback } from "react";
import InputMask from "react-input-mask";
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
  const mask =
    customMask ||
    fieldConfig.customMask ||
    countryData?.mask ||
    "+9999999999999";

  const finalPlaceholder =
    placeholder ||
    fieldConfig.placeholder ||
    (countryData
      ? `${countryData.dialCode} phone number`
      : "Enter your phone number");

  const fieldClassName = className || fieldConfig.className || "";
  const fieldStyle = { ...fieldConfig.style, ...style };

  const handleCountryChange = useCallback(
    (newCountry: string) => {
      if (!allowCountryChange) return;

      setSelectedCountry(newCountry);
      const newCountryData = COUNTRY_DATA[newCountry];
      if (newCountryData) {
        // Update the phone number to use the new country's dial code
        onChange(newCountryData.dialCode);
      }
    },
    [allowCountryChange, onChange]
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);

      // Auto-detect country if user changes the dial code
      if (newValue && newValue.startsWith("+")) {
        const detected = detectCountryFromPhone(newValue);
        if (detected !== selectedCountry && COUNTRY_DATA[detected]) {
          setSelectedCountry(detected);
        }
      }
    },
    [onChange, selectedCountry]
  );

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

        <InputMask
          mask={mask}
          value={value}
          onChange={handlePhoneChange}
          disabled={disabled || fieldConfig.disabled}
          placeholder={finalPlaceholder}
          maskChar=" "
        >
          {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
            <input
              {...inputProps}
              type="tel"
              required={fieldConfig.required}
              className={fieldClassName}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: `1px solid ${
                  error || !isValid ? "#ef4444" : "#d1d5db"
                }`,
                borderRadius: "0.375rem",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
                ...fieldStyle,
              }}
              onFocus={(e) => {
                if (!error && isValid) {
                  e.target.style.borderColor = "#3b82f6";
                }
              }}
              onBlur={(e) => {
                if (!error && isValid) {
                  e.target.style.borderColor = "#d1d5db";
                }
              }}
            />
          )}
        </InputMask>
      </div>

      {(error || (!isValid && value)) && (
        <div
          style={{
            marginTop: "0.25rem",
            fontSize: "0.875rem",
            color: "#ef4444",
          }}
        >
          {error || "Please enter a valid phone number"}
        </div>
      )}
    </div>
  );
};
