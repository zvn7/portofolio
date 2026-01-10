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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/interface/experiences";
import { useProjects } from "@/hooks/useProjects";
import TechIcon from "tech-stack-icons";

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

    const projectsToShow = projects?.slice(0, 4) ?? [];

    const handleAvatarClick = () => {
        setAvatarClicks((prev) => {
            const next = prev + 1;

            if (next === 5) {
                navigate("/admin");
                return 0; // reset supaya tidak loop
            }

            return next;
        });
    };

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
                                        <AvatarFallback>{DATA.initials}</AvatarFallback>
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
                <div className="max-w-4xl ml-2 mt-4 mx-auto">
                    <div className="relative border-l-2 border-gray-600 pl-8">
                        {experiences?.map((experience: Experience) => (
                            <div key={experience._id} className="mb-8">
                                <div className="flex items-center mb-2">
                                    <div className="absolute -left-4 w-8 flex items-center justify-center">
                                        <span className="block w-4 h-4 bg-gray-800 rounded-full"></span>
                                    </div>
                                    <h3 className="text-lg font-bold">
                                        {experience.company} (
                                        {formatMonthYear(experience.startDate)} -{" "}
                                        {experience.endDate
                                            ? formatMonthYear(experience.endDate)
                                            : "Now"}
                                        )
                                    </h3>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-base font-semibold text-blue-800">
                                        {experience.position}
                                    </h4>
                                    <p className="text-gray-400">{experience.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="projects">
                <Badge variant="outline" className="mb-4 h-8 w-24 flex justify-center space-x-2">
                    <HomeIcon /> <span>Projects</span>
                </Badge>
                <div className="space-y-12 w-full py-12">
                    <BlurFade delay={BLUR_FADE_DELAY * 11}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                                    My Projects
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Check out my latest work
                                </h2>
                                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    I&apos;ve worked on a variety of projects, from simple websites
                                    to complex web applications. Here are a few of my favorites.
                                </p>
                            </div>
                        </div>
                    </BlurFade>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                        {projectsToShow.map((project, id) => (
                            <BlurFade key={project._id} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    tags={project.technologies}
                                    image={project.image}
                                    video={project.video}
                                    url={project.url}
                                    repository={project.repository}
                                />
                            </BlurFade>
                        ))}
                    </div>

                    {!showAll && (
                        <div className="flex justify-center mt-8">
                            <Button onClick={handleSeeAll}>See All</Button>
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
