import { fireEvent, render, screen } from "@testing-library/react";
import { BookOpen } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import { ModuleCard } from "@/components/ModuleCard";

describe("ModuleCard", () => {
  it("muestra título, descripción y autoría", () => {
    render(
      <ModuleCard
        title="Ginecología preventiva"
        description="Contenido del módulo"
        author="Javier Darío Ríos Castillo"
        icon={BookOpen}
        onClick={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Ginecología preventiva" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Contenido del módulo")).toBeInTheDocument();
    expect(
      screen.getByText("Autor principal: Javier Darío Ríos Castillo"),
    ).toBeInTheDocument();
  });

  it("omite la autoría cuando no se proporciona", () => {
    render(
      <ModuleCard
        title="Módulo sin autor"
        description="Descripción"
        icon={BookOpen}
        onClick={() => {}}
      />,
    );

    expect(screen.queryByText(/Autor principal/)).not.toBeInTheDocument();
  });

  it("ejecuta onClick al pulsar el botón", () => {
    const onClick = vi.fn();

    render(
      <ModuleCard
        title="Módulo"
        description="Descripción"
        icon={BookOpen}
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Comenzar módulo" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
