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

        const maxSpeed = 0.5; 
        const influence = 0.02; 

        if (distance > 0) {
          point.vx += (dx / distance) * influence;
          point.vy += (dy / distance) * influence;

          const speed = Math.sqrt(point.vx ** 2 + point.vy ** 2);
          if (speed > maxSpeed) {
            point.vx = (point.vx / speed) * maxSpeed;
            point.vy = (point.vy / speed) * maxSpeed;
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <canvas ref={canvasRef} className="background-canvas"></canvas>
  );
};

export default BackgroundCanvas;
