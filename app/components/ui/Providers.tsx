"use client";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/app/components/ui/ThemeProvider";
import SmoothScroll from "@/app/components/ui/SmoothScroll";
import AuroraBackground from "@/app/components/ui/AuroraBackground";
import CustomCursor from "@/app/components/ui/CustomCursor";
import ScrollProgress from "@/app/components/ui/ScrollProgress";
import PageLoader from "@/app/components/ui/PageLoader";

/** App-wide client shell: theme, motion preferences, smooth scroll and ambient layers. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        <AuroraBackground />
        <PageLoader />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
}
