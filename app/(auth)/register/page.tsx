"use client";
import { register } from "@/actions/authActions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import googleIcon from "@/public/googleIcon.svg";
import signupIcon from "@/public/signUpIcon.svg";

export default function Register() {
  const [state, formAction, isPending] = useActionState(register, undefined);
  const searchParams = useSearchParams();
  const router = useRouter();
  //delay before the redirect to login
  if (state?.success) {
    setTimeout(() => {
      router.push("/login");
    }, 3000);
    return <p>{state.message}</p>;
  }
  return (
    <div className="p-2">
      <form
        action={formAction}
        className="mx-auto flex max-w-lg flex-col gap-4 rounded-lg border border-orange-800 bg-white px-2 py-4 sm:p-6 md:max-w-xl lg:max-w-2xl"
      >
        <div className="mb-3 flex flex-col gap-2 text-sm md:text-base [&>input]:rounded-md [&>input]:border [&>input]:border-black [&>input]:p-1">
          {state?.message && <p>{state.message}</p>}
          <label htmlFor="name">Name:</label>
          <input
            className="border border-orange-300"
            type="text"
            id="name"
            name="name"
          />
          {state?.errors?.name && <p>{state.errors.name}</p>}
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" />
          {state?.errors?.lastName && <p>{state.errors.lastName}</p>}
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          {state?.errors?.email && <p>{state.errors.email}</p>}
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-full border py-1 text-sm font-bold transition-colors duration-500 hover:bg-orange-300 md:text-base"
          type="submit"
          disabled={isPending}
        >
          <Image src={signupIcon} alt="signupIcon" className="size-6" />
          <p> Sign Up </p>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-full border py-1 text-sm font-bold transition-colors duration-500 hover:bg-orange-300 md:text-base"
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
