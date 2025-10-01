import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export default function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon,
  trend,
  variant = 'default' 
}: KPICardProps) {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary/20 bg-primary/5',
    success: 'border-primary/20 bg-primary/5',
    warning: 'border-primary/20 bg-primary/5',
    danger: 'border-destructive/20 bg-destructive/5',
  };

  return (
    <Card className={cn('transition-all hover:shadow-md', variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <p className={cn(
                'mt-2 text-sm font-medium',
                trend.positive ? 'text-primary' : 'text-destructive'
              )}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </p>
            )}
          </div>
          {Icon && (
            <div className="rounded-lg bg-primary/10 p-3">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
