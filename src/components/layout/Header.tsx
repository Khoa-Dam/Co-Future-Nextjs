"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ConnectButton } from "@mysten/dapp-kit";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="border border-transparent [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
    >
      <ScrollProgress />

      <div className="flex items-center  justify-between z-2 relative md:bg-transparent ">
        <Link
          href="/"
          className=" lg:px-20  items-center justify-center border-1 border-white  "
        >
          <Image
            src="/images/logo/logo.png"
            alt="Smurf Dashboard"
            width={100}
            height={100}
          />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-5 lg:gap-10 uppercase bg-transparent ml-10 transition-colors ">
          <Link
            href="/"
            className="hover:border-1 hover:border-black transition-all duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/send"
            className="hover:border-1 hover:border-black transition-all duration-300"
          >
            Send Capsule
          </Link>
          <Link
            href="/capsules"
            className="hover:border-1 hover:border-black transition-all duration-300"
          >
            My Capsules
          </Link>
        </div>

        {/* Desktop LET'S TALK button */}
        <div className="hidden md:flex md:flex-row md:text-sm lg:text-[14px] items-center  px-5 h-10 font-semibold mr-20 ml-20 flex-row-reverse cursor-pointer">
          <ConnectButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-none border-none  cursor-pointer z-10 p-4"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 ${
          isMenuOpen ? "right-0" : "right-[-100%]"
        } w-full h-screen bg-black/95 z-100 transition-right duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center justify-between h-full p-8 gap-8">
          <Link
            href="/"
            className={`flex justify-center text-2xl font-medium text-[#ffdfbf] no-underline uppercase text-center transition-colors duration-300 ease-in-out ${
              pathname === "/" ? "" : ""
            }`}
            onClick={toggleMenu}
          >
            <Image
              src="/images/logo/logo.png"
              alt="Smurf Dashboard"
              width={200}
              height={200}
            />
          </Link>
          <Link
            href="/"
            className={`text-2xl font-medium no-underline uppercase text-center transition-colors duration-300 ease-in-out ${
              pathname === "/" ? "" : "text-[#ffdfbf]"
            }`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/project"
            className={`text-2xl font-medium no-underline uppercase text-center transition-colors duration-300 ease-in-out ${
              pathname === "/project" ? "" : "text-[#ffdfbf]"
            }`}
            onClick={toggleMenu}
          >
            Projects
          </Link>
          <div className="hidden md:flex md:flex-row md:text-sm lg:text-[14px] items-center  px-5 h-10 font-semibold mr-20 ml-20 flex-row-reverse cursor-pointer">
            <ConnectButton />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
