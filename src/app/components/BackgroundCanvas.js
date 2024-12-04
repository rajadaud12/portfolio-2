'use client';

import React, { useRef, useEffect, useState } from "react";
import './BackgroundCanvas.css';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const numPoints = 30;
      const initialPoints = Array.from({ length: numPoints }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.1, 
        vy: (Math.random() - 0.5) * 0.1, 
      }));
      setPoints(initialPoints);

      // Set initial canvas size
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Update canvas size
      setCanvasSize({ width: newWidth, height: newHeight });

      // Adjust points to new canvas size
      const updatedPoints = points.map(point => ({
        ...point,
        x: Math.min(point.x, newWidth),
        y: Math.min(point.y, newHeight)
      }));
      setPoints(updatedPoints);
    };

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        point.x += point.vx;
        point.y += point.vy;

        if (point.x <= 0 || point.x >= canvas.width) point.vx *= -1;
        if (point.y <= 0 || point.y >= canvas.height) point.vy *= -1;

        for (let j = i + 1; j < points.length; j++) {
          const otherPoint = points[j];
          const dist = Math.sqrt(
            (point.x - otherPoint.x) ** 2 + (point.y - otherPoint.y) ** 2
          );

          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 150})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        }

        // Draw points with a fallback color
        ctx.fillStyle = typeof window !== 'undefined' 
          ? getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()
          : 'white';
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    
    // Only start drawing if points are initialized
    if (points.length > 0) {
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [points]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const updatedPoints = points.map((point) => {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        const maxSpeed = 0.5; 
        const influence = 0.02; 

        let newVx = point.vx;
        let newVy = point.vy;

        if (distance > 0) {
          newVx += (dx / distance) * influence;
          newVy += (dy / distance) * influence;

          const speed = Math.sqrt(newVx ** 2 + newVy ** 2);
          if (speed > maxSpeed) {
            newVx = (newVx / speed) * maxSpeed;
            newVy = (newVy / speed) * maxSpeed;
          }
        }

        return { ...point, vx: newVx, vy: newVy };
      });

      setPoints(updatedPoints);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [points]);

  // Prevent rendering on server
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="background-canvas"
      width={canvasSize.width}
      height={canvasSize.height}
    ></canvas>
  );
};

export default BackgroundCanvas;