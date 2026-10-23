import {
  createAdminClient,
  deleteTestUser,
  findUserByEmail,
  getE2EConfig,
  getResearcherEmail,
  isE2EConfigured,
} from "./support/supabase-admin";
import type { AdminClient } from "./support/supabase-admin";

/**
 * Provisiona las cuentas E2E antes de la suite.
 *
 * El setup es idempotente: si una cuenta quedó de una ejecución anterior, se
 * elimina y se vuelve a crear. También deja una fila vacía en `user_progress`
 * y, para el investigador, ajusta el rol con service_role (el trigger impide
 * cambiarlo desde el cliente).
 */
interface TestAccount {
  email: string;
  password: string;
  username: string;
  role: "user" | "researcher";
}

/**
 * Crea (o recrea) una cuenta de prueba y verifica que el perfil tenga el rol
 * esperado. Lanza si Auth o la base no confirman la provisión.
 */
async function provisionUser(
  admin: AdminClient,
  { email, password, username, role }: TestAccount,
) {
  // Limpieza previa para que la ejecución sea repetible.
  const existing = await findUserByEmail(admin, email);
  if (existing) {
    await deleteTestUser(admin, existing.id);
  }

  // Los metadatos alimentan el trigger que crea la fila de `profiles`.
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      username,
      nationality: "MX",
      tutorEmail1: "tutor.e2e@example.com",
      tutorEmail2: "",
    },
  });

  if (error || !data.user) {
    throw error ?? new Error(`No se pudo crear el usuario ${email}`);
  }

  // Fila base de progreso: evita tener que crearla desde la UI en cada test.
  const { error: progressError } = await admin
    .from("user_progress")
    .upsert({ id: data.user.id });
  if (progressError) throw progressError;

  // Solo service_role puede elevar el rol; el trigger bloquea al cliente.
  if (role === "researcher") {
    const { error: roleError } = await admin
      .from("profiles")
      .update({ role: "researcher" })
      .eq("id", data.user.id);
    if (roleError) throw roleError;
  }

  // Verificación explícita: si el trigger o el update fallan, el test debe
  // detenerse aquí y no producir fallos confusos más adelante.
  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("id, role")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile || profile.role !== role) {
    throw new Error(`El perfil de ${email} no quedó con rol ${role}`);
  }

  return data.user;
}

/** Punto de entrada de Playwright antes de ejecutar los specs. */
export default async function globalSetup() {
  // Sin secretos, las pruebas públicas siguen corriendo; las autenticadas se
  // omiten mediante `test.skip` en el spec.
  if (!isE2EConfigured()) {
    console.warn(
      "[e2e] Sin credenciales de Supabase: se omitirán las pruebas autenticadas.",
    );
    return;
  }

  const { email, password } = getE2EConfig();
  const admin = createAdminClient();

  await provisionUser(admin, {
    email,
    password,
    username: "E2E Playwright",
    role: "user",
  });

  await provisionUser(admin, {
    email: getResearcherEmail(),
    password,
    username: "E2E Researcher",
    role: "researcher",
  });

  console.log(`[e2e] Usuarios de prueba listos: ${email} y ${getResearcherEmail()}`);
}
