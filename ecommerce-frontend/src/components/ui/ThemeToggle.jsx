import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

const ThemeToggle = () => {
	const [dark, setDark] =
		useState(localStorage.getItem("theme") === "dark");

	useEffect(() => {
		if (dark) document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	}, []);

	const toggleTheme = () => {
		const newTheme = !dark ? "dark" : "light";
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark");
		setDark(!dark);
	};

	return (
		<Button
		variant="outline"
			onClick={toggleTheme}
		>
			{dark ? <Moon /> : <Sun />}
		</Button>
	);
};

export default ThemeToggle;
