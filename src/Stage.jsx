import { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Billboard, RoundedBox, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const FONT = '"Atkinson Hyperlegible","Noto Sans Devanagari",system-ui,sans-serif';
const DISPLAY = '"Bricolage Grotesque","Noto Sans Devanagari",system-ui,sans-serif';

/* ---------- canvas text textures ---------- */
function wrap(ctx, text, maxW) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}

function useTextTexture(draw, deps) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, []);
  useEffect(() => {
    const paint = () => { draw(tex.image); tex.needsUpdate = true; };
    paint();
    // repaint once web fonts (Devanagari) finish loading
    if (document.fonts?.ready) document.fonts.ready.then(paint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

/* ---------- Letters & Words: a spinning alphabet block ---------- */
function Block({ text, sub, accent }) {
  const ref = useRef();
  const spin = useRef(0);
  useEffect(() => { spin.current = Math.PI * 2; }, [text]);
  const tex = useTextTexture((c) => {
    c.width = 512; c.height = 512;
    const x = c.getContext('2d');
    x.fillStyle = '#FBFCFB'; x.fillRect(0, 0, 512, 512);
    x.strokeStyle = accent; x.lineWidth = 18; x.strokeRect(22, 22, 468, 468);
    x.fillStyle = '#18211E'; x.textAlign = 'center'; x.textBaseline = 'middle';
    let size = text.length <= 2 ? 250 : text.length <= 5 ? 150 : 96;
    x.font = `700 ${size}px ${DISPLAY}`;
    while (x.measureText(text).width > 420 && size > 40) { size -= 6; x.font = `700 ${size}px ${DISPLAY}`; }
    x.fillText(text, 256, sub ? 230 : 256);
    if (sub) { x.font = `400 44px ${FONT}`; x.fillStyle = accent; x.fillText(sub, 256, 420); }
  }, [text, sub, accent]);
  useFrame((_, dt) => {
    if (!ref.current) return;
    if (spin.current > 0) { const s = Math.min(spin.current, dt * 9); spin.current -= s; ref.current.rotation.y += s; }
    else ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y % (Math.PI * 2), Math.sin(performance.now() / 1400) * 0.35, 0.05);
    ref.current.position.y = 1.3 + Math.sin(performance.now() / 700) * 0.08;
  });
  return (
    <group ref={ref} position={[0, 1.3, 0]}>
      <RoundedBox args={[2, 2, 2]} radius={0.16} smoothness={4} castShadow>
        <meshStandardMaterial attach="material" map={tex} roughness={0.55} />
      </RoundedBox>
    </group>
  );
}

function Pebbles({ accent }) {
  const items = useMemo(() => Array.from({ length: 9 }, (_, i) => ({
    p: [Math.cos(i * 0.7) * (2.4 + (i % 3) * 0.5), 0.15 + (i % 2) * 0.1, Math.sin(i * 0.7) * (1.6 + (i % 3) * 0.3) - 0.4],
    s: 0.18 + (i % 4) * 0.07,
    c: i % 3 === 0 ? accent : i % 3 === 1 ? '#C9D3CF' : '#8FA39B',
  })), [accent]);
  return items.map((b, i) => (
    <RoundedBox key={i} args={[b.s * 2, b.s * 2, b.s * 2]} radius={0.04} position={b.p} rotation={[0, i, 0]} castShadow>
      <meshStandardMaterial color={b.c} roughness={0.7} />
    </RoundedBox>
  ));
}

/* ---------- Conversation dioramas ---------- */
function Box({ args, position, color, rotation }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.75} />
    </mesh>
  );
}
function Cyl({ args, position, color, rotation }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.75} />
    </mesh>
  );
}
function Tree({ position, s = 1 }) {
  return (
    <group position={position} scale={s}>
      <Cyl args={[0.08, 0.1, 0.9, 8]} position={[0, 0.45, 0]} color="#7A5A3C" />
      <mesh position={[0, 1.25, 0]} castShadow><icosahedronGeometry args={[0.55, 0]} /><meshStandardMaterial color="#4F8A5B" flatShading /></mesh>
    </group>
  );
}
function Moving({ children, speed = 0.6, range = 7, z = -1.6 }) {
  const ref = useRef();
  useFrame(() => { if (ref.current) ref.current.position.x = ((performance.now() / 1000 * speed) % range) - range / 2 - 1; });
  return <group ref={ref} position={[0, 0, z]}>{children}</group>;
}

