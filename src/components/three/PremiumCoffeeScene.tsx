import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type BeanProps = {
  position: [number, number, number];
  speed: number;
  size: number;
};

function Bean({ position, speed, size }: BeanProps) {
  const beanRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!beanRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    beanRef.current.position.y = position[1] + Math.sin(t * speed) * 0.28;
    beanRef.current.rotation.x = t * speed * 0.35;
    beanRef.current.rotation.y = t * speed * 0.5;
  });

  return (
    <mesh ref={beanRef} position={position} scale={[size * 1.4, size, size * 0.85]}>
      <sphereGeometry args={[0.25, 20, 20]} />
      <meshStandardMaterial color="#6F4E37" roughness={0.75} metalness={0.08} />
    </mesh>
  );
}

function SteamParticleField() {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const particleCount = 120;
    const pos = new Float32Array(particleCount * 3);
    const velocity = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 0.65;
      pos[i * 3 + 1] = Math.random() * 1.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      velocity[i] = 0.0035 + Math.random() * 0.007;
    }

    return { positions: pos, speeds: velocity };
  }, []);

  useFrame(() => {
    if (!points.current) {
      return;
    }

    const position = points.current.geometry.attributes.position;

    for (let i = 0; i < position.count; i += 1) {
      const yIndex = i * 3 + 1;
      position.array[yIndex] += speeds[i];

      if (position.array[yIndex] > 2) {
        position.array[yIndex] = 0;
      }
    }

    position.needsUpdate = true;
  });

  return (
    <points ref={points} position={[0, 0.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#F5E6D3" size={0.03} transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

function CoffeeCup() {
  return (
    <group position={[0, -0.1, 0]}>
      <mesh castShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.42, 0.32, 0.48, 40]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.55} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#3B2F2F" roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[0.5, 0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.12, 0.024, 20, 40]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.55} metalness={0.12} />
      </mesh>
      <SteamParticleField />
    </group>
  );
}

function RoastingMachine() {
  const drumRef = useRef<THREE.Mesh>(null);
  const machineRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (drumRef.current) {
      drumRef.current.rotation.z += 0.015;
    }

    if (machineRef.current) {
      machineRef.current.rotation.y = THREE.MathUtils.lerp(
        machineRef.current.rotation.y,
        state.pointer.x * 0.4,
        0.05,
      );
    }
  });

  return (
    <group ref={machineRef} position={[1.85, -0.05, -0.2]} scale={0.88}>
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[0.85, 0.14, 0.65]} />
        <meshStandardMaterial color="#121212" roughness={0.75} />
      </mesh>
      <mesh ref={drumRef} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 0.5, 30]} />
        <meshStandardMaterial color="#C6A969" roughness={0.4} metalness={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.18]}>
        <circleGeometry args={[0.1, 24]} />
        <meshStandardMaterial color="#3B2F2F" roughness={0.6} metalness={0.18} />
      </mesh>
      <mesh position={[0.38, -0.12, 0]}>
        <boxGeometry args={[0.1, 0.28, 0.1]} />
        <meshStandardMaterial color="#6F4E37" roughness={0.65} />
      </mesh>
    </group>
  );
}

function SceneContents() {
  const cupRef = useRef<THREE.Group>(null);

  const beans = useMemo(() => {
    return Array.from({ length: 16 }).map((_, index) => ({
      key: index,
      position: [
        (Math.random() - 0.5) * 4,
        Math.random() * 2 - 0.2,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      speed: 0.4 + Math.random() * 0.55,
      size: 0.12 + Math.random() * 0.08,
    }));
  }, []);

  useFrame((state) => {
    if (!cupRef.current) {
      return;
    }

    cupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.05 - 0.02;
    cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.12;
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[2.2, 4, 2]} color="#C6A969" intensity={1.15} castShadow />
      <pointLight position={[-2, 1.3, 1]} color="#F5E6D3" intensity={0.58} />

      <group ref={cupRef}>
        <CoffeeCup />
      </group>

      <RoastingMachine />

      {beans.map((bean) => (
        <Bean key={bean.key} position={bean.position} speed={bean.speed} size={bean.size} />
      ))}
    </>
  );
}

const PremiumCoffeeScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0.75, 3.6], fov: 46 }} dpr={[1, 1.8]}>
        <SceneContents />
      </Canvas>
    </div>
  );
};

export default PremiumCoffeeScene;