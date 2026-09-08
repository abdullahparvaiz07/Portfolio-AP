import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Text } from "@react-three/drei";
import * as THREE from "three";
import {
  siReact,
  siTypescript,
  siNodedotjs,
  siPython,
  siFigma,
  siTailwindcss,
  siNextdotjs,
  siMongodb,
  siPostgresql,
  siGit,
  siDocker,
  siGraphql,
  siFramer,
  siJavascript
} from "simple-icons";

const siOpenai = {
  slug: "openai",
  title: "OpenAI",
  hex: "10a37f",
  path: "M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1"
};

export interface SkillIcon {
  slug: string;
  path: string;
  hex: string;
  title: string;
}

const SKILLS_GRID: SkillIcon[][] = [
  [
    { slug: "figma", path: siFigma.path, hex: siFigma.hex, title: "Figma" },
    { slug: "react", path: siReact.path, hex: siReact.hex, title: "React" },
    { slug: "nodedotjs", path: siNodedotjs.path, hex: siNodedotjs.hex, title: "Node.js" },
    { slug: "typescript", path: siTypescript.path, hex: siTypescript.hex, title: "TypeScript" },
    { slug: "python", path: siPython.path, hex: siPython.hex, title: "Python" }
  ],
  [
    { slug: "tailwindcss", path: siTailwindcss.path, hex: siTailwindcss.hex, title: "Tailwind" },
    { slug: "nextdotjs", path: siNextdotjs.path, hex: siNextdotjs.hex, title: "Next.js" },
    { slug: "openai", path: siOpenai.path, hex: siOpenai.hex, title: "OpenAI" },
    { slug: "mongodb", path: siMongodb.path, hex: siMongodb.hex, title: "MongoDB" },
    { slug: "postgresql", path: siPostgresql.path, hex: siPostgresql.hex, title: "PostgreSQL" }
  ],
  [
    { slug: "git", path: siGit.path, hex: siGit.hex, title: "Git" },
    { slug: "docker", path: siDocker.path, hex: siDocker.hex, title: "Docker" },
    { slug: "graphql", path: siGraphql.path, hex: siGraphql.hex, title: "GraphQL" },
    { slug: "framer", path: siFramer.path, hex: siFramer.hex, title: "Framer" },
    { slug: "javascript", path: siJavascript.path, hex: siJavascript.hex, title: "JavaScript" }
  ]
];

const TAGLINES: Record<string, string> = {
  figma: "Interface & UI/UX design tool",
  react: "Component-based user interfaces",
  nodedotjs: "Asynchronous JS runtime for backends",
  typescript: "Type-safe JavaScript extension",
  python: "AI agents & scripting backend",
  tailwindcss: "Utility-first styles and layout",
  nextdotjs: "React framework for production",
  openai: "Generative AI APIs & models",
  mongodb: "Flexible NoSQL document database",
  postgresql: "Powerful SQL relational database",
  git: "Distributed version control system",
  docker: "App packaging & containerization",
  graphql: "Flexible graph querying for APIs",
  framer: "Premium web interactions & motion",
  javascript: "Dynamic logic and web interaction"
};

const palette = {
  accent: "#FF5800", // Theme main-two color
  keyboardBase: "#e5e5e5"
};

type KeyboardState = {
  yaw: number;
  pitch: number;
  roll: number;
  posX: number;
  posY: number;
  posZ: number;
  scale: number;
};

const SECTION_STATES: Record<string, KeyboardState> = {
  hero: {
    yaw: Math.PI * 0.18,
    pitch: Math.PI * 0.12,
    roll: -Math.PI * -0.04,
    posX: 0,
    posY: -0.2,
    posZ: 0,
    scale: 1.6,
  },
  stack: {
    yaw: Math.PI * 0.18,
    pitch: Math.PI * 0.12,
    roll: -Math.PI * -0.04,
    posX: 0,
    posY: -0.2,
    posZ: 0,
    scale: 1.6,
  }
};

