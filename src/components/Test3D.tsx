import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function Test3D() {
  console.log('🔥 Test3D рендерится');

  return (
    <div className="w-full h-64 bg-black">
      <Canvas>
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  );
}