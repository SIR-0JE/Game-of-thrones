"use client";

import { useState, useEffect } from "react";

export default function RegistrationClosed() {
  const [closedMessage, setClosedMessage] = useState<string>("Registration is currently closed.");

  useEffect(() => {
    fetch("/api/registration-status")
      .then((res) => res.json())
      .then((data) => {
        setClosedMessage(data.message || "Registration is currently closed.");
      })
      .catch(() => {
        setClosedMessage("Registration is currently closed.");
      });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-900 via-purple-900 to-blue-900">
      <div className="bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-2xl p-8 shadow-2xl text-center max-w-md w-full">
        <div className="mb-6">
          <span className="text-6xl">🔒</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Registration Closed</h2>
        <p className="text-white/80 mb-6 text-lg">{closedMessage}</p>
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm text-white/60">Contact the Sports Director for more information.</p>
        </div>
      </div>
    </main>
  );
}
