import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getUser: vi.fn(),
  from: vi.fn(),
}));

vi.mock("@/supabaseClient", () => ({
  supabase: {
    auth: { getUser: mocks.getUser },
    from: mocks.from,
  },
}));

import { updateProgress } from "@/lib/progressHelper";

function mockProfile(role: string | null) {
  const single = vi
    .fn()
    .mockResolvedValue({ data: role ? { role } : null, error: null });
  const eq = vi.fn().mockReturnValue({ single });
  const select = vi.fn().mockReturnValue({ eq });
  return { select, eq, single };
}

function mockProgressUpdate(error: unknown = null) {
  const eq = vi.fn().mockResolvedValue({ error });
  const update = vi.fn().mockReturnValue({ eq });
  return { update, eq };
}

describe("updateProgress", () => {
  let profile: ReturnType<typeof mockProfile>;
  let progress: ReturnType<typeof mockProgressUpdate>;

  beforeEach(() => {
    vi.resetAllMocks();
    profile = mockProfile("user");
    progress = mockProgressUpdate();

    mocks.getUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });

    mocks.from.mockImplementation((table: string) => {
      if (table === "profiles") return { select: profile.select };
      if (table === "user_progress") return { update: progress.update };
      throw new Error(`Tabla inesperada: ${table}`);
    });
  });

  it("no hace nada si no hay sesión", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: null } });

    await updateProgress("m1_closure");

    expect(mocks.from).not.toHaveBeenCalled();
  });

  it("no guarda progreso cuando el rol es researcher", async () => {
    profile = mockProfile("researcher");
    mocks.from.mockImplementation((table: string) => {
      if (table === "profiles") return { select: profile.select };
      return { update: progress.update };
    });
    const log = vi.spyOn(console, "log").mockImplementation(() => {});

    await updateProgress("m1_closure");

    expect(progress.update).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalled();

    log.mockRestore();
  });

  it("actualiza la columna indicada para la usuaria", async () => {
    await updateProgress("m1_closure");

    expect(progress.update).toHaveBeenCalledWith({ m1_closure: true });
    expect(progress.eq).toHaveBeenCalledWith("id", "user-123");
  });

  it("consulta el rol del usuario autenticado", async () => {
    await updateProgress("m2_quiz1");

    expect(mocks.from).toHaveBeenCalledWith("profiles");
    expect(profile.select).toHaveBeenCalledWith("role");
    expect(profile.eq).toHaveBeenCalledWith("id", "user-123");
  });

  it("propaga el error de Supabase", async () => {
    progress = mockProgressUpdate({ message: "boom" });
    mocks.from.mockImplementation((table: string) => {
      if (table === "profiles") return { select: profile.select };
      return { update: progress.update };
    });

    await expect(updateProgress("m1_closure")).rejects.toEqual({
      message: "boom",
    });
  });
});
