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
import { getPerformanceHistory, DayPerformanceLog } from '@/lib/taskStorage';
import {
  Target,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Zap,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

// Track distribution across the master curriculum (Pie Chart data)
const skillDistributionData = [
  { name: 'SQL', value: 20, color: '#0078D4' },
  { name: 'Power BI', value: 20, color: '#FFB900' },
  { name: 'Python', value: 15, color: '#107C41' },
  { name: 'Statistics', value: 10, color: '#6B69D6' },
  { name: 'Machine Learning', value: 10, color: '#E3008C' },
  { name: 'RAG & AI Agents', value: 10, color: '#00B7C3' },
  { name: 'n8n Automation', value: 5, color: '#D83B01' },
  { name: 'English Immersion', value: 10, color: '#2B88D8' },
];

// Proficiency Levels vs Target (Bar Chart data)
const skillProficiencyData = [
  { skill: 'SQL', current: 65, target: 90, gap: 25 },
  { skill: 'Power BI', current: 60, target: 90, gap: 30 },
  { skill: 'Excel', current: 75, target: 90, gap: 15 },
  { skill: 'Python', current: 40, target: 85, gap: 45 },
  { skill: 'Statistics', current: 70, target: 85, gap: 15 },
  { skill: 'ML & Deep Learning', current: 30, target: 80, gap: 50 },
  { skill: 'RAG & AI Agents', current: 35, target: 85, gap: 50 },
  { skill: 'n8n Automation', current: 25, target: 80, gap: 55 },
  { skill: 'English (Talkora A1+)', current: 45, target: 85, gap: 40 },
];

export default function HomeDashboard() {
  const [history, setHistory] = useState<DayPerformanceLog[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistory(getPerformanceHistory());
  }, []);

  // Performance summary statistics
  const excelledDays = history.filter((h) => h.status === 'Excelled').length;
  const missedDays = history.filter((h) => h.status === 'Needs Improvement').length;
  const avgRate = history.length > 0 ? Math.round(history.reduce((a, b) => a + b.completionRate, 0) / history.length) : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Welcome & Mission Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#0078D4] text-white">
              6-Month Master Strategy Active
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Short-Term: <strong>Job Ready BI/Data Analyst</strong> • Long-Term: <strong>AI & Automation Architect</strong>
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#002050] tracking-tight">
            Executive Mission Control & Performance Analytics
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sprints"
            className="px-4 py-2.5 bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 hover:shadow-md"
          >
            <Zap className="w-4 h-4 text-[#FFB900]" />
            Enter Interactive Daily Execution Center
          </Link>
          <Link
            href="/roadmap"
            className="px-4 py-2.5 bg-white border border-slate-300 hover:border-[#0078D4] text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-[#0078D4]" />
            6-Month Full Curriculum
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="fluent-card p-5 bg-gradient-to-br from-white to-[#F0F6FF] border-l-4 border-l-[#0078D4]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Job Readiness Score</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-[#002050]">68%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">+0.5% Today</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#0078D4] h-full rounded-full" style={{ width: '68%' }} />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 block">Market Weighted: SQL, PBI, Python, English</span>
        </div>

        <div className="fluent-card p-5 bg-gradient-to-br from-white to-[#F0FFF4] border-l-4 border-l-emerald-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">High Performance Days</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-emerald-800">{excelledDays}</span>
            <span className="text-xs font-semibold text-slate-500">of {history.length} days tracked</span>
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Days with &ge; 80% task completion
          </div>
        </div>

        <div className="fluent-card p-5 bg-gradient-to-br from-white to-[#FFF5F5] border-l-4 border-l-rose-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Missed / Review Days</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-rose-800">{missedDays}</span>
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Need Catch-up</span>
          </div>
          <div className="text-xs text-rose-700 font-medium mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Auto-carried over to next day
          </div>
        </div>

        <div className="fluent-card p-5 bg-gradient-to-br from-white to-[#FAF5FF] border-l-4 border-l-purple-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Execution Consistency</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-purple-900">{avgRate}%</span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Rolling Avg</span>
          </div>
          <div className="text-xs text-purple-700 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 14-day study habit velocity
          </div>
        </div>
      </div>

      {/* LINE CHART: Day-by-Day Performance Tracking */}
      <div className="fluent-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-[#002050] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#0078D4]" />
              Execution Velocity: Days You Did Well vs. Days You Didn&apos;t
            </h3>
            <p className="text-xs text-slate-500">
              Interactive timeline visualizing daily completion rates over the past 14 days
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              &ge; 80% Excelled
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              50-79% Good
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              &lt; 50% Struggled
            </span>
          </div>
        </div>

        {mounted ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="dayName" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as DayPerformanceLog;
                      return (
                        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 text-xs space-y-1">
                          <p className="font-bold text-[#002050]">{data.date} ({data.dayName})</p>
                          <p className="text-slate-700">Completion: <strong className="text-[#0078D4]">{data.completionRate}%</strong> ({data.completedCount}/{data.totalCount} tasks)</p>
                          <p className="text-slate-600">Total Study: {data.studyMinutes} minutes</p>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            data.status === 'Excelled' ? 'bg-emerald-100 text-emerald-800' :
                            data.status === 'Good' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {data.status}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completionRate"
                  stroke="#0078D4"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#0078D4' }}
                  activeDot={{ r: 8, stroke: '#002050', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center text-slate-400">Loading chart...</div>
        )}
      </div>

      {/* PIE CHART & BAR CHART ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PIE CHART: Curriculum Distribution */}
        <div className="fluent-card p-6">
          <div className="mb-4 pb-2 border-b border-slate-100">
            <h3 className="font-bold text-base text-[#002050] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0078D4]" />
              Master 6-Month Curriculum Weight Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Balanced allocation ensuring job readiness in 6 months + expert AI/Automation foundations
            </p>
          </div>

          {mounted ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}
                  >
                    {skillDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}% Weight`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-400">Loading chart...</div>
          )}
        </div>

        {/* BAR CHART: Skill Proficiency vs. Job Ready Bar */}
        <div className="fluent-card p-6">
          <div className="mb-4 pb-2 border-b border-slate-100">
            <h3 className="font-bold text-base text-[#002050] flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Skill Proficiency vs. Job Ready Benchmark (Target: 85-90%)
            </h3>
            <p className="text-xs text-slate-500">
              Current assessment vs. minimum hiring bar for Data & BI Analyst roles
            </p>
          </div>

          {mounted ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillProficiencyData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748B' }} angle={-25} textAnchor="end" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="current" fill="#0078D4" name="Current Proficiency %" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#E2E8F0" name="Target Job Ready %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-400">Loading chart...</div>
          )}
        </div>
      </div>
    </div>
  );
}
