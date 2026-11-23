import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const styles = `
.sil-auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:60px 18px;background:linear-gradient(145deg,#f1f8fc,#fff 50%,#eaf4f8);font-family:inherit}
.sil-auth-card{width:100%;max-width:460px;background:white;border:1px solid #dce9ef;border-radius:18px;padding:38px 34px;box-shadow:0 16px 48px rgba(5,47,75,.08);color:#173c4e}
.sil-auth-brand{display:block;text-decoration:none;text-align:center;color:#063653;font-size:30px;letter-spacing:6px;font-weight:650}
.sil-auth-caption{text-align:center;font-size:10px;letter-spacing:2px;color:#73929f;margin:7px 0 26px}
.sil-auth-card h1{text-align:center;font-size:27px;line-height:1.2;margin:0 0 8px;color:#073653;font-weight:650}
.sil-auth-subtitle{text-align:center;color:#617d8a;font-size:13px;line-height:1.7;margin-bottom:24px}
.sil-auth-tabs{display:grid;grid-template-columns:1fr 1fr;gap:5px;background:#eff6f9;border-radius:10px;padding:5px;margin-bottom:22px}
.sil-auth-tabs button{border:0;border-radius:7px;background:transparent;padding:12px;color:#587482;cursor:pointer;font-weight:550}
.sil-auth-tabs button.active{background:white;color:#063653;box-shadow:0 2px 8px #06365315}
.sil-auth-field{margin-bottom:17px}
.sil-auth-field label{display:block;font-weight:550;color:#173c4e;font-size:13px;margin-bottom:7px}
.sil-auth-field input{box-sizing:border-box;width:100%;height:48px;padding:0 13px;background:white;border:1px solid #cbdde5;border-radius:8px;font-size:14px;color:#173c4e;outline:none}
.sil-auth-field input:focus{border-color:#087ca7;box-shadow:0 0 0 3px #087ca714}
.sil-auth-password{position:relative}
.sil-auth-password input{padding-right:68px}
.sil-auth-password button{position:absolute;right:10px;top:50%;transform:translateY(-50%);border:0;background:transparent;color:#087ca7;cursor:pointer;font-size:12px}
.sil-auth-forgot{border:0;background:transparent;color:#087ca7;font-size:12px;cursor:pointer;display:block;margin:-4px 0 18px auto}
.sil-auth-submit{display:block;width:100%;border:0;background:#063653;color:white;cursor:pointer;padding:14px;border-radius:8px;font-size:14px;font-weight:600;margin-top:10px}
.sil-auth-submit:hover{background:#0b668d}
.sil-auth-submit:disabled{opacity:.55;cursor:wait}
.sil-auth-error,.sil-auth-ok{padding:11px;border-radius:7px;font-size:12px;line-height:1.6;margin:12px 0}
.sil-auth-error{background:#fff0f1;color:#ad2336}
.sil-auth-ok{background:#e8f8ee;color:#176b39}
.sil-auth-foot{text-align:center;font-size:12px;color:#617d8a;margin-top:23px}
.sil-auth-foot button{background:none;border:0;color:#087ca7;cursor:pointer;font-weight:600;padding-left:5px}
.sil-auth-center{text-align:center}
.sil-auth-center button{background:none;border:0;color:#087ca7;cursor:pointer;margin-top:20px;font-size:13px}
@media(max-width:480px){.sil-auth-card{padding:30px 20px}.sil-auth-card h1{font-size:24px}.sil-auth-page{padding:32px 12px}}
`;

function friendlyError(error) {
  switch (error?.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please log in.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Please use a stronger password.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    case "auth/network-request-failed":
      return "Check your internet connection.";
    case "permission-denied":
    case "firestore/permission-denied":
      return "Cannot save profile. Please check the Firestore security rules.";
    default:
      return error?.message || "Something went wrong. Please try again.";
  }
}

export default function CustomerAuth() {
  const { user, loading, login, register, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setSuccess("");
    setPassword("");
    setShowPassword(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      if (mode === "signup") {
        if (password.length < 8)
          throw new Error("Password must be at least 8 characters.");
        await register(name, email, password);
        navigate("/my-account", { replace: true });
      } else if (mode === "login") {
        await login(email, password);
        navigate("/my-account", { replace: true });
      } else {
        await resetPassword(email);
        setSuccess(
          "If an account exists for this email, you will receive a reset link. Check your inbox and spam folder.",
        );
      }
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading)
    return (
      <>
        <style>{styles}</style>
        <main className="sil-auth-page">Loading account...</main>
      </>
    );
  if (user) return <Navigate to="/my-account" replace />;

  return (
    <>
      <style>{styles}</style>
      <main className="sil-auth-page">
        <section
          className="sil-auth-card"
          aria-label="Silpure customer authentication"
        >
          <Link to="/" className="sil-auth-brand">
            SILPURE
          </Link>
          <p className="sil-auth-caption">YOUR SILVER, YOUR STORY</p>
          <h1>
            {mode === "signup"
              ? "Create Your Account"
              : mode === "forgot"
                ? "Forgot Password?"
                : "Welcome Back"}
          </h1>
          <p className="sil-auth-subtitle">
            {mode === "signup"
              ? "Save your favourites and enjoy a personal shopping experience."
              : mode === "forgot"
                ? "Enter your email and we'll send a secure reset link."
                : "Sign in to your Silpure account."}
          </p>

          {mode !== "forgot" && (
            <div className="sil-auth-tabs">
              <button
                type="button"
                className={mode === "login" ? "active" : ""}
                onClick={() => switchMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={mode === "signup" ? "active" : ""}
                onClick={() => switchMode("signup")}
              >
                Sign Up
              </button>
            </div>
          )}

          <form onSubmit={submit}>
            {mode === "signup" && (
              <div className="sil-auth-field">
                <label htmlFor="sil-name">Full Name</label>
                <input
                  id="sil-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={80}
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div className="sil-auth-field">
              <label htmlFor="sil-email">Email Address</label>
              <input
                id="sil-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>
            {mode !== "forgot" && (
              <div className="sil-auth-field">
                <label htmlFor="sil-password">Password</label>
                <div className="sil-auth-password">
                  <input
                    id="sil-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={
                      mode === "signup" ? "new-password" : "current-password"
                    }
                    placeholder="Enter password"
                    minLength={mode === "signup" ? 8 : undefined}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}
            {mode === "login" && (
              <button
                type="button"
                className="sil-auth-forgot"
                onClick={() => switchMode("forgot")}
              >
                Forgot Password?
              </button>
            )}
            {error && (
              <p className="sil-auth-error" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="sil-auth-ok" role="status">
                {success}
              </p>
            )}
            <button type="submit" className="sil-auth-submit" disabled={busy}>
              {busy
                ? "Please wait..."
                : mode === "signup"
                  ? "Create Account"
                  : mode === "forgot"
                    ? "Send Reset Link"
                    : "Sign In"}
            </button>
          </form>

          {mode === "forgot" ? (
            <div className="sil-auth-center">
              <button type="button" onClick={() => switchMode("login")}>
                Back to Login
              </button>
            </div>
          ) : (
            <p className="sil-auth-foot">
              {mode === "login"
                ? "New to Silpure?"
                : "Already have an account?"}
              <button
                type="button"
                onClick={() =>
                  switchMode(mode === "login" ? "signup" : "login")
                }
              >
                {mode === "login" ? "Create Account" : "Login"}
              </button>
            </p>
          )}
        </section>
      </main>
    </>
  );
}
