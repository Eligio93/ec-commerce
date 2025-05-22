import accessDeniedIcon from "@/public/accessDeniedIcon.svg";
import Image from "next/image";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col items-center gap-7">
      <Image
        className="max-h-[400px]"
        src={accessDeniedIcon}
        alt="accessDeniedIcon"
      />
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p>To access this page you must be an Admin</p>
      <Link
        className="rounded-full bg-orange-400 px-3 py-1 font-bold"
        href="/dashboard"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
