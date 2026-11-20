"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  Color,
  DynamicDrawUsage,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  InstancedMesh,
  IcosahedronGeometry,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OctahedronGeometry,
  Points,
  Shape,
  TetrahedronGeometry,
} from "three";

import { scene, type SceneTier } from "@/lib/motion";
import { buildGraph, type Graph } from "./graph";

type Palette = { accent: string; info: string; line: string; lineOpacity: number; shieldFill: number };

const palettes: Record<"dark" | "light", Palette> = {
  dark: { accent: "#c5f82a", info: "#22d3ee", line: "#7d8794", lineOpacity: 0.38, shieldFill: 0.07 },
  light: { accent: "#4d7c0f", info: "#0e7490", line: "#6b7280", lineOpacity: 0.5, shieldFill: 0.09 },
};

type SceneProps = {
  theme: "dark" | "light";
  tier: SceneTier;
  active: boolean;
  onReady: () => void;
  onSlow: () => void;
  eventSource?: HTMLElement | null;
};

function shieldShape() {
  const s = new Shape();
  s.moveTo(0, 1.35);
  s.bezierCurveTo(0.45, 1.15, 0.95, 1.1, 1.1, 1.05);
  s.lineTo(1.1, 0.1);
  s.bezierCurveTo(1.1, -0.65, 0.6, -1.15, 0, -1.45);
  s.bezierCurveTo(-0.6, -1.15, -1.1, -0.65, -1.1, 0.1);
  s.lineTo(-1.1, 1.05);
  s.bezierCurveTo(-0.95, 1.1, -0.45, 1.15, 0, 1.35);
  return s;
}

function Shield({ palette, hoverRef }: { palette: Palette; hoverRef: React.RefObject<boolean> }) {
  const group = useRef<Group>(null);
  const ring = useRef<Group>(null);
  const pulse = useRef(0);
  const layers = useMemo(() => {
    const solid = new ExtrudeGeometry(shieldShape(), {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 1,
      curveSegments: 14,
    });
    solid.center();
    return { solid, edges: new EdgesGeometry(solid, 25), keyhole: new CircleGeometry(0.16, 20) };
  }, []);
  const specs = [
    { scale: 1, z: 0, color: palette.accent, edge: 0.95, fill: palette.shieldFill },
    { scale: 0.72, z: 0.2, color: palette.info, edge: 0.7, fill: palette.shieldFill + 0.03 },
    { scale: 0.46, z: 0.4, color: palette.accent, edge: 0.55, fill: palette.shieldFill + 0.05 },
  ];
  const materials = useRef<MeshBasicMaterial[]>([]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const hover = hoverRef.current ? 1 : 0;
    const target = 1 + hover * 0.07 + pulse.current * 0.1;
    g.scale.setScalar(MathUtils.damp(g.scale.x, target, 6, delta));
    g.rotation.y = Math.sin(t * 0.5) * 0.35 + state.pointer.x * 0.35;
    g.rotation.x = Math.sin(t * 0.35) * 0.08 - state.pointer.y * 0.2;
    pulse.current = Math.max(0, pulse.current - delta * 2.2);
    materials.current.forEach((material, index) => {
      const base = specs[index]?.fill ?? 0.08;
      material.opacity = MathUtils.damp(material.opacity, base + hover * 0.12, 6, delta);
    });
    if (ring.current) {
      ring.current.rotation.z += delta * 0.35;
      ring.current.rotation.x = 1.1 + Math.sin(t * 0.4) * 0.1;
    }
  });

  return (
    <group
      ref={group}
      onPointerOver={(event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        hoverRef.current = true;
      }}
      onPointerOut={() => {
        hoverRef.current = false;
      }}
      onClick={() => {
        pulse.current = 1;
      }}
    >
      {specs.map((spec, index) => (
        <group key={index} scale={spec.scale} position={[0, 0, spec.z]}>
          <mesh geometry={layers.solid}>
            <meshBasicMaterial
              ref={(material) => {
                if (material) materials.current[index] = material;
              }}
              color={spec.color}
              transparent
              opacity={spec.fill}
              depthWrite={false}
            />
          </mesh>
          <lineSegments geometry={layers.edges}>
            <lineBasicMaterial color={spec.color} transparent opacity={spec.edge} />
          </lineSegments>
        </group>
      ))}
      <mesh geometry={layers.keyhole} position={[0, 0.12, 0.62]}>
        <meshBasicMaterial color={palette.info} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, -0.12, 0.62]}>
        <planeGeometry args={[0.12, 0.34]} />
        <meshBasicMaterial color={palette.info} transparent opacity={0.9} />
      </mesh>
      <group ref={ring}>
        <mesh>
          <torusGeometry args={[1.85, 0.012, 6, 96]} />
          <meshBasicMaterial color={palette.info} transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}

