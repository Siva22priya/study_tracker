import { useState, useEffect, useCallback } from "react";

const COLORS = {
  gate: "#7c6ff7",
  nic: "#34d399",
  placement: "#f59e0b",
  aptitude: "#f472b6",
  bg: "#0d0d14",
  surface: "#13131f",
  surface2: "#1c1c2e",
  border: "#2a2a3d",
  text: "#e2e2f0",
  muted: "#5c5c78",
};

const PHASES = [
  {
    id: 1, label: "Phase 1", title: "Foundation", range: "Mar–Jun 2026", color: COLORS.gate,
    months: [
      { name: "March", year: "2026", gate: "Engg. Maths — Linear Algebra, Calculus", nic: "DSA: Arrays, Strings, Linked Lists", placement: "LeetCode Easy — 1/day", apt: "Number System, Basic Arithmetic" },
      { name: "April", year: "2026", gate: "Discrete Maths — Logic, Sets, Graphs", nic: "DSA: Stacks, Queues, Trees, BST", placement: "LeetCode Easy — 1–2/day", apt: "Percentage, Ratio, Time-Speed-Work" },
      { name: "May", year: "2026", gate: "Probability & Statistics", nic: "DSA: Heaps, Hashing, Graphs (BFS/DFS)", placement: "LeetCode Easy-Medium. Pattern recognition", apt: "Verbal: Reading comprehension, grammar" },
      { name: "June", year: "2026", gate: "Algorithms — Sorting, Divide & Conquer", nic: "DSA: DP intro, Greedy basics", placement: "LeetCode Medium — 2/day. Codeforces", apt: "Logical Reasoning — Syllogisms, Blood Relations" },
    ]
  },
  {
    id: 2, label: "Phase 2", title: "Core Deep Dive", range: "Jul–Oct 2026", color: COLORS.nic,
    months: [
      { name: "July", year: "2026", gate: "Algorithms — Graph Algos, DP, NP theory. 1st PYQ paper.", nic: "OS — Processes, Scheduling, Deadlocks", placement: "Resume ready. LeetCode 75 list.", apt: "Mock aptitude tests weekly" },
      { name: "August", year: "2026", gate: "OS — Memory mgmt, File systems, Virtual memory", nic: "OS complete. DBMS — ER model, Relational Algebra", placement: "Active placement season — prioritise interviews", apt: "Current Affairs — daily 20 min" },
      { name: "September", year: "2026", gate: "DBMS — Normalization, Transactions, SQL, Indexing", nic: "DBMS complete. CN — OSI, TCP/IP", placement: "GATE registration opens — REGISTER", apt: "Quant mocks — target 85%+ accuracy" },
      { name: "October", year: "2026", gate: "CN — Routing, Congestion, App Layer", nic: "CN complete. Cybersecurity basics", placement: "Placement wrap-up. If placed: 100% GATE+NIC", apt: "Verbal reasoning — para jumbles, critical reasoning" },
    ]
  },
  {
    id: 3, label: "Phase 3", title: "Intensive", range: "Nov–Dec 2026", color: COLORS.placement,
    months: [
      { name: "November", year: "2026", gate: "TOC — DFA, NFA, CFG. COA — Pipelining, Cache", nic: "Full CS core revision. 2 NIC paper attempts", placement: "Minimal — urgent interviews only", apt: "Full GA mock — combined Quant+Verbal+Reasoning" },
      { name: "December", year: "2026", gate: "Compiler Design. Digital Logic. Full syllabus done!", nic: "Software Engg, IT Act basics, Govt tech systems", placement: "Freeze", apt: "Daily GA revision — static GK + current affairs" },
    ]
  },
  {
    id: 4, label: "Phase 4", title: "Final Sprint", range: "Jan–Feb 2027", color: COLORS.aptitude,
    months: [
      { name: "January", year: "2027", gate: "3 full GATE mocks/week. High-weightage revision.", nic: "Light NIC revision — no new topics", placement: "Freeze", apt: "GA rapid fire: current affairs + static GK" },
      { name: "February", year: "2027", gate: "GATE 2027 EXAM. Last 2 weeks: only revision + PYQs.", nic: "Post GATE: Start NIC application tracking", placement: "Freeze", apt: "Last week: GA rapid revision only" },
    ]
  },
];

