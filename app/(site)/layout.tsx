import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistantWidget from "@/components/AIAssistantWidget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIAssistantWidget />
    </>
  );
}
