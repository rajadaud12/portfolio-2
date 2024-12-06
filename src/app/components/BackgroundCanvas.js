import React, { useRef, useEffect } from "react";
import './BackgroundCanvas.css';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const points = [];
  const numPoints = 30;

  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.1, 
      vy: (Math.random() - 0.5) * 0.1, 
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
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

        // Draw points
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
  
      points.forEach((point) => {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
  
        const maxDragDistance = 200; // Range where the drag effect applies
        const dragFactor = 0.0005; // Very subtle drag effect
  
        if (distance < maxDragDistance) {
          const influence = (1 - distance / maxDragDistance) * dragFactor;
  
          // Apply minimal velocity adjustments
          point.vx += dx * influence;
          point.vy += dy * influence;
        }
      });
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const friction = 0.95; // Strong friction for slow movement and stopping
  
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
  
      // Apply strong friction to slow down points
      point.vx *= friction;
      point.vy *= friction;
  
      // Stop points when they move very slowly
      if (Math.abs(point.vx) < 0.01) point.vx = 0;
      if (Math.abs(point.vy) < 0.01) point.vy = 0;
  
      // Update positions
      point.x += point.vx;
      point.y += point.vy;
  
      // Bounce off walls
      if (point.x <= 0 || point.x >= canvas.width) point.vx *= -1;
      if (point.y <= 0 || point.y >= canvas.height) point.vy *= -1;
  
      // Draw connections if close enough
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
  
      // Draw points
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  
    animationFrameId = requestAnimationFrame(draw);
  };
  
  
  return (
    <canvas ref={canvasRef} className="background-canvas"></canvas>
  );
};

export default BackgroundCanvas;
