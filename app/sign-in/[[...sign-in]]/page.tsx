import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="relative flex justify-center items-center mx-auto lg:min-h-[40vh] overflow-hidden ">
      {/* Background Gradient - adjusted positioning */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
          className={cn(
            "relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-rose-400 via-rose-300 to-orange-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.25rem]"
          )}
        />
      </div>

      {/* Clerk Component */}
      <div className="py-8 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 relative z-0">
        <SignIn />
      </div>
    </section>
  );
}