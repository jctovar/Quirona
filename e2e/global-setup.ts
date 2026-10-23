import {
  createAdminClient,
  deleteTestUser,
  findUserByEmail,
  getE2EConfig,
  isE2EConfigured,
} from "./support/supabase-admin";

export default async function globalSetup() {
  if (!isE2EConfigured()) {
    console.warn(
      "[e2e] Sin credenciales de Supabase: se omitirán las pruebas autenticadas.",
    );
    return;
  }

  const { email, password } = getE2EConfig();
  const admin = createAdminClient();

  const existing = await findUserByEmail(admin, email);
  if (existing) {
    await deleteTestUser(admin, existing.id);
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      username: "E2E Playwright",
      nationality: "MX",
      tutorEmail1: "tutor.e2e@example.com",
      tutorEmail2: "",
    },
  });

  if (error || !data.user) {
    throw error ?? new Error("No se pudo crear el usuario E2E");
  }

  const { error: progressError } = await admin
    .from("user_progress")
    .upsert({ id: data.user.id });
  if (progressError) throw progressError;

  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("id")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("El trigger no creó el perfil del usuario E2E");
  }

  console.log(`[e2e] Usuario de prueba listo: ${email}`);
}
