import { Link, NavLink } from "react-router-dom";
import { HeartPulse } from "lucide-react";

const Navbar = () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Assessment", path: "/prediction" },
    { label: "Chatbot", path: "/chatbot" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <HeartPulse size={22} />
          </div>
          <div>
            <span className="block text-lg font-bold text-slate-900">
              Maternal AI
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              Maternal Health Risk Assessment
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-rose-50 text-rose-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