function Network({ graph, palette, tier }: { graph: Graph; palette: Palette; tier: SceneTier }) {
  const config = scene[tier];
  const nodes = useRef<InstancedMesh>(null);
  const lines = useRef<LineSegments>(null);
  const hot = useRef<LineSegments>(null);
  const points = useRef<Points>(null);
  const hoveredNode = useRef(-1);
  const lastHovered = useRef(-2);
  const dummy = useMemo(() => new Object3D(), []);
  const accent = useMemo(() => new Color(palette.accent), [palette.accent]);
  const info = useMemo(() => new Color(palette.info), [palette.info]);

  const lineGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    const array = new Float32Array(graph.edgeCount * 6);
    for (let i = 0; i < graph.edgeCount; i++) {
      const a = (graph.edges[i * 2] ?? 0) * 3;
      const b = (graph.edges[i * 2 + 1] ?? 0) * 3;
      for (let k = 0; k < 3; k++) {
        array[i * 6 + k] = graph.positions[a + k] ?? 0;
        array[i * 6 + 3 + k] = graph.positions[b + k] ?? 0;
      }
    }
    geometry.setAttribute("position", new BufferAttribute(array, 3));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, [graph]);

  const hotGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    const attribute = new BufferAttribute(new Float32Array(8 * 6), 3);
    attribute.setUsage(DynamicDrawUsage);
    geometry.setAttribute("position", attribute);
    geometry.setDrawRange(0, 0);
    return geometry;
  }, []);

  const particles = useMemo(() => {
    const count = Math.min(config.particles, graph.edgeCount);
    const geometry = new BufferGeometry();
    const attribute = new BufferAttribute(new Float32Array(count * 3), 3);
    attribute.setUsage(DynamicDrawUsage);
    geometry.setAttribute("position", attribute);
    const state = Array.from({ length: count }, (_, i) => ({
      edge: Math.floor((i / Math.max(1, count)) * graph.edgeCount),
      t: (i * 0.37) % 1,
      speed: 0.18 + ((i * 0.13) % 0.3),
    }));
    return { geometry, state, count };
  }, [config.particles, graph.edgeCount]);

  useEffect(() => {
    const mesh = nodes.current;
    if (!mesh) return;
    for (let i = 0; i < graph.count; i++) mesh.setColorAt(i, accent);
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [graph.count, accent]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const raw = Math.min(1, t / scene.connectSeconds);
    const progress = 1 - Math.pow(1 - raw, 3);
    const mesh = nodes.current;

    if (lines.current) lineGeometry.setDrawRange(0, Math.floor(progress * graph.edgeCount) * 2);

    if (mesh && (raw < 1 || lastHovered.current !== hoveredNode.current)) {
      for (let i = 0; i < graph.count; i++) {
        const appear = MathUtils.clamp((progress - (graph.rank[i] ?? 0) * 0.6) / 0.4, 0, 1);
        const boost = hoveredNode.current === i ? 2.4 : 1;
        dummy.position.set(graph.positions[i * 3] ?? 0, graph.positions[i * 3 + 1] ?? 0, graph.positions[i * 3 + 2] ?? 0);
        dummy.scale.setScalar(appear * boost);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, hoveredNode.current === i ? info : accent);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      const hotAttr = hotGeometry.getAttribute("position") as BufferAttribute;
      const near = hoveredNode.current >= 0 ? (graph.neighbours[hoveredNode.current] ?? []).slice(0, 8) : [];
      near.forEach((n, k) => {
        for (let c = 0; c < 3; c++) {
          hotAttr.setXYZ(k * 2, graph.positions[hoveredNode.current * 3] ?? 0, graph.positions[hoveredNode.current * 3 + 1] ?? 0, graph.positions[hoveredNode.current * 3 + 2] ?? 0);
          hotAttr.setXYZ(k * 2 + 1, graph.positions[n * 3] ?? 0, graph.positions[n * 3 + 1] ?? 0, graph.positions[n * 3 + 2] ?? 0);
        }
      });
      hotAttr.needsUpdate = true;
      hotGeometry.setDrawRange(0, near.length * 2);
      lastHovered.current = hoveredNode.current;
    }

    if (points.current && particles.count > 0 && raw >= 0.6) {
      const attribute = particles.geometry.getAttribute("position") as BufferAttribute;
      particles.state.forEach((p, i) => {
        p.t += delta * p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.edge = (p.edge + 7) % graph.edgeCount;
        }
        const a = (graph.edges[p.edge * 2] ?? 0) * 3;
        const b = (graph.edges[p.edge * 2 + 1] ?? 0) * 3;
        attribute.setXYZ(
          i,
          MathUtils.lerp(graph.positions[a] ?? 0, graph.positions[b] ?? 0, p.t),
          MathUtils.lerp(graph.positions[a + 1] ?? 0, graph.positions[b + 1] ?? 0, p.t),
          MathUtils.lerp(graph.positions[a + 2] ?? 0, graph.positions[b + 2] ?? 0, p.t),
        );
      });
      attribute.needsUpdate = true;
    }
  });

  return (
    <group>
      <lineSegments ref={lines} geometry={lineGeometry}>
        <lineBasicMaterial color={palette.line} transparent opacity={palette.lineOpacity} />
      </lineSegments>
      <lineSegments ref={hot} geometry={hotGeometry}>
        <lineBasicMaterial color={palette.info} transparent opacity={0.95} />
      </lineSegments>
      <instancedMesh
        ref={nodes}
        args={[undefined, undefined, graph.count]}
        onPointerMove={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation();
          if (event.instanceId !== undefined) hoveredNode.current = event.instanceId;
        }}
        onPointerOut={() => {
          hoveredNode.current = -1;
        }}
      >
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshBasicMaterial />
      </instancedMesh>
      {particles.count > 0 && (
        <points ref={points} geometry={particles.geometry}>
          <pointsMaterial color={palette.info} size={0.07} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
        </points>
      )}
    </group>
  );
}

