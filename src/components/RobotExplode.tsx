"use client";
import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { setConsoleFunction } from "three";
import gsap from "gsap";
import { useLanguage } from "@/lib/language";

// Three r183 deprecates THREE.Clock in favor of THREE.Timer. @react-three/fiber
// still constructs a Clock internally, which prints a noisy console warning on
// every page load. Route Three's logger through a filter so the deprecation
// chatter is silenced without hiding any other warnings or errors. Runs once.
declare global {
  var __openarm_three_console_patched: boolean | undefined;
}
if (typeof globalThis !== "undefined" && !globalThis.__openarm_three_console_patched) {
  globalThis.__openarm_three_console_patched = true;
  setConsoleFunction((type, message, ...params) => {
    if (
      type === "warn" &&
      typeof message === "string" &&
      message.includes("Clock") &&
      message.includes("deprecated")
    ) {
      return;
    }
    const fn =
      type === "warn"
        ? console.warn
        : type === "error"
          ? console.error
          : console.log;
    fn.call(console, message as unknown as string, ...(params as unknown[]));
  });
}

// Slightly lifted scene background so the dark robot reads better while keeping
// the page-wide canvas color recognizable.
const SCENE_BG = "#15171F";

type PartType = "motor" | "alu_dark" | "alu_light" | "steel" | "printed" | "rail";
type Side = "left" | "right" | "center";

interface PartConfig {
  type: PartType;
  label: string | null;
  side: Side;
}

// NAUO node ID -> part config. side controls which way the part explodes:
// - "right" arm parts blow out to +X
// - "left" arm parts blow out to -X
// - "center" parts (chest, column, standoffs) stay near the centerline
const PART_BY_NAUO: Record<string, PartConfig> = {
  // Right arm (NAUO45-58 in the GLB hierarchy)
  NAUO58: { type: "motor", label: "DM-8009P", side: "right" },
  NAUO57: { type: "motor", label: null, side: "right" },
  NAUO56: { type: "printed", label: null, side: "right" },
  NAUO55: { type: "printed", label: null, side: "right" },
  NAUO54: { type: "alu_light", label: "Aluminum CNC part", side: "right" },
  NAUO53: { type: "steel", label: "Stainless CNC part", side: "right" },
  NAUO52: { type: "steel", label: "Stainless steel sheet metal", side: "right" },
  NAUO51: { type: "printed", label: "3D-printed casing", side: "right" },
  NAUO50: { type: "motor", label: "DM-4310", side: "right" },
  NAUO45: { type: "motor", label: null, side: "right" },
  NAUO46: { type: "rail", label: "Linear Guide Rail", side: "right" },
  NAUO47: { type: "alu_light", label: null, side: "right" },
  NAUO48: { type: "printed", label: "3D-printed finger", side: "right" },
  NAUO49: { type: "printed", label: null, side: "right" },
  // Left arm (NAUO24-36 in the GLB hierarchy)
  NAUO36: { type: "motor", label: null, side: "left" },
  NAUO35: { type: "motor", label: null, side: "left" },
  NAUO34: { type: "printed", label: null, side: "left" },
  NAUO33: { type: "printed", label: null, side: "left" },
  NAUO32: { type: "alu_light", label: null, side: "left" },
  NAUO31: { type: "steel", label: null, side: "left" },
  NAUO30: { type: "steel", label: null, side: "left" },
  NAUO29: { type: "printed", label: null, side: "left" },
  NAUO28: { type: "motor", label: null, side: "left" },
  NAUO24: { type: "motor", label: null, side: "left" },
  NAUO25: { type: "rail", label: null, side: "left" },
  NAUO26: { type: "printed", label: null, side: "left" },
  NAUO27: { type: "printed", label: null, side: "left" },
  // Chest + extrusion + standoffs (centerline)
  NAUO12: { type: "printed", label: "Chest cover", side: "center" },
  NAUO13: { type: "alu_dark", label: "Aluminum Extrusion", side: "center" },
  NAUO14: { type: "alu_dark", label: "Aluminum Standoff", side: "center" },
  NAUO15: { type: "alu_dark", label: null, side: "center" },
  NAUO8: { type: "alu_dark", label: null, side: "center" },
  NAUO9: { type: "alu_dark", label: null, side: "center" },
};

