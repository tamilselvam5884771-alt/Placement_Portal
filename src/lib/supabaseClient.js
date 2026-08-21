import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://stkmielqomfgowolipoz.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a21pZWxxb21mZ293b2xpcG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDQwNDQsImV4cCI6MjEwMjg4MDA0NH0.bILeMtcVHh_9QtGrKgT_W-_9e4mpxFyoz2ZnlH09LVI';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export default supabase;
