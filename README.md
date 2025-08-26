# @waitinglist/react

React components for easy waitinglist.dev integration. Add a beautiful, customizable waiting list form to your React application in minutes.

## Installation

```bash
npm install @waitinglist/react
# or
yarn add @waitinglist/react
# or
bun add @waitinglist/react
# or
pnpm add @waitinglist/react
```

**Important:** You need to import the CSS file for phone input styling:

```jsx
import "@waitinglist/react/dist/style.css";
```

Add this import once in your main application file (e.g., `src/main.tsx` or `src/index.js`).

## Quick Start

```jsx
import { WaitinglistForm } from "@waitinglist/react";
import "@waitinglist/react/dist/style.css";

function App() {
  return (
    <WaitinglistForm
      apiKey="wl_your_api_key_here"
      fields={["email", "name", "phone"]}
      onSuccess={(data) => {
        console.log("User added to waitinglist:", data);
      }}
    />
  );
}
```

## Components

### WaitinglistForm

The main form component that handles everything for you.

```jsx
import { WaitinglistForm } from "@waitinglist/react";
import "@waitinglist/react/dist/style.css";

<WaitinglistForm
  apiKey="wl_your_api_key_here"
  fields={["email", "name", "phone"]}
  onSuccess={(data) => console.log("Success:", data)}
  onError={(error) => console.error("Error:", error)}
  submitButtonText="Join Our Waitinglist"
  successMessage="Thanks for joining!"
/>;
```

#### Props

| Prop                 | Type                           | Default                  | Description                        |
| -------------------- | ------------------------------ | ------------------------ | ---------------------------------- |
| `apiKey`             | `string`                       | _required_               | Your waitinglist.dev API key       |
| `fields`             | `string[]` or `FieldsConfig`   | `['email', 'name']`      | Fields to show in the form         |
| `layout`             | `'vertical'` or `'horizontal'` | `'vertical'`             | Form layout orientation            |
| `onSuccess`          | `(data) => void`               | -                        | Called when signup succeeds        |
| `onError`            | `(error) => void`              | -                        | Called when signup fails           |
| `onSubmit`           | `(data) => void`               | -                        | Called before API request          |
| `submitButtonText`   | `string`                       | `'Join Waitinglist'`     | Submit button text                 |
| `loadingText`        | `string`                       | `'Joining...'`           | Loading state text                 |
| `successMessage`     | `string`                       | `'Successfully joined!'` | Success message                    |
| `errorMessage`       | `string`                       | `'Something went wrong'` | Error message                      |
| `showMessages`       | `boolean`                      | `true`                   | Show success/error messages        |
| `resetOnSuccess`     | `boolean`                      | `true`                   | Reset form after success           |
| `disabled`           | `boolean`                      | `false`                  | Disable the entire form            |
| `tags`               | `string[]`                     | `[]`                     | Tags to add to signups             |
| `className`          | `string`                       | -                        | CSS class for form element         |
| `style`              | `object`                       | -                        | Inline styles for form element     |
| `containerClassName` | `string`                       | -                        | CSS class for fields container     |
| `containerStyle`     | `object`                       | -                        | Inline styles for fields container |

#### Advanced Field Configuration

You can configure individual fields with detailed options and pass any props that the individual field components accept:

```jsx
<WaitinglistForm
  apiKey="wl_your_api_key_here"
  layout="horizontal"
  fields={{
    email: {
      label: "Work Email",
      placeholder: "you@company.com",
      required: true,
      className: "custom-email-field",
      style: { borderRadius: "8px", fontSize: "1.1rem" },
    },
    name: {
      label: "Full Name",
      placeholder: "Enter your full name",
      required: false,
      style: { marginBottom: "1.5rem" },
    },
    phone: {
      label: "Phone Number",
      placeholder: "+1 (555) 123-4567",
      defaultCountry: "US",
      withCountryCallingCode: true,
      international: true,
      className: "phone-input",
      style: { borderColor: "#3b82f6" },
    },
  }}
  containerClassName="fields-container"
  containerStyle={{ gap: "2rem", padding: "1rem" }}
  className="waitinglist-form"
  style={{ maxWidth: "800px", margin: "0 auto" }}
/>
```

**Field Props Override**: You can pass any prop that the individual field components (`EmailField`, `NameField`, `PhoneField`) accept through the fields configuration. This includes:

- `className` and `style` for custom styling
- `placeholder` for custom placeholders
- Phone-specific props like `defaultCountry`, `international`, `withCountryCallingCode`
- Any other component-specific props

**Layout Options**: Use the `layout` prop to control form orientation:

- `layout="vertical"` (default): Fields stack vertically
- `layout="horizontal"`: Fields align horizontally with responsive design

**Container Styling**: Use `containerClassName` and `containerStyle` to style the fields container separately from the form element.

### Individual Field Components

For custom layouts, use individual field components:

