import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Multi-Zone Architecture Demo",
  description: "Home page of the multi-zone architecture demonstration",
};

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-white shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <p className="text-gray-700 mb-4">
          Welcome to the multi-zone architecture demonstration. This application
          shows how state can be maintained across hard navigations between
          different micro apps.
        </p>
        <p className="text-gray-700 mb-4">
          Try clicking the phone icon in the navigation bar to start a call,
          then navigate between micro apps using the links in the navbar.
          You&apos;ll notice that the call status persists across all micro
          apps.
        </p>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            Multi-Zone Architecture
          </h2>
          <p className="text-yellow-700">
            This demo simulates multiple micro-frontends (zones) with:
          </p>
          <ul className="list-disc list-inside mt-2 text-yellow-700">
            <li>
              Hard navigations between micro apps (using standard HTML links)
            </li>
            <li>
              Soft navigations within micro apps (using Next.js Link component)
            </li>
            <li>Persistent state across all navigations and tabs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
