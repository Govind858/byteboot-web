import { useState, useEffect, useRef } from "react";
import { createProduct, getProducts } from "../APIs/adminApi";

// ── CSS as template literal (same as yours + minor fixes) ─────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    background: #09090b;
    color: #e5e5e5;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    min-height: 100vh;
  }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    background: rgba(9, 9, 11, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #27272a;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .nav-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22d3ee;
    box-shadow: 0 0 10px #22d3ee;
  }

  .nav-brand-text {
    font-size: 1.1rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.75rem;
  }

  .nav-link {
    color: #71717a;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-link:hover { color: #fff; }

  .btn-add {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.45rem 1rem;
    background: #22d3ee;
    color: #000;
    border: none;
    border-radius: 10px;
    font-size: 0.825rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }

  .btn-add:hover { background: #67e8f9; transform: translateY(-1px); }
  .btn-add:active { transform: translateY(0); }

  .pf-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem;
  }

  .page-header { margin-bottom: 2.5rem; }

  .page-title {
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #fff;
  }

  .page-sub {
    margin-top: 0.35rem;
    font-size: 0.875rem;
    color: #52525b;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1.25rem;
  }

  .card {
    background: #111113;
    border: 1px solid #27272a;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  }

  .card:hover {
    border-color: #3f3f46;
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
  }

  .card-image-wrap {
    position: relative;
    height: 190px;
    overflow: hidden;
    background: #18181b;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .card:hover .card-image { transform: scale(1.04); }

  .card-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #18181b 0%, #1c1c1f 100%);
    font-size: 3rem;
    opacity: 0.2;
  }

  .card-badge {
    position: absolute;
    bottom: 0.75rem;
    left: 0.75rem;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 0.2rem 0.6rem;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #22d3ee;
  }

  .card-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    flex: 1;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.01em;
  }

  .card-desc {
    font-size: 0.85rem;
    line-height: 1.65;
    color: #71717a;
  }

  .tech-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .tech-pill {
    background: #18181b;
    border: 1px solid #3f3f46;
    color: #a1a1aa;
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
  }

  .btn-toggle {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    background: none;
    border: none;
    color: #22d3ee;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    margin-top: auto;
    transition: color 0.2s;
  }

  .btn-toggle:hover { color: #67e8f9; }

  .toggle-arrow {
    display: inline-block;
    transition: transform 0.3s ease;
    font-size: 0.9rem;
  }

  .toggle-arrow.open { transform: rotate(180deg); }

  .details-box {
    border-top: 1px solid #27272a;
    padding-top: 0.875rem;
    animation: slideDown 0.25s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .details-text {
    font-size: 0.825rem;
    line-height: 1.75;
    color: #71717a;
  }

  /* Skeleton */
  .skeleton-card {
    background: #111113;
    border: 1px solid #27272a;
    border-radius: 16px;
    overflow: hidden;
  }

  .skeleton-img {
    height: 190px;
    background: linear-gradient(90deg, #18181b 25%, #222226 50%, #18181b 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .skeleton-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }

  .skeleton-line {
    height: 13px;
    border-radius: 6px;
    background: linear-gradient(90deg, #18181b 25%, #222226 50%, #18181b 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .skeleton-line.short  { width: 35%; }
  .skeleton-line.medium { width: 60%; }
  .skeleton-line.full   { width: 100%; }

  @keyframes shimmer {
    0%   { background-position:  200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Modal */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .modal {
    background: #111113;
    border: 1px solid #27272a;
    border-radius: 16px;
    width: 100%;
    max-width: 540px;
    max-height: 92vh;
    overflow-y: auto;
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #27272a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-title { font-size: 1.4rem; font-weight: 700; color: white; }

  .modal-close {
    background: none;
    border: none;
    font-size: 1.6rem;
    color: #71717a;
    cursor: pointer;
  }

  .modal-close:hover { color: #ef4444; }

  .modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }

  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }

  .form-label { font-size: 0.9rem; font-weight: 600; color: #d4d4d8; }

  .form-input, .form-textarea, .form-select {
    background: #18181b;
    border: 1px solid #3f3f46;
    border-radius: 8px;
    padding: 0.65rem 1rem;
    color: white;
    font-size: 0.9rem;
  }

  .form-input:focus, .form-textarea:focus, .form-select:focus {
    outline: none;
    border-color: #22d3ee;
    box-shadow: 0 0 0 3px rgba(34,211,238,0.2);
  }

  .form-textarea { min-height: 100px; resize: vertical; }

  .image-preview {
    width: 100%;
    height: 180px;
    border-radius: 10px;
    object-fit: cover;
    background: #1f1f23;
    border: 1px dashed #444;
  }

  .image-placeholder {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1f1f23;
    border: 1px dashed #444;
    border-radius: 10px;
    color: #666;
  }

  .form-error { color: #f87171; font-size: 0.82rem; }

  .modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #27272a;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .btn-cancel {
    padding: 0.6rem 1.3rem;
    background: #27272a;
    color: #d4d4d8;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-submit {
    padding: 0.6rem 1.5rem;
    background: #22d3ee;
    color: black;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .btn-submit:hover { background: #67e8f9; }
  .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  @media (max-width: 640px) {
    .nav-links { display: none; }
    .projects-grid { grid-template-columns: 1fr; }
    .navbar { padding: 0 1rem; }
    .pf-main { padding: 2rem 1rem; }
  }
`;

// ── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project }: { project: any }) {
  const [open, setOpen] = useState(false);
  const details = project.details || project.detail || "";
  const tech = project.techStack || project.tech || [];

  return (
    <div className="card">
      <div className="card-image-wrap">
        {project.image ? (
          <img className="card-image" src={project.image} alt={project.title} />
        ) : (
          <div className="card-placeholder">🖼️</div>
        )}
        <span className="card-badge">{project.category || "—"}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description || "No description available."}</p>

        <div className="tech-row">
          {tech.map((t: string) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>

        {details && (
          <>
            <button
              className="btn-toggle"
              onClick={() => setOpen(!open)}
              type="button"
            >
              {open ? "Hide Details" : "View Details"}
              <span className={`toggle-arrow${open ? " open" : ""}`}>▾</span>
            </button>

            {open && (
              <div className="details-box">
                <p className="details-text">{details}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onAddClick }: { onAddClick: () => void }) {
  return (
    <nav className="navbar">
      <a className="nav-brand" href="#">
        <span className="nav-dot" />
        <span className="nav-brand-text">ByteBoot</span>
      </a>  
      <button className="btn-add" onClick={onAddClick}>
        + Add Project
      </button>
    </nav>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line short" />
        <div className="skeleton-line medium" />
        <div className="skeleton-line full" />
        <div className="skeleton-line full" />
        <div className="skeleton-line medium" />
      </div>
    </div>
  );
}

// ── Add Project Modal ────────────────────────────────────────────────────────
function AddProjectModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (newProject: any) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    details: "",
    category: "fullstack",
    techStack: "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select an image file");
      return;
    }
    if (file.size > 5_000_000) {
      setErrorMsg("Image too large (max 5 MB)");
      return;
    }

    setForm((p) => ({ ...p, image: file }));
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.title.trim() || !form.description.trim()) {
      setErrorMsg("Title and description are required");
      return;
    }

    setSubmitting(true);

    try {
      const techArray = form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("description", form.description.trim());
      fd.append("details", form.details.trim());
      fd.append("category", form.category);
      techArray.forEach(tech => {
  fd.append("techStack", tech);   // repeat same key multiple times
});
      if (form.image) fd.append("image", form.image);

      const res = await createProduct(fd);

      if (res?.success && res?.product) {
        onSuccess(res.product);
        onClose();
      } else {
        throw new Error(res?.message || "Creation failed");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Could not add project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Project</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errorMsg && <div className="form-error">{errorMsg}</div>}

            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                className="form-input"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className="form-textarea"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Details</label>
              <textarea
                className="form-textarea"
                value={form.details}
                onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              >
                <option value="fullstack">Full Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="mobile">Mobile</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tech stack (comma separated)</label>
              <input
                className="form-input"
                value={form.techStack}
                onChange={(e) => setForm((p) => ({ ...p, techStack: e.target.value }))}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image</label>
              {preview ? (
                <img src={preview} alt="preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">No image selected</div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={handleFile}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{
                  marginTop: "0.75rem",
                  padding: "0.6rem 1.2rem",
                  background: "#27272a",
                  color: "#ccc",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Select Image
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Inject global styles once
  useEffect(() => {
    if (document.getElementById("dashboard-global-styles")) return;

    const style = document.createElement("style");
    style.id = "dashboard-global-styles";
    style.textContent = globalCSS;
    document.head.appendChild(style);

    return () => {
      // Optional: cleanup on unmount (usually not needed for global styles)
      // style.remove();
    };
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      const list = Array.isArray(data) ? data : data?.product ?? [];
      setProjects(list);
    } catch (err: any) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleNewProject = (newProj: any) => {
    setProjects((prev) => [newProj, ...prev]);
  };

  return (
    <>
      <Navbar onAddClick={() => setShowAddModal(true)} />

      <main className="pf-main">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-sub">
            {loading
              ? "Loading..."
              : error
              ? "Error loading projects"
              : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {loading && (
          <div className="projects-grid">
            {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#f87171" }}>
            {error}
            <br />
            <button
              onClick={loadProjects}
              style={{
                marginTop: "1rem",
                padding: "0.7rem 1.4rem",
                background: "#22d3ee",
                color: "black",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p._id || p.id || Math.random()} project={p} />
            ))}
          </div>
        )}
      </main>

      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleNewProject}
        />
      )}
    </>
  );
}