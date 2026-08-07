import TypedText from "@/components/atoms/typed";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/molecules/project-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/lib/data";
import { HomeIcon } from "@radix-ui/react-icons";
import Marquee from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/organisms/ContactForm";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/interface/experiences";
import { useProjects } from "@/hooks/useProjects";
import TechIcon from "tech-stack-icons";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;

const formatMonthYear = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
    });
};

function HomePage() {
    const [showAll] = useState(false);
    const navigate = useNavigate();
    const [avatarClicks, setAvatarClicks] = useState(0);

    const handleSeeAll = () => {
        navigate("/projects");
    };

    const { data: experiences } = useExperiences();
    const { data: projects } = useProjects();

    const projectsToShow = showAll ? (projects ?? []) : (projects ?? []).slice(0, 5);

    const sortedExperiences = useMemo(() => {
        if (!experiences) return [];

        return [...experiences].sort((a, b) => {
            const aEnd = a.endDate ? new Date(a.endDate).getTime() : Infinity; // "Now" dianggap paling akhir
            const bEnd = b.endDate ? new Date(b.endDate).getTime() : Infinity;

            if (aEnd !== bEnd) return bEnd - aEnd; // descending: terbaru dulu

            // kalau endDate sama (mis. dua-duanya masih berjalan), urutkan by startDate terbaru
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
    }, [experiences]);

    return (
        <div className="font-poppins space-y-8 mb-12">
            <section id="hero">
                <BlurFade delay={BLUR_FADE_DELAY * 3}>
                    <Badge
                        variant="outline"
                        className="mb-4 h-8 w-24 flex justify-center space-x-2"
                    >
                        <HomeIcon /> <span>Intro</span>
                    </Badge>
                </BlurFade>

                <div className="mx-auto w-full max-w-2xl space-y-8">
                    <div className="gap-2 flex justify-between">
                        <div className="flex-col flex flex-1 space-y-6">
                            <div className="mx-auto w-full max-w-2xl text-3xl font-bold">
                                <TypedText
                                    strings={[
                                        "Welcome to my website!",
                                        "Hi, I'm Ilham Maulana",
                                        "I am a web developer.",
                                    ]}
                                />
                            </div>
                            <Separator />

                            <div className="flex space-x-3 items-center">
                                <BlurFadeText
                                    className="max-w-[400px] font-normal text-blue-800 md:text-4xl"
                                    delay={BLUR_FADE_DELAY}
                                    text={DATA.description}
                                />
                                <BlurFade delay={BLUR_FADE_DELAY}>
                                    <Avatar className="size-20 md:size-44 border">
                                        <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />

                                        <AvatarFallback className="flex items-center justify-center bg-background">
                                            <img
                                                src="/logo-trns.png"
                                                alt="Logo"
                                                className="w-10 h-10 md:w-24 md:h-24 object-contain"
                                            />
                                        </AvatarFallback>
                                    </Avatar>
                                </BlurFade>
                            </div>
                            <Separator />
                        </div>
                    </div>
                </div>
            </section>
            <section id="about">
                <BlurFade delay={BLUR_FADE_DELAY * 3}>
                    <Badge
                        variant="outline"
                        className="mb-4 h-8 w-24 flex justify-center space-x-2"
                    >
                        <HomeIcon /> <span>About</span>
                    </Badge>
                </BlurFade>

                <BlurFade delay={BLUR_FADE_DELAY * 4}>
                    <p className="prose max-w-full text-pretty text-sm text-muted-foreground dark:prose-invert">
                        {DATA.summary}
                    </p>
                </BlurFade>

                {/* SKILLS LABEL */}
                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                    <p className="mt-6 mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Tech Stack
                    </p>
                </BlurFade>

                <Marquee pauseOnHover className="[--duration:20s]">
                    <div className="flex items-center gap-5">
                        {DATA.skills.map((skill, id) => (
                            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                                <div
                                    className="
                            flex h-12 w-12 items-center justify-center
                            rounded-xl border bg-background
                            transition-transform duration-200
                            hover:-translate-y-0.5 hover:shadow-md
                        "
                                    title={skill}
                                >
                                    <TechIcon name={skill} className="h-7 w-7 text-foreground" />
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </Marquee>
            </section>

            <section id="resume">
                <BlurFade delay={BLUR_FADE_DELAY * 3}>
                    <Badge variant="outline" className="h-8 w-24 flex justify-center space-x-2">
                        <HomeIcon />
                        <span>Resume</span>
                    </Badge>
                </BlurFade>

                <div className="max-w-4xl ml-2 mt-6 mx-auto">
                    {sortedExperiences.map((experience: Experience, index: number) => {
                        const isCurrent = !experience.endDate;
                        const isLast = index === sortedExperiences.length - 1;

                        return (
                            <div
                                key={experience._id}
                                className="grid grid-cols-[1.5rem_1fr] gap-x-4"
                            >
                                {/* kolom dot + garis — sepenuhnya independen per item */}
                                <div className="flex flex-col items-center">
                                    <span
                                        className={cn(
                                            "mt-1.5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-background",
                                            isCurrent ? "bg-emerald-500" : "bg-foreground",
                                        )}
                                    />
                                    {!isLast && <span className="mt-1 w-px flex-1 bg-border" />}
                                </div>

                                {/* konten */}
                                <div className={cn(!isLast && "pb-10")}>
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                        <h3 className="text-lg font-bold tracking-tight">
                                            {experience.company}
                                        </h3>
                                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                                            {formatMonthYear(experience.startDate)} —{" "}
                                            {isCurrent ? (
                                                <span className="text-emerald-600">Now</span>
                                            ) : (
                                                formatMonthYear(experience.endDate)
                                            )}
                                        </span>
                                    </div>

                                    <h4 className="mt-1 text-base font-semibold text-blue-700">
                                        {experience.position}
                                    </h4>

                                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                        {experience.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section id="projects">
                <div className="space-y-12 w-full py-12">
                    <BlurFade delay={BLUR_FADE_DELAY * 11}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-border" />
                                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Selected Work
                                </span>
                                <span className="h-px w-8 bg-border" />
                            </div>
                            <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-5xl">
                                Projects I&apos;ve shipped
                            </h2>
                            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-2xl">
                                {projectsToShow.length} project
                                {projectsToShow.length !== 1 ? "s" : ""}, spanning full-stack apps,
                                APIs, and interfaces built to solve real problems.
                            </p>
                        </div>
                    </BlurFade>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[900px] mx-auto">
                        {projectsToShow.map((project, id) => (
                            <BlurFade
                                key={project._id}
                                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                                className={cn(id === 0 && "sm:col-span-2")}
                            >
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    tags={project.technologies}
                                    image={project.image}
                                    video={project.video}
                                    url={project.url}
                                    repository={project.repository}
                                    featured={id === 0}
                                />
                            </BlurFade>
                        ))}
                    </div>

                    {!showAll && (
                        <div className="flex justify-center mt-8">
                            <Button
                                onClick={handleSeeAll}
                                variant="outline"
                                className="group font-mono text-xs uppercase tracking-wider"
                            >
                                See all projects
                                <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>
            <section id="contact">
                <Badge variant="outline" className="mb-4 h-8 w-24 flex justify-center space-x-2">
                    <HomeIcon /> <span>Contact</span>
                </Badge>
                <div className="">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Get in touch</h2>
                        <p className="text-gray-400">
                            If you have any questions or comments, please don't hesitate to contact
                            me. I'll do my best to get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="mt-6">
                        <div>
                            <h2 className="text-xl font-bold mb-4">Send Me a Message</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
