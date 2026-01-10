import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { Globe, Github } from "lucide-react";

interface Props {
    title: string;
    href?: string;
    description: string;
    dates: string;
    tags: readonly string[];
    link?: string;
    image?: string;
    video?: string;
    links?: readonly {
        icon?: React.ReactNode;
        type: string;
        href: string;
    }[];
    className?: string;
}

const normalizeTags = (tags: readonly string[]) => {
    return tags.flatMap((tag) =>
        tag
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
    );
};

export function ProjectCard({
    title,
    description,
    tags,
    image,
    video,
    url,
    repository,
    className,
}: Props) {
    const hasWebsite = Boolean(url);
    const hasRepo = Boolean(repository);
    const buttonCount = Number(hasWebsite) + Number(hasRepo);

    return (
        <Card
            className={cn(
                "group flex h-full flex-col overflow-hidden border bg-background",
                "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                className
            )}
        >
            <div className="relative overflow-hidden">
                {video && (
                    <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-semibold text-white line-clamp-2">{title}</h3>
                </div>
            </div>

            <CardContent className="flex flex-col gap-3 px-3 py-4">
                <Markdown className="prose prose-sm line-clamp-3 max-w-full text-muted-foreground">
                    {description}
                </Markdown>

                {tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {normalizeTags(tags).map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="rounded-md px-2 py-0.5 text-[10px]"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>

            {(hasWebsite || hasRepo) && (
                <CardFooter
                    className={cn(
                        "mt-auto gap-2 px-3 pb-3",
                        buttonCount === 2 ? "grid grid-cols-2" : "flex"
                    )}
                >
                    {hasWebsite && (
                        <Link to={url!} target="_blank" className="w-full">
                            <div className="flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-[11px] font-medium hover:bg-muted">
                                <Globe className="h-4 w-4" />
                                Website
                            </div>
                        </Link>
                    )}

                    {hasRepo && (
                        <Link to={repository!} target="_blank" className="w-full">
                            <div className="flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-[11px] font-medium hover:bg-muted">
                                <Github className="h-4 w-4" />
                                GitHub
                            </div>
                        </Link>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}

