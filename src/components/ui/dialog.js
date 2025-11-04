import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={
      "fixed inset-0 z-50 bg-black/75 " +
      "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out " +
      className
    }
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg bg-white p-6 shadow-lg rounded-lg " +
        "translate-x-[-50%] translate-y-[-50%] " +
        "data-[state=open]:animate-fade-slide-down data-[state=closed]:animate-fade-slide-up " +
        className
      }
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-5 top-5 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className = "", ...props }) => (
  <div
    className={"flex flex-col space-y-1.5 border-b pb-4 mb-2.5 border-gray-300 text-center sm:text-left " + className}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className = "", ...props }) => (
  <div
    className={"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 " + className}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={"text-2xl font-semibold leading-none tracking-tight " + className}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={"text-sm text-muted-foreground " + className}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
