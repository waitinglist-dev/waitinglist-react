import React, { useState } from "react";
import {
  WaitinglistForm,
  EmailField,
  NameField,
  PhoneField,
} from "@waitinglist/react";

// Basic horizontal layout
function BasicHorizontalExample() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
      layout="horizontal"
      fields={["email", "name"]}
      submitButtonText="Join Now"
      onSuccess={(data) => {
        console.log(`Signed up! Position: #${data.position}`);
      }}
    />
  );
}

// Horizontal with phone number
function HorizontalWithPhoneExample() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
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
      onSuccess={(data) => {
        console.log(`Success! Position: #${data.position}`);
      }}
    />
  );
}

// Horizontal with custom styling
function StyledHorizontalExample() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <WaitinglistForm
        apiKey="wl_your_api_key_here"
        layout="horizontal"
        fields={{
          email: {
            label: "Work Email",
            required: true,
            placeholder: "you@company.com",
            className: "custom-input",
          },
          name: {
            label: "Full Name",
            placeholder: "John Doe",
            className: "custom-input",
          },
        }}
        submitButtonText="Join Beta"
        submitButtonProps={{
          style: {
            background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          },
        }}
        containerStyle={{
          gap: "16px",
          alignItems: "flex-end",
        }}
        onSuccess={(data) => {
          console.log(`Welcome to the beta! Position: #${data.position}`);
        }}
      />
    </div>
  );
}

// Horizontal with Brazil phone example (no country change)
function BrazilHorizontalExample() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
      layout="horizontal"
      fields={{
        name: {
          label: "Nome completo",
          placeholder: "Seu nome completo",
          required: true,
        },
        phone: {
          label: "WhatsApp",
          defaultCountry: "BR",
          allowCountryChange: false,
          showFlag: false,
          placeholder: "(99) 99999-9999",
        },
      }}
      submitButtonText="Entrar na Lista"
      onSuccess={(data) => {
        console.log(`Sucesso! Posição: #${data.position}`);
      }}
    />
  );
}

// Responsive horizontal layout
function ResponsiveHorizontalExample() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <WaitinglistForm
        apiKey="wl_your_api_key_here"
        layout="horizontal"
        fields={{
          email: {
            label: "Email Address",
            required: true,
            placeholder: "Enter your email",
            style: { minWidth: "250px" },
          },
          name: {
            label: "Your Name",
            placeholder: "Enter your name",
            style: { minWidth: "200px" },
          },
          phone: {
            label: "Phone Number",
            defaultCountry: "US",
            showFlag: true,
            allowCountryChange: true,
            style: { minWidth: "250px" },
          },
        }}
        submitButtonText="Sign Up"
        submitButtonProps={{
          style: {
            minWidth: "120px",
            whiteSpace: "nowrap",
          },
        }}
        containerStyle={{
          flexWrap: "wrap", // Allow wrapping on smaller screens
          gap: "16px",
        }}
        onSuccess={(data) => {
          console.log(`Welcome! You're #${data.position} in line`);
        }}
      />
    </div>
  );
}

// Custom horizontal form with individual components
function CustomHorizontalExample() {
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
      // Your API call here
      console.log("Submitting:", formData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Success! Custom horizontal form submitted.");
      setFormData({ email: "", name: "", phone: "" });
    } catch (error) {
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-end",
        flexWrap: "wrap",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <EmailField
        value={formData.email}
        onChange={(email) => setFormData((prev) => ({ ...prev, email }))}
        config={{
          label: "Email",
          required: true,
          placeholder: "your@email.com",
        }}
        disabled={loading}
        noMargin={true}
        style={{ minWidth: "200px", flex: "1" }}
      />

      <NameField
        value={formData.name}
        onChange={(name) => setFormData((prev) => ({ ...prev, name }))}
        config={{
          label: "Name",
          placeholder: "Your name",
        }}
        disabled={loading}
        noMargin={true}
        style={{ minWidth: "150px", flex: "1" }}
      />

      <PhoneField
        value={formData.phone}
        onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
        config={{
          label: "Phone",
          defaultCountry: "US",
          showFlag: true,
          allowCountryChange: true,
        }}
        disabled={loading}
        noMargin={true}
        style={{ minWidth: "200px", flex: "1" }}
      />

      <button
        type="submit"
        disabled={loading || !formData.email}
        style={{
          padding: "12px 24px",
          backgroundColor: loading || !formData.email ? "#94a3b8" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: loading || !formData.email ? "not-allowed" : "pointer",
          minWidth: "120px",
          height: "48px", // Match input height
        }}
      >
        {loading ? "Joining..." : "Join Now"}
      </button>
    </form>
  );
}

export {
  BasicHorizontalExample,
  HorizontalWithPhoneExample,
  StyledHorizontalExample,
  BrazilHorizontalExample,
  ResponsiveHorizontalExample,
  CustomHorizontalExample,
};
