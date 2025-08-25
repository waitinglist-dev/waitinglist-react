import React from "react";
import { WaitinglistForm } from "@waitinglist/react";

// Custom styling with inline styles
function CustomStyledForm() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
      fields={{
        email: {
          label: "Email Address",
          placeholder: "you@company.com",
          required: true,
          style: {
            borderColor: "#3b82f6",
            borderRadius: "8px",
          },
        },
        name: {
          label: "Full Name",
          placeholder: "John Doe",
          style: {
            borderColor: "#3b82f6",
            borderRadius: "8px",
          },
        },
      }}
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f8fafc",
        borderRadius: "1rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
      submitButtonProps={{
        style: {
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          border: "none",
          padding: "1rem 2rem",
          fontSize: "1.1rem",
          fontWeight: "600",
          borderRadius: "0.5rem",
          cursor: "pointer",
          transition: "transform 0.2s",
        },
      }}
      onSuccess={(data) => {
        console.log("Styled form success:", data);
      }}
    />
  );
}

// Using CSS classes
function CSSClassExample() {
  return (
    <div>
      <style>{`
        .waitinglist-form {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: white;
        }
        
        .waitinglist-form input {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          font-size: 16px;
          transition: border-color 0.2s;
        }
        
        .waitinglist-form input:focus {
          border-color: #3b82f6;
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .waitinglist-form button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .waitinglist-form button:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }
      `}</style>

      <WaitinglistForm
        apiKey="wl_your_api_key_here"
        className="waitinglist-form"
        fields={["email", "name"]}
        submitButtonText="Join Our Community"
        onSuccess={(data) => {
          console.log("CSS styled form success:", data);
        }}
      />
    </div>
  );
}

// Tailwind CSS example
function TailwindExample() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
      fields={{
        email: {
          label: "Email",
          className:
            "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          required: true,
        },
        name: {
          label: "Name",
          className:
            "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        },
      }}
      submitButtonProps={{
        className:
          "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200",
      }}
      onSuccess={(data) => {
        console.log("Tailwind form success:", data);
      }}
    />
  );
}

export { CustomStyledForm, CSSClassExample, TailwindExample };
