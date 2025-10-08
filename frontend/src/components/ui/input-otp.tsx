// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp@1.4.2";
import { MinusIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
     
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <View
      data-slot="input-otp-group"
     
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <View
      data-slot="input-otp-slot"
      data-active={isActive}
     
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <View>
          <View />
        </View>
      )}
    </View>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <View data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </View>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
