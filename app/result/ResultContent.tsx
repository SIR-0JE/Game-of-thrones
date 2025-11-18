"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { HOUSE_CONFIG, HouseType } from "@/config/houses";

function ImageWithFallback({
  src,
  alt,
  emoji,
  className,
}: {
  src: string;
  alt: string;
  emoji: string;
  className: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`${className} flex items-center justify-center text-8xl`}>
        {emoji}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImgError(true)}
    />
  );
}

interface Student {
  name: string;
  level: string;
  department: string;
  house: HouseType;
}

const HOUSE_THEMES: Record<
  HouseType,
  {
    bgGradient: string;
    cardBg: string;
    textColor: string;
    borderColor: string;
    accentColor: string;
    overlayColor: string;
    decorativeElement: string;
  }
> = {
  stark: {
    bgGradient: "from-slate-100 via-slate-200 to-slate-300",
    cardBg: "bg-white/95 backdrop-blur-sm",
    textColor: "text-slate-800",
    borderColor: "border-slate-600/50",
    accentColor: "text-slate-700",
    overlayColor: "bg-white/10",
    decorativeElement: "❄️",
  },
  baratheon: {
    bgGradient: "from-amber-100 via-amber-200 to-yellow-300",
    cardBg: "bg-amber-50/95 backdrop-blur-sm",
    textColor: "text-amber-900",
    borderColor: "border-amber-700/50",
    accentColor: "text-amber-800",
    overlayColor: "bg-amber-500/10",
    decorativeElement: "⚡",
  },
  greyjoy: {
    bgGradient: "from-slate-800 via-slate-900 to-black",
    cardBg: "bg-slate-700/95 backdrop-blur-sm",
    textColor: "text-white",
    borderColor: "border-slate-500/50",
    accentColor: "text-slate-200",
    overlayColor: "bg-slate-600/20",
    decorativeElement: "🌊",
  },
  lannister: {
    bgGradient: "from-red-700 via-red-800 to-red-900",
    cardBg: "bg-red-600/95 backdrop-blur-sm",
    textColor: "text-white",
    borderColor: "border-red-400/50",
    accentColor: "text-red-200",
    overlayColor: "bg-red-500/20",
    decorativeElement: "🦁",
  },
  targaryen: {
    bgGradient: "from-rose-600 via-red-700 to-rose-800",
    cardBg: "bg-rose-600/95 backdrop-blur-sm",
    textColor: "text-white",
    borderColor: "border-rose-400/50",
    accentColor: "text-rose-200",
    overlayColor: "bg-rose-500/20",
    decorativeElement: "🔥",
  },
};

