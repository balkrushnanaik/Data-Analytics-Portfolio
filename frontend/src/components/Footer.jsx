import { motion } from "framer-motion";

const QUICK_LINKS = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Contact",
];
const SOCIAL = [
  { label: "GitHub", href: "https://github.com/balkrushnanaik" },
  { label: "LinkedIn", href: "https://linkedin.com/in/balkrushna02" },
  { label: "Email", href: "mailto:balkrushnanaik07@gmail.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const navTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-16 pb-8 mt-8"
      style={{
        borderTop: "1px solid rgba(0,212,255,0.1)",
        background: "rgba(5,8,22,0.8)",
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(0,212,255,0.5), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div
              className="font-orbitron text-2xl font-bold mb-3"
              style={{ color: "var(--neon-blue)" }}
            >
              BN<span style={{ color: "var(--neon-purple)" }}>.</span>
            </div>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)", maxWidth: 280 }}
            >
              Transforming Raw Data into Actionable Business Insights. Data
              Analyst | Python | SQL | Power BI.
            </p>
            <p
              className="font-mono-code text-xs"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              SPPU · Pune, Maharashtra, India
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-orbitron text-xs font-bold mb-4"
              style={{
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.15em",
              }}
            >
              QUICK LINKS
            </h4>
            <ul className="space-y-2 list-none">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => navTo(link)}
                    className="text-sm transition-all duration-200"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "var(--neon-blue)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(255,255,255,0.45)")
                    }
                  >
                    › {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="font-orbitron text-xs font-bold mb-4"
              style={{
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.15em",
              }}
            >
              CONNECT
            </h4>
            <ul className="space-y-2 list-none">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-all duration-200"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "var(--neon-blue)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(255,255,255,0.45)")
                    }
                  >
                    › {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="font-mono-code text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            © {year} Balkrushna Naik. All rights reserved.
          </p>
          <p
            className="font-mono-code text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Made with ❤️ and ☕ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
