// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";

function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const DialogCtx = React.createContext<Ctx | null>(null);

type RootProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

function Dialog({ open = false, onOpenChange, children }: RootProps) {
  const [internalOpen, setInternalOpen] = React.useState(open);
  React.useEffect(() => {
    setInternalOpen(open);
    // Add class to body to isolate dialog
    if (open && typeof document !== "undefined") {
      document.body.classList.add("dialog-open");
    } else if (!open && typeof document !== "undefined") {
      document.body.classList.remove("dialog-open");
    }
  }, [open]);
  const setOpen = (v: boolean) => (onOpenChange ? onOpenChange(v) : setInternalOpen(v));
  return (
    <DialogCtx.Provider value={{ open: onOpenChange ? open : internalOpen, setOpen }}>
      {children}
    </DialogCtx.Provider>
  );
}

function useDialog() {
  const ctx = React.useContext(DialogCtx);
  if (!ctx) throw new Error("Dialog.* must be used within <Dialog>");
  return ctx;
}

export function DialogTrigger(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
) {
  const { setOpen } = useDialog();
  const { onClick, ...rest } = props;
  return (
    <TouchableOpacity
      {...rest}
      data-slot="dialog-trigger"
      onPress={(e) => {
        onClick?.(e);
        setOpen(true);
      }}
    />
  );
}

function DialogPortal({ children }: { children?: React.ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

// Lock body scroll while open
function useBodyScrollLock(active: boolean) {
  React.useEffect(() => {
    if (!active || typeof window === "undefined") return;
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;

    const prev = {
      bodyPos: body.style.position,
      bodyTop: body.style.top,
      bodyW: body.style.width,
      bodyOv: body.style.overflow,
      htmlOv: html.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.position = prev.bodyPos;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyW;
      body.style.overflow = prev.bodyOv;
      html.style.overflow = prev.htmlOv;
      window.scrollTo(0, scrollY);
    };
  }, [active]);
}

export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    data-slot="dialog-overlay"
   
    style={{
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      mixBlendMode: "normal",
    }}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = useDialog();
  if (!open) return null;

  useBodyScrollLock(true);

  return (
    <DialogPortal>
      <View
       
        aria-modal="true"
        role="dialog"
      >
        <DialogOverlay onPress={() => setOpen(false)} />
        <View
          ref={ref}
          data-slot="dialog-content"
         
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            mixBlendMode: "normal",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            filter: "none",
            opacity: 1,
          }}
          onPress={(e) => e.stopPropagation()}
          {...props}
        >
          {/* HARD RESET: Stop any page blend/blur/opacity leakage */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .ka-dialog-root, .ka-dialog-root * {
                mix-blend-mode: normal !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                filter: none !important;
                opacity: 1 !important;
                background-color: inherit !important;
              }
              body:not(.dialog-open) * {
                z-index: auto !important;
              }
              body.dialog-open *:not(.ka-dialog-root) {
                z-index: 0 !important;
              }
              `,
            }}
          />
          {children}
          <TouchableOpacity
            data-slot="dialog-close"
           
            onPress={() => setOpen(false)}
            aria-label="Close"
          >
            <XIcon />
          </TouchableOpacity>
        </View>
      </View>
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";

export function DialogHeader(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props;
  return (
    <View
      data-slot="dialog-header"
     
      {...rest}
    />
  );
}

export function DialogFooter(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props;
  return (
    <View
      data-slot="dialog-footer"
     
      {...rest}
    />
  );
}

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h2">
>(({ className, ...props }, ref) => (
  <h2 ref={ref} data-slot="dialog-title" {...props} />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <Text ref={ref} data-slot="dialog-description" {...props} />
));
DialogDescription.displayName = "DialogDescription";

export function DialogClose(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog();
  const { onClick, ...rest } = props;
  return (
    <TouchableOpacity
      data-slot="dialog-close"
      {...rest}
      onPress={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
    />
  );
}

export { Dialog };