import { expect, test } from "@playwright/test";

test.describe("páginas públicas", () => {
  test("la portada carga con su mensaje principal", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /Te damos la bienvenida a Quirona UNAM/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByText(/Educación en salud ginecológica/i).first(),
    ).toBeVisible();
  });

  test("el login valida los campos vacíos", async ({ page }) => {
    await page.goto("/login");

    await expect(
      page.getByText("Bienvenida de nuevo", { exact: true }),
    ).toBeVisible();

    await page.locator('form button[type="submit"]').click();

    await expect(
      page.getByText("Por favor ingresa tu correo y contraseña."),
    ).toBeVisible();
  });

  test("el registro avanza de la selección al video", async ({ page }) => {
    await page.goto("/register");

    await expect(
      page.getByText("Registro a nuestra plataforma de programas"),
    ).toBeVisible();

    await page
      .getByRole("button", { name: /Prevención de Violencia Ginecológica/ })
      .click();

    await expect(page.getByText("Bienvenida a Quirona UNAM")).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: /He visto el video, continuar con el registro/,
      }),
    ).toBeVisible();
  });

  test("la navegación pública cambia de ruta", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", { name: "¿Quiénes somos?" })
      .first()
      .click();

    await expect(page).toHaveURL(/\/quienes-somos$/);
  });
});
