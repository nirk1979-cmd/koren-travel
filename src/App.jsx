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
.logo-hero{width:172px;display:block;filter:drop-shadow(0 10px 26px rgba(2,16,28,.55)) drop-shadow(0 0 22px rgba(20,176,184,.22))}
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
  background:linear-gradient(168deg,#051D31 0%,#07263F 42%,#0B4E6E 100%)}
.sp-logo{width:210px;animation:riseS .8s cubic-bezier(.2,.7,.2,1) both}
.sp-icons{display:flex;gap:16px}
.sp-ic{width:48px;height:48px;border-radius:16px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);
  display:flex;align-items:center;justify-content:center;color:#8FD8DC;animation:pulseIc 1.4s ease-in-out infinite}
@keyframes pulseIc{0%,100%{transform:scale(1);color:#8FD8DC}50%{transform:scale(1.2);color:#FFC98A}}
.sp-tag{color:#B9D8E4;font-size:13.5px;letter-spacing:.03em;font-weight:300}
.sp-bar{width:190px;height:4px;border-radius:4px;background:rgba(255,255,255,.15);overflow:hidden}
.sp-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--teal),var(--amber));animation:spfill 5s linear forwards}
@keyframes spfill{to{width:100%}}
.sp-skip{color:#6E93A6;font-size:11px;margin-top:2px}

.wz{display:inline-flex;gap:5px;align-items:center;margin-top:9px;font-size:11.5px;font-weight:700;color:#1D8FCB;
  text-decoration:none;background:#EAF6FD;border:1px solid #CFE9F8;padding:5px 11px;border-radius:999px}

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
    booking: `https://www.booking.com/searchresults.he.html?ss=${c}&checkin=${f.depart}&checkout=${f.ret}&group_adults=${f.adults}`,
    expedia: `https://www.expedia.com/Hotel-Search?destination=${c}&startDate=${f.depart}&endDate=${f.ret}`,
    hotels: `https://www.hotels.com/search.do?q-destination=${c}`,
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
          <div className="hero home-hero">
            <span className="orb o1" /><span className="orb o2" /><span className="grid" />
            <div className="hero-in">
              <div className="topbar rise"><img className="logo-hero" src={LOGO} alt="KOREN Travel Ai Build" /></div>
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
              <div className="fld riseS" style={D(2)}><label><Ic n="chat" s={14} /> הערות ובקשות מיוחדות (רשות)</label>
                <textarea rows={3} value={form.notes} onChange={e => set("notes", e.target.value)}
                  placeholder="למשל: חוגגים יום נשואין, מעדיפים יציאה מאוחרת בבוקר, אחד המטיילים צמחוני…" />
                <div className="hint">ה-AI יתחשב בזה בבניית התוכנית וההמלצות.</div></div>
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
