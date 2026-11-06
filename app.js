if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash) history.replaceState(null, "", location.pathname + location.search);
window.scrollTo(0, 0);
addEventListener("load", () => window.scrollTo(0, 0));

(() => {
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const reduced = false;   // full motion for everyone, as chosen
if (reduced) document.documentElement.classList.add("rm");
const GH = "https://github.com/Deshal-001/";

/* ================= content ================= */
const P = [
  { name: "Ankomm", c: "#7DF0FF", year: "2026", role: "Solo, live", live: "https://ankomm.vercel.app",
    summary: "Arrival in Germany, sorted. A personalised checklist for international students, from Anmeldung to the first bank account.",
    points: ["Onboarding builds a checklist from city, university and situation, with task dependencies and progress tracking.", "Official links, city-specific guidance, document references, reminders and account data export.", "NestJS API on PostgreSQL with Prisma, JWT auth, rate limiting and Swagger docs.", "Next.js and TypeScript front end, deployed on Vercel with Docker and Jest behind the backend."],
    stack: ["Next.js", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "JWT", "Swagger", "Docker", "Vercel"] },
  { name: "UniConnect", c: "#5CF2C8", year: "2025", role: "Full stack", repo: "UniConnect",
    summary: "Campus events, in one place. Discovery, booking and QR check-in for students, and a full control room for organisers.",
    points: ["Flutter app on Clean Architecture and BLoC: filters, tickets, QR check-in, multiple languages.", "Angular dashboard for creating events, managing bookings and tracking attendance.", "Spring Boot API on PostgreSQL, secured with JWT and role-based access.", "Documented security model, Docker images and CI on GitHub Actions."],
    stack: ["Flutter", "BLoC", "Dio + Retrofit", "Angular", "Spring Boot", "JWT", "PostgreSQL", "Docker", "GitHub Actions"] },
  { name: "GemLens", c: "#93A6FF", year: "2023 – 2024", role: "University project", repo: "GemLens",
    summary: "Gemstone identification that shows its reasoning. One photo in; the stone, its colour and the evidence out.",
    points: ["Classifier trained on roughly 24,000 gemstone images, exported to ONNX for fast inference.", "Flask API serving predictions, class details and image analysis.", "LIME overlays mark the regions behind every prediction. No black box.", "Dominant colour extracted with k-means clustering.", "One Flutter codebase across Android, iOS, web and desktop."],
    stack: ["Python", "TensorFlow / Keras", "ONNX Runtime", "LIME", "scikit-learn", "Flask", "Flutter"] },
  { name: "EVion", c: "#FFA897", year: "2026", role: "Backend", repo: "evion-backend",
    summary: "Electric trips without range anxiety. Route, battery forecast, charging stops and an eco-score for every drive.",
    points: ["Node.js and Express API on PostgreSQL, with JWT and separate driver and admin roles.", "OpenRouteService routing paired with a battery model for eco, normal and aggressive driving.", "Charging stops placed exactly where the range runs out.", "Eco-score built from energy use, speed and driving style.", "Migrated from Java to Node.js with every API route intact. Swagger docs, Jest tests, Docker Compose."],
    stack: ["Node.js", "Express", "Sequelize", "PostgreSQL", "JWT", "OpenRouteService", "Swagger", "Jest", "Docker"] },
  { name: "Fleet", c: "#C3CCFF", year: "2026, in progress", role: "Solo", repo: "fleet-management",
    summary: "Fleet management as Spring Cloud microservices, built one recorded decision at a time.",
    points: ["Eureka registry: services discover each other, no hardcoded addresses.", "A single API gateway in front of every service.", "Each architecture choice captured as an ADR, alternatives and migration path included."],
    stack: ["Java", "Spring Boot", "Spring Cloud Gateway", "Eureka", "Maven", "ADRs"] },
  { name: "Snake Eyes", c: "#B9E68A", year: "2022", role: "Team project", repo: "Snake-Eyes", repo2: "https://github.com/CyberKnights2022/SnakeEyes-Final",
    summary: "A photo becomes a species name, and a species name becomes first aid. Snake identification for Sri Lanka.",
    points: ["Machine-learning model identifies the species from the camera or the gallery.", "First-aid guidance and a gallery of common local snakes, built in.", "University team project, CyberKnights."],
    stack: ["Flutter", "Dart", "Machine learning", "Camera"] }
];
const MORE = [
  ["SwiftUI-Weather-App", "iOS weather app with hourly and daily forecasts and a MapKit map of nearby places.", "Swift"],
  ["Formula1_Championship_Manager", "Championship manager with race entry, standings, file persistence and unit tests.", "Java, Swing"],
  ["BookStack-RestAPI", "Inventory and order management API for a bookstore.", "Spring Boot"],
  ["Room-Reservation-API-Springboot", "Room reservation API, containerised with Docker.", "Spring Boot"],
  ["Student-RestAPI", "Student records REST API on PostgreSQL.", "Spring Boot"],
  ["Tool-to-Sort-ARB-Files", "CLI that sorts Flutter localisation keys. One executable for the team.", "Python"],
  ["Sr-Lanka-Reisen-zur-Natur", "German-language website for a Sri Lanka travel agency.", "HTML, CSS"],
  ["COVID-19-Vaccination-Center-Program", "Manages vaccination booths and prints receipts.", "JavaFX"],
  ["React-Movie-App", "Movie browsing web app.", "React"],
  ["Movie-App", "Native Android movie app.", "Kotlin"],
  ["ThreadGroupHierarchyDemo", "Java thread groups and their hierarchy.", "Java"],
  ["Advanced_web_task3", "Angular app from the Advanced Web module at Hildesheim.", "Angular"]
];
const LIFE = [
  ["2020", "Roots", "Holy Cross College, Kalutara", "A/Ls in Physics, Combined Maths and IT. Where it all started."],
  ["2021", "Start", "Into software engineering", "BEng in Software Engineering, and the habit of building things just to see if I could."],
  ["2022", "Work", "First job, IFS Colombo", "A year supporting IFS customers worldwide. How enterprise software really runs."],
  ["2024", "Degree", "First Class Honours", "BEng Software Engineering, University of Westminster at IIT. GemLens was born here."],
  ["2024", "Work", "Software Engineer, Irusri Group", "Internship in Sweden (remote), then full-time. Mobile apps from first plan to the stores."],
  ["2025", "Venture / Jan", "Co-founded Siggi's Ceylon", "A travel company showing people the real Sri Lanka. Brand and partners."],
  ["2025", "Move / Apr", "New country, new chapter", "From Sri Lanka to Germany for an MSc in Software Engineering at Hildesheim."],
  ["2025", "Work / Nov", "Fullstack-Entwickler, Comitec IT Systems", "Flutter, Node.js and CI/CD for a German IT company, alongside the master's.", "now"],
  ["2026", "Build", "Ankomm goes live", "A guide for international students arriving in Germany. The one I wished I had."],
  ["2026", "Sport", "Best ODI bowler, Niedersachsen", "The season it all clicked. Best ODI bowler in Lower Saxony.", "g"]
];
LIFE.reverse(); // latest first
/* LinkedIn recommendations: [text, name, role]. The section stays hidden while this is empty. */
const RECS = [];
const F = {
  mobile: { title: "A mobile app people keep on their home screen", desc: "One Flutter codebase for iOS and Android, from the first sketch to the store release.", get: ["Clickable prototype in the first week", "Clean Architecture, easy to extend", "Push, maps, payments, offline", "Store release and updates"], stack: ["Flutter", "Dart", "BLoC", "Firebase", "REST"] },
  web: { title: "A web platform that feels instant", desc: "Booking systems, dashboards, portals or a product site. Modern front end, solid API, deployed and live.", get: ["Responsive on every screen", "Auth, roles and admin panel", "SEO-ready and fast", "CI/CD from day one"], stack: ["Next.js", "React", "Angular", "TypeScript", "Vercel"] },
  api: { title: "The engine behind your product", desc: "Secure, documented APIs and databases your apps can rely on. Built to scale and easy to read.", get: ["REST APIs with Swagger docs", "JWT auth and role-based access", "PostgreSQL schema and migrations", "Docker, tests and CI/CD"], stack: ["Spring Boot", "Node.js", "NestJS", "PostgreSQL", "Docker"] },
  ai: { title: "AI that shows its reasoning", desc: "Image recognition, smart search or automation inside your product. Models that explain their answers.", get: ["Prototype on your own data", "Model trained and evaluated", "Explanations users can trust", "Shipped inside your app"], stack: ["Python", "TensorFlow", "ONNX", "LIME", "Flask"] },
  new: { title: "Something that doesn't exist yet", desc: "A wild idea, a side project, a tool nobody has made. Prototype it fast and find out together.", get: ["Idea shaped into a plan", "Fast proof of concept", "Honest feedback on what works", "A partner who's curious too"], stack: ["Whatever fits", "Fast prototypes", "Curiosity"] }
};

/* ================= render ================= */
$$("[data-chars]").forEach(el => {
  el.innerHTML = [...el.textContent].map((ch, i) => `<span class="c" style="--i:${i}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
});

$("#projects").innerHTML = P.map((p, i) => `<article class="card pc" style="--i:${i}"><div class="card-in">
  <p class="pc-top"><b>${String(i + 1).padStart(2, "0")} / ${String(P.length).padStart(2, "0")}</b><span>${esc(p.year)} / ${esc(p.role)}</span></p>
  <h3 class="pc-name">${esc(p.name)}</h3>
  <div class="pc-body">
    <p class="pc-sum">${esc(p.summary)}</p>
    <p class="pc-stack">${p.stack.slice(0, 6).map(esc).join(" / ")}</p>
    <div class="pc-act"><button type="button" class="btn o" data-i="${i}" data-c="Open">Open project</button>${p.live ? `<a class="btn" href="${p.live}" target="_blank" rel="noopener" data-c="Visit">Live site</a>` : ""}${p.repo ? `<a class="btn" href="${GH + p.repo}" target="_blank" rel="noopener" data-c="Code">GitHub</a>` : ""}</div>
  </div>
  <p class="pc-big" aria-hidden="true">${String(i + 1).padStart(2, "0")}</p>
</div></article>`).join("");

const GROUPS = [
  ["APIs", ["BookStack-RestAPI", "Room-Reservation-API-Springboot", "Student-RestAPI"]],
  ["Web", ["React-Movie-App", "Advanced_web_task3", "Sr-Lanka-Reisen-zur-Natur"]],
  ["Desktop", ["Formula1_Championship_Manager", "COVID-19-Vaccination-Center-Program", "ThreadGroupHierarchyDemo"]],
  ["Apps", ["SwiftUI-Weather-App", "Movie-App", "Tool-to-Sort-ARB-Files"]]
];
const byName = Object.fromEntries(MORE.map(m => [m[0], m]));
$("#fxTabs").innerHTML = GROUPS.map(([g, names], i) => `<li${i ? "" : ' class="on"'}><button type="button" data-g="${i}" data-c="Show">${g}<small>${String(names.length).padStart(2, "0")}</small></button></li>`).join("");
$("#repos").innerHTML = GROUPS.map(([g, names], i) => `<div class="pane${i ? "" : " on"}"><p class="pane-h"><span>${g}</span><span>${String(i + 1).padStart(2, "0")} / ${String(GROUPS.length).padStart(2, "0")}</span></p>${names.map((n, k) => { const [, d, l] = byName[n]; return `<a class="repo" style="--k:${k}" href="${GH + n}" target="_blank" rel="noopener" data-c="Code"><b>${esc(n.replace(/[-_]+/g, " "))}</b><em>${esc(l)}</em><span>${esc(d)}</span></a>`; }).join("")}</div>`).join("");
$("#repoCount").textContent = MORE.length;

$("#life").innerHTML = LIFE.map(e => `<article class="ev ${e[4] || ""}">
  <span class="y">${e[0]}</span><i class="dot"></i><div class="body"><span class="k">${esc(e[1])}</span><h3>${esc(e[2])}</h3><p>${esc(e[3])}</p></div></article>`).join("");

if (RECS.length) {
  $("#recs").hidden = false;
  $("#recList").innerHTML = RECS.map(([t, n, r]) => `<article class="rec rise"><blockquote>${esc(t)}</blockquote><footer><b>${esc(n)}</b><span>${esc(r)}</span></footer></article>`).join("");
}

/* project sheet */
const sheet = $("#sheet");
function openSheet(i) {
  const p = P[i];
  $("#shMeta").innerHTML = `<span>${esc(p.year)}</span><span>${esc(p.role)}</span>`;
  $("#shName").textContent = p.name;
  $("#shSum").textContent = p.summary;
  $("#shPts").innerHTML = p.points.map(x => `<li>${esc(x)}</li>`).join("");
  $("#shStack").textContent = p.stack.join(" / ");
  $("#shLinks").innerHTML = (p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Open the live site</a>` : "") +
    (p.repo ? `<a href="${GH + p.repo}" target="_blank" rel="noopener">Code on GitHub</a>` : "") +
    (p.repo2 ? `<a href="${p.repo2}" target="_blank" rel="noopener">Team repository</a>` : "");
  sheet.scrollTop = 0;
  sheet.showModal ? sheet.showModal() : sheet.setAttribute("open", "");
  if (lenis) lenis.stop();
  document.body.style.overflow = "hidden";
}
sheet.addEventListener("close", () => { document.body.style.overflow = ""; if (lenis) lenis.start(); });
$("#projects").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) openSheet(+b.dataset.i); });
$("#shClose").addEventListener("click", () => sheet.close ? sheet.close() : sheet.removeAttribute("open"));

