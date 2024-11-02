import React, { useEffect, useRef } from 'react';

interface PriceChartProps {
  data: number[];
  width: number;
  height: number;
  color: string;
}

export default function PriceChart({ data, width, height, color }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, width, height);

    // Calculer les valeurs min/max pour l'échelle
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // Dessiner la ligne
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

    // Ajouter un dégradé sous la ligne
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${color}33`);
    gradient.addColorStop(1, `${color}00`);

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [data, width, height, color]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full"
    />
  );
}