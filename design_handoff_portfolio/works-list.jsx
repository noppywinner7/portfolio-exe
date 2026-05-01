// Works list (middle column) + filter bar

const WorksList = ({ projects, filter, setFilter, selectedId, onSelect }) => {
  const filtered = filter === "ALL"
    ? projects
    : projects.filter(p => p.tags.includes(filter));

  return (
    <section className="panel">
      <span className="corner-tl"/><span className="corner-tr"/><span className="corner-bl"/><span className="corner-br"/>
      <div className="panel-h">
        <div className="h-l">&gt; WORKS DATABASE</div>
        <div className="h-r">TOTAL: {String(projects.length).padStart(2,"0")} PROJECTS</div>
      </div>
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="panel-body">
        {filtered.map(p => (
          <button key={p.id} className={"work-card" + (selectedId === p.id ? " sel" : "")} onClick={() => onSelect(p.id)}>
            <div className="work-thumb">
              {PROJECT_IMAGES[p.id]?.hero
                ? <img src={PROJECT_IMAGES[p.id].hero} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }} />
                : <Placeholder palette={p.palette} variant={p.id} code={p.code} caption={p.title.split(" ")[0]} />
              }
            </div>
            <div className="work-meta">
              <div className="work-num">{p.code}</div>
              <div className="work-title">{p.title}</div>
              <div className="work-cat">{p.category}</div>
              <div className="work-date">{p.date}</div>
            </div>
            <span className="diamond">{selectedId === p.id ? "◆" : "◇"}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 20, color: "var(--fg-muted)" }}>NO RESULTS.<Cursor/></div>
        )}
      </div>
    </section>
  );
};

window.WorksList = WorksList;
