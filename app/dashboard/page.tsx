import UserInterface from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import DashboardProfile from "@/components/Dashboard/DashboardProfile";
import DashboardAddress from "@/components/Dashboard/DashboardAddress";

type DashboardProps = {
  selectedField: string;
  user: UserInterface;
};

export default function Dashboard({ selectedField, user }: DashboardProps) {
  if (selectedField === "Profile") {
    return (
      <div>
        <DashboardProfile user={user} />
        <DashboardAddress user={user} />
      </div>
    );
  }
}
