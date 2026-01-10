import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/molecules/project-card";
import { ChevronLeft, AlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects } from "@/hooks/useProjects";

const BLUR_FADE_DELAY = 0.04;

const ProjectsPage = () => {
    const navigate = useNavigate();
    const { data: projects = [] } = useProjects();
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProjects =
        activeTab === "all"
            ? projects
            : projects.filter(project =>
                  project.category?.includes(activeTab)
              );

    return (
        <div className="min-h-screen bg-background font-poppins antialiased max-w-2xl mx-auto px-6">
            {/* FIXED HEADER */}
            <header
                className="
                    fixed top-0 left-0 right-0 z-50
                    mx-auto max-w-2xl
                    border-b bg-background/80
                    backdrop-blur
                "
            >
                <div className="flex items-center justify-between px-6 py-6">
                    <ChevronLeft
                        onClick={() => navigate("/")}
                        className="h-6 w-6 cursor-pointer"
                    />

                    <span className="text-md font-medium">
                        My Projects
                    </span>

                    <div className="w-6" />
                </div>
            </header>

            {/* CONTENT */}
            <main className="space-y-12 pt-12 sm:pt-4">
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="mb-8 w-full">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="API">API</TabsTrigger>
                        <TabsTrigger value="Website">Website</TabsTrigger>
                        <TabsTrigger value="Application">App</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab}>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                            {filteredProjects.map((project, id) => (
                                <BlurFade
                                    key={project._id}
                                    delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                                >
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
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};


export default ProjectsPage;
