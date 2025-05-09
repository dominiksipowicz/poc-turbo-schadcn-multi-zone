import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Subpage A - Micro App A",
  description: "Subpage A within Micro App A using soft navigation",
};

export default function SubpageA() {
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg bg-white shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-3xl font-bold mb-4">Subpage A</h1>
        <p className="text-gray-700 mb-4">
          This is a subpage within Micro App A. You navigated here using Next.js
          Link component, which performs a client-side navigation (soft
          navigation).
        </p>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
          <h2 className="text-lg font-semibold text-purple-800 mb-2">
            Soft Navigation Demo
          </h2>
          <p className="text-purple-700 mb-4">
            Unlike the navigation between main micro apps, this navigation
            happened without a full page reload. Notice how there was no page
            flash or loading indicator, but the call status is still maintained.
          </p>

          <div className="mt-4">
            <Link href="/page-a" passHref>
              <Button
                variant="outline"
                className="bg-purple-100 hover:bg-purple-200 border-purple-300 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Micro App A
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            State Persistence
          </h2>
          <p className="text-yellow-700">
            The call status is still maintained even within client-side
            navigations. This demonstrates how state can be maintained across
            both hard and soft navigations in a micro-frontend architecture.
          </p>
        </div>
      </div>
    </div>
  );
}
