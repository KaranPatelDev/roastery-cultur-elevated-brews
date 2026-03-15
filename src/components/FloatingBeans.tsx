import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function CoffeeBean({ position, speed, rotationSpeed }: { position: [number, number, number]; speed: number; rotationSpeed: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = initialY + Math.sin(t * speed) * 0.5;
    meshRef.current.rotation.x += rotationSpeed[0] * 0.01;
    meshRef.current.rotation.y += rotationSpeed[1] * 0.01;
    meshRef.current.rotation.z += rotationSpeed[2] * 0.01;
  });

  return (
    <mesh ref={meshRef} position={position} scale={[0.3, 0.15, 0.15]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#6F4E37" roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

function BeanField() {
  const beans = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.5,
      rotationSpeed: [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#C6A969" />
      <pointLight position={[-3, 2, 2]} intensity={0.3} color="#C6A969" />
      {beans.map((bean) => (
        <CoffeeBean key={bean.id} {...bean} />
      ))}
    </>
  );
}

const FloatingBeans = () => {
  return (
    <div className="absolute inset-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <BeanField />
      </Canvas>
    </div>
  );
};

export default FloatingBeans;
