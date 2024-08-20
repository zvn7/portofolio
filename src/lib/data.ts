import {
	InfoCircledIcon,
	EnvelopeClosedIcon,
	TwitterLogoIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import {
	CodeIcon,
	HomeIcon,
	PencilLine,
	StarIcon,
	FileTextIcon,
} from "lucide-react";

export const DATA = {
	name: "Ilham Maulana",
	initials: "IM",
	url: "https://via.placeholder.com/32",
	location: "Indonesia",
	locationLink: "https://www.google.com/maps/place/sanfrancisco",
	description: "Passionate about frontend technologies and UI/UX design",
	summary:
		"Technology has been my passion for as long as I can remember. From tinkering with gadgets to diving into coding, my journey has been driven by a relentless curiosity. Today, I channel that passion into creating elegant websites and user-friendly applications. When I'm not immersed in lines of code, you can find me exploring the latest in web design trends or enjoying my favorite hobbies: discovering new music and perfecting my latte art skills. Let me walk you through what I've been working on recently:",
	avatarUrl: "/me.png",
	skills: [
		"React",
		"Next.js",
		"Typescript",
		"Node.js",
		"Tailwind",
		"Vite",
		"Bootstrap",
		"Git",
		"Figma",
		"Express",
		"MongoDB",
		"Mongoose",
		"MySQL",
		"Laravel",
		"PHP",
		"Codeigniter",
	],
	work: [
		{
			company: "PT United Tractors Tbk",
			href: "https://atomic.finance",
			badges: [],
			location: "Cakung, Jakarta Timur",
			title: "Frontend Developer",
			logoUrl: "/atomic.png",
			start: "Feb 2024",
			end: "June 2024",
			description:
				"Mengembangkan sistem manajemen pembelajaran menggunakan React, TypeScript, Tailwind CSS, dan Flowbite, serta mengimplementasikan fitur Progressive Web App. Mendesain UI menggunakan Figma, menghasilkan antarmuka yang ramah pengguna dan menarik secara visual. Melakukan deployment dengan GitHub, Vercel, dan Microsoft Azure menggunakan konsep CI/CD. Menyelesaikan kursus praktis pengembangan aplikasi menggunakan ASP.NET Core 7.0, React 18, dan React Router v6. Kursus ini mencakup pembuatan solusi multi-proyek dengan Clean Architecture dan pola CQRS + Mediator, integrasi ASP.NET Core Identity, penggunaan React dengan TypeScript, serta implementasi fitur-fitur seperti paging, sorting, filterin. Saya juga memperoleh keterampilan dalam penggunaan tools seperti AutoMapper, MobX.",
		},
		{
			company: "Dinkominfo Kabupaten Temanggung",
			badges: [],
			href: "https://shopify.com",
			location: "Temanggung, Jawa Tengah",
			title: "Web Developer",
			logoUrl: "/shopify.svg",
			start: "January 2022",
			end: "April 2022",
			description:
				"Membuat dan mengembangkan website layanan aplikasi menggunakan framework CodeIgniter 4. Melakukan rekap data berita website setiap bulan. Meng-upload berita informasi di laman resmi Pemerintah Kabupaten Temanggung.",
		},
	],
	navbar: [
		{ href: "hero", label: "Home", icon: HomeIcon },
		{ href: "about", label: "About", icon: InfoCircledIcon },
		{ href: "resume", label: "Resume", icon: FileTextIcon },
		{ href: "projects", icon: CodeIcon, label: "Projects" },
		{ href: "contact", label: "Contact", icon: EnvelopeClosedIcon },
		// { href: "#", icon: PencilLine, label: "Notes" },
	],
	contact: {
		social: {
			github: { url: "https://github.com", icon: GitHubLogoIcon, navbar: true },
			linkedin: {
				url: "https://linkedin.com",
				icon: LinkedInLogoIcon,
				navbar: true,
			},
		},
	},
	projects: [
		{
			title: "Chat Collect",
			href: "https://chatcollect.com",
			dates: "Jan 2024 - Feb 2024",
			active: true,
			description:
				"With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
			technologies: [
				"Next.js",
				"Typescript",
				"PostgreSQL",
				"Prisma",
				"TailwindCSS",
				"Stripe",
				"Shadcn UI",
				"Magic UI",
			],
			links: [
				{
					type: "Website",
					href: "https://chatcollect.com",
				},
			],
			image: "",
			video:
				"https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
		},
		{
			title: "Magic UI",
			href: "https://magicui.design",
			dates: "June 2023 - Present",
			active: true,
			description:
				"Designed, developed and sold animated UI components for developers.",
			technologies: [
				"Next.js",
				"Typescript",
				"PostgreSQL",
				"Prisma",
				"TailwindCSS",
				"Stripe",
				"Shadcn UI",
				"Magic UI",
			],
			links: [
				{
					type: "Website",
					href: "https://magicui.design",
				},
				{
					type: "Source",
					href: "https://github.com/magicuidesign/magicui",
				},
			],
			image: "",
			video: "https://cdn.magicui.design/bento-grid.mp4",
		},
		{
			title: "llm.report",
			href: "https://llm.report",
			dates: "April 2023 - September 2023",
			active: true,
			description:
				"Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
			technologies: [
				"Next.js",
				"Typescript",
				"PostgreSQL",
				"Prisma",
				"TailwindCSS",
				"Shadcn UI",
				"Magic UI",
				"Stripe",
				"Cloudflare Workers",
			],
			links: [
				{
					type: "Website",
					href: "https://llm.report",
				},
				{
					type: "Source",
					href: "https://github.com/dillionverma/llm.report",
				},
			],
			image: "",
			video: "https://cdn.llm.report/openai-demo.mp4",
		},
		{
			title: "Automatic Chat",
			href: "https://automatic.chat",
			dates: "April 2023 - March 2024",
			active: true,
			description:
				"Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
			technologies: [
				"Next.js",
				"Typescript",
				"PostgreSQL",
				"Prisma",
				"TailwindCSS",
				"Shadcn UI",
				"Magic UI",
				"Stripe",
				"Cloudflare Workers",
			],
			links: [
				{
					type: "Website",
					href: "https://automatic.chat",
				},
			],
			image: "",
			video:
				"https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
		},
	],
};
