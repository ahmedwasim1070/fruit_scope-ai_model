import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono font-bold text-lg tracking-tight text-zinc-100 hover:text-green-400 transition-colors"
        >
          <span className="text-green-400">🍎</span> Fruit Scope
        </Link>
      </div>
    </header>
  );
}
