import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "clamp-xs": "clamp(0.75rem, 2vw, 0.875rem)",
        "clamp-sm": "clamp(0.875rem, 2.5vw, 1rem)",
        "clamp-base": "clamp(1rem, 3vw, 1.125rem)",
        "clamp-lg": "clamp(1.125rem, 3.5vw, 1.25rem)",
        "clamp-xl": "clamp(1.25rem, 4vw, 1.5rem)",
        "clamp-2xl": "clamp(1.5rem, 5vw, 2rem)",
        "clamp-3xl": "clamp(1.875rem, 6vw, 2.5rem)",
        "clamp-4xl": "clamp(2.25rem, 7vw, 3rem)",
        "clamp-5xl": "clamp(3rem, 8vw, 4rem)",
        "39px": "39px",
        "20px": "20px",
      },
      maxWidth: {
        "text-mobile": "90%",
        "text-desktop": "70%",
      },
      colors: {
        // iDATA Brand colors
        idata: {
          primary: "#1A2980",
          blue: "#0065B3",
          teal: "#00B5AD",
          text: "#1A1A1A",
          active: "#00B5AD",
        },
        // Brand colors
        brand: {
          primary: "#0065B3",
          secondary: "#0078D7",
          accent: "#0097B2",
          blue: {
            deep: "#0063B2",
            main: "#0088C5",
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(90deg, #1A2980, #0065B3, #00B5AD)",
        "gradient-brand-dark":
          "linear-gradient(90deg, #1A2980, #0065B3, #00B5AD)",
        "gradient-hero": "linear-gradient(90deg, #1A2980, #0065B3, #00B5AD)",
        "gradient-icon": "linear-gradient(90deg, #1A2980, #0065B3, #00B5AD)",
        "gradient-footer":
          "linear-gradient(to right, #0f172a, #1e293b, #334155)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
