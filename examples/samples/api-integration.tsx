import React, { useState } from 'react';
import { signupToWaitinglist, WaitinglistApi, EmailField, NameField, PhoneField } from '@waitinglist/react';

// Direct API usage
function DirectApiExample() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleSignup = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      const response = await signupToWaitinglist('wl_your_api_key_here', {
        email,
        tags: ['direct-api'],
      });
      
      setResult(`Success! Position: #${response.data.position}`);
      setEmail('');
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h3>Direct API Usage</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <button 
        onClick={handleSignup} 
        disabled={loading || !email}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: loading ? '#ccc' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {result && <p style={{ marginTop: '1rem', color: result.startsWith('Error') ? 'red' : 'green' }}>{result}</p>}
    </div>
  );
}

// API Class usage
function ApiClassExample() {
  const [status, setStatus] = useState<string>('');
  
  const api = new WaitinglistApi('wl_your_api_key_here', {
    apiUrl: 'https://api.waitinglist.dev',
    timeout: 10000,
    retries: 3,
  });

  const handleActions = async () => {
    try {
      // Get project info
      const projectInfo = await api.getProjectInfo();
      console.log('Project info:', projectInfo);
      
      // Sign up user
      const signup = await api.signup({
        email: 'test@example.com',
        name: 'Test User',
        tags: ['api-class-demo'],
      });
      
      setStatus(`User signed up! Position: #${signup.data.position}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h3>API Class Usage</h3>
      <button onClick={handleActions} style={{ padding: '8px 16px' }}>
        Test API Methods
      </button>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}

// Custom form with individual components and API integration
function CustomFormWithApi() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: {[key: string]: string} = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.name) newErrors.name = 'Name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await signupToWaitinglist('wl_your_api_key_here', {
        ...formData,
        tags: ['custom-form'],
      });

      alert(`Welcome! You're #${result.data.position} in line.`);
      
      // Reset form
      setFormData({ email: '', name: '', phone: '' });
      
      // You could also redirect or update UI state here
      // window.location.href = '/thank-you';
      
    } catch (error: any) {
      if (error.details) {
        // Handle field-specific errors from API
        const apiErrors: {[key: string]: string} = {};
        error.details.forEach((detail: any) => {
          apiErrors[detail.field] = detail.message;
        });
        setErrors(apiErrors);
      } else {
        alert(`Signup failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h3>Custom Form with API Integration</h3>
      
      <EmailField
        value={formData.email}
        onChange={(email) => setFormData(prev => ({ ...prev, email }))}
        config={{
          label: 'Email Address',
          required: true,
        }}
        error={errors.email}
        disabled={loading}
      />
      
      <NameField
        value={formData.name}
        onChange={(name) => setFormData(prev => ({ ...prev, name }))}
        config={{
          label: 'Full Name',
          required: true,
        }}
        error={errors.name}
        disabled={loading}
      />
      
      <PhoneField
        value={formData.phone}
        onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
        config={{
          label: 'Phone Number (Optional)',
          defaultCountry: 'US' as any,
        }}
        error={errors.phone}
        disabled={loading}
      />
      
      <button 
        type="submit" 
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '1rem',
        }}
      >
        {loading ? 'Creating Account...' : 'Join Waitinglist'}
      </button>
    </form>
  );
}

export { DirectApiExample, ApiClassExample, CustomFormWithApi };
