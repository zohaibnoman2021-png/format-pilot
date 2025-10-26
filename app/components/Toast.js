"use client";
import { useState, useEffect } from "react";

export default function Toast({ message, type = "info", duration = 1500 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-indigo-600";

  const icon =
    type === "success"
      ? "✅"
      : type === "error"
      ? "⚠️"
      : "ℹ️";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-lg transform transition-all duration-300 animate-fade-in-up ${bgColor}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium text-sm">{message}</span>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
