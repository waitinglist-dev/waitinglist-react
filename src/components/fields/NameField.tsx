import React from "react";
import type { FieldProps } from "@/types";

export interface NameFieldProps extends FieldProps {
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  noMargin?: boolean;
  errorMessage?: string;
}

export const NameField: React.FC<NameFieldProps> = ({
  value,
  onChange,
  config,
  error,
  disabled,
  placeholder,
  className,
  style,
  noMargin = false,
  errorMessage,
}) => {
  const fieldConfig = config || {};
  const finalPlaceholder =
    placeholder || fieldConfig.placeholder || "Enter your name";
  const fieldClassName = className || fieldConfig.className || "";
  const fieldStyle = { ...fieldConfig.style, ...style };

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
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={finalPlaceholder}
        disabled={disabled || fieldConfig.disabled}
        required={fieldConfig.required}
        className={fieldClassName}
        style={{
          width: "100%",
          padding: "0.75rem",
          border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
          borderRadius: "0.375rem",
          fontSize: "1rem",
          outline: "none",
          transition: "border-color 0.2s",
          ...fieldStyle,
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
      />
      {error && (
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
            "Please enter a valid name"}
        </div>
      )}
    </div>
  );
};
