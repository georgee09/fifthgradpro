"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {}

const ScrollArea = ({ className, children, ...props }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root
    className={cn(
      "relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      orientation="vertical"
      className="flex touch-none select-none p-0.5 transition-colors duration-160 ease-out hover:bg-slate-800/80"
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-slate-700" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner className="bg-slate-900" />
  </ScrollAreaPrimitive.Root>
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
