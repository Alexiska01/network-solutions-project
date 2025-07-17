import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

function ThreeTest() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
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