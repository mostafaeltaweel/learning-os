import Link from 'next/link';
import { Compass, Home, Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="fluent-card p-8 max-w-md w-full text-center space-y-5 bg-white border border-slate-200 shadow-md">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0078D4] flex items-center justify-center mx-auto">
          <Compass className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-black text-[#002050]">404 - Page Not Found</h2>
          <p className="text-xs text-slate-500">
            The curriculum page or module you requested does not exist or has been relocated.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/sprints"
            className="px-4 py-2 bg-[#0078D4] text-white text-xs font-bold rounded-lg hover:bg-[#106EBE] flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            Daily Execution Center
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            Home Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
