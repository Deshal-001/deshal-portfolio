(() => {
"use strict";
const GH = "https://github.com/Deshal-001/";
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================
   Content, taken from the repositories
   ========================================================= */
const I = {
  gem: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"><path d="M3 9.5 7 4.5h10l4 5-9 10.5z"/><path d="M3 9.5h18M7 4.5l2.5 5L12 20M17 4.5l-2.5 5L12 20M9.5 9.5 12 4.5l2.5 5"/></svg>',
  uni: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><path d="m9 14.5 2 2 4-4"/></svg>',
  ev: '<svg viewBox="0 0 24 24" fill="none"><path d="M13.5 2.5 5.5 13.5h6l-1 8 8-11h-6z" fill="#fff" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>',
  fleet: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5"><circle cx="12" cy="5" r="2.6"/><circle cx="5" cy="18" r="2.6"/><circle cx="19" cy="18" r="2.6"/><path d="M10.6 7.2 6.4 15.8M13.4 7.2l4.2 8.6M7.6 18h8.8"/></svg>',
  snake: '<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round"><path d="M17 5.5c-3-2-8-1-8 2.5s9 2.5 9 7-5.5 5.5-10 4" stroke="#fff" stroke-width="2.6"/><circle cx="17.4" cy="5.4" r=".9" fill="#0B2444"/></svg>',
  shuttle: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"><circle cx="7" cy="17" r="3" fill="#fff"/><path d="M9 15 16.5 3.5 20.5 7.5 9 15M11.5 12.5 18.5 5.5M13.5 9 17 12M10.8 7.5 15 11"/></svg>',
  arrow: '<svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true"><path d="M1 6h15m0 0-4.5-4.5M16 6l-4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const P = [
  { id: "uniconnect", name: "UniConnect", c: "#2FE0BE", icon: I.uni, tags: ["mobile", "backend"], year: "2025", role: "Full stack", repo: "UniConnect",
    summary: "Campus events, in one place. Discovery, booking and QR check-in for students, and a full control room for organisers.",
    points: [
      "Flutter app on Clean Architecture and BLoC: filters, tickets, QR check-in, multiple languages.",
      "Angular dashboard for creating events, managing bookings and tracking attendance.",
      "Spring Boot API on PostgreSQL, secured with JWT and role-based access.",
      "Documented security model, Docker images and CI on GitHub Actions."
    ],
    stack: ["Flutter", "BLoC", "Dio + Retrofit", "Angular", "Spring Boot", "JWT", "PostgreSQL", "Docker", "GitHub Actions"],
    layers: [["Flutter app", "Angular admin"], ["Spring Boot API", "JWT filter"], ["PostgreSQL"]],
    caption: "Two clients share one secured REST API." },
  { id: "gemlens", name: "GemLens", c: "#7D97FF", icon: I.gem, tags: ["ai", "mobile"], year: "2023 – 2024", role: "University project", repo: "GemLens",
    summary: "Gemstone identification that shows its reasoning. One photo in; the stone, its colour and the evidence out.",
    points: [
      "Classifier trained on roughly 24,000 gemstone images, exported to ONNX for fast inference.",
      "Flask API serving predictions, class details and image analysis.",
      "LIME overlays mark the regions behind every prediction. No black box.",
      "Dominant colour extracted with k-means clustering.",
      "One Flutter codebase across Android, iOS, web and desktop."
    ],
    stack: ["Python", "TensorFlow / Keras", "ONNX Runtime", "LIME", "scikit-learn", "Flask", "Flutter"],
    layers: [["Flutter app"], ["Flask API"], ["ONNX classifier", "LIME explainer", "K-means colour"]],
    caption: "One upload, three answers: class, explanation and colour." },
  { id: "evion", name: "EVion", c: "#F2A196", icon: I.ev, tags: ["backend"], year: "2026", role: "Backend", repo: "evion-backend",
    summary: "Electric trips without range anxiety. Route, battery forecast, charging stops and an eco-score for every drive.",
    points: [
      "Node.js and Express API on PostgreSQL, with JWT and separate driver and admin roles.",
      "OpenRouteService routing paired with a battery model for eco, normal and aggressive driving.",
      "Charging stops placed exactly where the range runs out.",
      "Eco-score built from energy use, speed and driving style.",
      "Migrated from Java to Node.js with every API route intact. Swagger docs, Jest tests, Docker Compose."
    ],
    stack: ["Node.js", "Express", "Sequelize", "PostgreSQL", "JWT", "OpenRouteService", "Swagger", "Jest", "Docker"],
    layers: [["Client app"], ["Express API", "Auth + roles"], ["Route service", "Battery model", "Eco-score"], ["PostgreSQL", "OpenRouteService"]],
    caption: "Routing data goes in, range and charging advice come out." },
  { id: "fleet", name: "Fleet", c: "#A9B8FF", icon: I.fleet, tags: ["backend"], year: "2026, in progress", role: "Solo", repo: "fleet-management",
    summary: "Fleet management as Spring Cloud microservices, built one recorded decision at a time.",
    points: [
      "Eureka registry: services discover each other, no hardcoded addresses.",
      "A single API gateway in front of every service.",
      "Each architecture choice captured as an ADR, alternatives and migration path included."
    ],
    stack: ["Java", "Spring Boot", "Spring Cloud Gateway", "Eureka", "Maven", "ADRs"],
    layers: [["Flutter app", "Postman"], ["API gateway"], ["Eureka registry"], ["Domain services"]],
    caption: "Clients only ever talk to the gateway." },
  { id: "snakeeyes", name: "Snake Eyes", c: "#A7D676", icon: I.snake, tags: ["ai", "mobile"], year: "2022", role: "Team project", repo: "Snake-Eyes", repo2: "https://github.com/CyberKnights2022/SnakeEyes-Final",
    summary: "A photo becomes a species name, and a species name becomes first aid. Snake identification for Sri Lanka.",
    points: [
      "Machine-learning model identifies the species from the camera or the gallery.",
      "First-aid guidance and a gallery of common local snakes, built in.",
      "University team project, CyberKnights."
    ],
    stack: ["Flutter", "Dart", "Machine learning", "Camera"],
    layers: [["Camera or gallery"], ["Flutter app"], ["Species model"], ["First-aid guide"]],
    caption: "From photo to species to what to do next." },
  { id: "enash", name: "Enash Active", c: "#F4C04E", icon: I.shuttle, tags: ["mobile"], year: "2023", role: "Freelance, solo", repo: "Enash-Active-FE",
    summary: "Badminton courts, booked in seconds. A freelance build for a Sri Lankan sports company, from brief to delivery.",
    points: [
      "Search by city and district, with court availability per venue.",
      "One-off or recurring bookings, confirmation and in-app payment.",
      "Account sign-up with verification."
    ],
    stack: ["Flutter", "Dart", "REST over HTTP"],
    layers: [["Search by city"], ["Stadium + courts"], ["Book or repeat"], ["Pay + confirm"]],
    caption: "The booking flow, in order." }
];

const MORE = [
  { n: "SwiftUI-Weather-App", d: "iOS weather app with hourly and daily forecasts from OpenWeather and a MapKit map of nearby tourist places.", l: "Swift" },
  { n: "Formula1_Championship_Manager", d: "Desktop championship manager with race entry, standings by points or wins, file persistence and unit tests.", l: "Java, Swing" },
  { n: "BookStack-RestAPI", d: "Inventory and order management API for a bookstore, full CRUD.", l: "Spring Boot" },
  { n: "Room-Reservation-API-Springboot", d: "Room reservation CRUD API, containerised with Docker.", l: "Spring Boot" },
  { n: "Student-RestAPI", d: "Student records REST API on PostgreSQL.", l: "Spring Boot" },
  { n: "Tool-to-Sort-ARB-Files", d: "CLI that sorts Flutter localisation (.arb) keys and keeps @@locale on top. Ships as one executable for the team.", l: "Python" },
  { n: "Sr-Lanka-Reisen-zur-Natur", d: "German-language website for a Sri Lanka travel agency.", l: "HTML, CSS" },
  { n: "COVID-19-Vaccination-Center-Program", d: "Desktop app to manage vaccination booths and print receipts.", l: "JavaFX" },
  { n: "React-Movie-App", d: "Movie browsing web app.", l: "React" },
  { n: "Movie-App", d: "Native Android movie app.", l: "Kotlin" },
  { n: "ThreadGroupHierarchyDemo", d: "Demonstration of Java thread groups and their hierarchy.", l: "Java" },
  { n: "Advanced_web_task3", d: "Angular app from the Advanced Web module at Hildesheim.", l: "Angular" }
];

/* =========================================================
   Projects, dialog, repos
   ========================================================= */
$("#specimens").innerHTML = P.map(p => `
  <button class="card" type="button" data-id="${p.id}" data-tags="${p.tags.join(" ")}" style="--c:${p.c}" aria-haspopup="dialog">
    <span class="glyph" aria-hidden="true">${p.icon}</span>
    <h3>${esc(p.name)}</h3>
    <p class="meta">${esc(p.year)}, ${esc(p.role)}</p>
    <p class="sum">${esc(p.summary)}</p>
    <span class="chips">${p.stack.slice(0, 5).map(s => `<span>${esc(s)}</span>`).join("")}</span>
    <span class="open">Open the case study ${I.arrow}</span>
  </button>`).join("");

function diagram(layers, color) {
  const W = 320, rowH = 38, vgap = 28, hgap = 10;
  const H = layers.length * rowH + (layers.length - 1) * vgap;
  let boxes = "", lines = "", rows = [];
  layers.forEach((row, i) => {
    const bw = (W - (row.length - 1) * hgap) / row.length, y = i * (rowH + vgap);
    rows[i] = row.map((n, j) => {
      const x = j * (bw + hgap);
      boxes += `<rect x="${x}" y="${y}" width="${bw}" height="${rowH}" rx="11" fill="rgba(124,247,228,.06)" stroke="rgba(230,241,245,.28)"/>` +
        `<text x="${x + bw / 2}" y="${y + rowH / 2 + 4.5}" text-anchor="middle" font-size="${bw < 100 ? 11.5 : 13}" font-family="Hanken Grotesk, system-ui, sans-serif" fill="#E6F1F5">${esc(n)}</text>`;
      return { cx: x + bw / 2, top: y, bot: y + rowH };
    });
  });
  for (let i = 0; i < rows.length - 1; i++) rows[i].forEach(a => rows[i + 1].forEach(b => {
    const my = (a.bot + b.top) / 2;
    lines += `<path d="M${a.cx} ${a.bot} C${a.cx} ${my} ${b.cx} ${my} ${b.cx} ${b.top}" stroke="${color}" stroke-width="1.4" fill="none" opacity=".7"/>`;
  }));
  return `<svg viewBox="-1 -1 ${W + 2} ${H + 2}" role="img" aria-label="Architecture: ${esc(layers.map(l => l.join(" and ")).join(", then "))}">${lines}${boxes}</svg>`;
}

const dlg = $("#case"), dbody = $("#caseBody");
let lastCard = null;
function openCase(id, card) {
  const p = P.find(x => x.id === id);
  lastCard = card;
  dlg.style.setProperty("--c", p.c);
  dbody.innerHTML = `
    <div class="top"><span class="glyph" aria-hidden="true">${p.icon}</span>
      <div><h3 id="caseTitle">${esc(p.name)}</h3><p class="meta">${esc(p.year)}, ${esc(p.role)}</p></div></div>
    <p class="lead">${esc(p.summary)}</p>
    <div class="cols">
      <div><h4>What I built</h4><ul>${p.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <h4>Stack</h4><div class="chips">${p.stack.map(s => `<span>${esc(s)}</span>`).join("")}</div></div>
      <figure>${diagram(p.layers, p.c)}<figcaption>${esc(p.caption)}</figcaption></figure>
    </div>
    <div class="links">
      <a class="btn lit" href="${GH + p.repo}" target="_blank" rel="noopener">View the code on GitHub</a>
      ${p.repo2 ? `<a class="btn" href="${p.repo2}" target="_blank" rel="noopener">Team repository</a>` : ""}
    </div>`;
  dlg.showModal();
  dbody.scrollTop = 0;
}
$("#specimens").addEventListener("click", e => { const c = e.target.closest(".card"); if (c) openCase(c.dataset.id, c); });
$("#caseClose").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener("close", () => lastCard && lastCard.focus({ preventScroll: true }));

document.querySelector(".filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  const f = b.dataset.f;
  document.querySelectorAll(".filters button").forEach(x => x.setAttribute("aria-pressed", x === b));
  document.querySelectorAll(".card").forEach(c => { c.hidden = !(f === "all" || c.dataset.tags.split(" ").includes(f)); });
  if (typeof relayout === "function") relayout();
});

function renderRepos() {
  $("#repos").innerHTML = MORE.map(r => `<a class="repo" href="${GH + r.n}" target="_blank" rel="noopener">
    <span class="n">${esc(r.n.replace(/[-_]/g, " "))}</span><span class="l">${esc(r.l)}</span>
    <span class="d">${esc(r.d)}${r.stars ? ` ${r.stars} star${r.stars > 1 ? "s" : ""}.` : ""}</span></a>`).join("");
}
renderRepos();
fetch("https://api.github.com/users/Deshal-001").then(r => r.ok ? r.json() : null)
  .then(u => { if (u && u.public_repos) $("#repoCount").textContent = `${u.public_repos} public repositories in total.`; }).catch(() => {});
fetch("https://api.github.com/users/Deshal-001/repos?per_page=100").then(r => r.ok ? r.json() : null)
  .then(list => { if (!Array.isArray(list)) return; list.forEach(g => { const m = MORE.find(x => x.n === g.name); if (m) m.stars = g.stargazers_count; }); renderRepos(); }).catch(() => {});

/* =========================================================
   Jellyfish
   ========================================================= */
const jellyDefs = [
  { left: "5%",  w: 54, c: "#C6A4FF", dur: 30, delay: 2 },
  { left: "31%", w: 40, c: "#7CF7E4", dur: 24, delay: 14 },
  { left: "57%", w: 62, c: "#FF9FD0", dur: 34, delay: 8 },
  { left: "83%", w: 46, c: "#FFB36B", dur: 27, delay: 20 }
];
const jellyDefs2 = [
  { left: "12%", w: 48, c: "#7CF7E4", dur: 28, delay: 6 },
  { left: "40%", w: 58, c: "#C6A4FF", dur: 33, delay: 18 },
  { left: "66%", w: 38, c: "#FFB36B", dur: 23, delay: 1 },
  { left: "90%", w: 52, c: "#FF9FD0", dur: 29, delay: 12 }
];
const jellyHTML = (defs) => defs.map((j, i) => `
  <button type="button" class="jelly" aria-label="Jellyfish" style="left:${j.left};width:${j.w}px;--jc:${j.c};--dur:${j.dur}s;animation-delay:-${j.delay}s">
    <svg viewBox="0 0 100 170">
      <g class="tent" fill="none" stroke="${j.c}" stroke-width="1.4" stroke-linecap="round" opacity=".7">
        <path d="M30 58 C26 90 36 110 28 150"/><path d="M42 60 C40 95 50 115 44 165"/><path d="M58 60 C60 92 52 118 58 160"/><path d="M70 58 C76 88 64 112 72 145"/>
      </g>
      <g class="bell"><path d="M10 58 C10 20 90 20 90 58 C80 54 70 62 60 57 C50 62 40 54 30 60 C22 55 16 60 10 58Z" fill="${j.c}" fill-opacity=".28" stroke="${j.c}" stroke-width="1.5"/>
      <ellipse cx="50" cy="40" rx="18" ry="9" fill="${j.c}" opacity=".35"/></g>
    </svg></button>`).join("");
$("#jellies").innerHTML = jellyHTML(jellyDefs);
$("#jellies2").innerHTML = jellyHTML(jellyDefs2);
const jellies = [...document.querySelectorAll(".jelly")];
const jellyCool = new Map();
document.getElementById("jellies").className = "jellies";
jellies.forEach(j => j.addEventListener("click", () => {
  if (j.classList.contains("party") || j.classList.contains("dark")) return;
  j.classList.remove("flash"); j.classList.add("party"); jellyCool.set(j, performance.now() + 9000);
  if (!reduced) burst(j, 40, true);
  setTimeout(() => { j.classList.remove("party"); j.classList.add("dark"); }, 2600);
  setTimeout(() => { j.classList.remove("dark"); }, 7600);
}));
document.querySelector(".work .wrap").style.cssText = "position:relative;z-index:1";

/* =========================================================
   Depth engine
   ========================================================= */
const stops = [
  [200, [1, 3, 9]], [600, [1, 5, 16]], [1100, [2, 9, 26]], [1700, [3, 13, 36]], [2400, [3, 12, 32]], [3200, [1, 5, 14]]
];
function colorAt(d) {
  for (let i = 0; i < stops.length - 1; i++) {
    const [d0, c0] = stops[i], [d1, c1] = stops[i + 1];
    if (d >= d0 && d <= d1) { const t = (d - d0) / (d1 - d0); return c0.map((v, k) => Math.round(v + (c1[k] - v) * t)); }
  }
  return d < stops[0][0] ? stops[0][1] : stops[stops.length - 1][1];
}
const sections = [...document.querySelectorAll("section[data-depth]")];
let anchors = [], maxScroll = 1;
function measure() {
  maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  anchors = sections.map(s => ({ y: Math.min(s.offsetTop, maxScroll), d: +s.dataset.depth, fg: s.dataset.fg, el: s }));
  anchors[0].y = 0;
  anchors.push({ y: maxScroll, d: 3200, fg: "light" });
}
function depthAt(y) {
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i], b = anchors[i + 1];
    if (y >= a.y && y <= b.y) return b.y === a.y ? b.d : a.d + (b.d - a.d) * ((y - a.y) / (b.y - a.y));
  }
  return y <= 0 ? anchors[0].d : 3200;
}

