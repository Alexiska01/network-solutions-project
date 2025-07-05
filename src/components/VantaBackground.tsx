// src/components/VantaBackground.tsx
import React from "react";

interface VantaBackgroundProps {
  effect?: "net" | "waves" | "fog";
}

const VantaBackground: React.FC<VantaBackgroundProps> = ({
  effect = "net",
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-slate-900 to-slate-800" />
  );
};

export default VantaBackground;
