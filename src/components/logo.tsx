
'use client';

import { useState, useEffect, useMemo } from 'react';

export function Logo() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const spokes = useMemo(() => {
    return [...Array(24)].map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const x1 = 20 + 18 * Math.cos(angle);
      const y1 = 20 + 18 * Math.sin(angle);
      const x2 = 20 + 13 * Math.cos(angle);
      const y2 = 20 + 13 * Math.sin(angle);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1"/>;
    });
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-b from-brand-saffron via-brand-white to-brand-green p-0.5 shadow-md">
        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
          <svg className="w-5 h-5 text-brand-navy-blue" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
            <circle cx="20" cy="20" r="4" fill="currentColor"/>
            {isMounted && spokes}
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-brand-deep-blue leading-tight">CivicSamadhaan</span>
        <span className="text-sm text-brand-deep-blue/80 leading-tight font-medium">सिविक समाधान</span>
      </div>
    </div>
  );
}
