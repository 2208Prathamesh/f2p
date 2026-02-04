import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(formState);
      const redirectPath = location.state?.from || "/dashboard";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-panel rounded-3xl p-10 shadow-card">
        <p className="section-heading">Welcome back</p>
        <h1 className="mt-3 text-3xl font-semibold">Log in to continue</h1>
        <p className="mt-3 text-sm text-white/60">
          Use the email you registered with. For admin access, log in with an email that starts
          with "admin" in this demo environment.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input
              name="email"
              type="email"
              required
              value={formState.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal px-4 py-3 text-sm text-white focus:border-highlight/60 focus:outline-none"
              placeholder="you@domain.com"
            />
          </div>
          <div>
            <label className="text-sm text-white/70">Password</label>
            <input
              name="password"
              type="password"
              required
              value={formState.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal px-4 py-3 text-sm text-white focus:border-highlight/60 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="button-primary w-full" disabled={loading}>
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>
        <p className="mt-6 text-sm text-white/60">
          New here?{" "}
          <Link to="/signup" className="text-highlight hover:text-white">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
