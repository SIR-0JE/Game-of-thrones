// app/result/page.tsx
import { Suspense } from "react";
import ResultContent from "./ResultContent";

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0c29 100%)' }}>
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        <div className="relative z-20 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl font-bold drop-shadow-lg">Loading your house assignment...</p>
        </div>
      </main>
    }>
      <ResultContent />
    </Suspense>
  );
}