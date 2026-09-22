import { useEffect, useRef, useState } from 'react';

const POINT_TOTAL = 5;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 32;

function drawPlatform(ctx, platform, screenY, subtle = false) {
  ctx.save(); ctx.globalAlpha = subtle ? 0.42 : 1;
  ctx.fillStyle = 'rgba(2,12,27,.32)'; ctx.fillRect(platform.x + 3, screenY + 9, platform.width, 4);
  ctx.fillStyle = '#112240'; ctx.fillRect(platform.x, screenY, platform.width, 9);
  ctx.fillStyle = 'rgba(100,255,218,.62)'; ctx.fillRect(platform.x, screenY, platform.width, 2);
  ctx.fillStyle = 'rgba(100,255,218,.12)';
  for (let x = platform.x + 8; x < platform.x + platform.width - 3; x += 13) ctx.fillRect(x, screenY + 4, 2, 2);
  ctx.restore();
}

function drawPlayer(ctx, x, y, frame) {
  const bob = Math.floor(frame / 11) % 2;
  ctx.save(); ctx.translate(Math.round(x), Math.round(y));
  ctx.fillStyle = '#ccd6f6'; ctx.fillRect(7, 0, 16, 4); ctx.fillRect(3, 4, 24, 17); ctx.fillRect(0, 8, 3, 9); ctx.fillRect(27, 8, 3, 9);
  ctx.fillStyle = '#0a192f'; ctx.fillRect(5, 8, 8, 7); ctx.fillRect(18, 8, 8, 7);
  ctx.fillStyle = '#64ffda'; ctx.fillRect(6, 9, 4, 3); ctx.fillRect(19, 9, 4, 3);
  ctx.fillStyle = '#8892b0'; ctx.fillRect(5, 21, 20, 3);
  ctx.fillStyle = '#ccd6f6'; ctx.fillRect(5, 24, 8, 7 + bob); ctx.fillRect(17, 24, 8, 8 - bob); ctx.restore();
}

function drawPoint(ctx, point, screenY, time) {
  const y = screenY + Math.sin(time * 0.004 + point.phase) * 4;
  ctx.save(); ctx.translate(point.x, y);
  ctx.fillStyle = 'rgba(191,159,212,.18)'; ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#bf9fd4'; ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#edddf8'; ctx.beginPath(); ctx.arc(-2, -2, 2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}

function contentPlatforms() {
  const scrollY = window.scrollY;
  const selectors = ['.hero-title', '.hero-description', '.hero-contact', '.about-copy', '.about-photo', '.experience-entry', '.software-card', '.certification-card', '.contact-copy', '.contact-form'];
  const seen = new Set();
  return selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector))).flatMap((element) => {
    if (seen.has(element)) return [];
    seen.add(element);
    const rect = element.getBoundingClientRect();
    return rect.width >= 70 && rect.height >= 14 ? [{ x: rect.left, docY: rect.top + scrollY, width: rect.width }] : [];
  });
}