const MOBILE_STATE: KeyboardState = {
  yaw: Math.PI * 0.18,
  pitch: Math.PI * 0.14,
  roll: 0.02,
  posX: 0,
  posY: -0.2,
  posZ: 0,
  scale: 1.5,
};

function useActiveSection(): [
  string,
  React.RefObject<string>,
  React.RefObject<Set<string>>
] {
  const [section, setSection] = useState<string>("stack");
  const ref = useRef<string>("stack");
  const highlightsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const visibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target, entry.intersectionRatio);
        }
        let bestRatio = 0;
        let bestEl: HTMLElement | null = null;
        let bestSection = ref.current;
        for (const [el, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestEl = el as HTMLElement;
            bestSection = bestEl.dataset.kbSection ?? bestSection;
          }
        }
        const raw = bestEl?.dataset.kbHighlights ?? "";
        highlightsRef.current = new Set(
          raw.split(",").map((s) => s.trim()).filter(Boolean)
        );
        if (bestSection !== ref.current) {
          ref.current = bestSection;
          setSection(bestSection);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    const targets = document.querySelectorAll<HTMLElement>("[data-kb-section]");
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return [section, ref, highlightsRef];
}

function makeRoundedRectShape(
  width: number,
  depth: number,
  cornerRadius: number
): THREE.Shape {
  const shape = new THREE.Shape();
  const w = width / 2;
  const d = depth / 2;
  const r = Math.min(cornerRadius, w, d);
  shape.moveTo(-w + r, -d);
  shape.lineTo(w - r, -d);
  shape.quadraticCurveTo(w, -d, w, -d + r);
  shape.lineTo(w, d - r);
  shape.quadraticCurveTo(w, d, w - r, d);
  shape.lineTo(-w + r, d);
  shape.quadraticCurveTo(-w, d, -w, d - r);
  shape.lineTo(-w, -d + r);
  shape.quadraticCurveTo(-w, -d, -w + r, -d);
  return shape;
}

function createExtrudedBox(
  width: number,
  depth: number,
  height: number,
  cornerRadius: number,
  bevelSize: number,
  topScale = 1
): THREE.BufferGeometry {
  const shape = makeRoundedRectShape(width, depth, cornerRadius);
  const extrudeDepth = Math.max(0.001, height - 2 * bevelSize);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: extrudeDepth,
    bevelEnabled: bevelSize > 0,
    bevelThickness: bevelSize,
    bevelSize: bevelSize,
    bevelSegments: 2,
    steps: 1,
    curveSegments: 12,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -height / 2 + bevelSize, 0);

  if (topScale !== 1) {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = (y + height / 2) / height;
      const factor = THREE.MathUtils.lerp(1, topScale, t);
      pos.setX(i, pos.getX(i) * factor);
      pos.setZ(i, pos.getZ(i) * factor);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  }
  return geometry;
}

function makeIconTexture(
  svgPath: string,
  color: string,
  size = 256
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);

  const iconTargetSize = Math.round(size * 0.62);
  const scale = iconTargetSize / 24;
  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.scale(scale, scale);
  ctx.translate(-12, -12);
  ctx.fillStyle = color;
  ctx.fill(new Path2D(svgPath));
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

const COLS = 5;
const ROWS = 3;
const KEYCAP_SIZE = 0.4;
const KEYCAP_HEIGHT = 0.28;
const KEYCAP_TOP_SCALE = 0.78;
const COL_SPACING = 0.42;
const ROW_SPACING = 0.42;
const BASE_WIDTH = 2.4;
const BASE_DEPTH = 1.4;
const BASE_HEIGHT = 0.26;
const ICON_PLANE_SIZE = KEYCAP_SIZE * KEYCAP_TOP_SCALE * 0.78;
const PRESS_DEPTH = 0.15;

let audioCtx: AudioContext | null = null;
let audioUnlockInstalled = false;
function installAudioUnlock() {
  if (audioUnlockInstalled || typeof window === "undefined") return;
  audioUnlockInstalled = true;
  const unlock = () => {
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  };
  window.addEventListener("pointerdown", unlock, { once: false });
  window.addEventListener("keydown", unlock, { once: false });
  window.addEventListener("touchstart", unlock, { once: false });
}

