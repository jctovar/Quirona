import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TestMenu } from "@/components/TestMenu";

const TEST_IDS = [
  "initial-test",
  "semantic-network",
  "anxiety",
  "assertiveness",
  "adverse-experiences",
  "general-health",
];

let currentPath = "";

function LocationProbe() {
  const location = useLocation();
  currentPath = location.pathname;
  return null;
}

function renderMenu(initialPath = "/pre-education", props = {}) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <TestMenu {...props} />
      <LocationProbe />
    </MemoryRouter>,
  );
}

function saveProgress(ids: string[]) {
  const progress = Object.fromEntries(ids.map((id) => [id, true]));
  localStorage.setItem("quironaTestProgress", JSON.stringify(progress));
}

describe("TestMenu", () => {
  beforeEach(() => {
    currentPath = "";
    localStorage.clear();
  });

  it("muestra los seis tests como pendientes sin progreso", () => {
    renderMenu();

    expect(screen.getAllByRole("button", { name: "Iniciar" })).toHaveLength(6);
    expect(screen.getAllByText("Pendiente")).toHaveLength(6);
    expect(screen.queryByText("Completado")).not.toBeInTheDocument();
  });

  it("marca como completados los tests guardados", () => {
    saveProgress(["initial-test", "anxiety"]);

    renderMenu();

    expect(screen.getAllByText("Completado")).toHaveLength(2);
    expect(screen.getAllByText("Pendiente")).toHaveLength(4);
  });

  it("bloquea el acceso a módulos hasta completar todos los tests", () => {
    saveProgress(TEST_IDS.slice(0, 5));

    renderMenu();

    expect(
      screen.getByRole("button", { name: "¡Todo listo! Ir a los módulos" }),
    ).toBeDisabled();
    expect(
      screen.getByText(/Completa todos los tests/i),
    ).toBeInTheDocument();
  });

  it("habilita el acceso a módulos con todos los tests completados", () => {
    saveProgress(TEST_IDS);

    renderMenu();

    expect(
      screen.getByRole("button", { name: "¡Todo listo! Ir a los módulos" }),
    ).toBeEnabled();
    expect(
      screen.queryByText(/Completa todos los tests/i),
    ).not.toBeInTheDocument();
  });

  it("navega al test seleccionado", () => {
    renderMenu();

    fireEvent.click(screen.getAllByRole("button", { name: "Iniciar" })[1]);

    expect(currentPath).toBe("/semantic-network-test");
  });

  it("llama a onStart al repetir el test actual sin navegar", () => {
    const onStart = vi.fn();

    renderMenu("/initial-test", { currentTest: "initial-test", onStart });
    fireEvent.click(screen.getAllByRole("button", { name: "Iniciar" })[0]);

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(currentPath).toBe("/initial-test");
  });

  it("navega al dashboard desde el botón final", () => {
    saveProgress(TEST_IDS);

    renderMenu();
    fireEvent.click(
      screen.getByRole("button", { name: "¡Todo listo! Ir a los módulos" }),
    );

    expect(currentPath).toBe("/dashboard");
  });
});
