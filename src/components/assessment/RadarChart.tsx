import React from 'react';
import { CategoryScore } from '../../types';

interface RadarChartProps {
  categoryScores: CategoryScore[];
  showBenchmark?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({ categoryScores, showBenchmark = true }) => {
  const size = 380;
  const center = size / 2;
  const radius = size * 0.36;
  const totalAxes = categoryScores.length || 6;

  // Grid concentric levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to calculate (x, y) given angle index and value percentage (0 to 1)
  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const x = center + radius * valueRatio * Math.cos(angle);
    const y = center + radius * valueRatio * Math.sin(angle);
    return { x, y, angle };
  };

  // Build the user score polygon path
  const userPoints = categoryScores.map((score, i) => {
    const ratio = Math.max(0.1, score.score / 100);
    const { x, y } = getCoordinates(i, ratio);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  // Standard benchmark polygon (representing a 75% baseline across all dimensions)
  const benchmarkPoints = categoryScores.map((_, i) => {
    const { x, y } = getCoordinates(i, 0.75);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="w-full max-w-[420px] h-auto drop-shadow-md select-none"
      >
        <defs>
          <radialGradient id="radarBgGradientLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="1" />
            <stop offset="100%" stopColor="#f1f5f9" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="userPolygonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0891b2" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Circle */}
        <circle cx={center} cy={center} r={radius + 15} fill="url(#radarBgGradientLight)" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Concentric Web Polygons */}
        {levels.map((lvl, lIdx) => {
          const webPoints = Array.from({ length: totalAxes }).map((_, i) => {
            const { x, y } = getCoordinates(i, lvl);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          }).join(' ');

          return (
            <g key={lIdx}>
              <polygon 
                points={webPoints} 
                fill="none" 
                stroke="#cbd5e1" 
                strokeWidth="1" 
                strokeDasharray={lIdx === levels.length - 1 ? 'none' : '4 4'}
                opacity={0.8}
              />
              {/* Level Percentage Label */}
              <text 
                x={center + 6} 
                y={center - radius * lvl + 4} 
                fill="#64748b" 
                fontSize="9" 
                fontFamily="monospace"
                className="select-none font-semibold"
              >
                {Math.round(lvl * 100)}%
              </text>
            </g>
          );
        })}

        {/* Axis Spokes from center to edge */}
        {categoryScores.map((_, i) => {
          const { x, y } = getCoordinates(i, 1.0);
          return (
            <line 
              key={i} 
              x1={center} 
              y1={center} 
              x2={x} 
              y2={y} 
              stroke="#cbd5e1" 
              strokeWidth="1.2" 
            />
          );
        })}

        {/* Benchmark Silhouette Polygon */}
        {showBenchmark && (
          <polygon 
            points={benchmarkPoints} 
            fill="none" 
            stroke="#94a3b8" 
            strokeWidth="1.5" 
            strokeDasharray="6 4"
            opacity="0.7"
          />
        )}

        {/* User Score Filled Polygon */}
        <polygon 
          points={userPoints} 
          fill="url(#userPolygonGradient)" 
          stroke="#059669" 
          strokeWidth="2.5" 
          filter="url(#glowEffect)"
          className="transition-all duration-700 ease-out"
        />

        {/* User Score Vertex Dots & Values */}
        {categoryScores.map((score, i) => {
          const ratio = Math.max(0.1, score.score / 100);
          const { x, y } = getCoordinates(i, ratio);
          return (
            <g key={i}>
              <circle 
                cx={x} 
                cy={y} 
                r="5" 
                fill="#ffffff" 
                stroke="#059669" 
                strokeWidth="2.5" 
                className="hover:scale-125 transition-transform"
              />
              <circle 
                cx={x} 
                cy={y} 
                r="2" 
                fill="#059669" 
              />
            </g>
          );
        })}

        {/* Category Axis Labels */}
        {categoryScores.map((score, i) => {
          const labelDist = 1.26;
          const { x, y, angle } = getCoordinates(i, labelDist);
          
          let textAnchor = 'middle';
          if (Math.cos(angle) > 0.3) textAnchor = 'start';
          else if (Math.cos(angle) < -0.3) textAnchor = 'end';

          const isWeak = score.score < 50;

          return (
            <g key={`lbl-${i}`}>
              <text 
                x={x} 
                y={y} 
                textAnchor={textAnchor}
                className={`text-[11px] font-bold tracking-tight select-none ${
                  isWeak ? 'fill-amber-600' : 'fill-slate-800'
                }`}
              >
                {score.name.split(' ')[0]} {score.name.split(' ')[1] || ''}
              </text>
              <text 
                x={x} 
                y={y + 13} 
                textAnchor={textAnchor}
                className="text-[10px] font-mono fill-emerald-600 font-bold"
              >
                {score.score}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-600 shadow-sm"></span>
          <span className="text-slate-800 font-bold">Your Score</span>
        </div>
        {showBenchmark && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-b-2 border-dashed border-slate-500"></span>
            <span className="text-slate-600 font-medium">Launch Target (75%)</span>
          </div>
        )}
      </div>
    </div>
  );
};
