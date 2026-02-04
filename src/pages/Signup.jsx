import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await signup(formState);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-panel rounded-3xl p-10 shadow-card">
        <p className="section-heading">Create your account</p>
        <h1 className="mt-3 text-3xl font-semibold">Join the premium arcade</h1>
        <p className="mt-3 text-sm text-white/60">
          Your session stays persistent, and your playtime converts automatically into points.
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
              placeholder="Create a secure password"
            />
          </div>
          <button type="submit" className="button-primary w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-sm text-white/60">
          Already have an account?{" "}
          <Link to="/login" className="text-highlight hover:text-white">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