const ocean = $("#ocean"), rays = $("#rays"), lure = $("#lure"), gauge = $("#gauge"), nav = $("#nav");
const dEl = $("#depth"), tEl = $("#temp"), zEl = $("#zname"), sub = $("#sub");
const ticks = $("#ticks");
for (let m = 0; m <= 3200; m += 100) ticks.insertAdjacentHTML("beforeend", `<span class="${m % 500 ? "minor" : ""}" style="top:${m / 32}%"></span>`);
let depth = 200, lastShown = -1;

var onScroll = function () {
  depth = depthAt(scrollY);
  const [r, g, b] = colorAt(depth);
  ocean.style.background = `rgb(${r},${g},${b})`;
  document.querySelector('meta[name="theme-color"]').content = `rgb(${r},${g},${b})`;
  rays.style.opacity = "0";
  const shown = Math.round(depth);
  if (shown !== lastShown) {
    lastShown = shown;
    dEl.textContent = shown.toLocaleString("en-GB");
    tEl.textContent = `${Math.round(2 + 10 * clamp((3200 - depth) / 3000, 0, 1))} °C`;
    zEl.textContent = depth < 1000 ? "Twilight zone" : depth < 3000 ? "Midnight zone" : "Seabed";
    sub.style.top = `${depth / 32}%`;
  }
  // which section sits under the middle of the screen decides the text colour of fixed chrome
  const mid = scrollY + innerHeight * 0.5;
  let fg = "light";
  for (const a of anchors) if (a.el && a.y <= mid) fg = a.fg;
  const navy = "#052036";
  gauge.style.setProperty("--fg", fg === "dark" ? navy : "#E6F1F5");
  nav.style.setProperty("--fg", fg === "dark" ? navy : "#E6F1F5");
  nav.style.setProperty("--navbg", `rgba(${r},${g},${b},.85)`);
  nav.classList.toggle("solid", scrollY > 40);
}
/* sideways scroll: vertical scrolling moves projects and experience horizontally */
const hsSecs = [...document.querySelectorAll(".hs")];
const hsMode = () => innerWidth > 760 && !reduced;
function layoutHS() {
  hsSecs.forEach(sec => {
    const track = sec.querySelector(".hs-track");
    if (!hsMode()) { sec.style.height = ""; track.style.transform = ""; sec._dist = 0; return; }
    const lead = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    let right = 0;
    [...track.children].forEach(c => { if (!c.hidden && c.offsetWidth) right = Math.max(right, c.offsetLeft + c.offsetWidth); });
    sec._dist = Math.max(0, right + lead - innerWidth);
    sec.style.height = `${innerHeight + sec._dist}px`;
  });
}
function updateHS() {
  if (!hsMode()) return;
  hsSecs.forEach(sec => {
    const p = clamp((scrollY - sec.offsetTop) / Math.max(1, sec.offsetHeight - innerHeight), 0, 1);
    sec.querySelector(".hs-track").style.transform = `translate3d(${(-p * sec._dist).toFixed(1)}px,0,0)`;
    const bar = sec.querySelector(".hs-bar span"); if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
  });
}
hsSecs.forEach(sec => sec.querySelector(".hs-track").addEventListener("focusin", e => {
  if (!hsMode() || !sec._dist) return;
  const item = [...sec.querySelector(".hs-track").children].find(c => c.contains(e.target)); if (!item) return;
  const lead = parseFloat(getComputedStyle(item.parentElement).paddingLeft) || 0;
  const p = clamp((item.offsetLeft - lead) / sec._dist, 0, 1);
  scrollTo({ top: sec.offsetTop + p * (sec.offsetHeight - innerHeight), behavior: "auto" });
}));
const relayout = () => { layoutHS(); measure(); onScroll(); };
const _onScroll = onScroll;
onScroll = () => { _onScroll(); updateHS(); };
relayout();
addEventListener("scroll", () => onScroll(), { passive: true });
addEventListener("resize", () => { relayout(); sizeCanvas(); });
if (document.fonts) document.fonts.ready.then(relayout);
addEventListener("load", relayout);

