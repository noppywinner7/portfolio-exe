// ── STATE ──

let state = {
  profile: {
    handle: "WIN-07",
    role: "AI ARTIST / DESIGNER",
    location: "NOWHERE",
    status: "SEEKING BEAUTY",
    joined: "2022.02.11",
    about: "",
    values: [
      { label: "CRAFT", body: "Slow, deliberate, finished. No shortcuts that show." },
      { label: "QUIET", body: "Restraint over volume. Whitespace is a feature." },
      { label: "HONESTY", body: "Tools disclosed, processes documented, work attributed." },
      { label: "SERVICE", body: "The user, the audience, the subject — they come first." },
    ],
    email: "win07@portfolio.exe",
    instagram: "@win.07",
    linkedin: "/in/win-07",
    banner: '"We continue to walk... to create... for the joy of it."',
    copyright: '© 2026 WIN-07. ALL RIGHTS RESERVED.\n"GLORY TO THE CRAFT."',
  },
  projects: [
    {
      id: 1, code: "01", title: "MEMORIES OF THE CITY",
      category: "AI ART / ENVIRONMENT DESIGN", tags: ["AI ART"],
      date: "2024.05", quote: "The city that remains\nis not alive, yet it remembers.\nI simply gave it form.",
      completed: "2024.05.21", tools: "MIDJOURNEY / PHOTOSHOP /\nSTABLE DIFFUSION / BLENDER",
      resolution: "7680 × 4320 (8K)",
      workflow: "AI GENERATION / MATTE PAINTING /\n3D COMPOSITION / COLOR GRADING",
      duration: "124 HOURS",
      metaTags: "POST-APOCALYPTIC / RUINS /\nENVIRONMENT / ATMOSPHERIC",
      palette: ["#2a2520","#3d352b","#5a4f38","#8a7a55"],
      processSteps: [
        { n: "1", label: "TEXT PROMPTS", sub: "(IDEATION)" },
        { n: "2", label: "AI GENERATION", sub: "(EXPLORATION)" },
        { n: "3", label: "SELECTION &\nCURATE", sub: "" },
        { n: "4", label: "MATTE PAINTING", sub: "(PHOTOSHOP)" },
        { n: "5", label: "3D COMPOSITION", sub: "(BLENDER)" },
        { n: "6", label: "COLOR GRADING &\nFINAL TOUCH", sub: "" },
      ],
    },
  ],
  skills: [
    { group: "GENERATION", items: [
      { label: "MIDJOURNEY", level: 95 },
      { label: "STABLE DIFFUSION", level: 90 },
      { label: "RUNWAY / KLING", level: 78 },
      { label: "COMFYUI / NODES", level: 82 },
    ]},
    { group: "POST-PRODUCTION", items: [
      { label: "PHOTOSHOP", level: 92 },
      { label: "AFTER EFFECTS", level: 80 },
      { label: "DAVINCI RESOLVE", level: 70 },
      { label: "BLENDER", level: 68 },
    ]},
    { group: "DESIGN", items: [
      { label: "FIGMA / UI", level: 88 },
      { label: "TYPOGRAPHY", level: 82 },
      { label: "ART DIRECTION", level: 86 },
      { label: "SYSTEMS THINKING", level: 84 },
    ]},
  ],
  journal: [
    { date: "2026.04.18", title: "ON LOOKING AT EMPTY ROOMS", excerpt: "I have been keeping a folder of empty rooms..." },
  ],
  docs: {
    "01": "This project explores the residue of human intention left behind in places we no longer occupy.",
    "02": "A six-stage pipeline from text prompt to final composite.",
    "03": "Generation: Stable Diffusion XL (custom LoRA), Midjourney v6.",
    "04": "Maintaining hand-feel under aggressive AI generation.",
    "05": "Featured in two online exhibitions. Print run of 50.",
    "06": "Real-time variant in TouchDesigner. VR walkthrough.",
  },
  process: [
    { n: "1", label: "TEXT PROMPTS", sub: "(IDEATION)" },
    { n: "2", label: "AI GENERATION", sub: "(EXPLORATION)" },
    { n: "3", label: "SELECTION &\nCURATE", sub: "" },
    { n: "4", label: "MATTE PAINTING", sub: "(PHOTOSHOP)" },
    { n: "5", label: "3D COMPOSITION", sub: "(BLENDER)" },
    { n: "6", label: "COLOR GRADING &\nFINAL TOUCH", sub: "" },
  ],
  settings: {
    theme: "cream",
    font: "jetbrains-cormorant",
    density: "normal",
    scanlines: 0.55,
    grain: 0.08,
    vignette: false,
    boot: true,
    cursorSpeed: 1.1,
  },
};

