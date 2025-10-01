interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'auto';
  size?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  color = 'auto',
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getColorClass = () => {
    if (color !== 'auto') {
      return `bg-${color}-500`;
    }
    
    // Color automático basado en el porcentaje
    if (percentage >= 95) return 'bg-red-500';
    if (percentage >= 80) return 'bg-amber-500';
    if (percentage >= 60) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-slate-900">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`${heightClasses[size]} ${getColorClass()} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
