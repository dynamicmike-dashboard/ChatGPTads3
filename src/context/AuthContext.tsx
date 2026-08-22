import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkUserAccessByEmail, type AccessResult } from '../lib/teable';

type StoredUser = { email: string; name?: string };

interface AuthContextType {
  user: StoredUser | null;
  access: AccessResult | null;
  loading: boolean;
  setUserEmail: (email: string) => void;
  logout: () => void;
  refreshAccess: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [access, setAccess] = useState<AccessResult | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAccess = async () => {
    const email = user?.email || (JSON.parse(localStorage.getItem('chatgpt_ads_user') || 'null') as StoredUser | null)?.email || null;
    if (!email) {
      setAccess({ plan: null, status: null, hasFullAccess: false, hasCourseAccess: false });
      setLoading(false);
      return;
    }
    try {
      const a = await checkUserAccessByEmail(email);
      setAccess(a);
    } catch (e) {
      console.error(e);
      setAccess({ plan: null, status: null, hasFullAccess: false, hasCourseAccess: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem('chatgpt_ads_user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
    refreshAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { refreshAccess(); }, [user?.email]);

  const setUserEmail = (email: string) => {
    const u = { email: email.toLowerCase().trim() };
    setUser(u);
    localStorage.setItem('chatgpt_ads_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    setAccess({ plan: null, status: null, hasFullAccess: false, hasCourseAccess: false });
    localStorage.removeItem('chatgpt_ads_user');
  };

  return (
    <AuthContext.Provider value={{ user, access, loading, setUserEmail, logout, refreshAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const c = useContext(AuthContext);
  if (!c) throw new Error('useAuth must be within AuthProvider');
  return c;
}
