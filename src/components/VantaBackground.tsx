// src/components/VantaBackground.tsx

import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";

const VantaBackground = ({ effect = "net" }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,

          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0077ff,
          backgroundColor: 0x000000,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 z-0" />;
};

export default VantaBackground;
