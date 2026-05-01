// Effects layer — scanlines, grain, vignette, boot sequence, glitch hook.

const { useState, useEffect, useRef } = React;

const FX = ({ scanlines, grain, vignette }) => (
  <>
    {scanlines > 0 && (
      <div className="fx scanlines" style={{ "--scan-opacity": scanlines }} />
    )}
    {grain > 0 && (
      <div className="fx grain" style={{ "--grain-opacity": grain }} />
    )}
    {vignette && <div className="fx vignette" />}
  </>
);

const BOOT_LINES = [
  "[ OK ] INITIALIZING TERMINAL INTERFACE v2.0.0",
  "[ OK ] LOADING TYPEFACES ............... DONE",
  "[ OK ] MOUNTING /WORKS ................. 12 PROJECTS",
  "[ OK ] HANDSHAKE WITH STATIC DATA ...... ESTABLISHED",
  "[ OK ] CALIBRATING SCANLINES ........... 60HZ",
  "[ OK ] CRT WARM-UP ..................... +14%",
  "[    ] CHECKING FILESYSTEM INTEGRITY...",
  "[ OK ] FILESYSTEM OK",
  "[ OK ] SECTORS: 06 / NAVIGATION READY",
  "",
  "WELCOME, OPERATOR.",
  "GOOD WORK TODAY.",
];

const Boot = ({ onDone }) => {
  const [lines, setLines] = useState(0);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setLines(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(t);
        setTimeout(onDone, 600);
      }
    }, 130);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="boot">
      <div style={{ color: "var(--accent)", marginBottom: 14, fontWeight: 600, letterSpacing: "0.18em" }}>
        &lt; PORTFOLIO.EXE &gt; <span style={{ color: "var(--fg-faint)", fontWeight: 400 }}>v2.0.0</span>
      </div>
      <div className="boot-bar"></div>
      {BOOT_LINES.slice(0, lines).map((l, i) => {
        const color = l.includes("[ OK ]") ? "ok" : l.includes("[    ]") ? "" : "";
        return (
          <div key={i} className="boot-line" style={{ animationDelay: `${i * 0.02}s`, animation: "bootIn 0.05s forwards" }}>
            {l.includes("[ OK ]") ? <><span className="ok">[ OK ]</span>{l.slice(6)}</> : l}
          </div>
        );
      })}
      <div style={{ color: "var(--fg-muted)", marginTop: 14 }}>
        {lines >= BOOT_LINES.length && <>READY<span className="cursor"></span></>}
      </div>
    </div>
  );
};

// Glitch text — periodically triggers the chromatic-aberration effect
const Glitch = ({ children, text, every = 6500 }) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    let to;
    const tick = () => {
      setActive(true);
      to = setTimeout(() => setActive(false), 600);
    };
    const id = setInterval(tick, every + Math.random() * 2000);
    return () => { clearInterval(id); clearTimeout(to); };
  }, [every]);
  const t = text || (typeof children === "string" ? children : "");
  return (
    <span ref={ref} className={"glitch" + (active ? " active" : "")} data-text={t}>
      {children}
    </span>
  );
};

const Cursor = () => <span className="cursor"></span>;

const sfxAudio = new Audio("ui-confirm.wav");
sfxAudio.volume = 0.4;

function playSfx() {
  sfxAudio.currentTime = 0;
  sfxAudio.play().catch(() => {});
}

document.addEventListener("click", (e) => {
  if (e.target.closest("button, a, .nav-item, .work-card, .thumb, .tab, .filter-bar button, .hamburger, .mobile-back, .icon-btn, .block-h")) {
    playSfx();
  }
});

Object.assign(window, { FX, Boot, Glitch, Cursor, playSfx });