let activeProjectIndex = 0;

// Images stored as { [projectId]: { hero: dataUrl, thumbs: [dataUrl x6], ref: dataUrl } }
let imageStore = {};
let profileImage = null;

// Editable tags
if (!state.filterTags) state.filterTags = ["AI ART", "CONCEPT", "VIDEO", "EXPERIMENT"];

// ── TAB SWITCHING ──

function switchTab(tab) {
  document.querySelectorAll('.ed-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ed-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
}

// ── TOAST ──

let toastEl;
function toast(msg) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'ed-toast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2000);
}

// ── PROFILE ──

function loadProfile() {
  const p = state.profile;
  document.getElementById('profile-handle').value = p.handle;
  document.getElementById('profile-role').value = p.role;
  document.getElementById('profile-location').value = p.location;
  document.getElementById('profile-status').value = p.status;
  document.getElementById('profile-joined').value = p.joined;
  document.getElementById('profile-about').value = p.about;
  document.getElementById('profile-email').value = p.email;
  document.getElementById('profile-instagram').value = p.instagram;
  document.getElementById('profile-linkedin').value = p.linkedin;
  document.getElementById('profile-banner').value = p.banner;
  document.getElementById('profile-copyright').value = p.copyright;
  renderValues();
}

function readProfile() {
  state.profile.handle = document.getElementById('profile-handle').value;
  state.profile.role = document.getElementById('profile-role').value;
  state.profile.location = document.getElementById('profile-location').value;
  state.profile.status = document.getElementById('profile-status').value;
  state.profile.joined = document.getElementById('profile-joined').value;
  state.profile.about = document.getElementById('profile-about').value;
  state.profile.email = document.getElementById('profile-email').value;
  state.profile.instagram = document.getElementById('profile-instagram').value;
  state.profile.linkedin = document.getElementById('profile-linkedin').value;
  state.profile.banner = document.getElementById('profile-banner').value;
  state.profile.copyright = document.getElementById('profile-copyright').value;
  readValues();
}

// ── VALUES ──

function renderValues() {
  const list = document.getElementById('values-list');
  list.innerHTML = state.profile.values.map((v, i) => `
    <div class="ed-list-item">
      <div class="ed-item-header">
        <span class="ed-item-num">${String(i + 1).padStart(2, '0')}</span>
        <button class="ed-btn ed-btn-danger" onclick="removeValue(${i})">REMOVE</button>
      </div>
      <div class="ed-grid-2">
        <div class="ed-field">
          <label>LABEL</label>
          <input type="text" value="${esc(v.label)}" onchange="state.profile.values[${i}].label=this.value" />
        </div>
        <div class="ed-field">
          <label>DESCRIPTION</label>
          <input type="text" value="${esc(v.body)}" onchange="state.profile.values[${i}].body=this.value" />
        </div>
      </div>
    </div>
  `).join('');
}

function addValue() {
  if (state.profile.values.length >= 4) return toast('MAX 4 VALUES');
  state.profile.values.push({ label: "", body: "" });
  renderValues();
}

function removeValue(i) {
  state.profile.values.splice(i, 1);
  renderValues();
}

function readValues() {
  document.querySelectorAll('#values-list .ed-list-item').forEach((el, i) => {
    const inputs = el.querySelectorAll('input');
    state.profile.values[i] = { label: inputs[0].value, body: inputs[1].value };
  });
}

// ── PROJECTS ──

function renderProjectTabs() {
  const tabs = document.getElementById('project-tabs');
  tabs.innerHTML = state.projects.map((p, i) => `
    <button class="ed-project-tab ${i === activeProjectIndex ? 'active' : ''}" onclick="selectProject(${i})">
      ${p.code} ${p.title || 'UNTITLED'}
    </button>
  `).join('');
}

function selectProject(i) {
  readCurrentProject();
  activeProjectIndex = i;
  renderProjectTabs();
  renderProjectEditor();
}

