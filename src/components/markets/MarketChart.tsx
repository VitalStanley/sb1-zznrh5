import React, { useEffect, useRef } from 'react';

interface MarketChartProps {
  data: number[];
  change: number;
  width: number;
  height: number;
}

export default function MarketChart({ data, change, width, height }: MarketChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const color = change >= 0 ? '#34D399' : '#F87171';

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate min/max for scaling
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${color}33`);
    gradient.addColorStop(1, `${color}00`);

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [data, width, height, change]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full"
    />
  );
}