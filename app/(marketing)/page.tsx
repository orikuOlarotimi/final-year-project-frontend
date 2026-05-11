import Image from "next/image";
import Hero from "../../components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import Features from "@/components/sections/Features";
import TOS from "@/components/sections/TOS";
import CTA from "@/components/sections/CTA";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-[rgb(9,7,26)]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(circle,#a78bfa_1px,transparent_1px)] bg-[length:36px_36px]"></div>
      <Hero />
      <Capabilities />
      <Features />
      <TOS />
      <CTA />
    </div>
  );
}
