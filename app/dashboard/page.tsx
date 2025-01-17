import UserInterface from "@/interfaces/user.interface";
import { useEffect, useState } from "react";
import DashboardProfile from "@/components/Dashboard/DashboardProfile";
import DashboardAddress from "@/components/Dashboard/DashboardAddress";
import { HydratedDocument } from "mongoose";

type DashboardProps = {
  selectedField: string;
  user: HydratedDocument<UserInterface>;
};

export default function Dashboard({ selectedField, user }: DashboardProps) {
  if (selectedField === "Profile") {
    return (
      <div className="flex flex-col gap-5">
        <DashboardProfile user={user} />
        <DashboardAddress user={user} />
      </div>
    );
  }
}
