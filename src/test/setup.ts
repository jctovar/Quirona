import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Node 26 expone un `localStorage` global experimental que devuelve undefined
// si no se arranca con --localstorage-file, y Vitest no lo sustituye por el de
// jsdom. Instalamos una implementación en memoria equivalente.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length() {
    return this.store.size;
  }

  clear() {
    this.store.clear();
  }

  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string) {
    this.store.delete(key);
  }

  setItem(key: string, value: string) {
    this.store.set(key, String(value));
  }
}

const localStorageMock = new MemoryStorage();
const sessionStorageMock = new MemoryStorage();

for (const [key, storage] of [
  ["localStorage", localStorageMock],
  ["sessionStorage", sessionStorageMock],
] as const) {
  Object.defineProperty(window, key, {
    value: storage,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(globalThis, key, {
    value: storage,
    configurable: true,
    writable: true,
  });
}

// jsdom no implementa matchMedia: lo simulamos para los hooks de responsive.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});
