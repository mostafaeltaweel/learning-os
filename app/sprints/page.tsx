'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  get180DaysCurriculum,
  getPlanForDayNumber,
  getStoredTasksForDate,
  saveUserTaskState,
  deleteTaskFromStorage,
  getAllStoredTasks,
  UserTask,
} from '@/lib/taskStorage';
import { DayPlan } from '@/lib/curriculum180Days';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Zap,
  Target,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  RotateCcw,
  Calendar,
  AlertCircle,
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Search,
  Award,
  RefreshCw,
  BookOpen,
  X,
  Compass,
} from 'lucide-react';

const categoryBadges: Record<string, { bg: string; border: string; text: string }> = {
  English: { bg: 'bg-emerald-50', border: 'border-l-emerald-500', text: 'text-emerald-800' },
  SQL: { bg: 'bg-blue-50', border: 'border-l-blue-600', text: 'text-blue-800' },
  'Power BI': { bg: 'bg-amber-50', border: 'border-l-amber-500', text: 'text-amber-800' },
  Excel: { bg: 'bg-green-50', border: 'border-l-green-600', text: 'text-green-800' },
  Python: { bg: 'bg-indigo-50', border: 'border-l-indigo-500', text: 'text-indigo-800' },
  Statistics: { bg: 'bg-purple-50', border: 'border-l-purple-500', text: 'text-purple-800' },
  'Data Analysis': { bg: 'bg-sky-50', border: 'border-l-sky-500', text: 'text-sky-800' },
  'Machine Learning': { bg: 'bg-pink-50', border: 'border-l-pink-500', text: 'text-pink-800' },
  'AI Engineering': { bg: 'bg-cyan-50', border: 'border-l-cyan-500', text: 'text-cyan-800' },
  'Deep Learning': { bg: 'bg-violet-50', border: 'border-l-violet-500', text: 'text-violet-800' },
  'n8n Automation': { bg: 'bg-orange-50', border: 'border-l-orange-500', text: 'text-orange-800' },
  'Portfolio Project': { bg: 'bg-rose-50', border: 'border-l-rose-500', text: 'text-rose-800' },
  'Career & Interview': { bg: 'bg-teal-50', border: 'border-l-teal-600', text: 'text-teal-900' },
  'Review & Planning': { bg: 'bg-slate-100', border: 'border-l-slate-500', text: 'text-slate-800' },
};

