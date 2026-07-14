"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Butter-smooth direct DOM animation loop using translate3d (GPU accelerated)
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Lerp calculations
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      
      // Speed factor: 0.14 for elegant lag trail
      ringPos.current.x += dx * 0.14;
      ringPos.current.y += dy * 0.14;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Hook hover events for interactive elements
  useEffect(() => {
    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    const updateClickableListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, [role="button"], input[type="submit"], input[type="button"], select, textarea, .clickable'
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
      return clickables;
    };

    const clickables = updateClickableListeners();

    // Observe body for dynamically rendered expansion blocks to re-hook events
    const observer = new MutationObserver(() => {
      const freshClickables = document.querySelectorAll(
        'a, button, [role="button"], input[type="submit"], input[type="button"], select, textarea, .clickable'
      );
      freshClickables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Inner Red Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-red-500 rounded-full pointer-events-none z-[9999] hidden lg:block transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(0, 0, 0) scale(${isClicked ? 0.6 : 1})`,
          willChange: "transform",
        }}
      />
      {/* Trailing Outer Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-9 h-9 border rounded-full pointer-events-none z-[9998] hidden lg:block cursor-hue-animate transition-[width,height,border-color,background-color,box-shadow] duration-300 ease-out ${
          isHovered
            ? "border-cyan-400 bg-cyan-500/5 w-14 h-14 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            : "border-red-500/30 bg-red-500/2 shadow-[0_0_12px_rgba(239,68,68,0.12)]"
        }`}
        style={{
          transform: `translate3d(0, 0, 0) scale(${isClicked ? 0.75 : 1})`,
          willChange: "transform",
        }}
      />
    </>
  );
}
