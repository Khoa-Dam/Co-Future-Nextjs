"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Define animation variants (can reuse the same as homepage sections)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Footer = () => {
  const pathname = usePathname();
  const isProjectPage = pathname === "/project";

  return (
    <motion.div
      className="flex flex-col lg:flex-row justify-between bg-transparent text-brand-light gap-10 lg:gap-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className={`flex flex-col w-full lg:w-2/4 gap-5 ${
          isProjectPage ? "items-center" : ""
        }`}
      >
        {/* Logo - Only visible on Home page */}
        {isProjectPage && (
          <Image
            src="/images/logo/SMURF.png"
            alt="Smurf Dashboard"
            width={200}
            height={200}
            className="items-start"
          />
        )}

        {/* Conditionally render the heading and input section */}
        {!isProjectPage && (
          <>
            <h1 className="text-2xl font-semibold text-center lg:text-left">
              LEAVE YOUR EMAIL FOR US TO CONTACT AND COLLABORATE OUR PROJECT
            </h1>
            <div className="relative flex items-start w-full max-w-sm mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Enter address"
                className="w-full p-2 pr-10 border-b-1  border-[#FFDFBF] bg-transparent text-brand-light placeholder:text-brand-light/70 focus:outline-none"
              />
              <ArrowUpRight className="absolute right-1 cursor-pointer text-brand-light" />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 text-center lg:text-left xl:translate-x-50">
        <Link
          href="/"
          className="hover:text-opacity-80 hover:underline transition-colors duration-200"
        >
          X.com
        </Link>
        <Link
          href="/"
          className="hover:text-opacity-80 hover:underline transition-colors duration-200"
        >
          Telegram
        </Link>
        <Link
          href="/"
          className="hover:text-opacity-80 hover:underline transition-colors duration-200"
        >
          Facebook
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-center lg:text-left">
        <Link
          href="/"
          className="hover:text-opacity-80 hover:underline transition-colors duration-200"
        >
          Discord
        </Link>
        <Link
          href="/"
          className="hover:text-opacity-80 hover:underline transition-colors duration-200"
        >
          Youtube
        </Link>
      </div>
    </motion.div>
  );
};

export default Footer;
