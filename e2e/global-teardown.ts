import {
  createAdminClient,
  deleteTestUser,
  findUserByEmail,
  getE2EConfig,
  getResearcherEmail,
  isE2EConfigured,
} from "./support/supabase-admin";

export default async function globalTeardown() {
  if (!isE2EConfigured()) return;

  const { email } = getE2EConfig();
  const accounts = [email, getResearcherEmail()];
  const admin = createAdminClient();

  for (const account of accounts) {
    const user = await findUserByEmail(admin, account);

    if (!user) {
      console.warn(`[e2e] No se encontró el usuario de prueba ${account}`);
      continue;
    }

    await deleteTestUser(admin, user.id);
    console.log(`[e2e] Usuario de prueba eliminado: ${account}`);
  }
}
