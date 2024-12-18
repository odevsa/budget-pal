import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import React from "react";

const variants = cva("", {
  variants: {
    variant: {
      default: "",
      icon: "",
    },
    size: {
      xl: "h-12",
      lg: "h-10",
      default: "h-7",
      sm: "h-5",
      xs: "h-4",
    },
    font: {
      xl: "text-5xl",
      lg: "text-4xl",
      default: "text-2xl",
      sm: "text-lg",
      xs: "text-sm",
    },
  },
  defaultVariants: {},
});

interface LogoProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, size = "default", variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row items-center gap-1",
          variants({ className, size })
        )}
        {...props}
      >
        <Image
          src="/images/logo.svg"
          className={cn("w-auto h-auto", variants({ className, size }))}
          width={0}
          height={0}
          alt={process.env.NEXT_PUBLIC_APP_NAME || ""}
        />
        {variant != "icon" && (
          <div
            className={cn(
              "font-bold text-foreground",
              variants({ font: size })
            )}
          >
            Budget<span className="text-primary">Pal</span>
          </div>
        )}
      </div>
    );
  }
);

Logo.displayName = "Logo";
export default Logo;
