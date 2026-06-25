import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Project data ──
const projects = [
  {
    id: 1,
    title: "ESPN Cricket Analytics Dashboard",
    description:
      "Analyzed batting, bowling, and fielding performance metrics using cricket datasets. Includes data cleaning, transformation, player comparison, and match-winning insights.",
    tags: ["Python", "Pandas", "Power BI", "Analytics"],
    tech: ["Python", "Pandas", "Power BI", "DAX"],
    category: ["Python", "Power BI", "Analytics"],
    github:
      "https://github.com/balkrushnanaik/Power-BI-Dashboard-Projects/tree/main/ESPN%20Cricket%20Data%20Analysis%20Project%201",
    demo: "#",
    gradient: "from-blue-600 to-cyan-400",
    icon: "🏏",
    color: "#00D4FF",
  },
  {
    id: 2,
    title: "Panic Attacks Data Analysis",
    description:
      "Built an end-to-end analytics solution for panic attack data by integrating SQL, Snowflake, Excel, AWS, Power Query, and Power BI to clean, analyze, and visualize patient trends, risk factors, and key mental health insights.",
    tags: ["SQL", "Snowflake", "Power BI", "AWS", "Analytics"],

    tech: ["SQL", "Snowflake", "Power BI", "Power Query", "Excel", "AWS"],

    category: [
      "Data Analytics",
      "Business Intelligence",
      "Healthcare Analytics",
    ],
    github: "https://github.com/balkrushnanaik/Power-BI-Dashboard-Projects/tree/main/Panic%20Attacks%20Data%20Analysis%20Project%202",
    demo: "#",
    gradient: "from-purple-600 to-pink-500",
    icon: "😥",
    color: "#8B5CF6",
  },
  {
    id: 3,
    title: "Python Diwali Sales Analysis",
    description:
      "Analyzed Diwali sales data using Python (Pandas, NumPy, Matplotlib, and Seaborn) for data cleaning and EDA.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    category: ["Python", "Data Analysis"],
    github:
      "https://github.com/balkrushnanaik/Python-Projects/tree/main/Diwali%20Sales%20Data%20Analysis%20Project%201",
    demo: "#",
    gradient: "from-green-500 to-teal-400",
    icon: "💹",
    color: "#06FFA5",
  },
  {
    id: 4,
    title: "Customer Segmentation Analysis",
    description:
      "ML-driven customer segmentation using K-Means clustering. Identified key customer personas for targeted marketing with behavioral analytics and RFM scoring.",
    tags: ["Python", "Machine Learning", "Analytics"],
    tech: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
    category: ["Python", "Analytics"],
    github: "https://github.com/balkrushnanaik",
    demo: "#",
    gradient: "from-orange-500 to-red-500",
    icon: "👥",
    color: "#FF6B35",
  },
  {
    id: 5,
    title: "Netflix Data Analysis",
    description:
      "Exploratory data analysis of Netflix catalog — content trends, genre distribution, release patterns, country-wise analysis with Matplotlib and Seaborn visualizations.",
    tags: ["Python", "Analytics"],
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    category: ["Python", "Analytics"],
    github: "https://github.com/balkrushnanaik",
    demo: "#",
    gradient: "from-red-600 to-red-900",
    icon: "🎬",
    color: "#E50914",
  },
  {
    id: 6,
    title: "Banking Data Analysis",
    description:
      "SQL-powered banking transaction analysis covering fraud detection patterns, customer behavior, account activity trends and loan default risk assessment.",
    tags: ["Python", "SQL", "Analytics"],
    tech: ["Python", "SQL", "MySQL", "Pandas"],
    category: ["Python", "SQL", "Analytics"],
    github: "https://github.com/balkrushnanaik",
    demo: "#",
    gradient: "from-yellow-500 to-amber-400",
    icon: "🏦",
    color: "#F59E0B",
  },
  {
    id: 7,
    title: "Student Performance Analysis",
    description:
      "Academic performance analytics system tracking student scores, attendance, subject-wise trends, and dropout risk indicators with Power BI interactive reports.",
    tags: ["Python", "Power BI", "Analytics"],
    tech: ["Python", "Power BI", "Pandas"],
    category: ["Python", "Power BI", "Analytics"],
    github: "https://github.com/balkrushnanaik",
    demo: "#",
    gradient: "from-indigo-500 to-blue-400",
    icon: "🎓",
    color: "#6366F1",
  },
  {
    id: 8,
    title: "E-Commerce Sales Dashboard",
    description:
      "Comprehensive e-commerce analytics covering revenue metrics, product performance, customer lifetime value, cart abandonment, and seasonal trend analysis.",
    tags: ["Power BI", "Excel", "Analytics"],
    tech: ["Power BI", "Excel", "DAX"],
    category: ["Power BI", "Analytics"],
    github: "https://github.com/balkrushnanaik",
    demo: "#",
    gradient: "from-pink-500 to-rose-400",
    icon: "🛒",
    color: "#EC4899",
  },
  {
    id: 9,
    title: "HR Analytics Dashboard",
    description:
      "Human Resources analytics platform for workforce planning — attrition prediction, headcount trends, department performance, and employee satisfaction KPIs.",
    tags: ["Power BI", "Analytics"],
    tech: ["Power BI", "DAX", "Excel"],
    category: ["Power BI", "Analytics"],
    github: "https://github.com/balkrushnanaik",
    demo: "#",
    gradient: "from-teal-500 to-cyan-400",
    icon: "👔",
    color: "#14B8A6",
  },
  {
    id: 10,
    title: "AI-Powered Business Insights Dashboard",
    description:
      "Full-stack analytics application with a Python Flask API backend, automated data ingestion, NLP-powered insight generation, and Power BI embedded reporting.",
    tags: ["Python", "Power BI", "Analytics"],
    tech: ["Python", "Flask", "Power BI", "SQLite", "React"],
    category: ["Python", "Power BI", "Analytics"],
    github: "https://github.com/balkrushnanaik",
    demo: "#",
    gradient: "from-violet-600 to-purple-400",
    icon: "🤖",
    color: "#A855F7",
    featured: true,
  },
];

const FILTERS = ["All", "Python", "SQL", "Power BI", "Analytics"];

// ── Project Card ──
function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="glass-card overflow-hidden group"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      {/* Card header with gradient */}
      <div
        className={`h-32 flex items-center justify-center bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
      >
        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold"
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "#FFD700",
              fontFamily: "Orbitron",
              border: "1px solid #FFD70060",
            }}
          >
            ⭐ FEATURED
          </div>
        )}
        <span style={{ fontSize: "3rem" }}>{project.icon}</span>
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            transform: "skewX(-20deg)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-orbitron font-bold text-sm text-white mb-2 leading-tight">
          {project.title}
        </h3>
        <p
          className="text-xs mb-4 leading-relaxed"
          style={{
            color: "rgba(255,255,255,0.55)",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <code
              key={t}
              className="text-xs px-2 py-0.5 rounded"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
                fontFamily: "JetBrains Mono",
              }}
            >
              {t}
            </code>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              color: "rgba(255,255,255,0.7)",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            ⬡ GitHub
          </a>
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{
                color: project.color,
                background: `${project.color}15`,
                border: `1px solid ${project.color}40`,
                textDecoration: "none",
              }}
            >
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ── Main Section ──
export default function Projects() {
  const [active, setActive] = useState("All");
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category.includes(active));

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-subtitle">What I've Built</p>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${active === f ? "active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project count */}
        <p
          className="text-center font-mono-code text-xs mb-8"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Showing {filtered.length} of {projects.length} projects
        </p>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
