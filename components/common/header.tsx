import { FileText } from "lucide-react";
import React from "react";
import NavLink from "./nav-link";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="continer flex justify-between items-center px-4 py-4 md:px-8 md:py-8">
      <div className="">
        <Link href={"/"} className="flex gap-1">
          <FileText />
          <span className="font-extrabold">PDF GLOW</span>
        </Link>
      </div>
      <div className="flex gap-1 md:gap-10 flex-col md:flex-row">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
      </div>
    </nav>
  );
};

export default Header;
