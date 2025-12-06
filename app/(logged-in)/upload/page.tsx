
import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import SubscriptionRequired from "@/components/upload/subscription-required";
import { itemVariants } from "@/utils/constants";
import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscription } from "@/actions/get-user-subscription";
export const dynamic = 'force-dynamic';

const Page = async () => {
  // Server-side subscription check
    const subscriptionData = await getUserSubscription();
    const isPro = subscriptionData.isSubscribed && subscriptionData.planId === "pro";
  // Agar subscription nahi hai, to block kar do
  if (!isPro) {
    return <SubscriptionRequired />;
  }

  return (
    <div>
      <BgGradient />
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        className="flex justify-center items-center flex-col gap-6"
      >
        <UploadHeader />
        <UploadForm />
      </MotionDiv>
    </div>
  );
};

export default Page;