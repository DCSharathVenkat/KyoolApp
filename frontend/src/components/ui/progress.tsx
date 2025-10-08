// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
     
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
       
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
