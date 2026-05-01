// Other sections: Overview, About, Skills, Journal, Contact
// Each fills the right two columns (since sidebar always present).

const SectionFrame = ({ title, total, current, children }) => (
  <section className="panel screen-fade">
    <span className="corner-tl"/><span className="corner-tr"/><span className="corner-bl"/><span className="corner-br"/>
    <div className="panel-h">
      <div className="h-l">&gt; {title}</div>
      {total && <div className="h-r">{current} / {total}</div>}
    </div>
    <div className="panel-body section-pad">
      {children}
    </div>
  </section>
);

const OverviewSection = ({ goWorks }) => (
  <SectionFrame title="01. OVERVIEW" total="01" current="01">
    <div className="overview-grid">
      <div>
        <div style={{ color: "var(--accent)", fontSize: 10, marginBottom: 8 }}>// SYSTEM GREETING</div>
        <h2 className="h2">
          <Glitch text="HELLO, OPERATOR.">HELLO, OPERATOR.</Glitch>
          <Cursor/>
        </h2>
        <p className="lead">"{PROFILE.banner.replace(/^"|"$/g, "")}"</p>
        <p className="body-text">
          You have reached the personal archive of {PROFILE.handle} — a working portfolio of images, films, interfaces, and small experiments accumulated since {PROFILE.joined}.{"\n\n"}
          Use the sidebar to navigate. Or use keys: W/S to step through items, ENTER to open, ESC to return. The system is yours.
        </p>
        <button onClick={goWorks} style={{
          marginTop: 24, padding: "10px 18px",
          border: "1px solid var(--accent)", color: "var(--accent)",
          letterSpacing: "0.14em", fontSize: 11
        }}>
          → ENTER ARCHIVE
        </button>
      </div>
      <div style={{ border: "1px solid var(--line)", padding: 20, background: "var(--bg-raised)", position: "relative" }}>
        <div style={{ color: "var(--accent-dim)", fontSize: 10, marginBottom: 14 }}>// SYSTEM STATS</div>
        <div className="stats-grid">
          <Stat label="PROJECTS" value="12" />
          <Stat label="HOURS LOGGED" value="1,840" />
          <Stat label="ACTIVE SINCE" value="2022" />
          <Stat label="DISCIPLINES" value="5" />
          <Stat label="COFFEES" value="∞" />
          <Stat label="REGRETS" value="03" />
        </div>
        <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <div style={{ color: "var(--accent-dim)", fontSize: 10, marginBottom: 10 }}>// LATEST ACTIVITY</div>
          <ActivityRow date="2026.04" text="ADDED: MEMORIES OF THE CITY" />
          <ActivityRow date="2026.03" text="JOURNAL: ON LOOKING AT EMPTY ROOMS" />
          <ActivityRow date="2026.02" text="UPDATED: SECOND SLEEP" />
        </div>
      </div>
    </div>
  </SectionFrame>
);

const Stat = ({ label, value }) => (
  <div>
    <div style={{ color: "var(--fg-muted)", fontSize: 10 }}>{label}</div>
    <div style={{ color: "var(--fg-bright)", fontFamily: "var(--font-disp)", fontSize: 28, textTransform:"none", letterSpacing: "0.04em" }}>{value}</div>
  </div>
);
const ActivityRow = ({ date, text }) => (
  <div style={{ display: "flex", gap: 14, padding: "6px 0", borderBottom: "1px dashed var(--line)", fontSize: 10 }}>
    <span style={{ color: "var(--fg-muted)", width: 60 }}>{date}</span>
    <span style={{ color: "var(--fg)" }}>{text}</span>
  </div>
);