export default function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      setError("Invalid student ID");
      setLoading(false);
      return;
    }

    fetch(`/api/student?id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch student");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setStudent(data.student);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load student data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0c29 100%)",
        }}
      >
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        <div className="relative z-20 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl font-bold drop-shadow-lg">
            Loading your house assignment...
          </p>
        </div>
      </main>
    );
  }

  if (error || !student) {
    return (
      <main
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0c29 100%)",
        }}
      >
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        <div className="relative z-20 max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border-4 border-red-600/50">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-700 mb-6">{error || "Student not found"}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 font-bold transition-all shadow-lg"
          >
            Return to Registration
          </button>
        </div>
      </main>
    );
  }

  const houseConfig = HOUSE_CONFIG[student.house];
  const theme = HOUSE_THEMES[student.house];

  return (
    <main
      className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br ${theme.bgGradient}`}
    >
      {/* Enhanced Background with Dynamic Patterns */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, ${houseConfig.hex}15 0%, ${houseConfig.hex}10 25%, ${houseConfig.hex}05 50%, ${houseConfig.hex}10 75%, ${houseConfig.hex}15 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0YzAtMy4zMTctMi42ODMtNi02LTZzLTYgMi42ODMtNiA2IDIuNjgzIDYgNiA2IDYtMi42ODMgNi02em0tMjQtMTRjMC0zLjMxNy0yLjY4My02LTYtNnMtNiAyLjY4My02IDYgMi42ODMgNiA2IDYgNi0yLjY4MyA2LTZ6bTI0IDBjMC0zLjMxNy0yLjY4My02LTYtNnMtNiAyLjY4My02IDYgMi42ODMgNiA2IDYgNi0yLjY4MyA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className={`absolute inset-0 ${theme.overlayColor}`}></div>
      </div>

      {/* Enhanced Decorative Theme Elements */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-4xl opacity-20 animate-float ${
              student.house === "targaryen"
                ? "animate-flicker"
                : student.house === "greyjoy"
                ? "animate-wave"
                : student.house === "baratheon"
                ? "animate-sparkle"
                : "animate-float"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {theme.decorativeElement}
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-4xl w-full space-y-6">
        {/* Hero Section with Student Info */}
        <div
          className={`${theme.cardBg} rounded-2xl shadow-2xl border-4 p-8 md:p-12 text-center relative overflow-hidden ${theme.borderColor}`}
        >
          {/* Banner Accent */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: houseConfig.hex }}
          ></div>

          <div className="flex flex-col items-center space-y-6">
            {/* House Emblem */}
            <div
              className="w-32 h-32 rounded-full border-4 shadow-2xl animate-glow flex items-center justify-center text-6xl"
              style={{
                borderColor: houseConfig.hex,
                backgroundColor: houseConfig.hex + "20",
              }}
            >
              {houseConfig.emoji}
            </div>

            {/* Welcome Text */}
            <div className="space-y-3">
              <h1
                className={`text-4xl md:text-5xl font-bold text-medieval ${theme.textColor}`}
              >
                Welcome to House {houseConfig.name}!
              </h1>
              <div
                className="h-1 w-24 mx-auto rounded-full"
                style={{ backgroundColor: houseConfig.hex }}
              ></div>
            </div>

            {/* Student Info */}
            <div className="space-y-2">
              <p className={`text-2xl font-bold ${theme.textColor}`}>
                {student.name}
              </p>
              <div
                className={`flex items-center justify-center gap-4 text-lg ${theme.textColor} opacity-90`}
              >
                <span
                  className={`px-3 py-1 rounded-full ${theme.overlayColor} backdrop-blur-sm ${theme.accentColor}`}
                >
                  Level {student.level}
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${theme.overlayColor} backdrop-blur-sm ${theme.accentColor}`}
                >
                  {student.department}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* House Details Card */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sigil Card */}
          <div
            className={`${theme.cardBg} rounded-2xl shadow-2xl border-4 p-6 relative overflow-hidden ${theme.borderColor}`}
          >
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: houseConfig.hex }}
            ></div>

            <div className="text-center space-y-6">
              <h2 className={`text-2xl font-bold ${theme.textColor}`}>
                House Sigil
              </h2>

              <div
                className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 shadow-2xl animate-glow"
                style={{ borderColor: houseConfig.hex }}
              >
                <ImageWithFallback
                  src={houseConfig.image}
                  alt={houseConfig.name}
                  emoji={houseConfig.emoji}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className={`text-lg font-semibold ${theme.textColor}`}>
                {houseConfig.name}
              </p>
            </div>
          </div>

          {/* House Info Card */}
          <div
            className={`${theme.cardBg} rounded-2xl shadow-2xl border-4 p-6 relative overflow-hidden ${theme.borderColor}`}
          >
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: houseConfig.hex }}
            ></div>

            <div className="space-y-4">
              <h2 className={`text-2xl font-bold text-center ${theme.textColor}`}>
                House Details
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{houseConfig.emoji}</span>
                  <div>
                    <p className={`font-semibold ${theme.textColor}`}>
                      House {houseConfig.name}
                    </p>
                    <p className={`text-sm ${theme.accentColor}`}>
                      Your Allegiance
                    </p>
                  </div>
                </div>

                <div className={`h-px ${theme.overlayColor}`}></div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏰</span>
                  <div>
                    <p className={`font-semibold ${theme.textColor}`}>Great House</p>
                    <p className={`text-sm ${theme.accentColor}`}>Westeros</p>
                  </div>
                </div>

                <div className={`h-px ${theme.overlayColor}`}></div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚔️</span>
                  <div>
                    <p className={`font-semibold ${theme.textColor}`}>Ready for Battle</p>
                    <p className={`text-sm ${theme.accentColor}`}>
                      Join your house now!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Join Section */}
        <div
          className={`${theme.cardBg} rounded-2xl shadow-2xl border-4 p-6 md:p-8 relative overflow-hidden ${theme.borderColor}`}
        >
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: houseConfig.hex }}
          ></div>

          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className={`h-px w-12 ${theme.overlayColor}`}></div>
              <h3
                className={`font-bold text-xl flex items-center gap-3 ${theme.textColor}`}
              >
                <span className="text-2xl">📱</span>
                Join Your House Group
                <span className="text-2xl">📱</span>
              </h3>
              <div className={`h-px w-12 ${theme.overlayColor}`}></div>
            </div>

            <p className={`text-lg ${theme.accentColor}`}>
              Connect with your fellow {houseConfig.name} members and coordinate for
              the upcoming events!
            </p>

            <button
              type="button"
              onClick={() =>
                window.open(houseConfig.whatsapp, "_blank", "noopener,noreferrer")
              }
              onContextMenu={(e) => e.preventDefault()}
              className={`inline-flex items-center justify-center gap-3 w-full md:w-auto bg-gradient-to-r ${houseConfig.gradient} text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transition-all shadow-lg transform hover:-translate-y-1 hover:scale-105 border-4 min-h-[60px]`}
              style={{
                borderColor: houseConfig.hex + "80",
                boxShadow: `0 10px 30px ${houseConfig.hex}40`,
              }}
              aria-label={`Join ${houseConfig.name} WhatsApp Group`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Join {houseConfig.name} WhatsApp Group
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

