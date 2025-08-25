import React, { useState, useCallback } from "react";
import { EmailField, NameField, PhoneField } from "@/components/fields";
import { signupToWaitinglist } from "@/api/waitinglist";
import { validateForm, hasValidationErrors } from "@/utils/validation";
import type {
  WaitinglistFormProps,
  WaitinglistFormData,
  FieldsConfig,
  FieldConfig,
  ValidationErrors,
  WaitinglistError,
} from "@/types";

export const WaitinglistForm: React.FC<WaitinglistFormProps> = ({
  apiKey,
  apiUrl,
  fields = ["email", "name"],
  onSuccess,
  onError,
  onSubmit,
  className,
  style,
  submitButtonText = "Join Waitinglist",
  submitButtonProps,
  disabled = false,
  children,
  loadingText = "Joining...",
  successMessage = "Successfully joined the waitinglist!",
  errorMessage = "Something went wrong. Please try again.",
  showMessages = true,
  resetOnSuccess = true,
  tags = [],
}) => {
  const [formData, setFormData] = useState<WaitinglistFormData>({
    email: "",
    name: "",
    phone: "",
    tags,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Determine which fields to show
  const fieldsConfig: FieldsConfig = Array.isArray(fields)
    ? fields.reduce((acc, field) => ({ ...acc, [field]: {} }), {})
    : fields;

  const requiredFields = Object.entries(fieldsConfig)
    .filter(([, config]: [string, FieldConfig]) => config.required)
    .map(([field]: [string, FieldConfig]) => field);

  // Ensure at least email is always included
  if (!fieldsConfig.email) {
    fieldsConfig.email = {};
  }

  const updateField = useCallback(
    (field: keyof WaitinglistFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (errors[field as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      // Clear status messages when user makes changes
      if (submitStatus !== "idle") {
        setSubmitStatus("idle");
        setStatusMessage("");
      }
    },
    [errors, submitStatus]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (disabled || isLoading) return;

    // Validate form
    const validationErrors = validateForm(formData, requiredFields);

    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSubmitStatus("idle");

    try {
      // Call onSubmit callback if provided
      onSubmit?.(formData);

      // Submit to API
      const response = await signupToWaitinglist(apiKey, formData, {
        apiUrl,
      });

      // Handle success
      setSubmitStatus("success");
      if (showMessages) {
        setStatusMessage(successMessage);
      }

      // Reset form if requested
      if (resetOnSuccess) {
        setFormData({
          email: "",
          name: "",
          phone: "",
          tags,
        });
      }

      onSuccess?.(response.data);
    } catch (error: unknown) {
      console.error("Waitinglist signup error:", error);

      setSubmitStatus("error");
      const errorObj = error as {
        error?: string;
        message?: string;
        details?: Array<{ field: string; message: string }>;
      };
      const message = errorObj.error || errorObj.message || errorMessage;

      if (showMessages) {
        setStatusMessage(message);
      }

      // Handle field-specific errors
      if (errorObj.details) {
        const fieldErrors: ValidationErrors = {};
        errorObj.details.forEach((detail) => {
          if (detail.field in formData) {
            fieldErrors[detail.field as keyof ValidationErrors] =
              detail.message;
          }
        });
        setErrors(fieldErrors);
      }

      onError?.(error as WaitinglistError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      style={{
        maxWidth: "400px",
        ...style,
      }}
    >
      {fieldsConfig.email && (
        <EmailField
          value={formData.email}
          onChange={(value) => updateField("email", value)}
          config={fieldsConfig.email}
          error={errors.email}
          disabled={disabled || isLoading}
        />
      )}

      {fieldsConfig.name && (
        <NameField
          value={formData.name || ""}
          onChange={(value) => updateField("name", value)}
          config={fieldsConfig.name}
          error={errors.name}
          disabled={disabled || isLoading}
        />
      )}

      {fieldsConfig.phone && (
        <PhoneField
          value={formData.phone || ""}
          onChange={(value) => updateField("phone", value)}
          config={fieldsConfig.phone}
          error={errors.phone}
          disabled={disabled || isLoading}
        />
      )}

      {children}

      <button
        type="submit"
        disabled={disabled || isLoading}
        {...submitButtonProps}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          backgroundColor: disabled || isLoading ? "#9ca3af" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          fontWeight: "500",
          cursor: disabled || isLoading ? "not-allowed" : "pointer",
          transition: "background-color 0.2s",
          marginTop: "0.5rem",
          ...submitButtonProps?.style,
        }}
        onMouseEnter={(e) => {
          if (!disabled && !isLoading) {
            e.currentTarget.style.backgroundColor = "#2563eb";
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !isLoading) {
            e.currentTarget.style.backgroundColor = "#3b82f6";
          }
        }}
      >
        {isLoading ? loadingText : submitButtonText}
      </button>

      {showMessages && statusMessage && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            backgroundColor: submitStatus === "success" ? "#d1fae5" : "#fee2e2",
            color: submitStatus === "success" ? "#065f46" : "#dc2626",
            border: `1px solid ${
              submitStatus === "success" ? "#a7f3d0" : "#fecaca"
            }`,
          }}
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
};
