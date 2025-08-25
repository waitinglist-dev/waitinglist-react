import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  WaitinglistForm,
  EmailField,
  NameField,
  PhoneField,
  signupToWaitinglist,
} from "../../src/index";
import type { WaitinglistEntry } from "../../src/types";

// Demo API key - in real usage, this would be your actual API key
const DEMO_API_KEY = "wl_demo_key";

// Basic Form Example
function BasicExample() {
  const handleSuccess = (data: WaitinglistEntry) => {
    alert(`Success! You're #${data.position} in line.`);
    console.log("Basic form success:", data);
  };

  const handleError = (error: any) => {
    alert(`Error: ${error.message}`);
    console.error("Basic form error:", error);
  };

  return (
    <WaitinglistForm
      apiKey={DEMO_API_KEY}
      fields={["email", "name"]}
      onSuccess={handleSuccess}
      onError={handleError}
      submitButtonText="Join Waitinglist"
    />
  );
}

// Advanced Form Example
function AdvancedExample() {
  const handleSuccess = (data: WaitinglistEntry) => {
    alert(`Welcome to the beta! You're #${data.position} in line.`);
    console.log("Advanced form success:", data);
  };

  const handleError = (error: any) => {
    alert(`Signup failed: ${error.message}`);
    console.error("Advanced form error:", error);
  };

  return (
    <WaitinglistForm
      apiKey={DEMO_API_KEY}
      fields={{
        email: {
          label: "Work Email",
          required: true,
          placeholder: "you@company.com",
        },
        name: {
          label: "Full Name",
          placeholder: "John Doe",
        },
        phone: {
          label: "Phone Number",
          defaultCountry: "US" as any,
          withCountryCallingCode: true,
        },
      }}
      submitButtonText="Join Our Beta"
      successMessage="Thanks for joining our beta program!"
      onSuccess={handleSuccess}
      onError={handleError}
      tags={["beta", "early-access"]}
    />
  );
}

// Custom Form Example with Individual Components
function CustomExample() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signupToWaitinglist(DEMO_API_KEY, {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        tags: ["custom-form"],
      });

      alert(`Custom signup successful! Position: #${result.data.position}`);
      console.log("Custom form success:", result);

      // Reset form
      setFormData({ email: "", name: "", phone: "" });
    } catch (error: any) {
      alert(`Signup failed: ${error.message}`);
      console.error("Custom form error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <EmailField
        value={formData.email}
        onChange={(email) => setFormData((prev) => ({ ...prev, email }))}
        config={{
          label: "Email Address",
          required: true,
          placeholder: "Enter your email",
        }}
        disabled={loading}
      />

      <NameField
        value={formData.name}
        onChange={(name) => setFormData((prev) => ({ ...prev, name }))}
        config={{
          label: "Your Name",
          placeholder: "Enter your name",
        }}
        disabled={loading}
      />

      <PhoneField
        value={formData.phone}
        onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
        config={{
          label: "Phone Number",
          defaultCountry: "US" as any,
          withCountryCallingCode: true,
        }}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading || !formData.email}
        style={{
          padding: "0.75rem 1rem",
          backgroundColor: loading || !formData.email ? "#9ca3af" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          fontSize: "1rem",
          fontWeight: "500",
          cursor: loading || !formData.email ? "not-allowed" : "pointer",
          marginTop: "0.5rem",
        }}
      >
        {loading ? "Signing Up..." : "Sign Up (Custom)"}
      </button>
    </form>
  );
}

// App component is no longer needed - we'll mount components directly

// Note: In development mode, we'll mock the API calls
if (DEMO_API_KEY === "wl_demo_key") {
  console.warn("🚧 Demo Mode: API calls are mocked for demonstration purposes");

  // Mock the API for demo purposes
  const originalSignup = signupToWaitinglist;
  (window as any).signupToWaitinglist = async (apiKey: string, data: any) => {
    console.log("📧 Mock API Call:", { apiKey, data });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return mock response
    return {
      success: true,
      data: {
        id: `demo_${Date.now()}`,
        email: data.email,
        name: data.name,
        position: Math.floor(Math.random() * 1000) + 1,
        is_verified: false,
        created_at: new Date().toISOString(),
      },
      message: "Successfully added to waiting list (demo)",
    };
  };
}

// Mount each component to its respective container
const basicContainer = document.getElementById("basic-form");
const advancedContainer = document.getElementById("advanced-form");
const customContainer = document.getElementById("custom-form");

if (basicContainer) {
  createRoot(basicContainer).render(<BasicExample />);
}

if (advancedContainer) {
  createRoot(advancedContainer).render(<AdvancedExample />);
}

if (customContainer) {
  createRoot(customContainer).render(<CustomExample />);
}
