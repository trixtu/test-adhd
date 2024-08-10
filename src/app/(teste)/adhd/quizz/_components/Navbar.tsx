"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { isUserSubscribed } from "@/app/premium/actions";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Logo } from "../../_components/Logo";


interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
];

export const Navbar = () => {
  const { isAuthenticated } = useKindeBrowserClient();

  const { data } = useQuery({
    queryKey: ["isUserSubscribed"],
    queryFn: async () => isUserSubscribed(),
  });

  const isSubscribed = data?.subscribed;

  return (
    <header
      className="sticky border-b-[1px] top-0 z-40 w-full  dark:border-b-slate-700 overflow-x-hidden
			bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
		"
    >
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container min-h-14 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold md:flex">
            <Logo />
            
          </NavigationMenuItem>

          <div className=" md:flex gap-2">
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
