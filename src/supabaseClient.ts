// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://hcumqokvrmtsrgqdwdwq.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjdW1xb2t2cm10c3JncWR3ZHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTE4NTUsImV4cCI6MjA3NjE4Nzg1NX0.jlXdyPJ2A5APbDMTvqufGT3J1nxPfhEJ2ZmyIu0BR_8'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);