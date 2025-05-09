import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Micro App B - Multi-Zone Architecture Demo",
  description: "Micro App B of the multi-zone architecture demonstration",
};

export default function PageB() {
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-white shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-3xl font-bold mb-4">Micro App B</h1>
        <p className="text-gray-700 mb-4">
          This is Micro App B of the multi-zone architecture demonstration. The
          call status in the navigation bar persists across all micro apps and
          tabs.
        </p>
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            Hard Navigation Demo
          </h2>
          <p className="text-green-700">
            This micro app is loaded via a hard navigation. Notice how the state
            persists despite this being a completely new page load in a
            different zone of the application.
          </p>
        </div>
      </div>
    </div>
  );
}
