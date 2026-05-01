// Sidebar / nav, profile card, footer
const { useState: useStateS } = React;

const Sidebar = ({ section, setSection, theme }) => {
  return (
    <aside className="panel sidebar">
      <span className="corner-tl"/><span className="corner-tr"/><span className="corner-bl"/><span className="corner-br"/>
      <div className="panel-h">
        <div className="h-l">&gt; PROFILE</div>
      </div>
      <div className="profile-img">
        <Placeholder palette={["#1a1612","#2a221a","#4a3f2c","#a09070"]} variant={1} code="OP-WIN-07" caption="OPERATOR PORTRAIT" />
      </div>
      <div className="sidebar-meta">
        <h1 className="handle">{PROFILE.handle}</h1>
        <div className="role">{PROFILE.role}</div>
        <div className="meta-row"><span className="arrow">&gt;</span> LOCATION: <span className="val">{PROFILE.location}</span></div>
        <div className="meta-row"><span className="arrow">&gt;</span> STATUS:&nbsp;&nbsp; <span className="val">{PROFILE.status}</span></div>
        <div className="meta-row"><span className="arrow">&gt;</span> JOINED:&nbsp;&nbsp; <span className="val">{PROFILE.joined}</span></div>
      </div>
      <nav className="nav">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={"nav-item" + (section === s.id ? " active" : "")}
            onClick={() => setSection(s.id)}
          >
            <span>{s.num}. {s.label}</span>
            {section === s.id ? <span className="marker">◆</span> : <span className="marker">◇</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="emblem" aria-hidden="true">
          <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
            <circle cx="31" cy="31" r="22" stroke="var(--fg-muted)" strokeWidth="0.6"/>
            <circle cx="31" cy="31" r="14" stroke="var(--fg-muted)" strokeWidth="0.6"/>
            <line x1="31" y1="6" x2="31" y2="56" stroke="var(--fg-muted)" strokeWidth="0.6"/>
            <line x1="6" y1="31" x2="56" y2="31" stroke="var(--fg-muted)" strokeWidth="0.6"/>
            <polygon points="31,16 38,31 31,46 24,31" fill="var(--accent)" opacity="0.85"/>
          </svg>
        </div>
        <div className="socials">
          <a className="icon-btn" href="#" title="Email" aria-label="email">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1.5" y="3.5" width="13" height="9"/><polyline points="1.5,3.5 8,9 14.5,3.5"/></svg>
          </a>
          <a className="icon-btn" href="#" title="Instagram" aria-label="instagram">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1.8" y="1.8" width="12.4" height="12.4" rx="3"/><circle cx="8" cy="8" r="3"/><circle cx="11.6" cy="4.4" r="0.6" fill="currentColor"/></svg>
          </a>
          <a className="icon-btn" href="#" title="LinkedIn" aria-label="linkedin">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1.5" y="1.5" width="13" height="13"/><line x1="4" y1="6.5" x2="4" y2="12"/><circle cx="4" cy="4" r="0.5" fill="currentColor"/><path d="M7 12 V6.5 M7 8.5 C7 7 8 6.5 9 6.5 C10.5 6.5 11.5 7.3 11.5 9 V12"/></svg>
          </a>
        </div>
        <div className="copyright">{PROFILE.copyright}</div>
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
