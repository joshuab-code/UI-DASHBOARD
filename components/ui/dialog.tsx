import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in"
        onClick={() => onOpenChange(false)}
      />
      {/* Content */}
      <div className="fixed z-50 grid w-full gap-4 border bg-background p-6 shadow-lg duration-200 sm:max-w-lg sm:rounded-lg animate-in zoom-in-95 slide-in-from-bottom-2">
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;
}