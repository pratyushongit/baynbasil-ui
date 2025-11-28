"use client";

import { useState, useEffect, ReactNode } from "react";
import Loader from "@/components/Loader";

interface AppLoaderProps {
  children: ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAssetsLoaded = () => {
      if (document.readyState === "complete") {
        const images = Array.from(document.querySelectorAll("img"));

        if (images.length === 0) {
          setIsLoading(false);
          return;
        }

        const imagePromises = images.map((img) => {
          if (img.complete) {
            return Promise.resolve();
          }
          return new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          });
        });

        Promise.all(imagePromises).then(() => {
          setTimeout(() => setIsLoading(false), 300);
        });
      }
    };

    if (document.readyState === "complete") {
      checkAssetsLoaded();
    } else {
      window.addEventListener("load", checkAssetsLoaded);
    }

    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener("load", checkAssetsLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <Loader isVisible={isLoading} />
      {children}
    </>
  );
}
