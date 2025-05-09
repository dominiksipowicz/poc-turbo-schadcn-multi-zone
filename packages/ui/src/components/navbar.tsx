"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function Navbar() {
  const [isOnCall, setIsOnCall] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Initialize state from localStorage on component mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const storedCallStatus = localStorage.getItem("callStatus");
      if (storedCallStatus) {
        setIsOnCall(storedCallStatus === "active");
      }

      // Add event listener for storage changes (for cross-tab synchronization)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "callStatus") {
          setIsOnCall(e.newValue === "active");
        }
      };

      window.addEventListener("storage", handleStorageChange);
      setIsPageLoaded(true);

      // Clean up event listener
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  const handlePhoneClick = () => {
    if (!isOnCall) {
      // Start a call
      localStorage.setItem("callStatus", "active");
      setIsOnCall(true);

      // Open a new tab without switching focus to it
      const openInBackground = () => {
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = "/call";
        link.target = "_blank";
        link.rel = "noopener";

        // Hide the link and add it to the DOM
        link.style.display = "none";
        document.body.appendChild(link);

        // Click the link programmatically
        link.click();

        // Clean up by removing the link
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
      };

      openInBackground();
    } else {
      // End the call
      localStorage.setItem("callStatus", "inactive");
      setIsOnCall(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8 items-center">
            <div className="font-bold text-lg text-gray-800">
              Multi-Zone Demo
            </div>
            <div className="hidden md:flex space-x-6">
              <a
                href="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="/page-a"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md transition-colors duration-200"
              >
                Micro App A
              </a>
              <a
                href="/page-b"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md transition-colors duration-200"
              >
                Micro App B
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={handlePhoneClick}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label={isOnCall ? "End call" : "Start call"}
            >
              <CallIndicator isOnCall={isOnCall} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface CallIndicatorProps {
  isOnCall: boolean;
}

function CallIndicator({ isOnCall }: CallIndicatorProps) {
  return (
    <div className="relative">
      <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
        <Phone className="h-5 w-5 text-gray-700" />
      </div>
      <div
        className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isOnCall ? "bg-green-500" : "bg-red-500"}`}
      />
    </div>
  );
}