const AboutSection = () => (
  <SectionFrame title="03. ABOUT">
    <div className="about-grid">
      <div>
        <div style={{ color: "var(--accent)", fontSize: 10, marginBottom: 8 }}>// FILE: about.txt</div>
        <h2 className="h2">A QUIET LITTLE STUDIO.</h2>
        <p className="lead">"Tools, taste, and time — used carefully."</p>
        <p className="body-text">{PROFILE.about}</p>
      </div>
      <div>
        <div style={{ color: "var(--accent)", fontSize: 10, marginBottom: 14 }}>// VALUES</div>
        <dl className="kv-grid">
          {PROFILE.values.map((v, i) => (
            <div key={i} className="kv-card">
              <span className="corner-tl"/><span className="corner-tr"/><span className="corner-bl"/><span className="corner-br"/>
              <dt>{String(i+1).padStart(2,"0")} — {v.label}</dt>
              <dd>{v.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </SectionFrame>
);

const SkillsSection = () => (
  <SectionFrame title="04. SKILLS">
    <div style={{ color: "var(--accent)", fontSize: 10, marginBottom: 8 }}>// CAPABILITY MATRIX</div>
    <h2 className="h2">WHAT I CAN DO FOR YOU.</h2>
    <p className="lead">"Numbers are approximate. Curiosity is at maximum."</p>
    <div style={{ marginTop: 24, maxWidth: 720 }}>
      {SKILLS.map((g, gi) => (
        <div key={gi}>
          <div className="skill-grp-title">{g.group}</div>
          {g.items.map((s, si) => (
            <div key={si} className="skill-row">
              <div className="lbl">{s.label}</div>
              <div className="bar"><i style={{ display:"none" }}/><span style={{ "--w": s.level + "%", display:"block", width:"100%", height:"100%" }}>
                <span style={{ display:"block", height:"100%", width: s.level + "%", background:"linear-gradient(90deg, var(--accent-dim), var(--accent))" }}/>
              </span></div>
              <div className="num">{s.level}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </SectionFrame>
);

const JournalSection = () => (
  <SectionFrame title="05. JOURNAL" total={String(JOURNAL.length).padStart(2,"0")} current="01">
    <div style={{ color: "var(--accent)", fontSize: 10, marginBottom: 8 }}>// FIELD NOTES</div>
    <h2 className="h2">NOTES FROM THE DESK.</h2>
    <p className="lead">"Short essays. Process scraps. Half-formed thoughts that survived."</p>
    <div style={{ marginTop: 16 }}>
      {JOURNAL.map((j, i) => (
        <article key={i} className="journal-entry">
          <div className="j-date">{j.date}</div>
          <div>
            <h3 className="j-title">{String(i+1).padStart(2,"0")} — {j.title}</h3>
            <p className="j-excerpt">"{j.excerpt}"</p>
            <button className="j-more">→ READ FULL ENTRY</button>
          </div>
        </article>
      ))}
    </div>
  </SectionFrame>
);

const ContactSection = () => (
  <SectionFrame title="06. CONTACT">
    <div style={{ color: "var(--accent)", fontSize: 10, marginBottom: 8 }}>// OPEN CHANNEL</div>
    <h2 className="h2">SAY SOMETHING.</h2>
    <p className="lead">"I read everything. I reply to most things. Be patient with me."</p>
    <div className="contact-grid" style={{ maxWidth: 720 }}>
      <div className="contact-card">
        <div className="label">// EMAIL</div>
        <div className="val">{PROFILE.contact.email}</div>
      </div>
      <div className="contact-card">
        <div className="label">// INSTAGRAM</div>
        <div className="val">{PROFILE.contact.instagram}</div>
      </div>
      <div className="contact-card">
        <div className="label">// LINKEDIN</div>
        <div className="val">{PROFILE.contact.linkedin}</div>
      </div>
      <div className="contact-card">
        <div className="label">// AVAILABILITY</div>
        <div className="val">SELECTIVE — Q3 2026</div>
      </div>
    </div>
    <div style={{ marginTop: 30, color: "var(--fg-muted)", fontSize: 10, maxWidth: 600 }}>
      [ END OF TRANSMISSION ]<br/>
      THIS TERMINAL WILL REMAIN OPEN. LEAVE A NOTE WHEN YOU LIKE.
      <Cursor/>
    </div>
  </SectionFrame>
);

Object.assign(window, { OverviewSection, AboutSection, SkillsSection, JournalSection, ContactSection });