function playKeyClick(seed = 0) {
  if (typeof window === "undefined") return;
  try {
    if (!audioCtx) {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) return;
      audioCtx = new Ctor();
      installAudioUnlock();
    }
    const ctx = audioCtx;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
      return;
    }

    const time = ctx.currentTime;

    // Synthesized click transients
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1400 + (seed % 5) * 80, time);
    osc1.frequency.exponentialRampToValueAtTime(150, time + 0.02);

    gain1.gain.setValueAtTime(0.06, time);
    gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(time);
    osc1.stop(time + 0.03);

    // Thump low frequency
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(160, time);
    osc2.frequency.exponentialRampToValueAtTime(70, time + 0.06);

    gain2.gain.setValueAtTime(0.09, time);
    gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(time);
    osc2.stop(time + 0.08);
  } catch {
    // Fail silently
  }
}

function Keycap({
  geometry,
  position,
  isMobile,
  icon,
  onHoverChange,
  hovered,
  highlightsRef,
  activeSectionRef,
  wavePhase,
  accent,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  isMobile: boolean;
  icon: SkillIcon;
  onHoverChange: (hovered: boolean) => void;
  hovered: boolean;
  highlightsRef: React.RefObject<Set<string>>;
  activeSectionRef: React.RefObject<string>;
  wavePhase: number;
  accent: string;
}) {
  const pressRef = useRef<THREE.Group>(null);
  const pressY = useRef(0);
  const liftAmp = useRef(0);
  const contactAmp = useRef(0);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const baseEmissive = 0.2;

  const randomBob = useMemo(
    () => ({
      freq: 0.5 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      threshold: 0.5 + Math.random() * 0.15,
    }),
    []
  );

  const iconTexture = useMemo(
    () => makeIconTexture(icon.path, `#${icon.hex}`),
    [icon.path, icon.hex]
  );

  const whiteColor = useMemo(() => new THREE.Color("#ffffff"), []);
  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);
  const bodyTint = useMemo(() => {
    const c = new THREE.Color(accent);
    c.lerp(whiteColor, 0.4);
    return c;
  }, [accent, whiteColor]);

  useEffect(() => {
    return () => iconTexture.dispose();
  }, [iconTexture]);

  useFrame((state) => {
    if (!pressRef.current) return;
    const pressed = hovered ? -PRESS_DEPTH : 0;
    const t = state.clock.elapsedTime;

    const isHighlighted = highlightsRef.current?.has(icon.slug) ?? false;
    liftAmp.current = THREE.MathUtils.lerp(
      liftAmp.current,
      isHighlighted ? 1 : 0,
      0.08
    );
    const bob = Math.sin(t * 2.5 + wavePhase) * 0.15 * liftAmp.current;

    const isContact = activeSectionRef.current === "contact";
    contactAmp.current = THREE.MathUtils.lerp(
      contactAmp.current,
      isContact ? 1 : 0,
      0.06
    );
    const sineRaw = Math.sin(t * randomBob.freq + randomBob.phase);
    const popRaw = Math.max(0, sineRaw - randomBob.threshold);
    const popNorm = popRaw / (1 - randomBob.threshold);
    const randomPop = popNorm * 0.15 * contactAmp.current;

    const target = pressed + bob + randomPop;
    pressY.current = THREE.MathUtils.lerp(pressY.current, target, 0.24);
    pressRef.current.position.y = pressY.current;

    if (matRef.current) {
      const pulse = (bob / 0.15 + 1) * 0.5;
      const targetIntensity =
        baseEmissive + liftAmp.current * (0.5 + pulse * 0.5);
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetIntensity,
        0.15
      );
      matRef.current.emissive
        .copy(whiteColor)
        .lerp(accentColor, liftAmp.current);
      matRef.current.color
        .copy(whiteColor)
        .lerp(bodyTint, liftAmp.current);
    }
  });

  const handleOver = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onHoverChange(true);
    },
    [onHoverChange]
  );
  const handleOut = useCallback(() => onHoverChange(false), [onHoverChange]);

  const handleDown = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onHoverChange(true);
    },
    [onHoverChange]
  );
  const handleUp = useCallback(() => onHoverChange(false), [onHoverChange]);

  const iconY = KEYCAP_HEIGHT / 2 + 0.0015;

  return (
    <group position={position}>
      <group ref={pressRef}>
        <mesh
          geometry={geometry}
          onPointerOver={isMobile ? undefined : handleOver}
          onPointerOut={isMobile ? undefined : handleOut}
          onPointerDown={isMobile ? handleDown : undefined}
          onPointerUp={isMobile ? handleUp : undefined}
          onPointerCancel={isMobile ? handleUp : undefined}
        >
          <meshPhysicalMaterial
            ref={matRef}
            color="#ffffff"
            transmission={0}
            roughness={0.28}
            clearcoat={isMobile ? 0 : 0.4}
            clearcoatRoughness={0.15}
            metalness={0}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh
          position={[0, iconY, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          raycast={() => null}
        >
          <planeGeometry args={[ICON_PLANE_SIZE, ICON_PLANE_SIZE]} />
          <meshBasicMaterial
            map={iconTexture}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function Keyboard({ mobile, highlightsSet }: { mobile: boolean; highlightsSet: Set<string> }) {
  const ref = useRef<THREE.Group>(null);
  const isMobile = mobile;
  const [_activeSection, activeSectionRef] = useActiveSection();
  const highlightsRef = useRef<Set<string>>(highlightsSet);

  useEffect(() => {
    highlightsRef.current = highlightsSet;
  }, [highlightsSet]);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const current = useRef<KeyboardState>({ ...SECTION_STATES.stack });

  useEffect(() => {
    document.body.style.cursor = hoveredKey ? "pointer" : "auto";
    if (hoveredKey) {
      const [row, col] = hoveredKey.split("-").map(Number);
      playKeyClick(row * COLS + col);
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hoveredKey]);

  useEffect(() => {
    if (ref.current) ref.current.rotation.order = "YXZ";
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const target = mobile
      ? MOBILE_STATE
      : SECTION_STATES[activeSectionRef.current] ?? SECTION_STATES.stack;
    const k = 1 - Math.pow(0.001, delta);
    const c = current.current;
    c.yaw = THREE.MathUtils.lerp(c.yaw, target.yaw, k);
    c.pitch = THREE.MathUtils.lerp(c.pitch, target.pitch, k);
    c.roll = THREE.MathUtils.lerp(c.roll, target.roll, k);
    c.posX = THREE.MathUtils.lerp(c.posX, target.posX, k);
    c.posY = THREE.MathUtils.lerp(c.posY, target.posY, k);
    c.posZ = THREE.MathUtils.lerp(c.posZ, target.posZ, k);
    c.scale = THREE.MathUtils.lerp(c.scale, target.scale, k);

    const isShowcase = mobile || activeSectionRef.current === "stack";
    const yawSwing = isShowcase ? 0.35 : 0.05;
    const pitchSwing = isShowcase ? 0.05 : 0.0;
    const rollSwing = isShowcase ? 0.03 : 0.0;
    const period = isShowcase ? 10 : 20;
    const w = (Math.PI * 2) / period;

    ref.current.rotation.y = c.yaw + Math.sin(t * w) * yawSwing;
    ref.current.rotation.x = c.pitch + Math.sin(t * w * 0.6) * pitchSwing;
    ref.current.rotation.z = c.roll + Math.sin(t * w * 0.8) * rollSwing;
    ref.current.position.x = c.posX;
    ref.current.position.y = c.posY + Math.sin(t * 0.65) * 0.04;
    ref.current.position.z = c.posZ;
    ref.current.scale.setScalar(c.scale);
  });

  const keycapGeom = useMemo(
    () =>
      createExtrudedBox(
        KEYCAP_SIZE,
        KEYCAP_SIZE,
        KEYCAP_HEIGHT,
        0.05,
        0.012,
        KEYCAP_TOP_SCALE
      ),
    []
  );
  const baseGeom = useMemo(
    () => createExtrudedBox(BASE_WIDTH, BASE_DEPTH, BASE_HEIGHT, 0.12, 0.02, 1),
    []
  );

  useEffect(() => {
    return () => {
      keycapGeom.dispose();
      baseGeom.dispose();
    };
  }, [keycapGeom, baseGeom]);

  const hoveredIcon = useMemo(() => {
    if (!hoveredKey) return null;
    const [r, c] = hoveredKey.split("-").map(Number);
    return SKILLS_GRID[r]?.[c] ?? null;
  }, [hoveredKey]);

  const keycapY = BASE_HEIGHT / 2 + KEYCAP_HEIGHT / 2 + 0.005;
  const keycaps = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = (col - (COLS - 1) / 2) * COL_SPACING;
      const z = (row - (ROWS - 1) / 2) * ROW_SPACING;
      const id = `${row}-${col}`;
      const icon = SKILLS_GRID[row][col];
      const wavePhase = row * 0.9 + col * 0.55;
      keycaps.push(
        <Keycap
          key={id}
          geometry={keycapGeom}
          position={[x, keycapY, z]}
          isMobile={isMobile}
          icon={icon}
          hovered={hoveredKey === id}
          highlightsRef={highlightsRef}
          activeSectionRef={activeSectionRef}
          wavePhase={wavePhase}
          accent={palette.accent}
          onHoverChange={(h) =>
            setHoveredKey((prev) => (h ? id : prev === id ? null : prev))
          }
        />
      );
    }
  }

  return (
    <>
      <group ref={ref}>
        <mesh geometry={baseGeom}>
          <meshStandardMaterial
            color={palette.keyboardBase}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>
        {keycaps}
      </group>
      {hoveredIcon && (
        <Suspense fallback={null}>
          <group
            position={[-1.0, -0.7, 1.2]}
            rotation={[-0.9, 0.1, 0.4]}
          >
            <Text
              fontSize={0.20}
              color="#000000"
              anchorX="left"
              anchorY="bottom"
              fontWeight="bold"
            >
              {hoveredIcon.title}
            </Text>
            <Text
              position={[0, -0.06, 0]}
              fontSize={0.095}
              color="#555555"
              anchorX="left"
              anchorY="top"
              maxWidth={1.8}
              lineHeight={1.3}
            >
              {TAGLINES[hoveredIcon.slug] || ""}
            </Text>
          </group>
        </Suspense>
      )}
    </>
  );
}

export default function FrozenKeyboard({
  mobile = false,
  highlights = "figma,react,nodedotjs,typescript,python",
}: {
  mobile?: boolean;
  highlights?: string;
}) {
  const highlightsSet = useMemo(() => {
    return new Set(highlights.split(",").map(s => s.trim()).filter(Boolean));
  }, [highlights]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={
          mobile
            ? { position: [0, 2.0, 9.0], fov: 26 }
            : { position: [0, 2.5, 8.5], fov: 28 }
        }
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Environment resolution={128} environmentIntensity={0.35}>
          <Lightformer
            intensity={1.2}
            color="#ffffff"
            position={[0, 6, -4]}
            rotation={[0, 0, 0]}
            scale={[12, 6, 1]}
          />
          <Lightformer
            intensity={0.8}
            color="#ffffff"
            position={[-6, 2, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[6, 4, 1]}
          />
          <Lightformer
            intensity={0.6}
            color="#ffffff"
            position={[6, 3, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[6, 4, 1]}
          />
        </Environment>
        <ambientLight intensity={0.25} />
        <directionalLight position={[-4, 7, 4]} intensity={2.0} />
        <hemisphereLight
          intensity={0.3}
          color="#fbfcfd"
          groundColor="#0a0a0f"
        />
        <Keyboard mobile={mobile} highlightsSet={highlightsSet} />
      </Canvas>
    </div>
  );
}
