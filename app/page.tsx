"use client";

import ApproverPanel from "@/components/ApproverPanel";
import ArchivistPanel from "@/components/ArchivistPanel";
import { DashboardPage } from "@/components/dashboard-page";
import EmployeePanel from "@/components/EmployeePanel";
import LandingPage from "@/components/LandingPage";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUser } from "@/lib/fetchUser";
import { useStore } from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetchUser();
  }, []);

  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  switch (user.role) {
    case "admin":
      return <DashboardPage />;
    case "employee":
      return <EmployeePanel />;
    case "archivist":
      return <ArchivistPanel />;
    case "approver":
      return <ApproverPanel />;
    default:
      return (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );
  }
}