function renderProjectEditor() {
  const p = state.projects[activeProjectIndex];
  if (!p) { document.getElementById('project-editor').innerHTML = '<p style="color:var(--fg-muted);padding:20px">NO PROJECTS YET. CLICK + ADD PROJECT.</p>'; return; }

  const tags = state.filterTags || ["AI ART", "CONCEPT", "VIDEO", "EXPERIMENT"];
  const tagsHtml = tags.map(t =>
    `<button class="ed-tag-btn ${p.tags.includes(t) ? 'active' : ''}" onclick="toggleTag(${activeProjectIndex},'${esc(t)}')">${esc(t)}</button>`
  ).join('');

  const imgs = imageStore[p.id] || {};
  const heroPreview = imgs.hero ? `<img src="${imgs.hero}" />` : '';
  const heroClass = imgs.hero ? 'ed-dropzone ed-drop-hero has-image' : 'ed-dropzone ed-drop-hero';

  let thumbsHtml = '';
  for (let i = 0; i < 6; i++) {
    const src = imgs.thumbs && imgs.thumbs[i];
    const cls = src ? 'ed-dropzone ed-drop-thumb has-image' : 'ed-dropzone ed-drop-thumb';
    thumbsHtml += `<div class="${cls}" ondragover="dzOver(event)" ondragleave="dzLeave(event)" ondrop="dzDropThumb(event,${p.id},${i})">
      ${src ? `<img src="${src}" />` : ''}
      <span class="ed-drop-label">THUMB ${i + 1}</span>
      <input type="file" accept="image/*" onchange="handleThumbFile(event,${p.id},${i})" />
    </div>`;
  }

  const refSrc = imgs.ref;
  const refClass = refSrc ? 'ed-dropzone ed-drop-ref has-image' : 'ed-dropzone ed-drop-ref';

  document.getElementById('project-editor').innerHTML = `
    <div class="ed-card">
      <div class="ed-item-header">
        <h3>// PROJECT ${p.code}</h3>
        <button class="ed-btn ed-btn-danger" onclick="removeProject(${activeProjectIndex})">DELETE PROJECT</button>
      </div>
      <div class="ed-grid-2">
        <div class="ed-field">
          <label>CODE (e.g. 01)</label>
          <input type="text" id="proj-code" value="${esc(p.code)}" />
        </div>
        <div class="ed-field">
          <label>TITLE</label>
          <input type="text" id="proj-title" value="${esc(p.title)}" />
        </div>
        <div class="ed-field">
          <label>CATEGORY</label>
          <input type="text" id="proj-category" value="${esc(p.category)}" placeholder="AI ART / ENVIRONMENT DESIGN" />
        </div>
        <div class="ed-field">
          <label>DATE (YYYY.MM)</label>
          <input type="text" id="proj-date" value="${esc(p.date)}" placeholder="2024.05" />
        </div>
      </div>
      <div class="ed-field">
        <label>TAGS (click to toggle)</label>
        <div class="ed-tags">${tagsHtml}</div>
      </div>
      <div class="ed-field">
        <label>QUOTE (poetic, 1-3 lines)</label>
        <textarea id="proj-quote" rows="3">${esc(p.quote)}</textarea>
      </div>
    </div>

    <div class="ed-card">
      <h3>// HERO IMAGE (16:9)</h3>
      <div class="${heroClass}" ondragover="dzOver(event)" ondragleave="dzLeave(event)" ondrop="dzDropHero(event,${p.id})">
        ${heroPreview}
        <span class="ed-drop-label">DROP IMAGE HERE OR CLICK TO BROWSE</span>
        <input type="file" accept="image/*" onchange="handleHeroFile(event,${p.id})" />
      </div>

      <h3 style="margin-top:16px">// THUMBNAILS (6 variants)</h3>
      <div class="ed-thumb-grid">${thumbsHtml}</div>

      <h3>// REFERENCE IMAGE</h3>
      <div class="${refClass}" style="max-width:220px" ondragover="dzOver(event)" ondragleave="dzLeave(event)" ondrop="dzDropRef(event,${p.id})">
        ${refSrc ? `<img src="${refSrc}" />` : ''}
        <span class="ed-drop-label">DOC REFERENCE</span>
        <input type="file" accept="image/*" onchange="handleRefFile(event,${p.id})" />
      </div>
    </div>

    <div class="ed-card">
      <h3>// SPECS</h3>
      <div class="ed-grid-2">
        <div class="ed-field">
          <label>DATE COMPLETED</label>
          <input type="text" id="proj-completed" value="${esc(p.completed)}" placeholder="2024.05.21" />
        </div>
        <div class="ed-field">
          <label>RESOLUTION</label>
          <input type="text" id="proj-resolution" value="${esc(p.resolution)}" placeholder="7680 x 4320 (8K)" />
        </div>
        <div class="ed-field">
          <label>TIME SPENT</label>
          <input type="text" id="proj-duration" value="${esc(p.duration)}" placeholder="124 HOURS" />
        </div>
      </div>
      <div class="ed-field">
        <label>TOOLS USED</label>
        <textarea id="proj-tools" rows="2">${esc(p.tools)}</textarea>
      </div>
      <div class="ed-field">
        <label>WORKFLOW</label>
        <textarea id="proj-workflow" rows="2">${esc(p.workflow)}</textarea>
      </div>
      <div class="ed-field">
        <label>META TAGS</label>
        <textarea id="proj-metaTags" rows="2">${esc(p.metaTags)}</textarea>
      </div>
    </div>

    <div class="ed-card">
      <h3>// COLOR PALETTE (4 colors, dark to light)</h3>
      <div class="ed-palette">
        <input type="color" id="proj-c0" value="${p.palette[0]}" />
        <input type="color" id="proj-c1" value="${p.palette[1]}" />
        <input type="color" id="proj-c2" value="${p.palette[2]}" />
        <input type="color" id="proj-c3" value="${p.palette[3]}" />
      </div>
    </div>

    <div class="ed-card">
      <h3>// PROCESS STEPS</h3>
      <div class="ed-process-grid" id="proj-process-list">
        ${(p.processSteps || []).map((s, i) => `
          <div class="ed-process-item">
            <div class="ed-process-num">${s.n}.</div>
            <div class="ed-field">
              <label>STEP LABEL</label>
              <input type="text" value="${esc(s.label)}" onchange="state.projects[${activeProjectIndex}].processSteps[${i}].label=this.value" />
            </div>
            <div class="ed-field">
              <label>SUB-LABEL</label>
              <input type="text" value="${esc(s.sub)}" onchange="state.projects[${activeProjectIndex}].processSteps[${i}].sub=this.value" />
            </div>
            <button class="ed-btn ed-btn-danger ed-btn-sm" onclick="removeProcessStep(${i})" style="margin-top:4px">REMOVE</button>
          </div>
        `).join('')}
      </div>
      <button class="ed-btn ed-btn-add" onclick="addProcessStep()" style="margin-top:12px">+ ADD STEP</button>
    </div>
  `;
}

