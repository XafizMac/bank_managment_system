"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import axios from "axios";

// Mock authentication - in real app would use a proper auth system

export function UserNav() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  const clearUser = useStore((state) => state.clearUser);
  const logOut = async () => {
    const res = await axios.post("/api/logout");
    if(res.status == 200) {
      clearUser();
      router.push("/login");
    }
  };

  // If not authenticated, show simplified header
  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <ModeToggle />
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
            <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-auto">
            <div className="flex items-start gap-2 p-3 hover:bg-muted/50 rounded-md">
              <div className="h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm font-medium">
                  New document requires your approval
                </p>
                <p className="text-xs text-muted-foreground">
                  Loan Agreement #12345 - 5 mins ago
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 hover:bg-muted/50 rounded-md">
              <div className="h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm font-medium">
                  Document has been approved
                </p>
                <p className="text-xs text-muted-foreground">
                  Client Contract #98765 - 1 hour ago
                </p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/notifications"
              className="w-full text-center cursor-pointer"
            >
              View all notifications
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="@username" />
              <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center justify-between space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.role}
              </p>
            </div>
          </DropdownMenuLabel>
          {/* <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOut}>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
