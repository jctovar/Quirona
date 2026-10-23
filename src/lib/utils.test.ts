import { describe, expect, it } from "vitest";
import { cn, getErrorMessage } from "@/lib/utils";

describe("cn", () => {
  it("concatena clases", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("ignora valores falsy", () => {
    expect(cn("px-2", false, null, undefined, "", "py-1")).toBe("px-2 py-1");
  });

  it("resuelve conflictos de Tailwind quedándose con la última clase", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("soporta objetos y arreglos", () => {
    expect(cn(["px-2", "py-1"], { "font-bold": true, hidden: false })).toBe(
      "px-2 py-1 font-bold",
    );
  });

  it("devuelve cadena vacía sin argumentos", () => {
    expect(cn()).toBe("");
  });
});

describe("getErrorMessage", () => {
  it("extrae el mensaje de una instancia de Error", () => {
    expect(getErrorMessage(new Error("falló la red"))).toBe("falló la red");
  });

  it("extrae el mensaje de errores tipo Supabase", () => {
    expect(getErrorMessage({ message: "credenciales inválidas" })).toBe(
      "credenciales inválidas",
    );
  });

  it("acepta cadenas y usa el fallback cuando no hay mensaje", () => {
    expect(getErrorMessage("error de texto")).toBe("error de texto");
    expect(getErrorMessage(null)).toBe("Error desconocido");
    expect(getErrorMessage({}, "Error personalizado")).toBe("Error personalizado");
  });
});
