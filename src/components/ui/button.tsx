// src/components/ui/Button.tsx
import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg";
  }
>(
  (
    { className, variant = "default", size = "default", ...props },
    ref
  ) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            // default
            "bg-primary text-primary-foreground hover:bg-primary/90":
              variant === "default",
            // outline – cái bạn cần cho nút "Xem tất cả"
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            // ghost
            "hover:bg-accent hover:text-accent-foreground":
              variant === "ghost",
          },
          {
            "h-9 px-4 py-2": size === "default",
            "h-10 px-6 text-lg": size === "lg",
            "h-8 px-3 text-sm": size === "sm",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
