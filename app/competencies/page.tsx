import { technicalCurriculumData } from '@/lib/technicalCurriculum';
import { Award, Target, CheckCircle2, Clock, CircleDot, Circle } from 'lucide-react';

const levelBadges: Record<string, string> = {
  'Not Started': 'bg-slate-100 text-slate-700 border-slate-300',
  'Beginner': 'bg-amber-50 text-amber-800 border-amber-300',
  'Intermediate': 'bg-blue-50 text-blue-800 border-blue-300',
  'Intermediate (A1+)': 'bg-blue-50 text-blue-800 border-blue-300',
  'Advanced': 'bg-indigo-50 text-indigo-800 border-indigo-300',
  'Job Ready': 'bg-emerald-50 text-emerald-800 border-emerald-300',
};

export default function CompetencyCenterPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#002050] flex items-center gap-2">
            <Award className="w-6 h-6 text-[#0078D4]" />
            Competency & Curriculum Center
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Real curriculum roadmaps with completed, active, and remaining topics per technical domain
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm text-xs">
          <Target className="w-4 h-4 text-[#0078D4]" />
          <span>Market Weight Target:</span>
          <strong className="text-sm text-[#002050] font-bold">SQL & PBI (50%) • Eng & Python (30%) • Stats & AI (20%)</strong>
        </div>
      </div>

      {/* Grid of Modules with Actual Topic Checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicalCurriculumData.map((mod) => {
          const completedTopics = mod.topics.filter((t) => t.status === 'Completed');
          const inProgressTopics = mod.topics.filter((t) => t.status === 'In Progress');
          const remainingTopics = mod.topics.filter((t) => t.status === 'Remaining');

          const progressPct = Math.round((completedTopics.length / mod.topics.length) * 100);
          const badgeClass = levelBadges[mod.currentLevel] || 'bg-slate-100 text-slate-700';

          return (
            <div key={mod.module} className="fluent-card p-6 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-[#002050]">{mod.module}</h3>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
                    {mod.currentLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span>Weight: <strong>{Math.round(mod.weight * 100)}%</strong></span>
                  <span>Target: <strong className="text-emerald-700">{mod.targetLevel}</strong></span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Curriculum Mastery</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0078D4] h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Actual Topics Breakdown */}
                <div className="space-y-4">
                  {/* Completed Topics */}
                  {completedTopics.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed ({completedTopics.length})
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {completedTopics.map((t) => (
                          <li key={t.id} className="flex items-center gap-2">
                            <span className="text-emerald-600 font-bold text-xs">✓</span>
                            <span>{t.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* In Progress Topics */}
                  {inProgressTopics.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1.5 flex items-center gap-1">
                        <CircleDot className="w-3.5 h-3.5 text-blue-600" />
                        In Progress ({inProgressTopics.length})
                      </span>
                      <ul className="space-y-1 text-xs text-slate-800 font-medium">
                        {inProgressTopics.map((t) => (
                          <li key={t.id} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                            <span>{t.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Remaining Topics */}
                  {remainingTopics.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        Remaining Topics ({remainingTopics.length})
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-500">
                        {remainingTopics.slice(0, 4).map((t) => (
                          <li key={t.id} className="flex items-center gap-2">
                            <span className="text-slate-300">○</span>
                            <span className="line-clamp-1">{t.name}</span>
                          </li>
                        ))}
                        {remainingTopics.length > 4 && (
                          <li className="text-[10px] text-slate-400 italic pl-3">
                            + {remainingTopics.length - 4} more advanced topics
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Target Indicator */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Total Topics: {mod.topics.length}</span>
                <span className="text-[#0078D4] font-semibold">Active in Sprint 01</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
