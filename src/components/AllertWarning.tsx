import React from "react";
import { Alert } from "./ui/alert";
import { TriangleAlert } from "lucide-react";

interface AllertWarningProps {
  title: string;
  description?: string;
}

export const AllertWarning = ({ title, description }: AllertWarningProps) => {
  return (
    <div role="alert">
      <div className="flex w-full gap-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 my-2 rounded-lg">
        <div className="flex items-center justify-center rounded-lg bg-yellow-200 w-10 h-10">
          <TriangleAlert/>
        </div>
        <div className="flex flex-col">
          <span className="block sm:inline pl-2">
            <strong className="font-bold">{title}</strong>
          </span>
          <span className="text-sm block sm:inline pl-2">{description}</span>
        </div>
      </div>
    </div>
  );
};
