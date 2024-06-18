"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { paths } from "@/lib/navigation";

export const Sidebar = () => {
  const currentPath = usePathname();

  return (
    <aside style={{ gridArea: "aside" }}>
      <Link href="/">
        <h1 className="p-4 font-medium">Utils @Edqe</h1>
      </Link>

      <Accordion type="multiple">
        {paths.map((group) => (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="px-4">{group.title}</AccordionTrigger>
            <AccordionContent className="px-4 flex gap-1 flex-wrap">
              {Object.entries(group.childrens).map(([path, child]) => (
                <Button
                  variant={currentPath === path ? "secondary" : "ghost"}
                  asChild
                  key={path}
                >
                  <Link href={path}>{child.title}</Link>
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};
