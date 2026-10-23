import { expect, test } from "@playwright/test";
import {
  createAdminClient,
  findUserByEmail,
  isE2EConfigured,
} from "./support/supabase-admin";

const email = process.env.E2E_USER_EMAIL;
const password = process.env.E2E_USER_PASSWORD;

test.describe("flujo autenticado", () => {
  test.skip(
    !isE2EConfigured(),
    "Requiere SUPABASE_SERVICE_ROLE_KEY, E2E_USER_EMAIL y E2E_USER_PASSWORD",
  );

  test("login real y persistencia de progreso en el módulo 1", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel("Correo electrónico").fill(email!);
    await page.getByLabel("Contraseña").fill(password!);
    await page.locator('form button[type="submit"]').click();

    await expect(page).toHaveURL(/\/initial-question$/, { timeout: 15_000 });
    await expect(
      page.getByRole("heading", { name: "Menú de tests" }),
    ).toBeVisible();

    // La introducción del módulo 1 guarda la respuesta y actualiza user_progress.
    await page.goto("/module-1-intro");
    await expect(
      page.getByRole("heading", { name: "Introducción", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: /Continuar con la siguiente sección/ })
      .click();
    await expect(page).toHaveURL(/\/module-1-quiz$/, { timeout: 15_000 });

    const admin = createAdminClient();
    const user = await findUserByEmail(admin, email!);
    expect(user, "El usuario de prueba debe existir").not.toBeNull();

    const { data: progress, error: progressError } = await admin
      .from("user_progress")
      .select("m1_intro")
      .eq("id", user!.id)
      .single();
    if (progressError) throw progressError;
    expect(progress?.m1_intro).toBe(true);

    const { data: response, error: responseError } = await admin
      .from("module_1_responses")
      .select("id")
      .eq("id", user!.id)
      .maybeSingle();
    if (responseError) throw responseError;
    expect(response, "Debe existir la respuesta del módulo 1").not.toBeNull();

    await page.goto("/dashboard");
    await expect(page.getByText("¡Hola, E2E Playwright!")).toBeVisible();
  });
});
