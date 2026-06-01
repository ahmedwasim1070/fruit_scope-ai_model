import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono font-bold text-lg tracking-tight text-zinc-100 hover:text-green-400 transition-colors"
        >
          <span className="text-green-400">🍎</span> FruitID
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
            }`}
          >
            Home
          </Link>
          <Link
            to="/docs"
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              pathname === "/docs"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
            }`}
          >
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
