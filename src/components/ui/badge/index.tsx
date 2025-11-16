import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClass =
    variant === "default"
      ? styles.default
      : variant === "secondary"
      ? styles.secondary
      : variant === "destructive"
      ? styles.destructive
      : variant === "outline"
      ? styles.outline
      : "";

  return <div className={cn(styles.badge, variantClass, className)} {...props} />;
}

export { Badge };

