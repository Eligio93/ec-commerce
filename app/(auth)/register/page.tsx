"use client";
import { register } from "@/actions/authActions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [state, formAction, isPending] = useActionState(register, undefined);
  const router = useRouter();
  //delay before the redirect to login
  if (state?.success) {
    setTimeout(() => {
      router.push("/login");
    }, 3000);
    return <p>{state.message}</p>;
  }
  return (
    <form action={formAction} className="flex flex-col">
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
      <button
        className=" rounded-full bg-orange-200 disabled:opacity-20"
        type="submit"
        disabled={isPending}
      >
        Send
      </button>
    </form>
  );
}
