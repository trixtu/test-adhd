import { cn } from "@/lib/utils";
import React from "react";

interface CardContentProps {
  children?: React.ReactNode;
  content?: string;
  className?: string;
}

export const CardContent = ({
  children,
  content,
  className,
}: CardContentProps) => {
  return (
    <div
      className={cn(
        "mt-6 pb-6 rounded-b-[--card-border-radius] min-h-[200px]",
        className
      )}
    >
      {content ? (
        <p className="text-gray-700 dark:text-gray-300 text-lg min-h-[85px]">
          {content}
        </p>
      ) : null}
      {children}
    </div>
  );
};
