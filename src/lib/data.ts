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
			title: "Resep API",
			href: "https://github.com/zvn7/api-resep",
			dates: "Agustus 2024",
			active: true,
			description:
				"API untuk mengelola resep masakan, lengkap dengan autentikasi JWT dan upload gambar menggunakan ImageKit.",
			technologies: [
				"Node JS",
				"Express",
				"JWT",
				"Image Kit",
				"MongoDB",
				"Mongoose",
			],
			category: "API",
			links: [
				{
					type: "Source",
					href: "https://github.com/zvn7/api-resep",
				},
			],
			image: "https://placehold.co/600x400",
			video: "",
		},
		{
			title: "E-Learning Template",
			href: "https://zvn7.github.io/e-learning/",
			dates: "Juli 2024",
			active: true,
			description:
				"Template website E-Learning yang dirancang dengan HTML, CSS, dan JavaScript, menggunakan Tailwind CSS untuk styling dan AlpineJS untuk interaktivitas. Template ini cocok untuk platform pembelajaran online dengan desain yang modern dan responsif.",
			technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "AlpineJS"],
			category: "Website",
			links: [
				{
					type: "Website",
					href: "https://zvn7.github.io/e-learning/",
				},
				{
					type: "Source",
					href: "https://github.com/zvn7/e-learning",
				},
			],
			image: "https://placehold.co/600x400",
			video: "",
		},
		{
			title: "Company Profile Astra Otoparts",
			href: "https://erizaanjelika.github.io/D9_Tugas_Kelompok2/",
			dates: "November 2023",
			active: true,
			description:
				"Website company profile untuk Astra Otoparts, dikembangkan sebagai tugas kelompok menggunakan HTML, CSS, JavaScript, dan framework Bootstrap. Proyek ini menampilkan informasi perusahaan dengan desain antarmuka yang dibuat menggunakan Figma.",
			technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Figma"],
			category: "Website",
			links: [
				{
					type: "Website",
					href: "https://erizaanjelika.github.io/D9_Tugas_Kelompok2/",
				},
				{
					type: "Source",
					href: "https://github.com/ErizaAnjelika/D9_Tugas_Kelompok2",
				},
			],
			image: "https://placehold.co/600x400",
			video: "",
		},
		{
			title: "Login Page",
			href: "https://zvn7.github.io/login-page/",
			dates: "Oktober 2023",
			active: true,
			description:
				"Halaman login sederhana menggunakan HTML, CSS, dan JavaScript, dirancang untuk otentikasi pengguna dengan UI yang responsif.",
			technologies: ["HTML", "CSS", "JavaScript"],
			category: "Website",
			links: [
				{
					type: "Website",
					href: "https://zvn7.github.io/login-page/",
				},
				{
					type: "Source",
					href: "https://github.com/zvn7/login-page",
				},
			],
			image: "https://placehold.co/600x400",
			video: "",
		},
		{
			title: "Todo List",
			href: "https://zvn7.github.io/todoapps/",
			dates: "Oktober 2023",
			active: true,
			description:
				"Aplikasi Todo List sederhana yang dibuat dengan HTML, CSS, JavaScript, dan Bootstrap. Aplikasi ini memungkinkan pengguna untuk menambahkan, mengedit, dan menghapus tugas-tugas mereka dengan antarmuka yang responsif.",
			technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
			category: "Website",
			links: [
				{
					type: "Website",
					href: "https://zvn7.github.io/todoapps/",
				},
				{
					type: "Source",
					href: "https://github.com/zvn7/todoapps",
				},
			],
			image: "https://placehold.co/600x400",
			video: "",
		},
	],
};
