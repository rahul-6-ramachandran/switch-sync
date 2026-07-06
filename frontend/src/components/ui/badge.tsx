import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium font-mono tracking-tight',
  {
    variants: {
      variant: {
        default:
          'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]',
        accent: 'border-transparent bg-[var(--color-accent-muted)] text-[var(--color-accent)]',
        strong: 'border-transparent bg-[#3ddc971a] text-[var(--color-signal-strong)]',
        mid: 'border-transparent bg-[#f0b5451a] text-[var(--color-signal-mid)]',
        weak: 'border-transparent bg-[#6b6b761a] text-[var(--color-signal-weak)]',
        remote: 'border-transparent bg-[#3ddc971a] text-[var(--color-signal-strong)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
