import { useEffect, useRef, useState } from 'react';

const characters = ' .:-=+*#%@'.split('');

function canvasSize() {
  // Keep the portrait's particle geometry identical to the desktop artwork.
  // CSS handles visual scaling for smaller viewports.
  return 400;
}

function particlesFromImage(image, size) {
  const source = document.createElement('canvas');
  source.width = image.width;
  source.height = image.height;
  const sourceContext = source.getContext('2d', { willReadFrequently: true });
  sourceContext.drawImage(image, 0, 0);
  const sourcePixels = sourceContext.getImageData(0, 0, image.width, image.height).data;

  let left = image.width, right = 0, top = image.height, bottom = 0;
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      if (sourcePixels[(y * image.width + x) * 4 + 3] > 96) {
        left = Math.min(left, x); right = Math.max(right, x);
        top = Math.min(top, y); bottom = Math.max(bottom, y);
      }
    }
  }

  const stage = document.createElement('canvas');
  stage.width = size;
  stage.height = size;
  const context = stage.getContext('2d', { willReadFrequently: true });
  const cropWidth = right - left + 1;
  // Use a head-and-shoulders crop. The original image is longer than the
  // reference portrait, which otherwise makes the face too small to read.
  const cropHeight = Math.min(bottom - top + 1, Math.round(cropWidth * 1.36));
  const scale = 0.92;
  let height = size * scale;
  let width = height * (cropWidth / cropHeight) * 1.24;
  if (width > size * scale) {
    width = size * scale;
    height = width / ((cropWidth / cropHeight) * 1.28);
  }
  context.drawImage(image, left, top, cropWidth, cropHeight, (size - width) / 2, (size - height) / 2, width, height);

  const pixels = context.getImageData(0, 0, size, size).data;
  const fontSize = size <= 280 ? 5 : 7;
  const columnGap = fontSize * 0.7;
  const rowGap = fontSize * 1.1;
  const particles = [];

  for (let y = 0; y < size; y += rowGap) {
    for (let x = 0; x < size; x += columnGap) {
      const index = (Math.floor(y) * size + Math.floor(x)) * 4;
      const alpha = pixels[index + 3];
      if (alpha <= 128) continue;
      const brightness = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 765;
      // This is the same direct luminance-to-character mapping as the
      // reference effect. A minimum dot keeps the black shirt visible.
      const glyphIndex = Math.max(1, Math.floor(brightness * (characters.length - 1)));
      particles.push({
        x: x + (Math.random() - 0.5) * size,
        y: y + (Math.random() - 0.5) * size,
        targetX: x, targetY: y, vx: 0, vy: 0,
        char: characters[glyphIndex],
        alpha: 0.4 + brightness * 0.6,
        delay: Math.random() * 0.4, shimmer: Math.random() * Math.PI * 2,
      });
    }
  }
  return particles;
}

export default function GamePortrait() {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const pointerTarget = useRef({ x: -1000, y: -1000 });
  const particles = useRef([]);
  const startTime = useRef(0);
  const [size, setSize] = useState(canvasSize);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onResize = () => setSize(canvasSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setReady(false);
    const image = new Image();
    image.src = '/harshvardhan-side-cutout-v2.png';
    image.onload = () => {
      particles.current = particlesFromImage(image, size);
      startTime.current = performance.now();
      setReady(true);
    };
  }, [size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.font = `${size <= 280 ? 5 : 7}px monospace`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    let animationFrame;

    const render = () => {
      animationFrame = requestAnimationFrame(render);
      context.clearRect(0, 0, size, size);
      if (!ready) return;
      const elapsed = (performance.now() - startTime.current) / 1000;
      pointer.current.x += (pointerTarget.current.x - pointer.current.x) * 0.15;
      pointer.current.y += (pointerTarget.current.y - pointer.current.y) * 0.15;
      particles.current.forEach((particle) => {
        const particleTime = elapsed - particle.delay;
        if (particleTime < 0) return;
        const fade = Math.min(particleTime / 1.5, 1);
        const easedFade = 1 - (1 - fade) ** 2;
        const active = pointer.current.active || particleTime < 3;
        const shimmer = active ? Math.sin(elapsed * 2 + particle.shimmer) * 0.1 : 0;
        if (pointer.current.active) {
          const dx = particle.x - pointer.current.x;
          const dy = particle.y - pointer.current.y;
          const distance = Math.hypot(dx, dy);
          const reach = size * 0.2;
          if (distance > 0 && distance < reach) {
            const force = (1 - distance / reach) * 4;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        const settle = 1 - (1 - Math.min(particleTime / 2.5, 1)) ** 3;
        particle.vx += dx * (0.01 + settle * 0.08);
        particle.vy += dy * (0.01 + settle * 0.08);
        if (active) {
          particle.vx += Math.sin(elapsed * 0.5 + particle.targetY * 0.1) * 0.15;
          particle.vy += Math.cos(elapsed * 0.5 + particle.targetX * 0.1) * 0.15;
          particle.vx *= 0.92; particle.vy *= 0.92;
        } else {
          particle.vx *= 0.85; particle.vy *= 0.85;
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
        context.fillStyle = `rgba(100, 255, 218, ${Math.max(0, particle.alpha * easedFade + shimmer)})`;
        context.fillText(particle.char, particle.x, particle.y);
      });
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerTarget.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      pointer.current.active = true;
    };
    const leave = () => {
      pointer.current.active = false;
      pointerTarget.current = { x: -1000, y: -1000 };
    };
    const touch = (event) => {
      if (event.touches[0]) move(event.touches[0]);
      if (event.cancelable) event.preventDefault();
    };
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseleave', leave);
    canvas.addEventListener('touchmove', touch, { passive: false });
    canvas.addEventListener('touchend', leave);
    render();
    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener('mousemove', move);
      canvas.removeEventListener('mouseleave', leave);
      canvas.removeEventListener('touchmove', touch);
      canvas.removeEventListener('touchend', leave);
    };
  }, [ready, size]);

  return <canvas ref={canvasRef} className="game-portrait-canvas" aria-label="Interactive plus-symbol portrait of Harshvardhan" />;
}
