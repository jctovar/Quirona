import { beforeEach, describe, expect, it } from "vitest";
import {
  loadTestProgress,
  markTestCompleted,
  saveTestProgress,
} from "@/lib/testProgress";

const STORAGE_KEY = "quironaTestProgress";

describe("testProgress", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("loadTestProgress", () => {
    it("devuelve un objeto vacío cuando no hay progreso guardado", () => {
      expect(loadTestProgress()).toEqual({});
    });

    it("devuelve el progreso guardado", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ "initial-test": true, anxiety: false }),
      );

      expect(loadTestProgress()).toEqual({
        "initial-test": true,
        anxiety: false,
      });
    });

    it("devuelve un objeto vacío si el JSON está corrupto", () => {
      localStorage.setItem(STORAGE_KEY, "{no-es-json");

      expect(loadTestProgress()).toEqual({});
    });
  });

  describe("saveTestProgress", () => {
    it("serializa el progreso en localStorage", () => {
      saveTestProgress({ "initial-test": true });

      expect(localStorage.getItem(STORAGE_KEY)).toBe(
        JSON.stringify({ "initial-test": true }),
      );
    });

    it("sobrescribe el progreso anterior", () => {
      saveTestProgress({ "initial-test": true });
      saveTestProgress({ anxiety: true });

      expect(loadTestProgress()).toEqual({ anxiety: true });
    });
  });

  describe("markTestCompleted", () => {
    it("marca un test como completado", () => {
      markTestCompleted("initial-test");

      expect(loadTestProgress()).toEqual({ "initial-test": true });
    });

    it("conserva los tests ya completados", () => {
      saveTestProgress({ "initial-test": true });

      markTestCompleted("anxiety");

      expect(loadTestProgress()).toEqual({
        "initial-test": true,
        anxiety: true,
      });
    });

    it("se recupera de un localStorage corrupto", () => {
      localStorage.setItem(STORAGE_KEY, "###");

      markTestCompleted("semantic-network");

      expect(loadTestProgress()).toEqual({ "semantic-network": true });
    });
  });
});