/* ================= fit text ================= */
function fitEmail() {
  // the footer email always fits on one line, at any screen width
  const e = $(".f-email"); if (!e) return;
  const box = e.parentNode, cs = getComputedStyle(box);
  const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - (innerWidth < 821 ? 0 : $(".f-copy").offsetWidth + 32);
  e.style.fontSize = "100px";
  const w = e.scrollWidth;
  e.style.fontSize = Math.min(64, Math.floor(100 * avail / w * .97)) + "px";
}
function fit() {
  fitEmail();
  $$(".fit").forEach(el => {
    const box = el.closest(".hname, .pword, .fname");
    const cs = getComputedStyle(box);
    let target = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (box.classList.contains("hname")) target *= innerWidth > 820 ? .7 : .9;   // the name: big, not wall-to-wall
    if (box.classList.contains("pword") && innerWidth > 820) target *= .72;
    if (box.classList.contains("fname") && innerWidth > 820) target *= .8;
    el.style.fontSize = "100px";
    el.style.fontSize = (100 * target / el.getBoundingClientRect().width * (box.classList.contains("hname") ? .995 : .97)) + "px";
  });
}

/* ================= reveal once ================= */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
$$(".disc li, .f-grid a").forEach(el => el.style.setProperty("--i", [...el.parentNode.children].indexOf(el)));
$$(".rise").forEach(el => reduced ? el.classList.add("in") : io.observe(el));
const io2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io2.unobserve(e.target); } }), { rootMargin: "0px 0px -28% 0px", threshold: 0 });
$$(".reveal").forEach(el => reduced ? el.classList.add("in") : io2.observe(el));

