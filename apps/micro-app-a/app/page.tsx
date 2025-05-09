import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export const metadata: Metadata = {
  title: "Micro App A - Multi-Zone Architecture Demo",
  description: "Micro App A of the multi-zone architecture demonstration",
};

export default function PageA() {
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-white shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-3xl font-bold mb-4">Micro App A</h1>
        <p className="text-gray-700 mb-4">
          This is Micro App A of the multi-zone architecture demonstration.
          Notice how the call status in the navigation bar persists even though
          this is a completely different app loaded via a hard navigation.
        </p>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">
            Hard Navigation Demo
          </h2>
          <p className="text-blue-700 mb-4">
            This page is loaded via a hard navigation. The visual transition and
            URL change indicate this is not a client-side route change.
          </p>

          <div className="mt-4">
            <Link href="/subpage-a" passHref>
              <Button
                variant="outline"
                className="bg-blue-100 hover:bg-blue-200 border-blue-300"
              >
                Navigate to Subpage A (Soft Navigation)
              </Button>
            </Link>
            <p className="text-sm text-blue-600 mt-2">
              This link uses Next.js Link component for client-side navigation
              within the same micro app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
