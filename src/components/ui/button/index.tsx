import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantClass =
      variant === "default"
        ? styles.default
        : variant === "destructive"
        ? styles.destructive
        : variant === "outline"
        ? styles.outline
        : variant === "secondary"
        ? styles.secondary
        : variant === "ghost"
        ? styles.ghost
        : variant === "link"
        ? styles.link
        : "";

    const sizeClass =
      size === "default"
        ? styles.sizeDefault
        : size === "sm"
        ? styles.sizeSm
        : size === "lg"
        ? styles.sizeLg
        : size === "icon"
        ? styles.sizeIcon
        : "";

    return (
      <Comp
        className={cn(styles.button, variantClass, sizeClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const buttonVariants = ({ variant = "default", size = "default" }: Partial<ButtonProps> = {}) => {
  const variantClass =
    variant === "default"
      ? styles.default
      : variant === "destructive"
      ? styles.destructive
      : variant === "outline"
      ? styles.outline
      : variant === "secondary"
      ? styles.secondary
      : variant === "ghost"
      ? styles.ghost
      : variant === "link"
      ? styles.link
      : "";

  const sizeClass =
    size === "default"
      ? styles.sizeDefault
      : size === "sm"
      ? styles.sizeSm
      : size === "lg"
      ? styles.sizeLg
      : size === "icon"
      ? styles.sizeIcon
      : "";

  return `${styles.button} ${variantClass} ${sizeClass}`;
};

export { Button };
