import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import Login from "@/pages/Login";

const mocks = vi.hoisted(() => ({
  signIn: vi.fn(),
  from: vi.fn(),
  onAuthStateChange: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("@/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: mocks.signIn,
      onAuthStateChange: mocks.onAuthStateChange,
      signOut: mocks.signOut,
    },
    from: mocks.from,
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

let currentPath = "";

function LocationProbe() {
  const location = useLocation();
  currentPath = location.pathname;
  return null;
}

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Login />
      <LocationProbe />
    </MemoryRouter>,
  );
}

function mockProfile(role: string | null, error: unknown = null) {
  const single = vi.fn().mockResolvedValue({
    data: role ? { role } : null,
    error,
  });
  const eq = vi.fn().mockReturnValue({ single });
  const select = vi.fn().mockReturnValue({ eq });
  mocks.from.mockReturnValue({ select });
}

function fillCredentials() {
  fireEvent.change(screen.getByLabelText("Correo electrónico"), {
    target: { value: "usuaria@ejemplo.com" },
  });
  fireEvent.change(screen.getByLabelText("Contraseña"), {
    target: { value: "secreto123" },
  });
}

function submit() {
  const button = screen
    .getAllByRole("button", { name: "Iniciar sesión" })
    .find((element) => element.getAttribute("type") === "submit");

  if (!button) throw new Error("No se encontró el botón de envío");

  fireEvent.click(button);
}

describe("Login", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    currentPath = "";

    mocks.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  it("valida que correo y contraseña estén presentes", () => {
    renderLogin();

    submit();

    expect(toast.error).toHaveBeenCalledWith(
      "Por favor ingresa tu correo y contraseña.",
    );
    expect(mocks.signIn).not.toHaveBeenCalled();
  });

  it("informa credenciales inválidas sin consultar el perfil", async () => {
    mocks.signIn.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: "Invalid login credentials" },
    });

    renderLogin();
    fillCredentials();
    submit();

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "El correo o la contraseña son incorrectos.",
      ),
    );
    expect(mocks.from).not.toHaveBeenCalled();
    expect(currentPath).toBe("/login");
  });

  it("informa cuando el correo no está confirmado", async () => {
    mocks.signIn.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: "Email not confirmed" },
    });

    renderLogin();
    fillCredentials();
    submit();

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Por favor, confirma tu correo electrónico para poder entrar.",
      ),
    );
  });

  it("envía a la usuaria al cuestionario inicial", async () => {
    mocks.signIn.mockResolvedValue({
      data: { user: { id: "user-1" }, session: {} },
      error: null,
    });
    mockProfile("user");

    renderLogin();
    fillCredentials();
    submit();

    expect(mocks.signIn).toHaveBeenCalledWith({
      email: "usuaria@ejemplo.com",
      password: "secreto123",
    });

    await waitFor(
      () => expect(currentPath).toBe("/initial-question"),
      { timeout: 2500 },
    );
    expect(toast.success).toHaveBeenCalledWith(
      "¡Bienvenida de nuevo a QUIRONA!",
    );
  });

  it("envía al panel de investigación cuando el rol es researcher", async () => {
    mocks.signIn.mockResolvedValue({
      data: { user: { id: "researcher-1" }, session: {} },
      error: null,
    });
    mockProfile("researcher");

    renderLogin();
    fillCredentials();
    submit();

    await waitFor(
      () => expect(currentPath).toBe("/researcher-dashboard"),
      { timeout: 2500 },
    );
    expect(toast.success).toHaveBeenCalledWith(
      "¡Bienvenido al panel de investigación!",
    );
  });

  it("cae al flujo de usuaria si no puede leer el perfil", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mocks.signIn.mockResolvedValue({
      data: { user: { id: "user-1" }, session: {} },
      error: null,
    });
    mockProfile(null, { message: "perfil no disponible" });

    renderLogin();
    fillCredentials();
    submit();

    await waitFor(() => expect(currentPath).toBe("/initial-question"));
    expect(consoleError).toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
