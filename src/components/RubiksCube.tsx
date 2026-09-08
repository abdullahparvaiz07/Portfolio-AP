import React, { useEffect, useRef } from "react";

const CUBE_STYLES = `
    .cube-wrapper {
        position: relative;
        z-index: 2;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 450px;
        margin: 0 auto;
    }



    .cube-viewport {
        width: 240px;
        height: 240px;
        perspective: 960px;
        perspective-origin: 50% 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #cubeScene {
        width: 0;
        height: 0;
        transform-style: preserve-3d;
        transform: rotateX(-22deg) rotateY(45deg);
        cursor: grab;
        will-change: transform;
    }

    #cubeScene:active { cursor: grabbing; }

    .cubie {
        position: absolute;
        width: 66px;
        height: 66px;
        margin: -33px 0 0 -33px;
        transform-style: preserve-3d;
    }

    .cubie-face {
        position: absolute;
        width: 66px;
        height: 66px;
        border-radius: 9px;
        border: 3px solid #050505;
        backface-visibility: visible;
    }

    .gloss {
        position: absolute;
        inset: 0;
        border-radius: 6px;
        background: linear-gradient(135deg, rgba(255, 255, 255, .27) 0%, transparent 52%);
        pointer-events: none;
        z-index: 1;
    }

    .shine {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 38%;
        border-radius: 0 0 6px 6px;
        background: rgba(0, 0, 0, .22);
        pointer-events: none;
        z-index: 1;
    }

    .fc-red    { background: #FF5800; }
    .fc-orange { background: #C41E3A; }
    .fc-blue   { background: rgba(0,81,162,1); }
    .fc-green  { background: rgba(0,155,72,1); }
    .fc-yellow, .cubie-face.fc-yellow { background: rgba(255,213,0,1) !important; }
    .fc-white,  .cubie-face.fc-white  { background: rgba(255,255,255,1) !important; }
    .fc-inner  { background: transparent !important; box-shadow: none !important; border-color: transparent !important; opacity: 0; }

    .cube-ui { text-align: center; margin-top: 40px; width: 100%; }

    .cube-status {
        font-family: monospace;
        font-weight: 700;
        font-size: 0.85rem;
        color: #b49600;
        letter-spacing: .8px;
        margin-bottom: 12px;
        min-height: 1.2em;
        text-shadow: 0 0 12px rgba(255, 213, 0, .4);
    }

    .cube-btns { display: flex; gap: 10px; justify-content: center; margin-bottom: 9px; }

    .cbtn {
        padding: 7px 18px;
        border: 1px solid rgba(0, 0, 0, .15);
        background: rgba(0, 0, 0, .04);
        color: #7a7a99;
        border-radius: 8px;
        font-family: inherit;
        font-size: .82rem;
        font-weight: 600;
        cursor: pointer;
        transition: all .2s;
    }

    .cbtn:hover:not(:disabled) { border-color: #FF5800; color: #FF5800; }

    .cbtn.cbtn-solve { border-color: rgba(255, 213, 0, .5); color: rgba(180, 150, 0, .9); }
    .cbtn.cbtn-solve:hover:not(:disabled) { border-color: rgba(255,213,0,1); color: #b49600; background: rgba(255, 213, 0, .07); }
    .cbtn:disabled { opacity: .35; cursor: not-allowed; }

    .cube-hint { font-size: .75rem; color: #7a7a99; letter-spacing: .3px; }
`;

