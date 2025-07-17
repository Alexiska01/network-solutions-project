import { Suspense } from "react";

function ThreeTest() {
  try {
    const { Canvas } = require("@react-three/fiber");
    
    return (
      <Canvas>
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    );
  } catch (error) {
    console.error('Three.js error:', error);
    return <div className="text-red-500">3D Error: {String(error)}</div>;
  }
}

export default function Test3D() {
  console.log('🔥 Test3D рендерится');

  return (
    <div className="w-full h-64 bg-black border-4 border-yellow-400">
      <Suspense fallback={<div className="text-white p-4">Loading 3D...</div>}>
        <ThreeTest />
      </Suspense>
    </div>
  );
}