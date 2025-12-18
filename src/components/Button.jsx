import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold font-mono uppercase tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 
          "bg-gradient-to-r from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-purple))] text-background shadow-[0_0_20px_hsl(var(--neon-cyan)/0.5)] hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.7)] hover:scale-105",
        destructive:
          "bg-[hsl(var(--destructive))] text-destructive-foreground shadow-[0_0_20px_hsl(var(--destructive)/0.5)] hover:shadow-[0_0_30px_hsl(var(--destructive)/0.7)]",
        outline:
          "border-2 border-[hsl(var(--border))] bg-transparent hover:bg-[hsl(var(--accent))] hover:border-[hsl(var(--neon-cyan))]",
        secondary:
          "bg-[hsl(var(--secondary))] text-secondary-foreground hover:bg-[hsl(var(--secondary))]/80",
        ghost: 
          "hover:bg-[hsl(var(--accent))] hover:text-accent-foreground",
        link: 
          "text-[hsl(var(--neon-cyan))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
