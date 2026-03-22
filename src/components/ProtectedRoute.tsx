import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const { isLoaded, isSignedIn } = useAuth(); // Comentado temporalmente

  // Bypassed: Eliminada la restricción de autenticación por ahora

  return <>{children}</>;
}
