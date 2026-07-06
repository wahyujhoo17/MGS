'use client';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-offwhite text-navy p-6">
      {/* Brutalist Style Loading Box */}
      <div className="w-64 bg-white border-2 border-navy p-6 text-center shadow-lg relative overflow-hidden">
        {/* Top Accent Strip */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-royal animate-pulse"></div>
        <div className="font-display font-bold text-2xl uppercase tracking-wider mb-4">
          Memuat Data
        </div>
        {/* Animated Bar */}
        <div className="w-full h-4 bg-offwhite border border-concrete relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-royal w-1/2 animate-[loading-bar_1.5s_infinite_ease-in-out]"></div>
        </div>
      </div>

      {/* Inject custom CSS for the loading keyframes just in case tailwind animation config doesn't have it */}
      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
