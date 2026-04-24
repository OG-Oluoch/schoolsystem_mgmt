import { DS } from "@/styles/ds"

export const Table = ({ columns, rows, renderRow }) => (
  <div style={{ background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`, overflow: "hidden" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: DS.bg, borderBottom: `1px solid ${DS.border}` }}>
          {columns.map((col) => (
            <th key={col} style={{
              padding: "12px 20px", textAlign: "left", fontSize: 11,
              fontWeight: 700, color: DS.textMuted,
              textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap",
            }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            style={{ borderBottom: i < rows.length - 1 ? `1px solid ${DS.surfaceAlt}` : "none", transition: "background 0.1s" }}
            onMouseEnter={e => e.currentTarget.style.background = DS.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {renderRow(row, i)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)