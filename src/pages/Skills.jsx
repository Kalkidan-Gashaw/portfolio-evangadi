import React, { useState, useRef, useEffect } from "react";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "React"],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Authentication",
      "REST API",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "Vercel", "Render", "Netlify", "Figma", "Agile", "GitHub"],
  },
  {
    title: "Soft Skills",
    items: [
      "Communication",
      "Collaboration",
      "Problem Solving",
      "Creativity",
      "Time Management",
      "Attention to Detail",
    ],
  },
];

function Skills() {
  const [active, setActive] = useState(null);
  const refs = useRef([]);

  useEffect(() => {
    const handlers = [];
    refs.current.forEach((el) => {
      if (!el) return;
      let activeDrag = false;
      let startX = 0;
      let startY = 0;
      let origX = 0;
      let origY = 0;
      let rect = null;

      const onPointerDown = (e) => {
        activeDrag = true;
        try {
          el.setPointerCapture(e.pointerId);
        } catch (err) {}
        startX = e.clientX;
        startY = e.clientY;
        const t = getComputedStyle(el).transform;
        if (t && t !== "none") {
          const m = t.match(/matrix\((.+)\)/);
          if (m) {
            const vals = m[1].split(",");
            origX = parseFloat(vals[4]);
            origY = parseFloat(vals[5]);
          }
        } else {
          origX = 0;
          origY = 0;
        }
        el.classList.add("is-dragging");
      };

      const onPointerMove = (e) => {
        if (!activeDrag) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.transform = `translate(${origX + dx}px, ${origY + dy}px)`;
      };

      const onPointerUp = (e) => {
        activeDrag = false;
        try {
          el.releasePointerCapture(e.pointerId);
        } catch (err) {}
        el.classList.remove("is-dragging");
      };

      const onMouseEnter = (e) => {
        rect = el.getBoundingClientRect();
      };
      const onMouseMove = (e) => {
        if (activeDrag) return;
        if (!rect) rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const max = 10;
        const dx = Math.max(-max, Math.min(max, (e.clientX - cx) / 12));
        const dy = Math.max(-max, Math.min(max, (e.clientY - cy) / 14));
        el.style.transform = `translate(${origX + dx}px, ${origY + dy}px)`;
      };
      const onMouseLeave = () => {
        if (activeDrag) return;
        el.style.transition = "transform 200ms ease";
        el.style.transform = `translate(${origX}px, ${origY}px)`;
        setTimeout(() => (el.style.transition = ""), 220);
      };

      el.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      handlers.push({
        el,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
      });
    });

    return () => {
      handlers.forEach(
        ({
          el,
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onMouseEnter,
          onMouseMove,
          onMouseLeave,
        }) => {
          el.removeEventListener("pointerdown", onPointerDown);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mousemove", onMouseMove);
          el.removeEventListener("mouseleave", onMouseLeave);
        }
      );
    };
  }, []);

  return (
    <section className="skills container">
      <h1 className="gradient-title">Skills</h1>
      <div className="skills-grid">
        {SKILL_GROUPS.map((g, i) => (
          <div
            key={g.title}
            ref={(el) => (refs.current[i] = el)}
            className={`skills-card ${active === i ? "is-active" : ""}`}
            tabIndex={0}
            onMouseDown={() => setActive(i)}
            onMouseUp={() => setActive(null)}
            onMouseLeave={() => setActive(null)}
            onTouchStart={() => setActive(i)}
            onTouchEnd={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            role="button"
            aria-pressed={active === i}
          >
            <div className="card-accent" aria-hidden />
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
