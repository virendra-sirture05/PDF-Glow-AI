import { Upload, Sparkles, FileText, MoveRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      icon: Upload,
      title: "Upload PDF",
      description: "Drag and drop or browse to upload",
    },
    {
      id: 2,
      icon: Sparkles,
      title: "AI Analysis",
      description: "AI processes your document instantly",
    },
    {
      id: 3,
      icon: FileText,
      title: "Get Summary",
      description: "Receive key insights in seconds",
    },
  ];

  return (
    <section className="py-10 px-4 my-20">

      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-muted-foreground text-base">
            Get your summary in three simple steps
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div className="relative flex-1">
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                    {/* Step Number */}
                    {/* <div className="absolute -top-2.5 -left-2.5 w-7 h-7 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                      {step.id}
                    </div> */}

                    {/* Icon */}
                    <div className="mb-3 flex justify-center">
                      <Icon
                        size={44}
                        className="text-rose-600"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-1.5 text-center">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm text-center">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <MoveRight
                    className="text-rose-600 hidden md:block"
                    size={22}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}