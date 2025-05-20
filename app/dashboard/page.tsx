'use client'
import UserInterface from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import DashboardProfile from "@/components/Dashboard/DashboardProfile";
import DashboardAddress from "@/components/Dashboard/DashboardAddress";
import { useSession } from "next-auth/react";
import dashboardIcon from "@/public/dashboardIcon.svg";
import Image from "next/image";

type DashboardProps = {
  selectedField: string;
  user: UserInterface;
};

export default function Dashboard() {
  const [user, setUser] = useState<UserInterface | undefined>(
    undefined
  );

  const [openSidebar, setOpenSidebar] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<"Profile" | "Orders">(
    "Profile"
  );
  const { data: session, status } = useSession();
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/users/${session?.user.id}`
        );
        const data = await res.json();
        if (res.ok) {
          setErrorMessage(null);
          setUser(data);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error: any) {
        console.log(error);
        setErrorMessage(error);
      }
    }
    if (status === "authenticated") {
      fetchUser();
    }
  }, [session]);



  return (
    <div className="flex flex-col p-3 border border-orange-300 rounded-sm gap-20">
      <div className="flex items-center">
        <div className="size-6" onClick={() => setOpenSidebar(!openSidebar)}>
          <Image src={dashboardIcon} alt="dashboardIcon" />
        </div>
        <h1 className="flex-1 text-center">Dashboard</h1>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {user && selectedOption === "Profile" && <div className="flex flex-col gap-5">
        <DashboardProfile user={user} />
        <DashboardAddress user={user} />
      </div>}
    </div>
  );
}
