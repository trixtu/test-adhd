import { cn } from "@/lib/utils";
import React from "react";

interface CardTitleProps {
  title: any;
  children?: React.ReactNode;
  className?: string;
}

export const CardTitle = ({ title, children, className }: CardTitleProps) => {
  return (
    <>
      <div className={cn("flex items-center gap-4 border-b pb-2",className)}>
        <div className="border border-sky-500/10 flex relative *:relative *:size-10 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-sky-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
          <img className="w-8 h-8" src="/adhd-icon.png" />
        </div>
        <h2 className={cn("text-xl font-bold", className)}>{title}</h2>
        <div>{children}</div>
      </div>
      
    </>
  );
};
