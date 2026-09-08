import React, { useEffect, useRef } from "react";

const CUBE_STYLES = `
  .cube-scene {
    width: 90px;
    height: 90px;
    perspective: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tech-cube {
    width: 70px;
    height: 70px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(-20deg) rotateY(35deg);
    transition: transform 0.1s ease-out;
  }

  .cube-face {
    position: absolute;
    width: 70px;
    height: 70px;
    background: rgba(255, 255, 255, 0.95);
    border: 1.5px solid rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #111;
    box-shadow: 
      inset 0 2px 4px rgba(255,255,255,0.8),
      0 4px 12px rgba(0,0,0,0.06);
    backface-visibility: visible;
  }

  /* 3D transforms for faces */
  .face-front  { transform: rotateY(  0deg) translateZ(35px); }
  .face-back   { transform: rotateY(180deg) translateZ(35px); }
  .face-right  { transform: rotateY( 90deg) translateZ(35px); }
  .face-left   { transform: rotateY(-90deg) translateZ(35px); }
  .face-top    { transform: rotateX( 90deg) translateZ(35px); }
  .face-bottom { transform: rotateX(-90deg) translateZ(35px); }

  .face-glow {
    position: absolute;
    inset: 2px;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%);
    pointer-events: none;
  }
`;

export const TechCube: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rotX = -20;
    let rotY = 35;
    let targetRotX = -20;
    let targetRotY = 35;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse positions relative to viewport center
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // range -1 to 1
      const dy = (e.clientY - cy) / cy; // range -1 to 1

      // Map to target angles
      targetRotY = 35 + dx * 50;
      targetRotX = -20 - dy * 50;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animFrameId: number;
    const update = () => {
      // Smooth interpolation (lerp)
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      animFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  const faces = [
    { cls: "face-front", label: "React" },
    { cls: "face-back", label: "Node" },
    { cls: "face-right", label: "AI" },
    { cls: "face-left", label: "UI/UX" },
    { cls: "face-top", label: "Web" },
    { cls: "face-bottom", label: "Design" },
  ];

  return (
    <div className="cube-scene">
      <div className="tech-cube" ref={cubeRef}>
        {faces.map((f) => (
          <div key={f.cls} className={`cube-face ${f.cls}`}>
            <div className="face-glow"></div>
            {f.label}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: CUBE_STYLES }} />
    </div>
  );
};
