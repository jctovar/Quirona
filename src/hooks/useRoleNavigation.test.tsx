import { act, renderHook } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import useRoleNavigation from "@/hooks/useRoleNavigation";

let currentPath = "";

function LocationProbe() {
  const location = useLocation();
  currentPath = location.pathname;
  return null;
}

function renderNavigation(initialPath: string) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[initialPath]}>
      {children}
      <LocationProbe />
    </MemoryRouter>
  );

  return renderHook(() => useRoleNavigation(), { wrapper });
}

describe("useRoleNavigation", () => {
  beforeEach(() => {
    currentPath = "";
  });

  it("no trata como investigador una ruta de usuaria", () => {
    const { result } = renderNavigation("/dashboard");

    expect(result.current.isResearcher).toBe(false);
  });

  it("detecta las rutas de investigador", () => {
    const { result } = renderNavigation("/researcher/perfilInvestigador");

    expect(result.current.isResearcher).toBe(true);
  });

  it("navega a la ruta indicada en el flujo de usuaria", () => {
    const { result } = renderNavigation("/dashboard");

    act(() => {
      result.current.goTo("/initial-test");
    });

    expect(currentPath).toBe("/initial-test");
  });

  it("antepone /researcher en el flujo de investigador", () => {
    const { result } = renderNavigation("/researcher/perfilInvestigador");

    act(() => {
      result.current.goTo("/module-1");
    });

    expect(currentPath).toBe("/researcher/module-1");
  });
});
