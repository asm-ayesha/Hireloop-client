"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data:session, isPending} =useSession();
  // console.log("session data in Navbar:", session, "is pending ", isPending)

  const user = session?.user;

  const handleSignOut =async()=>{
    await signOut()
  }


  const links = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-violet-600 font-bold text-white">
              H
            </div>

            <div className="flex items-center text-2xl font-bold">
              <span className="text-blue-500">hire</span>
              <span className="text-orange-500">loop</span>
            </div>
          </Link>

          <div className="flex">
            {/* Desktop Nav */}
          <ul className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Vertical Divider */}
          <div className="hidden lg:block mx-6 h-6 w-px self-center  bg-white/20" />

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {user ?  
           <>
           Hi, {user.name}!
           <Button onClick={handleSignOut} variant="ghost" >SignOut</Button>
           </>
           :<Link
              href={'/auth/signin'}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Sign In
            </Link>}

            <Link
              href={'/auth/signup'}
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${isMenuOpen
              ? "max-h-125 border-t border-white/10 py-5"
              : "max-h-0"
            }`}
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-slate-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

           {/* horizental Divider */}
          <div className="block lg:hidden my-4 h-px w-full bg-white/20" />

          <div className="mt-6 flex flex-col gap-3">
           {user ?  
           <>
           Hi, {user.name}!
           <Button onClick={handleSignOut}  variant="ghost" >SignOut</Button>
           </>
           : <Link
              href={'/auth/signin'}
              className="rounded-xl border border-white/10 px-4 py-3 text-center text-slate-300"
            >
              Sign In
            </Link>}

            <Link
              href={'/auth/signup'}
              className="rounded-xl bg-violet-600 px-4 py-3 text-center font-medium text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}