import type { EmailFieldProps } from "@/components/fields/EmailField";
import type { NameFieldProps } from "@/components/fields/NameField";
import type { PhoneFieldProps } from "@/components/fields/PhoneField";

export interface WaitinglistEntry {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  position: number;
  is_verified: boolean;
  created_at: string;
}

export interface WaitinglistResponse {
  success: boolean;
  data: WaitinglistEntry;
  message: string;
}

export interface ProjectInfoResponse {
  success: boolean;
  data: {
    project_id: string;
    timestamp: string;
  };
}

export interface VerificationResponse {
  success: boolean;
  message: string;
}

export interface UnsubscribeResponse {
  success: boolean;
  message: string;
}

export interface WaitinglistError {
  success: false;
  error: string;
  message?: string;
  status?: number; // HTTP status code for retry logic
  details?: Array<{
    field: string;
    message: string;
  }>;
}

// Validation Types
export enum ValidationErrorCode {
  REQUIRED = "REQUIRED",
  INVALID_EMAIL = "INVALID_EMAIL",
  INVALID_PHONE = "INVALID_PHONE",
  TOO_SHORT = "TOO_SHORT",
  TOO_LONG = "TOO_LONG",
  INSUFFICIENT_DIGITS = "INSUFFICIENT_DIGITS",
  TOO_MANY_DIGITS = "TOO_MANY_DIGITS",
}

export interface ValidationResult {
  isValid: boolean;
  errorCode?: ValidationErrorCode;
}

export interface ValidationFormErrors {
  email?: ValidationResult;
  phone?: ValidationResult;
  name?: ValidationResult;
}

// Error messages interface (for displaying to users)
export interface ValidationErrors {
  email?: string;
  name?: string;
  phone?: string;
}

// Base field config interface (kept for backwards compatibility)
export interface FieldConfig {
  // Basic field options
  placeholder?: string;
  label?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  errorMessage?: string;
  // Phone-specific options
  defaultCountry?: string;
  customMask?: string;
  showCountrySelect?: boolean;
  showFlag?: boolean;
  allowCountryChange?: boolean;
}

// Specific field config interfaces that extend from the field component props
export interface EmailFieldConfig
  extends Omit<
    EmailFieldProps,
    "value" | "onChange" | "config" | "error" | "disabled"
  > {
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface NameFieldConfig
  extends Omit<
    NameFieldProps,
    "value" | "onChange" | "config" | "error" | "disabled"
  > {
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface PhoneFieldConfig
  extends Omit<
    PhoneFieldProps,
    "value" | "onChange" | "config" | "error" | "disabled"
  > {
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export type FieldsConfig = {
  email?: EmailFieldConfig;
  name?: NameFieldConfig;
  phone?: PhoneFieldConfig;
};

export interface WaitinglistFormData {
  email: string;
  name?: string;
  phone?: string;
  tags?: string[];
}

export interface WaitinglistFormProps {
  apiKey: string;
  apiUrl?: string;
  fields?: (keyof WaitinglistFormData)[] | FieldsConfig;
  layout?: "vertical" | "horizontal";
  onSuccess?: (data: WaitinglistEntry) => void;
  onError?: (error: WaitinglistError) => void;
  onSubmit?: (data: WaitinglistFormData) => void;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  submitButtonText?: string;
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  submitButtonClassName?: string;
  submitButtonStyle?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
  loadingText?: string;
  successMessage?: string;
  errorMessage?: string;
  showMessages?: boolean;
  resetOnSuccess?: boolean;
  tags?: string[];
  collectMetadata?: boolean;
}

export interface FieldProps {
  value: string;
  onChange: (value: string) => void;
  config?: FieldConfig;
  error?: string;
  disabled?: boolean;
}

export interface WaitinglistApiOptions {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}
