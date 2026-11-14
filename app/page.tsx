import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Agencies } from "@/components/sections/Agencies";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Support } from "@/components/sections/Support";
import { Technologies } from "@/components/sections/Technologies";
import { Websites } from "@/components/sections/Websites";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Websites />
      <Support />
      <Agencies />
      <Technologies />
      <Process />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
