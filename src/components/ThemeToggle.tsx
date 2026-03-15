import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  iconClassName?: string;
};

const ThemeToggle = ({ className, iconClassName }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const darkModeEnabled = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(darkModeEnabled ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/75 text-foreground transition duration-300 hover:border-gold hover:text-gold",
        className,
      )}
      aria-label="Toggle theme"
    >
      {darkModeEnabled ? <Sun className={cn("h-4 w-4", iconClassName)} /> : <Moon className={cn("h-4 w-4", iconClassName)} />}
    </button>
  );
};

export default ThemeToggle;