/* KH messages: arrive like a chat, typing then words */
const says = $$(".say");
says.forEach(el => { const sp = el.querySelector("span"); el.dataset.text = sp.textContent; if (!reduced) sp.innerHTML = '<span class="dots"><b></b><b></b><b></b></span>'; });
function sayPlay(el) {
  const sp = el.querySelector("span"), text = el.dataset.text;
  el.classList.add("in");
  setTimeout(() => {
    let i = 0;
    sp.textContent = "";
    const tick = () => {
      i = Math.min(text.length, i + 2);
      sp.innerHTML = esc(text.slice(0, i)) + (i < text.length ? '<span class="caret"></span>' : "");
      if (i < text.length) setTimeout(tick, 22);
    };
    tick();
  }, 900);
}
const io3 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io3.unobserve(e.target); sayPlay(e.target); } }), { rootMargin: "0px 0px -22% 0px" });
says.forEach(el => reduced ? el.classList.add("in") : io3.observe(el));
/* the quote, one word at a time (keeps the orange "is nothing.") */
const qp = $("#quote p");
qp.innerHTML = [...qp.childNodes].map(n => {
  const inner = n.textContent.trim().split(/\s+/).filter(Boolean).map(w => `<span class="w">${esc(w)}</span>`).join(" ");
  return n.nodeType === 3 ? inner : `<span>${inner}</span>`;
}).join(" ");
const qWords = $$("#quote .w");

