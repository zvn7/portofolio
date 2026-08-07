import BlurFade from "@/components/magicui/blur-fade";

interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    description?: string;
    delay?: number;
}

export function SectionHeading({ eyebrow, title, description, delay = 0 }: SectionHeadingProps) {
    return (
        <BlurFade delay={delay}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-border" />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {eyebrow}
                    </span>
                    <span className="h-px w-8 bg-border" />
                </div>
                <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-5xl">
                    {title}
                </h2>
                {description && (
                    <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-2xl">
                        {description}
                    </p>
                )}
            </div>
        </BlurFade>
    );
}