/* =========================================================
   Light, particles, bubbles, sonar, fish
   ========================================================= */
const cv = $("#sea"), cx = cv.getContext("2d");
let W = 0, H = 0, DPR = 1;
function sizeCanvas() { DPR = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * DPR; cv.height = H * DPR; cx.setTransform(DPR, 0, 0, DPR, 0, 0); }
sizeCanvas();

const rnd = (a, b) => a + Math.random() * (b - a);
const snow = Array.from({ length: Math.round(clamp(W * H / 8500, 70, 220)) }, () => ({ x: rnd(0, W), y: rnd(0, H), z: rnd(.25, 1), ph: rnd(0, 6.28) }));
const bubbles = [], sparks = [], pings = [];
const fish = Array.from({ length: 34 }, (_, i) => ({ x: rnd(0, W), y: rnd(H * .3, H * .9), vx: rnd(-1, 1), vy: rnd(-.3, .3), c: i % 3 }));

const pointer = { x: W * .3, y: H * .45, tx: W * .3, ty: H * .45, active: false, last: 0 };
addEventListener("pointermove", e => {
  const dx = e.clientX - pointer.tx, dy = e.clientY - pointer.ty;
  pointer.tx = e.clientX; pointer.ty = e.clientY; pointer.active = true; pointer.last = performance.now();
  if (Math.hypot(dx, dy) > 14 && sparks.length < 90) {
    for (let i = 0; i < 2; i++) sparks.push({ x: e.clientX + rnd(-18, 18), y: e.clientY + rnd(-18, 18), life: 1, c: Math.random() < .3 ? "198,164,255" : "124,247,228", r: rnd(1, 2.4) });
  }
}, { passive: true });
addEventListener("pointerdown", e => {
  if (e.target.closest("a,button,dialog,input")) return;
  pings.push({ x: e.clientX, y: e.clientY, r: 0 });
});
let lastScroll = scrollY;