/* ================= scroll: only the name screen moves ================= */
const hero = $("#top"), r1 = $(".hname .r1"), r2 = $(".hname .r2"), heroMid = $("#heroMid"), prog = $("#prog");
/* every section knows its own place on the page; measured once, not on every frame */
const L = {};
const docTop = el => { let y = 0; for (let n = el; n; n = n.offsetParent) y += n.offsetTop; return y; };
const stacks = $$(".stack").map(st => ({ st, cards: [...st.querySelectorAll(".card")] }));
function measure() {
  const vh = innerHeight;
  L.vh = vh;
  stacks.forEach(S => {
    S.top = docTop(S.st); S.bottom = S.top + S.st.offsetHeight;
    S.sticky = S.cards.map(c => parseFloat(getComputedStyle(c).top));
    S.natural = S.cards.map(c => { const t = c.style.transform; c.style.transform = ""; const y = docTop(c); c.style.transform = t; return y; });
  });
  [["hero", hero], ["tl", tl], ["finds", finds], ["wr", wr], ["work", $("#work")]].forEach(([k, el]) => { L[k] = { top: docTop(el), h: el.offsetHeight }; });
  L.extra = Math.max(0, track.scrollWidth - innerWidth);
  L.evLeft = tlCards.map(c => c.offsetLeft);
  L.max = document.documentElement.scrollHeight - vh;
  const fxp = $("#repos");
  if (fxp && !reduced) { fxp.style.minHeight = Math.max(...$$("#repos .pane").map(p => p.offsetHeight)) + "px"; }
}
const near = (k, y) => y + L.vh > L[k].top - 200 && y < L[k].top + L[k].h + 200;
const pin = (k, y) => clamp((y - L[k].top) / Math.max(1, L[k].h - L.vh));

function stackFx(y) {
  stacks.forEach(S => {
    if (y + L.vh < S.top || y > S.bottom) return;
    const n = S.cards.length;
    const prog = S.cards.map((c, j) => clamp(1 - (S.natural[j] - y - S.sticky[j]) / (L.vh * .7)));
    S.cards.forEach((c, i) => {
      let s = 0;
      for (let j = i + 1; j < n && j <= i + 3; j++) s += prog[j];
      c.style.transform = s ? `scale(${(1 - s * .045).toFixed(4)})` : "";
      c.style.setProperty("--dark", Math.min(.6, s * .22).toFixed(3));
    });
  });
}
/* timeline: vertical scroll drives a sideways track */
const tl = $("#timeline"), track = $("#life"), tlBar = $("#tlBar"), tlNow = $("#tlNow"), tlCards = [...track.children];
function tlSize() {
  if (reduced) return;
  const extra = Math.max(0, track.scrollWidth - innerWidth);
  tl.style.height = (innerHeight + extra) + "px";
}
let tlCur = -1;
function tlFx(y) {
  if (!near("tl", y)) return;
  const p = pin("tl", y), shift = p * L.extra;
  track.style.transform = `translate3d(${(-shift).toFixed(1)}px,0,0)`;
  tlBar.style.transform = `scaleX(${p.toFixed(4)})`;
  const mid = innerWidth * .4;
  let ci = 0;
  L.evLeft.forEach((x, i) => { if (x - shift < mid) ci = i; });
  if (ci === tlCur) return;
  tlCur = ci;
  tlCards.forEach((c, i) => { c.classList.toggle("on", i === ci); c.classList.toggle("past", i < ci); });
  tlNow.textContent = tlCards[ci].querySelector(".y").textContent;
}
/* smaller finds: scroll picks the group */
const finds = $("#archive"), fxTabs = $$("#fxTabs li"), panes = $$("#repos .pane");
let fxCur = 0;
function setGroup(i) {
  if (i === fxCur) return;
  fxCur = i;
  fxTabs.forEach((t, k) => t.classList.toggle("on", k === i));
  panes.forEach((p, k) => p.classList.toggle("on", k === i));
}
$("#fxTabs").addEventListener("click", e => {
  const b = e.target.closest("[data-g]"); if (!b) return;
  const i = +b.dataset.g;
  if (reduced) { setGroup(i); return; }
  goTo(L.finds.top + (i + .5) / GROUPS.length * (L.finds.h - innerHeight));
});
function findsFx(y) {
  if (!near("finds", y)) return;
  const p = pin("finds", y);
  setGroup(Math.min(GROUPS.length - 1, Math.floor(p * GROUPS.length)));
}

