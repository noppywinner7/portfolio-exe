// Project detail — hero, thumb strip, doc tabs, process strip

const { useState: useStateD, useEffect: useEffectD } = React;

const ProjectDetail = ({ project, index, total, onPrev, onNext, onBack }) => {
  const [docTab, setDocTab] = useStateD("01");
  const [activeThumb, setActiveThumb] = useStateD(0);
  const [procOpen, setProcOpen] = useStateD(true);

  useEffectD(() => { setDocTab("01"); setActiveThumb(0); }, [project.id]);

  const doc = (project.docs && project.docs[docTab]) || DOC_CONTENT[docTab] || DOC_CONTENT["01"];

  return (
    <div className="detail-wrap">
      <section className="panel detail-main screen-fade" key={project.id}>
        <span className="corner-tl"/><span className="corner-tr"/><span className="corner-bl"/><span className="corner-br"/>
        <div className="panel-h">
          <div className="h-l">
            <button className="mobile-back" onClick={onBack} aria-label="Back to list">&lt; BACK</button>
            <span>&gt; WORK DETAILS</span>
          </div>
          <div className="h-r">
            ENTRY {String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}
            &nbsp;
            <button className="icon-btn" style={{width:22,height:22}} onClick={onPrev} aria-label="previous">&lt;</button>
            <button className="icon-btn" style={{width:22,height:22}} onClick={onNext} aria-label="next">&gt;</button>
          </div>
        </div>

        <div className="hero">
          <div className="hero-bg">
            {(() => {
              const imgs = PROJECT_IMAGES[project.id];
              const src = imgs?.thumbs?.[activeThumb] || imgs?.hero;
              return src
                ? <img src={src} alt={project.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : <Placeholder palette={project.palette} variant={(activeThumb + project.id) % 5} code={project.code + "/HERO"} caption="HERO PLATE" />;
            })()}
          </div>
          <div className="hero-overlay">
            <div className="hero-title-block">
              <h2 className="hero-title">
                <Glitch text={project.title}>{project.title}</Glitch>
              </h2>
              <div className="hero-cat">{project.category}</div>
              <blockquote className="hero-quote">"{project.quote}"</blockquote>
            </div>
            <div className="hero-spec-card">
              <span className="corner-tl"/><span className="corner-tr"/><span className="corner-bl"/><span className="corner-br"/>
              <dl className="spec-grid">
                <div className="spec"><dt>DATE COMPLETED : {project.completed}</dt></div>
                <div className="spec"><dt>TOOLS USED</dt><dd>{project.tools}</dd></div>
                <div className="spec"><dt>RESOLUTION</dt><dd>{project.resolution}</dd></div>
                <div className="spec"><dt>WORKFLOW</dt><dd>{project.workflow}</dd></div>
                <div className="spec"><dt>TIME SPENT</dt><dd>{project.duration}</dd></div>
                <div className="spec"><dt>TAGS</dt><dd>{project.metaTags}</dd></div>
              </dl>
            </div>
          </div>
        </div>

        <div className="thumb-strip">
          {Array.from({ length: 6 }).map((_, i) => (
            <button key={i} className={"thumb" + (activeThumb === i ? " on" : "")} onClick={() => setActiveThumb(i)}>
              {PROJECT_IMAGES[project.id]?.thumbs?.[i]
                ? <img src={PROJECT_IMAGES[project.id].thumbs[i]} alt={`${project.title} thumbnail ${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : PROJECT_IMAGES[project.id]?.hero
                  ? <img src={PROJECT_IMAGES[project.id].hero} alt={`${project.title} thumbnail ${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <Placeholder palette={project.palette} variant={(i + project.id) % 5} code={`${project.code}.${i+1}`} caption="" />
              }
            </button>
          ))}
        </div>

        <div className="doc-section">
          <div className="block-h" style={{ borderTop: "1px solid var(--line)" }}>
            <span>&gt; PROJECT DOCUMENTATION</span>
            <span className="chev">▾</span>
          </div>

          <div className="doc">
            <div className="doc-tabs">
              {(project.docTabs || DOC_TABS).map(t => (
                <button key={t.n} className={"tab" + (docTab === t.n ? " on" : "")} onClick={() => setDocTab(t.n)}>
                  <span style={{ color: "var(--accent-dim)" }}>{t.n}.</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
            <div className="doc-content">
              <h3>{doc.title}</h3>
              <p>{doc.body}</p>
            </div>
            <div className="doc-aside">
              {PROJECT_IMAGES[project.id]?.ref
                ? <img src={PROJECT_IMAGES[project.id].ref} alt={`${project.title} reference`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : PROJECT_IMAGES[project.id]?.hero
                  ? <img src={PROJECT_IMAGES[project.id].hero} alt={`${project.title} reference`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <Placeholder palette={project.palette} variant={(project.id + 2) % 5} code={`${project.code}/REF`} caption="REFERENCE" />
              }
            </div>
          </div>
        </div>

        <div className="block-h" style={{ borderTop: "1px solid var(--line)" }} onClick={() => setProcOpen(o => !o)}>
          <span>&gt; 02. PROCESS OVERVIEW</span>
          <span className="chev">{procOpen ? "▾" : "▸"}</span>
        </div>
        {procOpen && (
          <div className="process">
            <div className="process-grid">
              {(project.processSteps || PROCESS_STEPS).map((s, i) => (
                <div key={i} className="proc-step">
                  <div className="pt">{s.n}.</div>
                  <div className="pl">{s.label}</div>
                  {s.sub && <div className="ps">{s.sub}</div>}
                  <div className="proc-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

window.ProjectDetail = ProjectDetail;
