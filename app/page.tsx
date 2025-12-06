import BgGradient from "@/components/common/bg-gradient";
import CTASection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works";
import PricingSection from "@/components/home/pricing-section";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await currentUser();
    
    // ✅ User logged in hai to database me check/create karo
    if(user) {
        const loggedInUser = await prisma.user.findUnique({
            where:{
                clerkUserId : user.id
            }  
        })
        
        if(!loggedInUser){ 
            await prisma.user.create({
                data:{
                    full_name : `${user.firstName} ${user.lastName}`,
                    clerkUserId : user.id,
                    email : user.emailAddresses[0].emailAddress,
                }
            })
        }
    }
    
  return (
    <div className="relative w-full">
      <BgGradient />
      <div>
        <HeroSection />
        <DemoSection />
        <HowItWorksSection/>
        <PricingSection/>
        <CTASection/>
      </div>
      
     
    </div>
  );
}
