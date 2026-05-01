import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/sections/Hero";
import About from "@/app/components/sections/About";
import Skills from "@/app/components/sections/Skills";
import Projects from "@/app/components/sections/Projects";
import Experience from "@/app/components/sections/Experience";
import Contact from "@/app/components/sections/Contact";
import PageLoader from "@/app/components/ui/PageLoader";
import ScrollProgress from "@/app/components/ui/ScrollProgress";
import CustomCursor from "@/app/components/ui/CustomCursor";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
