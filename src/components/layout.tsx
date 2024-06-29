"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode[] }) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      <ResizablePanel defaultSize={20} maxSize={20}>
        {children[0]}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>{children[1]}</ResizablePanel>
    </ResizablePanelGroup>
  );
};
