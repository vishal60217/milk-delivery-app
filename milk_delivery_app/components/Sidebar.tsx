import Link from 'next/link';

type SidebarProps = {
  onLogout: () => Promise<void> | void;
};

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/customers', label: 'Customers' },
  { href: '/billing', label: 'Billing' },
  { href: '/reports', label: 'Reports' },
];

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-3">
          Milk Delivery
        </p>
        <h2 className="text-2xl font-semibold mb-8">Operations</h2>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-4 py-3 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => onLogout()}
        className="mt-8 rounded-lg border border-slate-700 px-4 py-3 text-left text-slate-200 hover:bg-slate-800"
      >
        Logout
      </button>
    </aside>
  );
}
