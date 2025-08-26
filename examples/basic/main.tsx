/* eslint-disable */
// @ts-nocheck
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  WaitinglistForm,
  EmailField,
  NameField,
  PhoneField,
  signupToWaitinglist,
} from "../../dist/index.es.js";
import type { WaitinglistEntry } from "../../dist/index.d.ts";

// Default demo API key - users can input their own
const DEFAULT_DEMO_API_KEY = "wl_demo_key";

// API Key Input Component
function ApiKeyInput({
  apiKey,
  onChange,
}: {
  apiKey: string;
  onChange: (key: string) => void;
}) {
  return (
    <div
      style={{
        marginBottom: "2rem",
        padding: "1rem",
        backgroundColor: "#f8fafc",
        border: "2px dashed #e2e8f0",
        borderRadius: "0.5rem",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "0.5rem",
          fontSize: "0.875rem",
          fontWeight: "600",
          color: "#374151",
        }}
      >
        API Key (use "wl_demo_key" for mock mode):
      </label>
      <input
        type="text"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your API key (e.g., wl_abc123...)"
        style={{
          width: "100%",
          padding: "0.75rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
          fontSize: "0.875rem",
          fontFamily: "monospace",
          backgroundColor: "white",
        }}
      />
      <p
        style={{
          marginTop: "0.5rem",
          fontSize: "0.75rem",
          color: "#6b7280",
        }}
      >
        Get your API key from{" "}
        <a
          href="https://app.waitinglist.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3b82f6" }}
        >
          app.waitinglist.dev
        </a>
      </p>
    </div>
  );
}

// Basic Form Example
function BasicExample({ apiKey }: { apiKey: string }) {
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
      apiKey={apiKey}
      fields={["email", "name"]}
      onSuccess={handleSuccess}
      onError={handleError}
      submitButtonText="Join Waitinglist"
    />
  );
}

