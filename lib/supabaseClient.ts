/**
 * supabaseClient.ts
 * Cloud Database Client for Mostafa Mohamed Learning OS.
 * Connects to PostgreSQL on Supabase when credentials are provided in .env.local
 * or Vercel Environment Variables.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Sync task completion or reflection note to Supabase (Cloud Backup)
 */
export async function syncTaskToCloud(task: {
  id: string;
  category: string;
  title: string;
  duration?: string;
  impact?: string;
  completed: boolean;
  notes?: string;
  userPersonalNote?: string;
  dateAssigned: string;
  dayNumber?: number;
}) {
  if (!supabase || !isSupabaseConfigured) return;

  try {
    const noteText = task.userPersonalNote || task.notes || '';
    
    // Attempt upsert with full payload
    const { error } = await supabase.from('tasks').upsert(
      {
        id: task.id,
        category: task.category,
        title: task.title,
        status: task.completed ? 'Completed' : 'Planned',
        directive_notes: noteText,
        notes: noteText,
        user_personal_note: task.userPersonalNote || '',
        planned_date: task.dateAssigned,
      },
      { onConflict: 'id' }
    );

    if (error) {
      // Fallback: minimal columns
      const fallback = await supabase.from('tasks').upsert(
        {
          id: task.id,
          category: task.category,
          title: task.title,
          status: task.completed ? 'Completed' : 'Planned',
          planned_date: task.dateAssigned,
        },
        { onConflict: 'id' }
      );
      if (fallback.error) {
        console.warn('Supabase cloud sync notice:', fallback.error.message);
      }
    }
  } catch (err) {
    console.warn('Supabase sync skipped (offline or network issue):', err);
  }
}

/**
 * Pull all tasks from Supabase cloud database
 */
export async function fetchTasksFromCloud() {
  if (!supabase || !isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.warn('Error fetching tasks from cloud:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('Cloud fetch offline:', err);
    return [];
  }
}
