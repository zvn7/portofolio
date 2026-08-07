import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";

interface Props {
    title: string;
    description: string;
    tags: readonly string[];
    image?: string;
    video?: string;
    url?: string;
    repository?: string;
    featured?: boolean;
    className?: string;
}

const normalizeTags = (tags: readonly string[]) => {
    return tags.flatMap((tag) =>
        tag
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
    );
};

// nama file semu buat header tab, biar berasa "file di editor" bukan random
const slugify = (title: string) =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export function ProjectCard({
    title,
    description,
    tags,
    image,
    video,
    url,
    repository,
    featured = false,
    className,
}: Props) {
    const hasWebsite = Boolean(url);
    const hasRepo = Boolean(repository);

    const status = hasWebsite
        ? { label: "live", dot: "bg-emerald-500" }
        : hasRepo
          ? { label: "source only", dot: "bg-amber-500" }
          : { label: "archived", dot: "bg-muted-foreground" };

    const media = (
        <div className={cn("relative h-full overflow-hidden bg-muted/40")}>
            {video && (
                <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
            )}
            {!video && image && (
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
            )}
            {!video && !image && (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        No preview
                    </span>
                </div>
            )}
        </div>
    );

    const links = (hasWebsite || hasRepo) && (
        <div className="mt-auto flex items-center gap-4 pt-3">
            {hasWebsite && (
                <Link
                    to={url!}
                    target="_blank"
                    className="group/link inline-flex items-center gap-1 font-mono text-xs text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                    visit site
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
            )}
            {hasRepo && (
                <Link
                    to={repository!}
                    target="_blank"
                    className="group/link inline-flex items-center gap-1 font-mono text-xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
                >
                    <Github className="h-3 w-3" />
                    source
                </Link>
            )}
        </div>
    );

    const tagList = tags?.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
            {normalizeTags(tags).map((tag) => (
                <span key={tag}>#{tag.toLowerCase().replace(/\s+/g, "")}</span>
            ))}
        </div>
    );

    // --- FEATURED: split panel — gambar sempit di kiri, divider tegas, konten kanan ---
    if (featured) {
        return (
            <div
                className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background sm:h-72 sm:flex-row",
                    "transition-colors duration-300 hover:border-foreground/40",
                    className,
                )}
            >
                <div className="h-48 sm:h-full sm:w-[38%]">{media}</div>
                <div className="flex flex-1 flex-col gap-3 border-t border-border p-6 sm:border-l sm:border-t-0">
                    <div className="flex items-center gap-2">
                        <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            featured · {status.label}
                        </span>
                    </div>
                    <h3 className="font-poppins text-2xl font-semibold tracking-tight">{title}</h3>
                    <Markdown className="prose prose-sm line-clamp-3 max-w-full text-muted-foreground">
                        {description}
                    </Markdown>
                    {tagList}
                    {links}
                </div>
            </div>
        );
    }

    // --- DEFAULT: tab bar — header mono kayak file di editor ---
    return (
        <div
            className={cn(
                "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background",
                "transition-colors duration-300 hover:border-foreground/40",
                className,
            )}
        >
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                <span className="truncate font-mono text-[11px] text-muted-foreground">
                    {slugify(title)}.tsx
                </span>
            </div>

            <div className="h-40">{media}</div>

            <div className="flex flex-1 flex-col gap-2.5 p-4">
                <h3 className="font-poppins text-base font-semibold tracking-tight">{title}</h3>
                <Markdown className="prose prose-sm line-clamp-2 max-w-full text-muted-foreground">
                    {description}
                </Markdown>
                {tagList}
                {links}
            </div>
        </div>
    );
}
