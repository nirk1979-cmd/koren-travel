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
.topbar{display:flex;justify-content:center;padding:22px 0 4px}
.logo-hero{width:178px;display:block;filter:drop-shadow(0 10px 26px rgba(2,16,28,.55)) drop-shadow(0 0 22px rgba(20,176,184,.22))}
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
.fld input,.fld select{width:100%;max-width:100%;min-width:0;padding:15px 16px;border:1.5px solid var(--line);border-radius:16px;
  background:var(--card);outline:none;transition:border .18s,box-shadow .18s;box-shadow:var(--shadow-1)}
.fld input:focus{border-color:var(--teal);box-shadow:0 0 0 4px rgba(20,176,184,.14)}
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
    `העדפות: ${f.prefs.join(", ") || "אין"}.`;
}
function bookingLinks(f) {
  const c = encodeURIComponent(f.city);
  return {
    gflights: `https://www.google.com/travel/flights?q=${encodeURIComponent(`טיסות מתל אביב ל${f.city} ${f.depart}`)}`,
    skyscanner: `https://www.skyscanner.co.il/transport/flights/tlv/${c}/`,
    booking: `https://www.booking.com/searchresults.he.html?ss=${c}&checkin=${f.depart}&checkout=${f.ret}&group_adults=${f.adults}`,
    expedia: `https://www.expedia.com/Hotel-Search?destination=${c}&startDate=${f.depart}&endDate=${f.ret}`,
    hotels: `https://www.hotels.com/search.do?q-destination=${c}`,
    rentalcars: `https://www.rentalcars.com/search-results?location=${c}`,
    discovercars: `https://www.discovercars.com/search?location=${c}`,
    gyg: q => `https://www.getyourguide.com/s/?q=${encodeURIComponent((q || "") + " " + f.city)}`,
    viator: q => `https://www.viator.com/searchResults/all?text=${encodeURIComponent((q || "") + " " + f.city)}`,
    tiqets: q => `https://www.tiqets.com/en/search?q=${encodeURIComponent((q || "") + " " + f.city)}`,
  };
}
const daysBetween = (a, b) => { if (!a || !b) return 0; const d = Math.round((new Date(b) - new Date(a)) / 864e5); return d > 0 ? d + 1 : 0; };
const BARCODE = [3,7,4,9,5,11,6,4,9,7,5,10,4,8,6,11,5,9,4,7,10,5,8,6];

/* ══════════════════════════════════════════════════ */
export default function KorenTravelApp() {
  const [screen, setScreen] = useState("home");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    country: "", city: "", multi: 1, firstTime: true,
    depart: "", ret: "", days: 0,
    group: "זוג", adults: 2, kids: "",
    styles: [], budget: "בינוני", amount: "",
    prefs: [],
  });
  const [plan, setPlan] = useState(null);
  const [tab, setTab] = useState("flights");
  const [chatOpen, setChatOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const runRef = useRef(0); // מזהה ריצה — מונע מריצה ישנה לדרוס תוכנית חדשה

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (k, v) => setForm(f => ({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] }));
  useEffect(() => { set("days", daysBetween(form.depart, form.ret)); }, [form.depart, form.ret]);

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
        `${brief}\nהחזר JSON: {"flights":{"advice":"המלצה קצרה על טיסות מישראל","airlines":["חברה1","חברה2","חברה3"],"times":"שעות טיסה מומלצות","price":"טווח מחיר משוער לאדם בדולרים"},"car":{"needed":true/false,"reason":"נימוק קצר","type":"סוג רכב מומלץ או null","pickup":"היכן לאסוף ולהחזיר או null"}}`
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

      {/* ════════ HOME ════════ */}
      {screen === "home" && (
        <>
          <div className="hero home-hero">
            <span className="orb o1" /><span className="orb o2" /><span className="grid" />
            <div className="hero-in">
              <div className="topbar rise"><img className="logo-hero" src={LOGO} alt="KOREN TRAIVEL" /></div>
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
              <div className="summary-glass riseS" style={D(3)}><Ic n="spark" s={17} /> הכל מוכן — ה-AI יבנה עכשיו תוכנית מלאה ל{form.city || "יעד"}</div>
            </>}
          </div>

          <div className="wiz-nav">
            <button className="btn-ic back" onClick={() => step === 0 ? setScreen("home") : setStep(step - 1)} aria-label="חזרה"><Ic n="next" s={18} /></button>
            {step < 5
              ? <button className="cta navy" disabled={!canNext} onClick={() => setStep(step + 1)}>המשך <Ic n="back" s={16} /></button>
              : <button className="cta" onClick={startPlan}><Ic n="spark" s={18} /> בנו לי תוכנית טיול</button>}
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
                    <a className="lnk" href={L.skyscanner} target="_blank" rel="noreferrer">Skyscanner</a>
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
                      <a className="lnk g" href={L.booking} target="_blank" rel="noreferrer">Booking</a>
                      <a className="lnk" href={L.expedia} target="_blank" rel="noreferrer">Expedia</a>
                      <a className="lnk" href={L.hotels} target="_blank" rel="noreferrer">Hotels.com</a>
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
