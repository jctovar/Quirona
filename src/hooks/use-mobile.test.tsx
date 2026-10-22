import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useIsMobile } from "@/hooks/use-mobile";

let listeners: Array<() => void> = [];
let removeEventListener: ReturnType<typeof vi.fn>;

function setViewport(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
}

beforeEach(() => {
  listeners = [];
  removeEventListener = vi.fn();

  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: (_event: string, callback: () => void) => {
      listeners.push(callback);
    },
    removeEventListener,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
});

describe("useIsMobile", () => {
  it("detecta viewport móvil", () => {
    setViewport(500);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("detecta viewport de escritorio", () => {
    setViewport(1280);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("reacciona al cambio de tamaño", () => {
    setViewport(1280);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    setViewport(480);
    act(() => {
      listeners.forEach((callback) => callback());
    });

    expect(result.current).toBe(true);
  });

  it("elimina el listener al desmontar", () => {
    setViewport(800);

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });
});