/* writing: each article flips up and away */
const wr = $("#writing"), posts = $$("#deck .post");
const deckN = document.createElement("p"); deckN.className = "deck-n"; deckN.innerHTML = posts.map(() => "<i></i>").join("");
$("#deck").after(deckN);
const deckDots = [...deckN.children];
/* the deck follows the scroll through its own eased loop, so a flick never makes a card jump */
let deckT = 0, deckS = 0, deckRaf = 0;
const smooth = t => t * t * (3 - 2 * t);
function deckApply(t) {
  posts.forEach((el, i) => {
    const d = i - t;
    let tr, op;
    if (d < 0) { const q = Math.min(1, -d), e = smooth(q); tr = `translate3d(0,${(-e * 42).toFixed(2)}%,0) rotateX(${(e * 40).toFixed(2)}deg) scale(${(1 - e * .1).toFixed(4)})`; op = 1 - e; }
    else { const e = Math.min(d, 3); tr = `translate3d(0,${(e * 24).toFixed(2)}px,0) scale(${(1 - e * .045).toFixed(4)})`; op = clamp(1 - Math.max(0, d - 1.6) / .9) * (1 - Math.min(d, 1.6) * .22); }
    el.style.transform = tr; el.style.opacity = op.toFixed(3);
    el.style.zIndex = String(100 - i);
    el.style.pointerEvents = Math.abs(d) < .5 ? "auto" : "none";
  });
  const on = Math.round(t);
  deckDots.forEach((dt, i) => dt.classList.toggle("on", i === on));
}
function deckLoop() {
  const d = deckT - deckS;
  deckS = Math.abs(d) < .0005 ? deckT : deckS + d * .12;
  deckApply(deckS);
  deckRaf = deckS !== deckT ? requestAnimationFrame(deckLoop) : 0;
}
function deckFx(y) {
  if (!near("wr", y)) return;
  const raw = pin("wr", y) * (posts.length - .4);
  const k = Math.floor(raw), f = raw - k;
  deckT = Math.min(posts.length - 1, k + smooth(clamp((f - .15) / .7)));
  if (!deckRaf) deckRaf = requestAnimationFrame(deckLoop);
}

/* after the timeline: water edges, the quote, the build heading */
const waves = $$(".wave"), quoteEl = $("#quote"), buildLns = $$(".slide2 .ln");
const CAP_H = () => Math.min(180, innerHeight * .2);
waves.forEach(sec => {
  const cap = document.createElement("i");
  cap.className = "cap"; cap.setAttribute("aria-hidden", "true");
  cap.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0H100V100Q50 -98 0 100Z"/></svg>';
  sec.prepend(cap);
  sec._cap = cap; sec._amp = -1;
});
function capColours() {
  waves.forEach(sec => {
    let prev = sec.previousElementSibling, bg = "rgb(0, 0, 0)";
    while (prev && (prev.hidden || getComputedStyle(prev).display === "none")) prev = prev.previousElementSibling;
    if (!prev && sec.tagName === "FOOTER") prev = $("main > section:last-of-type");
    if (prev) { const c = getComputedStyle(prev).backgroundColor; if (c && c !== "rgba(0, 0, 0, 0)") bg = c; }
    sec._cap.style.setProperty("--capc", bg);
    sec._cap.style.height = CAP_H() + "px";
  });
}
function afterFx(t) {
  const vh = innerHeight;
  waves.forEach(sec => {
    const r = sec.getBoundingClientRect();
    if (r.top > vh || r.top < -vh) return;
    const k = 1 - ease(clamp((vh - r.top) / (vh * .9)));
    const v = Math.round(k * 1000) / 1000;
    if (v === sec._amp) return;
    sec._amp = v;
    sec._cap.style.transform = `scaleY(${v})`;
  });
  const qr = quoteEl.getBoundingClientRect();
  if (qr.top < vh && qr.bottom > 0) {
    const p = clamp((vh * .85 - qr.top) / (vh * .55));
    const lit = Math.round(p * qWords.length);
    qWords.forEach((w, i) => w.classList.toggle("on", i < lit));
  }
  const br = buildLns[0].getBoundingClientRect();
  if (br.top < vh && br.bottom > -vh) {
    const p = ease(clamp((vh - br.top) / (vh * .7)));
    buildLns[0].style.transform = `translate3d(${(-(1 - p) * 40).toFixed(2)}vw,0,0)`;
    buildLns[1].style.transform = `translate3d(${((1 - p) * 40).toFixed(2)}vw,0,0)`;
  }
}

