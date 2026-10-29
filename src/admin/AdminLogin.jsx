import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/adminApi";
import { useAdmin } from "./AdminSession";
import "./Admin.css";

export default function AdminLogin() {
  const { authenticated, loading, refreshSession } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  if (loading) return <div className="sil-admin-center">Checking admin session...</div>;
  if (authenticated) return <Navigate to="/admin-panel" replace />;
  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      await loginAdmin(username.trim(), password);
      await refreshSession();
      navigate("/admin-panel", { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <main className="sil-admin-login">
    <div className="sil-admin-login-card">
      <div className="sil-admin-overline">SILPURE • PRIVATE ACCESS</div>
      <h1>Welcome back.</h1>
      <p>Sign in to manage your Silpure collection.</p>
      <form onSubmit={submit}>
        <label htmlFor="admin-user">Admin ID</label>
        <input id="admin-user" autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)} required />
        <label htmlFor="admin-pass">Password</label>
        <input id="admin-pass" type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <p role="alert" className="sil-admin-error">{error}</p>}
        <button disabled={busy} type="submit">{busy ? "Signing in..." : "Sign in →"}</button>
      </form>
      <a href="/">← Back to Silpure</a>
    </div>
  </main>;
}
