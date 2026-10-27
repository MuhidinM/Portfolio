// The <M/> brand mark, drawn on a 100×100 grid. One source for the favicon,
// the link preview and anything else that draws the logo from code.

type Points = [number, number][];
type Mark = { stroke: number; accent: Points[]; letter: Points };

// A1: the full <M/> mark, for 48px and up.
export const FULL_MARK: Mark = {
  stroke: 7,
  accent: [
    [[16, 38], [6, 50], [16, 62]],
    [[63, 66], [73, 34]],
    [[83, 38], [93, 50], [83, 62]],
  ],
  letter: [[25, 66], [25, 34], [39, 52], [53, 34], [53, 66]],
};

// A2: M/ with heavier strokes, for favicons where five strokes blur together.
export const SMALL_MARK: Mark = {
  stroke: 11,
  accent: [[[70, 72], [84, 28]]],
  letter: [[18, 72], [18, 28], [38, 54], [58, 28], [58, 72]],
};

export const BRAND = {
  tile: "#0b1020",
  ink: "#f4f6ff",
  accent: "#7b8cff",
} as const;

const toPoints = (p: Points) => p.map((xy) => xy.join(",")).join(" ");

export function BrandMark({
  mark = FULL_MARK,
  size,
  tile = false,
  ink = BRAND.ink,
  accent = BRAND.accent,
}: {
  mark?: Mark;
  size: number;
  tile?: boolean;
  ink?: string;
  accent?: string;
}) {
  const line = { fill: "none", strokeWidth: mark.stroke, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {tile && <rect width="100" height="100" rx="22" fill={BRAND.tile} />}
      {mark.accent.map((p, i) => (
        <polyline key={i} points={toPoints(p)} stroke={accent} {...line} />
      ))}
      <polyline points={toPoints(mark.letter)} stroke={ink} {...line} />
    </svg>
  );
}
