import ThreeScene from "@/components/3D/ThreeScene";
import OverlayUI from "@/components/OverlayUI";

import ProjectArea from "@/components/ProjectArea";
import ContactPage3D from "@/components/Contact";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-auto">
      <ThreeScene />
      <OverlayUI />
      <ProjectArea />
      <ContactPage3D />
      <Footer />
    </main>
  );
}
