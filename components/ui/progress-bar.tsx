import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  className,
  showLabel = false,
  variant = 'default'
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Auto-detect variant based on percentage if default
  const getVariant = () => {
    if (variant !== 'default') return variant;
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'warning';
    return 'danger';
  };

  const activeVariant = getVariant();

  const variantStyles = {
    default: 'bg-primary',
    success: 'bg-primary',
    warning: 'bg-primary',
    danger: 'bg-destructive',
  };

  const bgStyles = {
    default: 'bg-primary/20',
    success: 'bg-primary/20',
    warning: 'bg-primary/20',
    danger: 'bg-destructive/20',
  };

  return (
    <div className="space-y-1">
      <div className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        bgStyles[activeVariant],
        className
      )}>
        <div 
          className={cn(
            "h-full transition-all duration-500 ease-out",
            variantStyles[activeVariant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted-foreground text-right">
          {percentage.toFixed(0)}%
        </p>
      )}
    </div>
  );
}
