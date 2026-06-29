"use client";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Preloader from "../components/preloader";
import Hero from "../components/home/Hero";
import Gallery from "../components/home/Gallerysection"
import HowItWorks from "@/components/home/HowItWorks";
import VideoHero from "@/components/home/VideoHero";
import Calender from "../components/home/Availability";
// import FAndQ from "../components/home/fandq";
import CtaBot from "../components/ctabot";
import WhatsAppContact from "../components/layout/whatsapp";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Navbar />
      <Hero />
      <Gallery />
      <HowItWorks />
      <VideoHero />
      <Calender />
      {/* <FAndQ /> */}
      <CtaBot />
      <WhatsAppContact />
      <Footer />
    </>
  );
}
