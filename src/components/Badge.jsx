import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-mono uppercase tracking-wide transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(var(--neon-cyan))] bg-[hsl(var(--neon-cyan))/0.1] text-[hsl(var(--neon-cyan))] shadow-[0_0_10px_hsl(var(--neon-cyan)/0.3)]",
        secondary:
          "border-[hsl(var(--muted))] bg-[hsl(var(--muted))] text-foreground",
        destructive:
          "border-[hsl(var(--destructive))] bg-[hsl(var(--destructive))/0.1] text-[hsl(var(--destructive))] shadow-[0_0_10px_hsl(var(--destructive)/0.3)]",
        success:
          "border-[hsl(var(--neon-green))] bg-[hsl(var(--neon-green))/0.1] text-[hsl(var(--neon-green))] shadow-[0_0_10px_hsl(var(--neon-green)/0.3)]",
        warning:
          "border-[hsl(var(--neon-orange))] bg-[hsl(var(--neon-orange))/0.1] text-[hsl(var(--neon-orange))] shadow-[0_0_10px_hsl(var(--neon-orange)/0.3)]",
        outline: 
          "text-foreground border-[hsl(var(--border))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