export default function SiteGameMode() {
  const [active, setActive] = useState(false);
  const [collected, setCollected] = useState(0);
  const [status, setStatus] = useState('playing');
  const [run, setRun] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const keys = new Set();
    const player = { x: 58, docY: 0, vx: 0, vy: 0, grounded: true };
    let animation; let setup; let frame = 0; let state = 'playing'; let route = []; let points = [];

    const prepareWorld = () => {
      const navbar = document.querySelector('nav');
      const top = (navbar?.getBoundingClientRect().bottom || 76) + window.scrollY;
      const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      // A compact repeating staircase keeps the route forgiving, even on a
      // very wide desktop. Content blocks remain extra landing platforms.
      const lanes = [38, 175, 312, 175, 38, 175];
      const start = { x: 38, docY: top + 160, width: 150 };
      route = [start];
      for (let y = start.docY + 125, index = 0; y < pageHeight - 90; y += 125, index += 1) route.push({ x: lanes[index % lanes.length], docY: y, width: 164 });
      points = ['home', 'about', 'skills', 'projects', 'certifications'].map((id, index) => {
        const section = document.getElementById(id);
        const rect = section?.getBoundingClientRect();
        const target = (rect ? rect.top + window.scrollY : start.docY + (index + 2) * 700) + (index === 0 ? 320 : 180);
        const nearest = route.reduce((current, item) => Math.abs(item.docY - target) < Math.abs(current.docY - target) ? item : current, route[0]);
        // The Experience collectible sits just before the Mist Solutions role.
        // Give it a wider dedicated landing ledge that overlaps the route on
        // either side, so it cannot become an unreachable jump.
        const platform = id === 'skills' ? { x: 175, docY: nearest.docY, width: 240 } : nearest;
        if (id === 'skills') route.push(platform);
        return { x: platform.x + platform.width / 2, docY: platform.docY - 20, phase: index * 1.5, collected: false };
      });
      player.x = start.x + 25; player.docY = start.docY - PLAYER_HEIGHT; player.vx = player.vy = 0; player.grounded = true;
      setCollected(0);
    };
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio; canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); prepareWorld();
    };
    const down = (event) => {
      const gameKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space', 'KeyA', 'KeyD', 'KeyW'];
      if (!gameKeys.includes(event.code)) return;
      event.preventDefault(); keys.add(event.code);
      if (['Space', 'ArrowUp', 'KeyW'].includes(event.code) && player.grounded && state === 'playing') { player.vy = -12.5; player.grounded = false; }
    };
    const up = (event) => keys.delete(event.code);
    const loop = (time) => {
      frame += 1; animation = requestAnimationFrame(loop);
      const width = window.innerWidth; const height = window.innerHeight; ctx.clearRect(0, 0, width, height);
      const scrollY = window.scrollY; const dynamic = contentPlatforms(); const platforms = [...route, ...dynamic];
      if (state === 'playing') {
        const left = keys.has('ArrowLeft') || keys.has('KeyA'); const right = keys.has('ArrowRight') || keys.has('KeyD');
        player.vx += left ? -0.5 : right ? 0.5 : 0; player.vx *= left || right ? 0.9 : 0.72; player.vx = Math.max(-4.8, Math.min(4.8, player.vx));
        const previousBottom = player.docY + PLAYER_HEIGHT;
        player.vy = Math.min(player.vy + 0.42, 11); player.x = Math.max(0, Math.min(width - PLAYER_WIDTH, player.x + player.vx)); player.docY += player.vy; player.grounded = false;
        platforms.forEach((platform) => {
          const currentBottom = player.docY + PLAYER_HEIGHT;
          if (player.vy >= 0 && player.x + 26 > platform.x && player.x < platform.x + platform.width && currentBottom >= platform.docY && previousBottom <= platform.docY + 5) { player.docY = platform.docY - PLAYER_HEIGHT; player.vy = 0; player.grounded = true; }
        });
        const screenY = player.docY - scrollY;
        if (screenY > height + 100) { state = 'game-over'; setStatus('game-over'); }
        if (screenY > height * 0.68 && scrollY < document.documentElement.scrollHeight - height) window.scrollTo(0, scrollY + Math.min(7, screenY - height * 0.68));
      }
      const renderScrollY = window.scrollY;
      platforms.forEach((platform) => { const y = platform.docY - renderScrollY; if (y > -20 && y < height + 20) drawPlatform(ctx, platform, y, dynamic.includes(platform)); });
      points.forEach((point) => {
        if (!point.collected && Math.hypot(player.x + 15 - point.x, player.docY + 15 - point.docY) < 28) {
          point.collected = true;
          setCollected((value) => { const next = Math.min(POINT_TOTAL, value + 1); if (next === POINT_TOTAL) { state = 'complete'; setStatus('complete'); } return next; });
        }
        if (!point.collected) { const y = point.docY - renderScrollY; if (y > -30 && y < height + 30) drawPoint(ctx, point, y, time); }
      });
      const playerY = player.docY - renderScrollY;
      if (playerY > -PLAYER_HEIGHT && playerY < height + PLAYER_HEIGHT) drawPlayer(ctx, player.x, playerY, frame);
    };
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0); setup = requestAnimationFrame(resize); window.addEventListener('resize', resize); document.addEventListener('keydown', down, true); document.addEventListener('keyup', up, true); animation = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(setup); cancelAnimationFrame(animation); document.documentElement.style.scrollBehavior = previousScrollBehavior; window.removeEventListener('resize', resize); document.removeEventListener('keydown', down, true); document.removeEventListener('keyup', up, true); };
  }, [active, run]);

  return <div className="desktop-game-mode">
    <button className={`desktop-game-toggle${active ? ' is-active' : ''}`} type="button" onClick={() => { setActive((value) => !value); setStatus('playing'); }}><i /> Game mode</button>
    {active && <><div className="desktop-game-help">← → / A D move · Space jump · mouse wheel scrolls freely</div><div className="desktop-game-score"><i /> {collected} / {POINT_TOTAL}</div><canvas ref={canvasRef} className="desktop-game-canvas" aria-label="Portfolio platform game: collect five points" />{status !== 'playing' && <div className="desktop-game-message"><strong>{status === 'complete' ? 'You’re the winner!' : 'Game over'}</strong><span>{status === 'complete' ? 'You found all five points.' : 'You fell into empty space.'}</span><button type="button" onClick={() => { setStatus('playing'); setRun((value) => value + 1); }}>Play again</button></div>}</>}
  </div>;
}
