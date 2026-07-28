"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-600 text-white hover:bg-accent-400 shadow-sm hover:shadow-card",
  secondary:
    "border-[1.5px] border-primary-700 text-primary-700 bg-transparent hover:bg-primary-700 hover:text-white",
  ghost:
    "bg-transparent text-primary-700 underline-offset-4 hover:underline px-0 py-0 rounded-none",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", href, className, children, ...props },
    ref
  ) {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-sans text-base font-medium transition-all duration-200 ease-out",
      variant !== "ghost" && "rounded-full px-6 py-3",
      variant === "primary" && "hover:scale-[1.03]",
      variants[variant],
      className
    );

    if (href) {
      return (
        <motion.div whileTap={{ scale: 0.97 }}>
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
