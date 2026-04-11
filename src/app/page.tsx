"use client";

import { motion } from "framer-motion";
import { VisionMap } from "@/components/vision-map";
import { Hero } from "@/components/sections/hero";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { Properties } from "@/components/sections/properties";
import { Vision } from "@/components/sections/vision";
import { Values } from "@/components/sections/values";
import { Evidence } from "@/components/sections/evidence";
import { Publications } from "@/components/sections/publications";
import { Provenance } from "@/components/sections/provenance";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
    >
      <div className="relative z-[2]">
        <VisionMap />
        <Hero />
        <WhyItMatters />
        <WhatWeDo />
        <Properties />
        <Vision />
        <Values />
        <Evidence />
        <Publications />
        <Provenance />
        <Contact />
        <Footer />
      </div>
    </motion.main>
  );
}
