import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("px-5 grid gap-4", className)}>{children}</section>
  );
};
