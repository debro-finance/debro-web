import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const appDir = path.join(process.cwd(), "src", "app");

describe("favicon assets", () => {
  it("ships a multi-size ICO fallback generated from the official monogram", () => {
    const ico = readFileSync(path.join(appDir, "favicon.ico"));

    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(ico.readUInt16LE(4)).toBe(3);

    const sizes = Array.from({ length: 3 }, (_, index) =>
      ico.readUInt8(6 + index * 16),
    );
    expect(sizes).toEqual([16, 32, 48]);
  });

  it("keeps the served SVG icon on the approved navy monogram geometry", () => {
    const svg = readFileSync(path.join(appDir, "icon.svg"), "utf8");
    const original = readFileSync(
      path.join(process.cwd(), "public", "branding", "debro-icon.svg"),
      "utf8",
    );
    const pathData = (source: string) => source.match(/ d="([^"]+)"/)?.[1];

    expect(svg).toContain('viewBox="0 0 1024 1024"');
    expect(svg).toContain('fill="#141B3D"');
    expect(pathData(svg)).toBe(pathData(original));
    expect(pathData(svg)?.length).toBeGreaterThan(1000);
  });
});
