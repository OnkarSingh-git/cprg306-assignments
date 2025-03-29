"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Shopping List App</h1>
      {user ? (
        <>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
            Log Out
          </button>
          <div>
            <Link href="/week-9/shopping-list">Go to Shopping List</Link>
          </div>
        </>
      ) : (
        <>
          <p>Please log in to access your shopping list</p>
          <button onClick={handleLogin}>Log in with GitHub</button>
        </>
      )}
    </div>
  );
}