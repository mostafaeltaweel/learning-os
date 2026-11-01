'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Zap,
  Award,
  Briefcase,
  BookOpen,
  Compass,
  ChevronLeft,
  ChevronRight,
  User,
  Sparkles,
  Menu,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Mission Control', shortLabel: 'Home', icon: LayoutDashboard },
  { href: '/sprints', label: 'Daily Execution Center', shortLabel: 'Daily Tasks', icon: Zap },
  { href: '/roadmap', label: '6-Month Master Plan', shortLabel: 'Roadmap', icon: Compass },
  { href: '/competencies', label: 'Competency Matrix', shortLabel: 'Skills', icon: Award },
  { href: '/career', label: 'Career & Portfolio', shortLabel: 'Career', icon: Briefcase },
  { href: '/resources', label: 'Resource Library', shortLabel: 'Library', icon: BookOpen },
];

export default function NavigationShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // By default, collapsed to icon-only mode as requested by user ("تدخل لجوا بحيث يظهر الايقونات فقط")
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FA] text-[#201F1E] w-full">
      {/* =========================================================================
          1. DESKTOP / TABLET COLLAPSIBLE SIDEBAR (Hidden on mobile)
      ========================================================================= */}
      <aside
        className={`hidden md:flex flex-col justify-between shrink-0 bg-[#002050] text-white border-r border-[#001838] transition-all duration-300 ease-in-out sticky top-0 h-screen z-30 shadow-md ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Header Brand & Toggle */}
          <div className="p-4 border-b border-[#003366] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#0078D4] flex items-center justify-center font-black text-white shadow-md shrink-0">
                MM
              </div>
              {!isCollapsed && (
                <div className="animate-in fade-in duration-200">
                  <h1 className="font-extrabold text-sm tracking-tight text-white leading-tight truncate">
                    Mostafa Mohamed
                  </h1>
                  <span className="text-[10px] text-[#A6D8FF] block font-medium truncate">
                    Learning OS • 190 Days
                  </span>
                </div>
              )}
            </Link>

            {/* Collapse/Expand Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#A6D8FF] hover:text-white transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse to Icons Only'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 space-y-1.5 mt-2">
            {!isCollapsed && (
              <div className="text-[10px] uppercase font-bold text-[#6CB8F6] px-3 py-1.5 tracking-wider">
                Operating System
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-xl transition-all ${
                      isCollapsed
                        ? 'justify-center p-3 w-12 h-12 mx-auto'
                        : 'justify-between px-3.5 py-2.5 mx-1'
                    } ${
                      isActive
                        ? 'bg-[#0078D4] text-white shadow-md font-bold'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-[#50E6FF]'
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="text-xs font-semibold tracking-tight truncate">
                          {item.label}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Tooltip on Icon-Only Collapsed Mode */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#001838] text-white text-xs font-bold rounded-lg shadow-xl border border-white/10 whitespace-nowrap hidden group-hover:block z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      {item.label}
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#001838] rotate-45 border-l border-b border-white/10" />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer Info */}
        <div className="p-3 border-t border-[#003366] bg-[#001838]">
          {isCollapsed ? (
            <div className="flex justify-center" title="Career Target: Data/BI Analyst -> AI Specialist">
              <Sparkles className="w-5 h-5 text-[#FFB900]" />
            </div>
          ) : (
            <div className="space-y-1 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB900]" />
                <span className="text-[11px] font-bold text-white">Target Career</span>
              </div>
              <p className="text-[11px] text-slate-200 font-medium leading-tight">Data/BI Analyst &rarr; AI Systems</p>
              <p className="text-[10px] text-[#A6D8FF]">180-Day Full Curriculum</p>
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================================
          2. MAIN CONTENT AREA + TOP HEADER
      ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#EDEBE9] px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile MM Logo Badge */}
            <div className="md:hidden w-8 h-8 rounded-lg bg-[#0078D4] flex items-center justify-center font-black text-white text-xs shadow-xs">
              MM
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3FC] text-[#0078D4] border border-[#C7E0F4]">
              Sprint 01 Active
            </span>

            <span className="hidden sm:inline text-xs text-slate-500 font-medium">
              Learning OS: <strong className="text-slate-800">180 Days to High-Impact Placement</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
              <User className="w-3.5 h-3.5 text-[#0078D4]" />
              <span className="font-bold text-slate-700">Mostafa Mohamed</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Body (Padding adjusted for mobile bottom bar) */}
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* =========================================================================
          3. MOBILE BOTTOM NAVIGATION BAR (Thumb-friendly mobile reach)
      ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#002050] border-t border-[#001838] px-2 py-1.5 flex items-center justify-around z-50 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors flex-1 ${
                isActive ? 'text-[#50E6FF]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-[#50E6FF]' : ''}`} />
              <span className={`text-[10px] mt-0.5 font-medium leading-none ${isActive ? 'font-bold text-white' : ''}`}>
                {item.shortLabel}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