```jsx
import { EmailField, NameField, PhoneField } from "@waitinglist/react";
import "@waitinglist/react/dist/style.css";

function CustomForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      <EmailField
        value={email}
        onChange={setEmail}
        config={{
          label: "Your Email",
          placeholder: "name@company.com",
          required: true,
        }}
      />
      <NameField
        value={name}
        onChange={setName}
        config={{
          label: "Your Name",
          placeholder: "John Doe",
        }}
      />
    </div>
  );
}
```

## API Functions

### signupToWaitinglist

For complete custom implementations:

```jsx
import { signupToWaitinglist } from "@waitinglist/react";

const handleSignup = async () => {
  try {
    const result = await signupToWaitinglist("wl_your_api_key", {
      email: "user@example.com",
      name: "John Doe",
      phone: "+1234567890",
      tags: ["early-access"],
    });

    console.log("Position in queue:", result.data.position);
  } catch (error) {
    console.error("Signup failed:", error);
  }
};
```

### WaitinglistApi Class

For advanced usage with custom configuration:

```jsx
import { WaitinglistApi } from "@waitinglist/react";

const api = new WaitinglistApi("wl_your_api_key", {
  apiUrl: "https://your-custom-api.com",
  timeout: 5000,
  retries: 3,
});

// Use the API instance
const result = await api.signup({ email: "user@example.com" });
const projectInfo = await api.getProjectInfo();
```

## TypeScript Support

Full TypeScript support is included with comprehensive type definitions:

```typescript
import type {
  WaitinglistFormProps,
  WaitinglistEntry,
  WaitinglistError,
} from "@waitinglist/react";
import { WaitinglistForm } from "@waitinglist/react";
import "@waitinglist/react/dist/style.css";

const MyForm: React.FC<WaitinglistFormProps> = (props) => {
  const handleSuccess = (data: WaitinglistEntry) => {
    console.log(`Welcome! You're #${data.position} in line.`);
  };

  const handleError = (error: WaitinglistError) => {
    console.error("Signup failed:", error.message);
  };

  return (
    <WaitinglistForm
      {...props}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};
```

## Styling

The components come with sensible default styles but are fully customizable:

### CSS Classes

```css
/* Target the form container */
.my-waitinglist-form {
  max-width: 500px;
  margin: 0 auto;
}

/* Target individual fields */
.my-waitinglist-form input {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
}

/* Target the submit button */
.my-waitinglist-form button {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
}
```

### Inline Styles

```jsx
import { WaitinglistForm } from "@waitinglist/react";
import "@waitinglist/react/dist/style.css";

<WaitinglistForm
  apiKey="wl_your_api_key"
  style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "#f9fafb",
    borderRadius: "1rem",
  }}
  submitButtonProps={{
    style: {
      background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
      border: "none",
      padding: "1rem",
    },
  }}
/>;
```

## Examples

### Basic Integration

```jsx
import { WaitinglistForm } from "@waitinglist/react";
import "@waitinglist/react/dist/style.css";

export default function LandingPage() {
  return (
    <div className="hero-section">
      <h1>Coming Soon!</h1>
      <p>Be the first to know when we launch.</p>

      <WaitinglistForm
        apiKey="wl_your_api_key_here"
        fields={["email", "name"]}
        successMessage="Thanks! We'll notify you when we launch."
        style={{ maxWidth: "400px", margin: "2rem auto" }}
      />
    </div>
  );
}
```

### Advanced Custom Form

```jsx
import { useState } from "react";
import { EmailField, NameField, signupToWaitinglist } from "@waitinglist/react";
import "@waitinglist/react/dist/style.css";

export default function CustomSignup() {
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signupToWaitinglist("wl_your_api_key", formData);
      alert("Success!");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <EmailField
        value={formData.email}
        onChange={(email) => setFormData((prev) => ({ ...prev, email }))}
        config={{ label: "Work Email", required: true }}
      />

      <NameField
        value={formData.name}
        onChange={(name) => setFormData((prev) => ({ ...prev, name }))}
        config={{ label: "Full Name" }}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Joining..." : "Join Waitinglist"}
      </button>
    </form>
  );
}
```

## Error Handling

The package provides comprehensive error handling:

```jsx
import { WaitinglistForm } from "@waitinglist/react";
import "@waitinglist/react/dist/style.css";

<WaitinglistForm
  apiKey="wl_your_api_key"
  onError={(error) => {
    // Log to your error tracking service
    console.error("Waitinglist signup failed:", error);

    // Show user-friendly message
    if (error.details) {
      error.details.forEach((detail) => {
        console.log(`${detail.field}: ${detail.message}`);
      });
    }
  }}
/>;
```

## Examples

Interactive examples are available in the `examples/` directory. To run them:

```bash
# Run interactive examples
bun run examples

# Or manually:
cd examples
bun install
bun run dev
```

The examples include:

- **Basic Usage**: Simple forms with minimal configuration
- **Advanced Configuration**: Custom field settings, phone input, validation
- **Individual Components**: Using field components separately
- **API Integration**: Direct API usage examples
- **Custom Styling**: CSS and styling examples

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Run examples
bun run examples

# Type checking
bun run type-check

# Linting
bun run lint
```

## License

MIT © waitinglist.dev