const MATERIALS: Record<PartType, { color: string; metalness: number; roughness: number }> = {
  motor: { color: "#4A4A52", metalness: 0.6, roughness: 0.42 },
  alu_dark: { color: "#52525C", metalness: 0.6, roughness: 0.42 },
  alu_light: { color: "#DDE2EA", metalness: 0.78, roughness: 0.3 },
  steel: { color: "#ECF0F4", metalness: 0.9, roughness: 0.18 },
  printed: { color: "#7A7E86", metalness: 0.2, roughness: 0.58 },
  rail: { color: "#CED2D8", metalness: 0.86, roughness: 0.22 },
};

interface KeptPart {
  mesh: THREE.Mesh;
  config: PartConfig;
  origPos: THREE.Vector3;
  explodeDir: THREE.Vector3;
  label?: string;
}

interface RobotExplodeProps {
  activeStep?: number;
}

interface StoryCallout {
  id: string;
  step: number;
  x: number;
  y: number;
  title: string;
  titleZh: string;
  body: string;
  bodyZh: string;
}

// 4-step story; keeping all step-indexed arrays as fixed-length tuples so
// adding a new story step forces a TS error in every place that needs it.
const STEP_EXPLODE_PROGRESS = [0, 0.52, 0.5, 0.3] as const;

const BASE_ROTATION_Z = 0;

const STEP_TRANSFORMS = [
  { x: 0, y: -0.08, scale: 0.64, rotationOffset: 0 },
  { x: 0, y: -0.04, scale: 0.56, rotationOffset: 0 },
  { x: 0.02, y: -0.1, scale: 0.6, rotationOffset: 0.02 },
  { x: 0, y: -0.06, scale: 0.62, rotationOffset: -0.02 },
] as const;

const EXPLODE_SIDE_DISTANCE = 2.6;
const EXPLODE_FINE_SPREAD = 0.16;

const STORY_CALLOUTS: StoryCallout[] = [
  {
    id: "actuator",
    step: 1,
    x: 64,
    y: 32,
    title: "Modular actuator stack",
    titleZh: "模块化执行器堆叠",
    body: "Service joints independently instead of replacing the full arm.",
    bodyZh: "可独立维护关节，无需替换整条机械臂。",
  },
  {
    id: "shell",
    step: 1,
    x: 42,
    y: 48,
    title: "Serviceable shell",
    titleZh: "可维护外壳",
    body: "Printed covers protect wiring while keeping fast iteration possible.",
    bodyZh: "打印外壳保护线束，同时保留快速迭代空间。",
  },
  {
    id: "load-path",
    step: 1,
    x: 70,
    y: 66,
    title: "CNC load path",
    titleZh: "CNC 承力路径",
    body: "Metal structural parts carry repeatable manipulation loads.",
    bodyZh: "金属结构件承担稳定可重复的操作载荷。",
  },
  {
    id: "gripper",
    step: 2,
    x: 26,
    y: 40,
    title: "Swappable end effector",
    titleZh: "可替换末端执行器",
    body: "The finger geometry can evolve with each manipulation task.",
    bodyZh: "手指几何可随不同操作任务持续演进。",
  },
  {
    id: "wrist",
    step: 2,
    x: 48,
    y: 58,
    title: "Teleoperation wrist",
    titleZh: "远程操作腕部",
    body: "A compact wrist stack keeps dexterous control close to the tool.",
    bodyZh: "紧凑腕部结构让灵巧控制更贴近工具端。",
  },
  {
    id: "sdk",
    step: 3,
    x: 64,
    y: 36,
    title: "ROS 2 + Python SDK",
    titleZh: "ROS 2 + Python SDK",
    body: "Move from low-level control to repeatable research workflows.",
    bodyZh: "从底层控制平滑进入可重复的科研工作流。",
  },
  {
    id: "simulation",
    step: 3,
    x: 52,
    y: 62,
    title: "Simulation ready",
    titleZh: "仿真就绪",
    body: "Bridge MuJoCo and Isaac Sim before running policies on hardware.",
    bodyZh: "策略上硬件前，可先接入 MuJoCo 与 Isaac Sim。",
  },
];

const uiCopy = {
  en: {
    step: "Story step",
  },
  zh: {
    step: "故事步骤",
  },
};