function readCurrentProject() {
  const p = state.projects[activeProjectIndex];
  if (!p) return;
  const v = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
  p.code = v('proj-code');
  p.title = v('proj-title');
  p.category = v('proj-category');
  p.date = v('proj-date');
  p.quote = v('proj-quote');
  p.completed = v('proj-completed');
  p.resolution = v('proj-resolution');
  p.duration = v('proj-duration');
  p.tools = v('proj-tools');
  p.workflow = v('proj-workflow');
  p.metaTags = v('proj-metaTags');
  const c = (id) => { const el = document.getElementById(id); return el ? el.value : '#000000'; };
  p.palette = [c('proj-c0'), c('proj-c1'), c('proj-c2'), c('proj-c3')];
  // Read process steps from DOM
  const procItems = document.querySelectorAll('#proj-process-list .ed-process-item');
  if (procItems.length > 0) {
    p.processSteps = [];
    procItems.forEach((el, i) => {
      const inputs = el.querySelectorAll('input');
      p.processSteps.push({ n: String(i + 1), label: inputs[0].value, sub: inputs[1].value });
    });
  }
}

function addProject() {
  readCurrentProject();
  const num = state.projects.length + 1;
  state.projects.push({
    id: num, code: String(num).padStart(2, '0'), title: "",
    category: "", tags: [], date: "", quote: "",
    completed: "", tools: "", resolution: "", workflow: "",
    duration: "", metaTags: "",
    palette: ["#1a1612", "#2e2820", "#5a4d33", "#9c8a5c"],
    processSteps: [
      { n: "1", label: "", sub: "" },
      { n: "2", label: "", sub: "" },
      { n: "3", label: "", sub: "" },
    ],
  });
  activeProjectIndex = state.projects.length - 1;
  renderProjectTabs();
  renderProjectEditor();
}

function removeProject(i) {
  state.projects.splice(i, 1);
  state.projects.forEach((p, j) => { p.id = j + 1; p.code = String(j + 1).padStart(2, '0'); });
  if (activeProjectIndex >= state.projects.length) activeProjectIndex = Math.max(0, state.projects.length - 1);
  renderProjectTabs();
  renderProjectEditor();
}

function addProcessStep() {
  readCurrentProject();
  const p = state.projects[activeProjectIndex];
  if (!p) return;
  if (!p.processSteps) p.processSteps = [];
  const n = String(p.processSteps.length + 1);
  p.processSteps.push({ n: n, label: "", sub: "" });
  renderProjectEditor();
}

function removeProcessStep(i) {
  const p = state.projects[activeProjectIndex];
  if (!p || !p.processSteps) return;
  p.processSteps.splice(i, 1);
  p.processSteps.forEach((s, j) => { s.n = String(j + 1); });
  renderProjectEditor();
}

function toggleTag(projIdx, tag) {
  const p = state.projects[projIdx];
  const i = p.tags.indexOf(tag);
  if (i >= 0) p.tags.splice(i, 1); else p.tags.push(tag);
  renderProjectEditor();
}

// ── SKILLS ──

