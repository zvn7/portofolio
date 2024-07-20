import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/context/ThemeProvider";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button
			variant="ghost"
			type="button"
			size="icon"
			className="px-2"
			onClick={handleThemeToggle}
		>
			<SunIcon
				className={`h-[1.2rem] w-[1.2rem] text-neutral-800 ${
					theme === "dark" ? "hidden" : "block"
				}`}
			/>
			<MoonIcon
				className={`h-[1.2rem] w-[1.2rem] text-neutral-400 ${
					theme === "dark" ? "block" : "hidden"
				}`}
			/>
		</Button>
	);
}
