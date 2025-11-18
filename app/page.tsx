"use client";

import { HOUSE_CONFIG } from "@/config/houses";

export default function MaintenancePage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-md text-center">
        {/* Maintenance Icon */}
        <div className="mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full border-2 border-amber-400/50">
            <span className="text-4xl">🏰</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
          Under Maintenance
        </h1>

        {/* Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mb-6">
          <p className="text-gray-200 text-lg mb-4">
            The tournament grounds are currently being upgraded for an even better experience.
          </p>
          <p className="text-amber-300 font-semibold">
            We'll be back soon with exciting new features!
          </p>
        </div>

        {/* Houses Preview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <p className="text-gray-300 text-sm mb-4">Great Houses Awaiting</p>
          <div className="flex justify-center gap-3">
            {Object.entries(HOUSE_CONFIG).map(([key, house]) => (
              <div
                key={key}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20"
                style={{ borderColor: house.hex }}
              >
                <img
                  src={house.image}
                  alt={house.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p className="text-gray-400 text-sm">
            ⚔️ NACOS x NAMACOS Tournament ⚔️
          </p>
        </div>
      </div>
    </main>
  );
}