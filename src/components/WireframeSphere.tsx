import React, { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/* ─── Inner Wireframe & Nodes Mesh ───────────────────────────────── */

function WireframeMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.LineSegments>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  // Create Icosahedron Wireframe edges and vertex nodes
  const { wireframeGeo, nodePositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.1, 3);
    const wireGeo = new THREE.WireframeGeometry(geo);

    // Extract unique node positions for dots at vertices
    const posAttribute = geo.attributes.position;
    const nodePos: [number, number, number][] = [];
    const seen = new Set<string>();

    for (let i = 0; i < posAttribute.count; i++) {
      const x = Number(posAttribute.getX(i).toFixed(3));
      const y = Number(posAttribute.getY(i).toFixed(3));
      const z = Number(posAttribute.getZ(i).toFixed(3));
      const key = `${x},${y},${z}`;
      if (!seen.has(key)) {
        seen.add(key);
        nodePos.push([x, y, z]);
      }
    }

    return { wireframeGeo: wireGeo, nodePositions: nodePos };
  }, []);

  // Track mouse movement for smooth tilt
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useFrame(({ clock }) => {
    const group = meshRef.current;
    if (!group) return;

    const t = clock.getElapsedTime();

    // Constant smooth rotation
    group.rotation.y = t * 0.12;
    group.rotation.x = Math.sin(t * 0.08) * 0.15;

    // Lerped mouse interaction
    const mc = mouseCurrent.current;
    const mt = mouseTarget.current;
    mc.x += (mt.x - mc.x) * 0.05;
    mc.y += (mt.y - mc.y) * 0.05;

    group.rotation.x += mc.y * 0.2;
    group.rotation.y += mc.x * 0.2;

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Main Wireframe Sphere */}
      <lineSegments ref={outerSphereRef} geometry={wireframeGeo}>
        <lineBasicMaterial
          color="#111111"
          transparent
          opacity={0.18}
          linewidth={1}
        />
      </lineSegments>

      {/* Inner Subtle Glass / Solid Core */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.92}
          roughness={0.1}
          metalness={0.1}
          ior={1.3}
          thickness={1.2}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing Vertex Connection Dots */}
      {nodePositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#000000" opacity={0.65} transparent />
        </mesh>
      ))}

      {/* Orbiting Satellite Dots */}
      <OrbitingSatellites />
    </group>
  );
}

/* ─── Orbiting Ring Satellites ───────────────────────────────────── */

function OrbitingSatellites() {
  const ringRef = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = 16;
    const radius = 2.7;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pts.push([
        Math.cos(angle) * radius,
        (Math.sin(angle * 3) * 0.25),
        Math.sin(angle) * radius,
      ]);
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = -clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <group ref={ringRef} rotation={[0.4, 0, 0.2]}>
      {points.map((pt, i) => (
        <mesh key={i} position={pt}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Main Exported Component ────────────────────────────────────── */

export const WireframeSphere: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "auto" }}
      >
        <React.Suspense fallback={null}>
          <Environment resolution={128} environmentIntensity={0.5}>
            <Lightformer
              intensity={1.5}
              color="#ffffff"
              position={[0, 6, -3]}
              scale={[12, 6, 1]}
            />
            <Lightformer
              intensity={0.8}
              color="#ffffff"
              position={[-6, 2, 2]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[6, 4, 1]}
            />
          </Environment>
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 4]} intensity={1.2} />
          <WireframeMesh />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default WireframeSphere;
