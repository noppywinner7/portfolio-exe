// App entry — composes everything

const { useState: useStateA, useEffect: useEffectA, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "cream",
  "font": "jetbrains-cormorant",
  "density": "normal",
  "scanlines": 0.55,
  "grain": 0.08,
  "vignette": false,
  "boot": true,
  "cursorSpeed": 1.1
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [section, setSection] = useStateA("overview");
  const [filter, setFilter] = useStateA("ALL");
  const [selectedId, setSelectedId] = useStateA(1);
  const [booting, setBooting] = useStateA(tweaks.boot);
  const [sidebarOpen, setSidebarOpen] = useStateA(false);
  const [mobileDetail, setMobileDetail] = useStateA(false);
  const [isMobile, setIsMobile] = useStateA(window.innerWidth <= 768);

  useEffectA(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffectA(() => {
    document.documentElement.dataset.theme = tweaks.theme;
    document.documentElement.dataset.font = tweaks.font;
    document.documentElement.dataset.density = tweaks.density;
    document.documentElement.style.setProperty("--cursor-speed", tweaks.cursorSpeed + "s");
  }, [tweaks.theme, tweaks.font, tweaks.density, tweaks.cursorSpeed]);

  // Load extra fonts on demand
  useEffectA(() => {
    const links = [
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,500;1,400&display=swap",
      "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bodoni+Moda:ital,wght@0,500;1,500&display=swap",
      "https://fonts.googleapis.com/css2?family=VT323&family=IM+Fell+English:ital@0;1&display=swap",
    ];
    links.forEach((href) => {
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.href = href;
      document.head.appendChild(l);
    });
  }, []);

  // Filtered list for nav within Works section
  const filtered = useMemo(
    () => filter === "ALL" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter)),
    [filter]
  );
  const idx = Math.max(0, filtered.findIndex(p => p.id === selectedId));
  const project = filtered[idx] || PROJECTS[0];

  const goPrev = () => {
    if (filtered.length === 0) return;
    const i = (idx - 1 + filtered.length) % filtered.length;
    setSelectedId(filtered[i].id);
  };
  const goNext = () => {
    if (filtered.length === 0) return;
    const i = (idx + 1) % filtered.length;
    setSelectedId(filtered[i].id);
  };

  // Keyboard shortcuts
  useEffectA(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (section !== "works") return;
      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") { e.preventDefault(); goPrev(); }
      else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") { e.preventDefault(); goNext(); }
      else if (e.key === "a" || e.key === "A") { e.preventDefault(); cycleFilter(-1); }
      else if (e.key === "d" || e.key === "D") { e.preventDefault(); cycleFilter(1); }
      else if (e.key === "Escape") { e.preventDefault(); setSection("overview"); }
    };
    const cycleFilter = (dir) => {
      const i = FILTERS.indexOf(filter);
      const n = (i + dir + FILTERS.length) % FILTERS.length;
      setFilter(FILTERS[n]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [section, filter, idx, filtered]);

  if (booting) {
    return <Boot onDone={() => setBooting(false)} />;
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="t-l">
          <button className="hamburger" onClick={() => setSidebarOpen(o => !o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
          <span className="brand">&lt; PORTFOLIO.EXE &gt;<span className="ver">v2.0.0</span></span>
        </div>
        <div className="t-mid">{PROFILE.banner}</div>
        <div className="t-r">
          SYSTEM STATUS
          <span className="dot live"/>
          ONLINE
        </div>
      </header>

      {sidebarOpen && <div className="sidebar-backdrop visible" onClick={() => setSidebarOpen(false)} />}

      <div className={"body-grid" + (mobileDetail ? " detail-active" : "")}>
        <Sidebar section={section} setSection={(s) => { setSection(s); setSidebarOpen(false); setMobileDetail(false); }} sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {section === "works" && (
          <>
            <WorksList
              projects={PROJECTS}
              filter={filter}
              setFilter={setFilter}
              selectedId={selectedId}
              onSelect={(id) => { setSelectedId(id); if (isMobile) setMobileDetail(true); }}
            />
            <ProjectDetail
              project={project}
              index={idx}
              total={filtered.length}
              onPrev={goPrev}
              onNext={goNext}
              onBack={() => setMobileDetail(false)}
            />
          </>
        )}
        {section === "overview" && (
          <div style={{ gridColumn: "2 / 4", display: "flex", minHeight: 0 }}>
            <OverviewSection goWorks={() => setSection("works")} />
          </div>
        )}
        {section === "about"   && <div style={{ gridColumn: "2 / 4", display:"flex", minHeight:0 }}><AboutSection/></div>}
        {section === "skills"  && <div style={{ gridColumn: "2 / 4", display:"flex", minHeight:0 }}><SkillsSection/></div>}
        {section === "journal" && <div style={{ gridColumn: "2 / 4", display:"flex", minHeight:0 }}><JournalSection/></div>}
        {section === "contact" && <div style={{ gridColumn: "2 / 4", display:"flex", minHeight:0 }}><ContactSection/></div>}
      </div>

      <footer className="statusbar">
        <div>
          <span className="kbd"><b>W</b> <b>S</b> NAVIGATE</span>
          <span className="kbd"><b>A</b> <b>D</b> SWITCH TAB</span>
          <span className="kbd"><b>ENTER</b> VIEW</span>
          <span className="kbd"><b>ESC</b> BACK TO SYSTEM</span>
        </div>
        <div>SYSTEM LOGS &gt;</div>
      </footer>

      <FX scanlines={tweaks.scanlines} grain={tweaks.grain} vignette={tweaks.vignette} />
      <PortfolioTweaks tweaks={tweaks} setTweak={setTweak} />
    </div>
  );
}

// Apply initial tweaks BEFORE first paint to avoid theme flash
(function applyInitial() {
  document.documentElement.dataset.theme = TWEAK_DEFAULTS.theme;
  document.documentElement.dataset.font = TWEAK_DEFAULTS.font;
  document.documentElement.dataset.density = TWEAK_DEFAULTS.density;
  document.documentElement.style.setProperty("--cursor-speed", TWEAK_DEFAULTS.cursorSpeed + "s");
})();

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
