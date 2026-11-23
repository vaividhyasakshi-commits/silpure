import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiShield,
  FiHeart,
  FiShoppingBag,
  FiLogOut,
  FiRefreshCw,
  FiCheckCircle,
  FiCopy,
  FiStar,
} from "react-icons/fi";

import { sendEmailVerification } from "firebase/auth";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebase";

export default function MyAccount() {
  const { user, loading, logout } = useAuth();

  const [busy, setBusy] = useState(false);
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [refreshBusy, setRefreshBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [localVerified, setLocalVerified] = useState(false);

  useEffect(() => {
    if (user) {
      setLocalVerified(user.emailVerified);
    }
  }, [user]);

  const profile = useMemo(() => {
    if (!user) return null;

    return {
      name: user.displayName || "Silpure Customer",
      email: user.email || "No email found",
      uid: user.uid || "-",
      emailVerified: localVerified,
    };
  }, [user, localVerified]);

  const handleLogout = async () => {
    setBusy(true);
    setError("");
    setMessage("");

    try {
      await logout();
    } catch (err) {
      setError("Unable to log out right now. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleResendVerification = async () => {
    setVerifyBusy(true);
    setError("");
    setMessage("");

    try {
      if (!auth.currentUser) {
        throw new Error("No active user found.");
      }

      await sendEmailVerification(auth.currentUser);
      setMessage("Verification email sent successfully. Please check your inbox.");
    } catch (err) {
      setError(err.message || "Could not send verification email.");
    } finally {
      setVerifyBusy(false);
    }
  };

  const handleRefreshVerification = async () => {
    setRefreshBusy(true);
    setError("");
    setMessage("");

    try {
      if (!auth.currentUser) {
        throw new Error("No active user found.");
      }

      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;

      if (updatedUser.emailVerified) {
        setLocalVerified(true);
        setMessage("Great! Your email has been verified.");
      } else {
        setLocalVerified(false);
        setMessage("Email is still not verified. Please verify from your inbox, then click again.");
      }
    } catch (err) {
      setError(err.message || "Could not refresh verification status.");
    } finally {
      setRefreshBusy(false);
    }
  };

  const copyCustomerId = async () => {
    try {
      await navigator.clipboard.writeText(profile?.uid || "");
      setMessage("Customer ID copied to clipboard.");
      setError("");
    } catch (err) {
      setError("Could not copy customer ID.");
    }
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <Header />
        <main className="account-loading-wrap">
          <div className="account-loading-card">
            <div className="account-spinner" />
            <p>Loading your account...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <style>{styles}</style>

      <Header />

      <main className="account-page">
        <section className="account-hero">
          <div className="account-hero-left">
            <span className="account-badge">Silpure Member Area</span>

            <h1>My Silpure Account</h1>

            <p>
              Welcome back, <strong>{profile.name}</strong>. Manage your profile,
              access your wishlist and cart, and keep your Silpure account secure.
            </p>

            <div className="account-hero-actions">
              <Link to="/wishlist" className="hero-btn primary">
                <FiHeart />
                My Wishlist
              </Link>

              <Link to="/cart" className="hero-btn secondary">
                <FiShoppingBag />
                My Cart
              </Link>
            </div>
          </div>

          <div className="account-hero-right">
            <div className="account-summary-card">
              <div className="summary-top">
                <div className="summary-avatar">
                  {profile.name?.charAt(0)?.toUpperCase() || "S"}
                </div>

                <div>
                  <h3>{profile.name}</h3>
                  <p>{profile.email}</p>
                </div>
              </div>

              <div className="summary-stats">
                <div className="summary-stat">
                  <span>Status</span>
                  <strong>
                    {profile.emailVerified ? "Verified" : "Pending"}
                  </strong>
                </div>

                <div className="summary-stat">
                  <span>Customer</span>
                  <strong>Active</strong>
                </div>
              </div>

              <div className="member-note">
                <FiStar />
                <span>Your permanent customer account is now ready.</span>
              </div>
            </div>
          </div>
        </section>

        {message && <div className="account-alert success">{message}</div>}
        {error && <div className="account-alert error">{error}</div>}

        <section className="account-grid">
          <div className="account-card info-card">
            <div className="card-head">
              <div>
                <p className="mini-label">Personal Details</p>
                <h2>Profile Information</h2>
              </div>
              <div className="card-icon">
                <FiUser />
              </div>
            </div>

            <div className="info-list">
              <div className="info-item">
                <span className="info-left">
                  <FiUser />
                  Name
                </span>
                <span className="info-right">{profile.name}</span>
              </div>

              <div className="info-item">
                <span className="info-left">
                  <FiMail />
                  Email
                </span>
                <span className="info-right">{profile.email}</span>
              </div>

              <div className="info-item align-start">
                <span className="info-left">
                  <FiShield />
                  Customer ID
                </span>

                <div className="customer-id-wrap">
                  <span className="customer-id-text">{profile.uid}</span>

                  <button
                    type="button"
                    className="small-action-btn"
                    onClick={copyCustomerId}
                  >
                    <FiCopy />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="account-card verification-card">
            <div className="card-head">
              <div>
                <p className="mini-label">Security</p>
                <h2>Email Verification</h2>
              </div>
              <div className="card-icon">
                <FiShield />
              </div>
            </div>

            <div className="verification-status">
              <div
                className={`verify-pill ${
                  profile.emailVerified ? "verified" : "not-verified"
                }`}
              >
                <FiCheckCircle />
                {profile.emailVerified ? "Verified" : "Not Verified"}
              </div>

              <p>
                {profile.emailVerified
                  ? "Your email is verified. Your account is secure and ready to use."
                  : "Please verify your email to keep your account secure and trusted."}
              </p>
            </div>

            {!profile.emailVerified && (
              <div className="verification-actions">
                <button
                  type="button"
                  className="action-btn primary-btn"
                  onClick={handleResendVerification}
                  disabled={verifyBusy}
                >
                  {verifyBusy ? "Sending..." : "Resend Verification Email"}
                </button>

                <button
                  type="button"
                  className="action-btn light-btn"
                  onClick={handleRefreshVerification}
                  disabled={refreshBusy}
                >
                  <FiRefreshCw />
                  {refreshBusy ? "Checking..." : "I've Verified My Email"}
                </button>
              </div>
            )}
          </div>

          <div className="account-card quick-card">
            <div className="card-head">
              <div>
                <p className="mini-label">Quick Access</p>
                <h2>Shopping Shortcuts</h2>
              </div>
              <div className="card-icon">
                <FiShoppingBag />
              </div>
            </div>

            <div className="quick-links">
              <Link to="/wishlist" className="quick-link-box">
                <div className="quick-link-icon">
                  <FiHeart />
                </div>
                <div>
                  <h4>Wishlist</h4>
                  <p>See your saved favourites</p>
                </div>
              </Link>

              <Link to="/cart" className="quick-link-box">
                <div className="quick-link-icon">
                  <FiShoppingBag />
                </div>
                <div>
                  <h4>Cart</h4>
                  <p>Review items in your bag</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="account-card logout-card">
            <div className="card-head">
              <div>
                <p className="mini-label">Session</p>
                <h2>Account Control</h2>
              </div>
              <div className="card-icon">
                <FiLogOut />
              </div>
            </div>

            <p className="logout-text">
              You can safely sign out from your Silpure account anytime.
            </p>

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
              disabled={busy}
            >
              <FiLogOut />
              {busy ? "Logging out..." : "Logout"}
            </button>
          </div>
        </section>

        <section className="account-note-section">
          <div className="account-note-card">
            <h3>Your Silpure ID is ready</h3>
            <p>
              Your permanent customer ID is shown above. In the next integration
              step, your cart, wishlist, delivery addresses and future orders can
              be linked to this account.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const styles = `
  .account-page {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(17, 79, 111, 0.08), transparent 30%),
      radial-gradient(circle at top right, rgba(9, 69, 98, 0.06), transparent 25%),
      linear-gradient(180deg, #f8fbfd 0%, #eef5f8 100%);
    padding: 40px 20px 70px;
  }

  .account-loading-wrap {
    min-height: 70vh;
    background: linear-gradient(180deg, #f8fbfd 0%, #eef5f8 100%);
    display: grid;
    place-items: center;
    padding: 40px 20px;
  }

  .account-loading-card {
    background: #ffffff;
    border: 1px solid #dce7ed;
    border-radius: 24px;
    padding: 35px 30px;
    min-width: 280px;
    text-align: center;
    box-shadow: 0 18px 45px rgba(4, 43, 67, 0.08);
  }

  .account-spinner {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 4px solid #d8e7ef;
    border-top-color: #0f4e72;
    margin: 0 auto 14px;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .account-hero,
  .account-grid,
  .account-note-section,
  .account-alert {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .account-hero {
    display: grid;
    grid-template-columns: 1.3fr 0.9fr;
    gap: 24px;
    align-items: stretch;
    margin-bottom: 24px;
  }

  .account-hero-left,
  .account-summary-card {
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid #dbe8ef;
    border-radius: 28px;
    box-shadow: 0 20px 55px rgba(9, 48, 73, 0.08);
    backdrop-filter: blur(10px);
  }

  .account-hero-left {
    padding: 34px 34px 30px;
  }

  .account-badge {
    display: inline-flex;
    align-items: center;
    padding: 8px 14px;
    border-radius: 999px;
    background: #eaf4f8;
    color: #0d4b6d;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  .account-hero-left h1 {
    margin: 0 0 12px;
    color: #083b5a;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 800;
  }

  .account-hero-left p {
    margin: 0;
    color: #527083;
    font-size: 16px;
    line-height: 1.8;
    max-width: 720px;
  }

  .account-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 28px;
  }

  .hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    border-radius: 14px;
    padding: 14px 20px;
    font-size: 15px;
    font-weight: 700;
    transition: 0.25s ease;
  }

  .hero-btn.primary {
    background: linear-gradient(135deg, #0b5c83, #083b5a);
    color: #fff;
    box-shadow: 0 14px 32px rgba(8, 59, 90, 0.18);
  }

  .hero-btn.primary:hover {
    transform: translateY(-2px);
  }

  .hero-btn.secondary {
    background: #ffffff;
    color: #083b5a;
    border: 1px solid #d3e2ea;
  }

  .hero-btn.secondary:hover {
    background: #f6fbfd;
    transform: translateY(-2px);
  }

  .account-summary-card {
    height: 100%;
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .summary-top {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .summary-avatar {
    width: 66px;
    height: 66px;
    border-radius: 18px;
    background: linear-gradient(135deg, #0b6189, #083b5a);
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 26px;
    font-weight: 800;
    box-shadow: 0 12px 24px rgba(8, 59, 90, 0.2);
    flex-shrink: 0;
  }

  .summary-top h3 {
    margin: 0 0 6px;
    font-size: 24px;
    color: #0a3f5f;
  }

  .summary-top p {
    margin: 0;
    color: #618094;
    font-size: 14px;
    word-break: break-word;
  }

  .summary-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 28px;
  }

  .summary-stat {
    background: #f4f9fb;
    border: 1px solid #dde9ef;
    border-radius: 18px;
    padding: 16px;
  }

  .summary-stat span {
    display: block;
    color: #6a8798;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .summary-stat strong {
    color: #0b4465;
    font-size: 17px;
  }

  .member-note {
    margin-top: 20px;
    padding: 14px 16px;
    background: linear-gradient(135deg, #eff8fb, #f8fcfd);
    border: 1px solid #d7e6ed;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #0e4d70;
    font-size: 14px;
    line-height: 1.6;
  }

  .account-alert {
    border-radius: 16px;
    padding: 15px 18px;
    margin-bottom: 18px;
    font-size: 14px;
    line-height: 1.6;
    border: 1px solid transparent;
  }

  .account-alert.success {
    background: #ecfaf0;
    border-color: #cdeed8;
    color: #1f6b43;
  }

  .account-alert.error {
    background: #fff1f1;
    border-color: #f3cdcd;
    color: #b03333;
  }

  .account-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .account-card {
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid #dbe8ef;
    border-radius: 26px;
    box-shadow: 0 18px 45px rgba(4, 43, 67, 0.08);
    padding: 28px;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    align-items: flex-start;
    margin-bottom: 22px;
  }

  .mini-label {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #6a8a9d;
  }

  .card-head h2 {
    margin: 0;
    font-size: 28px;
    line-height: 1.2;
    color: #083b5a;
  }

  .card-icon {
    width: 50px;
    height: 50px;
    border-radius: 16px;
    background: #edf6fa;
    color: #0c4b6d;
    display: grid;
    place-items: center;
    font-size: 21px;
    flex-shrink: 0;
  }

  .info-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    padding: 16px 18px;
    background: #f8fbfd;
    border: 1px solid #e1edf2;
    border-radius: 18px;
    align-items: center;
  }

  .info-item.align-start {
    align-items: flex-start;
  }

  .info-left {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    color: #577587;
    min-width: 140px;
    font-weight: 600;
  }

  .info-right {
    color: #0a3f5f;
    font-weight: 700;
    text-align: right;
    word-break: break-word;
  }

  .customer-id-wrap {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 12px;
    flex-wrap: wrap;
  }

  .customer-id-text {
    color: #0a3f5f;
    font-weight: 700;
    word-break: break-all;
    text-align: right;
    max-width: 100%;
  }

  .small-action-btn {
    border: none;
    background: #0b5c83;
    color: white;
    padding: 10px 14px;
    border-radius: 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    transition: 0.2s ease;
  }

  .small-action-btn:hover {
    background: #084868;
  }

  .verification-status p {
    margin: 14px 0 0;
    color: #5d7d8f;
    line-height: 1.8;
  }

  .verify-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 800;
  }

  .verify-pill.verified {
    background: #eaf8ef;
    color: #1f7a48;
    border: 1px solid #cae9d5;
  }

  .verify-pill.not-verified {
    background: #fff4e8;
    color: #aa6520;
    border: 1px solid #f2dbbd;
  }

  .verification-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 22px;
  }

  .action-btn {
    border: none;
    border-radius: 14px;
    padding: 14px 18px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.25s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .action-btn:disabled,
  .logout-btn:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  .primary-btn {
    background: linear-gradient(135deg, #0b5c83, #083b5a);
    color: #fff;
  }

  .primary-btn:hover {
    transform: translateY(-2px);
  }

  .light-btn {
    background: #eef7fb;
    color: #0c4a6a;
    border: 1px solid #d9e7ee;
  }

  .light-btn:hover {
    background: #e7f2f7;
  }

  .quick-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .quick-link-box {
    text-decoration: none;
    background: linear-gradient(180deg, #fbfdfe 0%, #f2f8fb 100%);
    border: 1px solid #dce8ee;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    gap: 14px;
    transition: 0.25s ease;
  }

  .quick-link-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(6, 48, 75, 0.08);
  }

  .quick-link-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: #0c557a;
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .quick-link-box h4 {
    margin: 0 0 6px;
    color: #083b5a;
    font-size: 18px;
  }

  .quick-link-box p {
    margin: 0;
    color: #648295;
    line-height: 1.6;
    font-size: 14px;
  }

  .logout-text {
    margin: 0 0 20px;
    color: #5d7d8f;
    line-height: 1.8;
  }

  .logout-btn {
    border: none;
    border-radius: 14px;
    padding: 14px 20px;
    background: linear-gradient(135deg, #0b5c83, #083b5a);
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: 0.25s ease;
  }

  .logout-btn:hover {
    transform: translateY(-2px);
  }

  .account-note-section {
    margin-top: 24px;
  }

  .account-note-card {
    background: linear-gradient(135deg, #083b5a, #0c5e85);
    color: #fff;
    border-radius: 26px;
    padding: 28px;
    box-shadow: 0 18px 42px rgba(8, 59, 90, 0.18);
  }

  .account-note-card h3 {
    margin: 0 0 10px;
    font-size: 28px;
  }

  .account-note-card p {
    margin: 0;
    max-width: 900px;
    color: rgba(255, 255, 255, 0.88);
    line-height: 1.8;
  }

  @media (max-width: 1024px) {
    .account-hero {
      grid-template-columns: 1fr;
    }

    .account-grid {
      grid-template-columns: 1fr;
    }

    .account-hero-left h1 {
      font-size: 40px;
    }
  }

  @media (max-width: 640px) {
    .account-page {
      padding: 24px 14px 50px;
    }

    .account-hero-left,
    .account-summary-card,
    .account-card,
    .account-note-card {
      border-radius: 22px;
    }

    .account-hero-left {
      padding: 24px 20px;
    }

    .account-hero-left h1 {
      font-size: 32px;
    }

    .account-hero-left p {
      font-size: 14px;
    }

    .summary-top {
      align-items: flex-start;
    }

    .summary-top h3 {
      font-size: 20px;
    }

    .summary-stats {
      grid-template-columns: 1fr;
    }

    .card-head h2 {
      font-size: 23px;
    }

    .info-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .info-right {
      text-align: left;
    }

    .customer-id-wrap {
      justify-content: flex-start;
    }

    .quick-links {
      grid-template-columns: 1fr;
    }

    .verification-actions,
    .account-hero-actions {
      flex-direction: column;
    }

    .hero-btn,
    .action-btn,
    .logout-btn {
      width: 100%;
      justify-content: center;
    }

    .account-note-card h3 {
      font-size: 22px;
    }
  }
`;