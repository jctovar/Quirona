import { supabase } from "@/supabaseClient";

/**
 * Marca un paso del programa como completado en `user_progress`.
 *
 * Reglas de negocio:
 * - Las cuentas con rol `researcher` recorren los módulos en modo demostración.
 *   Aquí se simula el avance, pero no se escribe en la base para no mezclar
 *   sus visitas con las métricas reales del panel de investigación.
 * - El porcentaje global (`progress_percentage`) lo recalcula un trigger de
 *   PostgreSQL. Esta función solo activa la columna booleana del paso.
 *
 * @param columnName Columna de `user_progress` que representa el paso
 *   completado (por ejemplo, `m1_intro` o `m4_closure`).
 * @throws Error de Supabase si la actualización falla.
 */
export const updateProgress = async (columnName: string) => {
  const { data: { user } } = await supabase.auth.getUser();

  // Sin sesión no hay a quién asociar el avance; las rutas protegidas ya
  // deberían haber redirigido al login, así que se ignora silenciosamente.
  if (!user) return;

  // Consulta ligera: solo se necesita el rol para decidir si se persiste.
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // El investigador usa las mismas pantallas para revisar contenidos. No se
  // guarda su avance para mantener limpias las estadísticas de las usuarias.
  if (profile?.role === 'researcher') {
    console.log("Modo Investigador: Progreso no guardado para mantener limpieza de datos.");
    return;
  }

  // La RLS limita la escritura a la fila propia; el filtro por id deja
  // explícita la fila objetivo.
  const { error } = await supabase
    .from('user_progress')
    .update({ [columnName]: true })
    .eq('id', user.id);

  if (error) throw error;
};