function frame() {
  const y = scrollY;
  prog.style.transform = `scaleY(${clamp(y / L.max).toFixed(4)})`;
  if (reduced) return;
  stackFx(y);
  tlFx(y);
  findsFx(y);
  deckFx(y);
  ski(y);
  afterFx();
  if (!near("hero", y)) return;
  const hp = ease(pin("hero", y));
  r1.style.transform = `translate3d(${-hp * 62}vw,0,0) scale(${1 + hp * .15})`;
  r2.style.transform = `translate3d(${hp * 62}vw,0,0) scale(${1 + hp * .15})`;
  heroMid.style.opacity = clamp((hp - .15) / .3);
  heroMid.style.transform = `translate(-50%,-50%) scale(${lerp(.8, 1, clamp((hp - .15) / .5))})`;
  morphTo(y >= skRange()[0] - L.vh * .18 ? 1 : 0);
}
/* ================= the name screen: "Software engineer" decodes into "Polymath" as the skier comes in ================= */
const midWord = heroMid.firstElementChild, midSub = heroMid.lastElementChild;
const MORPH = [["Software engineer", "Hannover, DE"], ["Polymath", "The one who does everything"]];
const GLYPHS = "#%&$@!?<>/\\=+*01ΔΣΞ";
let mState = 0;
function scramble(el, to, dur, delay) {
  if (el._raf) cancelAnimationFrame(el._raf);
  const from = el.textContent, n = Math.max(from.length, to.length), t0 = performance.now() + delay;
  const at = [...Array(n)].map((_, i) => .2 + .65 * (i / n) + Math.random() * .12);
  let last = -1, glyph = [];
  const esc = c => c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : c;
  (function step(now) {
    const p = clamp((now - t0) / dur);
    const tick = Math.floor(now / 45);
    if (tick !== last) { last = tick; glyph = at.map(() => GLYPHS[Math.random() * GLYPHS.length | 0]); }
    let html = "";
    for (let i = 0; i < n; i++) {
      if (p >= at[i]) html += to[i] ? esc(to[i]) : "";
      else if (p > at[i] - .32) html += (to[i] === " " && from[i] === " ") ? " " : `<i class="gl">${esc(glyph[i])}</i>`;
      else html += from[i] ? esc(from[i]) : "";
    }
    el.innerHTML = html;
    if (p < 1) el._raf = requestAnimationFrame(step);
    else { el.textContent = to; el._raf = 0; }
  })(performance.now());
}
function morphTo(s) {
  if (s === mState) return;
  mState = s;
  scramble(midWord, MORPH[s][0], 760, 0);
  scramble(midSub, MORPH[s][1], 620, 120);
  heroMid.classList.remove("hit"); void heroMid.offsetWidth; heroMid.classList.add("hit");
}

/* ================= the slalom: a silhouette carving a solid wall of water that turns orange ================= */
const sk = $("#ski"), g = sk.getContext("2d");
let SW = 0, SH = 0, DPR = 1, skQ = 0, skVel = 0;
function skSize() {
  DPR = Math.min(2, devicePixelRatio || 1);
  SW = innerWidth; SH = innerHeight;
  sk.width = SW * DPR; sk.height = SH * DPR;
}
const skRange = () => [L.hero.top + (L.hero.h - L.vh) * .5, L.hero.top + (L.hero.h - L.vh) * 1.02];
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const mix = (c1, c2, t) => c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
const WHITE = [243, 241, 236], OR = [255, 79, 18];
const rgb = c => `rgb(${c[0]},${c[1]},${c[2]})`;

/* the skier: a silhouette image; an orange copy gives it a rim of light */
const skImg = new Image(); let skRim = null, skInk = null;
skImg.onload = () => {
  const c = document.createElement("canvas"); c.width = skImg.width; c.height = skImg.height;
  const x = c.getContext("2d"); x.drawImage(skImg, 0, 0);
  x.globalCompositeOperation = "source-in"; x.fillStyle = "#FF4F12"; x.fillRect(0, 0, c.width, c.height);
  skRim = c;
  const c2 = document.createElement("canvas"); c2.width = skImg.width; c2.height = skImg.height;
  const x2 = c2.getContext("2d"); x2.drawImage(skImg, 0, 0);
  x2.globalCompositeOperation = "source-in"; x2.fillStyle = "#F3F1EC"; x2.fillRect(0, 0, c2.width, c2.height);
  skInk = c2;
};
skImg.src = "assets/skier.png";
const TAIL = [.62, .965], WATER = .99;          // where the ski's tail sits, and the waterline, inside the image

