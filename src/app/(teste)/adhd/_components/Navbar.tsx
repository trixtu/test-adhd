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
import { buttonVariants } from "../../../../components/ui/button";
import { ModeToggle } from "../../../../components/ModeToggle";
import { useLenis } from "@studio-freight/react-lenis";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#testimonies",
    label: "Testimonials",
  },
  {
    href: "#about",
    label: "About",
  },

  {
    href: "#benefits",
    label: "Benefits",
  },
];

export const Navbar = () => {
  const { isAuthenticated } = useKindeBrowserClient();

  const { data } = useQuery({
    queryKey: ["isUserSubscribed"],
    queryFn: async () => isUserSubscribed(),
  });

  const isSubscribed = data?.subscribed;

  const lenis = useLenis((scoll) => {});

  return (
    <header
      className="sticky border-b-[1px] top-0 z-40 w-full  dark:border-b-slate-700 overflow-x-hidden
			bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
		"
    >
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container min-h-14 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold md:flex hidden">
            <a
              rel="noreferrer noopener"
              href="/adhd"
              className="ml-2 font-bold text-xl flex"
            >
              <span className="uppercase bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text">
                🚀 TEST ADHD
              </span>
            </a>
          </NavigationMenuItem>

          <nav className="md:flex gap-2">
            <ul className="flex">
              {routeList.map((route: RouteProps, i) => (
                <li key={i}>
                  <button
                    className={`text-[17px] ${buttonVariants({
                      variant: "ghost",
                    })}`}
                    onClick={() => lenis?.scrollTo(route.href, { lerp: 0.03 })}
                  >
                    {route.label}
                  </button>
                </li>
              ))}
            </ul>
           
            {isAuthenticated && isSubscribed && (
              <Link
                rel="noreferrer noopener"
                href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!}
                target="_blank"
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                Billing Portal
              </Link>
            )}
          </nav>

          <div className="hidden md:flex gap-2">
            {isAuthenticated && (
              <Link
                rel="noreferrer noopener"
                href="/api/auth/logout"
                className={`border ${buttonVariants({ variant: "secondary" })}`}
              >
                Logout
                <LogOut className="w-4 h-4 ml-2" />
              </Link>
            )}

            {!isAuthenticated && (
              <Link
                rel="noreferrer noopener"
                href="/api/auth/login"
                className={`border ${buttonVariants({ variant: "secondary" })}`}
              >
                Login
              </Link>
            )}

            {isAuthenticated && isSubscribed && (
              <Link
                rel="noreferrer noopener"
                href="/premium"
                // shining animated button with purple gradient
                className={`border bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white ${buttonVariants(
                  {
                    variant: "secondary",
                  }
                )}`}
              >
                Premium ✨
              </Link>
            )}

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
