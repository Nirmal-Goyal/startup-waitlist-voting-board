import Navbar from "@/components/Navbar";
import WaitlistForm from "@/components/WaitlistForm";
import FeatureBoard from "@/components/FeatureBoard";
import type { Feature } from "@/components/FeatureBoard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const fallbackFeatures: Feature[] = [
  { id: 1, name: "Dark Mode", votes: 0 },
  { id: 2, name: "API Access", votes: 0 },
  { id: 3, name: "Mobile App", votes: 0 },
  { id: 4, name: "Analytics Dashboard", votes: 0 },
];

async function getFeatures(): Promise<Feature[]> {
  try {
    const res = await fetch(`${API_URL}/features`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return fallbackFeatures;
    const data: Feature[] = await res.json();
    return data.length ? data : fallbackFeatures;
  } catch {
    return fallbackFeatures;
  }
}

export default async function Home() {
  const initialFeatures = await getFeatures();

  return (
    <>
      <Navbar />
      <main>
        <WaitlistForm />
        <div className="section-divider" />
        <FeatureBoard initialFeatures={initialFeatures} />
      </main>
      <footer className="footer">
        <p>© 2025 LaunchPad · Built with ❤️ for early adopters</p>
      </footer>
    </>
  );
}
