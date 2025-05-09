"use client";

import { useEffect, useState } from "react";
import { CallStatusDropdown } from "@workspace/ui/components/call-status-dropdown";

export default function Navbar() {
  const [isOnCall, setIsOnCall] = useState(false);
  const [isStatusLoaded, setIsStatusLoaded] = useState(false);

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
      setIsStatusLoaded(true);

      // Clean up event listener
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  const handlePhoneClick = () => {
    if (!isOnCall) {
      // Start a call
      const now = Date.now();
      localStorage.setItem("callStatus", "active");
      localStorage.setItem("callStartTime", now.toString());
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
      localStorage.removeItem("callStartTime");
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
            <div className="mr-4">
              <CallStatusDropdown
                isOnCall={isOnCall}
                isStatusLoaded={isStatusLoaded}
              />
            </div>
            <button
              onClick={handlePhoneClick}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 flex items-center gap-2"
              aria-label={isOnCall ? "End call" : "Start call"}
            >
              {isOnCall ? "End Call" : "Start Call"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
