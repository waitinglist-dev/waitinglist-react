// Main form component
export { WaitinglistForm } from "@/components/WaitinglistForm";

// Individual field components
export { EmailField, NameField, PhoneField } from "@/components/fields";

// API functions
export {
  WaitinglistApi,
  createWaitinglistApi,
  signupToWaitinglist,
  getProjectInfo,
  verifyEmail,
  unsubscribe,
} from "@/api/waitinglist";

// Utility functions
export {
  validateEmail,
  validatePhone,
  validateName,
  validateForm,
  hasValidationErrors,
} from "@/utils/validation";

// Types
export type {
  WaitinglistEntry,
  WaitinglistResponse,
  WaitinglistError,
  WaitinglistFormData,
  WaitinglistFormProps,
  WaitinglistApiOptions,
  ProjectInfoResponse,
  VerificationResponse,
  UnsubscribeResponse,
  FieldConfig,
  FieldsConfig,
  FieldProps,
  ValidationErrors,
} from "@/types";

export type {
  EmailFieldProps,
  NameFieldProps,
  PhoneFieldProps,
} from "@/components/fields";
