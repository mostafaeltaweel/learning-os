import { getLearningData } from '@/lib/data';
import {
  Briefcase,
  FolderGit2,
  Share2,
  Send,
  Users,
  Award,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export default function CareerCenterPage() {
  const { portfolioProjects, careerTracking } = getLearningData();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#002050] flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#0078D4]" />
            Career Center
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Job acquisition funnel, interview conversion, and monthly portfolio deliverables
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Award className="w-4 h-4 text-emerald-600" />
          Primary Objective: Hire as BI / Data Analyst in 6 Months
        </div>
      </div>

      {/* Recruitment Funnel & Networking Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#002050] flex items-center gap-2">
          <Send className="w-4 h-4 text-[#0078D4]" />
          Commercial Job Pipeline (Applications, Interviews & Networking)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {careerTracking.map((stage, i) => (
            <div key={i} className="fluent-card p-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Step {i + 1}
                </span>
                <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 min-h-[32px]">
                  {stage.stage}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#002050]">{stage.actual}</span>
                  <span className="text-[11px] text-slate-400">/ {stage.target}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#0078D4]">{stage.rate}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                    {stage.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Month Portfolio Deliverables */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#002050] flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#0078D4]" />
            Monthly Portfolio Showcase (Proof of Work)
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Total Projects: {portfolioProjects.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioProjects.map((prj) => (
            <div key={prj.id} className="fluent-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3FC] text-[#0078D4] border border-[#C7E0F4]">
                    Month {prj.month} Project
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      prj.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : prj.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {prj.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#002050] mb-1.5 leading-snug">
                  {prj.title}
                </h4>

                <p className="text-xs text-slate-500 mb-3">
                  Domain: <strong className="text-slate-700">{prj.domain}</strong>
                </p>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5 mb-3">
                  <div>
                    <span className="font-semibold text-slate-700">Tech Stack:</span> {prj.tech}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Impact:</span> {prj.impact}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Code & PBIX artifacts</span>
                <span className="text-[#0078D4] font-medium flex items-center gap-1">
                  Verified <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
