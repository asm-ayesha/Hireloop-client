"use client";

import Link from "next/link";

// Gravity Icons SVGs (inline since gravity icons are used via SVG/component)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerLinks = {
  Product: [
    { label: "Job discovery", href: "#" },
    { label: "Worker AI", href: "#" },
    { label: "Companies", href: "#" },
    { label: "Salary data", href: "#" },
  ],
  Navigations: [
    { label: "Help center", href: "#" },
    { label: "Career library", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "#" },
    { label: "Newsroom", href: "#" },
  ],
};

const socialLinks = [
  {
    icon: <FacebookIcon />,
    href: "#",
    label: "Facebook",
    bg: "bg-[#1a1a2e]",
  },
  {
    icon: <PinterestIcon />,
    href: "#",
    label: "Pinterest",
    bg: "bg-[#6a0572]",
  },
  {
    icon: <LinkedInIcon />,
    href: "#",
    label: "LinkedIn",
    bg: "bg-[#1a1a2e]",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d0d14] text-white w-full">
      {/* Top divider */}
      <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-1 w-fit">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-[#3b82f6]">hire</span>
                <span className="text-[#f97316]">l</span>
                <span className="relative inline-block">
                  {/* Animated loop icon */}
                  <svg
                    width="48"
                    height="24"
                    viewBox="0 0 48 24"
                    className="inline-block align-middle"
                  >
                    <ellipse
                      cx="16"
                      cy="12"
                      rx="10"
                      ry="7"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2.5"
                    />
                    <ellipse
                      cx="32"
                      cy="12"
                      rx="10"
                      ry="7"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                    <circle cx="16" cy="9" r="2.5" fill="#f97316" />
                    <circle cx="32" cy="15" r="2.5" fill="#3b82f6" />
                  </svg>
                </span>
                <span className="text-[#f97316]">p</span>
              </span>
            </Link>

            <p className="text-sm text-white/50 leading-relaxed max-w-55">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-[#f97316]">
                {category === "Navigations"
                  ? "Navigations"
                  : category === "Resources"
                  ? "Resources"
                  : "Product"}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={`
                  w-9 h-9 rounded-lg flex items-center justify-center
                  ${social.bg} text-white/70 hover:text-white
                  border border-white/10 hover:border-white/30
                  transition-all duration-200 hover:scale-105
                `}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 text-xs text-white/40">
            <span>Copyright 2024 – Programming Hero</span>
            <div className="hidden sm:block h-3 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="hover:text-white/70 transition-colors duration-200"
              >
                Terms &amp; Policy
              </Link>
              <span>·</span>
              <Link
                href="#"
                className="hover:text-white/70 transition-colors duration-200"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}