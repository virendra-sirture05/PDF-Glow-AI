import { log } from "console";
import { FileText } from "lucide-react";

import React from "react";

import NavLink from "./nav-link";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

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

        <SignedIn>
          {" "}
          <NavLink href={"/dashboard"}>Dashboard</NavLink>
        </SignedIn>
      </div>
      <div className="flex flex-col md:flex-row">
        <SignedIn>
          <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-center justify-center">
            <NavLink href={"/upload"}>Upload a PDF</NavLink>
            <div>Pro</div>
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href={"/sign-in"}>Sign in</NavLink>
          <NavLink href="/sign-up">Sign up</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
