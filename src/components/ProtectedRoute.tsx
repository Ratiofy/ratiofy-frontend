import type { ReactNode } from 'react';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <SignIn routing="hash" />
        </div>
      </SignedOut>
    </>
  );
}
