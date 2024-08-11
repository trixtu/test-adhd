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
import { redirect, useRouter } from "next/navigation";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/admin/users",
    label: "Users",
  },
  {
    href: "/admin/orders",
    label: "Orders",
  },
];

export const Navbar = () => {

	const router = useRouter();

  const handleLogout = async () => {
    try {
      // Trimite cererea de logout
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Redirecționează utilizatorul către pagina de start
        router.push('/');
      } else {
        // Gestionează erorile, dacă este necesar
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

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
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <span className="uppercase bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text">
                🚀 Next Stripe
              </span>
            </a>
          </NavigationMenuItem>

          <nav className="md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <button
              className={`border ${buttonVariants({ variant: "secondary" })}`}
							onClick={handleLogout}
            >
              Logout
              <LogOut className="w-4 h-4 ml-2" />
            </button>
            {/* <Link
								rel='noreferrer noopener'
								href='/logout'
								className={`border ${buttonVariants({ variant: "secondary" })}`}
							>
								Logout
								<LogOut className='w-4 h-4 ml-2' />
							</Link> */}

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
