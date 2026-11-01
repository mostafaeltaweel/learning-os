'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('App Router Caught Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="fluent-card p-8 max-w-lg w-full text-center space-y-6 border-t-4 border-t-rose-500 shadow-lg bg-white">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-[#002050]">
            An unexpected error occurred
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {error.message || 'The application encountered a client runtime issue and recovered.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Try Again
          </button>

          <Link
            href="/"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