/* a solid wall of water: smooth body, rolling scalloped crest */
function wall(ox, oy, len, hgt, t, col, seed) {
  const N = 48;
  g.beginPath();
  g.moveTo(ox + 14, oy);
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    // the crest: rises fast off the ski, peaks, then falls away behind
    const bx = ox - len * u;
    const by = oy - hgt * Math.pow(Math.sin(Math.min(1, u * 1.15) * Math.PI), .8) * (1 - .25 * u);
    const bump = Math.sin(u * 22 + t * .006 + seed) * .5 + Math.sin(u * 9 - t * .004 + seed * 2) * .5;
    g.lineTo(bx, by - bump * hgt * .035 * Math.sin(u * Math.PI));
  }
  g.lineTo(ox - len, oy + 4);
  g.closePath();
  g.fillStyle = col; g.fill();
}

function skDraw(q, t) {
  g.setTransform(DPR, 0, 0, DPR, 0, 0);
  g.clearRect(0, 0, SW, SH);
  if (q <= 0 || q >= 1 || !skImg.complete || !skImg.naturalWidth) return;
  sk.style.opacity = "1";
  const warm = sstep(.12, .6, q);
  const water = mix(WHITE, OR, warm);

  // no curtain: he rides straight over the splitting name
  const surface = SH * .74;

  // the run: left to right across the whole screen, on a gentle curve
  const w = Math.min(SW * .6, SH * 1.15), h = w * skImg.naturalHeight / skImg.naturalWidth;
  const ix = lerp(-w * .95, SW * 1.45, q);
  const lift = Math.sin(q * Math.PI) * SH * .07;
  const tilt = Math.cos(q * Math.PI) * -.07;
  const iy = surface - h * WATER - lift;
  const tx = ix + w * TAIL[0], ty = iy + h * TAIL[1];

  // the water only exists behind him: thrown off the ski, covering everything he has passed
  const D = SW * .34;
  const cover = (reach, col, seed, lo) => {
    g.beginPath();
    g.moveTo(tx + 12, ty);
    for (let i = 0; i <= 50; i++) {
      const u = i / 50;
      const x = tx - u * reach;
      const rise = 1 - Math.pow(1 - Math.min(1, u * 1.1), 2.4);
      const bump = (Math.sin(u * 18 + t * .007 + seed) + Math.sin(u * 7 - t * .004 + seed)) * .5;
      g.lineTo(x, ty - (ty + SH * .15) * rise * lo - bump * SH * .03 * Math.sin(u * Math.PI));
    }
    g.lineTo(tx - reach - 10, -SH * .2);
    g.lineTo(-20, -SH * .2); g.lineTo(-20, SH + 20);
    g.lineTo(tx - reach * .35, SH + 20);
    g.quadraticCurveTo(tx - reach * .05, surface + (SH - surface) * .35, tx + 12, ty);
    g.closePath();
    g.fillStyle = col; g.fill();
  };
  cover(D * 1.35, rgb(mix(water, [255, 255, 255], .3 * (1 - warm))), 2.2, 1);
  cover(D, rgb(mix(water, [10, 10, 10], .12 * (1 - warm))), 5.9, 1);
  cover(D * .55, rgb(water), 9.1, .55);

  // the skier, riding the curve, rope carried on to the boat past the edge of the screen
  g.save();
  g.translate(tx, ty); g.rotate(tilt); g.translate(-tx, -ty);
  g.strokeStyle = "#FF4F12"; g.lineWidth = Math.max(2.5, w * .0042); g.lineCap = "butt";
  g.beginPath(); g.moveTo(ix + w * .99, iy + h * .372); g.lineTo(ix + w + SW * 2.5, iy + h * .372); g.stroke();
  if (skRim) g.drawImage(skRim, ix + w * .005, iy - h * .008, w, h);
  g.drawImage(skImg, ix, iy, w, h);
  g.restore();
}

let skAnim = 0, skT = 0, skLast = 0;
function skFrame(t) {
  const y = scrollY, [a, b] = skRange();
  skT = clamp((y - a) / (b - a));
  const d = skT - skQ;
  skVel = d;
  skQ = Math.abs(d) < .0004 ? skT : skQ + d * .16;          // ease toward the scroll: no jumps, even on a fast flick
  g.setTransform(DPR, 0, 0, DPR, 0, 0);
  if (skQ >= .999 && y >= b && y < L.work.top) {
    // the water carries on: orange above the projects as they rise out of it
    g.clearRect(0, 0, SW, SH);
    g.fillStyle = "#FF4F12"; g.fillRect(0, 0, SW, Math.max(0, L.work.top - y) + 1);
  } else if (skQ > 0 && skQ < 1) {
    skDraw(skQ, t);
  } else {
    g.clearRect(0, 0, SW, SH);
  }
  const busy = Math.abs(skT - skQ) > .0004 || (skQ > 0 && skQ < 1);
  skAnim = busy ? requestAnimationFrame(skFrame) : 0;
}
function ski(y) {
  // wake the loop near the hand-off; it sleeps everywhere else
  const [a] = skRange();
  if (y > a - L.vh && y < L.work.top + 10) { if (!skAnim) skAnim = requestAnimationFrame(skFrame); }
  else if (skQ !== 0 || skAnim) { if (skAnim) cancelAnimationFrame(skAnim); skAnim = 0; skQ = skT = 0; g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, SW, SH); }
}

