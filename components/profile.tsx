'use client'

import React, { useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverTrigger } from "./ui/popover";
import { useStore } from "@/store/store";
import { fetchUser } from "@/lib/fetchUser";

export default function Profile() {
  useEffect(() => {
    fetchUser();
  }, []);
  const user = useStore((state) => state.user);

  return (
    <div>
      <Avatar>
        <AvatarFallback>{user.login.toUpperCase().slice(0,1)}</AvatarFallback>
      </Avatar>
      <Popover>
        <PopoverTrigger>
          {/* <p>{user.name}</p> */}
        </PopoverTrigger>
      </Popover>
    </div>
  );
}