export const RubiksCube: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const scrambleBtnRef = useRef<HTMLButtonElement>(null);
  const solveBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const cubeScene = sceneRef.current;
    if (!cubeScene) return;

    const HALF_PX = 33;
    const STEP_PX = 66;

    const FC = {
      front:  { bg: '#009B48', cls: 'fc-green' },
      back:   { bg: '#0051A2', cls: 'fc-blue' },
      right:  { bg: '#C41E3A', cls: 'fc-red' },
      left:   { bg: '#FF5800', cls: 'fc-orange' },
      top:    { bg: '#FFFFFF', cls: 'fc-white' },
      bottom: { bg: '#FFD500', cls: 'fc-yellow' },
      inner:  { bg: '#1a1a1a', cls: 'fc-inner' },
    };

    const FACE_DEFS = [
      { key: 'front',  t: `translateZ(${HALF_PX}px)` },
      { key: 'back',   t: `rotateY(180deg) translateZ(${HALF_PX}px)` },
      { key: 'right',  t: `rotateY(90deg) translateZ(${HALF_PX}px)` },
      { key: 'left',   t: `rotateY(-90deg) translateZ(${HALF_PX}px)` },
      { key: 'top',    t: `rotateX(90deg) translateZ(${HALF_PX}px)` },
      { key: 'bottom', t: `rotateX(-90deg) translateZ(${HALF_PX}px)` },
    ];

    const cubies: Array<{ el: HTMLDivElement; m: any }> = [];

    function makeCubie(lx: number, ly: number, lz: number) {
      const el = document.createElement('div');
      el.className = 'cubie';
      FACE_DEFS.forEach(fd => {
        let fc = FC.inner;
        if (fd.key === 'front' && lz === 1) fc = FC.front;
        if (fd.key === 'back' && lz === -1) fc = FC.back;
        if (fd.key === 'right' && lx === 1) fc = FC.right;
        if (fd.key === 'left' && lx === -1) fc = FC.left;
        if (fd.key === 'top' && ly === 1) fc = FC.top;
        if (fd.key === 'bottom' && ly === -1) fc = FC.bottom;

        const face = document.createElement('div');
        face.className = 'cubie-face ' + fc.cls;
        face.style.transform = fd.t + (fc === FC.inner ? ' scale(0.98)' : '');
        if (fc !== FC.inner) {
          face.style.backgroundColor = fc.bg;
        } else {
          face.style.backgroundColor = '#111';
        }
        el.appendChild(face);
      });
      const DOMMatrixClass = (window as any).DOMMatrix || (window as any).WebKitCSSMatrix || (window as any).MSCSSMatrix;
      const m = new DOMMatrixClass().translate(lx * STEP_PX, -ly * STEP_PX, lz * STEP_PX);
      el.style.transform = m.toString();
      return { el, m };
    }

    function buildCube() {
      if (!cubeScene) return;
      cubeScene.innerHTML = '';
      cubies.length = 0;
      for (let y = 1; y >= -1; y--) {
        for (let x = -1; x <= 1; x++) {
          for (let z = 1; z >= -1; z--) {
            const c = makeCubie(x, y, z);
            cubeScene.appendChild(c.el);
            cubies.push(c);
          }
        }
      }
    }

    function snap(m: any) {
      m.m41 = Math.round(m.m41 / STEP_PX) * STEP_PX;
      m.m42 = Math.round(m.m42 / STEP_PX) * STEP_PX;
      m.m43 = Math.round(m.m43 / STEP_PX) * STEP_PX;

      ['m11','m12','m13','m21','m22','m23','m31','m32','m33'].forEach(f => {
        if (Math.abs(m[f]) < 0.1) m[f] = 0;
        else m[f] = Math.sign(m[f]);
      });
    }

    function rotateLayer(axis: string, slice: number, angle: number, ms: number) {
      return new Promise<void>(resolve => {
        if (!cubeScene) { resolve(); return; }
        const layer = cubies.filter(c => {
          const x = Math.round(c.m.m41 / STEP_PX);
          const y = Math.round(-c.m.m42 / STEP_PX);
          const z = Math.round(c.m.m43 / STEP_PX);
          const val = (axis === 'x') ? x : (axis === 'y' ? y : z);
          return val === slice;
        });

        if (layer.length === 0) { resolve(); return; }

        const pivot = document.createElement('div');
        pivot.style.cssText = 'position:absolute;width:0;height:0;transform-style:preserve-3d;';
        cubeScene.appendChild(pivot);
        layer.forEach(c => pivot.appendChild(c.el));

        pivot.getBoundingClientRect();

        if (ms > 0) {
          pivot.style.transition = `transform ${ms}ms cubic-bezier(0.34, 1.25, 0.64, 1)`;
        }
        pivot.style.transform = axis === 'y' ? `rotateY(${angle}deg)` :
          axis === 'x' ? `rotateX(${angle}deg)` :
            `rotateZ(${angle}deg)`;

        setTimeout(() => {
          const rotStr = axis === 'y' ? `rotateY(${angle}deg)` :
            axis === 'x' ? `rotateX(${angle}deg)` :
              `rotateZ(${angle}deg)`;
          const DOMMatrixClass = (window as any).DOMMatrix || (window as any).WebKitCSSMatrix || (window as any).MSCSSMatrix;
          const rotM = new DOMMatrixClass(rotStr);

          layer.forEach(c => {
            c.m = rotM.multiply(c.m);
            snap(c.m);
            if (cubeScene) {
              cubeScene.appendChild(c.el);
            }
            c.el.style.transition = 'none';
            c.el.style.transform = c.m.toString();
            void c.el.offsetHeight;
          });

          pivot.remove();
          resolve();
        }, ms + 40);
      });
    }

    const MOVES = [
      { axis: 'y', slice: 1, angle: 90 },  { axis: 'y', slice: 1, angle: -90 },
      { axis: 'y', slice: 0, angle: 90 },  { axis: 'y', slice: 0, angle: -90 },
      { axis: 'y', slice: -1, angle: 90 }, { axis: 'y', slice: -1, angle: -90 },
      { axis: 'x', slice: 1, angle: 90 },  { axis: 'x', slice: 1, angle: -90 },
      { axis: 'x', slice: 0, angle: 90 },  { axis: 'x', slice: 0, angle: -90 },
      { axis: 'x', slice: -1, angle: 90 }, { axis: 'x', slice: -1, angle: -90 },
      { axis: 'z', slice: 1, angle: 90 },  { axis: 'z', slice: 1, angle: -90 },
      { axis: 'z', slice: -1, angle: 90 }, { axis: 'z', slice: -1, angle: -90 },
    ];

    let history: Array<any> = [];
    let busy = false;
    let manualMode = false;
    let manualTimer: any;

    const sleep = (msec: number) => new Promise(r => setTimeout(r, msec));

    function setStatus(txt: string) {
      if (statusRef.current) statusRef.current.textContent = txt;
    }

    function setBtnsDisabled(v: boolean) {
      if (scrambleBtnRef.current) scrambleBtnRef.current.disabled = v;
      if (solveBtnRef.current) solveBtnRef.current.disabled = v;
    }

    async function scramble(n = 14, ms = 185) {
      if (busy) return;
      busy = true; setBtnsDisabled(true);
      setStatus('Scrambling...');
      history = [];

      for (let i = 0; i < n; i++) {
        let m: any;
        do { m = MOVES[Math.floor(Math.random() * MOVES.length)]; }
        while (history.length && history[history.length - 1].axis === m.axis && history[history.length - 1].slice === m.slice);
        history.push(m);
        await rotateLayer(m.axis, m.slice, m.angle, ms);
        await sleep(18);
      }
      busy = false; setBtnsDisabled(false);
      setStatus('Scrambled — ready to solve');
    }

    async function solve(ms = 340) {
      if (busy || !history.length) return;
      busy = true; setBtnsDisabled(true);
      setStatus('Solving...');

      const moves = [...history].reverse().map(m => ({ ...m, angle: -m.angle }));
      for (const m of moves) {
        await rotateLayer(m.axis, m.slice, m.angle, ms);
        await sleep(28);
      }
      history = [];
      busy = false; setBtnsDisabled(false);
      setStatus('Solved! ✓');
    }

    async function startScrambleSolve(n = 10, ms = 360) {
      const cubeWrapper = wrapperRef.current;
      if (!cubeWrapper) return;

      cubeWrapper.style.opacity = '0';
      await scramble(n, 0);
      cubeWrapper.style.opacity = '1';
      await sleep(400);
      await solve(ms);
    }

    let rotX = -22, rotY = 45;
    let velX = 0, velY = 0;
    let dragging = false, lx2 = 0, ly2 = 0;
    let lastDx = 0, lastDy = 0;

    function applyRot() {
      if (cubeScene) {
        cubeScene.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
    }

    let animFrameId: number;
    function animRot() {
      if (!dragging) {
        velY *= 0.92; velX *= 0.92;
        if (!manualMode && !busy) {
          velY += (0.25 - velY) * 0.025;
          velX += (0 - velX) * 0.025;
        }
        rotY += velY;
        rotX += velX;
        rotX = Math.max(-65, Math.min(65, rotX));
      }
      applyRot();
      animFrameId = requestAnimationFrame(animRot);
    }

    buildCube();
    startScrambleSolve(10, 380);
    animRot();

    const handleScramble = () => {
      if (history.length > 0) return;
      manualMode = true; clearTimeout(manualTimer);
      manualTimer = setTimeout(() => { manualMode = false; }, 15000);
      scramble(14, 200);
    };

    const handleSolve = () => {
      manualMode = true; clearTimeout(manualTimer);
      manualTimer = setTimeout(() => { manualMode = false; }, 15000);
      solve(380);
    };

    const scrambleBtn = scrambleBtnRef.current;
    const solveBtn = solveBtnRef.current;

    if (scrambleBtn) scrambleBtn.addEventListener('click', handleScramble);
    if (solveBtn) solveBtn.addEventListener('click', handleSolve);

    const cubeVP = viewportRef.current;
    if (!cubeVP) return;

    const onMouseDown = (e: MouseEvent) => {
      dragging = true; lx2 = e.clientX; ly2 = e.clientY;
      velX = 0; velY = 0; lastDx = 0; lastDy = 0;
      manualMode = true; clearTimeout(manualTimer);
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      lastDx = (e.clientX - lx2) * 0.45;
      lastDy = (e.clientY - ly2) * 0.45;
      rotY += lastDx; rotX -= lastDy;
      rotX = Math.max(-65, Math.min(65, rotX));
      lx2 = e.clientX; ly2 = e.clientY;
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      velY = lastDx * 0.85;
      velX = -lastDy * 0.85;
      manualTimer = setTimeout(() => { manualMode = false; }, 8000);
    };

    const onTouchStart = (e: TouchEvent) => {
      dragging = true; lx2 = e.touches[0].clientX; ly2 = e.touches[0].clientY;
      velX = 0; velY = 0; lastDx = 0; lastDy = 0;
      manualMode = true; clearTimeout(manualTimer);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      lastDx = (e.touches[0].clientX - lx2) * 0.45;
      lastDy = (e.touches[0].clientY - ly2) * 0.45;
      rotY += lastDx; rotX -= lastDy;
      rotX = Math.max(-65, Math.min(65, rotX));
      lx2 = e.touches[0].clientX; ly2 = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      dragging = false;
      velY = lastDx * 0.85; velX = -lastDy * 0.85;
      manualTimer = setTimeout(() => { manualMode = false; }, 8000);
    };

    cubeVP.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    cubeVP.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(manualTimer);
      if (scrambleBtn) scrambleBtn.removeEventListener('click', handleScramble);
      if (solveBtn) solveBtn.removeEventListener('click', handleSolve);
      if (cubeVP) {
        cubeVP.removeEventListener('mousedown', onMouseDown);
        cubeVP.removeEventListener('touchstart', onTouchStart);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="cube-wrapper" id="cubeWrapper" ref={wrapperRef}>

      <div className="cube-viewport" ref={viewportRef}>
        <div id="cubeScene" ref={sceneRef}></div>
      </div>
      <div className="cube-ui">
        <div className="cube-status" id="cubeStatus" ref={statusRef}>
          Initializing...
        </div>
        <div className="cube-btns">
          <button className="cbtn" id="btnScramble" ref={scrambleBtnRef}>
            Scramble
          </button>
          <button className="cbtn cbtn-solve" id="btnSolve" ref={solveBtnRef}>
            Solve
          </button>
        </div>
        <div className="cube-hint">Drag to rotate • buttons to scramble/solve</div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: CUBE_STYLES }} />
    </div>
  );
};