/* ================= smooth scrolling ================= */
let lenis = null;
function goTo(top) { lenis ? lenis.scrollTo(top) : scrollTo({ top, behavior: reduced ? "auto" : "smooth" }); }
if (!reduced && window.Lenis) {
  lenis = new Lenis({ lerp: .085, wheelMultiplier: .95, touchMultiplier: 1.3, smoothWheel: true });
  (function loop(t) { lenis.raf(t); requestAnimationFrame(loop); })(performance.now());
}
/* every scroll, smooth or native touch, drives the animations: one update per frame */
let rafQ = 0;
const queue = () => { if (!rafQ) rafQ = requestAnimationFrame(() => { rafQ = 0; frame(); }); };
addEventListener("scroll", queue, { passive: true });
addEventListener("touchmove", queue, { passive: true });
if (lenis) lenis.on("scroll", queue);
addEventListener("resize", () => { fit(); tlSize(); capColours(); measure(); skSize(); frame(); });

/* ================= cursor ================= */
if (matchMedia("(hover:hover) and (pointer:fine)").matches && !reduced) {
  const cur = $("#cur"), dot = $(".cur-dot"), ring = $(".cur-ring"), ct = $("#curT");
  let x = -100, y = -100, rx = x, ry = y;
  addEventListener("pointermove", e => {
    x = e.clientX; y = e.clientY; cur.classList.add("on"); moved = true;
  }, { passive: true });
  let moved = false, tick = 0;
  document.addEventListener("pointerleave", () => cur.classList.remove("on"));
  addEventListener("pointerdown", () => cur.classList.add("down"));
  addEventListener("pointerup", () => cur.classList.remove("down"));
  document.addEventListener("pointerover", e => {
    const t = e.target.closest("a, button");
    cur.classList.toggle("hot", !!t);
    ct.textContent = t ? (t.dataset.c || (t.target === "_blank" ? "Open" : "Go")) : "";
  });
  (function loop() {
    rx += (x - rx) * .18; ry += (y - ry) * .18;
    if (moved && ++tick % 4 === 0) {
      moved = false;
      const el = document.elementFromPoint(x, y);
      cur.classList.toggle("dark", !!(el && el.closest(".hot") && !el.closest(".card-in, .forge")));
    }
    dot.style.transform = `translate3d(${x}px,${y}px,0)`;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    requestAnimationFrame(loop);
  })();
}

/* ================= build console ================= */
(function () {
  const tabs = $$(".pick button"), out = $(".out"), go = $("#fGo");
  function show(k) {
    const f = F[k];
    tabs.forEach(t => t.setAttribute("aria-selected", t.dataset.k === k));
    out.classList.remove("swap"); void out.offsetWidth; out.classList.add("swap");
    $("#fTitle").textContent = f.title; $("#fDesc").textContent = f.desc;
    $("#fGet").innerHTML = f.get.map(x => `<li>${esc(x)}</li>`).join("");
    $("#fStack").textContent = f.stack.join(" / ");
    const label = tabs.find(t => t.dataset.k === k).textContent;
    go.href = `mailto:kavindudeshal2@gmail.com?subject=${encodeURIComponent("Let's build: " + label)}&body=${encodeURIComponent("Hi Kavindu,\n\nI'd like to build: " + label.toLowerCase() + ".\n\nThe idea:\n")}`;
  }
  tabs.forEach(t => t.addEventListener("click", () => show(t.dataset.k)));
  show("mobile");
})();

/* ================= small things ================= */
const toast = $("#toast");
function say(m) { toast.textContent = m; toast.classList.add("on"); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove("on"), 2000); }
$("#copyEmail").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText("kavindudeshal2@gmail.com"); say("Email copied"); }
  catch { location.href = "mailto:kavindudeshal2@gmail.com"; }
});
$("#yr2").textContent = new Date().getFullYear();
const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit", second: "2-digit" });
const clockEl = $("#clock");
const clock2 = $("#clock2");
function tickClock() { const t = fmt.format(new Date()); clockEl.textContent = "Hannover " + t; clock2.textContent = t; }
tickClock(); setInterval(tickClock, 1000);

$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const t = document.querySelector(a.getAttribute("href")); if (!t) return;
  e.preventDefault(); goTo(a.getAttribute("href") === "#top" ? 0 : docTop(t));
}));
const start = () => { fit(); tlSize(); capColours(); measure(); skSize(); frame(); requestAnimationFrame(() => document.body.classList.add("loaded")); };
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);
})();
