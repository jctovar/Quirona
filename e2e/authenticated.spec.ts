import fs from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import {
  createAdminClient,
  findUserByEmail,
  getE2EConfig,
  getResearcherEmail,
  isE2EConfigured,
} from "./support/supabase-admin";

const FULL_PROGRESS = {
  m1_story: true,
  m1_intro: true,
  m1_quiz: true,
  m1_visit: true,
  m1_game: true,
  m1_feedback: true,
  m1_closure: true,
  m2_story: true,
  m2_intro: true,
  m2_quiz1: true,
  m2_visit: true,
  m2_game: true,
  m2_feedback: true,
  m2_quiz2: true,
  m2_closure: true,
  m3_story: true,
  m3_intro: true,
  m3_quiz: true,
  m3_visit: true,
  m3_representation: true,
  m3_game: true,
  m3_feedback: true,
  m3_closure: true,
  m4_story: true,
  m4_intro: true,
  m4_quiz: true,
  m4_visit: true,
  m4_game: true,
  m4_feedback: true,
  m4_closure: true,
};

async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.locator('form button[type="submit"]').click();
}

async function completeInitialTest(page: Page) {
  await page.locator("#gen-mujer").click();
  await page.locator("#sexo-mujer").click();
  await page.locator("#ori-heterosexual").click();

  await page.locator("#estado").click();
  await page
    .getByRole("option", { name: "Ciudad de México", exact: true })
    .click();

  await page.locator('[id="est-Universidad"]').click();
  await page.locator('[id="tras-Latinoamericana"]').click();
  await page.locator('[id="afro-No"]').click();
  await page.locator('[id="ind-No"]').click();
  await page.locator('[id="lengua-No"]').click();
  await page.locator('[id="jefe-Licenciatura Completa"]').click();
  await page.locator('[id="bano-1"]').click();
  await page.locator('[id="auto-1"]').click();
  await page.locator('[id="int-Sí tiene"]').click();
  await page.locator('[id="trab-1"]').click();
  await page.locator('[id="cuart-2"]').click();
  await page.locator('[id="gine-No"]').click();
  await page.locator('[id="esalud-No"]').click();

  await page.getByRole("button", { name: "Pasar al siguiente test" }).click();
}

test.describe.configure({ mode: "serial" });

