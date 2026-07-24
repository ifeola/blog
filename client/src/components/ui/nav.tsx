import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/store/useAuthStore";

const links = [
	{ name: "trending", to: "/trending" },
	{ name: "latest", to: "/latest" },
	{ name: "all", to: "/all" },
	{ name: "features", to: "/features" },
	{ name: "about", to: "/about" },
	{ name: "contact", to: "/contact" }
];

const NavBar = () => {
	const [position, setPosition] = useState({
		left: 0,
		width: 0,
		opacity: 0
	});
	const [togglePosition, setTogglePosition] = useState({ left: 0, opacity: 0 });
	const lightBtnRef = useRef<HTMLButtonElement>(null);
	const darkBtnRef = useRef<HTMLButtonElement>(null);
	const { user, theme, setTheme } = useAuthStore(
		useShallow((state) => ({
			user: state.user,
			theme: state.theme,
			setTheme: state.setTheme
		}))
	);

	const toggleLightTheme = useCallback(() => {
		setTheme("light");
	}, [setTheme]);

	const toggleDarkTheme = useCallback(() => {
		setTheme("dark");
	}, [setTheme]);

	useEffect(() => {
		const getTheme = () => {
			document.documentElement.classList.toggle("dark", theme === "dark");
			localStorage.setItem("theme", theme);
		};
		getTheme();
	}, [theme]);

	useEffect(() => {
		const activeBtn =
			theme === "dark" ? darkBtnRef.current : lightBtnRef.current;
		if (activeBtn) {
			setTogglePosition({ left: activeBtn.offsetLeft, opacity: 1 });
		}
	}, [theme]);

	const fullname = `${user?.last_name} ${user?.first_name}`;
	return (
		<header className="flex items-center justify-center w-full bg-transparent px-2 md:px-0">
			<nav className="flex items-center justify-between font-heading w-full md:max-w-4xl xl:max-w-6xl py-3">
				<Link
					to={"/home"}
					className="flex items-center justify-center text-md font-semibold bg-background/90 border border-border text-white rounded-full h-9.5 px-4"
				>
					<h3 className="text-white mix-blend-difference">Logo.</h3>
				</Link>
				<ul className="relative flex items-center bg-background/90 backdrop-blur-lg border border-border rounded-full p-1">
					{links.map((link) => {
						return (
							<li
								className="text-sm capitalize font-medium text-white mix-blend-difference z-10"
								key={link.to}
								onMouseEnter={(e) => {
									const el = e.currentTarget;
									const { width } = el.getBoundingClientRect();
									setPosition({
										width,
										opacity: 1,
										left: el.offsetLeft
									});
								}}
								onMouseLeave={() =>
									setPosition((prev) => ({ ...prev, opacity: 0 }))
								}
							>
								<NavLink
									to={link.to}
									className={({ isActive }) =>
										`${isActive ? "bg-brand" : ""} py-1 px-4 bg-transparent rounded-full inline-block`
									}
								>
									{link.name}
								</NavLink>
							</li>
						);
					})}
					<div
						style={{
							width: position.width,
							left: position.left,
							opacity: position.opacity
						}}
						className="absolute h-7.5 bg-brand rounded-full transition-all duration-300 ease-spring"
					/>
				</ul>

				<div className="flex items-center justify-center gap-2">
					<div className="relative bg-background/90 border border-border rounded-full p-1 h-9.5 flex items-center justify-center">
						<button
							ref={lightBtnRef}
							className="flex items-center justify-center size-7 text-white mix-blend-difference z-10"
							onClick={() => toggleLightTheme()}
						>
							<Sun className="size-4" />
						</button>
						<button
							ref={darkBtnRef}
							className="flex items-center justify-center size-7 text-white mix-blend-difference z-10"
							onClick={() => toggleDarkTheme()}
						>
							<Moon className="size-4" />
						</button>
						<div
							style={{
								left: togglePosition.left,
								opacity: togglePosition.opacity
							}}
							className="absolute size-7 bg-brand rounded-full transition-all duration-300 ease-spring"
						/>
					</div>
					{user && (
						<div className="bg-background/90 border border-border rounded-full h-9.5 px-4 leading-1 flex items-center justify-center">
							<div className="grid items-center justify-center text-white mix-blend-difference ">
								<h4 className="capitalize text-xs font-medium">{fullname}</h4>
								<span className="text-[11px] inline-block leading-3">
									{user.email}
								</span>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
