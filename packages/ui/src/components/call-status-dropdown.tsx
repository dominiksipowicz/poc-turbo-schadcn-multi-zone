"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Pin, Phone } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface CallStatusDropdownProps {
  isOnCall: boolean;
  isStatusLoaded: boolean;
}

export function CallStatusDropdown({
  isOnCall,
  isStatusLoaded,
}: CallStatusDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Initialize pinned state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPinStatus = localStorage.getItem("callStatusPinned");
      if (storedPinStatus) {
        setIsPinned(storedPinStatus === "true");
      }

      // Add event listener for storage changes (for cross-tab synchronization)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "callStatusPinned") {
          setIsPinned(e.newValue === "true");
        }
      };

      window.addEventListener("storage", handleStorageChange);

      // Clean up event listener
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  // Update localStorage when pin status changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("callStatusPinned", isPinned.toString());

      // Dispatch a custom event to notify other components
      const event = new CustomEvent("callStatusPinChanged", {
        detail: { isPinned },
      });
      window.dispatchEvent(event);
    }
  }, [isPinned]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 aspect-square rounded-full border-2 border-gray-300 flex items-center justify-center">
            <Phone className="h-4 w-4 text-gray-700" />
          </div>
          <div
            className={cn(
              "absolute -top-1 -right-1 w-3 h-3 aspect-square rounded-full",
              !isStatusLoaded
                ? "bg-gray-400"
                : isOnCall
                  ? "bg-green-500"
                  : "bg-red-500",
            )}
          />
        </div>
        <ChevronDown className="h-4 w-4 text-gray-600" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 min-w-[200px] w-full sm:w-[250px] md:w-[300px] bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="font-medium text-gray-800">Call Status</div>
            <div
              className={cn(
                "text-sm mt-2",
                isOnCall ? "text-green-600" : "text-red-600",
              )}
            >
              {isOnCall ? "Active Call" : "No Active Call"}
            </div>
          </div>

          <div className="p-3">
            <button
              onClick={togglePin}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Pin
                className={cn(
                  "h-5 w-5",
                  isPinned ? "text-blue-500" : "text-gray-500",
                )}
              />
              <span>
                {isPinned ? "Unpin from bottom bar" : "Pin to bottom bar"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