const PROPS = {
  shop: () => (
    <group>
      <Box args={[3.2, 0.9, 0.7]} position={[0, 0.45, -0.9]} color="#B98A5E" />
      <Box args={[3.2, 0.06, 0.8]} position={[0, 0.93, -0.9]} color="#E6D3BC" />
      <Box args={[3.6, 2.2, 0.3]} position={[0, 1.1, -2]} color="#D9C7A7" />
      {[0.7, 1.4].map((y) => <Box key={y} args={[3.4, 0.06, 0.4]} position={[0, y, -1.75]} color="#9C7350" />)}
      {[-1.3, -0.8, -0.3, 0.3, 0.8, 1.3].map((x, i) => (
        <Box key={x} args={[0.35, 0.4, 0.3]} position={[x, i % 2 ? 1.65 : 0.95, -1.75]} color={['#D95D39', '#3E7CB1', '#F2C14E', '#5B9279'][i % 4]} />
      ))}
      <Box args={[0.5, 0.35, 0.05]} position={[0.6, 1.15, -0.75]} color="#3E7CB1" rotation={[-0.3, 0, 0]} />
    </group>
  ),
  small: () => (
    <group>
      <Tree position={[-2.4, 0, -1.4]} s={1.2} />
      <Tree position={[2.5, 0, -1.6]} />
      <mesh position={[2, 3, -3]}><sphereGeometry args={[0.35, 16, 16]} /><meshBasicMaterial color="#F6C453" /></mesh>
      <Box args={[1.6, 0.08, 0.5]} position={[0, 0.45, -1.4]} color="#A26B43" />
      <Box args={[1.6, 0.5, 0.06]} position={[0, 0.75, -1.65]} color="#A26B43" />
    </group>
  ),
  office: () => (
    <group>
      <Box args={[2.4, 0.08, 1]} position={[0, 0.8, -1.2]} color="#D8DEE2" />
      {[-1.1, 1.1].map((x) => <Box key={x} args={[0.06, 0.8, 0.9]} position={[x, 0.4, -1.2]} color="#5E6B73" />)}
      <Box args={[0.9, 0.55, 0.05]} position={[-0.3, 1.2, -1.5]} color="#22303A" />
      <Box args={[0.84, 0.48, 0.02]} position={[-0.3, 1.2, -1.47]} color="#6FB3D2" />
      <Cyl args={[0.12, 0.1, 0.25, 12]} position={[0.75, 0.97, -1.2]} color="#C26A4A" />
      <mesh position={[0.75, 1.25, -1.2]} castShadow><icosahedronGeometry args={[0.22, 0]} /><meshStandardMaterial color="#4F8A5B" flatShading /></mesh>
      <Box args={[4.4, 2.6, 0.1]} position={[0, 1.3, -2.2]} color="#E9EEF0" />
      <Box args={[1.2, 0.8, 0.04]} position={[1.4, 1.7, -2.12]} color="#F4D35E" />
    </group>
  ),
  bus: () => (
    <group>
      <Box args={[8, 0.04, 1.4]} position={[0, 0.02, -1.8]} color="#4A5056" />
      {[-0.9, 0.9].map((x) => <Cyl key={x} args={[0.04, 0.04, 1.9, 8]} position={[x, 0.95, -0.9]} color="#3A4750" />)}
      <Box args={[2.1, 0.08, 0.9]} position={[0, 1.92, -0.85]} color="#2E86AB" />
      <Box args={[1.6, 1.2, 0.04]} position={[0, 1.1, -1.3]} color="#BFD7EA" />
      <Cyl args={[0.03, 0.03, 2.2, 8]} position={[1.6, 1.1, -0.3]} color="#3A4750" />
      <Cyl args={[0.3, 0.3, 0.05, 20]} position={[1.6, 2.1, -0.3]} rotation={[Math.PI / 2, 0, 0]} color="#F18F01" />
      <Moving speed={0.9} z={-1.9}>
        <RoundedBox args={[2.6, 1.1, 0.9]} radius={0.12} position={[0, 0.75, 0]} castShadow><meshStandardMaterial color="#F18F01" /></RoundedBox>
        <Box args={[2.3, 0.35, 0.92]} position={[0, 0.95, 0]} color="#CDE3F2" />
        {[-0.8, 0.8].map((x) => <Cyl key={x} args={[0.18, 0.18, 0.95, 14]} position={[x, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} color="#222" />)}
      </Moving>
    </group>
  ),
  train: () => (
    <group>
      <Box args={[8, 0.3, 1.6]} position={[0, 0.15, -0.5]} color="#B6BCC1" />
      <Box args={[8, 0.04, 0.12]} position={[0, 0.32, 0.25]} color="#F2C14E" />
      {[-2.1, -2.6].map((z) => <Box key={z} args={[9, 0.05, 0.06]} position={[0, 0.03, z]} color="#6B6F72" />)}
      <Moving speed={0.5} range={9} z={-2.35}>
        {[-1.5, 1.5].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <RoundedBox args={[2.8, 1.3, 1]} radius={0.15} position={[0, 0.85, 0]} castShadow><meshStandardMaterial color="#C0392B" /></RoundedBox>
            <Box args={[2.4, 0.4, 1.02]} position={[0, 1.05, 0]} color="#D6EAF8" />
          </group>
        ))}
      </Moving>
      <Cyl args={[0.04, 0.04, 2.2, 8]} position={[-2.2, 1.1, 0]} color="#3A4750" />
      <Box args={[0.9, 0.45, 0.06]} position={[-2.2, 2.1, 0]} color="#1F3A5F" />
    </group>
  ),
  friends: () => (
    <group>
      <Tree position={[-2.5, 0, -1.2]} s={1.3} />
      <Tree position={[-1.6, 0, -2]} />
      <Tree position={[2.6, 0, -1.6]} s={1.1} />
      <mesh position={[0.4, 0.18, 0.2]} castShadow><sphereGeometry args={[0.18, 20, 20]} /><meshStandardMaterial color="#E4572E" /></mesh>
      <Box args={[1.8, 0.08, 0.5]} position={[0.6, 0.45, -1.5]} color="#8C5E3C" />
    </group>
  ),
  family: () => (
    <group>
      <Box args={[4.6, 2.6, 0.1]} position={[0, 1.3, -2.2]} color="#E8D8C3" />
      <Box args={[0.9, 1.1, 0.05]} position={[-1.2, 1.5, -2.12]} color="#9CC5E0" />
      <Box args={[2, 0.08, 1.1]} position={[0, 0.75, -1.2]} color="#A9714B" />
      {[[-0.9, -0.7], [0.9, -0.7], [-0.9, -1.7], [0.9, -1.7]].map(([x, z]) => <Box key={x + '' + z} args={[0.07, 0.75, 0.07]} position={[x, 0.37, z]} color="#7A5136" />)}
      {[-0.5, 0, 0.5].map((x) => <Cyl key={x} args={[0.18, 0.15, 0.04, 20]} position={[x, 0.81, -1.2]} color="#F5F5F0" />)}
      <Cyl args={[0.12, 0.1, 0.2, 16]} position={[0, 0.9, -1.2]} color="#E8A33D" />
      <Cyl args={[0.01, 0.01, 0.9, 6]} position={[0, 2.1, -1.2]} color="#333" />
      <mesh position={[0, 1.6, -1.2]}><coneGeometry args={[0.3, 0.3, 20, 1, true]} /><meshStandardMaterial color="#F2C14E" side={THREE.DoubleSide} emissive="#F2C14E" emissiveIntensity={0.4} /></mesh>
    </group>
  ),
  restaurant: () => (
    <group>
      <Box args={[4.6, 2.6, 0.1]} position={[0, 1.3, -2.2]} color="#5B2A3A" />
      <Box args={[1, 1.2, 0.04]} position={[1.5, 1.5, -2.12]} color="#1E1E1E" />
      {[0, 1, 2, 3].map((i) => <Box key={i} args={[0.7, 0.03, 0.02]} position={[1.5, 1.85 - i * 0.22, -2.09]} color="#EDE6D6" />)}
      <Cyl args={[0.75, 0.75, 0.06, 32]} position={[0, 0.78, -1.1]} color="#F7F3EA" />
      <Cyl args={[0.06, 0.08, 0.75, 10]} position={[0, 0.38, -1.1]} color="#333" />
      <Cyl args={[0.04, 0.04, 0.2, 10]} position={[0, 0.92, -1.1]} color="#FFF8E1" />
      <mesh position={[0, 1.06, -1.1]}><sphereGeometry args={[0.04, 8, 8]} /><meshBasicMaterial color="#FFB703" /></mesh>
      <pointLight position={[0, 1.2, -1.1]} intensity={1.2} distance={3} color="#FFB703" />
      {[-0.35, 0.35].map((x) => <Cyl key={x} args={[0.17, 0.14, 0.03, 20]} position={[x, 0.82, -0.95]} color="#FFFFFF" />)}
    </group>
  ),
};

