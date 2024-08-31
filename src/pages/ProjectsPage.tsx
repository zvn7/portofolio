import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/molecules/project-card";
import { DATA } from "@/lib/data";
import { ChevronLeft, AlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Impor komponen Tabs

const BLUR_FADE_DELAY = 0.04;

const ProjectsPage = () => {
	const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

	const [activeCategory, setActiveCategory] = useState("all");

	// Fungsi untuk menyaring proyek berdasarkan kategori
	const filteredProjects = DATA.projects.filter((project) =>
		activeCategory === "all" ? true : project.category === activeCategory
	);

	const handleBack = () => {
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6">
			<main className="flex flex-col min-h-[100dvh] space-y-10">
				<div className="font-poppins space-y-8 mb-12">
					<div>
						<div className="space-y-12 w-full ">
							<BlurFade delay={BLUR_FADE_DELAY * 11}>
								<div className="flex justify-between items-center">
									<ChevronLeft onClick={handleBack} className="w-6 h-6" />
									<div className="">
										<div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
											My Projects
										</div>
									</div>
									<AlignJustify className="w-6 h-6" />
								</div>
							</BlurFade>

							<Tabs defaultValue="all" className="w-full mb-8">
								<BlurFade delay={BLUR_FADE_DELAY * 11}>
									<TabsList className="flex items-center mb-8">
										<TabsTrigger value="all">All</TabsTrigger>
										<TabsTrigger value="API">API</TabsTrigger>
										<TabsTrigger value="Website">Website</TabsTrigger>
										<TabsTrigger value="Mobile">Mobile</TabsTrigger>
									</TabsList>
								</BlurFade>
								<TabsContent value="all">
									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
										{filteredProjects
											.filter(
												(project) =>
													activeCategory === "all" ||
													project.category === activeCategory
											)
											.map((project, id) => (
												<BlurFade
													key={project.title}
													delay={BLUR_FADE_DELAY * 12 + id * 0.05}
												>
													<ProjectCard
														href={project.href}
														key={project.title}
														title={project.title}
														description={project.description}
														dates={project.dates}
														tags={project.technologies}
														image={project.image}
														video={project.video}
														links={project.links}
													/>
												</BlurFade>
											))}
									</div>
								</TabsContent>
								<TabsContent value="API">
									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
										{filteredProjects
											.filter((project) => project.category === "API")
											.map((project, id) => (
												<BlurFade
													key={project.title}
													delay={BLUR_FADE_DELAY * 12 + id * 0.05}
												>
													<ProjectCard
														href={project.href}
														key={project.title}
														title={project.title}
														description={project.description}
														dates={project.dates}
														tags={project.technologies}
														image={project.image}
														video={project.video}
														links={project.links}
													/>
												</BlurFade>
											))}
									</div>
								</TabsContent>
								<TabsContent value="Website">
									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
										{filteredProjects
											.filter((project) => project.category === "Website")
											.map((project, id) => (
												<BlurFade
													key={project.title}
													delay={BLUR_FADE_DELAY * 12 + id * 0.05}
												>
													<ProjectCard
														href={project.href}
														key={project.title}
														title={project.title}
														description={project.description}
														dates={project.dates}
														tags={project.technologies}
														image={project.image}
														video={project.video}
														links={project.links}
													/>
												</BlurFade>
											))}
									</div>
								</TabsContent>
								<TabsContent value="Mobile">
									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
										{filteredProjects
											.filter((project) => project.category === "Mobile")
											.map((project, id) => (
												<BlurFade
													key={project.title}
													delay={BLUR_FADE_DELAY * 12 + id * 0.05}
												>
													<ProjectCard
														href={project.href}
														key={project.title}
														title={project.title}
														description={project.description}
														dates={project.dates}
														tags={project.technologies}
														image={project.image}
														video={project.video}
														links={project.links}
													/>
												</BlurFade>
											))}
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ProjectsPage;
