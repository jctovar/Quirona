import { supabase } from "@/supabaseClient";

export const updateProgress = async (columnName: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // 1. Verificar el rol antes de guardar
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // Si es investigador, simulamos éxito pero no guardamos nada
  if (profile?.role === 'researcher') {
    console.log("Modo Investigador: Progreso no guardado para mantener limpieza de datos.");
    return;
  }

  // 2. Lógica normal para usuarias
  const { error } = await supabase
    .from('user_progress')
    .update({ [columnName]: true })
    .eq('id', user.id);

  if (error) throw error;
};