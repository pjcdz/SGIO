interface KPICardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'slate';
  trend?: {
    value: number;
    label: string;
  };
}

export default function KPICard({ label, value, icon, subtitle, color = 'slate', trend }: KPICardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    red: 'text-red-600',
    slate: 'text-slate-900'
  };

  const trendColor = trend && trend.value > 0 ? 'text-green-600' : 'text-red-600';
  const trendIcon = trend && trend.value > 0 ? '↑' : '↓';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-500">{label}</p>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      
      <p className={`text-3xl font-semibold ${colorClasses[color]} mb-2`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      
      {subtitle && (
        <p className="text-sm text-slate-500">{subtitle}</p>
      )}
      
      {trend && (
        <p className={`text-sm ${trendColor} mt-2`}>
          {trendIcon} {Math.abs(trend.value)}% {trend.label}
        </p>
      )}
    </div>
  );
}