function renderSkills() {
  const list = document.getElementById('skills-list');
  list.innerHTML = state.skills.map((g, gi) => `
    <div class="ed-card">
      <div class="ed-item-header">
        <div class="ed-field" style="margin:0;flex:1;max-width:300px">
          <label>GROUP NAME</label>
          <input type="text" value="${esc(g.group)}" onchange="state.skills[${gi}].group=this.value" />
        </div>
        <button class="ed-btn ed-btn-danger" onclick="removeSkillGroup(${gi})">REMOVE GROUP</button>
      </div>
      <div id="skill-items-${gi}">
        ${g.items.map((s, si) => `
          <div class="ed-skill-item">
            <div class="ed-field">
              <input type="text" value="${esc(s.label)}" onchange="state.skills[${gi}].items[${si}].label=this.value" placeholder="SKILL NAME" />
            </div>
            <div class="ed-field">
              <input type="number" value="${s.level}" min="0" max="100" onchange="state.skills[${gi}].items[${si}].level=+this.value" />
            </div>
            <button class="ed-btn ed-btn-danger ed-btn-sm" onclick="removeSkill(${gi},${si})">X</button>
          </div>
        `).join('')}
      </div>
      <button class="ed-btn ed-btn-add" onclick="addSkill(${gi})" style="margin-top:8px">+ ADD SKILL</button>
    </div>
  `).join('');
}

function addSkillGroup() {
  state.skills.push({ group: "", items: [{ label: "", level: 50 }] });
  renderSkills();
}

function removeSkillGroup(i) {
  state.skills.splice(i, 1);
  renderSkills();
}

function addSkill(gi) {
  state.skills[gi].items.push({ label: "", level: 50 });
  renderSkills();
}

function removeSkill(gi, si) {
  state.skills[gi].items.splice(si, 1);
  renderSkills();
}

function readSkills() {
  state.skills.forEach((g, gi) => {
    const groupInput = document.querySelector(`#skills-list .ed-card:nth-child(${gi + 1}) .ed-item-header input`);
    if (groupInput) g.group = groupInput.value;
    const items = document.querySelectorAll(`#skill-items-${gi} .ed-skill-item`);
    items.forEach((el, si) => {
      const inputs = el.querySelectorAll('input');
      g.items[si] = { label: inputs[0].value, level: +inputs[1].value };
    });
  });
}

// ── JOURNAL ──

function renderJournal() {
  const list = document.getElementById('journal-list');
  list.innerHTML = state.journal.map((j, i) => `
    <div class="ed-list-item">
      <div class="ed-item-header">
        <span class="ed-item-num">${String(i + 1).padStart(2, '0')}</span>
        <button class="ed-btn ed-btn-danger" onclick="removeJournalEntry(${i})">REMOVE</button>
      </div>
      <div class="ed-grid-2">
        <div class="ed-field">
          <label>DATE (YYYY.MM.DD)</label>
          <input type="text" value="${esc(j.date)}" onchange="state.journal[${i}].date=this.value" placeholder="2026.04.18" />
        </div>
        <div class="ed-field">
          <label>TITLE</label>
          <input type="text" value="${esc(j.title)}" onchange="state.journal[${i}].title=this.value" />
        </div>
      </div>
      <div class="ed-field">
        <label>EXCERPT</label>
        <textarea rows="3" onchange="state.journal[${i}].excerpt=this.value">${esc(j.excerpt)}</textarea>
      </div>
    </div>
  `).join('');
}

function addJournalEntry() {
  state.journal.push({ date: "", title: "", excerpt: "" });
  renderJournal();
}

function removeJournalEntry(i) {
  state.journal.splice(i, 1);
  renderJournal();
}

function readJournal() {
  document.querySelectorAll('#journal-list .ed-list-item').forEach((el, i) => {
    const inputs = el.querySelectorAll('input');
    const ta = el.querySelector('textarea');
    state.journal[i] = { date: inputs[0].value, title: inputs[1].value, excerpt: ta.value };
  });
}

// ── DOCS ──

function loadDocs() {
  Object.keys(state.docs).forEach(k => {
    const el = document.getElementById('doc-' + k);
    if (el) el.value = state.docs[k];
  });
}

function readDocs() {
  Object.keys(state.docs).forEach(k => {
    const el = document.getElementById('doc-' + k);
    if (el) state.docs[k] = el.value;
  });
}

// ── PROCESS ──

function renderProcess() {
  const list = document.getElementById('process-list');
  list.innerHTML = state.process.map((s, i) => `
    <div class="ed-process-item">
      <div class="ed-process-num">${s.n}.</div>
      <div class="ed-field">
        <label>STEP LABEL</label>
        <input type="text" value="${esc(s.label)}" onchange="state.process[${i}].label=this.value" />
      </div>
      <div class="ed-field">
        <label>SUB-LABEL</label>
        <input type="text" value="${esc(s.sub)}" onchange="state.process[${i}].sub=this.value" />
      </div>
    </div>
  `).join('');
}

