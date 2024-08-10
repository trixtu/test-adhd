"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

interface SmothScrollProps {
  children: React.ReactNode;
}

export function SmothScroll({ children }: SmothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration:1.5,
        smoothWheel: true
      }}
    >
      {children}
    </ReactLenis>
  );
}
