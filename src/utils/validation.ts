import type {
  WaitinglistFormData,
  ValidationResult,
  ValidationFormErrors,
} from "@/types";
import { ValidationErrorCode } from "@/types";

// Types are now imported from @/types

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, errorCode: ValidationErrorCode.REQUIRED };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, errorCode: ValidationErrorCode.INVALID_EMAIL };
  }

  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: true }; // Phone is optional
  }

  // More flexible phone validation that accepts formatted international numbers
  // Remove all non-digit characters to count actual digits
  const digitsOnly = phone.replace(/\D/g, "");

  // Must have at least 10 digits for a valid phone number
  if (digitsOnly.length < 10) {
    return {
      isValid: false,
      errorCode: ValidationErrorCode.INSUFFICIENT_DIGITS,
    };
  }

  // Must have at most 15 digits (international standard)
  if (digitsOnly.length > 15) {
    return { isValid: false, errorCode: ValidationErrorCode.TOO_MANY_DIGITS };
  }

  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: true }; // Name is optional
  }

  if (name.trim().length < 2) {
    return { isValid: false, errorCode: ValidationErrorCode.TOO_SHORT };
  }

  if (name.trim().length > 100) {
    return { isValid: false, errorCode: ValidationErrorCode.TOO_LONG };
  }

  return { isValid: true };
};

// ValidationFormErrors is now imported from @/types

export const validateForm = (
  data: WaitinglistFormData,
  requiredFields: string[] = ["email"]
): ValidationFormErrors => {
  const errors: ValidationFormErrors = {};

  // Only validate email if it's in the required fields
  if (requiredFields.includes("email")) {
    const emailResult = validateEmail(data.email);
    if (!emailResult.isValid) {
      errors.email = emailResult;
    }
  }

  // Validate name if provided or required
  if (data.name || requiredFields.includes("name")) {
    const nameResult = validateName(data.name || "");
    if (!nameResult.isValid) {
      errors.name = nameResult;
    }
  }

  // Validate phone if provided or required
  if (data.phone || requiredFields.includes("phone")) {
    const phoneResult = validatePhone(data.phone || "");
    if (!phoneResult.isValid) {
      errors.phone = phoneResult;
    }
  }

  // Ensure at least email or phone is provided, but only if neither field is required individually
  const hasEmail = requiredFields.includes("email") && data.email;
  const hasPhone = requiredFields.includes("phone") && data.phone;
  const hasAnyRequiredField = hasEmail || hasPhone || data.email || data.phone;

  if (!hasAnyRequiredField) {
    if (requiredFields.includes("email")) {
      errors.email = {
        isValid: false,
        errorCode: ValidationErrorCode.REQUIRED,
      };
    } else if (requiredFields.includes("phone")) {
      errors.phone = {
        isValid: false,
        errorCode: ValidationErrorCode.REQUIRED,
      };
    } else {
      errors.email = {
        isValid: false,
        errorCode: ValidationErrorCode.REQUIRED,
      };
    }
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

// Default error messages mapping
export const getDefaultErrorMessage = (
  errorCode: ValidationErrorCode,
  field: string
): string => {
  const messages = {
    [ValidationErrorCode.REQUIRED]: `${field} is required`,
    [ValidationErrorCode.INVALID_EMAIL]: "Please enter a valid email address",
    [ValidationErrorCode.INVALID_PHONE]: "Please enter a valid phone number",
    [ValidationErrorCode.TOO_SHORT]: `${field} is too short`,
    [ValidationErrorCode.TOO_LONG]: `${field} is too long`,
    [ValidationErrorCode.INSUFFICIENT_DIGITS]:
      "Phone number must have at least 10 digits",
    [ValidationErrorCode.TOO_MANY_DIGITS]:
      "Phone number must have at most 15 digits",
  };

  return messages[errorCode] || `${field} is invalid`;
};