function Floaters({ palette, count }: { palette: Palette; count: number }) {
  const refs = useRef<(Mesh | LineSegments | null)[]>([]);
  const geometries = useMemo(
    () => [
      new EdgesGeometry(new OctahedronGeometry(0.26)),
      new EdgesGeometry(new TetrahedronGeometry(0.28)),
      new EdgesGeometry(new IcosahedronGeometry(0.24)),
    ],
    [],
  );
  const spots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.cos(i * 1.9) * (3.4 + (i % 2) * 0.9),
        y: Math.sin(i * 2.3) * 2.4,
        z: -0.8 + (i % 3) * 0.7,
        speed: 0.2 + i * 0.05,
      })),
    [count],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    spots.forEach((spot, i) => {
      const object = refs.current[i];
      if (!object) return;
      object.position.set(spot.x, spot.y + Math.sin(t * spot.speed + i) * 0.25, spot.z);
      object.rotation.x = t * spot.speed;
      object.rotation.y = t * spot.speed * 0.7;
    });
  });

  return (
    <group>
      {spots.map((_, i) => (
        <lineSegments
          key={i}
          ref={(object) => {
            refs.current[i] = object;
          }}
          geometry={geometries[i % geometries.length]}
        >
          <lineBasicMaterial color={i % 2 ? palette.info : palette.accent} transparent opacity={0.55} />
        </lineSegments>
      ))}
    </group>
  );
}

function Rig({ children, tier }: { children: React.ReactNode; tier: SceneTier }) {
  const group = useRef<Group>(null);
  const { viewport } = useThree();
  const shifted = tier !== "mobile";

  useFrame((state, delta) => {
    const camera = state.camera;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x + Math.sin(t * 0.3) * 0.15;
    const py = state.pointer.y + Math.cos(t * 0.25) * 0.1;
    camera.position.x = MathUtils.damp(camera.position.x, px * scene.parallax, 3, delta);
    camera.position.y = MathUtils.damp(camera.position.y, py * scene.parallax * 0.6, 3, delta);
    camera.lookAt(0, 0, 0);
    if (group.current) {
      group.current.position.x = MathUtils.damp(group.current.position.x, shifted ? viewport.width * 0.26 : 0, 4, delta);
    }
  });

  return <group ref={group}>{children}</group>;
}

function FpsGuard({ onSlow }: { onSlow: () => void }) {
  const slow = useRef(0);
  const fired = useRef(false);
  useFrame((state, delta) => {
    if (fired.current || state.clock.elapsedTime < 2.5) return;
    slow.current = delta > 1 / scene.lowFpsThreshold ? slow.current + delta : Math.max(0, slow.current - delta);
    if (slow.current > scene.lowFpsSeconds) {
      fired.current = true;
      onSlow();
    }
  });
  return null;
}

export default function HeroScene({ theme, tier, active, onReady, onSlow, eventSource }: SceneProps) {
  const palette = palettes[theme];
  const config = scene[tier];
  const graph = useMemo(() => buildGraph(tier), [tier]);
  const hoverRef = useRef(false);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[config.dpr[0], config.dpr[1]]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ alpha: true, antialias: config.antialias, powerPreference: "default" }}
      onCreated={onReady}
      {...(eventSource ? { eventSource: { current: eventSource }, eventPrefix: "client" as const } : {})}
    >
      <Rig tier={tier}>
        <Network graph={graph} palette={palette} tier={tier} />
        <Shield palette={palette} hoverRef={hoverRef} />
        {config.floaters > 0 && <Floaters palette={palette} count={config.floaters} />}
      </Rig>
      <FpsGuard onSlow={onSlow} />
    </Canvas>
  );
}
