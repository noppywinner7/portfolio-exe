// Reusable atmospheric placeholder artwork — pure CSS + SVG silhouettes.
// No bitmap dependencies. Variants pull from a project's palette.

const Placeholder = ({ palette = ["#1f1a10","#3d352b","#5a4f38","#8a7a55"], variant = 0, code = "ENV-001", caption = "PLACEHOLDER" }) => {
  const [c1, c2, c3, c4] = palette;
  const style = { "--c1": c1, "--c2": c2, "--c3": c3, "--c4": c4 };
  const v = variant % 5;

  // 5 silhouette variants — abstract, non-branded shapes that evoke ruined skylines / forms
  const skylines = [
    // 0: ruined city
    <svg key="0" viewBox="0 0 200 100" preserveAspectRatio="none">
      <g fill={c1} opacity="0.95">
        <polygon points="0,100 0,55 12,55 14,40 22,40 24,55 30,55 32,30 40,30 42,55 56,55 58,42 66,42 68,55 80,55 82,28 90,28 92,55 110,55 112,38 120,38 122,55 138,55 140,46 148,46 150,55 168,55 170,32 178,32 180,55 200,55 200,100" />
      </g>
      <g fill={c2} opacity="0.7">
        <rect x="36" y="36" width="2" height="20" />
        <rect x="86" y="34" width="2" height="22" />
        <rect x="174" y="38" width="2" height="18" />
      </g>
    </svg>,
    // 1: lone figure on horizon
    <svg key="1" viewBox="0 0 200 100" preserveAspectRatio="none">
      <line x1="0" y1="78" x2="200" y2="78" stroke={c2} strokeWidth="0.6" opacity="0.6" />
      <g fill={c1}>
        <ellipse cx="100" cy="78" rx="1.2" ry="0.4" />
        <rect x="99.6" y="72" width="0.8" height="6" />
        <circle cx="100" cy="71" r="0.9" />
      </g>
      <g fill={c2} opacity="0.5">
        <polygon points="0,100 0,82 30,80 60,84 100,79 140,83 170,80 200,82 200,100" />
      </g>
    </svg>,
    // 2: forest / pillars
    <svg key="2" viewBox="0 0 200 100" preserveAspectRatio="none">
      <g fill={c1} opacity="0.9">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={i*15 + (i%2)*3} y={40 + (i%3)*4} width="3" height={60 - (i%3)*4} />
        ))}
      </g>
    </svg>,
    // 3: mountains / dunes
    <svg key="3" viewBox="0 0 200 100" preserveAspectRatio="none">
      <polygon points="0,100 0,60 28,42 52,58 80,30 108,55 138,38 168,52 200,40 200,100" fill={c2} opacity="0.7" />
      <polygon points="0,100 0,72 24,62 60,78 92,64 124,76 156,66 200,74 200,100" fill={c1} />
    </svg>,
    // 4: tower / monolith
    <svg key="4" viewBox="0 0 200 100" preserveAspectRatio="none">
      <line x1="0" y1="80" x2="200" y2="80" stroke={c2} strokeWidth="0.5" opacity="0.5" />
      <rect x="92" y="20" width="16" height="60" fill={c1} />
      <rect x="94" y="22" width="2" height="56" fill={c2} opacity="0.5" />
      <rect x="104" y="22" width="2" height="56" fill={c2} opacity="0.5" />
    </svg>,
  ];

  return (
    <div className="ph" style={style}>
      <div className="ph-skyline">{skylines[v]}</div>
      <div className="ph-fog"></div>
      <div className="ph-code">// {code}</div>
      <div className="ph-bracket">[ {caption} ]</div>
    </div>
  );
};

window.Placeholder = Placeholder;