function Model({
  explodeProgress,
  activeStep,
}: {
  explodeProgress: number;
  activeStep: number;
}) {
  const { scene } = useGLTF("/models/robot-model.glb", true);
  const outerGroupRef = useRef<THREE.Group>(null);
  const partsRef = useRef<KeptPart[]>([]);
  const initRef = useRef(false);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    clonedScene.updateMatrixWorld(true);

    const allMeshes: THREE.Mesh[] = [];
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        allMeshes.push(child);
      }
    });

    const partsList: KeptPart[] = [];
    const armWorldPositions: THREE.Vector3[] = [];

    for (const mesh of allMeshes) {
      const config = PART_BY_NAUO[mesh.name];
      if (!config) {
        mesh.visible = false;
        continue;
      }

      mesh.visible = true;

      const matSpec = MATERIALS[config.type];
      mesh.material = new THREE.MeshStandardMaterial({
        color: matSpec.color,
        metalness: matSpec.metalness,
        roughness: matSpec.roughness,
      });

      const wp = new THREE.Vector3();
      mesh.getWorldPosition(wp);
      armWorldPositions.push(wp);

      partsList.push({
        mesh,
        config,
        origPos: mesh.position.clone(),
        explodeDir: new THREE.Vector3(),
        label: config.label ?? undefined,
      });
    }

    if (partsList.length === 0) return;

    const armBox = new THREE.Box3().setFromPoints(armWorldPositions);
    const armCenter = armBox.getCenter(new THREE.Vector3());

    // Compute Y range for ARM parts only (not center/column/chest) so we can
    // measure each joint's position along the chain (shoulder → gripper).
    let armYmin = Number.POSITIVE_INFINITY;
    let armYmax = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < partsList.length; i++) {
      if (partsList[i].config.side === "center") continue;
      const y = armWorldPositions[i].y;
      if (y < armYmin) armYmin = y;
      if (y > armYmax) armYmax = y;
    }
    const armYrange = Math.max(armYmax - armYmin, 0.001);

    const toParentLocalOffset = (
      mesh: THREE.Mesh,
      worldPosition: THREE.Vector3,
      worldOffset: THREE.Vector3,
    ) => {
      const parent = mesh.parent;
      if (!parent) return worldOffset;

      parent.updateWorldMatrix(true, false);
      const currentLocal = parent.worldToLocal(worldPosition.clone());
      const targetLocal = parent.worldToLocal(worldPosition.clone().add(worldOffset));
      return targetLocal.sub(currentLocal);
    };

    // Two-arm symmetric explosion:
    // - Right-arm parts blow out along +X with magnitude growing toward the gripper.
    // - Left-arm parts blow out along -X symmetrically.
    // - Center parts (chest, column, standoffs) only spread slightly along Y.
    // Magnitudes are bounded so the assembled view never overflows the viewport.
    for (let i = 0; i < partsList.length; i++) {
      const wp = armWorldPositions[i];
      const cfg = partsList[i].config;
      const mesh = partsList[i].mesh;

      if (cfg.side === "center") {
        const worldOffset = new THREE.Vector3(
          0,
          THREE.MathUtils.clamp((wp.y - armCenter.y) * 0.18, -0.12, 0.12),
          THREE.MathUtils.clamp((wp.z - armCenter.z) * 0.06, -0.05, 0.05),
        );
        partsList[i].explodeDir = toParentLocalOffset(mesh, wp, worldOffset);
        continue;
      }

      // Position in the arm chain: 0 at shoulder, 1 at gripper end. The robot
      // model has both arms folded vertically, so Y captures chain depth well.
      const tChain = THREE.MathUtils.clamp((wp.y - armYmin) / armYrange, 0, 1);
      // Always use the configured side (arms in this GLB are mirrored - their
      // world X positions are nearly identical so geometric inference is unsafe).
      const sideSign = cfg.side === "right" ? 1 : -1;
      // Even shoulder-end parts get a noticeable kick so the two arms visibly
      // part company near the chest; gripper-end gets the full reach.
      const horizontal = EXPLODE_SIDE_DISTANCE * (0.5 + 0.5 * tChain);

      // Tiny vertical jitter keeps co-planar parts (e.g. two shoulder motors)
      // from overlapping when exploded.
      const worldOffset = new THREE.Vector3(
        sideSign * horizontal,
        THREE.MathUtils.clamp((wp.y - (armYmin + armYmax) / 2) * EXPLODE_FINE_SPREAD, -0.14, 0.14),
        THREE.MathUtils.clamp((wp.z - armCenter.z) * 0.08, -0.06, 0.06),
      );
      partsList[i].explodeDir = toParentLocalOffset(mesh, wp, worldOffset);
    }

    partsRef.current = partsList;
  }, [clonedScene]);

  useFrame(() => {
    for (const p of partsRef.current) {
      const offset = p.explodeDir.clone().multiplyScalar(explodeProgress);
      const newLocal = p.origPos.clone().add(offset);
      p.mesh.position.copy(newLocal);
    }

    const transform = STEP_TRANSFORMS[activeStep] ?? STEP_TRANSFORMS[0];
    const group = outerGroupRef.current;
    if (group) {
      group.position.x = THREE.MathUtils.lerp(group.position.x, transform.x, 0.08);
      group.position.y = THREE.MathUtils.lerp(group.position.y, transform.y, 0.08);
      group.rotation.z = THREE.MathUtils.lerp(
        group.rotation.z,
        BASE_ROTATION_Z + transform.rotationOffset,
        0.08,
      );
      const nextScale = THREE.MathUtils.lerp(group.scale.x, transform.scale, 0.08);
      group.scale.setScalar(nextScale);
    }
  });

  // Two-level group: inner group centers the model at origin, outer group controls
  // the story pose while keeping the robot upright in the viewport. The inner
  // X offset is ~0 because the arm cluster is roughly centered on the GLB origin
  // when both arms are visible (right at X≈+0.13, left at X≈-0.13 in scene-local).
  return (
    <group ref={outerGroupRef} rotation={[0, 0, BASE_ROTATION_Z]}>
      <group position={[0, -1.52, 0.4]} scale={2.0}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

function LoadingSpinner() {
  return (
    <mesh>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#00BFFF" wireframe />
    </mesh>
  );
}

export default function RobotExplode({ activeStep = 0 }: RobotExplodeProps) {
  const [explodeProgress, setExplodeProgress] = useState(0);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const progressRef = useRef({ value: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isZh = language === "zh";

  // Detect touch / coarse pointer devices so OrbitControls doesn't hijack
  // page scroll on mobile.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const target = STEP_EXPLODE_PROGRESS[activeStep] ?? 0;
    const tween = gsap.to(progressRef.current, {
      value: target,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => setExplodeProgress(progressRef.current.value),
    });

    return () => {
      tween.kill();
    };
  }, [activeStep]);

  const activeCallouts = STORY_CALLOUTS.filter((callout) => callout.step === activeStep);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ background: SCENE_BG }}
    >
      <Canvas
        camera={{ position: [0, 0.1, 5.4], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, stencil: false, powerPreference: "high-performance" }}
        style={{ background: SCENE_BG }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new THREE.Color(SCENE_BG), 1);
          scene.background = new THREE.Color(SCENE_BG);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.18;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <hemisphereLight args={["#F0F4FA", "#3A4055", 1.05]} />
        <ambientLight intensity={0.78} color="#F2F6FA" />
        <directionalLight position={[4, 6, 5]} intensity={2.1} color="#FFFFFF" castShadow={false} />
        <directionalLight position={[-5, 3, -3]} intensity={1.25} color="#C0DAF8" />
        <directionalLight position={[-6, 2, 4]} intensity={0.7} color="#D6E8FF" />
        <directionalLight position={[0, -4, 4]} intensity={0.55} color="#FFFFFF" />
        <directionalLight position={[6, 0, -5]} intensity={0.65} color="#FFE8C8" />
        <directionalLight position={[0, 5, -4]} intensity={0.55} color="#9DC9FF" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={!isCoarsePointer}
          enableDamping={true}
          dampingFactor={0.08}
          target={[0, 0, 0]}
          minDistance={1.8}
          maxDistance={5}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.65}
          minAzimuthAngle={-Math.PI * 0.15}
          maxAzimuthAngle={Math.PI * 0.15}
        />

        <Suspense fallback={<LoadingSpinner />}>
          <Model explodeProgress={explodeProgress} activeStep={activeStep} />
        </Suspense>
      </Canvas>

      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(8,10,14,0.28) 100%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none z-30">
        <AnimatePresence>
          {activeCallouts.map((callout, index) => (
            <motion.div
              key={callout.id}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="absolute max-w-[220px] rounded-2xl border border-white/10 bg-[#0A0A0F]/70 p-4 text-left shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md"
              style={{
                left: `${callout.x}%`,
                top: `${callout.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="mb-2 h-px w-10 bg-cyan-400" />
              <p className="text-sm font-semibold text-white">
                {isZh ? callout.titleZh : callout.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#B8BAC6]">
                {isZh ? callout.bodyZh : callout.body}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#15171F] via-[#15171F]/55 to-transparent pointer-events-none z-15" />

      <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-[#1A1A24]/80 px-4 py-2 text-xs font-medium text-[#B8BAC6] backdrop-blur-sm">
        {uiCopy[language].step} {activeStep + 1}/4
      </div>
    </div>
  );
}
