import { Moon, Sun, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/store/useAuthStore";
import { DropDown } from "../DropDown";
import api from "@/api/axios";
import API_PATHS from "@/utils/apiPaths";
import { toast } from "sonner";

const NavBar = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [togglePosition, setTogglePosition] = useState({ left: 0, opacity: 0 });
  const lightBtnRef = useRef<HTMLButtonElement>(null);
  const darkBtnRef = useRef<HTMLButtonElement>(null);
  const { user, theme, setTheme, clearAuth } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      theme: state.theme,
      setTheme: state.setTheme,
      clearAuth: state.clearAuth,
    })),
  );

  const links = [
    { name: "home", to: `/user/${user.id}` },
    { name: "categories", to: "/categories" },
    { name: "about", to: "/about" },
    { name: "contact", to: "/contact" },
  ];

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

  const handleLogout = async () => {
    try {
      await api.post(API_PATHS.AUTH.LOGOUT);
      clearAuth();
      navigate("/login", { replace: true });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  const fullname = `${user?.last_name} ${user?.first_name}`;
  return (
    <header className="flex items-center justify-center w-full bg-background/90 backdrop-blur-3xl px-4 lg:px-0 fixed top-0 left-0 border-b border-border">
      <nav className="flex items-center justify-between font-heading w-full md:max-w-4xl xl:max-w-6xl py-3">
        <Link
          to={"/home"}
          className="flex items-center justify-center text-md font-semibold bg-background/90 border border-border text-white rounded-full h-9.5 px-4"
        >
          <h5 className="text-white mix-blend-difference">Kindled.</h5>
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
                    left: el.offsetLeft,
                  });
                }}
                onMouseLeave={() =>
                  setPosition((prev) => ({ ...prev, opacity: 0 }))
                }
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${isActive ? "bg-brand text-secondary" : "bg-transparent"} py-1 px-4 rounded-full inline-block`
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
              opacity: position.opacity,
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
                opacity: togglePosition.opacity,
              }}
              className="absolute size-7 bg-brand rounded-full transition-all duration-300 ease-spring"
            />
          </div>
          {user && (
            <div className="bg-background/90 border border-border rounded-full leading-1 flex items-center justify-center">
              <div className="grid items-center justify-center text-secondary">
                <DropDown
                  data={{
                    label: "My Account",
                    trigger: (
                      <button className="uppercase h-9.5 flex items-center gap-1 pl-1 pr-2 overflow-hidden cursor-pointer">
                        <span className="size-8 bg-brand rounded-full grid place-content-center">
                          <User size={16} className="text-secondary" />
                        </span>
                        <div className="w-16">
                          <h4 className="capitalize text-xs font-medium line-clamp-1">
                            {fullname}
                          </h4>
                          <span className="block text-[11px] leading-3 lowercase line-clamp-1 text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </button>
                    ),
                    logout: handleLogout,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
