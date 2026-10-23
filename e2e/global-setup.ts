import {
  createAdminClient,
  deleteTestUser,
  findUserByEmail,
  getE2EConfig,
  getResearcherEmail,
  isE2EConfigured,
} from "./support/supabase-admin";
import type { AdminClient } from "./support/supabase-admin";

interface TestAccount {
  email: string;
  password: string;
  username: string;
  role: "user" | "researcher";
}

async function provisionUser(
  admin: AdminClient,
  { email, password, username, role }: TestAccount,
) {
  const existing = await findUserByEmail(admin, email);
  if (existing) {
    await deleteTestUser(admin, existing.id);
  }

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

  const { error: progressError } = await admin
    .from("user_progress")
    .upsert({ id: data.user.id });
  if (progressError) throw progressError;

  if (role === "researcher") {
    const { error: roleError } = await admin
      .from("profiles")
      .update({ role: "researcher" })
      .eq("id", data.user.id);
    if (roleError) throw roleError;
  }

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

export default async function globalSetup() {
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
