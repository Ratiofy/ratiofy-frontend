import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { esES } from '@clerk/localizations';
import { dark } from '@clerk/themes';
import App from './App.tsx';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder_key';

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      localization={esES}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#10b981', // Aproximación a var(--success)
          colorBackground: '#11131a', // Aproximación a var(--card)
          colorInputBackground: '#191b24', // Aproximación a var(--input)
          colorInputText: '#ffffff',
          colorText: '#e2e8f0',
          borderRadius: '0.75rem',
          fontFamily: 'Inter, sans-serif'
        },
        elements: {
          cardBox: "shadow-2xl border border-[var(--border)]",
          formButtonPrimary: "bg-[var(--success)] text-[var(--success-foreground)] hover:opacity-90 transition-opacity",
          socialButtonsBlockButton: "bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)]",
          formFieldInput: "bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] focus:ring-[var(--success)] focus:border-[var(--success)]",
          dividerText: "text-[var(--muted-foreground)]",
          dividerLine: "bg-[var(--border)]",
          footerActionLink: "text-[var(--success)] hover:text-[var(--success)]"
        }
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
