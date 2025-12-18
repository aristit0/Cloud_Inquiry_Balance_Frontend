import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-200 border",
  {
    variants: {
      variant: {
        default:
          "bg-blue-100 text-blue-800 border-blue-300",
        secondary:
          "bg-gray-200 text-gray-800 border-gray-300",
        destructive:
          "bg-red-100 text-red-800 border-red-300",
        success:
          "bg-emerald-100 text-emerald-800 border-emerald-300",
        warning:
          "bg-orange-100 text-orange-800 border-orange-300",
        outline: 
          "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
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
