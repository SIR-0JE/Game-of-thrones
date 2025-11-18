"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HOUSE_CONFIG } from "@/config/houses";

const LEVELS = ["100", "200", "300", "400"];
const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Cyber Security",
  "Mass Communication",
];

const DEPARTMENT_CODE_MAP: Record<string, string> = {
  "computer science": "CSC",
  "information technology": "IFT",
  "software engineering": "SEN",
  "cyber security": "CYB",
  "mass communication": "MAS",
};

const getDepartmentCode = (department: string): string | undefined =>
  DEPARTMENT_CODE_MAP[department.trim().toLowerCase()];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    department: "",
    matricNumber: "",
  });
  const [registered, setRegistered] = useState(false);
  const selectedDepartmentCode = formData.department
    ? getDepartmentCode(formData.department)
    : undefined;
  const matricPlaceholder = selectedDepartmentCode
    ? `Example: BU22${selectedDepartmentCode}1068`
    : "Enter your matric number";

  useEffect(() => {
    // Block form if already registered in localStorage
    if (typeof window !== 'undefined' && localStorage.getItem('registered_once')) {
      setRegistered(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Mark as registered in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('registered_once', 'yes');
      }
      setRegistered(true);
      router.push(`/result?id=${data.student._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="bg-amber-50/90 border-4 border-amber-800/50 rounded-2xl p-8 shadow-2xl text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Already Completed</h2>
          <p className="text-gray-700 mb-4">You have already completed your registration on this device/browser.</p>
          <p className="text-amber-600 font-semibold">If you believe this is a mistake, reach out to the Sports Director.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Enhanced Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #0f0c29 100%)',
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0YzAtMy4zMTctMi42ODMtNi02LTZzLTYgMi42ODMtNiA2IDIuNjgzIDYgNiA2IDYtMi42ODMgNi02em0tMjQtMTRjMC0zLjMxcy0yLjY4My02LTYtNnMtNiAyLjY4My02IDYgMi42ODMgNiA2IDYgNi0yLjY4MyA2LTZ6bTI0IDBjMC0zLjMxNy0yLjY4My02LTYtNnMtNiAyLjY4My02IDYgMi42ODMgNiA2IDYgNi0yLjY4MyA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
      </div>

      {/* Animated House Banners - Mobile Optimized */}
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-center gap-1 md:gap-4 p-2 md:p-4 opacity-40">
        {Object.entries(HOUSE_CONFIG).map(([key, house], index) => (
          <div
            key={key}
            className="w-8 h-8 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-sm animate-float"
            style={{ 
              backgroundColor: house.hex + "40",
              animationDelay: `${index * 0.5}s`
            }}
          >
            <img
              src={house.image}
              alt={house.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-4xl">
        {/* Enhanced Title Section - Mobile Optimized */}
        <div className="text-center mb-6 md:mb-12 animate-fade-in px-2">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="h-1 w-8 md:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <span className="text-amber-400 text-xl md:text-3xl">⚔</span>
            <div className="h-1 w-8 md:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-3 md:mb-4 text-medieval drop-shadow-2xl bg-gradient-to-b from-amber-200 to-amber-400 bg-clip-text text-transparent leading-tight">
            Game of Thrones
          </h1>
          
          <p className="text-amber-300 text-xl md:text-4xl font-bold mb-4 md:mb-6 drop-shadow-lg tracking-wider">
            NACOS x NAMACOS
          </p>
          
          <p className="text-gray-300 text-base md:text-2xl font-medium drop-shadow-lg max-w-2xl mx-auto leading-relaxed px-2">
            Embark on an epic journey. Discover your house allegiance and join the tournament of the year!
          </p>
        </div>

        {/* Mobile: Full width cards stacked vertically */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Registration Form - Full width on mobile */}
          <div className="w-full lg:col-span-2">
            <div className="bg-amber-50/90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-amber-800/50 relative overflow-hidden">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 opacity-10">
                <div className="w-full h-full border-l-4 border-t-4 border-amber-800 rounded-tl-2xl"></div>
              </div>
              <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 opacity-10">
                <div className="w-full h-full border-r-4 border-t-4 border-amber-800 rounded-tr-2xl"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 opacity-10">
                <div className="w-full h-full border-l-4 border-b-4 border-amber-800 rounded-bl-2xl"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 md:w-20 md:h-20 opacity-10">
                <div className="w-full h-full border-r-4 border-b-4 border-amber-800 rounded-br-2xl"></div>
              </div>
              
              <div className="relative z-10 p-4 md:p-8">
                {/* Enhanced Form Header */}
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-full mb-3 md:mb-4 shadow-lg">
                    <span className="text-lg md:text-xl">📜</span>
                    <h2 className="text-lg md:text-3xl font-bold text-medieval">
                      Join the Tournament
                    </h2>
                    <span className="text-lg md:text-xl">⚔</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-lg font-medium">
                    Register now to be assigned to your noble house
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid gap-4 md:gap-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wider flex items-center gap-2"
                      >
                        <span className="text-amber-600 text-base">👤</span>
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-white/90 border-2 border-gray-400 rounded-lg md:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-600 outline-none transition-all font-medium text-gray-900 shadow-inner hover:border-amber-500 text-base"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Level Field */}
                      <div>
                        <label
                          htmlFor="level"
                          className="block text-sm font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wider flex items-center gap-2"
                        >
                          <span className="text-amber-600 text-base">🎓</span>
                          Level
                        </label>
                        <select
                          id="level"
                          required
                          value={formData.level}
                          onChange={(e) =>
                            setFormData({ ...formData, level: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-3 md:py-4 bg-white/90 border-2 border-gray-400 rounded-lg md:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-600 outline-none transition-all font-medium text-gray-900 shadow-inner appearance-none cursor-pointer hover:border-amber-500 text-base"
                        >
                          <option value="">Select your level</option>
                          {LEVELS.map((level) => (
                            <option key={level} value={level}>
                              Level {level}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Department Field */}
                      <div>
                        <label
                          htmlFor="department"
                          className="block text-sm font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wider flex items-center gap-2"
                        >
                          <span className="text-amber-600 text-base">🏛</span>
                          Department
                        </label>
                        <select
                          id="department"
                          required
                          value={formData.department}
                          onChange={(e) =>
                            setFormData({ ...formData, department: e.target.value })
                          }
                          className="w-full px-3 md:px-4 py-3 md:py-4 bg-white/90 border-2 border-gray-400 rounded-lg md:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-600 outline-none transition-all font-medium text-gray-900 shadow-inner appearance-none cursor-pointer hover:border-amber-500 text-base"
                        >
                          <option value="">Select department</option>
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Matric Number Field */}
                    <div>
                      <label
                        htmlFor="matricNumber"
                        className="block text-sm font-bold text-gray-900 mb-2 md:mb-3 uppercase tracking-wider flex items-center gap-2"
                      >
                        <span className="text-amber-600 text-base">🔢</span>
                        Matric Number
                      </label>
                      <input
                        type="text"
                        id="matricNumber"
                        value={formData.matricNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, matricNumber: e.target.value.toUpperCase() })
                        }
                        className="w-full px-3 md:px-4 py-3 md:py-4 bg-white/90 border-2 border-gray-400 rounded-lg md:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-600 outline-none transition-all font-medium text-gray-900 shadow-inner hover:border-amber-500 text-base"
                        placeholder={matricPlaceholder}
                      />
                      <p className="mt-2 text-xs text-gray-600 font-medium">
                        {selectedDepartmentCode
                          ? `Required format: BUXX${selectedDepartmentCode}XXXX (e.g. ${matricPlaceholder.split(": ")[1]})`
                          : "Required format: BUXXDEPTXXXX once you select a department."}
                      </p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-100 border-4 border-red-600 text-red-900 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl flex items-center gap-2 md:gap-3 font-bold animate-shake">
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base">{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white py-4 md:py-5 rounded-lg md:rounded-xl font-bold text-lg md:text-xl uppercase tracking-wider hover:from-amber-700 hover:via-amber-800 hover:to-amber-900 focus:outline-none focus:ring-4 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-amber-900/50 transform hover:-translate-y-1 hover:scale-105 border-4 border-amber-900/50 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 md:h-6 md:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span className="text-sm md:text-base">Processing...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xl md:text-2xl">⚔</span>
                          <span className="text-sm md:text-base">Claim Your House</span>
                          <span className="text-xl md:text-2xl">🏰</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar Information Cards - Full width on mobile */}
          <div className="w-full lg:col-span-1 space-y-6">
            {/* Houses Card */}
            <div className="bg-amber-50/90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-amber-800/50 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center text-medieval">
                Great Houses of Westeros
              </h3>
              <div className="space-y-4">
                {Object.entries(HOUSE_CONFIG).map(([key, house]) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-amber-800/30 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all group"
                  >
                    <div 
                      className="w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ borderColor: house.hex }}
                    >
                      <img
                        src={house.image}
                        alt={house.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">
                        {house.name}
                      </p>
                    </div>
                    <span className="text-lg flex-shrink-0">
                      {house.emoji}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-amber-50/90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-amber-800/50 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center text-medieval">
                🎯 How It Works
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-lg flex-shrink-0 mt-0.5">📝</span>
                  <div>
                    <p className="font-semibold text-gray-900">Register Your Details</p>
                    <p className="text-gray-600 mt-1">Fill in your information to begin your journey</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-lg flex-shrink-0 mt-0.5">🎲</span>
                  <div>
                    <p className="font-semibold text-gray-900">Random House Assignment</p>
                    <p className="text-gray-600 mt-1">Get assigned to Stark, Targaryen, Lannister, Baratheon, or Greyjoy</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-lg flex-shrink-0 mt-0.5">📱</span>
                  <div>
                    <p className="font-semibold text-gray-900">Join House Group</p>
                    <p className="text-gray-600 mt-1">Connect with your house members via WhatsApp</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-lg flex-shrink-0 mt-0.5">⚔</span>
                  <div>
                    <p className="font-semibold text-gray-900">Compete & Win</p>
                    <p className="text-gray-600 mt-1">Participate in events to bring glory to your house</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-800/20 mt-4">
                  <p className="text-xs text-gray-600 text-center font-medium">
                    🏆 One house will claim the Iron Throne!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-8 md:mt-12 text-center px-2">
          <p className="text-gray-400 text-xs md:text-sm font-medium">
            ⚔ May the best house win the Iron Throne! ⚔
          </p>
        </div>
      </div>
    </main>
  );
}