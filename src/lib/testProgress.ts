/**
 * Progreso local de los tests iniciales.
 *
 * Se guarda en `localStorage` para que el menú de tests recuerde qué
 * cuestionarios se completaron en este navegador. Es una ayuda de navegación:
 * la fuente de verdad del avance del programa sigue siendo `user_progress` en
 * Supabase.
 */
const STORAGE_KEY = "quironaTestProgress";

/**
 * Lee el mapa de tests completados.
 *
 * Si el navegador bloquea el almacenamiento o el JSON guardado está corrupto,
 * se devuelve un objeto vacío para no romper el menú.
 */
export const loadTestProgress = (): Record<string, boolean> => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? (JSON.parse(item) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
};

/** Persiste el mapa completo de tests completados. */
export const saveTestProgress = (progress: Record<string, boolean>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

/** Añade un test al mapa local sin alterar el resto de resultados. */
export const markTestCompleted = (testId: string) => {
  const progress = loadTestProgress();
  progress[testId] = true;
  saveTestProgress(progress);
};
