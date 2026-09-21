import { useEffect, useRef, useState } from 'react';

const POINT_TOTAL = 5;

function drawPlatform(ctx, platform) {
  ctx.fillStyle = 'rgba(2,12,27,.32)';
  ctx.fillRect(platform.x + 3, platform.y + 9, platform.width, 4);
  ctx.fillStyle = '#112240';
  ctx.fillRect(platform.x, platform.y, platform.width, 9);
  ctx.fillStyle = 'rgba(100,255,218,.62)';
  ctx.fillRect(platform.x, platform.y, platform.width, 2);
  ctx.fillStyle = 'rgba(100,255,218,.12)';
  for (let x = platform.x + 8; x < platform.x + platform.width - 3; x += 13) ctx.fillRect(x, platform.y + 4, 2, 2);
}

function drawPlayer(ctx, x, y, frame) {
  const bob = Math.floor(frame / 11) % 2;
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.fillStyle = '#ccd6f6';
  ctx.fillRect(7, 0, 16, 4); ctx.fillRect(3, 4, 24, 17); ctx.fillRect(0, 8, 3, 9); ctx.fillRect(27, 8, 3, 9);
  ctx.fillStyle = '#0a192f'; ctx.fillRect(5, 8, 8, 7); ctx.fillRect(18, 8, 8, 7);
  ctx.fillStyle = '#64ffda'; ctx.fillRect(6, 9, 4, 3); ctx.fillRect(19, 9, 4, 3);
  ctx.fillStyle = '#8892b0'; ctx.fillRect(5, 21, 20, 3);
  ctx.fillStyle = '#ccd6f6'; ctx.fillRect(5, 24, 8, 7 + bob); ctx.fillRect(17, 24, 8, 8 - bob);
  ctx.restore();
}

function drawPoint(ctx, point, time) {
  const y = point.y + Math.sin(time * .004 + point.phase) * 4;
  ctx.save(); ctx.translate(point.x, y);
  ctx.fillStyle = 'rgba(191,159,212,.18)'; ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#bf9fd4'; ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#edddf8'; ctx.beginPath(); ctx.arc(-2, -2, 2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}

export default function GameMode() {
  const [active, setActive] = useState(false);
  const [collected, setCollected] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const keys = new Set();
    const player = { x: 82, y: 0, vx: 0, vy: 0, grounded: false };
    let frame = 0;
    let animation;
    let points = [];
    let platforms = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio; canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const w = window.innerWidth, h = window.innerHeight;
      platforms = [
        { x: 32, y: h - 126, width: 135 }, { x: Math.round(w * .14), y: h - 250, width: 110 },
        { x: Math.round(w * .31), y: h - 170, width: 125 }, { x: Math.round(w * .49), y: h - 330, width: 120 },
        { x: Math.round(w * .67), y: h - 210, width: 130 }, { x: Math.round(w * .84), y: h - 355, width: 105 },
        { x: 0, y: h - 35, width: w },
      ];
      points = platforms.slice(1, 6).map((platform, index) => ({ x: platform.x + platform.width / 2, y: platform.y - 19, phase: index * 1.5, collected: false }));
      player.x = 82; player.y = h - 168; player.vx = 0; player.vy = 0;
      setCollected(0);
    };
    const down = (event) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'd', 'w'].includes(event.key)) event.preventDefault();
      keys.add(event.key.toLowerCase());
      if ((event.key === ' ' || event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') && player.grounded) { player.vy = -8; player.grounded = false; }
    };
    const up = (event) => keys.delete(event.key.toLowerCase());
    const loop = (time) => {
      frame += 1; animation = requestAnimationFrame(loop);
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const left = keys.has('arrowleft') || keys.has('a'), right = keys.has('arrowright') || keys.has('d');
      player.vx += left ? -.35 : right ? .35 : 0; player.vx *= left || right ? .88 : .72; player.vx = Math.max(-3.2, Math.min(3.2, player.vx));
      player.vy += .34; player.vy = Math.min(player.vy, 9); player.x += player.vx; player.y += player.vy; player.x = Math.max(0, Math.min(w - 30, player.x));
      player.grounded = false;
      platforms.forEach((platform) => {
        if (player.vy >= 0 && player.x + 26 > platform.x && player.x < platform.x + platform.width && player.y + 32 >= platform.y && player.y + 32 - player.vy < platform.y) { player.y = platform.y - 32; player.vy = 0; player.grounded = true; }
        drawPlatform(ctx, platform);
      });
      if (player.y > h + 70) { player.x = 82; player.y = h - 168; player.vx = player.vy = 0; }
      points.forEach((point) => {
        if (!point.collected && Math.hypot(player.x + 15 - point.x, player.y + 15 - point.y) < 25) { point.collected = true; setCollected((value) => Math.min(POINT_TOTAL, value + 1)); }
        if (!point.collected) drawPoint(ctx, point, time);
      });
      drawPlayer(ctx, player.x, player.y, frame);
    };
    resize(); window.addEventListener('resize', resize); window.addEventListener('keydown', down); window.addEventListener('keyup', up); animation = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animation); window.removeEventListener('resize', resize); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [active]);

  return <div className="desktop-game-mode">
    <button className={`desktop-game-toggle${active ? ' is-active' : ''}`} type="button" onClick={() => setActive((value) => !value)}><i /> Game mode</button>
    {active && <><div className="desktop-game-help">← → / A D move · Space jump</div><div className="desktop-game-score"><i /> {collected} / {POINT_TOTAL}</div><canvas ref={canvasRef} className="desktop-game-canvas" aria-label="Jump game: collect five points" /></>}
  </div>;
}
