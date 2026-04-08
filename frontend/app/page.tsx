import WaitlistForm from "@/components/WaitlistForm";
import FeatureBoard from "@/components/FeatureBoard";
import { Sparkles, Zap, Layers } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px] w-[60vw] h-[40vh] max-w-[800px]"></div>

      <div className="flex flex-col items-center justify-center w-full max-w-5xl px-6 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
          <Sparkles className="w-4 h-4" />
          <span>The Next Generation is Coming</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-zinc-50 to-zinc-500 mb-8 max-w-4xl">
          Build faster with the ultimate developer ecosystem.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12">
          We are building something extraordinary. Join the waitlist today to get early access, and vote on the features you want to see first.
        </p>

        <WaitlistForm />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-12" />

      <div className="flex flex-col flex-1 w-full max-w-5xl px-6 pb-32">
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between w-full mt-12">
          
          <div className="w-full md:w-1/3 flex flex-col gap-6 sticky top-24">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50">
              Help shape the roadmap
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              We listen to our community. Vote for the features you consider most critical, and we will prioritize shipping them first.
            </p>
            
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-md shrink-0">
                  <Zap className="h-4 w-4 text-blue-500" />
                </div>
                Real-time vote aggregation
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-md shrink-0">
                  <Layers className="h-4 w-4 text-blue-500" />
                </div>
                Automatic prioritization
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex justify-end">
            <FeatureBoard />
          </div>

        </div>
      </div>
    </main>
  );
}