// Advanced Form Example
function AdvancedExample({ apiKey }: { apiKey: string }) {
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
      apiKey={apiKey}
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
          defaultCountry: "US",
          showFlag: true,
          allowCountryChange: true,
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

// Horizontal Layout Example
function HorizontalExample({ apiKey }: { apiKey: string }) {
  const handleSuccess = (data: WaitinglistEntry) => {
    alert(`Horizontal form success! You're #${data.position} in line.`);
    console.log("Horizontal form success:", data);
  };

  const handleError = (error: any) => {
    alert(`Horizontal form error: ${error.message}`);
    console.error("Horizontal form error:", error);
  };

  return (
    <WaitinglistForm
      apiKey={apiKey}
      layout="horizontal"
      fields={{
        email: {
          label: "Email",
          required: true,
          placeholder: "your@email.com",
        },
        name: {
          label: "Name",
          placeholder: "Your name",
        },
        phone: {
          label: "Phone",
          defaultCountry: "US",
          showFlag: true,
          allowCountryChange: true,
        },
      }}
      submitButtonText="Join Waitinglist"
      onSuccess={handleSuccess}
      onError={handleError}
      tags={["horizontal-layout"]}
    />
  );
}

// Test Different Countries Example
function CountryTestExample({ apiKey }: { apiKey: string }) {
  const [results, setResults] = useState<any[]>([]);
  const handleSuccess = (data: WaitinglistEntry, country: string) => {
    const result = {
      country,
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
    setResults((prev) => [...prev, result]);
    console.log(`✅ ${country} form success:`, result);
  };

  const handleError = (error: any, country: string) => {
    const result = {
      country,
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
    setResults((prev) => [...prev, result]);
    console.log(`❌ ${country} form error:`, result);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {/* Brazil Test */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <h4>Brazil (BR) - No Country Change</h4>
          <WaitinglistForm
            apiKey={apiKey}
            fields={{
              phone: {
                label: "WhatsApp",
                defaultCountry: "BR",
                allowCountryChange: false,
                showFlag: false,
                placeholder: "(99) 99999-9999",
              },
            }}
            submitButtonText="Test BR"
            onSuccess={(data) => handleSuccess(data, "BR")}
            onError={(error) => handleError(error, "BR")}
            tags={["test-br"]}
          />
        </div>

        {/* US Test */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <h4>United States (US) - No Country Change</h4>
          <WaitinglistForm
            apiKey={apiKey}
            fields={{
              phone: {
                label: "Phone",
                defaultCountry: "US",
                allowCountryChange: false,
                showFlag: false,
                placeholder: "(999) 999-9999",
              },
            }}
            submitButtonText="Test US"
            onSuccess={(data) => handleSuccess(data, "US")}
            onError={(error) => handleError(error, "US")}
            tags={["test-us"]}
          />
        </div>

        {/* Mexico Test */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <h4>Mexico (MX) - No Country Change</h4>
          <WaitinglistForm
            apiKey={apiKey}
            fields={{
              phone: {
                label: "Teléfono",
                defaultCountry: "MX",
                allowCountryChange: false,
                showFlag: false,
                placeholder: "999 999 9999",
              },
            }}
            submitButtonText="Test MX"
            onSuccess={(data) => handleSuccess(data, "MX")}
            onError={(error) => handleError(error, "MX")}
            tags={["test-mx"]}
          />
        </div>
      </div>

      {/* Results Display */}
      {results.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
          }}
        >
          <h4>Test Results:</h4>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {results.map((result, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: result.success ? "#d1fae5" : "#fee2e2",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                }}
              >
                <strong>{result.country}</strong> -{" "}
                {result.success ? "✅ Success" : "❌ Error"}
                <br />
                {result.success ? (
                  <span>
                    Position: #{result.data.position}, Phone:{" "}
                    {result.data.phone}
                  </span>
                ) : (
                  <span>Error: {result.error}</span>
                )}
                <br />
                <small>{result.timestamp}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Custom Form Example with Individual Components
function CustomExample({ apiKey }: { apiKey: string }) {
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
      const result = await signupToWaitinglist(apiKey, {
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
          defaultCountry: "US",
          showFlag: true,
          allowCountryChange: true,
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

// Main App component that manages all examples
function App() {
  const [apiKey, setApiKey] = useState(DEFAULT_DEMO_API_KEY);

  return (
    <div
      className="container"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f8fafc",
      }}
    >
      <h1 style={{ color: "#1e293b", marginBottom: "0.5rem" }}>
        @waitinglist/react Examples
      </h1>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>
        Interactive examples of the waitinglist.dev React component
      </p>

      {/* API Key Input */}
      <div style={{ marginBottom: "2rem" }}>
        <ApiKeyInput apiKey={apiKey} onChange={setApiKey} />
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            color: "#374151",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Basic Form
        </h2>
        <p>Simple email and name collection:</p>
        <div
          style={{
            border: "2px dashed #d1d5db",
            padding: "2rem",
            borderRadius: "0.5rem",
            background: "#f9fafb",
            marginBottom: "1rem",
          }}
        >
          <BasicExample apiKey={apiKey} />
        </div>
        <pre
          style={{
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "1rem",
            borderRadius: "0.5rem",
            overflowX: "auto",
            fontSize: "0.875rem",
            margin: "1rem 0",
          }}
        >
          <code>{`import { WaitinglistForm } from '@waitinglist/react';

<WaitinglistForm
  apiKey="wl_demo_key"
  fields={['email', 'name']}
  onSuccess={(data) => console.log('Success:', data)}
/>`}</code>
        </pre>
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            color: "#374151",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Advanced Configuration
        </h2>
        <p>Custom field configuration with phone number and labels:</p>
        <div
          style={{
            border: "2px dashed #d1d5db",
            padding: "2rem",
            borderRadius: "0.5rem",
            background: "#f9fafb",
            marginBottom: "1rem",
          }}
        >
          <AdvancedExample apiKey={apiKey} />
        </div>
        <pre>
          <code>{`import { WaitinglistForm } from '@waitinglist/react';

<WaitinglistForm
  apiKey="wl_demo_key"
  fields={{
    email: { 
      label: "Work Email", 
      required: true,
      placeholder: "you@company.com" 
    },
    name: { 
      label: "Full Name",
      placeholder: "John Doe" 
    },
    phone: { 
      label: "Phone Number",
      defaultCountry: "US",
      showFlag: true,
      allowCountryChange: true 
    }
  }}
  submitButtonText="Join Our Beta"
  successMessage="Thanks for joining our beta program!"
/>`}</code>
        </pre>
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            color: "#374151",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Horizontal Layout
        </h2>
        <p>Form with horizontal layout for better space utilization:</p>
        <div
          style={{
            border: "2px dashed #d1d5db",
            padding: "2rem",
            borderRadius: "0.5rem",
            background: "#f9fafb",
            marginBottom: "1rem",
          }}
        >
          <HorizontalExample apiKey={apiKey} />
        </div>
        <pre
          style={{
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "1rem",
            borderRadius: "0.5rem",
            overflowX: "auto",
            fontSize: "0.875rem",
            margin: "1rem 0",
          }}
        >
          <code>{`import { WaitinglistForm } from '@waitinglist/react';

<WaitinglistForm
  apiKey="wl_demo_key"
  layout="horizontal"
  fields={{
    email: { 
      label: "Email", 
      required: true,
      placeholder: "your@email.com" 
    },
    name: { 
      label: "Name",
      placeholder: "Your name" 
    },
    phone: { 
      label: "Phone",
      defaultCountry: "US",
      showFlag: true,
      allowCountryChange: true 
    }
  }}
  submitButtonText="Join Waitinglist"
/>`}</code>
        </pre>
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            color: "#374151",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Debug Phone Field
        </h2>
        <p>Debug phone field behavior with logging and country restrictions:</p>
        <div
          style={{
            border: "2px dashed #d1d5db",
            padding: "2rem",
            borderRadius: "0.5rem",
            background: "#f9fafb",
            marginBottom: "1rem",
          }}
        >
          <DebugPhoneExample apiKey={apiKey} />
        </div>
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            color: "#374151",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Country Validation Tests
        </h2>
        <p>
          Test phone validation across different countries with fixed settings:
        </p>
        <div
          style={{
            border: "2px dashed #d1d5db",
            padding: "2rem",
            borderRadius: "0.5rem",
            background: "#f9fafb",
            marginBottom: "1rem",
          }}
        >
          <CountryTestExample apiKey={apiKey} />
        </div>
      </div>

      <div className="example">
        <h2>Individual Field Components</h2>
        <p>Using individual field components for custom layouts:</p>
        <div className="form-container">
          <CustomExample apiKey={apiKey} />
        </div>
        <pre>
          <code>{`import { EmailField, NameField, PhoneField } from '@waitinglist/react';

// Custom form with individual components
function CustomForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div>
      <EmailField value={email} onChange={setEmail} />
      <NameField value={name} onChange={setName} />
      <PhoneField value={phone} onChange={setPhone} />
    </div>
  );
}`}</code>
        </pre>
      </div>
    </div>
  );
}

// Note: In development mode, we'll mock the API calls for demo key
console.warn(
  "🚧 Demo Mode: When using 'wl_demo_key', API calls are mocked for demonstration purposes"
);

// Mock the API for demo purposes when using the demo key
const originalSignup = signupToWaitinglist;
const mockSignup = async (apiKey: string, data: any) => {
  // Only mock when using demo key
  if (apiKey === DEFAULT_DEMO_API_KEY) {
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
  } else {
    // Use real API for actual API keys
    return originalSignup(apiKey, data);
  }
};

// Replace the global function with our conditional mock
(window as any).signupToWaitinglist = mockSignup;

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  if (container) {
    createRoot(container).render(<App />);
  }
});