const MILESTONES = [
  { id: "m1", date: "Mar 2026", event: "Prep Begins", note: "Start DSA + Maths + Aptitude from zero", color: COLORS.gate },
  { id: "m2", date: "Jul 2026", event: "First Mock Test", note: "Attempt 1st GATE PYQ — assess baseline", color: COLORS.gate },
  { id: "m3", date: "Aug 2026", event: "Placement Season", note: "On-campus drives begin", color: COLORS.placement },
  { id: "m4", date: "Sep 2026", event: "GATE Registration", note: "Don't miss the form deadline!", color: COLORS.aptitude },
  { id: "m5", date: "Nov 2026", event: "Full Syllabus Done", note: "All GATE subjects covered once", color: COLORS.nic },
  { id: "m6", date: "Feb 2027", event: "GATE 2027 Exam", note: "The main event — your NIC ticket", color: COLORS.aptitude },
  { id: "m7", date: "May 2027", event: "BTech Complete", note: "Eligible for NIC Scientist-B", color: COLORS.nic },
];

const SUBJECTS = [
  { id: "dsa", name: "DSA & Algorithms", color: COLORS.gate },
  { id: "os", name: "Operating Systems", color: COLORS.nic },
  { id: "dbms", name: "DBMS", color: COLORS.nic },
  { id: "cn", name: "Computer Networks", color: COLORS.nic },
  { id: "maths", name: "Engg. Mathematics", color: COLORS.gate },
  { id: "toc", name: "TOC", color: COLORS.gate },
  { id: "coa", name: "COA", color: COLORS.gate },
  { id: "compiler", name: "Compiler Design", color: COLORS.gate },
  { id: "aptitude", name: "Aptitude / GA", color: COLORS.aptitude },
  { id: "leetcode", name: "LeetCode", color: COLORS.placement },
];

