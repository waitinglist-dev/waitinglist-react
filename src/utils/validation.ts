import type { WaitinglistFormData, ValidationErrors } from "@/types";

export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return undefined;
};

export const validatePhone = (phone: string): string | undefined => {
  if (!phone) {
    return undefined; // Phone is optional
  }

  // Basic phone validation - accepts various formats
  const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return "Please enter a valid phone number";
  }

  return undefined;
};

export const validateName = (name: string): string | undefined => {
  if (!name) {
    return undefined; // Name is optional
  }

  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }

  if (name.trim().length > 100) {
    return "Name must be less than 100 characters";
  }

  return undefined;
};

export const validateForm = (
  data: WaitinglistFormData,
  requiredFields: string[] = ["email"]
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate email
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  // Validate name if provided or required
  if (data.name || requiredFields.includes("name")) {
    const nameError = validateName(data.name || "");
    if (nameError) {
      errors.name = nameError;
    }
  }

  // Validate phone if provided or required
  if (data.phone || requiredFields.includes("phone")) {
    const phoneError = validatePhone(data.phone || "");
    if (phoneError) {
      errors.phone = phoneError;
    }
  }

  // Ensure at least email or phone is provided
  if (!data.email && !data.phone) {
    errors.email = "Either email or phone number is required";
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
