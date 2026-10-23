import {
  createAdminClient,
  deleteTestUser,
  findUserByEmail,
  getE2EConfig,
  isE2EConfigured,
} from "./support/supabase-admin";

export default async function globalTeardown() {
  if (!isE2EConfigured()) return;

  const { email } = getE2EConfig();
  const admin = createAdminClient();
  const user = await findUserByEmail(admin, email);

  if (!user) {
    console.warn(`[e2e] No se encontró el usuario de prueba ${email}`);
    return;
  }

  await deleteTestUser(admin, user.id);
  console.log(`[e2e] Usuario de prueba eliminado: ${email}`);
}
