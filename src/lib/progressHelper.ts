import { supabase } from "@/supabaseClient";

// Definimos todas las partes de los 4 módulos (7 por módulo = 28 total)
const TOTAL_STEPS = 28;

export const updateProgress = async (columnName: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No hay sesión de usuario");

    // 1. Primero, marcamos la actividad actual como completada
    const { error: updateError } = await supabase
      .from('user_progress')
      .upsert({ 
        user_id: user.id, 
        [columnName]: true,
        updated_at: new Date()
      });

    if (updateError) throw updateError;

    // 2. Obtenemos el registro actualizado para contar cuántos 'true' hay
    const { data: progress, error: fetchError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (fetchError) throw fetchError;

    // 3. Contamos cuántas columnas de progreso son 'true'
    // Filtramos las columnas que empiezan con 'm' (m1_story, m2_quiz, etc.)
    const completedSteps = Object.keys(progress).filter(key => 
      key.startsWith('m') && progress[key] === true
    ).length;

    // 4. Calculamos el porcentaje total
    const newPercentage = Math.round((completedSteps / TOTAL_STEPS) * 100);

    // 5. Guardamos el nuevo porcentaje total
    const { error: finalError } = await supabase
      .from('user_progress')
      .update({ total_percentage: newPercentage })
      .eq('user_id', user.id);

    if (finalError) throw finalError;

    return { success: true, percentage: newPercentage };
  } catch (error) {
    console.error("Error en el helper de progreso:", error);
    return { success: false, error };
  }
};