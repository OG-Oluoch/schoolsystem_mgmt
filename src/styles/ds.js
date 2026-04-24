// ============================================================
// @/styles/ds
// Design System — Tokens, Palettes & Shared Primitives
// ============================================================

// ── Core Colour Tokens ──────────────────────────────────────
export const DS = {
  // Sidebar
  sidebar:       "#1e1b4b",
  sidebarActive: "#4338ca",
  sidebarText:   "#a5b4fc",

  // Brand / Primary
  primary:       "#4338ca",
  primaryLight:  "#e0e7ff",

  // Semantic
  success:       "#10b981",
  successLight:  "#d1fae5",
  warning:       "#f59e0b",
  warningLight:  "#fef3c7",
  danger:        "#ef4444",
  dangerLight:   "#fee2e2",
  info:          "#3b82f6",
  infoLight:     "#dbeafe",

  // Text
  text:          "#0f172a",
  textSub:       "#64748b",
  textMuted:     "#94a3b8",

  // Structural
  border:        "#e2e8f0",
  surface:       "#ffffff",
  bg:            "#f8fafc",
  surfaceAlt:    "#f1f5f9",
};

// ── Grade Colour Map ────────────────────────────────────────
export const GRADE_COLORS = {
  "Grade 9":  "#4338ca",
  "Grade 10": "#10b981",
  "Grade 11": "#f59e0b",
  "Grade 12": "#ef4444",
};

// ── Card / Course Colour Palettes ───────────────────────────
export const CARD_PALETTES = {
  indigo:  { bar: "#4338ca", bg: "#e0e7ff", text: "#3730a3" },
  emerald: { bar: "#059669", bg: "#d1fae5", text: "#065f46" },
  amber:   { bar: "#d97706", bg: "#fef3c7", text: "#92400e" },
  rose:    { bar: "#e11d48", bg: "#ffe4e6", text: "#9f1239" },
  violet:  { bar: "#7c3aed", bg: "#ede9fe", text: "#5b21b6" },
  sky:     { bar: "#0284c7", bg: "#e0f2fe", text: "#075985" },
  orange:  { bar: "#ea580c", bg: "#ffedd5", text: "#9a3412" },
  teal:    { bar: "#0d9488", bg: "#ccfbf1", text: "#115e59" },
};

// ── Department Colour Map ───────────────────────────────────
export const DEPT_COLORS = {
  STEM:       DS.primary,
  Humanities: DS.success,
  Arts:       DS.warning,
  Sports:     DS.danger,
};

// ── Badge Variant Styles ────────────────────────────────────
export const BADGE_VARIANTS = {
  success: { bg: DS.successLight, color: "#065f46"  },
  warning: { bg: DS.warningLight, color: "#92400e"  },
  danger:  { bg: DS.dangerLight,  color: "#991b1b"  },
  info:    { bg: DS.infoLight,    color: "#1e40af"  },
  default: { bg: DS.surfaceAlt,   color: DS.textSub },
};

// ── Score / GPA Colour Helpers ──────────────────────────────
/** Returns a semantic colour for a 0-100 numeric score. */
export const scoreColor = (score) =>
  score >= 90 ? DS.success
  : score >= 75 ? DS.primary
  : score >= 60 ? DS.warning
  : DS.danger;

/** Returns a semantic colour for a 0-4 GPA value. */
export const gpaColor = (gpa) =>
  gpa >= 3.5 ? DS.success
  : gpa >= 3.0 ? DS.primary
  : gpa >= 2.5 ? DS.warning
  : DS.danger;

/** Maps a letter grade to a Badge variant key. */
export const letterVariant = (letter) =>
  ({ A: "success", B: "info", C: "warning", D: "danger" }[letter] ?? "default");

// ── Typography ──────────────────────────────────────────────
export const FONT_FAMILY =
  "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif";