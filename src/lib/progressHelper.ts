import { supabase } from "@/supabaseClient";

export const updateProgress = async (columnName: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // 1. Primero marcamos la actividad actual como completada
  const { data: currentProgress } = await supabase
    .from('user_progress')
    .upsert({ id: user.id, [columnName]: true })
    .select()
    .single();

  // 2. Traemos TODA la fila para contar cuántas columnas están en 'true'
  const { data: fullRow } = await supabase
    .from('user_progress')
    .select('*')
    .eq('id', user.id)
    .single();

  if (fullRow) {
    // Definimos qué columnas cuentan para el progreso (M1 y M2)
    const progressColumns = [
      'm1_story', 'm1_intro', 'm1_quiz', 'm1_visit', 'm1_game', 'm1_feedback', 'm1_closure',
      'm2_story', 'm2_intro', 'm2_quiz1', 'm2_visit', 'm2_game', 'm2_feedback', 'm2_quiz2', 'm2_closure'
    ];

    // Contamos cuántas de esas columnas son 'true'
    const completedCount = progressColumns.filter(col => fullRow[col] === true).length;
    
    // Calculamos el porcentaje (basado en el total de pasos de los 4 módulos, aprox 30)
    const TOTAL_STEPS = 30; 
    const newPercentage = Math.round((completedCount / TOTAL_STEPS) * 100);

    // 3. Actualizamos el porcentaje final en la base de datos
    await supabase
      .from('user_progress')
      .update({ progress_percentage: newPercentage })
      .eq('id', user.id);
  }
};