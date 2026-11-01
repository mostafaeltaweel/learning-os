'use client';

import { useState } from 'react';
import { expert6MonthsRoadmap } from '@/lib/expertCurriculumData';
import { detailedSkillsData, DetailedSkill } from '@/lib/skillDetailData';
import {
  Compass,
  Calendar,
  CheckCircle2,
  FolderGit2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  Award,
  ExternalLink,
  X,
  FileText,
  FileCheck,
  Check,
  Clock,
  Briefcase,
  Zap,
  Target,
  Maximize2,
} from 'lucide-react';

const categoryBadges: Record<string, { bg: string; text: string; border: string }> = {
  English: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  SQL: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
  'Power BI': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  Excel: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
  Python: { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
  Statistics: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
  'Data Analysis': { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
  'Machine Learning': { bg: 'bg-pink-50', text: 'text-pink-800', border: 'border-pink-200' },
  'AI Engineering': { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-200' },
  'Deep Learning': { bg: 'bg-violet-50', text: 'text-violet-800', border: 'border-violet-200' },
  'n8n Automation': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
};

export default function MasterRoadmapPage() {
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [selectedPhase, setSelectedPhase] = useState<'all' | 'short-term' | 'long-term'>('all');
  const [activeModalSkill, setActiveModalSkill] = useState<DetailedSkill | null>(null);

  const filteredRoadmap = expert6MonthsRoadmap.filter((m) => {
    const matchMonth = selectedMonth === 'all' || m.month === selectedMonth;
    const matchPhase =
      selectedPhase === 'all' ||
      (selectedPhase === 'short-term' && m.phase.includes('Short-Term')) ||
      (selectedPhase === 'long-term' && m.phase.includes('Long-Term'));
    return matchMonth && matchPhase;
  });

  const handleOpenSkillModal = (skillId: string, fallbackModule: any, monthNumber: number, focusRole: string) => {
    // Look up detailed skill first
    const detailed = detailedSkillsData.find((s) => s.id === skillId || s.category === fallbackModule.category);

    if (detailed) {
      setActiveModalSkill(detailed);
    } else {
      // Synthesize detailed skill from fallback
      const synthesized: DetailedSkill = {
        id: fallbackModule.id,
        month: monthNumber,
        title: fallbackModule.name,
        category: fallbackModule.category,
        level: fallbackModule.level,
        targetRole: focusRole,
        bookReference: {
          bookTitle: `${fallbackModule.category} Official Core Curriculum & Practice Standards`,
          relevantChapters: 'Master Reference Modules 1-4',
        },
        coreFundamentals: [
          `First-Principles comprehension of ${fallbackModule.category} data structures and architectural best practices.`,
          'Zero-defect boundary conditions, edge cases, and high-performance execution patterns.',
          'Direct translation into reproducible portfolio artifacts that hiring managers look for.',
        ],
        dailyTasks: fallbackModule.topics.map((t: any, idx: number) => ({
          dayNumber: idx + 1,
          dayTitle: t.title,
          dailyCoverage: t.description,
          theoreticalReference: t.resourceName,
          practicalDeliverable: `Hands-on practical deliverable for ${t.title}.`,
          estimatedHours: t.hours,
        })),
        finalMilestoneOutcome: {
          portfolioTitle: `${fallbackModule.name} Final Milestone Showcase`,
          deliverableSummary: `Comprehensive portfolio project demonstrating end-to-end ${fallbackModule.category} mastery.`,
          businessImpact: 'Built to exceed recruiter benchmarks and showcase high autonomy in real-world scenarios.',
        },
        verifiedResources: fallbackModule.topics.map((t: any) => ({
          name: t.resourceName,
          url: t.resourceUrl,
          isLocal: false,
          type: 'Curriculum Resource',
        })),
      };
      setActiveModalSkill(synthesized);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#0078D4] text-white">
              Curriculum Architecture
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Short-Term Goal: <strong className="text-[#002050]">Hire as Data Analyst</strong> • Long-Term: <strong className="text-[#002050]">AI Systems Specialist</strong>
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#002050] flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#0078D4]" />
            6-Month Full Master Curriculum & Roadmap
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Grounded in real textbooks: OpenStax Statistics 2e, Head Start Data Analysis Handbook, AI Engineering & Talkora Diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-2 rounded-lg border border-emerald-200 text-xs font-bold shadow-xs">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Interactive Skills Deep-Dive Enabled</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Month Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-2">Filter Month:</span>
          {(['all', 1, 2, 3, 4, 5, 6] as const).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                selectedMonth === m
                  ? 'bg-[#002050] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m === 'all' ? 'All Months (1-6)' : `Month ${m}`}
            </button>
          ))}
        </div>

        {/* Phase Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-2">Phase:</span>
          {[
            { id: 'all', label: 'All Tracks' },
            { id: 'short-term', label: 'Short-Term (Hire Ready)' },
            { id: 'long-term', label: 'Long-Term (AI Horizon)' },
          ].map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id as any)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedPhase === phase.id
                  ? 'bg-[#0078D4] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {phase.label}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Months Timeline Feed */}
      <div className="space-y-8">
        {filteredRoadmap.map((monthPlan) => (
          <div key={monthPlan.month} className="fluent-card p-6 border-t-4 border-t-[#0078D4] shadow-sm space-y-6">
            {/* Month Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-[#002050]">
                    {monthPlan.phase}
                  </span>
                  <span className="text-xs font-semibold text-[#0078D4]">
                    Target Role: <strong>{monthPlan.focusRole}</strong>
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[#002050]">
                  {monthPlan.title}
                </h3>
              </div>

              {/* Milestone Deliverable Badge */}
              <div className="p-3.5 rounded-lg bg-[#F0F6FF] border border-[#C7E0F4] text-xs space-y-1 md:max-w-md">
                <span className="font-bold text-[#0078D4] flex items-center gap-1.5 text-xs">
                  <FolderGit2 className="w-4 h-4" />
                  Portfolio Milestone: {monthPlan.milestoneProject.title}
                </span>
                <p className="text-slate-600 text-[11px] leading-snug">
                  <strong>Impact:</strong> {monthPlan.milestoneProject.businessImpact}
                </p>
              </div>
            </div>

            {/* Modules Grid (Clean, Clickable Cards with Prominent Pop-up Button) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {monthPlan.modules.map((mod) => {
                const badge = categoryBadges[mod.category] || {
                  bg: 'bg-slate-50',
                  text: 'text-slate-800',
                  border: 'border-slate-200',
                };

                return (
                  <div
                    key={mod.id}
                    className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#0078D4] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {mod.category}
                        </span>
                        <span className="text-[10px] font-bold text-[#0078D4] bg-blue-50 px-2 py-0.5 rounded">
                          {mod.level}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-bold text-sm text-[#002050] mb-2 leading-snug group-hover:text-[#0078D4] transition-colors">
                        {mod.name}
                      </h4>

                      {/* Brief Topic Bullets */}
                      <div className="space-y-1.5 mb-3">
                        {mod.topics.slice(0, 2).map((t, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0078D4] mt-1 shrink-0" />
                            <span className="line-clamp-1 font-medium">{t.title}</span>
                          </div>
                        ))}
                        {mod.topics.length > 2 && (
                          <span className="text-[10px] text-slate-400 block italic pl-3">
                            +{mod.topics.length - 2} more daily modules
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pop-up Action Button ("bobub site") */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        6-Day Coverage Plan
                      </span>

                      <button
                        onClick={() => handleOpenSkillModal(mod.id, mod, monthPlan.month, monthPlan.focusRole)}
                        className="px-3 py-1.5 rounded-lg bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        تفاصيل وتغطية الأيام
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal Popup ("bobub site") */}
      {activeModalSkill && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#002050] via-[#003B7B] to-[#0078D4] text-white rounded-t-2xl flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#50E6FF]/20 text-[#50E6FF] border border-[#50E6FF]/30 uppercase tracking-wider">
                    Month {activeModalSkill.month} • {activeModalSkill.category}
                  </span>
                  <span className="text-xs text-slate-200 font-semibold">
                    Target Role: {activeModalSkill.targetRole}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white leading-snug">
                  {activeModalSkill.title}
                </h3>
                <p className="text-xs text-slate-200">
                  Level: <strong>{activeModalSkill.level}</strong> • Comprehensive 6-Day Task & Theoretical Coverage Matrix
                </p>
              </div>

              <button
                onClick={() => setActiveModalSkill(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
              {/* Grounding Textbook Reference Banner */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0078D4]">
                  <FileText className="w-4 h-4" />
                  <span>المصدر المرجعي المعتمد (Grounding Textbook):</span>
                </div>
                <h5 className="text-sm font-extrabold text-[#002050]">
                  {activeModalSkill.bookReference.bookTitle}
                </h5>
                <p className="text-xs text-slate-600">
                  <strong>الفصول المحددة:</strong> {activeModalSkill.bookReference.relevantChapters}
                </p>
                {activeModalSkill.bookReference.localFileName && (
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>الملف متاح محلياً في مجلد المشروع: <code>{activeModalSkill.bookReference.localFileName}</code></span>
                  </div>
                )}
              </div>

              {/* Core Fundamentals Section (المفاهيم السليمة والأساس القوي) */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#002050] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  الأساس النظري والمفاهيم الجوهرية (Structure & Fundamentals):
                </h4>
                <div className="space-y-2">
                  {activeModalSkill.coreFundamentals.map((fund, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#0078D4] shrink-0 mt-1.5" />
                      <p className="text-slate-700 leading-relaxed">{fund}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Task Breakdown (تاسك كل يوم والتغطية الشاملة) */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#002050] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0078D4]" />
                  توزيع المهام اليومية والتغطية الشاملة (Daily Tasks & Coverage):
                </h4>

                <div className="space-y-3">
                  {activeModalSkill.dailyTasks.map((day) => (
                    <div
                      key={day.dayNumber}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-2xs space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#002050] text-white">
                            Day {day.dayNumber}
                          </span>
                          <h5 className="text-xs font-bold text-[#002050]">
                            {day.dayTitle}
                          </h5>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {day.estimatedHours} hrs study
                        </span>
                      </div>

                      {/* Coverage */}
                      <div className="text-xs text-slate-600">
                        <strong className="text-slate-800">التغطية العلمية لليوم: </strong>
                        {day.dailyCoverage}
                      </div>

                      {/* Practical Deliverable */}
                      <div className="p-2.5 rounded bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>المخرج العملي (Deliverable): </strong>
                          {day.practicalDeliverable}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Milestone Outcome (النتيجة النهائية كـ Output عملي) */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>النتيجة النهائية للمهارة (Final Milestone Deliverable):</span>
                </div>
                <h5 className="text-sm font-extrabold text-[#002050]">
                  {activeModalSkill.finalMilestoneOutcome.portfolioTitle}
                </h5>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeModalSkill.finalMilestoneOutcome.deliverableSummary}
                </p>
                <div className="p-2.5 rounded bg-white/80 border border-amber-200 text-xs text-slate-800 font-medium">
                  <strong className="text-amber-900">الأثر الملموس للتوظيف (Business Impact): </strong>
                  {activeModalSkill.finalMilestoneOutcome.businessImpact}
                </div>
              </div>

              {/* Verified Working Resources */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  المراجع والمنصات التفاعلية الموثوقة:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalSkill.verifiedResources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#002050] block">{res.name}</span>
                        <span className="text-[10px] text-slate-500">{res.type}</span>
                      </div>

                      {res.isLocal ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          محلي في المجلد
                        </span>
                      ) : (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-[#0078D4] text-white font-semibold hover:bg-[#106EBE] flex items-center gap-1 text-[11px]"
                        >
                          فتح
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Roadmap Architecture • Antigravity Learning OS
              </span>

              <button
                onClick={() => setActiveModalSkill(null)}
                className="px-4 py-2 bg-[#002050] hover:bg-[#003B7B] text-white text-xs font-bold rounded-lg transition-colors"
              >
                إغلاق النافذة (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
