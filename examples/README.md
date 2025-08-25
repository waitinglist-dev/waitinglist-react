# @waitinglist/react Examples

This directory contains interactive examples demonstrating how to use the `@waitinglist/react` package.

## Running the Examples

1. **Install dependencies:**
   ```bash
   cd examples
   bun install
   ```

2. **Start the development server:**
   ```bash
   bun run dev
   ```

3. **Open your browser:**
   The examples will automatically open at `http://localhost:3001`

## Examples Included

### 1. Basic Form
Simple email and name collection with minimal configuration.

### 2. Advanced Configuration
Demonstrates custom field configuration including:
- Custom labels and placeholders
- Phone number input with country selection
- Required field validation
- Custom submit button text
- Success messages

### 3. Individual Field Components
Shows how to use individual field components for complete custom layouts.

## Sample Code Files

### `samples/` Directory

- **`basic-usage.tsx`** - Minimal setup example
- **`custom-styling.tsx`** - Custom styling examples
- **`validation-example.tsx`** - Custom validation handling
- **`api-integration.tsx`** - Direct API usage examples

## Demo Mode

When running the examples with the demo API key (`wl_demo_key`), all API calls are mocked to demonstrate functionality without requiring a real API key.

For production usage, replace the demo key with your actual Waitinglist.dev API key from [app.waitinglist.dev](https://app.waitinglist.dev).

## Customization

Feel free to modify these examples to test different configurations and see how the components behave with various props and styling options.
