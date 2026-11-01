/* ============ AI Engineer Roadmap 2026 — App ============ */
(() => {
"use strict";

const KEY = "ai-roadmap-2026-progress-v1";
const STAGES = [...(window.STAGES_A || []), ...(window.STAGES_B || [])];
const CHAPTERS = [
  { id: 1, name: "第一章 · 奠基", en: "Foundation", stages: [1, 2, 3], color: "#60a5fa",
    desc: "Python、Git、SQL — 工程師的三塊基石,一切從這裡開始。" },
  { id: 2, name: "第二章 · 智慧", en: "Intelligence", stages: [4, 5, 6], color: "#a78bfa",
    desc: "機器學習 → 神經網路 → 大型語言模型,看懂 AI 的原理。" },
  { id: 3, name: "第三章 · 應用", en: "Application", stages: [7, 8, 9], color: "#f472b6",
    desc: "提示詞、RAG、向量搜尋 — 讓 LLM 真正有用的三大技術。" },
  { id: 4, name: "第四章 · 發布", en: "Launch", stages: [10, 11, 12], color: "#34d399",
    desc: "Agent、部署、產品化 — 把你的 AI 交到世界手上。" },
];
const DEMO_NAMES = { temperature: "🧪 互動實驗室 · Temperature 模擬器",
                     prompt: "🧪 互動實驗室 · 提示詞建構器",
                     embeddings: "🧪 互動實驗室 · 語意空間地圖" };

/* ---------- state ---------- */
let state = loadState();
function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch (e) { return {}; }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
const isDone = id => !!(state.completed && state.completed[id]);
const isPassed = id => !!(state.quizPassed && state.quizPassed[id]);
const doneCount = () => STAGES.filter(s => isDone(s.id)).length;

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const app = document.getElementById("app");
const esc = s => String(s).replace(/[&<>"']/g,
  c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const stageById = id => STAGES.find(s => s.id === id);
const chapterOf = id => CHAPTERS.find(c => c.stages.includes(id));

function updateRing() {
  const n = doneCount(), total = STAGES.length;
  const fg = $("#ringFg"), txt = $("#progressText");
  if (fg) fg.style.strokeDasharray = `${(n / total) * 100} 100`;
  if (txt) txt.textContent = `${n}/${total}`;
}

function firstIncomplete() {
  return STAGES.find(s => !isDone(s.id)) || STAGES[STAGES.length - 1];
}

/* ---------- tiny syntax highlighter ---------- */
const KW = {
  python: "def|return|import|from|for|in|if|elif|else|while|class|with|as|not|and|or|None|True|False|lambda|try|except|break|continue|pass|print|self",
  bash: "git|echo|cd|ls|npm|pip|docker|curl|export|switch|merge|push|add|commit|init",
  sql: "SELECT|FROM|WHERE|JOIN|ON|GROUP BY|ORDER BY|CREATE TABLE|INSERT INTO|VALUES|PRIMARY KEY|REFERENCES|DEFAULT|NOT NULL|COUNT|AS|DESC|ASC|CHECK|IN|SERIAL|TEXT|INTEGER|TIMESTAMP|NOW",
  dockerfile: "FROM|WORKDIR|COPY|RUN|ENV|EXPOSE|CMD",
};
function highlight(code, lang) {
  const k = KW[lang] || KW.python;
  const re = new RegExp(
    '("""[\\s\\S]*?"""|"(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'|#[^\\n]*|--[^\\n]*|\\b(?:' +
    k + ')\\b|\\b\\d+(?:\\.\\d+)?\\b)', "g");
  let out = "", last = 0, m;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    const t = m[0];
    let cls = "kw";
    if (t.startsWith("#") || t.startsWith("--")) cls = "com";
    else if (t.startsWith('"') || t.startsWith("'")) cls = "str";
    else if (/^\d/.test(t)) cls = "num";
    out += `<span class="tok-${cls}">${esc(t)}</span>`;
    last = m.index + t.length;
  }
  return out + esc(code.slice(last));
}

/* ================= HOME ================= */
function renderHome() {
  const total = STAGES.length;
  const quizTotal = STAGES.reduce((sum, s) => sum + s.quiz.length, 0);
  const demoTotal = STAGES.filter(s => s.demo).length;
  const next = firstIncomplete();
  const allDone = doneCount() === total;
  const cta = allDone
    ? `<a class="btn ok-btn" href="#/capstone">🏆 查看你的結業證書</a>`
    : `<a class="btn" href="#/stage/${next.id}">${doneCount() > 0 ? "▶ 繼續旅程 · 第 " + next.id + " 站" : "▶ 開始第一站 · Python"}</a>
       <a class="btn secondary" href="#/capstone">🚀 看看畢業專案</a>`;

  const timeline = CHAPTERS.map(ch => {
    const head = `<div class="chapter-head" style="--ch:${ch.color}">
        <span class="chapter-chip">${ch.name}</span><h2>${ch.en}</h2>
        <p>${ch.desc}</p></div>`;
    const items = ch.stages.map(id => {
      const s = stageById(id);
      const done = isDone(id);
      const isNext = s.id === next.id && !allDone;
      const node = done ? `<span class="node-check">✓</span>` : s.emoji;
      const status = done ? `<span class="chip status-done">✓ 已完成</span>`
        : isNext ? `<span class="chip status-next">▶ 下一站</span>` : "";
      const demoChip = s.demo ? `<span class="chip demo-chip">🧪 含互動實驗室</span>` : "";
      return `<div class="stage-item ${done ? "done" : ""}">
        <div class="stage-node">${node}</div>
        <a class="stage-card" href="#/stage/${s.id}">
          <div class="stage-card-top">
            <span class="stage-num">STAGE ${String(s.id).padStart(2, "0")}</span>
            <span class="chip">⏱ ${s.duration}</span>${status}${demoChip}
          </div>
          <h3>${s.emoji} ${s.title}</h3>
          <p class="tagline">${s.tagline}</p>
          <div class="stage-meta">🧩 ${s.concepts.length} 個核心概念 · 📝 ${s.quiz.length} 道隨堂測驗 · 💻 程式碼實例</div>
        </a></div>`;
    }).join("");
    return head + `<div class="road">${items}</div>`;
  }).join("");

  app.innerHTML = `
  <div class="container">
    <section class="hero">
      <span class="badge">🔥 2026 版 · ${total} 站完整路線</span>
      <h1 class="hero-title">AI Engineer <span class="grad">進化之路</span></h1>
      <p class="hero-sub">從第一行 Python 到把 AI 產品部署上線。${total} 站環環相扣,每一站都為你的畢業專案
        <b>「DocMind 智慧文件助理」</b>添上一塊積木 — 走完全程,你不只是學會 AI,而是成為能交付 AI 產品的工程師。</p>
      <div class="cta-row">${cta}</div>
      <div class="stats-row">
        <span class="stat-chip"><b>${total}</b>學習站</span>
        <span class="stat-chip"><b>${quizTotal}</b>道隨堂測驗</span>
        <span class="stat-chip"><b>${demoTotal}</b>座互動實驗室</span>
        <span class="stat-chip"><b>1</b>個貫穿專案</span>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">🔗 為什麼這條路線「有連貫性」?</h2>
      <p class="section-sub">這不是 ${total} 堂零散的課,而是一段有主線劇情的旅程。</p>
      <div class="coherent-grid">
        <div class="co-card"><div class="co-icon">🧩</div>
          <h3>一個貫穿全程的專案</h3>
          <p>每一站都為「DocMind 智慧文件助理」加上一塊積木:讀文件 → 版本控制 → 存資料 → 分類意圖 → 神經網路 → 接上 LLM → 設計提示詞 → RAG → 向量搜尋 → Agent → 容器化 → 上線。</p></div>
        <div class="co-card"><div class="co-icon">🔗</div>
          <h3>每站都承接上一站</h3>
          <p>每頁開頭的「接續上一站」告訴你為什麼先學這個、再學那個;結尾預告下一站 — 知識像鎖鏈一樣環環相扣,而不是孤立的清單。</p></div>
        <div class="co-card"><div class="co-icon">🎮</div>
          <h3>玩中學,學中玩</h3>
          <p>每站都有翻牌概念卡、可複製的程式碼、隨堂測驗;第 6、7、9 站還有互動實驗室:temperature 模擬器、提示詞建構器、語意空間地圖。</p></div>
      </div>
      <div class="docmind-strip">🚀 <b>畢業專案 DocMind:</b>上傳你的文件,AI 助理能引用來源回答問題、呼叫工具、查資料庫 — 用 Docker 部署上雲。學完就能寫進履歷。</div>
    </section>

    <section class="section" id="roadmap">
      <h2 class="section-title">🗺️ 學習路線圖</h2>
      <p class="section-sub">點擊任一站卡片進入學習。建議按順序走,每一站都以前一站為基礎。</p>
      ${timeline}
    </section>
  </div>`;
}

/* ================= STAGE PAGE ================= */
function renderStage(id) {
  const s = stageById(id);
  if (!s) { location.hash = "#/"; return; }
  const ch = chapterOf(id);
  const prev = stageById(id - 1), next = stageById(id + 1);
  const done = isDone(id), passed = isPassed(id);

  const codeCards = s.code.map(c => `
    <div class="code-card">
      <div class="code-head"><span class="code-dot"></span>
        <span class="code-name">${c.name}</span>
        <span class="lang-chip">${c.lang}</span>
        <button class="copy-btn" type="button">📋 複製</button>
      </div>
      <pre><code>${highlight(c.src, c.lang)}</code></pre>
    </div>`).join("");

  const conceptCards = s.concepts.map((c, i) => `
    <div class="flip" data-flip>
      <div class="flip-inner">
        <div class="face front">
          <div class="term">${c.t}</div>
          <div class="en">${c.en}</div>
          <div class="flip-hint">🔍 點擊翻面看解釋</div>
        </div>
        <div class="face back">${esc(c.d)}</div>
      </div>
    </div>`).join("");

  const quizHtml = s.quiz.map((q, qi) => `
    <div class="quiz-q" data-qi="${qi}">
      <p class="q-text">${qi + 1}. ${esc(q.q)}</p>
      ${q.opts.map((o, oi) => `
        <label class="q-opt"><input type="radio" name="q${id}_${qi}" value="${oi}" />
          <b class="q-letter">${"ABCD"[oi]}.</b> ${esc(o)}</label>`).join("")}
      <div class="q-explain hidden" data-explain>💡 ${esc(q.why)}</div>
    </div>`).join("");

  const demoHtml = s.demo ? `
    <h2 class="block-title">${DEMO_NAMES[s.demo]}</h2>
    <div class="demo-card" id="demo-${s.demo}">${demoSkeleton(s.demo)}</div>` : "";

  const statusChip = done
    ? `<span class="chip status-done" id="stageStatusChip">✓ 已完成</span>`
    : passed ? `<span class="chip status-next" id="stageStatusChip">📝 測驗已通過,待標記完成</span>`
    : `<span class="chip" id="stageStatusChip">學習中</span>`;

  app.innerHTML = `
  <div class="container">
    <p class="crumb"><a href="#/">🗺️ 路線圖</a> / ${ch.name} / <b>STAGE ${String(id).padStart(2, "0")}</b></p>
    <header class="stage-hero">
      <div class="stage-hero-top">
        <span class="stage-emoji">${s.emoji}</span>
        <div>
          <div class="stage-kicker">STAGE ${String(id).padStart(2, "0")} · ${ch.name}</div>
          <h1 class="stage-title">${s.title}</h1>
          <p class="stage-tagline">${s.tagline}</p>
        </div>
      </div>
      <div class="meta-chips">
        <span class="chip">⏱ ${s.duration}</span>${statusChip}
        <span class="chip">🧩 ${s.concepts.length} 概念</span>
        <span class="chip">📝 ${s.quiz.length} 測驗</span>
        ${s.demo ? `<span class="chip demo-chip">🧪 互動實驗室</span>` : ""}
      </div>
    </header>

    <div class="callout connect">
      <div class="callout-title">🧭 接續上一站${prev ? " · " + prev.title : ""}</div>
      ${s.connection}
    </div>

    <div class="callout docmind">
      <div class="callout-title">🧩 本站為畢業專案 DocMind 添上</div>
      ${s.contribution}
    </div>

    <h2 class="block-title">🎯 學習目標</h2>
    <div class="goals-grid">${s.goals.map(g => `<div class="goal">${esc(g)}</div>`).join("")}</div>

    <h2 class="block-title">🧩 核心概念(點擊翻牌)</h2>
    <div class="concepts-grid">${conceptCards}</div>

    <h2 class="block-title">💻 動手看程式碼</h2>
    ${codeCards}

    ${demoHtml}

    <h2 class="block-title">📝 隨堂測驗</h2>
    <div class="quiz-card" id="quizCard">
      ${quizHtml}
      <div class="quiz-actions">
        <button class="btn" id="checkQuiz" type="button">檢查答案</button>
        <button class="btn-ghost hidden" id="retryQuiz" type="button">↺ 重新作答</button>
        <span class="quiz-hint">全部答對,即可標記此站完成 ✅</span>
      </div>
      <div id="quizResult" style="margin-top:16px"></div>
      <div class="complete-area" id="completeArea"></div>
    </div>

    <div class="callout project">
      <div class="callout-title">🛠️ 動手實作</div>
      ${s.project}
    </div>

    <h2 class="block-title">🔗 延伸資源</h2>
    <div class="res-list">
      ${s.resources.map(r => `<a class="res-item" href="${r.u}" target="_blank" rel="noopener">📘 ${r.n}<span class="res-tag">${new URL(r.u).hostname}</span></a>`).join("")}
    </div>

    <nav class="pn-nav">
      ${prev ? `<a class="pn-btn" href="#/stage/${prev.id}"><span class="pn-label">← 上一站</span><span class="pn-title">${prev.emoji} ${prev.title}</span></a>` : `<span class="pn-btn off"></span>`}
      ${next ? `<a class="pn-btn next" href="#/stage/${next.id}"><span class="pn-label">下一站 →</span><span class="pn-title">${next.emoji} ${next.title}</span></a>`
             : `<a class="pn-btn next" href="#/capstone"><span class="pn-label">終點 →</span><span class="pn-title">🏆 查看畢業專案</span></a>`}
    </nav>
  </div>`;

  bindStagePage(s, done, passed);
}

function demoSkeleton(kind) {
  if (kind === "temperature") return `
    <div class="demo-title">🎚️ 拉動 Temperature,看模型的「性格」如何改變</div>
    <div class="demo-desc">情境:模型要接續句子「今天天氣真___」。下面的長條是每個候選詞被選中的機率 — 溫度越低,分布越尖(穩定);溫度越高,分布越平(奔放)。</div>
    <div id="tempBars"></div>
    <div class="demo-controls">
      <span>❄️ 穩定</span>
      <input type="range" id="tempSlider" min="0.2" max="2" step="0.1" value="1" />
      <span>🔥 奔放</span>
      <span class="temp-val" id="tempVal">1.0</span>
      <button class="btn secondary" id="sampleBtn" type="button">🎲 依此分布抽樣 20 次</button>
    </div>
    <div id="sampleOut"></div>
    <p class="demo-caption">💡 資料抽取用低溫(一致)、腦力激盪用高溫(多元)— 這就是你在 API 裡調的 temperature。</p>`;
  if (kind === "prompt") return `
    <div class="demo-title">🏗️ 動手組裝一個結構化提示詞</div>
    <div class="demo-desc">改動下面任一欄位,右側(下方)即時組合出完整提示詞。感受一下:同樣的問題,提示詞結構不同,任務就從「模糊」變「精確」。</div>
    <div class="pb-grid">
      <label class="pb-field"><span>🎭 角色(Role)</span>
        <select id="pbRole">
          <option>溫柔的國小老師</option><option>嚴謹的技術顧問</option>
          <option>幽默的脫口秀演員</option><option>專業的行銷文案寫手</option>
        </select></label>
      <label class="pb-field"><span>🎯 任務(Task)</span>
        <input id="pbTask" value="解釋什麼是 RAG" /></label>
      <label class="pb-field"><span>👥 聽眾(Audience)</span>
        <input id="pbAudience" value="完全沒有 AI 背景的高中生" /></label>
      <label class="pb-field"><span>📦 輸出格式(Format)</span>
        <select id="pbFormat">
          <option>三個重點條列</option><option>一段 100 字短文</option>
          <option>一張「是什麼 / 不是什麼」對照表</option><option>三個蘇格拉底式反問</option>
        </select></label>
    </div>
    <div class="pb-out" id="pbOut"></div>
    <p class="demo-caption">💡 把這段提示詞貼到任何 LLM 試試,再換一個「角色」比較差異 — 這就是第 7 站的精髓。</p>`;
  if (kind === "embeddings") return `
    <div class="demo-title">🗺️ 點擊任一個詞,找出它的「語意近鄰」</div>
    <div class="demo-desc">每個詞被映射成 2 維平面上的點(真實 embedding 是數百維)。點一個詞,看看哪些詞和它靠得最近 — 意思相近的詞,距離就近。</div>
    <div class="emb-wrap">
      <svg id="embSvg" viewBox="0 0 560 480"></svg>
      <div><div id="embList"></div>
        <div class="emb-legend">
          <span><i style="background:#a78bfa"></i>人物</span><span><i style="background:#34d399"></i>動物</span>
          <span><i style="background:#fbbf24"></i>水果</span><span><i style="background:#38bdf8"></i>程式語言</span>
          <span><i style="background:#f472b6"></i>情緒</span>
        </div></div>
    </div>
    <p class="demo-caption">💡 此圖用直線距離示意;真實向量資料庫在數百維空間中用 cosine similarity 搜尋,原理相同:語意近 = 距離近。</p>`;
  return "";
}

function bindStagePage(s, done, passed) {
  /* flip cards */
  app.querySelectorAll("[data-flip]").forEach(f =>
    f.addEventListener("click", () => f.classList.toggle("flipped")));

  /* copy buttons */
  app.querySelectorAll(".copy-btn").forEach(btn =>
    btn.addEventListener("click", () => copyCode(btn)));

  /* demos */
  if (s.demo === "temperature") initTempDemo();
  if (s.demo === "prompt") initPromptDemo();
  if (s.demo === "embeddings") initEmbDemo();

  /* quiz */
  const resBox = $("#quizResult"), completeArea = $("#completeArea");
  const checkBtn = $("#checkQuiz"), retryBtn = $("#retryQuiz");

  if (passed) {
    resBox.innerHTML = `<div class="result ok">🎉 你已通過這一站的隨堂測驗!想複習可以再練一次(不影響進度)。</div>`;
    checkBtn.textContent = "✅ 已通過";
    checkBtn.classList.add("disabled");
    retryBtn.classList.remove("hidden");
    if (done) showCompletedBlock(s);
    else showFinishButton(s);
  }

  retryBtn.addEventListener("click", () => {
    app.querySelectorAll("#quizCard input[type=radio]").forEach(r => (r.checked = false));
    app.querySelectorAll(".q-opt").forEach(o => o.classList.remove("correct", "wrong"));
    app.querySelectorAll("[data-explain]").forEach(e => e.classList.add("hidden"));
    resBox.innerHTML = ""; completeArea.innerHTML = "";
    checkBtn.textContent = "檢查答案";
    checkBtn.classList.remove("disabled");
  });

  checkBtn.addEventListener("click", () => {
    if (checkBtn.classList.contains("disabled")) return;
    let allOk = true;
    s.quiz.forEach((q, qi) => {
      const box = app.querySelector(`.quiz-q[data-qi="${qi}"]`);
      const chosen = box.querySelector("input:checked");
      box.querySelectorAll(".q-opt").forEach((o, oi) => {
        o.classList.remove("correct", "wrong");
        if (oi === q.a) o.classList.add("correct");
      });
      const ex = box.querySelector("[data-explain]");
      if (!chosen) {
        allOk = false;
        ex.innerHTML = `<span class="miss">⚠ 此題未作答。</span> <br>💡 ${esc(q.why)}`;
      } else if (+chosen.value !== q.a) {
        allOk = false;
        chosen.closest(".q-opt").classList.add("wrong");
        ex.innerHTML = `💡 ${esc(q.why)}`;
      } else {
        ex.innerHTML = `🎉 答對了! ${esc(q.why)}`;
      }
      ex.classList.remove("hidden");
    });

    if (allOk) {
      state.quizPassed = state.quizPassed || {};
      state.quizPassed[s.id] = true;
      save();
      resBox.innerHTML = `<div class="result ok">🏆 測驗全數通過!你已掌握本站核心概念。</div>`;
      retryBtn.classList.remove("hidden");
      checkBtn.classList.add("disabled");
      checkBtn.textContent = "✅ 已通過";
      if (!isDone(s.id)) {
        showFinishButton(s);
      } else {
        showCompletedBlock(s);
      }
    } else {
      resBox.innerHTML = `<div class="result no">還有題目需要再想想 — 看看 💡 解析,然後重新作答。</div>`;
      retryBtn.classList.remove("hidden");
    }
  });
}

function showCompletedBlock(s) {
  const next = stageById(s.id + 1);
  $("#completeArea").innerHTML = `
    <div class="result ok">🏅 第 ${s.id} 站已完成${next ? ` — 下一站:<a href="#/stage/${next.id}">${next.emoji} ${next.title}</a>` : ` — <a href="#/capstone">前往畢業專案 🏆</a>`}</div>`;
}

function showFinishButton(s) {
  $("#completeArea").innerHTML = `<button class="btn ok-btn" id="finishBtn" type="button">✓ 標記第 ${s.id} 站完成</button>`;
  $("#finishBtn").addEventListener("click", () => finishStage(s));
}

function finishStage(s) {
  state.completed = state.completed || {};
  state.completed[s.id] = Date.now();
  save();
  updateRing();
  const next = stageById(s.id + 1);
  $("#completeArea").innerHTML = next ? `
    <div class="result ok">🎉 第 ${s.id} 站完成!積木又多了一塊。</div>
    <div style="margin-top:14px"><a class="btn" href="#/stage/${next.id}">前往第 ${next.id} 站 · ${next.emoji} ${next.title} →</a></div>`
    : `
    <div class="result ok">🏁 全部 ${STAGES.length} 站完成!你已解鎖 AI Engineer。</div>
    <div style="margin-top:14px"><a class="btn ok-btn" href="#/capstone">🏆 前往畢業專案,領取結業證書</a></div>`;
  const chip = $("#stageStatusChip");
  if (chip) {
    chip.className = "chip status-done";
    chip.textContent = "✓ 已完成";
  }
}

function copyCode(btn) {
  const code = btn.closest(".code-card").querySelector("code").innerText;
  const ok = () => {
    btn.textContent = "✓ 已複製";
    setTimeout(() => (btn.textContent = "📋 複製"), 1500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(ok).catch(() => fallbackCopy(code, ok));
  } else fallbackCopy(code, ok);
}
function fallbackCopy(text, ok) {
  const ta = document.createElement("textarea");
  ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); ok(); } catch (e) {}
  ta.remove();
}

/* ---------- Demo: temperature ---------- */
function initTempDemo() {
  const base = [["好", 0.45], ["溫暖", 0.20], ["熱", 0.15], ["冷", 0.10], ["糟", 0.10]];
  const slider = $("#tempSlider");
  const adjusted = T => {
    const w = base.map(([t, p]) => [t, Math.pow(p, 1 / T)]);
    const sum = w.reduce((a, [, p]) => a + p, 0);
    return w.map(([t, p]) => [t, p / sum]);
  };
  const render = () => {
    const T = +slider.value;
    $("#tempVal").textContent = T.toFixed(1);
    $("#tempBars").innerHTML = adjusted(T).map(([t, p]) => `
      <div class="tbar"><span class="t-label">「${t}」</span>
        <div class="t-track"><div class="t-fill" style="width:${(p * 100).toFixed(1)}%"></div></div>
        <span class="t-pct">${(p * 100).toFixed(1)}%</span></div>`).join("");
  };
  slider.addEventListener("input", render);
  render();
  $("#sampleBtn").addEventListener("click", () => {
    const dist = adjusted(+slider.value);
    const counts = {};
    for (let i = 0; i < 20; i++) {
      let r = Math.random();
      for (const [t, p] of dist) { if ((r -= p) <= 0) { counts[t] = (counts[t] || 0) + 1; break; } }
    }
    $("#sampleOut").innerHTML = `<div style="margin-top:6px">🎲 20 次抽樣結果:</div>` +
      Object.entries(counts).sort((a, b) => b[1] - a[1])
        .map(([t, c]) => `<span class="tally">${t} × ${c}</span>`).join("");
  });
}

/* ---------- Demo: prompt builder ---------- */
function initPromptDemo() {
  const fields = ["pbRole", "pbTask", "pbAudience", "pbFormat"].map(id => $("#" + id));
  const compose = () => {
    const role = fields[0].value, task = fields[1].value.trim() || "(請輸入任務)";
    const aud = fields[2].value.trim() || "(請輸入聽眾)", fmt = fields[3].value;
    $("#pbOut").textContent =
`## 角色
你是${role}。

## 任務
${task}

## 聽眾
請考慮對方是:${aud}。

## 輸出格式
${fmt}

## 規則
- 不確定的內容,明確說「我不確定」
- 一律使用繁體中文`;
  };
  fields.forEach(f => { f.addEventListener("input", compose); f.addEventListener("change", compose); });
  compose();
}

/* ---------- Demo: embeddings map ---------- */
const EMB_WORDS = [
  ["國王", 6.2, 8.6, 0], ["女王", 7.4, 9.0, 0], ["王子", 7.7, 8.1, 0],
  ["男人", 5.8, 7.2, 0], ["女人", 7.0, 7.6, 0],
  ["貓", 1.6, 8.2, 1], ["狗", 2.7, 8.8, 1], ["小貓", 2.1, 7.6, 1],
  ["蘋果", 5.4, 1.9, 2], ["香蕉", 6.7, 2.5, 2], ["芒果", 5.9, 3.0, 2],
  ["Python", 1.8, 2.0, 3], ["Java", 3.1, 1.4, 3], ["JavaScript", 2.5, 2.9, 3],
  ["快樂", 9.2, 5.5, 4], ["開心", 9.6, 6.4, 4], ["難過", 9.3, 4.3, 4],
];
const EMB_COLORS = ["#a78bfa", "#34d399", "#fbbf24", "#38bdf8", "#f472b6"];

function initEmbDemo() {
  const svg = $("#embSvg");
  const W = 560, H = 480, PAD = 46;
  const sx = v => PAD + (v / 10) * (W - 2 * PAD);
  const sy = v => H - PAD - (v / 10) * (H - 2 * PAD);

  function draw(selected) {
    const lines = [];
    if (selected != null) {
      const [, x0, y0] = EMB_WORDS[selected];
      EMB_WORDS.forEach(([, x, y], i) => {
        if (i === selected) return;
        const d = Math.hypot(x - x0, y - y0);
        if (d < 1.55) lines.push(`<line class="emb-line" x1="${sx(x0)}" y1="${sy(y0)}" x2="${sx(x)}" y2="${sy(y)}"/>`);
      });
    }
    const dots = EMB_WORDS.map(([w, x, y, g], i) => {
      const sel = i === selected;
      return `<g class="emb-dot" data-i="${i}">
        <circle cx="${sx(x)}" cy="${sy(y)}" r="${sel ? 11 : 7}" fill="${EMB_COLORS[g]}"
          stroke="${sel ? "#fff" : "none"}" stroke-width="2" opacity="0.92"/>
        <text x="${sx(x)}" y="${sy(y) - 15}" text-anchor="middle" font-size="13"
          fill="${sel ? "#fff" : "#cbd5e1"}" font-weight="${sel ? 800 : 500}">${w}</text></g>`;
    }).join("");
    svg.innerHTML = lines + dots;
  }

  function pick(i) {
    draw(i);
    const [w0, x0, y0] = EMB_WORDS[i];
    const ranked = EMB_WORDS.map(([w, x, y], j) => ({ w: j === i ? w0 : w, d: Math.hypot(x - x0, y - y0), j }))
      .filter(o => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 3);
    $("#embList").innerHTML =
      `<div style="font-weight:800;margin-bottom:8px">「${w0}」的最近鄰 Top 3</div>` +
      ranked.map((o, r) => `<div class="emb-item"><span>#${r + 1} ${o.w}</span><b>距離 ${o.d.toFixed(2)}</b></div>`).join("") +
      `<p class="demo-caption">觀察:動物跟動物近、水果跟水果近 — 這就是 embedding 學到的語意結構。</p>`;
  }

  svg.addEventListener("click", e => {
    const g = e.target.closest("[data-i]");
    if (g) pick(+g.dataset.i);
  });
  pick(5); /* 預設選「貓」 */
}

/* ================= CAPSTONE ================= */
function renderCapstone() {
  const done = doneCount(), total = STAGES.length;
  const all = done === total;
  const today = new Date().toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });

  const checklist = STAGES.map(s => `
    <a class="check-item ${isDone(s.id) ? "done" : ""}" href="#/stage/${s.id}">
      <span class="ck">${isDone(s.id) ? "✓" : "○"}</span>
      <span><b>${s.emoji} 第 ${s.id} 站 ${s.title}</b><br/><span class="muted">${s.contribution}</span></span>
    </a>`).join("");

  const progressBlock = all ? "" : `
    <div class="callout connect" style="margin-top:30px">
      <div class="callout-title">📊 目前進度:${done} / ${total}</div>
      還差 ${total - done} 站就能領取結業證書。${done === 0
        ? `從<a href="#/stage/1">第一站 Python</a> 開始吧!`
        : `下一站:<a href="#/stage/${stageById(firstIncomplete().id).id}">${firstIncomplete().emoji} ${firstIncomplete().title}</a>`}
    </div>`;

  const certificate = all ? `
    <div class="certificate" id="certSection">
      <div class="cert-frame"><div class="cert-inner">
        <div class="cert-top">🏆 AI ENGINEER ROADMAP 2026 · 結業證書</div>
        <h2 id="certName">${esc(state.name || "你的名字")}</h2>
        <p>已完成全部 ${total} 站學習旅程,成功打造並上線畢業專案
          <b>「DocMind 智慧文件助理」</b> — 具備 RAG 知識檢索、Agent 工具呼叫與雲端部署的完整 AI 應用。</p>
        <div class="cert-foot"><span>📅 ${today}</span><span>AI Engineer ✦ 解鎖</span></div>
      </div></div>
      <div class="cert-tools">
        <input id="nameInput" placeholder="輸入你的名字" value="${esc(state.name || "")}" maxlength="24" />
        <button class="btn secondary" id="printCert" type="button">🖨️ 列印 / 存成 PDF</button>
      </div>
    </div>` : `
    <div class="certificate" style="opacity:.55">
      <div class="cert-frame"><div class="cert-inner">
        <div class="cert-top">🔒 結業證書 · 尚未解鎖</div>
        <h2>?</h2>
        <p>完成全部 ${total} 站後,這裡會出現你的專屬結業證書。</p>
      </div></div>
    </div>`;

  app.innerHTML = `
  <div class="container">
    <p class="crumb"><a href="#/">🗺️ 路線圖</a> / <b>🚀 畢業專案 DocMind</b></p>
    <header class="stage-hero">
      <div class="stage-hero-top"><span class="stage-emoji">🚀</span>
        <div>
          <div class="stage-kicker">CAPSTONE PROJECT</div>
          <h1 class="stage-title">DocMind 智慧文件助理</h1>
          <p class="stage-tagline">${total} 站積木,拼成一個真正能上線的 AI 產品。</p>
        </div>
      </div>
      <div class="meta-chips">
        <span class="chip">🎯 RAG 問答 + 來源標註</span>
        <span class="chip">🛠️ Agent 工具呼叫</span>
        <span class="chip">🐳 Docker 雲端部署</span>
      </div>
    </header>

    <h2 class="block-title">🏗️ DocMind 的完整架構</h2>
    <div class="arch">
      <div class="arch-row">
        <div class="arch-box">🖥️ 使用者<small>網頁聊天介面</small></div>
        <div class="arch-arrow">⇄</div>
        <div class="arch-box">⚡ FastAPI 後端<small>REST API · 第 11 站</small></div>
      </div>
      <div class="arch-row"><div class="arch-arrow">⇣</div></div>
      <div class="arch-docker">
        <span class="docker-label">🐳 Docker 容器 · 部署於雲端</span>
        <div class="arch-grid">
          <div class="arch-box">📚 RAG 管線<small>切塊 → 向量化 → 檢索 · 第 8 站</small></div>
          <div class="arch-box">🧩 向量資料庫<small>Chroma · 語意搜尋 · 第 9 站</small></div>
          <div class="arch-box">🤖 Agent 工具層<small>Function Calling / MCP · 第 10 站</small></div>
          <div class="arch-box">💾 SQL 資料庫<small>文件與對話紀錄 · 第 3 站</small></div>
          <div class="arch-box">🧠 LLM API<small>溫度 / 提示詞設計 · 第 6–7 站</small></div>
          <div class="arch-box">📊 評估與監控<small>Evals · 觀測指標 · 第 4、12 站</small></div>
        </div>
      </div>
    </div>

    <h2 class="block-title">✅ ${total} 站積木檢查清單</h2>
    <div class="cap-check">${checklist}</div>
    ${progressBlock}

    <h2 class="block-title">${all ? "🎓 恭喜畢業!" : "🎓 結業證書"}</h2>
    ${certificate}
  </div>`;

  const nameInput = $("#nameInput");
  if (nameInput) {
    nameInput.addEventListener("input", () => {
      state.name = nameInput.value; save();
      $("#certName").textContent = state.name || "你的名字";
    });
    $("#printCert").addEventListener("click", () => window.print());
  }
}

/* ================= router ================= */
function route() {
  const h = location.hash || "#/";
  const m = h.match(/^#\/stage\/(\d+)/);
  if (h.startsWith("#/capstone")) renderCapstone();
  else if (m) {
    const maxId = STAGES[STAGES.length - 1].id;
    renderStage(Math.min(maxId, Math.max(1, +m[1])));
  }
  else renderHome();
  window.scrollTo(0, 0);
  updateRing();
}

window.addEventListener("hashchange", route);
$("#resetBtn").addEventListener("click", () => {
  if (confirm("確定要重置所有學習進度嗎?此操作無法復原。")) {
    state = {}; save(); route();
  }
});
route();
})();
