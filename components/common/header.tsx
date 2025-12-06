import { FileText, Crown } from "lucide-react";
import React from "react";
import NavLink from "./nav-link";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { getUserSubscription } from "@/actions/get-user-subscription";
import { Badge } from "@/components/ui/badge";

const Header = async () => {
  const subscriptionData = await getUserSubscription();
  const isPro = subscriptionData.isSubscribed && subscriptionData.planId === "pro";

  return (
    <nav className="continer flex justify-between items-center px-4 py-4 md:px-8 md:py-8">
      <div>
        <Link href="/" className="flex gap-1">
          <FileText />
          <span className="font-extrabold">PDF GLOW</span>
        </Link>
      </div>
      
      <div className="flex gap-1 md:gap-10 flex-col md:flex-row">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </SignedIn>
      </div>

      <div className="flex flex-col md:flex-row">
        <SignedIn>
          <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-center justify-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            
            {/* Pro Badge ya Buy Plan */}
            {isPro ? (
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-0 gap-1 animate-pulse">
                <Crown size={14} className="fill-white" />
                Pro
              </Badge>
            ) : (
              <Link href="/#pricing">
                <Badge className="bg-rose-100 text-rose-600 border border-rose-300 hover:bg-rose-200 cursor-pointer">
                  Buy Plan
                </Badge>
              </Link>
            )}
            
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href="/sign-in">Sign in</NavLink>
          {/* <NavLink href="/sign-up">Sign up</NavLink> */}
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;