function newBubble(x, y, burst) { return { x: x ?? rnd(0, W), y: y ?? H + 10, r: burst ? rnd(1.5, 4) : rnd(1, 5), v: rnd(.5, 1.4), ph: rnd(0, 6.28) }; }

const name = $("#name"), hero = $("#top"), seabed = $("#contact");
let t0 = performance.now();

function frame(now) {
  const dt = Math.min(50, now - t0) / 16.67; t0 = now;
  const scrollDelta = scrollY - lastScroll; lastScroll = scrollY;
  const lit = seabed.classList.contains("lit");
  const deep = lit && depth > 2800 ? .35 : 1;          // the light you carry; dimmer once the pearl lights the seabed
  const shallow = 0;

  // idle lure wanders on its own so touch users still see the light
  if (!pointer.active || now - pointer.last > 4000) {
    const k = now / 1000;
    pointer.tx = W * (.5 + .32 * Math.sin(k * .37)); pointer.ty = H * (.42 + .2 * Math.sin(k * .53 + 1));
  }
  pointer.x += (pointer.tx - pointer.x) * .12 * dt; pointer.y += (pointer.ty - pointer.y) * .12 * dt;
  lure.style.transform = `translate(${pointer.x}px,${pointer.y}px)`;
  lure.style.opacity = deep.toFixed(3);

  // the lit copy of the name follows the light
  const nr = name.getBoundingClientRect();
  if (nr.bottom > 0) { name.style.setProperty("--mx", `${pointer.x - nr.left + 60}px`); name.style.setProperty("--my", `${pointer.y - nr.top + 60}px`); }

  cx.clearRect(0, 0, W, H);

  // marine snow
  const snowA = .15 + .85 * deep;
  for (const p of snow) {
    p.y += (.12 * p.z) * dt - scrollDelta * .35 * p.z;
    p.x += Math.sin(now / 2400 + p.ph) * .12 * p.z * dt;
    if (p.y > H + 4) { p.y = -4; p.x = rnd(0, W); } else if (p.y < -4) { p.y = H + 4; p.x = rnd(0, W); }
    const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
    let glow = d < 200 ? (1 - d / 200) * deep : 0;
    for (const g of pings) { const band = Math.abs(Math.hypot(p.x - g.x, p.y - g.y) - g.r); if (band < 26) glow = Math.max(glow, (1 - band / 26) * (1 - g.r / 520)); }
    const a = (.08 + .3 * p.z) * snowA + glow * .9;
    const r = (.6 + p.z * 1.1) * (1 + glow * 1.2);
    cx.fillStyle = glow > .05 ? `rgba(124,247,228,${a})` : `rgba(210,230,240,${a})`;
    cx.beginPath(); cx.arc(p.x, p.y, r, 0, 6.283); cx.fill();
    if (glow > .35) { cx.fillStyle = `rgba(124,247,228,${glow * .12})`; cx.beginPath(); cx.arc(p.x, p.y, r * 5, 0, 6.283); cx.fill(); }
  }

  // sonar pings
  for (let i = pings.length - 1; i >= 0; i--) {
    const g = pings[i]; g.r += 7 * dt;
    const a = (1 - g.r / 520) * .55;
    if (a <= 0) { pings.splice(i, 1); continue; }
    cx.strokeStyle = `rgba(124,247,228,${a})`; cx.lineWidth = 1.2;
    cx.beginPath(); cx.arc(g.x, g.y, g.r, 0, 6.283); cx.stroke();
    cx.strokeStyle = `rgba(124,247,228,${a * .4})`;
    cx.beginPath(); cx.arc(g.x, g.y, g.r * .7, 0, 6.283); cx.stroke();
  }

  // bioluminescent sparks
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i]; s.life -= (s.decay || .022) * dt; s.x += (s.vx || 0) * dt; s.y += ((s.vy || 0) - .2) * dt; if (s.vx) { s.vx *= .97; s.vy *= .97; }
    if (s.life <= 0) { sparks.splice(i, 1); continue; }
    cx.fillStyle = `rgba(${s.c},${s.life * .9})`; cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.283); cx.fill();
    cx.fillStyle = `rgba(${s.c},${s.life * .15})`; cx.beginPath(); cx.arc(s.x, s.y, s.r * 6, 0, 6.283); cx.fill();
  }

  // rising bubbles, more of them near the surface
  const want = 6;
  if (bubbles.length < want && Math.random() < .25) bubbles.push(newBubble());
  for (let i = bubbles.length - 1; i >= 0; i--) {
    const b = bubbles[i]; b.y -= (b.v + b.r * .12) * dt + scrollDelta * .25; b.x += Math.sin(now / 400 + b.ph) * .35 * dt;
    if (b.y < -10) { bubbles.splice(i, 1); continue; }
    cx.strokeStyle = "rgba(180,220,235,.22)"; cx.lineWidth = 1;
    cx.beginPath(); cx.arc(b.x, b.y, b.r, 0, 6.283); cx.stroke();
    cx.fillStyle = "rgba(220,240,250,.3)"; cx.beginPath(); cx.arc(b.x - b.r * .35, b.y - b.r * .35, b.r * .28, 0, 6.283); cx.fill();
  }

  // a school of fish in the sunlit water, scattering from the cursor
  const fa = clamp((depth - 2450) / 350, 0, 1);
  if (fa > 0) {
    let mx = 0, my = 0; for (const f of fish) { mx += f.x; my += f.y; } mx /= fish.length; my /= fish.length;
    const goalX = W * (.5 + .34 * Math.sin(now / 9000)), goalY = H * (.42 + .16 * Math.sin(now / 6000));
    cx.shadowColor = "rgba(124,247,228,.9)"; cx.shadowBlur = 10;
    for (const f of fish) {
      let ax = (goalX - f.x) * .00025 + (mx - f.x) * .0006, ay = (goalY - f.y) * .00025 + (my - f.y) * .0006;
      for (const o of fish) { if (o === f) continue; const dx = f.x - o.x, dy = f.y - o.y, d2 = dx * dx + dy * dy; if (d2 < 400 && d2 > 0) { ax += dx / d2 * .6; ay += dy / d2 * .6; } }
      const pd = Math.hypot(f.x - pointer.x, f.y - pointer.y);
      if (pd < 140 && pointer.active) { ax += (f.x - pointer.x) / pd * .5; ay += (f.y - pointer.y) / pd * .5; }
      f.vx += ax * dt; f.vy += ay * dt;
      const sp = Math.hypot(f.vx, f.vy), max = pd < 140 ? 5 : 2.2;
      if (sp > max) { f.vx *= max / sp; f.vy *= max / sp; }
      f.x += f.vx * dt; f.y += f.vy * dt;
      const ang = Math.atan2(f.vy, f.vx);
      cx.fillStyle = f.c === 1 ? `rgba(198,164,255,${.85 * fa})` : f.c === 2 ? `rgba(255,190,220,${.8 * fa})` : `rgba(124,247,228,${.85 * fa})`;
      cx.save(); cx.translate(f.x, f.y); cx.rotate(ang);
      cx.beginPath(); cx.ellipse(0, 0, 7, 2.6, 0, 0, 6.283); cx.fill();
      cx.beginPath(); cx.moveTo(-6, 0); cx.lineTo(-11, -3.2); cx.lineTo(-11, 3.2); cx.closePath(); cx.fill();
      cx.restore();
    }
    cx.shadowBlur = 0;
  }

  // jellyfish flare when the light comes close
  if (deep > .2) for (const j of jellies) {
    if (j.classList.contains("party") || j.classList.contains("dark")) continue;
    const r = j.getBoundingClientRect(); if (r.bottom < 0 || r.top > H) continue;
    if (Math.hypot(r.left + r.width / 2 - pointer.x, r.top + r.height / 3 - pointer.y) < 110 && !(jellyCool.get(j) > now)) {
      j.classList.remove("flash"); void j.offsetWidth; j.classList.add("flash"); jellyCool.set(j, now + 1500);
    }
  }

  requestAnimationFrame(frame);
}