export default function DailyExecutionCenter() {
  const allCurriculum = get180DaysCurriculum();

  // Active state
  const [activeDayNumber, setActiveDayNumber] = useState(1);
  const currentDayPlan: DayPlan = getPlanForDayNumber(activeDayNumber) || allCurriculum[0];
  const [tasks, setTasks] = useState<UserTask[]>(() => getStoredTasksForDate(currentDayPlan.date));
  const [viewMode, setViewMode] = useState<'day' | 'sprint' | 'matrix'>('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [mounted, setMounted] = useState(false);

  // Modal State for Adding/Editing Task
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [formCategory, setFormCategory] = useState('SQL');
  const [formTitle, setFormTitle] = useState('');
  const [formDuration, setFormDuration] = useState('30 min');
  const [formImpact, setFormImpact] = useState('+2 Job Readiness');
  const [formResourceName, setFormResourceName] = useState('');
  const [formResourceUrl, setFormResourceUrl] = useState('');
  const [formNotes, setFormNotes] = useState('');

  useEffect(() => {
    setMounted(true);
    refreshDayTasks(currentDayPlan.date);
  }, [activeDayNumber]);

  const refreshDayTasks = (dateStr: string) => {
    const loaded = getStoredTasksForDate(dateStr);
    setTasks(loaded);
  };

  const handlePrevDay = () => {
    if (activeDayNumber > 1) {
      setActiveDayNumber((prev) => prev - 1);
    }
  };

  const handleNextDay = () => {
    if (activeDayNumber < allCurriculum.length) {
      setActiveDayNumber((prev) => prev + 1);
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => {
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
      return updated;
    });
  };

  const handleOpenNote = (task: UserTask) => {
    setEditingNoteId(task.id);
    setNoteInput(task.userPersonalNote || '');
  };

  const handleSaveNote = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, userPersonalNote: noteInput } : t));
      saveUserTaskState(updated);
      return updated;
    });
    setEditingNoteId(null);
  };

  const handleCarryOverUnfinished = () => {
    if (activeDayNumber >= allCurriculum.length) {
      alert(`Reached the end of the ${allCurriculum.length}-day master curriculum!`);
      return;
    }
    const nextPlan = getPlanForDayNumber(activeDayNumber + 1);
    if (!nextPlan) return;

    const unfinished = tasks.filter((t) => !t.completed).map((t) => ({
      ...t,
      dateAssigned: nextPlan.date,
      dayNumber: nextPlan.dayNumber,
      carriedOver: true,
    }));

    if (unfinished.length === 0) {
      alert('All tasks completed for Day ' + activeDayNumber + '! Nothing to carry over.');
      return;
    }

    saveUserTaskState(unfinished);
    setActiveDayNumber((prev) => prev + 1);
    alert(`Successfully carried over ${unfinished.length} unfinished tasks to Day ${nextPlan.dayNumber} (${nextPlan.date})!`);
  };

  // Add / Edit Task Modal Handlers
  const handleOpenCreateModal = () => {
    setEditingTaskId(null);
    setFormCategory('SQL');
    setFormTitle('');
    setFormDuration('30 min');
    setFormImpact('+2 Job Readiness');
    setFormResourceName('');
    setFormResourceUrl('');
    setFormNotes('');
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task: UserTask) => {
    setEditingTaskId(task.id);
    setFormCategory(task.category);
    setFormTitle(task.title);
    setFormDuration(task.duration);
    setFormImpact(task.impact);
    setFormResourceName(task.resourceName);
    setFormResourceUrl(task.resourceUrl || '');
    setFormNotes(task.notes);
    setIsTaskModalOpen(true);
  };

  const handleSaveModalTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingTaskId) {
      setTasks((prev) => {
        const updated = prev.map((t) =>
          t.id === editingTaskId
            ? {
                ...t,
                category: formCategory,
                title: formTitle,
                duration: formDuration,
                impact: formImpact,
                resourceName: formResourceName || 'Self Study',
                resourceUrl: formResourceUrl,
                notes: formNotes,
              }
            : t
        );
        saveUserTaskState(updated);
        return updated;
      });
    } else {
      const newTask: UserTask = {
        id: `custom-${Date.now()}`,
        category: formCategory,
        title: formTitle,
        duration: formDuration,
        impact: formImpact,
        resourceName: formResourceName || 'Self Study',
        resourceUrl: formResourceUrl,
        completed: false,
        notes: formNotes,
        dateAssigned: currentDayPlan.date,
        dayNumber: currentDayPlan.dayNumber,
      };
      setTasks((prev) => {
        const updated = [...prev, newTask];
        saveUserTaskState(updated);
        return updated;
      });
    }

    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTaskFromStorage(id, currentDayPlan.date);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Sprint days in the active sprint
  const activeSprintDays = allCurriculum.filter((d) => d.sprint === currentDayPlan.sprint);

  // Search Results across all 180 days
  const searchResults = searchQuery.trim()
    ? allCurriculum.filter((d) => {
        const q = searchQuery.toLowerCase();
        return (
          d.missionTitle.toLowerCase().includes(q) ||
          d.missionDescription.toLowerCase().includes(q) ||
          d.theme.toLowerCase().includes(q) ||
          d.tasks.some((t) => t.title.toLowerCase().includes(q) || t.notes.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
        );
      }).slice(0, 8)
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-black bg-[#0078D4] text-white">
              Month {currentDayPlan.month} • Sprint {currentDayPlan.sprint.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Active Day: <strong className="text-[#002050]">Day {currentDayPlan.dayNumber} of {allCurriculum.length}</strong> ({currentDayPlan.dayOfWeek}, {currentDayPlan.date})
            </span>
            {currentDayPlan.isSpacedRepetitionDay && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-purple-600" />
                Spaced Repetition Review
              </span>
            )}
            {currentDayPlan.isMilestoneDay && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-600" />
                Month Milestone Capstone
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-[#002050] flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#FFB900]" />
            180-Day Master Daily Execution Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full 6-Month enterprise curriculum covering all skills demanded by top tech companies on LinkedIn
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Modes */}
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'day' ? 'bg-white text-[#0078D4] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Day Focus
            </button>
            <button
              onClick={() => setViewMode('sprint')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'sprint' ? 'bg-white text-[#0078D4] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Sprint {currentDayPlan.sprint}
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'matrix' ? 'bg-white text-[#0078D4] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              180-Day Grid
            </button>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="px-3 py-2 bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Task
          </button>

          <button
            onClick={handleCarryOverUnfinished}
            className="px-3 py-2 bg-white border border-amber-300 text-amber-900 hover:bg-amber-50 text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            Carry Over Unfinished
          </button>
        </div>
      </div>

      {/* 180-Day Global Search & Fast Jump Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Fast Search Across 180 Days */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search all 180 days (e.g. 'Window Functions', 'DAX Context', 'XGBoost', 'Z-Score', 'Head Start PIR', 'Talkora Verb')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0078D4] text-slate-800"
            />
          </div>

          {/* Month Jump Buttons */}
          <div className="flex items-center gap-1 shrink-0 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-500 mr-1">Month:</span>
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <button
                key={m}
                onClick={() => {
                  const targetDay = (m - 1) * 30 + 1;
                  setActiveDayNumber(targetDay);
                  setViewMode('day');
                }}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  currentDayPlan.month === m
                    ? 'bg-[#002050] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                M{m}
              </button>
            ))}
          </div>

          {/* Direct Day Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-500">Jump to Day:</span>
            <input
              type="number"
              min={1}
              max={allCurriculum.length}
              value={activeDayNumber}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= allCurriculum.length) setActiveDayNumber(val);
              }}
              className="w-16 p-1.5 rounded border border-slate-300 text-xs font-bold text-center text-[#002050] bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
            />
            <span className="text-xs text-slate-400 font-semibold">/ {allCurriculum.length}</span>
          </div>
        </div>

        {/* Live Search Quick Results */}
        {searchResults.length > 0 && (
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Matching Curriculum Days:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {searchResults.map((res) => (
                <button
                  key={res.dayNumber}
                  onClick={() => {
                    setActiveDayNumber(res.dayNumber);
                    setSearchQuery('');
                    setViewMode('day');
                  }}
                  className="p-2 rounded bg-blue-50/60 hover:bg-blue-100 border border-blue-200 text-left text-xs transition-colors flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#002050] block">Day {res.dayNumber}: {res.dayOfWeek}</span>
                    <span className="text-[10px] text-slate-500 truncate block max-w-[180px]">{res.missionTitle}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0078D4] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sprint Navigation Strip (7-8 Days) */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevDay}
              disabled={activeDayNumber === 1}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 text-xs font-bold text-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev Day
            </button>
          </div>

          {/* Days in active sprint */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {activeSprintDays.map((d) => {
              const isActive = d.dayNumber === activeDayNumber;
              return (
                <button
                  key={d.dayNumber}
                  onClick={() => {
                    setActiveDayNumber(d.dayNumber);
                    setViewMode('day');
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#002050] text-white border-[#002050] shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-normal leading-none">{d.dayOfWeek.slice(0, 3)}</div>
                  <div>Day {d.dayNumber}</div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleNextDay}
              disabled={activeDayNumber === allCurriculum.length}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 text-xs font-bold text-slate-700"
            >
              Next Day
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Mission Card (Always Distinct & Visible) */}
      <div className="fluent-card p-6 bg-gradient-to-r from-[#002050] via-[#003B7B] to-[#0078D4] text-white shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#50E6FF]/20 text-[#50E6FF] border border-[#50E6FF]/30 uppercase tracking-wider">
                Day {currentDayPlan.dayNumber} / {allCurriculum.length} • {currentDayPlan.dayOfWeek}
              </span>
              <span className="text-xs text-slate-200 font-semibold">
                Theme: <strong>{currentDayPlan.theme}</strong>
              </span>
            </div>

            <h3 className="text-xl font-extrabold tracking-tight text-white leading-snug">
              {currentDayPlan.missionTitle}
            </h3>

            <p className="text-xs text-slate-200 leading-relaxed max-w-3xl">
              {currentDayPlan.missionDescription}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[11px] text-slate-300 font-semibold">Focus Competencies:</span>
              {currentDayPlan.focusCompetencies.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/15 text-white border border-white/20"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-6 bg-white/10 p-4 rounded-xl border border-white/10 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-300 block">Day {currentDayPlan.dayNumber} Completion</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">
                  {completedCount} / {tasks.length}
                </span>
                <span className="text-xs text-[#50E6FF] font-bold">({progressPct}%)</span>
              </div>
              <div className="w-36 bg-white/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#50E6FF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="text-right border-l border-white/20 pl-4 space-y-0.5">
              <span className="text-[10px] text-slate-300 block uppercase font-bold">Total Pace</span>
              <span className="text-lg font-black text-[#50E6FF]">
                {Math.round((activeDayNumber / allCurriculum.length) * 100)}%
              </span>
              <span className="text-[10px] text-slate-300 block">Of {allCurriculum.length} Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Switching */}
      {viewMode === 'day' && (
        /* Day Focus Tasks List */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-[#002050] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#0078D4]" />
              Day {currentDayPlan.dayNumber} Action Tasks ({tasks.length})
            </h4>

            <span className="text-xs text-slate-500">
              Click checkboxes to mark progress • Confetti on completion!
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => {
              const badge = categoryBadges[task.category] || {
                bg: 'bg-slate-50',
                border: 'border-l-slate-400',
                text: 'text-slate-700',
              };
              const isEditingThisNote = editingNoteId === task.id;

              return (
                <div
                  key={task.id}
                  className={`fluent-card p-4 border-l-4 ${badge.border} transition-all ${
                    task.completed ? 'bg-slate-50/80 opacity-90' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Checkbox + Content */}
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-0.5 text-slate-400 hover:text-[#0078D4] transition-colors shrink-0"
                        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300 hover:text-slate-400" />
                        )}
                      </button>

                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg} ${badge.text}`}>
                            {task.category}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.duration}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {task.impact}
                          </span>
                          {task.carriedOver && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                              Carried Over
                            </span>
                          )}
                        </div>

                        <h5
                          className={`text-sm font-bold leading-snug ${
                            task.completed ? 'line-through text-slate-500' : 'text-[#002050]'
                          }`}
                        >
                          {task.title}
                        </h5>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {task.notes}
                        </p>

                        {/* Resource link */}
                        {task.resourceUrl && (
                          <div className="pt-1">
                            <a
                              href={task.resourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0078D4] hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {task.resourceName}
                            </a>
                          </div>
                        )}

                        {/* User Reflection Note Section */}
                        <div className="pt-2">
                          {isEditingThisNote ? (
                            <div className="space-y-2 bg-amber-50/50 p-3 rounded-lg border border-amber-200">
                              <label className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                                Personal Notes & Reflections for Day {currentDayPlan.dayNumber}:
                              </label>
                              <textarea
                                value={noteInput}
                                onChange={(e) => setNoteInput(e.target.value)}
                                placeholder="Write key takeaways, technical breakthroughs, or words learned..."
                                rows={3}
                                className="w-full text-xs p-2.5 rounded border border-amber-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              />
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSaveNote(task.id)}
                                  className="px-3 py-1 text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold rounded"
                                >
                                  Save Note
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {task.userPersonalNote ? (
                                <div
                                  onClick={() => handleOpenNote(task)}
                                  className="cursor-pointer bg-amber-50/80 hover:bg-amber-100/80 p-2 rounded border border-amber-200 text-xs text-amber-950 flex-1 flex items-start gap-1.5 transition-colors"
                                >
                                  <MessageSquare className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                  <div className="space-y-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Your Note:</span>
                                    <p className="italic">{task.userPersonalNote}</p>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleOpenNote(task)}
                                  className="text-[11px] text-slate-500 hover:text-[#0078D4] flex items-center gap-1 font-semibold"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  + Add Reflection Note
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEditModal(task)}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-[#0078D4] transition-colors"
                        title="Edit Task"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'sprint' && (
        /* Sprint View: All days in active sprint */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-[#002050] flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-[#0078D4]" />
              Sprint {currentDayPlan.sprint.toString().padStart(2, '0')} Overview ({activeSprintDays.length} Days)
            </h4>
            <span className="text-xs text-slate-500">
              Showing all days and tasks for Sprint {currentDayPlan.sprint}
            </span>
          </div>

          <div className="space-y-6">
            {activeSprintDays.map((d) => (
              <div key={d.dayNumber} className="fluent-card p-5 border-t-4 border-t-[#0078D4] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#002050] text-white">
                        Day {d.dayNumber} • {d.dayOfWeek}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{d.date}</span>
                    </div>
                    <h5 className="text-sm font-bold text-[#002050] mt-1">
                      {d.missionTitle}
                    </h5>
                  </div>

                  <button
                    onClick={() => {
                      setActiveDayNumber(d.dayNumber);
                      setViewMode('day');
                    }}
                    className="px-3 py-1 text-xs bg-[#0078D4] hover:bg-[#106EBE] text-white font-bold rounded-lg shadow-2xs self-start sm:self-auto"
                  >
                    Focus Day {d.dayNumber} &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {d.tasks.map((t) => (
                    <div key={t.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {t.category}
                        </span>
                        <span className="text-slate-400">{t.duration}</span>
                      </div>
                      <h6 className="text-xs font-bold text-[#002050]">{t.title}</h6>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{t.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'matrix' && (
        /* 190-Day Grid Matrix (Bird's Eye View) */
        <div className="fluent-card p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="text-base font-bold text-[#002050] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#0078D4]" />
              Full {allCurriculum.length}-Day Master Curriculum Matrix (6 Months)
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any box to immediately navigate and inspect that day&apos;s English and technical tasks.
            </p>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-1.5">
            {allCurriculum.map((d) => {
              const isCurrent = d.dayNumber === activeDayNumber;
              return (
                <button
                  key={d.dayNumber}
                  onClick={() => {
                    setActiveDayNumber(d.dayNumber);
                    setViewMode('day');
                  }}
                  className={`p-2 rounded text-center transition-all border ${
                    isCurrent
                      ? 'bg-[#002050] text-white border-[#002050] shadow-sm font-black'
                      : d.isMilestoneDay
                      ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                      : d.isSpacedRepetitionDay
                      ? 'bg-purple-50 border-purple-200 text-purple-900 font-semibold'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                  title={`Day ${d.dayNumber}: ${d.missionTitle}`}
                >
                  <div className="text-[9px] text-slate-400 leading-none">M{d.month}</div>
                  <div className="text-xs">{d.dayNumber}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add / Edit Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#002050] flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#0078D4]" />
                {editingTaskId ? 'Edit Task' : `Add Task for Day ${currentDayPlan.dayNumber}`}
              </h3>
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalTask} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Skill Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                >
                  <option value="SQL">SQL</option>
                  <option value="Power BI">Power BI</option>
                  <option value="English">English</option>
                  <option value="Excel">Excel</option>
                  <option value="Python">Python</option>
                  <option value="Statistics">Statistics</option>
                  <option value="Data Analysis">Data Analysis</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="AI Engineering">AI Engineering</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="n8n Automation">n8n Automation</option>
                  <option value="Portfolio Project">Portfolio Project</option>
                  <option value="Career & Interview">Career & Interview</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Master recursive CTEs on PostgreSQL"
                  className="w-full p-2 rounded border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="e.g. 30 min"
                    className="w-full p-2 rounded border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Impact</label>
                  <input
                    type="text"
                    value={formImpact}
                    onChange={(e) => setFormImpact(e.target.value)}
                    placeholder="e.g. +3 SQL Score"
                    className="w-full p-2 rounded border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Resource Name</label>
                  <input
                    type="text"
                    value={formResourceName}
                    onChange={(e) => setFormResourceName(e.target.value)}
                    placeholder="e.g. PostgreSQL Official Docs"
                    className="w-full p-2 rounded border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Resource URL (Optional)</label>
                  <input
                    type="url"
                    value={formResourceUrl}
                    onChange={(e) => setFormResourceUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2 rounded border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Instructions & Notes</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Specific requirements, code snippets or problem numbers..."
                  className="w-full p-2 rounded border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#0078D4] hover:bg-[#106EBE] text-white font-bold"
                >
                  {editingTaskId ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
