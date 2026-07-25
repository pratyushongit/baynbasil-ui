"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Story from "./Story";
import ProductsCarousel from "./ProductsCarousel";
import WhyUs from "./WhyUs";
import LandingFooter from "./LandingFooter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // GSAP is taking over now — drop the pre-paint hide gate so each tween's
      // clearProps leaves elements fully visible.
      document.documentElement.classList.remove("js-anim");

      // Hero entrance (selector text is auto-scoped to rootRef)
      gsap.from("[data-hero]", {
        y: 46,
        opacity: 0,
        stagger: 0.09,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
        clearProps: "opacity,transform",
      });

      // Hero title lines: per-character blur reveal, one line after the other.
      gsap.utils.toArray<HTMLElement>("[data-heroline]").forEach((line, i) => {
        const chars = line.querySelectorAll<HTMLElement>(".hero-char");
        gsap.from(chars, {
          opacity: 0,
          filter: "blur(14px)",
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.04,
          delay: 0.25 + i * 0.4,
        });
      });

      // Parallax word behind the hero
      gsap.to("[data-parallax]", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
      });

      // Reveal-on-scroll
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      // Count-up stats
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.getAttribute("data-count"));
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.4,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
          onComplete: () => {
            el.textContent = String(end);
          },
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Recalculate trigger positions once fonts/images settle.
      ScrollTrigger.refresh();
    },
    { scope: rootRef },
  );

  return (
    <>
      <Navbar />
      <div ref={rootRef} data-motion="on" style={{ overflowX: "clip", minHeight: "100vh" }}>
        <Hero />
        <Marquee />
        <Story />
        <ProductsCarousel />
        <WhyUs />
        <LandingFooter />
      </div>
    </>
  );
}
