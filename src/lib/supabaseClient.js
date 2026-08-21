import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://stkmielqomfgowolipoz.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_mEMzVwydRoAkilchT-I31A_sxXHjoTk';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing in environment');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export default supabase;
