import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind resolviendo conflictos.
 *
 * `clsx` permite condicionales y `twMerge` conserva la última utilidad de cada
 * familia (por ejemplo, `p-2` + `p-4` termina en `p-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extrae un mensaje legible de un error desconocido.
 *
 * Supabase puede devolver `Error`, objetos `{ message }` o cadenas. Los
 * `catch` del proyecto reciben `unknown`, por lo que se normalizan aquí antes
 * de mostrarlos en un toast o registrar el fallo.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Error desconocido",
): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) {
      return message;
    }
  }

  if (typeof error === "string" && error) {
    return error;
  }

  return fallback;
}
