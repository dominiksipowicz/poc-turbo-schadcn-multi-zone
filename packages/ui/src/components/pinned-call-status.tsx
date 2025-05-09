"use client";

import { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

export function PinnedCallStatus() {
  const [isOnCall, setIsOnCall] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isStatusLoaded, setIsStatusLoaded] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStartTime, setCallStartTime] = useState<number | null>(null);

  // Initialize state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check call status
      const storedCallStatus = localStorage.getItem("callStatus");
      if (storedCallStatus) {
        setIsOnCall(storedCallStatus === "active");
      }

      // Check pin status
      const storedPinStatus = localStorage.getItem("callStatusPinned");
      if (storedPinStatus) {
        setIsPinned(storedPinStatus === "true");
      }

      // Check call start time
      const storedCallStartTime = localStorage.getItem("callStartTime");
      if (storedCallStartTime) {
        setCallStartTime(parseInt(storedCallStartTime, 10));
      }

      setIsStatusLoaded(true);

      // Add event listeners for changes
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "callStatus") {
          const newCallStatus = e.newValue === "active";
          setIsOnCall(newCallStatus);

          // If call is starting, set the start time
          if (newCallStatus && e.oldValue !== "active") {
            const now = Date.now();
            setCallStartTime(now);
            localStorage.setItem("callStartTime", now.toString());
          }

          // If call is ending, reset the start time and automatically unpin the call bar
          if (!newCallStatus && e.oldValue === "active") {
            setCallStartTime(null);
            localStorage.removeItem("callStartTime");
            setCallDuration(0);

            // Automatically unpin the call bar when call ends
            localStorage.setItem("callStatusPinned", "false");
            setIsPinned(false);

            // Dispatch event to notify other components
            const unpinEvent = new CustomEvent("callStatusPinChanged", {
              detail: { isPinned: false },
            });
            window.dispatchEvent(unpinEvent);
          }
        } else if (e.key === "callStatusPinned") {
          setIsPinned(e.newValue === "true");
        } else if (e.key === "callStartTime") {
          if (e.newValue) {
            setCallStartTime(parseInt(e.newValue, 10));
          } else {
            setCallStartTime(null);
            setCallDuration(0);
          }
        }
      };

      const handlePinChange = (e: CustomEvent) => {
        setIsPinned(e.detail.isPinned);
      };

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener(
        "callStatusPinChanged",
        handlePinChange as EventListener,
      );

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(
          "callStatusPinChanged",
          handlePinChange as EventListener,
        );
      };
    }
  }, []);

  // Update call duration
  useEffect(() => {
    if (!isOnCall || callStartTime === null) {
      setCallDuration(0);
      return;
    }

    const calculateDuration = () => {
      if (callStartTime) {
        const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
        setCallDuration(elapsed);
      }
    };

    // Calculate initial duration
    calculateDuration();

    // Set up interval to update duration
    const interval = setInterval(calculateDuration, 1000);

    return () => clearInterval(interval);
  }, [isOnCall, callStartTime]);

  const unpinCallStatus = () => {
    localStorage.setItem("callStatusPinned", "false");
    setIsPinned(false);

    // Dispatch event to notify other components
    const event = new CustomEvent("callStatusPinChanged", {
      detail: { isPinned: false },
    });
    window.dispatchEvent(event);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours > 0 ? hours.toString().padStart(2, "0") : "",
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ]
      .filter(Boolean)
      .join(":");
  };

  if (!isPinned || !isStatusLoaded) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 py-3">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 aspect-square rounded-full border-2 border-gray-300 flex items-center justify-center">
                <Phone className="h-4 w-4 text-gray-700" />
              </div>
              <div
                className={cn(
                  "absolute -top-1 -right-1 w-3 h-3 aspect-square rounded-full",
                  isOnCall ? "bg-green-500" : "bg-red-500",
                )}
              />
            </div>
            <div className="text-sm font-medium">
              <span
                className={cn(isOnCall ? "text-green-600" : "text-red-600")}
              >
                {isOnCall ? "Active Call" : "No Active Call"}
              </span>
              {isOnCall && (
                <>
                  <span className="text-gray-500 ml-3">
                    01191-(888) 292-2226
                  </span>
                  <span className="text-gray-500 ml-3">
                    {formatTime(callDuration)}
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={unpinCallStatus}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Unpin call status"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
