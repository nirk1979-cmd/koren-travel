import React, { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   KOREN AI · AI TRIP BUILDER — Premium 2026 Edition
   Deep-ocean glass aesthetic · Mobile-first · RTL Hebrew
   AI: Anthropic API (claude-sonnet-4-6) · Vision · Progressive plan
   ══════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap');

:root{
  --ink:#0B1E2D;          /* navy-charcoal text */
  --mut:#5E7686;          /* muted */
  --faint:#94A9B6;
  --bg:#F2F7F9;           /* cool porcelain */
  --card:#FFFFFF;
  --line:#E3EDF1;
  --navy:#07263F;         /* deep ocean */
  --ocean:#0B4E6E;
  --teal:#14B0B8;         /* logo teal */
  --teal-ink:#0A7E85;
  --teal-soft:#E4F6F7;
  --amber:#F09A3E;        /* logo amber */
  --amber-deep:#E4832A;
  --amber-soft:#FDF0DF;
  --ok:#18A46C; --warn:#D2603B;
  --r-lg:26px; --r-md:20px; --r-sm:14px;
  --shadow-1:0 1px 2px rgba(11,30,45,.05),0 6px 20px -6px rgba(11,30,45,.10);
  --shadow-2:0 2px 6px rgba(11,30,45,.06),0 18px 44px -12px rgba(7,38,63,.22);
  --glass:rgba(255,255,255,.68);
  --glass-brd:rgba(255,255,255,.55);
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html,body{width:100%;overflow-x:hidden;background:#F2F7F9}
#root{width:100%}
.kt{
  font-family:'Heebo',sans-serif;color:var(--ink);background:var(--bg);
  min-height:100vh;width:100%;max-width:480px;margin:0 auto;position:relative;overflow-x:hidden;
  box-shadow:0 0 60px rgba(7,38,63,.14);
}
.kt h1,.kt h2,.kt .display{font-family:'Heebo',sans-serif;font-weight:800;letter-spacing:-.02em}
.kt button{font-family:'Heebo',sans-serif;cursor:pointer;border:none;background:none;color:inherit}
.kt input,.kt select{font-family:'Heebo',sans-serif;font-size:16px;color:var(--ink)}
.kt ::selection{background:var(--teal-soft)}
.kt :focus-visible{outline:3px solid rgba(20,176,184,.55);outline-offset:2px;border-radius:8px}
.kt svg.ic{width:1em;height:1em;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}

/* ── Motion primitives ─────────────────────────────── */
@keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes riseS{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
@keyframes drift1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-26px,18px) scale(1.12)}}
@keyframes drift2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-14px) scale(1.08)}}
@keyframes breathe{0%,100%{box-shadow:0 10px 30px -6px rgba(240,154,62,.55)}50%{box-shadow:0 10px 44px -2px rgba(240,154,62,.8)}}
@keyframes fly{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(-7deg)}}
@keyframes sh{0%{background-position:130% 0}100%{background-position:-30% 0}}
@keyframes barfill{from{width:0}}
.rise{animation:rise .55s cubic-bezier(.2,.7,.2,1) both}
.riseS{animation:riseS .5s cubic-bezier(.2,.7,.2,1) both}
@media (prefers-reduced-motion: reduce){
  .kt *,.kt *::before,.kt *::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important}
}

