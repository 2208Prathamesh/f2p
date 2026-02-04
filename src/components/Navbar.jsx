import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? "text-white" : "text-white/60 hover:text-white"}`;

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-highlight/20 text-lg font-semibold text-highlight">
            F2P
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">Nexus</p>
            <p className="text-lg font-semibold text-white">Arcade</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/games" className={navLinkClass}>
            Games
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden text-sm text-white/70 md:block">{user.email}</div>
              <button type="button" onClick={logout} className="button-secondary">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="button-secondary">
                Log in
              </Link>
              <Link to="/signup" className="button-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
