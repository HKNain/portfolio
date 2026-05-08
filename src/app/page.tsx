import Contact from "@/components/Contact";
import CP from "@/components/CP";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";


export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Projects/>
      <Skills/>
      <CP/>
      <Contact/>
    </main>
  );
}
