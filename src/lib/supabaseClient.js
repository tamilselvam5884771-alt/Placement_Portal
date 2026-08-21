import { createClient } from '@supabase/supabase-js';

// User Supabase connection parameters
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://stkmielqomfgowolipoz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a21pZWxxb21mZ293b2xpcG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDQwNDQsImV4cCI6MjEwMjg4MDA0NH0.bILeMtcVHh_9QtGrKgT_W-_9e4mpxFyoz2ZnlH09LVI';

let supabase = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (e) {
  console.warn('Supabase initialization warning:', e);
}

export const getSupabaseClient = (customUrl, customKey) => {
  const targetUrl = customUrl || supabaseUrl;
  const targetKey = customKey || supabaseAnonKey;

  if (targetUrl && targetKey) {
    try {
      return createClient(targetUrl, targetKey);
    } catch (err) {
      console.error('Error creating Supabase client:', err);
    }
  }

  if (supabase) return supabase;

  // Fallback interface if client creation fails
  return {
    isFallback: true,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase URL/Key required') }),
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase URL/Key required') }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => Promise.resolve({ data: null, error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      eq: function() { return this; },
      order: function() { return this; }
    })
  };
};

export default supabase;
