/**
 * Utilidades de administración para las pruebas E2E.
 *
 * Este archivo se ejecuta únicamente en Node (global setup/teardown y specs),
 * nunca en el bundle del navegador. Por eso puede usar la clave
 * `service_role`: se necesita para crear/eliminar usuarios y sembrar progreso
 * sin pasar por las reglas RLS.
 */
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export type AdminClient = SupabaseClient<Database>;

interface E2EConfig {
  url: string;
  serviceKey: string;
  email: string;
  password: string;
}

/** Lee las variables de entorno sin fallar si falta alguna. */
function readConfig(): Partial<E2EConfig> {
  return {
    url: process.env.VITE_SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    email: process.env.E2E_USER_EMAIL,
    password: process.env.E2E_USER_PASSWORD,
  };
}

/**
 * Indica si hay credenciales suficientes para ejecutar las pruebas
 * autenticadas. Sin ellas, los specs se omiten y el setup no crea usuarios.
 */
export function isE2EConfigured(): boolean {
  const config = readConfig();
  return Boolean(
    config.url && config.serviceKey && config.email && config.password,
  );
}

/** Devuelve la configuración validada o lanza un error explicativo. */
export function getE2EConfig(): E2EConfig {
  const config = readConfig();
  if (!isE2EConfigured()) {
    throw new Error(
      "Faltan VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, E2E_USER_EMAIL o E2E_USER_PASSWORD",
    );
  }
  return config as E2EConfig;
}

/**
 * Deriva el correo del investigador de prueba usando un alias `+researcher`.
 * Si el correo no tiene dominio, añade el sufijo `.researcher`.
 */
export function getResearcherEmail(): string {
  const { email } = getE2EConfig();
  const [localPart, domain] = email.split("@");
  return domain ? `${localPart}+researcher@${domain}` : `${email}.researcher`;
}

/**
 * Crea un cliente con `service_role` y sin persistencia de sesión.
 * Solo debe importarse desde código de pruebas en Node.
 */
export function createAdminClient(): AdminClient {
  const { url, serviceKey } = getE2EConfig();
  return createClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Busca una cuenta por correo en la primera página de Auth.
 * El proyecto de pruebas tiene pocos usuarios, así que 1000 es suficiente.
 */
export async function findUserByEmail(
  admin: AdminClient,
  email: string,
) {
  const { data, error } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (error) throw error;

  return (
    data.users.find(
      (user) => user.email?.toLowerCase() === email.toLowerCase(),
    ) ?? null
  );
}

/**
 * Elimina un usuario de prueba y sus datos dependientes.
 *
 * Estas tablas referencian `auth.users` sin `ON DELETE CASCADE`, así que hay
 * que vaciarlas antes de borrar la cuenta de Auth. `user_progress` y
 * `profiles` sí se limpian por cascada/trigger.
 */
export async function deleteTestUser(
  admin: AdminClient,
  userId: string,
): Promise<void> {
  const cleanups = [
    admin.from("apoi_test").delete().eq("user_id", userId),
    admin.from("test_sus_responses").delete().eq("id", userId),
    admin.from("test_usability_responses").delete().eq("id", userId),
  ];

  for (const cleanup of cleanups) {
    const { error } = await cleanup;
    if (error) {
      throw new Error(`No se pudieron limpiar los datos E2E: ${error.message}`);
    }
  }

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) throw error;
}
