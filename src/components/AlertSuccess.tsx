import React from "react";
import { Alert } from "./ui/alert";
import { CircleCheckBig, TriangleAlert } from "lucide-react";

interface AllertSuccessProps {
  title: string;
  description?: string;
}

export const AllertSuccess = ({ title, description }: AllertSuccessProps) => {
  return (
    <div role="alert">
      <div className="flex w-full gap-4 bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 my-2 rounded-lg">
        <div className="flex items-center justify-center rounded-lg bg-teal-200 w-10 h-10">
          <CircleCheckBig strokeWidth={1.5} />
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