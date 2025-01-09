"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    setError(undefined);
    const res = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (res?.error) {
      setError("Invalid email or password");
    }
    if (res?.ok) {
      router.back();
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
        <p>Or</p>
      </form>
      <button type="button" onClick={async () => await signIn("google")}>
        SIgnIn With Google
      </button>
    </div>
  );
}
