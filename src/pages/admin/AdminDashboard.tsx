import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";
import { useExperiences } from "@/hooks/useExperiences";

// ── Types ─────────────────────────────────────────────────────────────────────

interface StatCardProps {
    label: string;
    count: number | undefined;
    isLoading: boolean;
    lastItem?: { label: string; date: string } | null;
}

interface NavCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatRelative = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

// ── Icons (inline SVG, no extra dep) ─────────────────────────────────────────

const IconFolder = () => (
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
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

const IconBriefcase = () => (
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
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const IconPen = () => (
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
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
);

const IconArrow = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

// ── Stat Card ─────────────────────────────────────────────────────────────────

const StatCard = ({ label, count, isLoading, lastItem }: StatCardProps) => (
    <div className="rounded-xl border bg-card p-5 space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-4xl font-bold tabular-nums">
            {isLoading ? (
                <span className="inline-block w-10 h-9 rounded-md bg-muted animate-pulse" />
            ) : (
                (count ?? 0)
            )}
        </p>
        {lastItem && !isLoading && (
            <p className="text-xs text-muted-foreground truncate">
                Last: <span className="text-foreground">{lastItem.label}</span>
                <span className="ml-1 opacity-60">· {lastItem.date}</span>
            </p>
        )}
    </div>
);

// ── Nav Card ──────────────────────────────────────────────────────────────────

const NavCard = ({ title, description, href, icon }: NavCardProps) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(href)}
            className="group w-full text-left rounded-xl border bg-card p-5 space-y-2 hover:border-foreground/30 hover:bg-muted/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                    {icon}
                    <span className="font-medium text-sm">{title}</span>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-150">
                    <IconArrow />
                </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </button>
    );
};

// ── Recent Activity ───────────────────────────────────────────────────────────

interface ActivityItem {
    id: string;
    type: "project" | "experience";
    label: string;
    sub: string;
    date: string;
}

const typeLabel: Record<ActivityItem["type"], string> = {
    project: "Project",
    experience: "Experience",
};

const typeDot: Record<ActivityItem["type"], string> = {
    project: "bg-blue-500",
    experience: "bg-emerald-500",
};

const RecentActivity = ({ items }: { items: ActivityItem[] }) => {
    if (items.length === 0) return null;
    return (
        <div className="rounded-xl border bg-card overflow-hidden">
            <div className="px-5 py-4 border-b">
                <h2 className="text-sm font-semibold">Recent Activity</h2>
            </div>
            <ul className="divide-y">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors"
                    >
                        <span
                            className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${typeDot[item.type]}`}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.sub}</p>
                        </div>
                        <div className="text-right shrink-0 space-y-0.5">
                            <p className="text-xs text-muted-foreground">
                                {formatRelative(item.date)}
                            </p>
                            <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                                {typeLabel[item.type]}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// ── Main ──────────────────────────────────────────────────────────────────────

const AdminDashboard = () => {
    const { data: projects = [], isLoading: loadingProjects } = useProjects();
    const { data: experiences = [], isLoading: loadingExperiences } = useExperiences();

    // Derive last item per section
    const lastProject =
        projects.length > 0
            ? {
                  label: projects[0].title,
                  date: formatRelative(projects[0].updatedAt ?? projects[0].createdAt),
              }
            : null;

    const lastExperience =
        experiences.length > 0
            ? {
                  label: experiences[0].position,
                  date: formatRelative(experiences[0].updatedAt ?? experiences[0].createdAt ?? ""),
              }
            : null;

    // Build recent activity list (merge + sort by updatedAt desc, take top 5)
    const activityItems: ActivityItem[] = [
        ...projects.map((p) => ({
            id: `project-${p._id}`,
            type: "project" as const,
            label: p.title,
            sub: p.category.join(", "),
            date: p.updatedAt ?? p.createdAt,
        })),
        ...experiences.map((e) => ({
            id: `exp-${e._id}`,
            type: "experience" as const,
            label: e.position,
            sub: e.company,
            date: e.updatedAt ?? e.createdAt ?? new Date().toISOString(),
        })),
    ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">{greeting}</p>
                    <h1 className="text-xl font-semibold mt-0.5">Portfolio Dashboard</h1>
                </div>
                <span className="text-xs text-muted-foreground pt-1">
                    {now.toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <StatCard
                    label="Projects"
                    count={projects.length}
                    isLoading={loadingProjects}
                    lastItem={lastProject}
                />
                <StatCard
                    label="Experiences"
                    count={experiences.length}
                    isLoading={loadingExperiences}
                    lastItem={lastExperience}
                />
                <StatCard label="Blog Posts" count={0} isLoading={false} lastItem={null} />
            </div>

            {/* Recent Activity */}
            {activityItems.length > 0 && <RecentActivity items={activityItems} />}

            {/* Quick Navigation */}
            <div>
                <h2 className="text-sm font-semibold mb-3">Quick Access</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <NavCard
                        href="/admin/projects"
                        icon={<IconFolder />}
                        title="Projects"
                        description="Create, edit, and organize your portfolio projects."
                    />
                    <NavCard
                        href="/admin/experiences"
                        icon={<IconBriefcase />}
                        title="Experiences"
                        description="Update your work history, roles, and descriptions."
                    />
                    <NavCard
                        href="/admin/blog"
                        icon={<IconPen />}
                        title="Blog"
                        description="Write and publish articles to share your insights."
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
