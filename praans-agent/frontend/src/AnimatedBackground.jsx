import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

// Simple rotating low‑poly sphere
function RotatingSphere() {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.x += 0.0005;
    }
  });
  return (
    <mesh ref={ref} visible={true} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 8, 8]} />
      <meshStandardMaterial color="#f59e0b" wireframe opacity={0.4} transparent />
    </mesh>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <RotatingSphere />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