const WEEK_DAYS_P1 = [
  { day: "Mon", theme: "GATE Maths", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Flashcards from previous day — formulae, concepts", color: COLORS.aptitude }, { time: "5–7 PM", subject: "Engineering Mathematics", detail: "Linear Algebra / Calculus / Probability — theory + problems", color: COLORS.gate }] },
  { day: "Tue", theme: "DSA + LeetCode", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Arithmetic problems — 10 quick Quant questions", color: COLORS.aptitude }, { time: "5–7 PM", subject: "Data Structures", detail: "Arrays / Linked Lists / Trees — new concept + 1 LeetCode easy", color: COLORS.placement }] },
  { day: "Wed", theme: "GATE Maths + Verbal", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Newspaper 20 min + GK app 10 min", color: COLORS.aptitude }, { time: "5–7 PM", subject: "Discrete Maths", detail: "Logic / Set Theory / Graph Theory", color: COLORS.gate }] },
  { day: "Thu", theme: "DSA + LeetCode", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Logical Reasoning — 10 quick questions", color: COLORS.aptitude }, { time: "5–7 PM", subject: "Algorithms", detail: "Sorting / Searching / Recursion + 1 LeetCode problem", color: COLORS.placement }] },
  { day: "Fri", theme: "CS Core", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Review week's notes — 30 min flashcards + 30 min GK", color: COLORS.aptitude }, { time: "5–7 PM", subject: "OS / DBMS / CN", detail: "Theory chapter — rotate subject each week", color: COLORS.nic }] },
  { day: "Sat", theme: "Long Study Day", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Full week rapid recap — 1 hr", color: COLORS.aptitude }, { time: "5–7 PM", subject: "GATE Subject Deep Dive", detail: "2 hrs on current week's GATE topic — problems focused", color: COLORS.gate }, { time: "7–8 PM", subject: "LeetCode Session", detail: "2–3 problems — medium level", color: COLORS.placement }, { time: "9–10 PM", subject: "Full Aptitude Mock", detail: "30-question timed test — Quant + Verbal + Reasoning", color: COLORS.aptitude }] },
  { day: "Sun", theme: "Review + Rest", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Weekly error notebook review — 1 hr", color: COLORS.nic }, { time: "5–6 PM", subject: "Weekly Review", detail: "Go through errors — don't study new topics", color: COLORS.nic }, { time: "Rest", subject: "Planned Rest", detail: "Recovery is part of the plan. Don't skip it.", color: COLORS.muted }] },
];

const WEEK_DAYS_P23 = [
  { day: "Mon", theme: "GATE Core", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Flashcards + current affairs. 1 hr.", color: COLORS.aptitude }, { time: "5–8 PM", subject: "GATE Subject — Theory", detail: "OS / DBMS / CN / TOC — 3 hrs deep study with notes", color: COLORS.gate }, { time: "8–11 PM", subject: "GATE Subject — Problems", detail: "Previous year questions on same topic. 3 hrs.", color: COLORS.gate }, { time: "11 PM–1 AM", subject: "LeetCode", detail: "2–3 medium problems. 2 hrs.", color: COLORS.placement }] },
  { day: "Tue", theme: "DSA + Algorithms", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Today's errors + current affairs", color: COLORS.aptitude }, { time: "5–8 PM", subject: "DSA Theory", detail: "Advanced DS — Segment Trees, Tries, Disjoint Sets", color: COLORS.placement }, { time: "8–11 PM", subject: "LeetCode + GATE Algos", detail: "3 medium-hard problems + GATE algo PYQs", color: COLORS.placement }, { time: "11 PM–1 AM", subject: "Aptitude", detail: "Quant + Verbal — timed practice. 2 hrs.", color: COLORS.aptitude }] },
  { day: "Wed", theme: "GATE Core", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Flashcards + GK", color: COLORS.aptitude }, { time: "5–8 PM", subject: "GATE Subject — New Chapter", detail: "Continue from Monday's subject or next subject", color: COLORS.gate }, { time: "8–11 PM", subject: "GATE PYQ Practice", detail: "Topic-wise previous year questions — timed", color: COLORS.gate }, { time: "11 PM–1 AM", subject: "LeetCode", detail: "2–3 problems focused on current DSA topic", color: COLORS.placement }] },
  { day: "Thu", theme: "NIC-Specific", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Weekly current affairs consolidation", color: COLORS.aptitude }, { time: "5–8 PM", subject: "NIC Technical Topics", detail: "Cybersecurity / Software Engg. / IT systems / Networking", color: COLORS.nic }, { time: "8–11 PM", subject: "GATE Engg. Maths", detail: "Probability, Statistics, Linear Algebra problems", color: COLORS.gate }, { time: "11 PM–1 AM", subject: "Full Aptitude Mock", detail: "45-min timed mock — analyse thoroughly after", color: COLORS.aptitude }] },
  { day: "Fri", theme: "GATE Core", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Full week flashcard revision — 1 hr", color: COLORS.aptitude }, { time: "5–8 PM", subject: "GATE Subject — Completion", detail: "Wrap up the week's GATE subject", color: COLORS.gate }, { time: "8–11 PM", subject: "LeetCode Contest Prep", detail: "3 problems timed — simulate interview pressure", color: COLORS.placement }, { time: "11 PM–1 AM", subject: "Week's Weak Areas", detail: "Revisit topics where mistakes were made this week", color: COLORS.gate }] },
  { day: "Sat", theme: "Mock Test Day", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Current affairs + static GK", color: COLORS.aptitude }, { time: "5–8 PM", subject: "GATE Full Mock", detail: "Strictly timed. No distractions. Treat like real exam.", color: COLORS.gate }, { time: "8–10 PM", subject: "Mock Analysis", detail: "Every wrong answer reviewed. Note patterns.", color: COLORS.gate }, { time: "10 PM–1 AM", subject: "LeetCode Weekly Contest", detail: "Participate in real LeetCode contest — placement simulation", color: COLORS.placement }] },
  { day: "Sun", theme: "Light + Plan", slots: [{ time: "7–8 AM", subject: "Morning Revision", detail: "Weekly error notebook review — 1 hr", color: COLORS.nic }, { time: "5–7 PM", subject: "Error Notebook Review", detail: "Go through all errors. Don't add new topics.", color: COLORS.nic }, { time: "7–8 PM", subject: "Next Week Planning", detail: "Map topics, set LeetCode targets, update notes", color: COLORS.gate }, { time: "Rest", subject: "Mandatory Rest", detail: "Sleep, walk, eat well. Your brain needs it.", color: COLORS.muted }] },
];

const RESOURCES = [
  { title: "GATE — Books", color: COLORS.gate, items: ["DSA → Cormen (CLRS)", "OS → Galvin", "DBMS → Korth", "CN → Tanenbaum / Forouzan", "TOC → Ullman", "Maths → Rosen (Discrete)", "COA → Hamacher"] },
  { title: "GATE — Online / Free", color: COLORS.gate, items: ["NPTEL (IIT faculty lectures)", "GO Classes (YouTube)", "GateSmashers (YouTube)", "GATECSE.in (PYQ practice)", "GeeksforGeeks GATE section", "Made Easy / ACE test series"] },
  { title: "Placements — DSA", color: COLORS.placement, items: ["LeetCode (primary platform)", "Striver's A2Z DSA Sheet", "NeetCode 150 list", "Codeforces (Div 2 A/B)", "InterviewBit", "Apna College (YouTube)"] },
  { title: "NIC Specific", color: COLORS.nic, items: ["NIC official website (nic.in)", "NIELIT previous papers", "Cybersecurity basics — NPTEL", "IT Act 2000 summary", "Government digital services — MyGov"] },
  { title: "Aptitude (GA)", color: COLORS.aptitude, items: ["RS Aggarwal — Quantitative", "Arun Sharma — Verbal Ability", "GKToday app — current affairs", "Testbook mock tests (free)", "The Hindu — daily newspaper"] },
  { title: "Tracking Tools", color: "#e879f9", items: ["Notion — topic tracker + error log", "Anki — flashcards for revision", "LeetCode — progress dashboard", "Google Calendar — daily schedule"] },
];

const DEFAULT_STORAGE = {
  hoursLog: {},
  topicsCompleted: {},
  mockScores: [],
  leetcodeCount: 0,
  milestonesDone: {},
};

function useStorage() {
  const [data, setData] = useState(DEFAULT_STORAGE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studytracker_v1");
      if (saved) setData(JSON.parse(saved));
    } catch (_) {}
  }, []);

  const save = useCallback(async (next) => {
    setData(next);
    try {
      localStorage.setItem("studytracker_v1", JSON.stringify(next));
    } catch (_) {}
  }, []);

  return [data, save];
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

const today = new Date();
const todayKey = today.toISOString().slice(0, 10);
const weekKeys = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today); d.setDate(d.getDate() - i);
  return d.toISOString().slice(0, 10);
}).reverse();

export default function App() {
  const [data, save] = useStorage();
  const [tab, setTab] = useState("dashboard");
  const [ttPhase, setTtPhase] = useState("p1");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [mockInput, setMockInput] = useState({ subject: "GATE", score: "", total: "100" });
  const [hoursInput, setHoursInput] = useState("");

  const totalHours = Object.values(data.hoursLog).reduce((a, b) => a + (b || 0), 0);
  const weekHours = weekKeys.reduce((s, k) => s + (data.hoursLog[k] || 0), 0);
  const totalTopics = Object.values(data.topicsCompleted).filter(Boolean).length;
  const avgScore = data.mockScores.length ? Math.round(data.mockScores.reduce((s, m) => s + (m.score / m.total) * 100, 0) / data.mockScores.length) : 0;
  const milestoneDoneCount = Object.values(data.milestonesDone).filter(Boolean).length;

  const logHours = () => {
    const h = parseFloat(hoursInput);
    if (isNaN(h) || h <= 0) return;
    const next = { ...data, hoursLog: { ...data.hoursLog, [todayKey]: (data.hoursLog[todayKey] || 0) + h } };
    save(next); setHoursInput("");
  };

  const toggleTopic = (id) => {
    save({ ...data, topicsCompleted: { ...data.topicsCompleted, [id]: !data.topicsCompleted[id] } });
  };

  const addMock = () => {
    const s = parseFloat(mockInput.score), t = parseFloat(mockInput.total);
    if (isNaN(s) || isNaN(t) || t <= 0) return;
    save({ ...data, mockScores: [...data.mockScores, { subject: mockInput.subject, score: s, total: t, date: todayKey }] });
    setMockInput({ subject: "GATE", score: "", total: "100" });
  };

  const setLeetcode = (v) => save({ ...data, leetcodeCount: Math.max(0, v) });

  const toggleMilestone = (id) => {
    save({ ...data, milestonesDone: { ...data.milestonesDone, [id]: !data.milestonesDone[id] } });
  };

  const tabs = ["dashboard", "plan", "timetable", "resources"];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:${COLORS.bg}}
        ::-webkit-scrollbar-thumb{background:${COLORS.border};border-radius:4px}
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
      `}</style>

      {/* HERO */}
      <div style={{ padding: "40px 28px 28px", background: `radial-gradient(ellipse at 15% 60%, rgba(${hexToRgb(COLORS.gate)},0.12) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(${hexToRgb(COLORS.nic)},0.08) 0%, transparent 45%)`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: COLORS.gate, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", marginBottom: 10 }}>// CSE Final Year · GATE 2027 + NIC Scientist-B + Placements</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px,5vw,42px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 8px" }}>
          <span style={{ color: COLORS.gate }}>GATE</span> + <span style={{ color: COLORS.nic }}>NIC</span> + <span style={{ color: COLORS.placement }}>Placements</span><br />Study Tracker
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 13, margin: 0 }}>Mar 2026 → Feb 2027 · 8 hrs/day + 1 hr revision · Karnataka, India</p>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface, padding: "0 20px", overflowX: "auto", position: "sticky", top: 0, zIndex: 50 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "14px 20px", background: "none", border: "none", borderBottom: `2px solid ${tab === t ? COLORS.gate : "transparent"}`, color: tab === t ? COLORS.gate : COLORS.muted, fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: "28px 20px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <div>
            {/* STAT CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Total Hours", value: totalHours.toFixed(1), color: COLORS.gate, sub: "logged" },
                { label: "This Week", value: weekHours.toFixed(1), color: COLORS.nic, sub: "hours" },
                { label: "Topics Done", value: `${totalTopics}/${SUBJECTS.length}`, color: COLORS.placement, sub: "subjects" },
                { label: "LeetCode", value: data.leetcodeCount, color: COLORS.aptitude, sub: "problems" },
                { label: "Mock Tests", value: data.mockScores.length, color: COLORS.gate, sub: "attempted" },
                { label: "Avg Score", value: data.mockScores.length ? `${avgScore}%` : "—", color: COLORS.nic, sub: "mock avg" },
                { label: "Milestones", value: `${milestoneDoneCount}/${MILESTONES.length}`, color: COLORS.aptitude, sub: "achieved" },
              ].map(({ label, value, color, sub }) => (
                <div key={label} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "18px 16px" }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'DM Mono',monospace", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 28, fontFamily: "'Syne',sans-serif", fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>

              {/* LOG HOURS */}
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 22 }}>
                <div style={{ fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>Log Today's Hours</div>
                <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginBottom: 10 }}>{todayKey} · today logged: {(data.hoursLog[todayKey] || 0).toFixed(1)} hrs</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={hoursInput} onChange={e => setHoursInput(e.target.value)} type="number" min="0" max="12" step="0.5" placeholder="hrs studied" style={{ flex: 1, background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 12px", color: COLORS.text, fontSize: 14, outline: "none" }} onKeyDown={e => e.key === "Enter" && logHours()} />
                  <button onClick={logHours} style={{ background: COLORS.gate, border: "none", borderRadius: 8, padding: "10px 18px", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Log</button>
                </div>
                {/* WEEK BAR */}
                <div style={{ marginTop: 18 }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginBottom: 8 }}>Last 7 days</div>
                  <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 50 }}>
                    {weekKeys.map(k => {
                      const h = data.hoursLog[k] || 0;
                      const max = Math.max(...weekKeys.map(k2 => data.hoursLog[k2] || 0), 1);
                      return (
                        <div key={k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                          <div style={{ width: "100%", height: `${Math.round((h / max) * 42)}px`, background: k === todayKey ? COLORS.gate : COLORS.border, borderRadius: 3, minHeight: 3, transition: "height .3s" }} />
                          <div style={{ fontSize: 9, color: COLORS.muted, fontFamily: "'DM Mono',monospace" }}>{k.slice(8)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* LEET CODE */}
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 22 }}>
                <div style={{ fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>LeetCode Problems</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <button onClick={() => setLeetcode(data.leetcodeCount - 1)} style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.surface2, border: `1px solid ${COLORS.border}`, color: COLORS.text, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <div style={{ fontSize: 40, fontFamily: "'Syne',sans-serif", fontWeight: 800, color: COLORS.aptitude, flex: 1, textAlign: "center" }}>{data.leetcodeCount}</div>
                  <button onClick={() => setLeetcode(data.leetcodeCount + 1)} style={{ width: 36, height: 36, borderRadius: 8, background: COLORS.aptitude, border: "none", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
                <div style={{ background: COLORS.surface2, borderRadius: 8, height: 8, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min((data.leetcodeCount / 450) * 100, 100)}%`, background: COLORS.aptitude, borderRadius: 8, transition: "width .4s" }} />
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginTop: 6 }}>{data.leetcodeCount} / 450 target (NeetCode 150 + extra)</div>
              </div>

              {/* MOCK SCORES */}
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 22 }}>
                <div style={{ fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>Mock Test Scores</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <select value={mockInput.subject} onChange={e => setMockInput({ ...mockInput, subject: e.target.value })} style={{ background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 10px", color: COLORS.text, fontSize: 12 }}>
                    {["GATE", "NIC", "Aptitude", "Sectional"].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <input value={mockInput.score} onChange={e => setMockInput({ ...mockInput, score: e.target.value })} type="number" placeholder="score" style={{ flex: 1, background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 10px", color: COLORS.text, fontSize: 13, outline: "none" }} />
                  <span style={{ color: COLORS.muted, alignSelf: "center", fontSize: 13 }}>/</span>
                  <input value={mockInput.total} onChange={e => setMockInput({ ...mockInput, total: e.target.value })} type="number" placeholder="100" style={{ width: 60, background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 10px", color: COLORS.text, fontSize: 13, outline: "none" }} />
                  <button onClick={addMock} style={{ background: COLORS.gate, border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 12, cursor: "pointer" }}>Add</button>
                </div>
                <div style={{ maxHeight: 160, overflowY: "auto" }}>
                  {data.mockScores.length === 0 && <div style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'DM Mono',monospace" }}>No mocks logged yet</div>}
                  {[...data.mockScores].reverse().map((m, i) => {
                    const pct = Math.round((m.score / m.total) * 100);
                    const c = pct >= 70 ? COLORS.nic : pct >= 50 ? COLORS.placement : COLORS.aptitude;
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                        <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", background: `rgba(${hexToRgb(c)},0.15)`, color: c, padding: "2px 8px", borderRadius: 4 }}>{m.subject}</span>
                        <span style={{ flex: 1, fontSize: 12, color: COLORS.text }}>{m.score}/{m.total}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: c, fontFamily: "'Syne',sans-serif" }}>{pct}%</span>
                        <span style={{ fontSize: 10, color: COLORS.muted, fontFamily: "'DM Mono',monospace" }}>{m.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TOPICS */}
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 22 }}>
                <div style={{ fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 4 }}>Subjects Progress</div>
                <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginBottom: 14 }}>{totalTopics}/{SUBJECTS.length} completed</div>
                <div style={{ background: COLORS.surface2, borderRadius: 6, height: 6, marginBottom: 16, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.round((totalTopics / SUBJECTS.length) * 100)}%`, background: COLORS.nic, borderRadius: 6, transition: "width .4s" }} />
                </div>
                {SUBJECTS.map(s => (
                  <label key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
                    <div onClick={() => toggleTopic(s.id)} style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${data.topicsCompleted[s.id] ? s.color : COLORS.border}`, background: data.topicsCompleted[s.id] ? `rgba(${hexToRgb(s.color)},0.2)` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all .2s" }}>
                      {data.topicsCompleted[s.id] && <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />}
                    </div>
                    <span style={{ fontSize: 13, color: data.topicsCompleted[s.id] ? COLORS.muted : COLORS.text, textDecoration: data.topicsCompleted[s.id] ? "line-through" : "none", transition: "all .2s" }}>{s.name}</span>
                    <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "'DM Mono',monospace", color: s.color, background: `rgba(${hexToRgb(s.color)},0.12)`, padding: "2px 8px", borderRadius: 4 }}>{["DSA & Algorithms", "LeetCode"].includes(s.name) ? "P" : s.name === "Aptitude / GA" ? "P" : "GATE"}</span>
                  </label>
                ))}
              </div>

              {/* MILESTONES */}
              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 22, gridColumn: "1/-1" }}>
                <div style={{ fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 4 }}>Milestones</div>
                <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginBottom: 18 }}>{milestoneDoneCount}/{MILESTONES.length} achieved · check off as you hit them</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
                  {MILESTONES.map(m => {
                    const done = !!data.milestonesDone[m.id];
                    return (
                      <div key={m.id} onClick={() => toggleMilestone(m.id)} style={{ border: `1px solid ${done ? m.color : COLORS.border}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", background: done ? `rgba(${hexToRgb(m.color)},0.08)` : COLORS.surface2, transition: "all .2s", opacity: done ? 1 : 0.85 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: m.color }}>{m.date}</span>
                          <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${done ? m.color : COLORS.border}`, background: done ? m.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {done && <span style={{ fontSize: 9, color: "#fff" }}>✓</span>}
                          </div>
                        </div>
                        <div style={{ fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 3, color: done ? COLORS.text : COLORS.muted }}>{m.event}</div>
                        <div style={{ fontSize: 11, color: COLORS.muted }}>{m.note}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── LONG TERM PLAN ── */}
        {tab === "plan" && (
          <div>
            <div style={{ fontSize: 22, fontFamily: "'Syne',sans-serif", fontWeight: 800, marginBottom: 4 }}>Month-wise Plan</div>
            <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginBottom: 24 }}>// Mar 2026 → Feb 2027 · 4 phases · click to expand</div>
            {PHASES.map(ph => {
              const open = expandedPhase === ph.id;
              return (
                <div key={ph.id} style={{ marginBottom: 16, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden", background: COLORS.surface }}>
                  <div onClick={() => setExpandedPhase(open ? null : ph.id)} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", cursor: "pointer", transition: "background .2s" }}>
                    <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: COLORS.muted, minWidth: 60 }}>{ph.label}</div>
                    <div style={{ fontSize: 17, fontFamily: "'Syne',sans-serif", fontWeight: 700, flex: 1 }}>{ph.title}</div>
                    <div style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", padding: "4px 12px", borderRadius: 20, background: `rgba(${hexToRgb(ph.color)},0.15)`, color: ph.color }}>{ph.range}</div>
                    <div style={{ color: COLORS.muted, fontSize: 18, transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .3s" }}>⌄</div>
                  </div>
                  {open && (
                    <div>
                      <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr 1fr", background: COLORS.surface2, borderTop: `1px solid ${COLORS.border}` }}>
                        {["Month", "GATE Focus", "NIC / CS Core", "Placement", "Aptitude"].map((h, i) => (
                          <div key={h} style={{ padding: "8px 14px", fontSize: 10, fontFamily: "'DM Mono',monospace", letterSpacing: 1, textTransform: "uppercase", borderRight: i < 4 ? `1px solid ${COLORS.border}` : "none", color: [COLORS.muted, COLORS.gate, COLORS.nic, COLORS.placement, COLORS.aptitude][i] }}>{h}</div>
                        ))}
                      </div>
                      {ph.months.map((m, i) => (
                        <div key={m.name} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr 1fr", borderTop: `1px solid ${COLORS.border}` }}>
                          <div style={{ padding: "14px 14px", borderRight: `1px solid ${COLORS.border}` }}>
                            <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Syne',sans-serif" }}>{m.name}</div>
                            <div style={{ fontSize: 10, color: COLORS.muted, fontFamily: "'DM Mono',monospace" }}>{m.year}</div>
                          </div>
                          {[m.gate, m.nic, m.placement, m.apt].map((txt, j) => (
                            <div key={j} style={{ padding: "14px 14px", fontSize: 12, color: COLORS.muted, borderRight: j < 3 ? `1px solid ${COLORS.border}` : "none", lineHeight: 1.5 }}>{txt}</div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* SUBJECT PRIORITY TABLE */}
            <div style={{ marginTop: 24, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden", background: COLORS.surface }}>
              <div style={{ padding: "18px 22px", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 16, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>Subject Priority Matrix</div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: COLORS.surface2 }}>
                      {["Subject", "GATE Weight", "NIC Relevance", "Placement Use", "Priority"].map((h, i) => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: 1, fontWeight: 400, color: [COLORS.muted, COLORS.gate, COLORS.nic, COLORS.placement, COLORS.aptitude][i], borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["DSA", "12–13 marks", "Very High", "Critical (LeetCode)", "★★★★★"],
                      ["Algorithms", "8–9 marks", "High", "High", "★★★★★"],
                      ["OS", "7–8 marks", "Very High", "Medium", "★★★★★"],
                      ["DBMS", "7–8 marks", "Very High", "High (SQL)", "★★★★★"],
                      ["CN", "7–8 marks", "Very High", "Medium", "★★★★☆"],
                      ["Engg. Maths", "13 marks", "Low", "Aptitude only", "★★★★☆"],
                      ["TOC", "7–8 marks", "Low", "None", "★★★☆☆"],
                      ["COA", "5–7 marks", "Low", "None", "★★★☆☆"],
                      ["Compiler", "5–6 marks", "None", "None", "★★☆☆☆"],
                      ["Aptitude (GA)", "15 marks", "High", "High", "★★★★★"],
                    ].map(([subj, gate, nic, place, pri]) => (
                      <tr key={subj} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                        <td style={{ padding: "12px 14px", fontWeight: 500, color: COLORS.text }}>{subj}</td>
                        <td style={{ padding: "12px 14px", color: COLORS.gate }}>{gate}</td>
                        <td style={{ padding: "12px 14px", color: nic === "Very High" || nic === "High" ? COLORS.nic : COLORS.muted }}>{nic}</td>
                        <td style={{ padding: "12px 14px", color: place.includes("Critical") || place === "High" || place.includes("High") ? COLORS.placement : COLORS.muted }}>{place}</td>
                        <td style={{ padding: "12px 14px", color: COLORS.aptitude, fontFamily: "'DM Mono',monospace", fontSize: 11 }}>{pri}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TIMETABLE ── */}
        {tab === "timetable" && (
          <div>
            <div style={{ fontSize: 22, fontFamily: "'Syne',sans-serif", fontWeight: 800, marginBottom: 4 }}>Weekly Timetable</div>
            <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginBottom: 20 }}>// 7–8 AM revision + 5 PM–1 AM study · 9 hrs total daily</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[["p1", "Phase 1 (Mar–Jun 2026)", "Light · 1–2 hrs/day"], ["p23", "Phase 2–3 (Jul–Dec 2026)", "Full · 8+1 hrs/day"]].map(([id, label, sub]) => (
                <button key={id} onClick={() => setTtPhase(id)} style={{ padding: "10px 18px", borderRadius: 10, border: `1px solid ${ttPhase === id ? COLORS.gate : COLORS.border}`, background: ttPhase === id ? `rgba(${hexToRgb(COLORS.gate)},0.12)` : COLORS.surface, color: ttPhase === id ? COLORS.gate : COLORS.muted, cursor: "pointer", fontSize: 12, textAlign: "left" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace" }}>{sub}</div>
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
              {(ttPhase === "p1" ? WEEK_DAYS_P1 : WEEK_DAYS_P23).map(d => (
                <div key={d.day} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 18 }}>
                  <div style={{ fontSize: 16, fontFamily: "'Syne',sans-serif", fontWeight: 800, marginBottom: 2 }}>{d.day}</div>
                  <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>{d.theme}</div>
                  {d.slots.map((sl, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, padding: "10px 12px", borderRadius: 8, background: COLORS.surface2 }}>
                      <div style={{ width: 3, borderRadius: 3, background: sl.color, alignSelf: "stretch", minHeight: 30, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginBottom: 3 }}>{sl.time}</div>
                        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{sl.subject}</div>
                        <div style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.4 }}>{sl.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* GOLDEN RULES */}
            <div style={{ marginTop: 24, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden", background: COLORS.surface }}>
              <div style={{ padding: "18px 22px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 16, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>The Golden Rules</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 1 }}>
                {[
                  { title: "Consistency > Intensity", detail: "1 hour every day beats 7 hours once a week.", color: COLORS.gate },
                  { title: "Analyse Every Mock", detail: "A mock you don't review is wasted time. Review is the prep.", color: COLORS.nic },
                  { title: "Keep an Error Notebook", detail: "Every mistake: written down + reason + correct approach.", color: COLORS.placement },
                  { title: "No New Topics in Jan 2027", detail: "January is revision only. New topics = self-sabotage.", color: COLORS.aptitude },
                  { title: "GATE Score = NIC Ticket", detail: "Treat GATE as primary. NIC + PSUs + MTech all follow.", color: COLORS.gate },
                  { title: "Sunday is Sacred", detail: "Rest is not laziness. Sleep improves retention. Protect it.", color: COLORS.nic },
                ].map(r => (
                  <div key={r.title} style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, background: `rgba(${hexToRgb(r.color)},0.04)` }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: r.color, marginBottom: 4 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.5 }}>{r.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RESOURCES ── */}
        {tab === "resources" && (
          <div>
            <div style={{ fontSize: 22, fontFamily: "'Syne',sans-serif", fontWeight: 800, marginBottom: 4 }}>Resources</div>
            <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Mono',monospace", marginBottom: 24 }}>// free-first approach · quality over quantity</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
              {RESOURCES.map(r => (
                <div key={r.title} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color }} />
                    <div style={{ fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>{r.title}</div>
                  </div>
                  {r.items.map(item => (
                    <div key={item} style={{ fontSize: 12, color: COLORS.muted, padding: "6px 0", borderBottom: `1px solid ${COLORS.border}`, fontFamily: "'DM Mono',monospace" }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* NIC INFO */}
            <div style={{ marginTop: 24, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, background: COLORS.surface }}>
              <div style={{ fontSize: 16, fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16, color: COLORS.nic }}>NIC 2026 — Important Update</div>
              <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.7, marginBottom: 12 }}>
                NIC released an official notification in <strong style={{ color: COLORS.text }}>February 2026</strong> for <strong style={{ color: COLORS.text }}>243 Scientist-B vacancies</strong> (Advt. No. NIC/SCB/2026/1). Selection is based on <strong style={{ color: COLORS.nic }}>GATE scores of 2024, 2025, and 2026</strong>.
              </div>
              <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.7, marginBottom: 12 }}>
                The <strong style={{ color: COLORS.text }}>2026 cycle is NOT for you</strong> — you graduate May 2027. The <strong style={{ color: COLORS.nic }}>2027 cycle</strong> will likely accept GATE 2025, 2026, and <strong style={{ color: COLORS.nic }}>2027 scores</strong>. Writing GATE 2027 makes you perfectly eligible.
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[["nic.in", "NIC Official Site"], ["nielit.gov.in", "NIELIT"], ["gate2027.iitr.ac.in", "GATE 2027"]].map(([url, label]) => (
                  <a key={url} href={`https://${url}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, fontFamily: "'DM Mono',monospace", padding: "6px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.gate, background: `rgba(${hexToRgb(COLORS.gate)},0.08)`, textDecoration: "none" }}>{label} ↗</a>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
