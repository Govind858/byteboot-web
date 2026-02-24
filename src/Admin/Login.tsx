import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../APIs/adminApi";

/* ── Scoped CSS ──────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #09090b;
    font-family: 'Inter', system-ui, sans-serif;
    padding: 1rem;
  }

  .login-card {
    width: 100%;
    max-width: 420px;
    background: #111113;
    border: 1px solid #27272a;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .login-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .login-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #22d3ee;
    box-shadow: 0 0 12px #22d3ee;
  }

  .login-brand {
    font-size: 1.15rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .login-heading {
    font-size: 1.75rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
    margin-bottom: 0.35rem;
  }

  .login-sub {
    font-size: 0.875rem;
    color: #52525b;
    margin-bottom: 2rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .lf-group {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .lf-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #d4d4d8;
  }

  .lf-input {
    background: #18181b;
    border: 1px solid #3f3f46;
    border-radius: 10px;
    padding: 0.7rem 1rem;
    color: #fff;
    font-size: 0.95rem;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }

  .lf-input:focus {
    border-color: #22d3ee;
    box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.18);
  }

  .lf-input::placeholder { color: #52525b; }

  .lf-error {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    color: #f87171;
    font-size: 0.84rem;
    animation: fadeUp 0.25s ease;
  }

  .lf-submit {
    width: 100%;
    padding: 0.8rem;
    background: #22d3ee;
    color: #000;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, opacity 0.2s;
    margin-top: 0.25rem;
  }

  .lf-submit:hover:not(:disabled) {
    background: #67e8f9;
    transform: translateY(-1px);
  }

  .lf-submit:active:not(:disabled) { transform: translateY(0); }

  .lf-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .lf-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0,0,0,0.3);
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    margin-right: 0.5rem;
    vertical-align: middle;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

/* ── Component ────────────────────────────────────────────────────────────── */
export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ userName: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!form.userName.trim() || !form.password.trim()) {
            setError("Username and password are required.");
            return;
        }

        setLoading(true);
        try {
            const data = await loginAdmin(form.userName.trim(), form.password);
            // Store token for authenticated API calls
            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("adminUser", JSON.stringify(data.admin));
            navigate("/product-dashboard");
        } catch (err: any) {
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{css}</style>
            <div className="login-page">
                <div className="login-card">
                    {/* Brand */}
                    <div className="login-logo">
                        <span className="login-dot" />
                        <span className="login-brand">ByteBoot</span>
                    </div>

                    <h1 className="login-heading">Welcome back</h1>
                    <p className="login-sub">Sign in to your admin account to continue.</p>

                    <form className="login-form" onSubmit={handleSubmit} noValidate>
                        {error && (
                            <div className="lf-error">
                                <span>⚠</span>
                                {error}
                            </div>
                        )}

                        <div className="lf-group">
                            <label className="lf-label" htmlFor="userName">
                                Username
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                className="lf-input"
                                placeholder="user name"
                                value={form.userName}
                                onChange={handleChange}
                                autoComplete="username"
                                autoFocus
                            />
                        </div>

                        <div className="lf-group">
                            <label className="lf-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="lf-input"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                        </div>

                        <button type="submit" className="lf-submit" disabled={loading}>
                            {loading && <span className="lf-spinner" />}
                            {loading ? "Signing in…" : "Sign in"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
