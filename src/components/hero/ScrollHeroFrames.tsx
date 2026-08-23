import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 50;
const FRAME_PATH = (i: number) => `/hero-frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

export const ScrollHeroFrames: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [frame, setFrame] = useState(1);
  const ticking = useRef(false);

  // Preload
  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el || !imgRef.current) { ticking.current = false; return; }
        const rect = el.getBoundingClientRect();
        const scrollable = el.offsetHeight - window.innerHeight;
        const progress = Math.min(Math.max(-rect.top / (scrollable || 1), 0), 1);
        const idx = Math.min(FRAME_COUNT, Math.max(1, Math.round(progress * (FRAME_COUNT - 1) + 1)));
        if (idx !== frame) {
          setFrame(idx);
          if (imgRef.current) imgRef.current.src = FRAME_PATH(idx);
        }
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [frame]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden bg-slate-950">
        <img
          ref={imgRef}
          src={FRAME_PATH(1)}
          alt="ChatGPT Ads hero sequence"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Light scrim for readability — not dark mode heavy */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/10 to-slate-50 dark:to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        {/* Overlay copy — centered, light-theme friendly */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 text-emerald-700 border border-emerald-200 shadow-sm backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> SCROLL TO REVEAL — 50-FRAME SEQUENCE
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            ChatGPT Ads <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Dominance</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/85 drop-shadow">
            Scroll to scrub 50 frames — conversational intent → sponsored reveal. Light UI below, cinematic hero above.
          </p>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-white/70">
            <span className="px-2 py-1 rounded bg-white/15 border border-white/20 backdrop-blur">Frame {String(frame).padStart(2,'0')}/50</span>
            <span className="hidden sm:inline">Keep scrolling — content unlocks below</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/80">
          <span className="text-[10px] tracking-widest font-bold">SCROLL</span>
          <span className="w-5 h-8 rounded-full border border-white/40 flex justify-center pt-1">
            <span className="w-1 h-2 rounded-full bg-white animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
};
