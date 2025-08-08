"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import googleIcon from "@/public/googleIcon.svg";
import loginIcon from "@/public/loginIcon.svg";

export default function Login() {
  const [error, setError] = useState<string>();
  const searchParams = useSearchParams();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);
    const res = await signIn("credentials", {
      redirect: false,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
    if (res?.error) {
      setError("Invalid email or password");
    }
    if (res?.ok) {
      router.push(searchParams.get("callbackUrl") || "/");
    }
  }

  return (
    <div className="p-2">
      <form
        onSubmit={handleLogin}
        className="mx-auto flex max-w-lg flex-col gap-4 rounded-lg border border-orange-800 bg-white px-2 py-4 sm:p-6 md:max-w-xl lg:max-w-2xl"
      >
        <div className="mb-3 flex flex-col gap-2 text-sm [&>input]:rounded-md [&>input]:border [&>input]:border-black [&>input]:p-1 md:text-base">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          {error && <p>{error}</p>}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-full border py-1 text-sm font-bold transition-colors duration-500 hover:bg-orange-300 md:text-base"
        >
          <Image src={loginIcon} alt="LoginIcon" className="size-6" />
          <p> Login </p>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-full border py-1 font-bold transition-colors duration-500 hover:bg-orange-300 md:text-base"
          onClick={async () => {
            await signIn("google", {
              callbackUrl: searchParams.get("callbackUrl") || "/",
            });
          }}
        >
          <Image src={googleIcon} alt="googleIcon" className="size-6" />
          <p className="text-sm"> Sign In With Google</p>
        </button>
      </form>
    </div>
  );
}