/* ── Hero (deep ocean aurora) ──────────────────────── */
.hero{position:relative;overflow:hidden;color:#fff;
  background:linear-gradient(168deg,#051D31 0%,var(--navy) 34%,var(--ocean) 78%,#0E6E86 110%)}
.hero .orb{position:absolute;border-radius:50%;filter:blur(46px);opacity:.5;pointer-events:none}
.hero .o1{width:300px;height:300px;background:#14B0B8;top:-120px;left:-90px;animation:drift1 16s ease-in-out infinite}
.hero .o2{width:230px;height:230px;background:#F09A3E;bottom:-110px;right:-70px;opacity:.34;animation:drift2 19s ease-in-out infinite}
.hero .grid{position:absolute;inset:0;opacity:.13;pointer-events:none;
  background-image:linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px);
  background-size:44px 44px;mask-image:radial-gradient(ellipse at 50% 0%,#000 20%,transparent 75%)}
.hero-in{position:relative;z-index:2}
.eyebrow{font-size:11px;letter-spacing:.34em;font-weight:600;color:#FFC98A;text-transform:uppercase}
.hero h1{font-weight:800;line-height:1.12;letter-spacing:-.02em;color:#fff}
.hero .lede{color:#B9D8E4;font-weight:300;font-size:16px;line-height:1.7}
.gold-rule{width:52px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--amber),#FFC98A);margin:20px 0}

/* ── Buttons ───────────────────────────────────────── */
.cta{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;
  background:linear-gradient(135deg,var(--amber) 0%,var(--amber-deep) 100%);color:#3A2410;
  font-weight:800;font-size:16.5px;padding:17px 20px;border-radius:18px;letter-spacing:.01em;
  box-shadow:0 12px 28px -8px rgba(240,154,62,.6),inset 0 1px 0 rgba(255,255,255,.35);
  transition:transform .18s cubic-bezier(.2,.7,.2,1),box-shadow .18s;position:relative}
.cta:active{transform:scale(.97)}
.cta.navy{background:linear-gradient(135deg,#0B3A58,var(--navy));color:#EAF6F9;
  box-shadow:0 12px 26px -10px rgba(7,38,63,.55),inset 0 1px 0 rgba(255,255,255,.12)}
.cta.ghost{background:var(--card);color:var(--ocean);box-shadow:var(--shadow-1);border:1px solid var(--line)}
.cta:disabled{opacity:.4;box-shadow:none;pointer-events:none}
.btn-ic{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:16px;
  background:var(--card);border:1px solid var(--line);color:var(--ocean);box-shadow:var(--shadow-1);font-size:19px;transition:transform .15s}
.btn-ic:active{transform:scale(.94)}

/* ── Home ──────────────────────────────────────────── */
.home-hero{padding:0 24px 116px}
.logo-band{background:#F7F5EF;display:flex;justify-content:center;padding:28px 20px 30px;border-radius:0 0 30px 30px;
  box-shadow:0 10px 26px -14px rgba(7,38,63,.35);position:relative;z-index:2}
.logo-hero{width:196px;display:block;filter:drop-shadow(0 6px 14px rgba(7,38,63,.18))}
.video-btn{display:inline-flex;align-items:center;gap:9px;margin-top:16px;padding:12px 18px;border-radius:999px;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.28);color:#EAF6F9;font-size:13.5px;font-weight:600;
  backdrop-filter:blur(8px);transition:transform .15s}
.video-btn:active{transform:scale(.96)}
.video-btn .play{width:26px;height:26px;border-radius:50%;background:var(--amber);color:#3A2410;display:flex;align-items:center;justify-content:center;font-size:11px;padding-right:2px}
.vwrap{position:fixed;inset:0;z-index:90;background:rgba(5,22,38,.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;animation:rise .25s}
.vbox{width:min(92vw,440px);position:relative;animation:riseS .35s}
.vbox video{width:100%;display:block;border-radius:18px;background:#000;box-shadow:0 24px 70px rgba(0,0,0,.55)}
.vx{position:absolute;top:-46px;left:0;width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.14);color:#fff;display:flex;align-items:center;justify-content:center}
.home-hero h1{font-size:34px;margin-top:18px}
.subbrand{font-size:12px;letter-spacing:.34em;font-weight:700;color:#FFC98A;margin-top:10px;text-transform:uppercase}
.hero-cta-row{display:flex;gap:12px;margin-top:26px}
.trust{display:flex;align-items:center;gap:8px;margin-top:18px;font-size:12.5px;color:#9FC6D4}
.trust b{color:#fff;font-weight:600}

/* glass feature cards overlapping hero */
.feat-wrap{padding:0 18px;margin-top:-86px;position:relative;z-index:3;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.feat{background:var(--glass);border:1px solid var(--glass-brd);border-radius:var(--r-md);
  padding:16px 15px;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:var(--shadow-2)}
.feat .fic{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;
  font-size:18px;color:#fff;margin-bottom:10px;box-shadow:0 6px 14px -4px rgba(7,38,63,.35)}
.fic.a{background:linear-gradient(135deg,#14B0B8,#0B7E92)}
.fic.b{background:linear-gradient(135deg,#F09A3E,#E4762A)}
.fic.c{background:linear-gradient(135deg,#0B4E6E,#07263F)}
.fic.d{background:linear-gradient(135deg,#2E8FB8,#14B0B8)}
.feat b{font-size:14px;display:block;letter-spacing:-.01em}
.feat span{font-size:12px;color:var(--mut);line-height:1.55;display:block;margin-top:4px}

/* ── Wizard ────────────────────────────────────────── */
.wiz-hero{padding:22px 24px 30px;border-radius:0 0 34px 34px}
.wiz-meta{display:flex;justify-content:space-between;align-items:center}
.wiz-meta .close{color:#9FC6D4;font-size:13px;font-weight:500;display:flex;gap:6px;align-items:center}
.progress{height:4px;border-radius:4px;background:rgba(255,255,255,.16);margin-top:16px;overflow:hidden}
.progress i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,var(--teal),#7FE3E8);
  transition:width .5s cubic-bezier(.2,.7,.2,1)}
.wiz-hero h2{font-size:28px;font-weight:800;margin-top:18px;line-height:1.18;color:#fff}
.wiz-hero .sub{color:#B9D8E4;font-size:13.5px;font-weight:300;margin-top:8px}
.wiz-body{padding:24px 22px 8px;min-height:44vh}
.fld{margin-bottom:20px}
.fld label{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;color:var(--ocean);margin-bottom:9px;letter-spacing:.02em}
.fld input,.fld select,.fld textarea{width:100%;max-width:100%;min-width:0;padding:15px 16px;border:1.5px solid var(--line);border-radius:16px;resize:none;
  background:var(--card);outline:none;transition:border .18s,box-shadow .18s;box-shadow:var(--shadow-1)}
.fld input:focus,.fld textarea:focus{border-color:var(--teal);box-shadow:0 0 0 4px rgba(20,176,184,.14)}
.hint{font-size:12px;color:var(--faint);margin-top:7px;line-height:1.55}
.chips{display:flex;flex-wrap:wrap;gap:10px}
.chip{padding:12px 17px;border-radius:999px;border:1.5px solid var(--line);background:var(--card);
  font-size:14px;font-weight:600;color:var(--ink);box-shadow:var(--shadow-1);
  transition:all .2s cubic-bezier(.2,.7,.2,1);display:flex;align-items:center;gap:7px}
.chip:active{transform:scale(.95)}
.chip.on{background:linear-gradient(135deg,#0B3A58,var(--navy));border-color:transparent;color:#fff;
  box-shadow:0 8px 20px -6px rgba(7,38,63,.5);transform:translateY(-1px)}
.chip.amber.on{background:linear-gradient(135deg,var(--amber),var(--amber-deep));color:#3A2410;
  box-shadow:0 8px 20px -6px rgba(240,154,62,.55)}
.summary-glass{background:var(--glass);border:1px solid var(--glass-brd);backdrop-filter:blur(14px);
  border-radius:var(--r-md);padding:16px;font-size:13.5px;font-weight:600;color:var(--ocean);
  display:flex;gap:10px;align-items:center;box-shadow:var(--shadow-1)}
.wiz-nav{display:flex;gap:12px;padding:14px 22px 30px;position:sticky;bottom:0;z-index:5;
  background:linear-gradient(transparent,var(--bg) 34%)}
.wiz-nav .back{flex:0 0 auto}

/* ── Boarding pass (signature) ─────────────────────── */
.pass{margin:-92px 18px 0;position:relative;z-index:4;border-radius:24px;overflow:hidden;
  background:var(--glass);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);
  border:1px solid var(--glass-brd);box-shadow:var(--shadow-2)}
.pass::before{content:"";position:absolute;inset:0 0 auto 0;height:3px;
  background:linear-gradient(90deg,var(--teal),#8FD8DC 30%,var(--amber) 70%,#FFC98A);opacity:.9}
.pass-top{padding:18px 20px 14px;display:flex;justify-content:space-between;align-items:center}
.pass-top .lbl{font-size:9.5px;letter-spacing:.26em;color:var(--faint);font-weight:600}
.pass-top .dest{font-size:23px;font-weight:900;color:var(--navy);letter-spacing:-.01em}
.pass-plane{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--teal-soft),#fff);
  display:flex;align-items:center;justify-content:center;color:var(--teal-ink);font-size:19px;
  border:1px solid var(--line)}
.pass-mid{padding:4px 20px 16px;display:flex;flex-wrap:wrap;gap:12px 24px;position:relative;
  border-bottom:2px dashed rgba(94,118,134,.3)}
.pass-mid::before,.pass-mid::after{content:"";position:absolute;bottom:-11px;width:22px;height:22px;border-radius:50%;background:var(--bg);box-shadow:inset 0 1px 3px rgba(11,30,45,.12)}
.pass-mid::before{right:-11px}.pass-mid::after{left:-11px}
.pcell .k{font-size:9.5px;color:var(--faint);letter-spacing:.14em;font-weight:600}
.pcell .v{font-size:14.5px;font-weight:700;color:var(--navy);margin-top:2px}
.pass-bot{padding:12px 20px 15px;display:flex;justify-content:space-between;align-items:center}
.pass-bot .styles{font-size:12px;color:var(--mut);font-weight:500}
.barcode{display:flex;gap:2.5px;align-items:flex-end;height:22px;opacity:.85}
.barcode i{width:2.5px;background:var(--navy);border-radius:1px}

/* ── Plan tabs (sticky glass) ──────────────────────── */
.tabbar{position:sticky;top:0;z-index:20;padding:12px 14px 10px;display:flex;gap:8px;overflow-x:auto;
  background:rgba(242,247,249,.78);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(227,237,241,.9)}
.tabbar::-webkit-scrollbar{display:none}
.tab{padding:10px 15px;border-radius:999px;font-size:13px;font-weight:700;color:var(--ocean);
  background:var(--card);border:1px solid var(--line);white-space:nowrap;display:flex;gap:7px;align-items:center;
  transition:all .2s;box-shadow:var(--shadow-1)}
.tab.on{background:linear-gradient(135deg,#0B3A58,var(--navy));color:#fff;border-color:transparent;
  box-shadow:0 8px 18px -6px rgba(7,38,63,.5)}
.pane{padding:16px 16px 130px}

/* ── Cards ─────────────────────────────────────────── */
.card{background:var(--card);border-radius:var(--r-md);padding:18px;margin-bottom:14px;
  box-shadow:var(--shadow-1);border:1px solid var(--line);position:relative}
.card.tint{background:linear-gradient(150deg,var(--teal-soft),#fff 65%);border-color:#CBEDEF}
.chd{display:flex;align-items:center;gap:11px;margin-bottom:4px}
.cic{width:38px;height:38px;border-radius:13px;display:flex;align-items:center;justify-content:center;
  font-size:17px;color:#fff;flex-shrink:0;box-shadow:0 6px 14px -5px rgba(7,38,63,.4)}
.card h3{font-size:15.5px;font-weight:800;color:var(--navy);letter-spacing:-.01em;line-height:1.3;display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.card .sub{font-size:12.5px;color:var(--mut);margin-top:2px}
.body-txt{font-size:13.5px;color:var(--ink);line-height:1.65;margin-top:8px}
.tagrow{display:flex;flex-wrap:wrap;gap:7px;margin-top:11px}
.tag{font-size:11.5px;padding:5px 11px;border-radius:999px;background:var(--teal-soft);color:var(--teal-ink);font-weight:700}
.tag.amber{background:var(--amber-soft);color:#A15D14}
.tag.warn{background:#FCEAE2;color:var(--warn)}
.plist{margin-top:10px;font-size:13.5px;line-height:1.8}
.plist .row{display:flex;gap:9px;align-items:baseline}
.plist .p svg,.plist .m svg{width:13px;height:13px;position:relative;top:2px}
.plist .p{color:var(--ink)} .plist .p .mk{color:var(--ok)}
.plist .m{color:var(--mut)} .plist .m .mk{color:var(--warn)}
.links{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.lnk{font-size:12.5px;font-weight:700;color:var(--ocean);border:1px solid var(--line);
  padding:9px 14px;border-radius:12px;text-decoration:none;background:var(--bg);
  display:inline-flex;gap:6px;align-items:center;transition:transform .15s;box-shadow:var(--shadow-1)}
.lnk:active{transform:scale(.95)}
.lnk.g{background:linear-gradient(135deg,#0B3A58,var(--navy));color:#fff;border-color:transparent}
.stars{color:var(--amber);letter-spacing:1px;font-size:12px}

/* ── Itinerary timeline ────────────────────────────── */
.dayhdr{display:flex;align-items:center;gap:12px;margin:24px 4px 12px}
.daynum{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,#0B3A58,var(--navy));
  color:#FFC98A;font-weight:900;font-size:18px;
  display:flex;align-items:center;justify-content:center;box-shadow:0 8px 18px -6px rgba(7,38,63,.5)}
.dayhdr b{font-size:15.5px;color:var(--navy);letter-spacing:-.01em}
.tl{position:relative;padding-right:20px}
.tl::before{content:"";position:absolute;right:6px;top:10px;bottom:14px;width:2px;
  background:linear-gradient(var(--teal),var(--amber));border-radius:2px;opacity:.4}
.slot{position:relative;background:var(--card);border:1px solid var(--line);border-radius:18px;
  padding:14px 15px;margin-bottom:10px;box-shadow:var(--shadow-1)}
.slot::before{content:"";position:absolute;right:-18px;top:20px;width:10px;height:10px;border-radius:50%;
  background:var(--dot,var(--teal));box-shadow:0 0 0 4px var(--bg)}
.slot .when{display:flex;gap:7px;align-items:center;font-size:10.5px;font-weight:800;letter-spacing:.16em;color:var(--dot,var(--teal-ink));text-transform:uppercase}
.slot b{font-size:14.5px;color:var(--navy);display:block;margin-top:6px}
.slot p{font-size:12.5px;color:var(--mut);line-height:1.6;margin-top:3px}

/* ── Budget ────────────────────────────────────────── */
.big-amount{font-size:38px;font-weight:900;color:var(--navy);letter-spacing:-.02em;line-height:1}
.big-amount small{font-size:15px;color:var(--faint);font-family:'Heebo';font-weight:500;letter-spacing:0}
.budget-bar{height:12px;border-radius:8px;background:var(--line);overflow:hidden;margin:16px 0 8px}
.budget-bar i{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,var(--teal),var(--amber));
  animation:barfill .8s cubic-bezier(.2,.7,.2,1);transition:width .5s}
.brow{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid var(--line);font-size:14px}
.brow:last-child{border:none}
.brow .cat{display:flex;gap:10px;align-items:center;font-weight:600;color:var(--ink)}
.brow .cat .dot{width:30px;height:30px;border-radius:10px;background:var(--teal-soft);color:var(--teal-ink);display:flex;align-items:center;justify-content:center;font-size:14px}
.brow .amt{font-weight:800;color:var(--navy)}
.addexp{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.addexp select,.addexp input{padding:13px;border:1.5px solid var(--line);border-radius:14px;background:var(--card);outline:none;box-shadow:var(--shadow-1)}
.addexp input:focus,.addexp select:focus{border-color:var(--teal)}
.addexp .full{grid-column:1/-1}

/* ── Loading / shimmer ─────────────────────────────── */
.shimmer{background:linear-gradient(105deg,var(--line) 30%,#fff 50%,var(--line) 70%);background-size:300% 100%;
  animation:sh 1.5s infinite;border-radius:var(--r-md);border:1px solid var(--line)}
.gen-note{display:flex;gap:10px;align-items:center;background:var(--glass);border:1px solid var(--glass-brd);
  backdrop-filter:blur(12px);border-radius:16px;padding:13px 15px;font-size:13px;color:var(--ocean);font-weight:600;margin-bottom:14px}
.gen-note .plane-ic{animation:fly 2.2s ease-in-out infinite;font-size:17px;color:var(--teal-ink)}

/* ── FAB + Chat ────────────────────────────────────── */
.fab{position:fixed;bottom:24px;left:50%;transform:translateX(calc(-50% - 152px));z-index:40;
  width:60px;height:60px;border-radius:22px;background:linear-gradient(135deg,var(--amber),var(--amber-deep));
  color:#3A2410;font-size:23px;display:flex;align-items:center;justify-content:center;
  animation:breathe 3.2s ease-in-out infinite;transition:transform .18s}
.fab:active{transform:translateX(calc(-50% - 152px)) scale(.92)}
@media(max-width:480px){.fab{left:auto;right:20px;transform:none}.fab:active{transform:scale(.92)}}
.chat-wrap{position:fixed;inset:0;z-index:50;display:flex;align-items:flex-end;justify-content:center;
  background:rgba(5,22,38,.5);backdrop-filter:blur(4px);animation:rise .25s}
.chat{background:var(--bg);width:100%;max-width:480px;height:84vh;border-radius:28px 28px 0 0;
  display:flex;flex-direction:column;overflow:hidden;animation:riseS .4s cubic-bezier(.2,.7,.2,1);box-shadow:0 -20px 60px rgba(3,18,32,.4)}
.chat-hd{background:linear-gradient(150deg,#051D31,var(--ocean));color:#fff;padding:16px 20px;
  display:flex;justify-content:space-between;align-items:center;position:relative;overflow:hidden}
.chat-hd::after{content:"";position:absolute;width:160px;height:160px;border-radius:50%;background:var(--teal);
  filter:blur(50px);opacity:.35;top:-80px;left:-30px}
.chat-hd b{font-size:15px;position:relative;z-index:1}
.chat-hd span{font-size:11px;color:#9FC6D4;display:block;position:relative;z-index:1;margin-top:2px}
.chat-hd .x{width:34px;height:34px;border-radius:12px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:#fff;position:relative;z-index:1}
.chat-body{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:11px}
.msg{max-width:84%;padding:12px 15px;font-size:14px;line-height:1.65;white-space:pre-wrap;animation:riseS .3s}
.msg.u{align-self:flex-start;background:linear-gradient(135deg,#0B3A58,var(--navy));color:#EAF6F9;
  border-radius:20px 20px 20px 6px;box-shadow:0 8px 18px -8px rgba(7,38,63,.5)}
.msg.a{align-self:flex-end;background:var(--card);border:1px solid var(--line);border-radius:20px 20px 6px 20px;box-shadow:var(--shadow-1)}
.msg img{max-width:100%;border-radius:12px;margin-bottom:8px;display:block}
.typing{align-self:flex-end;display:flex;gap:5px;padding:12px 16px;background:var(--card);border:1px solid var(--line);border-radius:20px 20px 6px 20px}
.typing i{width:6px;height:6px;border-radius:50%;background:var(--teal);animation:fly 1s infinite}
.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}
.sugs{display:flex;gap:8px;overflow-x:auto;padding:2px 16px 10px}
.sugs::-webkit-scrollbar{display:none}
.sug{font-size:12px;padding:9px 13px;border-radius:999px;background:var(--card);border:1px solid var(--line);
  color:var(--ocean);font-weight:600;white-space:nowrap;box-shadow:var(--shadow-1)}
.chat-in{display:flex;gap:9px;padding:13px 15px calc(13px + env(safe-area-inset-bottom));background:var(--card);border-top:1px solid var(--line)}
.chat-in input[type=text]{flex:1;padding:13px 15px;border:1.5px solid var(--line);border-radius:16px;outline:none;background:var(--bg)}
.chat-in input[type=text]:focus{border-color:var(--teal)}
.chat-in .snd{background:linear-gradient(135deg,#0B3A58,var(--navy));color:#fff;border-radius:14px;width:50px;display:flex;align-items:center;justify-content:center;font-size:17px}
.chat-in .cam{border:1.5px solid var(--line);border-radius:14px;width:50px;display:flex;align-items:center;justify-content:center;font-size:18px;background:var(--bg);color:var(--ocean)}

/* ── Splash ── */
.splash{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;
  background:#F7F5EF}
.sp-logo{width:240px;animation:riseS .8s cubic-bezier(.2,.7,.2,1) both}
.sp-icons{display:flex;gap:16px}
.sp-ic{width:48px;height:48px;border-radius:16px;background:rgba(7,38,63,.05);border:1px solid rgba(7,38,63,.12);
  display:flex;align-items:center;justify-content:center;color:var(--ocean);animation:pulseIc 1.4s ease-in-out infinite}
@keyframes pulseIc{0%,100%{transform:scale(1);color:var(--ocean)}50%{transform:scale(1.2);color:var(--amber-deep)}}
.sp-tag{color:var(--mut);font-size:13.5px;letter-spacing:.03em;font-weight:400}
.sp-bar{width:190px;height:4px;border-radius:4px;background:rgba(7,38,63,.12);overflow:hidden}
.sp-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--teal),var(--amber));animation:spfill 5s linear forwards}
@keyframes spfill{to{width:100%}}
.sp-skip{color:#A9A296;font-size:11px;margin-top:2px}

.wz{display:inline-flex;gap:5px;align-items:center;margin-top:9px;font-size:11.5px;font-weight:700;color:#1D8FCB;
  text-decoration:none;background:#EAF6FD;border:1px solid #CFE9F8;padding:5px 11px;border-radius:999px}

.pin-input{letter-spacing:.45em;text-align:center;font-weight:800;font-size:21px;font-family:'Heebo',sans-serif}
.pin-err{color:var(--warn);font-size:12.5px;font-weight:600;margin-top:7px}

.err{background:#FCEAE2;border:1px solid #F2CDBB;color:var(--warn);border-radius:14px;padding:13px 15px;font-size:13px;margin-bottom:14px;font-weight:500}
.foot{text-align:center;font-size:11px;color:var(--faint);padding:22px 16px 30px;letter-spacing:.06em}
.foot b{color:var(--ocean);font-weight:700}
`;

/* ── אייקונים (SVG stroke, בהשראת Lucide) ─────────── */
const PATHS = {
  plane: <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>,
  bed: <><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></>,
  car: <><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></>,
  map: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
  ticket: <><path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></>,
  wallet: <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></>,
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>,
  camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
  spark: <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3Z"/>,
  check: <path d="M20 6 9 17l-5-5"/>,
  x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
  cal: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></>,
  sunset: <><path d="M12 10V2"/><path d="m4.9 10.9 1.4 1.4"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m17.7 12.3 1.4-1.4"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/></>,
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>,
  back: <path d="m15 18-6-6 6-6"/>,
  next: <path d="m9 18 6-6-6-6"/>,
  plus: <><path d="M5 12h14"/><path d="M12 5v14"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
  cash: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></>,
  bag: <><path d="M6 7V6a6 6 0 0 1 12 0v1"/><path d="M4 7h16l-1.3 12.1a2 2 0 0 1-2 1.9H7.3a2 2 0 0 1-2-1.9Z"/></>,
  shield: <path d="M20 13c0 5-3.5 7.5-7.7 9a2 2 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>,
  wifi: <><path d="M12 20h.01"/><path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5 12.9a10 10 0 0 1 14 0"/><path d="M8.5 16.4a5 5 0 0 1 7 0"/></>,
  food: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></>,
};
const Ic = ({ n, s = 16, style }) => (
  <svg className="ic" viewBox="0 0 24 24" style={{ width: s, height: s, ...style }} aria-hidden="true">{PATHS[n]}</svg>
);

/* ── לוגו רשמי (מוטמע) ── */
const LOGO = "data:image/webp;base64,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";

/* ── קבועים ────────────────────────────────────────── */
const STYLES = ["נופש ורוגע","טבע ונופים","תרבות והיסטוריה","אוכל וקולינריה","קניות","חיי לילה","אטרקציות","טיול יוקרתי"];
const PREFS  = ["אוכל כשר","מתאים לילדים","נגישות","טבע","חופים","מוזיאונים","ספורט"];
const GROUPS = ["זוג","משפחה","חברים","נסיעת עבודה","סולו"];
const BUDGETS= ["חסכוני","בינוני","מפנק"];
const EXP_CATS=["לינה","אוכל","תחבורה","אטרקציות","קניות","אחר"];
const CAT_IC = { "לינה":"bed","אוכל":"food","תחבורה":"car","אטרקציות":"ticket","קניות":"bag","אחר":"wallet" };
const ACCESS_CODE = "130809"; // קוד גישה ליצירת תוכנית — לשינוי: החליפו כאן
const CHUNK = 2; // ימים לכל קריאה — קצר כדי לעמוד במגבלת 10 שניות של Netlify
const FAST = "claude-haiku-4-5"; // מודל מהיר ליצירת התוכנית (הצ'אט נשאר על Sonnet)

/* ── שכבת AI ───────────────────────────────────────── */
/* כתובת ה-AI: בפרודקשן עוברת דרך פונקציית Netlify (המפתח שמור בצד השרת).
   הערה לפיתוח מקומי: `npm run dev` לא מריץ פונקציות Netlify — לבדיקת AI מקומית
   התקינו netlify-cli והריצו `netlify dev`, או בדקו ישירות באתר החי. */
const API_URL = "/.netlify/functions/ai";

async function askClaude(messages, system, maxTokens = 1000, model = "claude-sonnet-4-6") {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, max_tokens: maxTokens, system, messages }),
  });
  if (!res.ok) throw new Error("network " + res.status);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "שגיאת AI");
  return (data.content || []).map(b => (b.type === "text" ? b.text : "")).join("\n");
}
function parseJSON(text) {
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean.slice(clean.indexOf("{"), clean.lastIndexOf("}") + 1));
}
const JSON_SYS = "אתה סוכן נסיעות ישראלי מומחה. החזר JSON תקין בלבד, ללא Markdown, ללא backticks וללא טקסט נוסף. כל הטקסטים בעברית, קצרים וקונקרטיים.";

function tripBrief(f) {
  return `יעד: ${f.city}, ${f.country}${f.multi > 1 ? ` (${f.multi} יעדים בטיול)` : ""}. ` +
    `${f.firstTime ? "פעם ראשונה ביעד. " : "כבר ביקרו ביעד. "}` +
    `תאריכים: ${f.depart} עד ${f.ret} (${f.days} ימים). ` +
    `הרכב: ${f.group}, ${f.adults} מבוגרים${f.kids ? `, ילדים בגילאי ${f.kids}` : ""}. ` +
    `סגנון: ${f.styles.join(", ") || "כללי"}. תקציב: ${f.budget}${f.amount ? ` (~${f.amount}$ לכל הטיול)` : ""}. ` +
    `העדפות: ${f.prefs.join(", ") || "אין"}.` + (f.notes.trim() ? ` הערות ובקשות מיוחדות מהמטיילים: ${f.notes.trim()}.` : "");
}
function bookingLinks(f) {
  const c = encodeURIComponent(f.city);
  return {
    gflights: `https://www.google.com/travel/flights?q=${encodeURIComponent(`טיסות מתל אביב ל${f.city} ${f.depart}`)}`,
    skyscanner: `https://www.skyscanner.co.il/transport/flights/tlv/${c}/`,
    skyDated: (iata) => {
      const d = s => s.replaceAll("-", "").slice(2); // YYYY-MM-DD -> YYMMDD
      return `https://www.skyscanner.co.il/transport/flights/tlv/${iata.toLowerCase()}/${d(f.depart)}/${d(f.ret)}/?adults=${f.adults}`;
    },
    booking: `https://www.booking.com/searchresults.he.html?ss=${c}&checkin=${f.depart}&checkout=${f.ret}&group_adults=${f.adults}`,
    bookingHotel: (name) => `https://www.booking.com/searchresults.he.html?ss=${encodeURIComponent(name + " " + f.city)}&checkin=${f.depart}&checkout=${f.ret}&group_adults=${f.adults}`,
    expedia: `https://www.expedia.com/Hotel-Search?destination=${c}&startDate=${f.depart}&endDate=${f.ret}`,
    expediaHotel: (name) => `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(name + " " + f.city)}&startDate=${f.depart}&endDate=${f.ret}`,
    hotels: `https://www.hotels.com/search.do?q-destination=${c}`,
    hotelsHotel: (name) => `https://www.hotels.com/search.do?q-destination=${encodeURIComponent(name + " " + f.city)}`,
    rentalcars: `https://www.rentalcars.com/search-results?location=${c}`,
    discovercars: `https://www.discovercars.com/search?location=${c}`,
    gyg: q => `https://www.getyourguide.com/s/?q=${encodeURIComponent((q || "") + " " + f.city)}`,
    viator: q => `https://www.viator.com/searchResults/all?text=${encodeURIComponent((q || "") + " " + f.city)}`,
    tiqets: q => `https://www.tiqets.com/en/search?q=${encodeURIComponent((q || "") + " " + f.city)}`,
    waze: q => `https://waze.com/ul?q=${encodeURIComponent((q || "") + " " + f.city)}&navigate=yes`,
  };
}
const daysBetween = (a, b) => { if (!a || !b) return 0; const d = Math.round((new Date(b) - new Date(a)) / 864e5); return d > 0 ? d + 1 : 0; };
const BARCODE = [3,7,4,9,5,11,6,4,9,7,5,10,4,8,6,11,5,9,4,7,10,5,8,6];

/* ══════════════════════════════════════════════════ */
export default function KorenTravelApp() {
  const [screen, setScreen] = useState("home");
  const [splash, setSplash] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [pinErr, setPinErr] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    country: "", city: "", multi: 1, firstTime: true,
    depart: "", ret: "", days: 0,
    group: "זוג", adults: 2, kids: "",
    styles: [], budget: "בינוני", amount: "",
    prefs: [], notes: "",
  });
  const [plan, setPlan] = useState(null);
  const [tab, setTab] = useState("flights");
  const [chatOpen, setChatOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const runRef = useRef(0); // מזהה ריצה — מונע מריצה ישנה לדרוס תוכנית חדשה

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (k, v) => setForm(f => ({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] }));
  useEffect(() => { set("days", daysBetween(form.depart, form.ret)); }, [form.depart, form.ret]);
  useEffect(() => { const t = setTimeout(() => setSplash(false), 5000); return () => clearTimeout(t); }, []);

  const patchPlan = (run, patch) => { if (run === runRef.current) setPlan(p => (p ? { ...p, ...patch(p) } : p)); };

  function startPlan() {
    runRef.current += 1;
    setPlan({ logi: null, hotels: null, attractions: null, days: [],
      loading: { logi: false, hotels: false, attr: false, itin: false },
      errs: { logi: false, hotels: false, attr: false, itin: false }, nextDay: 1 });
    setScreen("plan"); setTab("flights");
    const brief = tripBrief(form);
    loadLogi(brief); loadHotels(brief); loadAttractions(brief); loadDays(1, brief);
  }

  async function loadLogi(brief) {
    const run = runRef.current;
    patchPlan(run, p => ({ loading: { ...p.loading, logi: true }, errs: { ...p.errs, logi: false } }));
    try {
      const t = await askClaude([{ role: "user", content:
        `${brief}\nהחזר JSON: {"flights":{"advice":"המלצה קצרה על טיסות מישראל","airlines":["חברה1","חברה2","חברה3"],"times":"שעות טיסה מומלצות","price":"טווח מחיר משוער לאדם בדולרים","iata":"קוד IATA של שדה התעופה הראשי ביעד, 3 אותיות, למשל ATH"},"car":{"needed":true/false,"reason":"נימוק קצר","type":"סוג רכב מומלץ או null","pickup":"היכן לאסוף ולהחזיר או null"}}`
      }], JSON_SYS, 800, FAST);
      const j = parseJSON(t);
      if (!j.flights || !j.car) throw new Error("shape");
      patchPlan(run, p => ({ logi: j, loading: { ...p.loading, logi: false } }));
    } catch {
      patchPlan(run, p => ({ loading: { ...p.loading, logi: false }, errs: { ...p.errs, logi: true } }));
    }
  }

  async function loadHotels(brief) {
    const run = runRef.current;
    patchPlan(run, p => ({ loading: { ...p.loading, hotels: true }, errs: { ...p.errs, hotels: false } }));
    try {
      const t = await askClaude([{ role: "user", content:
        `${brief}\nהחזר JSON תמציתי: {"area":"האזור המומלץ ללינה ולמה, משפט אחד","hotels":[{"name":"שם אמיתי","area":"אזור","rating":4.5,"price":"$$","pros":["יתרון","יתרון"],"cons":["חיסרון"],"fit":"למי מתאים, 3-4 מילים"}]} בדיוק 3 מלונות, טקסטים קצרים`
      }], JSON_SYS, 700, FAST);
      const j = parseJSON(t);
      if (!Array.isArray(j.hotels)) throw new Error("shape");
      patchPlan(run, p => ({ hotels: j, loading: { ...p.loading, hotels: false } }));
    } catch {
      patchPlan(run, p => ({ loading: { ...p.loading, hotels: false }, errs: { ...p.errs, hotels: true } }));
    }
  }

  async function loadAttractions(brief) {
    const run = runRef.current;
    patchPlan(run, p => ({ loading: { ...p.loading, attr: true }, errs: { ...p.errs, attr: false } }));
    try {
      const t = await askClaude([{ role: "user", content:
        `${brief}\nהחזר JSON תמציתי: {"attractions":[{"name":"שם","desc":"משפט אחד קצר","cat":"קטגוריה","must":true/false}]} בדיוק 6 אטרקציות מותאמות לפרופיל`
      }], JSON_SYS, 600, FAST);
      const j = parseJSON(t);
      if (!Array.isArray(j.attractions)) throw new Error("shape");
      patchPlan(run, p => ({ attractions: j.attractions, loading: { ...p.loading, attr: false } }));
    } catch {
      patchPlan(run, p => ({ loading: { ...p.loading, attr: false }, errs: { ...p.errs, attr: true } }));
    }
  }

  async function loadDays(from, briefArg) {
    const run = runRef.current;
    const brief = briefArg || tripBrief(form);
    const to = Math.min(from + CHUNK - 1, form.days || from);
    patchPlan(run, p => ({ loading: { ...p.loading, itin: true }, errs: { ...p.errs, itin: false } }));
    try {
      const t = await askClaude([{ role: "user", content:
        `${brief}\nבנה מסלול יומי חכם לימים ${from} עד ${to} מתוך ${form.days}. התחשב במרחקים (רצף גיאוגרפי הגיוני), שעות פתיחה, עומס תיירים${form.kids ? ", גילאי הילדים" : ""}${form.prefs.includes("אוכל כשר") ? ", מסעדות כשרות בלבד" : ""}.\nהחזר JSON: {"days":[{"d":${from},"title":"כותרת היום","m":{"t":"פעילות בוקר","d":"פירוט קצר"},"n":{"t":"צהריים + מסעדה","d":"פירוט"},"e":{"t":"פעילות ערב","d":"פירוט"}}]}. פירוט קצר — משפט אחד לכל חלק`
      }], JSON_SYS, 800, FAST);
      const j = parseJSON(t);
      if (!Array.isArray(j.days)) throw new Error("shape");
      patchPlan(run, p => {
        const known = new Set(p.days.map(d => d.d));
        const fresh = j.days.filter(d => !known.has(d.d));
        return { days: [...p.days, ...fresh], nextDay: to + 1, loading: { ...p.loading, itin: false } };
      });
    } catch {
      patchPlan(run, p => ({ loading: { ...p.loading, itin: false }, errs: { ...p.errs, itin: true } }));
    }
  }

  const canNext = [
    form.country.trim() && form.city.trim(),
    form.depart && form.ret && form.days > 0,
    form.adults > 0,
    form.styles.length > 0,
    true, true,
  ][step];

  const L = plan ? bookingLinks(form) : null;
  const budgetTotal = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const D = (i) => ({ animationDelay: `${i * 70}ms` }); // stagger helper

  return (
    <div className="kt" dir="rtl">
      <style>{CSS}</style>

      {/* ════════ SPLASH ════════ */}
      {splash && (
        <div className="splash" onClick={() => setSplash(false)} role="status" aria-label="טוען">
          <img className="sp-logo" src={LOGO} alt="KOREN Travel Ai Build" />
          <div className="sp-icons">
            {["plane","bed","bag","food"].map((n, i) => (
              <span key={n} className="sp-ic" style={{ animationDelay: `${i * 0.35}s` }}><Ic n={n} s={22} /></span>
            ))}
          </div>
          <div className="sp-tag">מכינים לכם את חוויית הטיול המושלמת…</div>
          <div className="sp-bar"><i /></div>
          <div className="sp-skip">לחצו לדילוג</div>
        </div>
      )}

      {/* ════════ HOME ════════ */}
      {screen === "home" && (
        <>
          <div className="logo-band rise"><img className="logo-hero" src={LOGO} alt="KOREN Travel Ai Build" /></div>
          <div className="hero home-hero" style={{ paddingTop: 30 }}>
            <span className="orb o1" /><span className="orb o2" /><span className="grid" />
            <div className="hero-in">
              <h1 className="rise" style={D(2)}>סוכן הנסיעות<br />האישי שלך.</h1>
              <div className="subbrand rise" style={D(3)}>AI TRIP BUILDER</div>
              <div className="gold-rule rise" style={D(3)} />
              <p className="lede rise" style={D(3)}>מהרעיון הראשון ועד הרגע שנוחתים — בינה מלאכותית שמתכננת, ממליצה ומלווה אתכם לאורך כל הטיול.</p>
              <div className="hero-cta-row rise" style={D(4)}>
                <button className="cta" onClick={() => { setScreen("wizard"); setStep(0); }}>
                  <Ic n="spark" s={18} /> תכנון טיול חדש
                </button>
              </div>
              <div className="trust rise" style={D(5)}><Ic n="check" s={13} /> <span>שאלון של <b>דקה אחת</b> · תוכנית מלאה תוך <b>שניות</b></span></div>
              <button className="video-btn rise" style={D(6)} onClick={() => setVideoOpen(true)}>
                <span className="play">▶</span> צפו בסרטון התדמית
              </button>
            </div>
          </div>

          <div className="feat-wrap">
            {[
              ["a","map","תוכנית מותאמת אישית","טיסות, מלונות, רכב ומסלול יומי — לפי הסגנון שלכם."],
              ["b","chat","עוזר טיולים 24/7","״יורד גשם, מה עושים?״ — צ'אט שמכיר את הטיול שלכם."],
              ["c","camera","זיהוי תמונות","צלמו אתר או מנה — וקבלו הסבר והמלצות במקום."],
              ["d","wallet","ניהול תקציב חכם","מעקב הוצאות בזמן אמת מול היעד שהגדרתם."],
            ].map(([cl, ic, t, d], i) => (
              <div className="feat riseS" style={D(i + 5)} key={t}>
                <div className={`fic ${cl}`}><Ic n={ic} s={17} /></div>
                <b>{t}</b><span>{d}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ════════ נגן סרטון תדמית ════════ */}
      {videoOpen && (
        <div className="vwrap" onClick={() => setVideoOpen(false)}>
          <div className="vbox" onClick={e => e.stopPropagation()}>
            <button className="vx" onClick={() => setVideoOpen(false)} aria-label="סגירה"><Ic n="x" s={17} /></button>
            <video src="/video/promo.mp4" controls autoPlay playsInline />
          </div>
        </div>
      )}

      {/* ════════ WIZARD ════════ */}
      {screen === "wizard" && (
        <>
          <div className="hero wiz-hero">
            <span className="orb o1" style={{ opacity: .3 }} /><span className="grid" />
            <div className="hero-in">
              <div className="wiz-meta">
                <div className="eyebrow">שלב {step + 1} / 6</div>
                <button className="close" onClick={() => setScreen("home")}><Ic n="x" s={13} /> יציאה</button>
              </div>
              <div className="progress"><i style={{ width: `${((step + 1) / 6) * 100}%` }} /></div>
              <h2 key={step} className="rise">{["לאן טסים?","מתי טסים?","מי טס?","איזה סגנון טיול?","מה התקציב?","העדפות מיוחדות"][step]}</h2>
              <div className="sub rise" style={D(1)}>{[
                "ספרו לנו על היעד — וה-AI כבר ילמד אותו לעומק.",
                "התאריכים קובעים עונה, מחירים ומזג אוויר.",
                "המסלול יותאם בדיוק להרכב שלכם.",
                "אפשר לבחור כמה סגנונות — נשלב ביניהם.",
                "נכוון את ההמלצות בדיוק לרמה שנוחה לכם.",
                "הפרטים הקטנים שעושים טיול מושלם.",
              ][step]}</div>
            </div>
          </div>

          <div className="wiz-body" key={`b${step}`}>
            {step === 0 && <>
              <div className="fld riseS"><label><Ic n="map" s={14} /> מדינה</label><input value={form.country} onChange={e => set("country", e.target.value)} placeholder="למשל: יוון" /></div>
              <div className="fld riseS" style={D(1)}><label><Ic n="map" s={14} /> עיר / אזור מרכזי</label><input value={form.city} onChange={e => set("city", e.target.value)} placeholder="למשל: אתונה" /></div>
              <div className="fld riseS" style={D(2)}><label><Ic n="plane" s={14} /> כמה יעדים באותו טיול?</label>
                <div className="chips">{[1,2,3].map(n => <button key={n} className={`chip ${form.multi===n?"on":""}`} onClick={() => set("multi", n)}>{n === 3 ? "3+" : n}</button>)}</div>
              </div>
              <div className="fld riseS" style={D(3)}><label><Ic n="spark" s={14} /> ביקרתם שם בעבר?</label>
                <div className="chips">
                  <button className={`chip ${form.firstTime?"on":""}`} onClick={() => set("firstTime", true)}>פעם ראשונה</button>
                  <button className={`chip ${!form.firstTime?"on":""}`} onClick={() => set("firstTime", false)}>כבר ביקרנו</button>
                </div>
              </div>
            </>}
            {step === 1 && <>
              <div className="fld riseS"><label><Ic n="cal" s={14} /> תאריך יציאה</label><input type="date" value={form.depart} onChange={e => set("depart", e.target.value)} /></div>
              <div className="fld riseS" style={D(1)}><label><Ic n="cal" s={14} /> תאריך חזרה</label><input type="date" value={form.ret} min={form.depart} onChange={e => set("ret", e.target.value)} /></div>
              {form.days > 0 && <div className="summary-glass riseS" style={D(2)}><Ic n="clock" s={17} /> סה״כ {form.days} ימי טיול</div>}
            </>}
            {step === 2 && <>
              <div className="fld riseS"><label><Ic n="users" s={14} /> הרכב המטיילים</label>
                <div className="chips">{GROUPS.map(g => <button key={g} className={`chip ${form.group===g?"on":""}`} onClick={() => set("group", g)}>{g}</button>)}</div>
              </div>
              <div className="fld riseS" style={D(1)}><label><Ic n="users" s={14} /> מספר מבוגרים</label><input type="number" min="1" inputMode="numeric" value={form.adults} onChange={e => set("adults", e.target.value === "" ? "" : Math.max(1, Math.floor(+e.target.value) || 1))} /></div>
              <div className="fld riseS" style={D(2)}><label><Ic n="users" s={14} /> גילאי ילדים (אם יש)</label><input value={form.kids} onChange={e => set("kids", e.target.value)} placeholder="למשל: 10, 15" />
                <div className="hint">המסלול והאטרקציות יותאמו לגילאים.</div></div>
            </>}
            {step === 3 && (
              <div className="fld riseS"><label><Ic n="spark" s={14} /> בחרו סגנון אחד או יותר</label>
                <div className="chips">{STYLES.map((s, i) => <button key={s} style={D(i)} className={`chip riseS ${form.styles.includes(s)?"on":""}`} onClick={() => toggle("styles", s)}>{form.styles.includes(s) && <Ic n="check" s={13} />}{s}</button>)}</div>
              </div>
            )}
            {step === 4 && <>
              <div className="fld riseS"><label><Ic n="wallet" s={14} /> רמת תקציב</label>
                <div className="chips">{BUDGETS.map(b => <button key={b} className={`chip amber ${form.budget===b?"on":""}`} onClick={() => set("budget", b)}>{b}</button>)}</div>
              </div>
              <div className="fld riseS" style={D(1)}><label><Ic n="cash" s={14} /> תקציב משוער לכל הטיול ($)</label><input type="number" value={form.amount} onChange={e => set("amount", e.target.value)} placeholder="למשל: 4000" />
                <div className="hint">לא חובה — יעזור לדייק המלצות ולעקוב אחרי הוצאות.</div></div>
            </>}
            {step === 5 && <>
              <div className="fld riseS"><label><Ic n="check" s={14} /> סמנו כל מה שרלוונטי</label>
                <div className="chips">{PREFS.map((p, i) => <button key={p} style={D(i)} className={`chip riseS ${form.prefs.includes(p)?"on":""}`} onClick={() => toggle("prefs", p)}>{form.prefs.includes(p) && <Ic n="check" s={13} />}{p}</button>)}</div>
              </div>
              <div className="fld riseS" style={D(2)}><label><Ic n="chat" s={14} /> הערות ובקשות מיוחדות (רשות)</label>
                <textarea rows={3} value={form.notes} onChange={e => set("notes", e.target.value)}
                  placeholder="למשל: חוגגים יום נשואין, מעדיפים יציאה מאוחרת בבוקר, אחד המטיילים צמחוני…" />
                <div className="hint">ה-AI יתחשב בזה בבניית התוכנית וההמלצות.</div></div>
              <div className="fld riseS" style={D(3)}><label><Ic n="shield" s={14} /> קוד גישה</label>
                <input className="pin-input" type="password" inputMode="numeric" maxLength={6} dir="ltr"
                  value={pin} placeholder="● ● ● ● ● ●"
                  onChange={e => { setPin(e.target.value.replace(/\D/g, "")); setPinErr(false); }} />
                {pinErr && <div className="pin-err">קוד שגוי — נסו שוב, או פנו למנהל האפליקציה לקבלת קוד.</div>}
                <div className="hint">יצירת תוכנית פתוחה למחזיקי קוד בלבד.</div></div>
              <div className="summary-glass riseS" style={D(4)}><Ic n="spark" s={17} /> הכל מוכן — ה-AI יבנה עכשיו תוכנית מלאה ל{form.city || "יעד"}</div>
            </>}
          </div>

          <div className="wiz-nav">
            <button className="btn-ic back" onClick={() => step === 0 ? setScreen("home") : setStep(step - 1)} aria-label="חזרה"><Ic n="next" s={18} /></button>
            {step < 5
              ? <button className="cta navy" disabled={!canNext} onClick={() => setStep(step + 1)}>המשך <Ic n="back" s={16} /></button>
              : <button className="cta" onClick={() => { if (pin === ACCESS_CODE) { setPinErr(false); startPlan(); } else { setPinErr(true); } }}><Ic n="spark" s={18} /> בנו לי תוכנית טיול</button>}
          </div>
        </>
      )}

      {/* ════════ PLAN ════════ */}
      {screen === "plan" && plan && (
        <>
          <div className="hero" style={{ padding: "22px 22px 110px" }}>
            <span className="orb o1" style={{ opacity: .35 }} /><span className="orb o2" style={{ opacity: .22 }} /><span className="grid" />
            <div className="hero-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="eyebrow rise">KOREN AI · תיק הטיול שלי</div>
                <h1 className="rise" style={{ fontSize: 30, marginTop: 8 }}>{form.city}, {form.country}</h1>
              </div>
              <button className="rise" onClick={() => setScreen("home")} style={{ color: "#9FC6D4", fontSize: 12, display: "flex", gap: 5, alignItems: "center" }}><Ic n="x" s={12} /> סגירה</button>
            </div>
          </div>

          {/* signature: glass boarding pass */}
          <div className="pass riseS">
            <div className="pass-top">
              <div><div className="lbl">DESTINATION</div><div className="dest">{form.city}</div></div>
              <div className="pass-plane"><Ic n="plane" s={19} /></div>
              <div style={{ textAlign: "left" }}><div className="lbl">TRAVELERS</div><div className="dest" style={{ fontSize: 19 }}>{form.adults}{form.kids ? `+${form.kids.split(",").filter(Boolean).length}` : ""}</div></div>
            </div>
            <div className="pass-mid">
              <div className="pcell"><div className="k">יציאה</div><div className="v">{form.depart}</div></div>
              <div className="pcell"><div className="k">חזרה</div><div className="v">{form.ret}</div></div>
              <div className="pcell"><div className="k">ימים</div><div className="v">{form.days}</div></div>
              <div className="pcell"><div className="k">הרכב</div><div className="v">{form.group}</div></div>
              <div className="pcell"><div className="k">תקציב</div><div className="v">{form.budget}</div></div>
            </div>
            <div className="pass-bot">
              <span className="styles">{form.styles.slice(0, 3).join(" · ") || "טיול כללי"}</span>
              <div className="barcode">{BARCODE.map((h, i) => <i key={i} style={{ height: h + 8 }} />)}</div>
            </div>
          </div>

          <div className="tabbar" style={{ marginTop: 18 }}>
            {[["flights","plane","טיסות ורכב"],["hotels","bed","מלונות"],["itin","map","מסלול יומי"],["attr","ticket","אטרקציות"],["budget","wallet","תקציב"]].map(([k, ic, l]) =>
              <button key={k} className={`tab ${tab===k?"on":""}`} onClick={() => setTab(k)}><Ic n={ic} s={14} />{l}</button>)}
          </div>

          <div className="pane">

            {/* — טיסות ורכב — */}
            {tab === "flights" && <>
              {plan.errs.logi && <Retry msg="לא הצלחנו לטעון את המלצות הטיסות והרכב." onRetry={() => loadLogi(tripBrief(form))} />}
              {plan.loading.logi && <>
                <div className="gen-note"><span className="plane-ic"><Ic n="plane" s={17} /></span> ה-AI בונה עבורכם המלצות טיסה ורכב…</div>
                <div className="shimmer" style={{ height: 150, marginBottom: 14 }} />
              </>}
              {plan.logi && <>
                <div className="card riseS">
                  <div className="chd"><div className="cic" style={{ background: "linear-gradient(135deg,#14B0B8,#0B7E92)" }}><Ic n="plane" s={17} /></div>
                    <div><h3>טיסות ל{form.city}</h3><div className="sub">מותאם לתאריכים ולהרכב שלכם</div></div></div>
                  <p className="body-txt">{plan.logi.flights.advice}</p>
                  <div className="tagrow">{(plan.logi.flights.airlines || []).map(a => <span className="tag" key={a}>{a}</span>)}</div>
                  <div className="plist">
                    <div className="row"><Ic n="clock" s={13} style={{ color: "var(--teal-ink)" }} /><span>{plan.logi.flights.times}</span></div>
                    <div className="row"><Ic n="cash" s={13} style={{ color: "var(--amber-deep)" }} /><span>{plan.logi.flights.price}</span></div>
                  </div>
                  <div className="links">
                    <a className="lnk g" href={L.gflights} target="_blank" rel="noreferrer">Google Flights</a>
                    <a className="lnk" href={/^[A-Za-z]{3}$/.test(plan.logi.flights.iata || "") ? L.skyDated(plan.logi.flights.iata) : L.skyscanner} target="_blank" rel="noreferrer">Skyscanner</a>
                  </div>
                </div>
                <div className="card riseS" style={D(1)}>
                  <div className="chd"><div className="cic" style={{ background: "linear-gradient(135deg,#F09A3E,#E4762A)" }}><Ic n="car" s={17} /></div>
                    <div><h3>השכרת רכב {plan.logi.car.needed ? <span className="tag">מומלץ</span> : <span className="tag amber">לא נדרש</span>}</h3></div></div>
                  <p className="body-txt">{plan.logi.car.reason}</p>
                  {plan.logi.car.needed && <div className="plist">
                    {plan.logi.car.type && <div className="row"><Ic n="car" s={13} style={{ color: "var(--teal-ink)" }} /><span>סוג מומלץ: {plan.logi.car.type}</span></div>}
                    {plan.logi.car.pickup && <div className="row"><Ic n="map" s={13} style={{ color: "var(--teal-ink)" }} /><span>{plan.logi.car.pickup}</span></div>}
                  </div>}
                  {plan.logi.car.needed && <div className="links">
                    <a className="lnk g" href={L.rentalcars} target="_blank" rel="noreferrer">Rentalcars</a>
                    <a className="lnk" href={L.discovercars} target="_blank" rel="noreferrer">DiscoverCars</a>
                  </div>}
                </div>
              </>}
              <div className="card tint riseS" style={D(2)}>
                <div className="chd"><div className="cic" style={{ background: "linear-gradient(135deg,#18A46C,#0E7C50)" }}><Ic n="shield" s={17} /></div>
                  <div><h3>ביטוח נסיעות לחו״ל</h3><div className="sub">חשוב להסדיר לפני כל טיסה — כיסוי רפואי, כבודה וביטולים</div></div></div>
                <div className="links">
                  <a className="lnk g" href="https://purchase.passportcard.co.il/existing?AffiliateId=IeEXdf3BGXqvhqzAmSD%2BzQ%3D%3D" target="_blank" rel="noreferrer">PassportCard — רכישת ביטוח</a>
                </div>
              </div>
              <div className="card riseS" style={D(3)}>
                <div className="chd"><div className="cic" style={{ background: "linear-gradient(135deg,#2E8FB8,#14B0B8)" }}><Ic n="wifi" s={17} /></div>
                  <div><h3>אינטרנט בחו״ל — eSIM</h3><div className="sub">גלישה מקומית מהרגע שנוחתים, בלי להחליף כרטיס SIM</div></div></div>
                <div className="links">
                  <a className="lnk g" href="https://www.airalo.com" target="_blank" rel="noreferrer">Airalo</a>
                  <a className="lnk" href="https://www.holafly.com" target="_blank" rel="noreferrer">Holafly</a>
                  <a className="lnk" href="https://www.getnomad.app" target="_blank" rel="noreferrer">Nomad</a>
                </div>
              </div>
            </>}

            {/* — מלונות — */}
            {tab === "hotels" && <>
              {plan.errs.hotels && <Retry msg="לא הצלחנו לטעון את המלצות המלונות." onRetry={() => loadHotels(tripBrief(form))} />}
              {plan.loading.hotels && <>
                <div className="gen-note"><span className="plane-ic"><Ic n="bed" s={17} /></span> מאתרים את אזור הלינה והמלונות המדויקים לכם…</div>
                <div className="shimmer" style={{ height: 200 }} />
              </>}
              {plan.hotels && <>
                <div className="card tint riseS">
                  <div className="chd"><div className="cic" style={{ background: "linear-gradient(135deg,#0B4E6E,#07263F)" }}><Ic n="map" s={17} /></div>
                    <div><h3>איפה כדאי לישון?</h3></div></div>
                  <p className="body-txt">{plan.hotels.area}</p>
                  <div className="links">
                    <a className="lnk g" href={L.booking} target="_blank" rel="noreferrer">כל המלונות באזור — Booking</a>
                  </div>
                </div>
                {(plan.hotels.hotels || []).map((h, i) => (
                  <div className="card riseS" style={D(i + 1)} key={h.name}>
                    <h3>{h.name} <span className="tag amber">{h.price}</span></h3>
                    <div className="sub">{h.area} · <span className="stars">{"★".repeat(Math.round(h.rating))}</span> {h.rating}</div>
                    <div className="plist">
                      {(h.pros || []).map(p => <div className="row p" key={p}><span className="mk"><Ic n="check" s={13} /></span><span>{p}</span></div>)}
                      {(h.cons || []).map(c => <div className="row m" key={c}><span className="mk"><Ic n="x" s={13} /></span><span>{c}</span></div>)}
                    </div>
                    <div className="tagrow"><span className="tag">{h.fit}</span></div>
                    <div className="links">
                      <a className="lnk g" href={L.bookingHotel(h.name)} target="_blank" rel="noreferrer">Booking — למלון הזה</a>
                      <a className="lnk" href={L.expediaHotel(h.name)} target="_blank" rel="noreferrer">Expedia</a>
                      <a className="lnk" href={L.hotelsHotel(h.name)} target="_blank" rel="noreferrer">Hotels.com</a>
                    </div>
                  </div>
                ))}
              </>}
            </>}

            {/* — מסלול יומי — */}
            {tab === "itin" && <>
              {plan.errs.itin && <Retry msg="חלק מהמסלול לא נטען." onRetry={() => loadDays(plan.nextDay)} />}
              {plan.days.map(d => (
                <div key={d.d} className="riseS">
                  <div className="dayhdr"><div className="daynum">{d.d}</div><b>{d.title}</b></div>
                  <div className="tl">
                    {[["sun","בוקר",d.m,"var(--teal)"],["sunset","צהריים",d.n,"var(--amber)"],["moon","ערב",d.e,"var(--ocean)"]].map(([ic, lbl, s, dot]) => s && (
                      <div className="slot" style={{ "--dot": dot }} key={lbl}>
                        <div className="when"><Ic n={ic} s={13} />{lbl}</div>
                        <b>{s.t}</b><p>{s.d}</p>
                        <a className="wz" href={L.waze(s.t)} target="_blank" rel="noreferrer"><Ic n="map" s={12} /> נווטו ב-Waze</a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {plan.loading.itin && <>
                <div className="gen-note"><span className="plane-ic"><Ic n="map" s={17} /></span> ה-AI מרכיב את המסלול היומי — מרחקים, שעות פתיחה ועומסים…</div>
                <div className="shimmer" style={{ height: 160 }} />
              </>}
              {!plan.loading.itin && plan.nextDay <= form.days &&
                <button className="cta navy" style={{ marginTop: 16 }} onClick={() => loadDays(plan.nextDay)}>
                  טענו את ימים {plan.nextDay}–{Math.min(plan.nextDay + CHUNK - 1, form.days)} <Ic n="back" s={15} />
                </button>}
              {!plan.loading.itin && plan.days.length === 0 &&
                <button className="cta navy" onClick={() => loadDays(1)}><Ic n="map" s={16} /> בנו את המסלול היומי</button>}
            </>}

            {/* — אטרקציות — */}
            {tab === "attr" && <>
              {plan.errs.attr && <Retry msg="לא הצלחנו לטעון את האטרקציות." onRetry={() => loadAttractions(tripBrief(form))} />}
              {plan.loading.attr && <div className="shimmer" style={{ height: 200 }} />}
              {(plan.attractions || []).map((a, i) => (
                <div className="card riseS" style={D(i)} key={a.name}>
                  <h3>{a.name} {a.must && <span className="tag warn">חובה!</span>}</h3>
                  <div className="sub">{a.cat}</div>
                  <p className="body-txt">{a.desc}</p>
                  <div className="links">
                    <a className="lnk g" href={L.gyg(a.name)} target="_blank" rel="noreferrer">GetYourGuide</a>
                    <a className="lnk" href={L.viator(a.name)} target="_blank" rel="noreferrer">Viator</a>
                    <a className="lnk" href={L.tiqets(a.name)} target="_blank" rel="noreferrer">Tiqets</a>
                    <a className="lnk" href={L.waze(a.name)} target="_blank" rel="noreferrer">Waze 🚗</a>
                  </div>
                </div>
              ))}
            </>}

            {/* — תקציב — */}
            {tab === "budget" && <BudgetTab form={form} expenses={expenses} setExpenses={setExpenses} total={budgetTotal} />}
          </div>

          <button className="fab" onClick={() => setChatOpen(true)} aria-label="עוזר הטיולים"><Ic n="chat" s={23} /></button>
          {chatOpen && <Chat form={form} plan={plan} onClose={() => setChatOpen(false)} />}
        </>
      )}

      <footer className="foot">© All rights reserved <b>KOREN APPS</b> 2026</footer>
    </div>
  );
}

/* רכיב שגיאה ידידותי עם ניסיון חוזר */
function Retry({ msg, onRetry }) {
  return (
    <div className="err" role="alert">
      {msg} בדרך כלל זה עניין רגעי של תקשורת.
      <button className="cta ghost" style={{ marginTop: 10, padding: 12 }} onClick={onRetry}>נסו שוב</button>
    </div>
  );
}

/* ════════ תקציב ════════ */
function BudgetTab({ form, expenses, setExpenses, total }) {
  const [cat, setCat] = useState("אוכל");
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const goal = Number(form.amount) || 0;
  const pct = goal ? Math.min(100, (total / goal) * 100) : 0;
  const byCat = EXP_CATS.map(c => [c, expenses.filter(e => e.cat === c).reduce((s, e) => s + Number(e.amount), 0)]).filter(([, v]) => v > 0);

  return (
    <>
      <div className="card riseS">
        <div className="chd"><div className="cic" style={{ background: "linear-gradient(135deg,#14B0B8,#0B7E92)" }}><Ic n="wallet" s={17} /></div>
          <div><h3>מעקב הוצאות</h3><div className="sub">כל ההוצאות של הטיול, במקום אחד</div></div></div>
        <div style={{ marginTop: 14 }} className="big-amount">${total.toLocaleString()} {goal ? <small>/ ${goal.toLocaleString()}</small> : null}</div>
        {goal > 0 && <>
          <div className="budget-bar"><i style={{ width: pct + "%" }} /></div>
          <div className="sub" style={{ color: pct > 90 ? "var(--warn)" : "var(--mut)", fontWeight: 600 }}>
            {pct > 90 ? "מתקרבים לתקרת התקציב" : `נותרו $${(goal - total).toLocaleString()} לניצול חכם`}
          </div>
        </>}
        <div style={{ marginTop: 12 }}>
          {byCat.map(([c, v]) => <div className="brow" key={c}><span className="cat"><span className="dot"><Ic n={CAT_IC[c]} s={14} /></span>{c}</span><span className="amt">${v.toLocaleString()}</span></div>)}
          {byCat.length === 0 && <div className="hint">עדיין אין הוצאות — הוסיפו את הראשונה למטה.</div>}
        </div>
      </div>
      <div className="card riseS" style={{ animationDelay: "80ms" }}>
        <div className="chd"><div className="cic" style={{ background: "linear-gradient(135deg,#F09A3E,#E4762A)" }}><Ic n="plus" s={17} /></div>
          <div><h3>הוספת הוצאה</h3></div></div>
        <div className="addexp">
          <select value={cat} onChange={e => setCat(e.target.value)}>{EXP_CATS.map(c => <option key={c}>{c}</option>)}</select>
          <input type="number" placeholder="סכום ($)" value={amt} onChange={e => setAmt(e.target.value)} />
          <input className="full" placeholder="תיאור (למשל: ארוחת ערב)" value={desc} onChange={e => setDesc(e.target.value)} />
          <button className="cta navy full" style={{ padding: 14 }} disabled={!amt}
            onClick={() => { setExpenses(x => [...x, { cat, desc, amount: amt }]); setDesc(""); setAmt(""); }}>
            <Ic n="plus" s={16} /> הוסיפו הוצאה</button>
        </div>
      </div>
      {expenses.length > 0 && <div className="card riseS" style={{ animationDelay: "140ms" }}>
        <h3>היסטוריה</h3>
        {expenses.slice().reverse().map((e, i) => <div className="brow" key={i}><span className="cat"><span className="dot"><Ic n={CAT_IC[e.cat]} s={14} /></span>{e.desc || e.cat}</span><span className="amt">${Number(e.amount).toLocaleString()}</span></div>)}
      </div>}
    </>
  );
}

/* ════════ צ'אט — עוזר טיולים אישי ════════ */
function Chat({ form, plan, onClose }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", text: `שלום! אני עוזר הטיולים שלכם ל${form.city} 🌊\nאפשר לשאול אותי כל דבר — או לצלם תמונה ואסביר מה רואים.` }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(); const endRef = useRef();
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  const SUGS = ["מה לעשות היום אם יורד גשם?", "מסעדה מעולה ליד המלון", "מה אסור לפספס בעיר?", form.kids ? `מה מתאים לילדים בגילאי ${form.kids}?` : "טיפ מקומי ששווה להכיר"];

  const context = () =>
    `אתה עוזר טיולים אישי באפליקציית KOREN AI — AI Trip Builder. ענה בעברית, קצר, חם ופרקטי (עד 6 שורות). פרטי הטיול: ${tripBrief(form)}` +
    (plan?.hotels?.hotels ? ` מלונות שהומלצו: ${plan.hotels.hotels.map(h => h.name).join(", ")}.` : "") +
    (plan?.attractions ? ` אטרקציות בתוכנית: ${plan.attractions.map(a => a.name).join(", ")}.` : "");

  async function send(text) {
    if (!text || !text.trim()) return;
    const userMsg = { role: "user", text };
    setMsgs(m => [...m, userMsg]); setInput(""); setBusy(true);
    try {
      // היסטוריה טקסטואלית בלבד — תמונות נשלחות פעם אחת בעת ההעלאה (ביצועים + עלות)
      const history = [...msgs, userMsg].slice(-8).map(m => ({ role: m.role, content: m.text }));
      const reply = await askClaude(history, context());
      setMsgs(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: "assistant", text: "החיבור נכשל לרגע — שלחו את ההודעה שוב." }]);
    }
    setBusy(false);
  }

  /* זיהוי תמונות: העלאה/צילום → ניתוח AI */
  function onFile(e) {
    const file = e.target.files?.[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      const data = r.result.split(",")[1];
      const userMsg = { role: "user", text: input || "מה רואים בתמונה? ספר לי עליה והמלץ מה לעשות.", image: data, imageType: file.type };
      setInput(""); setBusy(true);
      setMsgs(m => [...m, userMsg]);
      (async () => {
        try {
          const reply = await askClaude([{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: file.type, data } },
            { type: "text", text: userMsg.text }] }], context());
          setMsgs(m => [...m, { role: "assistant", text: reply }]);
        } catch { setMsgs(m => [...m, { role: "assistant", text: "לא הצלחתי לנתח את התמונה — נסו שוב." }]); }
        setBusy(false);
      })();
    };
    r.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="chat-wrap" onClick={onClose}>
      <div className="chat" onClick={e => e.stopPropagation()}>
        <div className="chat-hd">
          <div><b>KOREN AI · עוזר הטיולים</b><span>מכיר את הטיול שלכם ל{form.city} · זמין 24/7</span></div>
          <button className="x" onClick={onClose} aria-label="סגירה"><Ic n="x" s={16} /></button>
        </div>
        <div className="chat-body">
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.role === "user" ? "u" : "a"}`}>
              {m.image && <img src={`data:${m.imageType};base64,${m.image}`} alt="" />}
              {m.text}
            </div>
          ))}
          {busy && <div className="typing"><i /><i /><i /></div>}
          <div ref={endRef} />
        </div>
        <div className="sugs">{SUGS.map(s => <button key={s} className="sug" onClick={() => send(s)}>{s}</button>)}</div>
        <div className="chat-in">
          <button className="cam" onClick={() => fileRef.current.click()} aria-label="צילום או העלאת תמונה"><Ic n="camera" s={19} /></button>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" hidden onChange={onFile} />
          <input type="text" placeholder="שאלו אותי כל דבר על הטיול…" value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !busy && send(input)} />
          <button className="snd" disabled={busy} onClick={() => send(input)} aria-label="שליחה"><Ic n="send" s={17} /></button>
        </div>
      </div>
    </div>
  );
}