function staticScene() {
  cx.clearRect(0, 0, W, H);
  for (const p of snow) { cx.fillStyle = `rgba(210,230,240,${.1 + .25 * p.z})`; cx.beginPath(); cx.arc(p.x, p.y, .6 + p.z, 0, 6.283); cx.fill(); }
  lure.style.display = "none";
}
if (reduced) staticScene(); else requestAnimationFrame(frame);

/* =========================================================
   The seabed: pearls and the oyster
   ========================================================= */
function burst(el, n, warm) {
  const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  for (let i = 0; i < n; i++) {
    const a = rnd(0, 6.283), v = rnd(1, warm ? 6 : 3.5);
    sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (warm ? 1.2 : .5), life: 1, decay: rnd(.008, .018), r: rnd(1, 2.8),
      c: warm ? (Math.random() < .5 ? "255,240,214" : Math.random() < .5 ? "255,205,232" : "159,255,240") : "230,220,255" });
  }
  if (warm) for (let i = 0; i < 14; i++) bubbles.push(newBubble(x + rnd(-40, 40), y + rnd(-10, 10), true));
}
const oyster = $("#oyster"), found = $("#found");
oyster.addEventListener("click", () => {
  const open = !oyster.classList.contains("open");
  oyster.classList.toggle("open", open);
  oyster.setAttribute("aria-pressed", open);
  oyster.setAttribute("aria-label", open ? "Close the oyster" : "Open the oyster");
  seabed.classList.toggle("lit", open);
  if (open) {
    found.innerHTML = '<b>You found the pearl</b>Now let\'s talk: <a href="mailto:kavindudeshal2@gmail.com">kavindudeshal2@gmail.com</a>';
    found.classList.add("show");
    if (!reduced) setTimeout(() => burst(oyster, 120, true), 350);
  } else found.classList.remove("show");
});
const pearls = [...document.querySelectorAll(".pearl")];
pearls.forEach(p => p.addEventListener("click", () => {
  p.classList.add("found");
  if (!reduced) burst(p, 34, false);
  const n = pearls.filter(x => x.classList.contains("found")).length;
  say(n === pearls.length ? "All six pearls found. Open the oyster for the big one." : `Pearl ${n} of ${pearls.length}`);
}));

/* =========================================================
   Small things
   ========================================================= */
const ready = () => hero.classList.add("ready");
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(ready, 150));
setTimeout(ready, 1500);

$("#yr").textContent = new Date().getFullYear();
const tick = () => { $("#clock").textContent = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit" }).format(new Date()); };
tick(); setInterval(tick, 30000);

const toast = $("#toast");
function say(t) { toast.textContent = t; toast.classList.add("show"); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove("show"), 2400); }
$("#copyEmail").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText("kavindudeshal2@gmail.com"); say("Email copied"); }
  catch (e) { say("Copy didn't work. The address is kavindudeshal2@gmail.com"); }
});
})();