PROPS.clinic = () => (
  <group>
    <Box args={[4.6, 2.6, 0.1]} position={[0, 1.3, -2.2]} color="#E3EEF0" />
    <Box args={[1.6, 0.5, 0.7]} position={[-1.4, 0.45, -1.5]} color="#FFFFFF" />
    <Box args={[1.6, 0.12, 0.7]} position={[-1.4, 0.75, -1.5]} color="#9CC9D6" />
    <Box args={[1.2, 0.08, 0.7]} position={[1.1, 0.8, -1.3]} color="#D8DEE2" />
    {[0.6, 1.6].map((x) => <Box key={x} args={[0.06, 0.8, 0.6]} position={[x, 0.4, -1.3]} color="#5E6B73" />)}
    <Box args={[0.5, 0.12, 0.5]} position={[0, 2.0, -2.13]} color="#D64545" />
    <Box args={[0.12, 0.5, 0.5]} position={[0, 2.0, -2.13]} color="#D64545" />
    <Box args={[1.2, 1.2, 0.3]} position={[1.6, 1.4, -2.0]} color="#C9D9DE" />
    {[1.2, 1.6].map((y) => <Box key={y} args={[1.1, 0.04, 0.28]} position={[1.6, y, -1.98]} color="#8FA9B1" />)}
  </group>
);
PROPS.hotel = () => (
  <group>
    <Box args={[4.6, 2.6, 0.1]} position={[0, 1.3, -2.2]} color="#3E4A61" />
    <Box args={[2.8, 0.95, 0.7]} position={[0, 0.48, -1.1]} color="#B08D57" />
    <Box args={[2.9, 0.06, 0.8]} position={[0, 0.98, -1.1]} color="#F1E6D2" />
    <Cyl args={[0.08, 0.12, 0.08, 16]} position={[0.9, 1.05, -1.1]} color="#E0B341" />
    <mesh position={[0.9, 1.11, -1.1]}><sphereGeometry args={[0.07, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#E0B341" metalness={0.6} roughness={0.3} /></mesh>
    {[-1.2, -0.6, 0, 0.6, 1.2].map((x) => <Box key={x} args={[0.14, 0.2, 0.04]} position={[x, 1.8, -2.13]} color="#E0B341" />)}
    <Tree position={[2.2, 0, -1.6]} s={0.8} />
  </group>
);
PROPS.airport = () => (
  <group>
    <Box args={[5, 2.8, 0.1]} position={[0, 1.4, -2.4]} color="#DDE6EE" />
    <Box args={[3.6, 1.1, 0.04]} position={[0, 1.9, -2.33]} color="#9FC3E0" />
    <Box args={[2.6, 0.9, 0.6]} position={[0, 0.45, -1.2]} color="#7C8A96" />
    <Box args={[0.7, 0.08, 0.6]} position={[1.6, 0.2, -1.2]} color="#33404A" />
    <RoundedBox args={[0.45, 0.6, 0.25]} radius={0.05} position={[1.6, 0.55, -1.2]} castShadow><meshStandardMaterial color="#D9782D" /></RoundedBox>
    <Box args={[1.4, 0.5, 0.05]} position={[-1.4, 2.4, -1.4]} color="#1F2A33" />
    <Box args={[1.2, 0.06, 0.02]} position={[-1.4, 2.45, -1.37]} color="#F2C14E" />
    <Moving speed={0.4} range={10} z={-3.2}>
      <group position={[0, 2.3, 0]}>
        <Cyl args={[0.18, 0.18, 1.8, 12]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]} color="#FFFFFF" />
        <Box args={[0.3, 0.05, 1.6]} position={[0, 0, 0]} color="#C7D1DA" />
      </group>
    </Moving>
  </group>
);

const GROUND = {
  clinic: '#D5E3E6', hotel: '#8D7A63', airport: '#B9C2CA',
  shop: '#E9DCC7', small: '#A9C99A', office: '#C9CFD3', bus: '#BFC3C7', train: '#C4C8CB',
  friends: '#9DC38F', family: '#D9BFA0', restaurant: '#7D4A57',
};

function Person({ position, color, skin, speaking, facing }) {
  const ref = useRef();
  const mouth = useRef();
  useFrame(() => {
    const t = performance.now() / 1000;
    if (ref.current) ref.current.position.y = speaking ? Math.abs(Math.sin(t * 7)) * 0.08 : Math.sin(t * 1.5 + position[0]) * 0.015;
    if (mouth.current) mouth.current.scale.y = speaking ? 0.4 + Math.abs(Math.sin(t * 14)) * 1.2 : 0.35;
  });
  return (
    <group position={position} rotation={[0, facing, 0]}>
      <group ref={ref}>
        <mesh position={[0, 0.65, 0]} castShadow><capsuleGeometry args={[0.32, 0.6, 6, 16]} /><meshStandardMaterial color={color} roughness={0.6} /></mesh>
        <mesh position={[0, 1.42, 0]} castShadow><sphereGeometry args={[0.3, 24, 24]} /><meshStandardMaterial color={skin} roughness={0.6} /></mesh>
        {[-0.1, 0.1].map((x) => <mesh key={x} position={[x, 1.47, 0.27]}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color="#1B1B1B" /></mesh>)}
        <mesh ref={mouth} position={[0, 1.34, 0.28]}><sphereGeometry args={[0.05, 10, 10]} /><meshBasicMaterial color="#6B2D2D" /></mesh>
      </group>
    </group>
  );
}

function Bubble({ text, sub, side, accent }) {
  const tex = useTextTexture((c) => {
    c.width = 1024; c.height = 400;
    const x = c.getContext('2d');
    x.clearRect(0, 0, 1024, 400);
    x.font = `700 58px ${DISPLAY}`;
    const lines = wrap(x, text, 900).slice(0, 3);
    x.font = `400 38px ${FONT}`;
    const subLines = sub ? wrap(x, sub, 900).slice(0, 2) : [];
    const h = 60 + lines.length * 70 + subLines.length * 48 + 30;
    const top = 340 - h;
    x.fillStyle = '#FFFFFF';
    x.strokeStyle = accent; x.lineWidth = 8;
    x.beginPath(); x.roundRect(20, top, 984, h, 36); x.fill(); x.stroke();
    const tx = side === 'a' ? 200 : 824;
    x.beginPath(); x.moveTo(tx - 30, top + h - 4); x.lineTo(tx, 392); x.lineTo(tx + 30, top + h - 4); x.closePath(); x.fill();
    x.beginPath(); x.moveTo(tx - 30, top + h); x.lineTo(tx, 392); x.lineTo(tx + 30, top + h); x.stroke();
    x.fillStyle = '#18211E'; x.textAlign = 'center'; x.textBaseline = 'top';
    x.font = `700 58px ${DISPLAY}`;
    lines.forEach((l, i) => x.fillText(l, 512, top + 40 + i * 70));
    x.font = `400 38px ${FONT}`; x.fillStyle = '#5A6662';
    subLines.forEach((l, i) => x.fillText(l, 512, top + 40 + lines.length * 70 + 8 + i * 48));
  }, [text, sub, side, accent]);
  return (
    <Billboard position={[0, 2.75, 0]}>
      <mesh><planeGeometry args={[4.4, 1.72]} /><meshBasicMaterial map={tex} transparent depthWrite={false} /></mesh>
    </Billboard>
  );
}

function Diorama({ scene, line, lang, showSub, accent }) {
  const key = scene.setting || scene.id;
  const Props = PROPS[key] || PROPS.small;
  const speaker = line?.who;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4.2, 64]} />
        <meshStandardMaterial color={GROUND[key] || GROUND.small} roughness={0.95} />
      </mesh>
      <Props />
      <Person position={[-1.15, 0, 0.5]} facing={0.9} color={accent} skin="#C68B59" speaking={speaker === 'a'} />
      <Person position={[1.15, 0, 0.5]} facing={-0.9} color="#3B4F4A" skin="#8D5B3E" speaking={speaker === 'b'} />
      {line && <Bubble text={line[lang]} sub={showSub ? (lang === 'hi' ? line.hiR : null) : null} side={speaker} accent={accent} />}
    </group>
  );
}

export default function Stage({ mode, lang, accent, letter, word, scene, line, showSub }) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2.6, 6.4], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.75} />
      <hemisphereLight args={['#ffffff', '#8a9a94', 0.5]} />
      <directionalLight position={[4, 7, 4]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-6} />
      {mode === 'convo' ? (
        <Diorama scene={scene} line={line} lang={lang} showSub={showSub} accent={accent} />
      ) : (
        <group>
          <Block text={mode === 'letters' ? letter.char : word.t} sub={mode === 'letters' ? letter.name : word.en} accent={accent} />
          <Pebbles accent={accent} />
          <ContactShadows position={[0, 0.01, 0]} opacity={0.35} scale={10} blur={2.4} far={4} />
        </group>
      )}
      <OrbitControls target={[0, 1.1, -0.4]} enablePan={false} minDistance={4} maxDistance={10}
        minPolarAngle={0.5} maxPolarAngle={1.45} enableDamping />
    </Canvas>
  );
}
