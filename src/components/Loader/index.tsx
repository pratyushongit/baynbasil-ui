"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import cookingAnimation from "@/assets/cooking-loader.lottie";
import styles from "./styles.module.css";

interface LoaderProps {
  isVisible: boolean;
}

export default function Loader({ isVisible }: LoaderProps) {
  return (
    <div
      className={`${styles.loaderContainer} ${!isVisible ? styles.hidden : ""}`}
    >
      <div className={styles.loaderContent}>
        <div className={styles.lottieWrapper}>
          <DotLottieReact src={cookingAnimation} loop autoplay />
        </div>
      </div>
    </div>
  );
}
