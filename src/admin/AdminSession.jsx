import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { checkAdminSession } from "../services/adminApi";
const Context = createContext(null);
export function AdminSessionProvider({ children }) {
  const [session, setSession] = useState({ authenticated: false });
  const [loading, setLoading] = useState(true);
  const refreshSession = useCallback(async () => {
    try { const result = await checkAdminSession(); setSession(result); return result; }
    catch { setSession({ authenticated: false }); return { authenticated: false }; }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { refreshSession(); }, [refreshSession]);
  return <Context.Provider value={{ ...session, loading, refreshSession }}>{children}</Context.Provider>;
}
export function useAdmin() {
  const context = useContext(Context);
  if (!context) throw new Error("useAdmin requires AdminSessionProvider");
  return context;
}
