import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CertificationMarqueeCardProps {
    title: string;
    provider: string;
    dateObtained: string;
    certificateUrl?: string;
    image: string;
    index: number;
    formatMonthYear: (date: string) => string;
}

export function CertificationMarqueeCard({
    title,
    provider,
    dateObtained,
    certificateUrl,
    image,
    index,
    formatMonthYear,
}: CertificationMarqueeCardProps) {
    const card = (
        <div
            className={cn(
                "group/card relative h-40 w-64 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-background shadow-sm",
                "-ml-10 first:ml-0",
                "transition-all duration-300 ease-out hover:z-30 hover:-translate-y-2 hover:scale-105 hover:shadow-xl",
            )}
            style={{ zIndex: index }}
        >
            <img src={image} alt={title} className="h-full w-full object-cover" />

            {/* overlay detail — cuma muncul saat card INI yang di-hover */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                <p className="font-poppins text-sm font-semibold text-white line-clamp-1">
                    {title}
                </p>
                <p className="mt-1 text-xs text-white/70 line-clamp-1">{provider}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {formatMonthYear(dateObtained)}
                </p>
            </div>
        </div>
    );

    if (!certificateUrl) return card;

    return (
        <Link to={certificateUrl} target="_blank" className="block">
            {card}
        </Link>
    );
}
