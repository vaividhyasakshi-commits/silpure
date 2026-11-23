import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  reload,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser ? { ...currentUser, uid: currentUser.uid, email: currentUser.email, displayName: currentUser.displayName, emailVerified: currentUser.emailVerified } : null);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state error", error);
        setLoading(false);
      }
    );
  }, []);

  async function register(name, email, password) {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName) throw new Error("Please enter your full name.");
    if (cleanName.length > 80) throw new Error("Name is too long.");
    if (password.length < 8) throw new Error("Use at least 8 password characters.");

    const credential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    const newUser = credential.user;
    await updateProfile(newUser, { displayName: cleanName });
    await setDoc(doc(db, "users", newUser.uid), {
      uid: newUser.uid,
      name: cleanName,
      email: newUser.email,
      createdAt: serverTimestamp(),
    });
    try {
      await sendEmailVerification(newUser);
    } catch (verificationError) {
      console.warn("Verification email could not be sent:", verificationError);
    }
    setUser({ uid: newUser.uid, email: newUser.email, displayName: cleanName, emailVerified: false });
    return newUser;
  }

  async function login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return credential.user;
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email.trim());
  }

  async function resendVerification() {
    if (!auth.currentUser) throw new Error("Please log in first.");
    await sendEmailVerification(auth.currentUser);
  }

  async function refreshUser() {
    if (!auth.currentUser) return;
    await reload(auth.currentUser);
    const current = auth.currentUser;
    setUser({ uid: current.uid, email: current.email, displayName: current.displayName, emailVerified: current.emailVerified });
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, resetPassword, resendVerification, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
