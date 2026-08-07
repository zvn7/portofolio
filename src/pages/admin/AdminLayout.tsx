import { useState } from "react";
import { Outlet, useNavigate, useLocation, NavLink } from "react-router-dom";

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconDashboard = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

const IconFolder = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

const IconBriefcase = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const IconPen = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
);

const IconLogout = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const IconMenu = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const IconX = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ── Nav config ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { label: "Dashboard", href: "/admin", icon: <IconDashboard />, exact: true },
    { label: "Projects", href: "/admin/projects", icon: <IconFolder />, exact: false },
    { label: "Experiences", href: "/admin/experiences", icon: <IconBriefcase />, exact: false },
    { label: "Skills", href: "/admin/skills", icon: <IconPen />, exact: false },
    { label: "Certifications", href: "/admin/certifications", icon: <IconPen />, exact: false },
    { label: "Blog", href: "/admin/blog", icon: <IconPen />, exact: false },
] as const;

// ── Sidebar content (shared between desktop & mobile) ─────────────────────────

const SidebarContent = ({ onNavClick }: { onNavClick?: () => void }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="px-5 py-5 border-b">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Admin Panel
                </p>
                <p className="text-sm font-semibold mt-0.5">Portfolio CMS</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.exact}
                        onClick={onNavClick}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`
                        }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t space-y-0.5">
                <button
                    onClick={() => {
                        onNavClick?.();
                        navigate("/");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                    <IconLogout />
                    Back to Site
                </button>
            </div>
        </div>
    );
};

// ── Breadcrumb ────────────────────────────────────────────────────────────────

const useBreadcrumb = () => {
    const { pathname } = useLocation();
    const map: Record<string, string> = {
        "/admin": "Dashboard",
        "/admin/projects": "Projects",
        "/admin/experiences": "Experiences",
        "/admin/blog": "Blog",
    };
    return map[pathname] ?? "Admin";
};

// ── Layout ────────────────────────────────────────────────────────────────────

const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const breadcrumb = useBreadcrumb();

    return (
        <div className="min-h-screen bg-background flex">
            {/* ── Desktop sidebar ── */}
            <aside className="hidden lg:flex flex-col w-56 border-r bg-background shrink-0 sticky top-0 h-screen">
                <SidebarContent />
            </aside>

            {/* ── Mobile overlay ── */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── Mobile sidebar ── */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-56 bg-background border-r shadow-xl flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-end px-4 py-4 border-b">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <IconX />
                    </button>
                </div>
                <SidebarContent onNavClick={() => setMobileOpen(false)} />
            </aside>

            {/* ── Main area ── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar (mobile only) */}
                <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur flex items-center gap-3 px-4 py-3 lg:hidden">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Open menu"
                    >
                        <IconMenu />
                    </button>
                    <span className="text-sm font-semibold">{breadcrumb}</span>
                </header>

                {/* Page content */}
                <main className="flex-1 px-6 py-8 max-w-5xl w-full mx-auto">
                    {/* Desktop breadcrumb */}
                    <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground mb-6">
                        <span>Admin</span>
                        <span>/</span>
                        <span className="text-foreground font-medium">{breadcrumb}</span>
                    </div>

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
