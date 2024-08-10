import React from "react";
interface CardFooterProps {
  children: React.ReactNode;
}

export const CardFooter = ({ children }: CardFooterProps) => {
  return (
    <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800 justify-end ">
      {children}
    </div>
  );
};
