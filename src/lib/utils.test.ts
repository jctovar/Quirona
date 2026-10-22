import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

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