// ── SETTINGS ──

function loadSettings() {
  const s = state.settings;
  document.getElementById('setting-theme').value = s.theme;
  document.getElementById('setting-font').value = s.font;
  document.getElementById('setting-density').value = s.density;
  document.getElementById('setting-scanlines').value = s.scanlines;
  document.getElementById('setting-grain').value = s.grain;
  document.getElementById('setting-vignette').value = String(s.vignette);
  document.getElementById('setting-boot').value = String(s.boot);
  document.getElementById('setting-cursorSpeed').value = s.cursorSpeed;
}

function readSettings() {
  state.settings.theme = document.getElementById('setting-theme').value;
  state.settings.font = document.getElementById('setting-font').value;
  state.settings.density = document.getElementById('setting-density').value;
  state.settings.scanlines = +document.getElementById('setting-scanlines').value;
  state.settings.grain = +document.getElementById('setting-grain').value;
  state.settings.vignette = document.getElementById('setting-vignette').value === 'true';
  state.settings.boot = document.getElementById('setting-boot').value === 'true';
  state.settings.cursorSpeed = +document.getElementById('setting-cursorSpeed').value;
}

// ── READ ALL ──

function readAll() {
  readProfile();
  readCurrentProject();
  readSkills();
  readJournal();
  readDocs();
  readSettings();
}

// ── EXPORT ──

function exportDataJsx() {
  readAll();
  const imgMap = {};
  for (const p of state.projects) {
    const imgs = imageStore[p.id];
    if (!imgs) { imgMap[p.id] = { hero: `images/project-${p.code}-hero.png` }; continue; }
    imgMap[p.id] = {};
    if (imgs.hero) imgMap[p.id].hero = `images/project-${p.code}-hero${getExtension(imgs.hero)}`;
    if (imgs.thumbs) {
      imgMap[p.id].thumbs = imgs.thumbs.map((t, i) => t ? `images/project-${p.code}-thumb-${i+1}${getExtension(t)}` : null);
    }
    if (imgs.ref) imgMap[p.id].ref = `images/project-${p.code}-ref${getExtension(imgs.ref)}`;
    if (!imgMap[p.id].hero && !imgMap[p.id].thumbs && !imgMap[p.id].ref) imgMap[p.id].hero = `images/project-${p.code}-hero.png`;
  }
  const output = generateDataJsx(imgMap);
  try {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('DATA.JSX EXPORTED');
  } catch (err) {
    console.error('Export failed:', err);
    toast('EXPORT FAILED — CHECK CONSOLE');
  }
}

// ── SAVE / LOAD DRAFT ──

function saveToLocalStorage() {
  readAll();
  localStorage.setItem('portfolio-editor-draft', JSON.stringify(state));
  toast('DRAFT SAVED');
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('portfolio-editor-draft');
  if (saved) {
    try {
      state = JSON.parse(saved);
      return true;
    } catch (e) { /* ignore */ }
  }
  return false;
}

// ── IMPORT ──

function loadFromFile() {
  document.getElementById('file-import').click();
}

function handleFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const text = e.target.result;
      // Try to parse as JSON first
      try {
        state = JSON.parse(text);
        initAll();
        toast('IMPORTED FROM JSON');
        return;
      } catch (_) { /* not JSON, try JSX */ }
      toast('IMPORT: USE A SAVED DRAFT (JSON)');
    } catch (err) {
      toast('IMPORT FAILED');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ── HELPERS ──

function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── IMAGE HANDLING ──

function fileToDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

function dzOver(e) { e.preventDefault(); e.currentTarget.classList.add('dragover'); }
function dzLeave(e) { e.currentTarget.classList.remove('dragover'); }

async function dzDropHero(e, projId) {
  e.preventDefault(); e.currentTarget.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  if (!imageStore[projId]) imageStore[projId] = {};
  imageStore[projId].hero = await fileToDataUrl(file);
  renderProjectEditor();
}
async function handleHeroFile(e, projId) {
  const file = e.target.files[0]; if (!file) return;
  if (!imageStore[projId]) imageStore[projId] = {};
  imageStore[projId].hero = await fileToDataUrl(file);
  renderProjectEditor();
}

async function dzDropThumb(e, projId, idx) {
  e.preventDefault(); e.currentTarget.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  if (!imageStore[projId]) imageStore[projId] = {};
  if (!imageStore[projId].thumbs) imageStore[projId].thumbs = [];
  imageStore[projId].thumbs[idx] = await fileToDataUrl(file);
  renderProjectEditor();
}
async function handleThumbFile(e, projId, idx) {
  const file = e.target.files[0]; if (!file) return;
  if (!imageStore[projId]) imageStore[projId] = {};
  if (!imageStore[projId].thumbs) imageStore[projId].thumbs = [];
  imageStore[projId].thumbs[idx] = await fileToDataUrl(file);
  renderProjectEditor();
}

async function dzDropRef(e, projId) {
  e.preventDefault(); e.currentTarget.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  if (!imageStore[projId]) imageStore[projId] = {};
  imageStore[projId].ref = await fileToDataUrl(file);
  renderProjectEditor();
}
async function handleRefFile(e, projId) {
  const file = e.target.files[0]; if (!file) return;
  if (!imageStore[projId]) imageStore[projId] = {};
  imageStore[projId].ref = await fileToDataUrl(file);
  renderProjectEditor();
}

// ── TAG MANAGEMENT ──

function renderTagsManager() {
  const tags = state.filterTags || [];
  const el = document.getElementById('tags-manager');
  if (!el) return;
  el.innerHTML = tags.map((t, i) => `
    <span class="ed-tag-manager-item">
      ${esc(t)}
      <button class="ed-tag-remove" onclick="removeFilterTag(${i})">x</button>
    </span>
  `).join('');
}

function addFilterTag() {
  const input = document.getElementById('new-tag-input');
  const val = input.value.trim().toUpperCase();
  if (!val) return;
  if (!state.filterTags) state.filterTags = [];
  if (state.filterTags.includes(val)) { toast('TAG ALREADY EXISTS'); return; }
  state.filterTags.push(val);
  input.value = '';
  renderTagsManager();
}

function removeFilterTag(i) {
  state.filterTags.splice(i, 1);
  renderTagsManager();
}

// ── ZIP EXPORT ──

function dataUrlToBlob(dataUrl) {
  const parts = dataUrl.split(',');
  const mime = parts[0].match(/:(.*?);/)[1];
  const bytes = atob(parts[1]);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function getExtension(dataUrl) {
  const mime = dataUrl.split(',')[0].match(/:(.*?);/)[1];
  const map = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif' };
  return map[mime] || '.png';
}

async function exportZip() {
  readAll();
  if (typeof JSZip === 'undefined') { toast('JSZIP NOT LOADED'); return; }

  const zip = new JSZip();
  const folder = zip.folder('design_handoff_portfolio');
  const imgFolder = folder.folder('images');

  // Build PROJECT_IMAGES map based on what images actually exist
  const imgMap = {};
  for (const p of state.projects) {
    const imgs = imageStore[p.id];
    if (!imgs) continue;
    imgMap[p.id] = {};

    if (imgs.hero) {
      const ext = getExtension(imgs.hero);
      const name = `project-${p.code}-hero${ext}`;
      imgFolder.file(name, dataUrlToBlob(imgs.hero));
      imgMap[p.id].hero = `images/${name}`;
    }
    if (imgs.thumbs) {
      imgMap[p.id].thumbs = [];
      imgs.thumbs.forEach((t, i) => {
        if (!t) return;
        const ext = getExtension(t);
        const name = `project-${p.code}-thumb-${i + 1}${ext}`;
        imgFolder.file(name, dataUrlToBlob(t));
        imgMap[p.id].thumbs[i] = `images/${name}`;
      });
    }
    if (imgs.ref) {
      const ext = getExtension(imgs.ref);
      const name = `project-${p.code}-ref${ext}`;
      imgFolder.file(name, dataUrlToBlob(imgs.ref));
      imgMap[p.id].ref = `images/${name}`;
    }
  }

  // Generate data.jsx with the correct image map
  const dataJsx = generateDataJsx(imgMap);
  folder.file('data.jsx', dataJsx);

  try {
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-export.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('ZIP EXPORTED');
  } catch (err) {
    console.error('ZIP export failed:', err);
    toast('ZIP EXPORT FAILED');
  }
}

function generateDataJsx(imgMap) {
  const s = state;
  const jstr = (v) => JSON.stringify(v);
  const tags = s.filterTags || ["AI ART", "CONCEPT", "VIDEO", "EXPERIMENT"];

  const projectsStr = s.projects.map(p => `  { id: ${p.id},  code: ${jstr(p.code)}, title: ${jstr(p.title)}, category: ${jstr(p.category)}, tags: ${jstr(p.tags)}, date: ${jstr(p.date)},
    quote: ${jstr(p.quote)},
    completed: ${jstr(p.completed)},
    tools: ${jstr(p.tools)},
    resolution: ${jstr(p.resolution)},
    workflow: ${jstr(p.workflow)},
    duration: ${jstr(p.duration)},
    metaTags: ${jstr(p.metaTags)},
    palette: ${jstr(p.palette)},
    processSteps: [
${(p.processSteps || []).map(s => `      { n: ${jstr(s.n)}, label: ${jstr(s.label)}, sub: ${jstr(s.sub)} }`).join(',\n')}
    ]
  }`).join(',\n');

  const skillsStr = s.skills.map(g =>
    `  { group: ${jstr(g.group)}, items: [\n` +
    g.items.map(i => `    { label: ${jstr(i.label)}, level: ${i.level} }`).join(',\n') +
    `\n  ]}`
  ).join(',\n');

  const journalStr = s.journal.map(j =>
    `  { date: ${jstr(j.date)}, title: ${jstr(j.title)}, excerpt: ${jstr(j.excerpt)} }`
  ).join(',\n');

  const docNames = {'01':'CONCEPT','02':'PROCESS','03':'TECHNICAL BREAKDOWN','04':'CHALLENGES','05':'OUTCOME','06':'FUTURE ITERATIONS'};
  const docStr = Object.entries(s.docs).map(([k, v]) =>
    `  ${jstr(k)}: {\n    title: ${jstr(k + '. ' + (docNames[k] || ''))},\n    body: ${jstr(v)}\n  }`
  ).join(',\n');

  const defaultSteps = (s.projects[0] && s.projects[0].processSteps) || s.process || [];
  const processStr = defaultSteps.map(p =>
    `  { n: ${jstr(p.n)}, label: ${jstr(p.label)}, sub: ${jstr(p.sub)} }`
  ).join(',\n');

  const imgEntries = imgMap || {};
  const imgStr = Object.entries(imgEntries).map(([id, paths]) => {
    const parts = [];
    if (paths.hero) parts.push(`hero: ${jstr(paths.hero)}`);
    if (paths.thumbs && paths.thumbs.length) parts.push(`thumbs: ${jstr(paths.thumbs)}`);
    if (paths.ref) parts.push(`ref: ${jstr(paths.ref)}`);
    return `  ${id}: { ${parts.join(', ')} }`;
  }).join(',\n');

  return `// Generated by PORTFOLIO.EXE Editor

const PROJECTS = [
${projectsStr}
];

const SECTIONS = [
  { id: "overview", num: "01", label: "OVERVIEW" },
  { id: "works",    num: "02", label: "WORKS" },
  { id: "about",    num: "03", label: "ABOUT" },
  { id: "skills",   num: "04", label: "SKILLS" },
  { id: "journal",  num: "05", label: "JOURNAL" },
  { id: "contact",  num: "06", label: "CONTACT" },
];

const FILTERS = ${jstr(["ALL", ...tags])};

const PROCESS_STEPS = [
${processStr}
];

const DOC_TABS = [
  { n: "01", label: "CONCEPT" },
  { n: "02", label: "PROCESS" },
  { n: "03", label: "TECHNICAL BREAKDOWN" },
  { n: "04", label: "CHALLENGES" },
  { n: "05", label: "OUTCOME" },
  { n: "06", label: "FUTURE ITERATIONS" },
];

const DOC_CONTENT = {
${docStr}
};

const SKILLS = [
${skillsStr}
];

const JOURNAL = [
${journalStr}
];

const PROFILE = {
  handle: ${jstr(s.profile.handle)},
  role: ${jstr(s.profile.role)},
  location: ${jstr(s.profile.location)},
  status: ${jstr(s.profile.status)},
  joined: ${jstr(s.profile.joined)},
  about: ${jstr(s.profile.about)},
  values: [
${s.profile.values.map(v => `    { label: ${jstr(v.label)}, body: ${jstr(v.body)} }`).join(',\n')}
  ],
  contact: {
    email: ${jstr(s.profile.email)},
    instagram: ${jstr(s.profile.instagram)},
    linkedin: ${jstr(s.profile.linkedin)},
  },
  copyright: ${jstr(s.profile.copyright)},
  banner: ${jstr(s.profile.banner)},
};

const PROJECT_IMAGES = {
${imgStr}
};

Object.assign(window, {
  PROJECTS, SECTIONS, FILTERS, PROCESS_STEPS, DOC_TABS, DOC_CONTENT,
  SKILLS, JOURNAL, PROFILE, PROJECT_IMAGES,
});
`;
}

// ── INIT ──

function initAll() {
  loadProfile();
  renderProjectTabs();
  renderProjectEditor();
  renderSkills();
  renderJournal();
  loadDocs();
  renderProcess();
  loadSettings();
  renderTagsManager();
}

// Boot
loadFromLocalStorage();
initAll();
