import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold text-sky-700">
            Elevate Workforce
          </Link>
          <nav className="hidden sm:flex gap-3 text-sm text-slate-600">
            <Link to="/" className="transition hover:text-sky-700">Home</Link>
            {isAdmin && <Link to="/admin/jobs/create" className="transition hover:text-sky-700">Create Job</Link>}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-sm font-medium text-slate-700">{user?.fullName}</div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
