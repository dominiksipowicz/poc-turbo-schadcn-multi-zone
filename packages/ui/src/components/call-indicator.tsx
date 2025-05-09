import { Phone } from "lucide-react";

interface CallIndicatorProps {
  isOnCall: boolean;
}

export default function CallIndicator({ isOnCall }: CallIndicatorProps) {
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
