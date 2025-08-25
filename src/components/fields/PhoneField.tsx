import React from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import type { FieldProps } from "@/types";

export interface PhoneFieldProps extends FieldProps {
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultCountry?: Country;
  international?: boolean;
  withCountryCallingCode?: boolean;
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
}) => {
  const fieldConfig = config || {};
  const finalPlaceholder =
    placeholder || fieldConfig.placeholder || "Enter your phone number";
  const fieldClassName = className || fieldConfig.className || "";
  const fieldStyle = { ...style, ...fieldConfig.style };

  const customStyles = {
    width: "100%",
    fontSize: "1rem",
    borderRadius: "0.375rem",
    border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
    transition: "border-color 0.2s",
    ...fieldStyle,
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
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
      <div
        className={fieldClassName}
        style={{
          ...customStyles,
          padding: 0, // Remove padding as PhoneInput handles it
        }}
      >
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
          style={
            {
              "--PhoneInput-color--focus": "#3b82f6",
              "--PhoneInputCountryFlag-aspectRatio": "1.333",
              "--PhoneInputCountrySelectArrow-color": "#6b7280",
            } as React.CSSProperties
          }
          inputStyle={{
            width: "100%",
            padding: "0.75rem",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            backgroundColor: "transparent",
          }}
          countrySelectStyle={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
          }}
        />
      </div>
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
