import { createClient } from '@supabase/supabase-js'

// Cliente público de Supabase.
//
// Solo se usa la clave anon/publishable, que puede viajar al navegador. Los
// permisos reales los aplican las políticas RLS de cada tabla; la clave
// service_role se reserva para scripts de administración y pruebas E2E.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)