test.describe("flujo autenticado", () => {
  test.skip(
    !isE2EConfigured(),
    "Requiere SUPABASE_SERVICE_ROLE_KEY, E2E_USER_EMAIL y E2E_USER_PASSWORD",
  );

  test("login, test inicial y avance del módulo 1", async ({ page }) => {
    const { email, password } = getE2EConfig();
    const admin = createAdminClient();
    const user = await findUserByEmail(admin, email);
    expect(user, "El usuario de prueba debe existir").not.toBeNull();

    await login(page, email, password);
    await expect(page).toHaveURL(/\/initial-question$/, { timeout: 15_000 });
    await expect(
      page.getByRole("heading", { name: "Menú de tests" }),
    ).toBeVisible();

    // Test inicial: formulario largo con radios, slider y select.
    await page.getByRole("button", { name: "Iniciar", exact: true }).first().click();
    await expect(page).toHaveURL(/\/initial-test$/);
    await completeInitialTest(page);
    await expect(page).toHaveURL(/\/semantic-network-test$/, {
      timeout: 15_000,
    });

    const { data: initialTest, error: initialError } = await admin
      .from("initial_test_responses")
      .select("is_completed, genero, estado")
      .eq("id", user!.id)
      .single();
    if (initialError) throw initialError;
    expect(initialTest?.is_completed).toBe(true);
    expect(initialTest?.genero).toBe("mujer");
    expect(initialTest?.estado).toBe("Ciudad de México");

    // Módulo 1: introducción + quiz.
    await page.goto("/module-1-intro");
    await page
      .getByRole("button", { name: /Continuar con la siguiente sección/ })
      .click();
    await expect(page).toHaveURL(/\/module-1-quiz$/, { timeout: 15_000 });

    const trueOptions = page.locator('[id^="q"][id$="-v"]');
    const questionCount = await trueOptions.count();
    expect(questionCount).toBeGreaterThan(0);

    for (let i = 0; i < questionCount; i++) {
      await trueOptions.nth(i).click();
    }

    await page.getByRole("button", { name: "Enviar respuestas" }).click();
    await expect(
      page.getByText("¡Gracias por tus respuestas!"),
    ).toBeVisible({ timeout: 15_000 });
    await page
      .getByRole("button", { name: "Continuar a la siguiente sección" })
      .click();
    await expect(page).toHaveURL(/\/module-1-visit$/);

    // Visit: marcar un par de puntos y continuar.
    await page.locator("#known-0").click();
    await page.locator("#known-1").click();
    await page
      .getByRole("button", { name: /Continuar con la siguiente sección/ })
      .click();
    await expect(page).toHaveURL(/\/module-1-game$/);

    // Juego: descartar todas las frases para terminar la ronda.
    await page.getByRole("button", { name: /¡Comenzar!/ }).click();
    for (let i = 0; i < 20; i++) {
      const discard = page
        .getByRole("button", { name: "Descartar" })
        .first();
      if (!(await discard.isVisible().catch(() => false))) break;
      await discard.click();
    }
    await expect(page.getByText("¡Tiempo terminado!")).toBeVisible();
    await page
      .getByRole("button", { name: "Ver mi retroalimentación" })
      .click();
    await expect(page).toHaveURL(/\/module-1-feedback$/);

    // Retroalimentación y cierre con respuestas abiertas.
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect(page).toHaveURL(/\/module-1-closure$/);

    const reflections = page.getByPlaceholder("Escribe tu respuesta aquí...");
    await reflections.nth(0).fill("Un miedo que resolví gracias al módulo.");
    await reflections.nth(1).fill("Una creencia que escuché sobre la consulta.");
    await reflections.nth(2).fill("Le compartiría la importancia de preguntar.");
    await page.getByRole("button", { name: "Continuar", exact: true }).click();

    const nextStoryPage = page.getByRole("button", {
      name: "Siguiente",
      exact: true,
    });
    for (let i = 0; i < 30; i++) {
      if (!(await nextStoryPage.isEnabled().catch(() => false))) break;
      await nextStoryPage.click();
    }

    await page.getByRole("button", { name: "Finalizar Módulo 1" }).click();
    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 15_000 });

    const { data: progress, error: progressError } = await admin
      .from("user_progress")
      .select(
        "m1_intro, m1_quiz, m1_visit, m1_game, m1_feedback, m1_closure, progress_percentage",
      )
      .eq("id", user!.id)
      .single();
    if (progressError) throw progressError;
    expect(progress).toMatchObject({
      m1_intro: true,
      m1_quiz: true,
      m1_visit: true,
      m1_game: true,
      m1_feedback: true,
      m1_closure: true,
    });
    expect(progress?.progress_percentage).toBeGreaterThan(0);

    const { data: responses, error: responsesError } = await admin
      .from("module_1_responses")
      .select(
        "intro_phrases, quiz_answers, visit_answers, game_score, closure_answers",
      )
      .eq("id", user!.id)
      .single();
    if (responsesError) throw responsesError;
    expect(responses?.intro_phrases).toBeTruthy();
    expect(responses?.quiz_answers).toBeTruthy();
    expect(responses?.visit_answers).toBeTruthy();
    expect(responses?.game_score).toBeGreaterThanOrEqual(0);
    expect(responses?.closure_answers).toBeTruthy();

    // Datos sembrados para verificar el progreso completo y el panel de
    // investigación sin recorrer los cuatro módulos por UI.
    const { error: seedError } = await admin
      .from("user_progress")
      .update(FULL_PROGRESS)
      .eq("id", user!.id);
    if (seedError) throw seedError;

    const { data: seeded, error: seededError } = await admin
      .from("user_progress")
      .select("progress_percentage")
      .eq("id", user!.id)
      .single();
    if (seededError) throw seededError;
    expect(seeded?.progress_percentage).toBe(100);

    await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: "¡Hola, E2E Playwright!" }),
    ).toBeVisible();
    await expect(page.getByText("100%", { exact: true })).toBeVisible();
    await expect(
      page.getByText("¡Felicidades! Has completado todos los módulos."),
    ).toBeVisible();
  });

  test("el panel de investigación lista usuarias y exporta el CSV", async ({
    page,
  }) => {
    const { password } = getE2EConfig();
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await login(page, getResearcherEmail(), password);
    await expect(page).toHaveURL(/\/researcher-dashboard$/, {
      timeout: 15_000,
    });
    await expect(
      page.getByRole("heading", { name: "¡Bienvenido, E2E Researcher!" }),
    ).toBeVisible();
    await expect(page.getByText("Usuarias registradas")).toBeVisible();
    await expect(page.getByText("Módulos completados (Suma)")).toBeVisible();
    await expect(page.getByText("E2E Playwright").first()).toBeVisible();

    expect(consoleErrors.join("\n")).not.toMatch(/profiles\.email|42703/);

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: /Descargar reporte Excel/ }).click(),
    ]);

    expect(download.suggestedFilename()).toBe("reporte_investigacion.csv");
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();

    const csv = fs.readFileSync(downloadPath!, "utf8");
    expect(csv).toContain("Nombre,Progreso %");
    expect(csv).toContain("E2E Playwright");
  });
});
