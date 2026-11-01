'use client';

import { useEffect } from 'react';
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F9FA] text-[#201F1E] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl max-w-md w-full border border-slate-200 shadow-xl text-center space-y-4">
          <h2 className="text-xl font-bold text-[#002050]">Application Encountered an Error</h2>
          <p className="text-xs text-slate-500">
            {error.message || 'A global client boundary issue was detected.'}
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#0078D4] text-white text-xs font-bold rounded-lg hover:bg-[#106EBE]"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
