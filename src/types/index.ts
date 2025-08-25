import { Country } from "react-phone-number-input";

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

export interface WaitinglistError {
  success: false;
  error: string;
  message?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface FieldConfig {
  placeholder?: string;
  label?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  // Phone-specific options
  defaultCountry?: Country;
  international?: boolean;
  withCountryCallingCode?: boolean;
}

export type FieldsConfig = {
  [K in keyof WaitinglistFormData]?: FieldConfig;
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
  onSuccess?: (data: WaitinglistEntry) => void;
  onError?: (error: WaitinglistError) => void;
  onSubmit?: (data: WaitinglistFormData) => void;
  className?: string;
  style?: React.CSSProperties;
  submitButtonText?: string;
  submitButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
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

export interface ValidationErrors {
  email?: string;
  name?: string;
  phone?: string;
}
