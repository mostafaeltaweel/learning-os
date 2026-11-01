'use client';

import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import confetti from 'canvas-confetti';
import {
  computeRealDashboardMetrics,
  RealDashboardSummary,
} from '@/lib/realDashboardMetrics';
import { saveUserTaskState, UserTask } from '@/lib/taskStorage';
import {
  Target,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Circle,
  Calendar,
  Zap,
  Layers,
  Clock,
  ArrowRight,
  BookOpen,
  Award,
} from 'lucide-react';
import Link from 'next/link';

export default function HomeDashboard() {
  const [metrics, setMetrics] = useState<RealDashboardSummary>(() =>
    computeRealDashboardMetrics(1)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    refreshMetrics();
  }, []);

  const refreshMetrics = () => {
    setMetrics(computeRealDashboardMetrics(1));
  };

  const handleToggleTodayTask = (id: string) => {
    const updated = metrics.todayTasks.map((t) => {
      if (t.id === id) {
        const nextState = !t.completed;
        if (nextState) {
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
            });
          } catch (e) {}
        }
        return { ...t, completed: nextState };
      }
      return t;
    });

    saveUserTaskState(updated);
    refreshMetrics();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-black bg-[#0078D4] text-white">
              100% Live Dynamic Analytics
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Real Data • Active Day: <strong className="text-[#002050]">Day {metrics.activeDayNumber} ({metrics.activeDate})</strong>
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#002050] tracking-tight">
            Executive Mission Control & Performance Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time synchronization with your 180-Day curriculum, completed tasks, and competency baselines
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sprints"
            className="px-4 py-2.5 bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-[#FFB900]" />
            Enter 180-Day Execution Center
          </Link>
          <Link
            href="/roadmap"
            className="px-4 py-2.5 bg-white border border-slate-300 hover:border-[#0078D4] text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-[#0078D4]" />
            6-Month Master Plan
          </Link>
        </div>
      </div>

      {/* 4 Core KPI Summary Cards (All 100% Real!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Real Job Readiness Score */}
        <div className="fluent-card p-5 bg-gradient-to-br from-[#002050] to-[#004B87] text-white space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-200">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#50E6FF]">
              Market Weighted Score
            </span>
            <Target className="w-4 h-4 text-[#50E6FF]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">
              {metrics.realJobReadinessScore}%
            </span>
            <span className="text-xs text-emerald-300 font-bold">
              Target: 85%+
            </span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#50E6FF] h-full rounded-full transition-all duration-300"
              style={{ width: `${metrics.realJobReadinessScore}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-300 block">
            Calculated from real SQL, Power BI, Excel & English tasks completed.
          </span>
        </div>

        {/* Real 180-Day Curriculum Progress */}
        <div className="fluent-card p-5 space-y-2 border-l-4 border-l-[#0078D4]">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total 180-Day Curriculum</span>
            <Layers className="w-4 h-4 text-[#0078D4]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#002050]">
              {metrics.totalCompletedTasks}
            </span>
            <span className="text-xs font-bold text-slate-500">
              / {metrics.totalCurriculumTasks} Tasks
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0078D4] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(1, metrics.overallProgressPercentage)}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 block">
            <strong>{metrics.overallProgressPercentage}%</strong> of total 6-month journey completed
          </span>
        </div>

        {/* Real Today Completion */}
        <div className="fluent-card p-5 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Today&apos;s Execution Pace</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#002050]">
              {metrics.todayCompletedCount} / {metrics.todayTotalCount}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              ({metrics.todayProgressPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${metrics.todayProgressPercentage}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 block">
            Day {metrics.activeDayNumber} ({metrics.activeDate}) Action Items
          </span>
        </div>

        {/* Real Sprint & Milestone Target */}
        <div className="fluent-card p-5 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Upcoming Milestone</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-base font-extrabold text-[#002050] line-clamp-1">
            Milestone 1 (Day 30)
          </span>
          <p className="text-xs text-slate-600 leading-snug line-clamp-2">
            E-Commerce SQL Warehouse &amp; Excel Dynamic Model
          </p>
          <span className="text-[11px] text-amber-800 font-bold block pt-1">
            29 Days Remaining in Month 1
          </span>
        </div>
      </div>

      {/* Real Line Chart: Sprint 01 Velocity (Nov 1 to Nov 7) */}
      <div className="fluent-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#0078D4]" />
              <h3 className="text-base font-bold text-[#002050]">
                Real Sprint 01 Velocity &amp; Consistency Tracking (Nov 1 - Nov 7, 2026)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking based on actual tasks checked off in the Daily Execution Center
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              &ge; 80% Excelled
            </span>
            <span className="flex items-center gap-1.5 text-blue-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0078D4]" />
              50-79% Good
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              Pending
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.velocityHistory} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="dayName" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip
                  formatter={(value: any, name: any, item: any) => [
                    `${value}% (${item.payload.completedCount}/${item.payload.totalCount} tasks)`,
                    'Completion Rate',
                  ]}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="completionRate"
                  stroke="#0078D4"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#0078D4', stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">
              Loading Real-Time Velocity Curve...
            </div>
          )}
        </div>
      </div>

      {/* Two Column Section: Real Pie Chart + Real Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Real Category Distribution across all 180 Days (5 cols) */}
        <div className="lg:col-span-5 fluent-card p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-[#002050] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0078D4]" />
              Real 180-Day Curriculum Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Exact breakdown of all {metrics.totalCurriculumTasks} tasks across 10 technical tracks
            </p>
          </div>

          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.categoryDistribution}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {metrics.categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val} Tasks (${item.payload.percentage}%)`,
                      name,
                    ]}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : null}
          </div>

          {/* Clean Legend Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100">
            {metrics.categoryDistribution.slice(0, 8).map((cat) => (
              <div key={cat.name} className="flex items-center justify-between p-1.5 rounded bg-slate-50">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="font-semibold text-slate-700 truncate">{cat.name}</span>
                </div>
                <span className="text-slate-500 font-bold ml-1">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Real Skill Competency & Gap Analysis (7 cols) */}
        <div className="lg:col-span-7 fluent-card p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#002050] flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Real Competency Progress vs. Market Target
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current proficiency computed from Talkora baseline + real completed tasks
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Live Dynamic Growth
            </span>
          </div>

          <div className="h-72 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metrics.skillProficiency}
                  margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="skill" stroke="#64748b" fontSize={10} angle={-25} textAnchor="end" />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val}% (${item.payload.completedTasks}/${item.payload.totalTasks} tasks completed)`,
                      name === 'current' ? 'Current Score' : 'Target Market Score',
                    ]}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="current" name="Current Score (Live)" fill="#0078D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target Job-Ready Score" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>

          <div className="text-[11px] text-slate-500 bg-blue-50/50 p-2.5 rounded border border-blue-200/80">
            <strong>ملاحظة فنية:</strong> ترتفع قيمة <em>Current Score</em> في هذا الرسم البياني تلقائياً في كل مرة تحدد فيها مهمة كمنجزة في مركز التنفيذ اليومي!
          </div>
        </div>
      </div>

      {/* Today's Real Action Tasks Widget (Direct Check-off from Home Dashboard!) */}
      <div className="fluent-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-[#002050]">
                Today&apos;s Real Action Items • Day {metrics.activeDayNumber} ({metrics.activeDate})
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Check off tasks here or in the Daily Execution Center — both synchronize in real-time
            </p>
          </div>

          <Link
            href="/sprints"
            className="text-xs font-bold text-[#0078D4] hover:underline flex items-center gap-1"
          >
            Open Full Daily Execution Center
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metrics.todayTasks.map((t) => (
            <div
              key={t.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                t.completed ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-slate-200 hover:border-[#0078D4]'
              }`}
            >
              <button
                onClick={() => handleToggleTodayTask(t.id)}
                className="mt-0.5 shrink-0 text-slate-400 hover:text-[#0078D4]"
              >
                {t.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </button>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {t.category}
                  </span>
                  <span className="text-slate-400 font-semibold">{t.duration}</span>
                </div>
                <h5 className={`text-xs font-bold ${t.completed ? 'line-through text-slate-400' : 'text-[#002050]'}`}>
                  {t.title}
                </h5>
                <p className="text-[11px] text-slate-500 line-clamp-1">{t.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
