"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Buttons from "@/Component/Buttons";

import Logo from "@/public/logo/logo.jpg";
import { label } from "framer-motion/client";

type NavItem = {
  label: string;
  href: string,
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },

  { label: "About", href: "/About" },
  { label: "Services", href: "/Service" },
  { label: "Blog", href: "/blog" },

]


export default function Navbar() {



  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<boolean>(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <header
      className={`fixed top-0 inset-x-0      z-50 transition-all duration-300 ${scrolled ? "bg-black shadow-md" : ""
        }`}
    >
      {/* NAVBAR */}
      <nav
        className=" max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-18 lg:h-20 px-4 sm:px-6 lg:px-12 "
      >
        {/* LOGO */}
        <Image
          src={Logo.src}
          alt="Logo"
          width={220}
          height={120}
          priority
          className=" w-[130px] sm:w-[160px] lg:w-[200px] h-auto object-contain "
        />

        {/* DESKTOP MENU */}
        <ul
          className=" hidden md:flex items-center gap-6 lg:gap-10 text-base lg:text-lg font-medium "
        >{navItems.map((item, index) => (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-md transition-all duration-300
                ${activeIndex === index
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-neutral-800"
                }
              `}
            >
              {item.label}
            </Link>
          </li>
        ))}
        </ul>

        {/* DESKTOP BUTTON */}
        <div className="hidden pb-10 md:block">
          <Buttons text="Let's Contact" link="/contact" />
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`  md:hidden  absolute top-full inset-x-0  bg-black text-white  transition-all duration-300 ease-in-out  overflow-hidden  ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col items-center gap-5 py-6 text-base sm:text-lg">
          <Link onClick={() => setMenuOpen(false)} href="/">Home</Link>

          <Link onClick={() => setMenuOpen(false)} href="/about">About</Link>
          <Link onClick={() => setMenuOpen(false)} href="/service">Services</Link>
          <Link onClick={() => setMenuOpen(false)} href="/blog">Blog</Link>

          <div className="pt-2 ">
            <Buttons text="Let's Contact" link="/contact" />
          </div>
        </ul>
      </div>
    </header>
  );
}
