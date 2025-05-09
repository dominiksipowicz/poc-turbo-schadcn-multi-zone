"use client";

import { useEffect, useState } from "react";
import { Phone, UserPlus, ArrowRight, Mic, Pause } from "lucide-react";

export default function CallPage() {
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMicAccess, setHasMicAccess] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Check if call is active
      const callStatus = localStorage.getItem("callStatus");
      if (callStatus !== "active") {
        // If call is not active, redirect to home
        window.location.href = "/";
        return;
      }

      // Set connected status
      setIsConnected(true);

      // Request microphone access
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setHasMicAccess(true);
          // In a real app, we would use the stream
          // For demo purposes, we'll just keep the stream active
        })
        .catch((err) => {
          console.error("Error accessing microphone:", err);
        });

      // Start timer
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      // Set up storage event listener for cross-tab communication
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "callStatus" && e.newValue !== "active") {
          // Call ended from another tab
          window.close();
        }
      };

      window.addEventListener("storage", handleStorageChange);

      // Update page title - only for call page
      document.title = "CALL IN PROGRESS";

      // Clean up
      return () => {
        clearInterval(timer);
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  const handleEndCall = () => {
    localStorage.setItem("callStatus", "inactive");
    window.close();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-gray-100 text-gray-800 p-4 flex justify-between items-center border-b border-gray-200">
        <button className="p-2">
          <span className="sr-only">Menu</span>
          <div className="space-y-1">
            <div className="w-5 h-0.5 bg-gray-800"></div>
            <div className="w-5 h-0.5 bg-gray-800"></div>
            <div className="w-5 h-0.5 bg-gray-800"></div>
          </div>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Voice Call</h1>
        <button className="p-2">
          <span className="sr-only">Expand</span>
          <ArrowRight className="h-5 w-5 transform rotate-45 text-gray-800" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 bg-white">
        <div className="text-center">
          <p className="text-2xl mb-4 text-gray-800">01191-(888) 292-2226</p>
          <div className="inline-block px-6 py-2 rounded-full bg-green-100 text-green-800 font-medium">
            Connected
          </div>
        </div>

        <div className="text-4xl font-mono text-gray-800">
          {formatTime(callDuration)}
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-md w-full">
          <div className="flex flex-col items-center">
            <button className="w-14 h-14 aspect-square rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-700 hover:bg-gray-50">
              <UserPlus className="h-6 w-6" />
            </button>
            <span className="mt-2 text-sm text-gray-700">Add</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-14 h-14 aspect-square rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-700 hover:bg-gray-50">
              <ArrowRight className="h-6 w-6" />
            </button>
            <span className="mt-2 text-sm text-gray-700">Transfer</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-14 h-14 aspect-square rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-700 hover:bg-gray-50">
              <Phone className="h-6 w-6" />
            </button>
            <span className="mt-2 text-sm text-gray-700">Consult</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-14 h-14 aspect-square rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-700 hover:bg-gray-50">
              <Mic className="h-6 w-6" />
            </button>
            <span className="mt-2 text-sm text-gray-700">Mute</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-14 h-14 aspect-square rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-700 hover:bg-gray-50">
              <Pause className="h-6 w-6" />
            </button>
            <span className="mt-2 text-sm text-gray-700">Hold</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-14 h-14 aspect-square rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-700 hover:bg-gray-50">
              <div className="grid grid-cols-3 gap-0.5">
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
              </div>
            </button>
            <span className="mt-2 text-sm text-gray-700">Keypad</span>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleEndCall}
            className="w-16 h-16 aspect-square rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
          >
            <Phone className="h-8 w-8 transform rotate-135" />
          </button>
          <p className="text-center mt-2 text-red-600 font-medium">End</p>
        </div>

        {hasMicAccess && (
          <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md">
            <p className="flex items-center">
              <Mic className="h-4 w-4 mr-2" />
              Microphone access granted
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
