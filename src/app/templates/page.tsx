import TemplatesPage from "@/components/templates-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Templates() {
  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="outline">← Back to Dashboard</Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Templates Gallery</h1>
      <TemplatesPage />
    </main>
  );
}