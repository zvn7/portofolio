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
import {
	ArrowUpRight,
	Github,
	Instagram,
	Linkedin,
	Twitter,
} from "lucide-react";
import ContactForm from "@/components/organisms/ContactForm";

const BLUR_FADE_DELAY = 0.04;

function HomePage() {
	return (
		<div className="font-poppins space-y-8 mb-12">
			<section id="hero">
				<BlurFade delay={BLUR_FADE_DELAY * 3}>
					<Badge
						variant="outline"
						className=" h-8 mb-4 w-24 flex justify-center space-x-2"
					>
						<HomeIcon /> <span>Introduce</span>
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
					<p className="prose max-w-full text-pretty  text-sm text-muted-foreground dark:prose-invert">
						{DATA.summary}
					</p>
				</BlurFade>
			</section>
			<section id="resume">
				<BlurFade delay={BLUR_FADE_DELAY * 3}>
					<Badge
						variant="outline"
						className="h-8 w-24 flex justify-center space-x-2"
					>
						<HomeIcon />
						<span>Resume</span>
					</Badge>
				</BlurFade>
				<div className="max-w-4xl ml-2 mt-4 mx-auto">
					<div className="relative border-l-2 border-gray-600 pl-8">
						{DATA.work.map((experience, index) => (
							<div key={index} className="mb-8">
								<div className="flex items-center mb-2">
									<div className="absolute -left-4 w-8 flex items-center justify-center">
										<span className="block w-4 h-4 bg-gray-800 rounded-full"></span>
									</div>
									<h3 className="text-lg font-bold">
										{experience.company} ({experience.start} - {experience.end})
									</h3>
								</div>
								<div className="mb-4">
									<h4 className="text-base font-semibold text-blue-800">
										{experience.title}
									</h4>
									<p className="text-gray-400">{experience.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section id="skills">
				<Badge
					variant="outline"
					className="mb-4 h-8 w-24 flex justify-center space-x-2"
				>
					<HomeIcon /> <span>Skills</span>
				</Badge>
				<div className="flex min-h-0 flex-col gap-y-3">
					<BlurFade delay={BLUR_FADE_DELAY * 9}>
						<h2 className="text-xl font-bold text-center">Skills</h2>
					</BlurFade>
					<Marquee pauseOnHover className="[--duration:20s]">
						<div className="flex gap-4">
							{DATA.skills.map((skill, id) => (
								<BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
									<Badge key={skill}>{skill}</Badge>
								</BlurFade>
							))}
						</div>
					</Marquee>
				</div>
			</section>
			<section id="projects">
				<Badge
					variant="outline"
					className="mb-4 h-8 w-24 flex justify-center space-x-2"
				>
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
									I&apos;ve worked on a variety of projects, from simple
									websites to complex web applications. Here are a few of my
									favorites.
								</p>
							</div>
						</div>
					</BlurFade>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
						{DATA.projects.map((project, id) => (
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
				</div>
			</section>
			<section id="contact">
				<Badge
					variant="outline"
					className="mb-4 h-8 w-24 flex justify-center space-x-2"
				>
					<HomeIcon /> <span>Contact</span>
				</Badge>
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="mb-6">
						<h2 className="text-xl font-bold mb-2">Get in touch</h2>
						<p className="text-gray-400">
							If you have any questions or comments, please don't hesitate to
							contact me. I'll do my best to get back to you as soon as
							possible.
						</p>
					</div>

					<div className="space-y-4">
						<p className="text-2xl font-bold mt-6">Find me on</p>
						<div className="space-y-4">
							{/* GitHub */}
							<a
								href="https://github.com/zvn7"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="bg-slate-300 dark:bg-slate-800 p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mb-4">
									<div>
										<h3 className="text-xl font-bold text-black dark:text-white">
											Discover My Code
										</h3>
										<p className="text-sm text-black dark:text-gray-300">
											Dive into the source code of my projects and see what I'm
											building on GitHub.
										</p>
										<Button className="mt-4 bg-black dark:bg-gray-700">
											Go to GitHub <ArrowUpRight className="ml-2" />
										</Button>
									</div>
									<div className="flex items-center justify-center">
										{/* Menyembunyikan logo pada ukuran kecil */}
										<div className="text-4xl bg-black dark:bg-gray-600 rounded-full p-6 flex items-center justify-center hidden sm:flex">
											<Github className="w-12 h-12 text-white" />
										</div>
									</div>
								</div>
							</a>

							{/* LinkedIn */}
							<a
								href="https://www.linkedin.com/in/ilham-maul"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="bg-blue-200 dark:bg-blue-800 p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mb-4">
									<div>
										<h3 className="text-xl font-bold text-blue-600 dark:text-blue-300">
											Connect Professionally
										</h3>
										<p className="text-sm text-blue-600 dark:text-blue-200 w-full sm:w-80">
											Join my network on LinkedIn to collaborate and explore my
											professional journey.
										</p>
										<Button className="mt-4 bg-blue-600 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-400">
											Go to LinkedIn <ArrowUpRight className="ml-2" />
										</Button>
									</div>
									<div className="flex items-center justify-center">
										<div className="text-4xl bg-blue-600 dark:bg-blue-500 rounded-full p-6 flex items-center justify-center hidden sm:flex">
											<Linkedin className="w-12 h-12 text-white" />
										</div>
									</div>
								</div>
							</a>

							{/* Instagram */}
							<a
								href="https://www.instagram.com/ilhammaul7"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="bg-pink-200 dark:bg-pink-800 p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mb-4">
									<div>
										<h3 className="text-xl font-bold text-pink-600 dark:text-pink-300">
											Follow My Journey
										</h3>
										<p className="text-sm text-pink-600 dark:text-pink-200 w-full sm:w-80">
											Follow me on Instagram for behind-the-scenes looks and
											updates on my latest projects.
										</p>
										<Button className="mt-4 bg-pink-600 dark:bg-pink-500 hover:bg-pink-500 dark:hover:bg-pink-400">
											Go to Instagram <ArrowUpRight className="ml-2" />
										</Button>
									</div>
									<div className="flex items-center justify-center">
										<div className="text-4xl bg-pink-600 dark:bg-pink-500 rounded-full p-6 flex items-center justify-center hidden sm:flex">
											<Instagram className="w-12 h-12 text-white" />
										</div>
									</div>
								</div>
							</a>

							{/* Twitter */}
							<a
								href="https://twitter.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="bg-blue-300 dark:bg-blue-900 p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mb-4">
									<div>
										<h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
											Follow Me on Twitter
										</h3>
										<p className="text-sm text-blue-700 dark:text-blue-200 w-full sm:w-80">
											Stay updated with my latest projects and thoughts by
											following me on Twitter.
										</p>
										<Button className="mt-4 bg-blue-700 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500">
											Go to Twitter <ArrowUpRight className="ml-2" />
										</Button>
									</div>
									<div className="flex items-center justify-center">
										<div className="text-4xl bg-blue-700 dark:bg-blue-600 rounded-full p-6 flex items-center justify-center hidden sm:flex">
											<Twitter className="w-12 h-12 text-white" />
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>

					<div className="mt-6">
						<div>
							<h2 className="text-2xl font-bold mb-4">Send Me a Message</h2>
							<ContactForm />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default HomePage;
