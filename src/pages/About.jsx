import { useRef, useEffect } from "react";

function About() {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let origX = 0;
    let origY = 0;

    const onPointerDown = (e) => {
      dragging = true;
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
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      el.style.transform = `translate(${origX + dx}px, ${origY + dy}px)`;
    };

    const onPointerUp = (e) => {
      dragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) {}
      el.classList.remove("is-dragging");
    };

    // Hover-follow behavior for desktop: move the card slightly toward cursor
    // when hovering. Skip if actively pointer-dragging.
    let rect = null;
    const onMouseEnter = (e) => {
      rect = el.getBoundingClientRect();
    };
    const onMouseMove = (e) => {
      if (dragging) return;
      if (!rect) rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const max = 12; // max px offset
      const dx = Math.max(-max, Math.min(max, (e.clientX - cx) / 10));
      const dy = Math.max(-max, Math.min(max, (e.clientY - cy) / 12));
      el.style.transform = `translate(${origX + dx}px, ${origY + dy}px)`;
    };
    const onMouseLeave = (e) => {
      if (dragging) return;
      // smooth return
      el.style.transition = "transform 220ms ease";
      el.style.transform = `translate(${origX}px, ${origY}px)`;
      setTimeout(() => {
        el.style.transition = "";
      }, 230);
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section className="about container">
      <div className="about-card gradient-title" ref={elRef} role="button">
        <h1>About Me</h1>
        <p className="about-subtle">Who I am & what I build</p>
        <p className="about-text">
          I’m a fourth-year Computer Science student and a full-stack developer
          passionate about creating modern, responsive web applications. My main
          stack includes React, Node.js, Express, and Vite, which I use to craft
          seamless front-end experiences and efficient back-end systems. I enjoy
          turning complex ideas into intuitive interfaces and learning new
          technologies that help me build better digital solutions.
        </p>
      </div>
    </section>
  );
}

export default About;
