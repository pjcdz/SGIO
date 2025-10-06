import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  backUrl?: string;
  userRole: 'admin' | 'finance' | 'field_worker';
  userName?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, backUrl, userRole, userName, actions }: HeaderProps) {
  const getRoleConfig = () => {
    switch (userRole) {
      case 'admin':
        return { color: 'blue', icon: 'D', label: 'Director', role: 'Admin' };
      case 'finance':
        return { color: 'green', icon: 'C', label: 'Contador', role: 'Finanzas' };
      case 'field_worker':
        return { color: 'orange', icon: 'C', label: 'Capataz', role: 'Campo' };
      default:
        return { color: 'blue', icon: 'U', label: 'Usuario', role: 'Usuario' };
    }
  };

  const roleConfig = getRoleConfig();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {backUrl && (
            <Link href={backUrl} className="p-2 hover:bg-slate-100 rounded-lg transition">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <div className={`w-10 h-10 bg-${roleConfig.color}-600 rounded-xl flex items-center justify-center`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {actions}
          <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{roleConfig.label}</p>
              <p className="text-xs text-slate-500">{roleConfig.role}</p>
            </div>
            <div className={`w-10 h-10 bg-${roleConfig.color}-100 rounded-full flex items-center justify-center`}>
              <span className={`text-${roleConfig.color}-600 font-semibold`}>{roleConfig.icon}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
