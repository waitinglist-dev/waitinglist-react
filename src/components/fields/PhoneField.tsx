import React from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import type { FieldProps } from "@/types";

export interface PhoneFieldProps extends FieldProps {
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultCountry?: Country;
  international?: boolean;
  withCountryCallingCode?: boolean;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  countrySelectClassName?: string;
  countrySelectStyle?: React.CSSProperties;
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
  defaultCountry = "US" as Country,
  international = true,
  withCountryCallingCode = true,
  inputClassName,
  inputStyle,
  countrySelectClassName,
  countrySelectStyle,
  noMargin = false,
}) => {
  const fieldConfig = config || {};
  const finalPlaceholder =
    placeholder || fieldConfig.placeholder || "Enter your phone number";
  const fieldClassName = className || fieldConfig.className || "";
  const fieldStyle = { ...fieldConfig.style, ...style };

  const customStyles = {
    width: "100%",
    fontSize: "1rem",
    borderRadius: "0.375rem",
    border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
    transition: "border-color 0.2s",
    ...fieldStyle,
  };

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
      <PhoneInput
        value={value}
        onChange={(val) => onChange(val || "")}
        placeholder={finalPlaceholder}
        disabled={disabled || fieldConfig.disabled}
        defaultCountry={
          (fieldConfig.defaultCountry as Country) || defaultCountry
        }
        international={fieldConfig.international ?? international}
        withCountryCallingCode={
          fieldConfig.withCountryCallingCode ?? withCountryCallingCode
        }
        className={fieldClassName}
        inputClassName={inputClassName}
        countrySelectClassName={countrySelectClassName}
        style={{
          "--PhoneInput-color--focus": "#3b82f6",
          "--PhoneInputCountryFlag-aspectRatio": "1.333",
          "--PhoneInputCountrySelectArrow-color": "#6b7280",
          ...customStyles,
        }}
        inputStyle={{
          width: "100%",
          padding: "0.75rem",
          border: "none",
          outline: "none",
          fontSize: "1rem",
          backgroundColor: "transparent",
          ...inputStyle,
        }}
        countrySelectStyle={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          ...countrySelectStyle,
        }}
      />
      {error && (
        <div
          style={{
            marginTop: "0.25rem",
            fontSize: "0.875rem",
            color: "#ef4444",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};
