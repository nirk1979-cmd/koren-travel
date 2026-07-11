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
.kt{
  font-family:'Heebo',sans-serif;color:var(--ink);background:var(--bg);
  min-height:100vh;max-width:480px;margin:0 auto;position:relative;overflow-x:hidden;
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
.logo-hero{width:158px;display:block;filter:drop-shadow(0 10px 26px rgba(2,16,28,.55)) drop-shadow(0 0 22px rgba(20,176,184,.22))}
.home-hero h1{font-size:34px;margin-top:20px}
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
.fld input,.fld select{width:100%;padding:15px 16px;border:1.5px solid var(--line);border-radius:16px;
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
const LOGO = "data:image/webp;base64,UklGRo5IAABXRUJQVlA4WAoAAAAQAAAAowEATwEAQUxQSJwKAAABD8MokiRFWz2wx/Q+/0YXNEREFiaiOxcEiF6BO0kXLPat2++GAGHkJgQIQ3I2oxkjKGrb9qZtjIjI8MjCTmtq3OVBupNOjywMqZ09CGlRMJz/WaB/iF/ofd+/M6L/siDbrdvmiggl4gLpQ5NKsigRRL+Womj533DU6mmRpV6LjH1ipbnZ8i+bzRXLnfK2zn2i3Tno9vxL96DTNt2ZpnrrDFvXPtF/8i4rsrx70rfcGaa5SmxdbuvcJ8aTaZFlMrbdmaYz1axB4RZbN7MtuE8UdGeZzlRbplt1W7ZMnd82jGmuOnG4lbblxKcLr3K4Xb5QE7aliK4st3sbYtJrF5aLt5Tp9uzIpOu4trHnaVmQhg9Dgz5bUXHt6Mzbskh0Y0XDteEHd8uC0a0VGdcWfkXCtUqsyLdWmRXp1iq0kkiFxL1WoZWD3atCNdYuXN09sNcqtfLmfic3ksmqc//NbK16y7llpJPV+dS1VM5oLdFH1vxWFTTKXcrj02dVRaO39zvasJLc59vcqtrFZIlzGOmSGGEl3sPIKGEla55WECxFxN2KgTUreoj7u4Fg5UWMQ31T0BTDvTSH+kjc6+IfjHtV/MNxL4l/RO5lEHRFBMFXJBB4ZWdZAYFXXh9spPQF4JKdda4l5AXiMnzAm7O84xZyDmp11P1K042D1zPhV2p188EImPuVJtc6Z9l0CraU1rPbeDCC3a8ULenBcOpeIH6/sro9dvMHI1j9StcvY/fA6PsldrfHvGu32RXu9Of1FLnA/H7B79zxdnuc/HG6vwrcO9DvV/qdO4PDjRSwd7yc0j+Ly872VwF7B8wp/bO4wUEzhesdMqfsf+ZH3c0ULQkxZ2e57COxrNdKoZJwN4U7WJ7jC1IS8qaA5zO4m5d3LBLyplIle9JZRdqGvanMqwJZr90QtK3gmVWZF25G3VaqaVuhSxQBrq3Np0Haht4klIC+vLG6b7fBNyntCvXgcANhfTiYmsBvMo8QqQmYzPE5D5Gagklhmb9G+S1oVAUlxD2cIL8FkarQB9ohLgSj/BZEquAy+eO0cy0BaUOlCq0dnv68DtOGShVY3t7vrF9G+S3IVB4J0zceb03hSlRqLldzCdO/DW9N4UrU7bbxssH2bRqSNg8GUzI4Hz7p98y32w1JyFJj62SEHcXfX2e+QY1FR97VzpNsymsJJhqw0T39QwY2tqfoCMFG9jQqKdi4nuoGk83dP0w2d8HJpi442dQFKJu5IGXTPmPWYVvD57+mre6I9hkzUk27l7E+Y2aqAf74iJjRZE9u2w9CjBivWd/oIRgN23M9VADydvxgszuKILR6Wfyg0e4zBmImY0BmEgZiJmMgZjIGYCZlAGZSBmImYwBmUgZg5j86gNkX388W48HXfE/TjQ1fhd+SEBW+5nhLAmAmY2IU4ZNL9Vr04PHnt24uJ7GDZ3eOft1dS+IG0/cvhq/v7yxHDibjyfnr35opVJBe/nz0cfwgjr4MH/BsRv+WM4og8P4sroD9jmHEINzJE/E1KMadPKMH/XYjjj4T+d9/xDwm40kE4f3L9/GD7Pnd55nvevuVtF6LDZz9cOrBk++2N5vLSWTg9PvHI8/P3Cf97m+7a0lk4Nt7A/9LHN/c31mOC/S++OZJVuCWpF9upnGBTz8r8sf79tdmZGB7uzuCPb67Wr1BE7cOBqjvvkyWb6yyROt650mG+e7LZO3LH9e3WeJKu58VeDEWRtk9frhFE5d9P6eGD3DK/Vcn2zyx2R35bpCFKW//7BFF82Dgu0EWppxnRJGuzoieC+44R4NJFY12zw+QIxjiivxdhz6AHKsVW8wUHoAcmixbLOUKNzB64IuZwgOMwhe5wg2IQhi5wg2EwhiGwgmAw2TmjEa77wa+od2RRtrquQFvEIu0sdkdOYFuzOasYRCdAOeBNkyiC+CENnJizwlsQhzG2bML0AanTxymwgVkAyplDkvhALCh41KHqXABV6QU3GEpHIDlgTwshQOwgtkgD1thv9QH1QCM2cNW2M8UBzXUbPqwFdY95qAiq+EPW2HdY44pshoB4FAYAmo04CqgsdV9lQuocc/LgLT50y8zARXmkw5Yunzz5nICKswnJVCr12uohqYvAfAF4aAB4MWcJgLQxZymAtDFSaECwEWEIgOwRYSiA6BFhCIEoMW+IwSQxb7DHxBvEVMACG8RkwK4onzSArCifBIDsOIZEwOo4hkTA6hu45MDoKI7kAOYgqTQA5ACIBQEkAIgFASIAiBUBMDDQRl12zwBPKqawcEtnsAdMWl2tn+9RRNAIyYt8jqOyzwBJ2LSsMMvSnkCjU3g4RcRBUybYi8eIgowdeCBZjEFljrwQLOoAksdNqpXjmMutR8DAbreX7XHLktyrLKoa9cjRyiO+Rd2TW8szb43YUGvTSJFJuyaLFDXkiNtHoSu2QJIoFwlhA5vnZhJDMexe/hjYPvEjCLwskcnWw3fTsXw8gYOdvjTfdeJGcPLGzDYwU/33USClzfwsrNeu0EW/XYDFTvABLK4DQkyEd8o1pzBY0gQMG6fCP7Pgs+QnyVa9jR7/OnFAhGx8rOEEYxn2C8FIsulZwmDHXx/9iroWQLZDnt5o4BCUmYZPyS9gyjxKyRllnywMXzgiyI5bXUzdkwUmhKisV5JHculj46H5JgoNGXMDnGn3XIsn995MSa2fbLVQKEpZWbK+z3H8vuz99zOymBoypvqD8d8f0TFWRnlIbACOSsjjLAfLtCIZExczcL0iiGnoQFuXmEEqCjONgxLcbZRWKqzjcJSnG3ZmYH7PMiOsH0ecEAbNg5IwwYCcdgwzMRhwzgvU4cN4/qGODWM64TS1ECIutRYIE0NxFCZGomhMjUUQ01q2aftK/RzhJdwbhIPHBfqNLIRDxwX0XTMSWKDqJLDBtW8XKphg2p+O8WwYThPpJPxeEIg0mxyTZMPw6dPh+fY26DNjPQC5SXoq68fDKHH1A5uussXJ+9Uq/kcu0KPqR1cKb/Fzt+WcYSKuw1gAi5KTrCXNen0YGeVu0A0SRAT2VFuosqMydvHOzvj/lCFQKaPZkESvpbkHKEmeKCcSaRfiMTJGRyZSOVMxv7ww6T0BOTZHJEmeKCkpAYczegz86CJ/Jtj9vpFnXvDWj1d2dgrmHzByTibIyGGxQvmfDfApDuTmOjLK2OxxDLOW6DOSR/yZEB68jNZIEGTIQpQ79CTaunPc6YrrNpgBaZ3EokDrddKzAdKJCVtJYqSH4NRBCgIRYKCT0Qo6ESGgi01TEIUZCmWkqJgS1WWErmwApbyLy1yygXLvxq5GUPjX5e0AkLyrwgLin9pMtcHI7WA6mSAEAhNnMZKtzpp8jRWudVBk6ixyq2CpZm0stlAFSqPoVVOMqlW+UCtcrJWtTKqopVm+amtUPJwxcuVcFWS8Ktj3p7jJH3PtQsF+lrRTYM10r5WPjrXdHIj7WvlSCb3IvEdaRnXNCnjC8ZXNrnpi5PZdH2TBF+Szp0heI2TbZ9TS9A5Mm2vctL6e46s9Qew9ehwt4DuB1ygw7ZjT5mMvX24seuw9y4t1GHb3lPePen7+nDz0FHosG3uKY6+9Z7+9VHxP65hpbnp6ls/j638e4q5P/z7dVkCVlA4IMw9AABw0gCdASqkAVABPj0ci0QiIaESyf3QIAPEpu7mCyzb5OOH5JHwL6USjP3r8l+96/74H8av7h+y3ze2Z+n/eD91P8d8xP8B46fD/IB8GHlH6j/iP71+439z////0+4/+3/7Hsr/VX/U9wL+Gfxz+2f1r+7/7r+6////5eFj+7f9v1Efzz+sf9f/A/u983XpN/yX+q/Yb/R/IB/Of7j/2Pz/7x/0Av22//Hs4f77/1f6D9//o4/Zv/xf6X/d///6Df5p/av+F+f/yAegB/2fUA9M/p1/cf7B+0fmb/Tf7l/gf2m/t/kc+lftP5Sf3j3Esr/aRqs/E/t5+c/vH7gfmZ8196/5F/P/831Bfw/+Qf33+2ft9/iP3C+nB9rzpoB/QP6p/tf8d+8v+n+M/7bzf8QH9a/9v9wHtc+BT6P7AX9C/wf/e/wX92+GT+i/83+Z/NX3Afm/+Q/8f+j/0/yEfzD+vf8H/A/vf/sP//9XX//92X7Df/X3S/2Z/9Jm1s2iYGa55UacqMZbcFJFR1GV36JyInWNjjEA9LFKj3SxSe4OG7dbwn7//7XKuiGm+bVtCl9UnA7Q3iLBXcFQ9t0lvzxLJz0WMFGbRMDNm0TAzWcHq5DylpGP5mwrT/Aekz5pfiFwpv7jnlcil2ynJh/2WRroadK0Hi/W2Wa2bRMDNmyygNo+XjWjNIS/NY8ogS0r/7f5rCH/DjWSiIMmkjWpeWaLs32v6Laj9EXk+Hm0pEuEoolBlBnQZG0+O4LI4EWU+bS+ndkjY4k4qnw/mPXauF974F7VOhmuqAYYWEk2bkRSrYse9sfeN069jerBbse21Cr4wGZ3VEuzWReLO3ybIxmtIFSdVpsrQR1K5szc9A07siJhxb3DRnW7YHlhKocIHVmuauhZcTq8xOZ06LpoCN6CFr14PLepCR/gW8sPp8F2FmOArXTJWRfkHIpctN8pPrs1s2h9KRnX99lzjhonxIQw4ugd2XNg4a9cy+h744B7pNxuLYzQ0VscuPPsH2uqEjF13Gt4/UXDm+86Y5vylG/w7M1qXCsqPdLFKibUjN3LkG6QyNFDMT2kAb2W/TxDCIz29h88thnaR8b6WTYV0x/R1B66pJeEeQbJnE6eqHb5iUM5b2p8dgXilR7ju0Czo6jcx8+8/dbuC88QN15Ug7G8Z8g39vqM0UofbNODtaAc0DHMr+gOApnznuKdeScH8ZaoaBzVqcZl8EBQ91a6WJLXeKVHulgBux+2qizRve0kd8eOLUmbjLIPmlp/UUwmKicUrXvtfQ12F9xT1QOddmtWwUs+Aefw8eRh92RCxMV6gs2bc0chjX4Usr4WsXm67j4FZebgBundkjWmHFQkkX94uC6meF2Su/cfMtlfyfmgsx0Reu/NDmqsdnEmR69pEJOzlxAEBBG8U37skbG0iFYTIH8HtIryHbCPw41kh52szkEmkHbGs9/9N+P6+wMbO/5TNYpbHQAO6TDHNW6DQufKaQDO7M5e0NY5618wXZrZsn9gpDdRrbq77oQ2AbGHQTKcS4BSsX5SbY7jrakc7DnSyWlODJ4eHgNLhgQJB0HI0YqsYqJza3CHDRO7ZaWez0VZpNwY5JBooKi3SrDCVA5VXhcc0QXiiXEhuC7q2Q2H5vrezckkHGhS8c8bB93tfLIizNMGlUvOWwVu/6ap0QUVhGWiJH1PBsLhhOUSMPeIUu/tTCNBZWhwJi0P3ylKe0NnEZ64OuIEnGybVdO7JE3mV3Cjf9uG4STBTfdRNoVxTldsO/zyW51mfjIOLkd6Chs4vCzIiIFXb/EMOWgCVW5IqTBCOn+RcNdpxiDteV51I1gVg3iRzNWmLApE8Aad2ROFHmIXWV2m446+M0oaaDceYftIj/+bHKjeHaM06w/Z64/viZMJV0DvG7d+ynhwx8rF3tIVSdAgh65PmB3EuudMWRiyFKj3HkrH3M/VZMLhvTkMNi7X0+kvuUjC2x4/WGdZfsBwvkL4V6Mam73DEpIOkq1psA7sXbQ4ZoaW5/oztZutNdqcq+L1SpJxY/3RPrlKj3SxPcAeYiTmoWT+Ly4S5KNjQIabLixzo+B/0zCOMsC2hAGaqhNzTJHfvlDj4M8F1lW2WTNzk/Yar/1T1D3YpUe6WKVHuXnLe+tXpCenk1RwuGFMZKK9mhH31fYzCf/VZXxVRu1eV/4KAIRvSs07skbHGIB6WKUb94yrRvS2oAhU4y/AyDKs6exEKx9dgp0hX/dReCUqPdLFJsAA/vcJfIcZ8bQRXcyWZbH8RMoQs1NrWcN8I1HKf2fe7urNbv+me5mtw7fEYazwIwfxfkgoliaBi2BnbkS8d+ts7GNwltzVDTOtV67v/8sgtF7kCvEQqcCIb+Di2s/c17sDSljqXfFHVHGMyvD2TJ9gnz0d4PN1oV0zAOQrl5aOA0m8yU1NHpbyleYTrTf/SvJFaDwxl/uCxXB6PlgSbDxK1fWU4AAABUu1scDUe+g7iScR4oBvYHNCQH4LkhjNdixLlQo5SuOlRfJqBTfhl4f98+eW8NWbghKzZWmVwafh5IMW4hEGcK5J7gsvh1m2FnI4gU+vx7fLmv7tWv3pqC71acjVXLahA+1y6pwTsJJnoDakAwaaEul9JGmw05XNevdPc6DzLdNAEO22lVPfo3SMi0fGFTECOS8rOx7qnGDBdQhMg7a5EFhmioBqos+pXYdFxohfHJepr7yEr/+hQcy/lL6K1v7UieB7yDzCd7B4BOeR8zvb5b4FcRgwmfaaM9jJJmshCJVdDiJzmQWZ+wrScP9OJfgJQ8/OE87eAteYtBr0PoIkktbGZ8IysnJ5sgsjxBTSC/MOMMPx1Q9R0nNCJKa7+QcGRJ5hgoIDFXEJsmsSff6n4RJHaVuq6JBrZkGFiERmrjOi7YrivX7Huzd14Ox2Yh2bv+oTvj9X3udzXfQN5cdOrume658ag85UHIN1HCWi8TRa+sDK9MKMe3MI1Qz3oF0dVLJ2pRKSr84xlWCE4ABL39e/ykYpVSaTlNmzsklBbL7qblgEse9tI4k/HD6E0tcxvwBhiih3TxH7wbI5AnTiSTsVaejYNfIyqvM1B4mvtNABXTRlPamGDiI+6Yr/YTtOYp/7zmu1qK7cMBnbAhvGiQRQ4V7JX4SULZKGvu6E5FnzF+pj8w+RzoVWVUHzJsnd+Fe1FE2AYr72+a+mWwcJ2HmdFRpM8BM4zQYlaEEG6BDAQdvXAYvOeGgDjNn6ymVJtGBlj9J9IJObW7kC/eTrbOdrdOG8BGciqcicyAiyOLYVj31Kf/QmLdzBB0FTw0Y9xhdTYuvpBmQgGyha+TsNEO06JVrdbJcELIiKwTXJegZJF+7zif0UQetYtm6IdF/tAm5tdNB/QFO4eeGaX6Dt4nt9c5Owb8ZTp1/CbCVQ+7VQsZLeyMjLlogsj4rrFKsx2k7A8JZuA4ww0CBjwZpXCXvcpaFEyI2ldxjgurg3hGTp62FKn+Jf1g/r2pDo3pu8fUZxlFTC5f87IncXG6ooJajpv7bvTiLx8zepCagqA378wHo/9vZVE0PZTlQaOD9QcibBb1GdVNJLC5CrwnNy91IuBIpQLHAjmCQWAANDZJsUfGrh0cs5kpTPzuGt2hKp6tl3sP1Krlq1mrZifzGNP3VTkaRSkgtSnKCr1l6ZTGz6K3jvLB9h79oUg1T2Bh5gNchrNfcpcxCFoN7PL40ppptSB2HWHpiA4o1Aqj1H1mmGaGZVodHPIK1BflrMK83XXXHJXiA7UEF8i8SgGtL/qDCk6jU6vzxhpAsJYlejWigkQ+qg5VmIyM3nryiSNRNZtAg0ZFLGD3Q/50T9F73t2vJCOQSanlBN6h9q8yGFqfKjmuTNqbLOupPzxTop43bH1ZCaEiUe16qUm7U7oPrJGd9U84kHLoO2hSAI3sapBJ20eOhgyTuoc/WsXot+ZM+IOqd4Vy2K5EreOXyouQHBSmUPiWb3xvuySh1HZuBNcS98FTbDW47WL8KX/Ff7t4s+gzbPCf5IrmGTqr0CugGNIBelbUq3Xlu1T7wcmp4b7eoE//mqpS0CkGjGpreXgKhYoyqW0RkStJwxcUdvsMnLauRKEFlPWzwEMEK4TeKJ2w9kc5hgindk9A+9FfB6ZrUmrYtcUe0YOIieFDJicC5iJRIJgQ6D/t8IYFsthqvqyepyfv+YsvhGyl/tkc8CanTD0WMZQN6tVHgbmpWRh7bmca2znCHzVV/RxdhwhTjMzaP6d5ayJ/eZHVC5oOzyJaqefaHKVeuH0dq+4zrGJZfBwuWNveMzc2S9kdkNAV05ImDHMxtRvzN9xrz/h7wJqFJSNSPYplTyGuuPpwcwSZZk2qnaiEn3H4BkcSu0x9b9Te3QQSj+53tjdez6iec45UF2B3IK9w5uZIGMKHwpbi8Z6ALZ0cfgvRwtvWHkFFtfHS2wwM6tGc4wT0pbs6zJiPgNzhJQhCdCiedNVeVQ9IyVGjp9ctgrA0Gb/WpB26njIL5nSZzEfXfa/GLm9wW3w+zVFiwmtFIByZmw9lj2TlAuRajxgsQUI73roG0Tf2n45T+z73GoSktDEbsQJxCtJMk7pRyB4Ju1NgJLzfAJrrO7WRsR2CUJGqvsr0h7P7K9awLKfqDCZ7WzyEbUKuP/Ef42ji4kvEx2ZU4zpLaok7PqSzZ678rrhRBUWKpdTXPE6ZgLx4vlRDcR69wX/RVFs3LErlBf4MYpsOOoTELMdzQqjpnqmH+xRY/GynV+sA8ufjeR+AvdFaP1s7UTL1+orQHbPeXe8282SHyuX89uU7hAmqqW3Y0MhbuFF6dte2ICeD8PIGclzplrNqo/V8+dyxEaduaUjDPdbFdipTUHzMDLoZVp1BijQWUiPBuZCYEKS8F9weJO4E5qnmXYtQ33l2AXl5MLBcI7OpCJT1/FWKsu0Ajhg7fMRznFsDdbsp2Pdr8r2WcNstxoG1x15fsdBYCQC2mbbMQErYt1QAUM49FyDCQh6BiZ7xPVwD+GuaQdrY4be7OS5UsALKnN93G0gMLNnFIfScJJ7luArPa8rPNaN2Yp1/9+sVaxjfSF0sEWgC/g3pVWZy1J0O5sc9qYsVo8UD5nqGCfI0kuAl10Qwz/J7lmqa1P3ElRqPD2Z/2wbbV//dxo+J/sDDqfHNaIwRgAeKxU/jys/mdOXrVDkDLvNFkzjY2OyZEXwd//6oo0quTQydd4OkadNe+UtCbvsXqOTA65nO2m0qmlu1b62IpW8E4tep5Kna3AYa8cKNX58qslvZRyvBm9Rp89DL7EvVDG3TQY1TOYywK8yeppoNswQlJaFQZvJSvFXKIcDX9jXw6QsI428YVI1pPxdthjPBvRPaawU82NrD170GX+96zsb0APjQn8DxkxqwBHgjPUVO3tBy3bYBpdEQ3wQhUf7b8CcY03xS+C9o2RY/+zVi1QRRfUQWjMlHT/ebXOCzL5zVNQn3rM6Az7mXfksLVq4LT6NTy6XMKqQOhX9lNjrfE5NR7jUEryGvV3AQ8IlvlxYHF/R6olBnB0+ncM3EwLXSavE5MXNjUzgkgqI1c5f9p2H9mB3ogXUPBZsi7SYYzpCBzVCp+rzxrp4ZFkL2b8bs7ZdxfsmzjlUPV8GjTfqItFuWqSB/LnMpX8iXPenMe2HkIpbAN4rbmoTObiuXhPra6uQ59iJL7mXhCDEc5mZ9kM4UHbq3MDPtbpqTtqa+kSwTNe/pFZJXZ7yVIdm6lUpM3G53ejT8Z9Tj47gSniskWfiF5pazbs6zyobaT8qyUnpViYeO49xjm1fcyPAzE3ahXw9H5HX/4joKFM8Tjol3AivbP2OtzT7StPIhlTBHVUQ5/5CXZdzagF59+GmntMS/6NB2e/1Z9YNZHjb0e+K/fjrXpRTGauooZh7gANCVYxh8DSuU06UmtykPrNAvM0eX38Mcb/BtOMGJluhqoxkcRPFZ7FNN+nNqtTtB3iyIj5AhJndXWGXPEJ5O7Ej87su1q/zfJrOt+3ZwGC8pQhCdTBgpn1DHTZL0nSe65453t2BvFPAZnfs7oyMIMbWfwMgKTtlQVSd7HTIW18Z4XmdsB7rJ0Ulvu4qtePLLAT8Q3afLGrajSX4fhddgUTRUfGaXUoP6hr2A5nWX1dseVM+p1eXeKy755O+PLMXPdXZSP66Z1Dg0YFcxBdktokL9t52QckKbHsj2JbonjnZjk16Qg3PfigjeFBey2lO6mCGdpn6X20UTgQFlYLaYnfRrfbUwyRk1Qkukw6N4nH/eOExLncUyQ9PlfTzMZhi9GKvgOkvm7DkVSX22yL6NLaHyaSJjjVg3q5xSJp9EI9gEoUS46blHUcyuUWMaE5u+cqMRQ+yIrRkwoUaZZodW9QEjl3yZZ66so//eKnt4xuqpZDT4Si4yNE/5QjHD+ngZcUhvZ12YoBKDNWgKbSNaKafTHv1Iu51f0kJLF1vFBn2ML4y9eLoWpXy/Rldzfi184pxNEWOphQ+47flLBJ04aENM/gEPPHpnZ0zuy2j5NrcdOMjKKnWx5kqPGCo3nSMmKYpf2m3dlNS1oxvXLfSyLJkjGDUgrBDQ67XQsIVsF9fAXKkk7qoH8YCRssFenED78N9cIXQZYQzlaNfefo6qnTsQcUKtSakN+4HYA6BfyRNRiZypCQB4wHjsfOFTDj6HAdfij6fHZIOms5nRsSU21KbjOdc1qshL9ZN3HDto/dIAEXaxgx1U64cjqj+RrYL60/dVLhV2JuVKU21hQMpHJ0kPWj3W5kbFDRnrIapIC76i+rI+LrlI3dTQcIDr1IEoERLxLS/lW0jYHY4ymaxGd4F0XQgDi5DjWrtQyfCX34AMgMUsACHtWZUglI8YKwpe7b8dKdNJD9pJ3uZR+gxz8RpTQE68+mvEjGCPaxO6mP8YNmulZO5RIyI5jZqAN9DZ35YB5pOfPepYmM9oOkLCNbHlwl0sAa8Px+8/CR4+9xx614cVEkieEfWZUu6iyps+EINqI50KJANkpbq9SjeAPfp8/ffHqzz+V5oLrWey+AYta6JMqDXfa6NPrLrC76bWKOIyyq9OD/QrG1IEU/wd0oVhGMV+hHOwm50ZUYmsiVvf6lqi90C6ZRQEMFBxRz1f96VbA2gD5baCnki0cLiYdYr8lpSKfedJOacx+iLnew0vGnDnGh44YGVO4lwt4dmTr3q0GNA6Q2VE7fFcVVpVmmaqmg/xcdr9WdRQlT0/WD7CM9fmRMnUQMO6wLEPTBCmoCDlSpLj4Km5EFNCpVVulDYZNycxBRKoXYF0rhOmBqU7qe1vFO0dy2rUMkpbDA8bbakiSTVl+tnb0FnmHBChZSIMKy43yS9JC2z1znBcLewpyXf/qouqkeNCPmHHpdIPi7afvbehFMRwgsrVuc6WCG3vcnJ6AAUUzdy33nPLo4SyhlX2kNWjDmcWCl860D3ousw346IStQN1bN5qBXp0XOqMJHLihzuMunJKSayZm3Qg7D/wqHGU7SfEnBB4JpwScn/Wz2ecNFzYXbl9M6EBqi+ZNXLJ0zVQilvX60FYKJWam1EZdIJryz2CDsSZW92n/CnKvyTjIbe4g2Ygi4RFhOeUXYO4MFzwObLQZ5hc5ECxiiVayHTo5QIoRKsc9aqeXVHZqDTDEmBKFxeg4SniEGpfmvGIiaD5nA7TnDdWBL17i0A6/8hjO8+HoLfoF9m87z+rREmifK/ybAGYLClxD3yvYWaTyzbiZKH/RKk3rpap3+YJx/KVVgsh1DQfVnt4H36wpugfzVP9M+RogAFoLrPf/lHzyoffY/RN7/k23oZOOhp1gmKhcbuBnRXOSmY2a0BqWwSGJNhWzeWEeW851pHqUojZkxmJlifvLQfym1p0p6wpHFUeSm+vMsObrkLH6SzlpZmoBTj/YZ9/Jc54R0afjmJB9RmHSvyYjRG0isdeLYeyeyBULQXd5dwkS1cDO15ZFMYOvt/dJMXJXysN9vzy4b8TdtlQeJ+w1v800662vmvGGkDQnu3iTGGqHpme0HV0d72eSMOD1Ja4ZYZdvjsUAEufhGbGvLxLzchyDguSSNdXYm7BV7QPjXfmFrR9m0i7wytTLNmI3IhDXYHmLcijR11FOLg6OyQzQS2ccqab/GZQD4gyrK3AwoNOFBZv2ytUSHsGrPAc+Kc6T/BR/ijbVGYqGcSqfCWnQPLvEyix1Ibc2fnEc9vbfib+q0xtCGICKNfnByxF4Fw524qn2Buy8uuLlxf3nO1HB0bH/gp63Czg+CuRCrVdBZVQq36d98qVQ0bvzFvF43YP6ABW8zPUC/dRVrIAxP+JqiUON2WBQ9vOPH6WLtX7lGjHdT4C2k5abdjBpPxnCdrbtjCtOG52qeZfzSuGhtNW40z3ldszLdAN4G4uxcd/MceFi+H/BIyu2UOyZHH5qgW/0A2xGqDZges+BX4ty7lqGumWinD3JEQydfaXlggn7BrhXkER+i77N5BIFr6TkmLsrt3bYtVlBieMscbTgZ0OPwUd+rTBz6uGTyse/offS0DlxNmEdubnfQIrsyYgMNslnWzB9hmdHAyo0HbD/xLYHArmD9DnSF8EULTRdACGR5cQl3w5idNQiLz/MT0rjJwtdI8QAbaRznG86GkuyvYuq+MdXeCD06fcVT85B66WobPtdDs01BZL5bjO3vPPYApyzZ9/lH7XUVIlaZ6dw/IOxfi5t1VIIaKU/C0RJ6O4I73gcivEASAPj4aBKl2if3yGg/LIj3qZGqosd0Wh7ArnR8q7PSvyinnznPFncQ19OE63fEhOe3425x6JJXWveJ636kEtlQnhyHTULpfnxdh47He9xtyWs25WIaWFtkBsWcuNGHiwTtI3teDx35YzuRx8wcjiVU1seSG6uZMhlWVJLX38jO2a8//XXCjh1ShpzK3BTOpE4STE1a0XIOXLOn7M69iPq4mG/wgwhGU3U5yAKprWBQWvmzypBXkS9FVbqeLea3OTdw2f5X7LaqzFsXJUeaeCV9vSvL24zidrwwzb8KkdJKVfSggJJ7It7rv5ZePkURuVNcutrn4MOiKXvZPc8DsdQZde7VDPoltj2Q8Q/Lmc2BCYV40LJRH+i1tDPoQH9fpv2PBFMbK7o8D4qUwR+INIxPsQh8xqgY+YbBm7YHdpTVo2h2LMLuUhyh/1I65mTvDAbhrjNdE1odjd8HuF/ug5VlS9qCoz1lomg4kC1wg++I+BUvjPoJ9s1RTghNV6Fa/4jJc4wujpgxdw75CRoFI/z5pLQT0Gjcsf+9GDLOx7peKlu19rDQhm7bYUAANIs6ixn/Ox2U38bskxdbI/GguEORPDhvOI1U//4XVATlt3hBueT6MMKi2NDL0KuDI6/TvOFhKWuxYmkfyUvCX2GD741RXWni7dglic4vF6ctv8DMd0RF8+jtaZfdsNniaPqA1DhtZxoothNPxfza7TJQecdGsnVwQ9Y2zybdN+RoskDjveDmbqcCHr2fw4Q/27zf8dr2XzkkYA6/7wKs4dC3q/w8tIcC+C4MkVj3VR07F4YFJO8B7X93Li5W8FYuysn0V1HyMg7+bntxgA1hwCLSQLUYd6e3bRumqMP5Y/BTVZ/ufNhdfue6WoKtlUPTNmetF1Vg5b0LGQEK6wiBAkAxAAABYp+9XvW/cZtyQBLMmPM4rGSesyS4pTKcEIi+Mp8O8qGyf+aYQDQsEVq/JCmu5Wo5r/MAPSoJHsQmnaposyO2cbt2QELNl43MYOfUNH2CE6ETwNGDRm1ZRzosl0X5BAuIIfLTYI4veFaNYavK7afaQi9eYTV5FcVERUuc8m+rFDkWHZd/E+QE4aRplOWsg096fN8Vup+eJssjaePC39WA6dU4m/LZNBtt0QVQZ7rNfT7gsXz6KpN0O91CWQTis3IzS/0gBMdrYouhtf8p6iUu+sf4nt5AxdOJJqF4KZvQ+mmJhP3AIRh7Uoud3XabHAhpN+HVBAM6tp9RIFjSes9vskewdq6/w5lBNNfgY4btS9TMbO9Y+1fz16hMr7kfY3pJJBgwBv2mOpo+j+AoiK6z8nWeiCt/viDfgXPSj0I6ddH9PvP0t+uL11wHfuUpkOLeZzJsM2gM62LzyAAMSXGNAistY6sHfC9QjH8IdtPzvA3Kh6Avqz3Y0qryjqKcuM+p8RP2DXVWnvWzgv3psJXNyMYMaT/HcDvwSD4uYi4RiPdGRZrwblZbeiKAZUFNdYC42f35ZPeQ3zLjzJif4KnZBwU5YhXg5HetauQB4la52tsYDY3QfdpmRTTbDAZW4CRWVP/AmwWp4FOJpfH+v7+jdfvot/LByyeMjUYOrRk+K3IsSn0pLiIPON8T9GRbVFuQdcVGeQzwb+BbfWnFRRJYKWq7uOsAI/T2RRTmPr0+rRYORbfJKXdjeXykXASeOPUKQagkGhlPCs7FmkHgzEDQWjUHfct1P8m/idrVnwhDGwZt+UFUzKXdUOLjEeF7Z2uAvJIoN3T8E1yHNFZIYvEiaJv13SiULAeKzohcnPKCib9Bp+vFULSDsR1qUMSIpfPDPh3vGAJMW2Gh7TPvSn635FBVt4IrYeUDr5rCaFtyf/P0LpNI5ke2TUyzCL6vx03lm/7N092fVb6BfKg/5Kx2NlD6H1lKewJmX6PL8PgcqDKUyqwG61yuXkHFLzpghvJ78DxaXE1u3t8uNuUgiB+ZFiLFDIJ1Tbd/TF+xu4ZUt4U17+ZKDMkSM9ibSJj2JzTAjylySQFV9rUcGLqun2zq5Wuf3E/4Ym+EoZys0iUFBXW9ufds4nE9o9kdiVs8wzEJgderagnXkbHdnz1VPvAAA0zV/MfVGNhilEMblFO3OH6dHeM9yq3GkXUw/RAYcfkeLlgSDesWUOT4j/6SE3yUfhQPrkSsvoFPvynB/jWNacVbKjq5qklPwLCPrtqkEQ8FvrvW7HMO5EvPqPKf6STFd8U55vDkuxYEIaUn24DE1p0750jyQ02w+8GdlMERbkSNya3F4JIz8igDJ9GXTz0V4C59ONcVvXJ2FU7btmhfpONrdysoaV/3mHIUGdxIRS4U6AA2cCdqOtqC6f6GI/+GfBeCkOyS+Sl/wJLl9jwXINDDbZaI37MLrO7d7Bb0R5Botjhy89h+tEePqPmFdWsrCxj16QwNKAL8ixJOHsYthWRJ3BZ5bFGKQ+3jscru5vPfoSlVuYYT87+w4xVfd0eRsWDMKy97jh8dkV9XbRNrlzZ32jpcoy8BP/UyeCIu6BpLRwWJiRQZceNbdsYVymfyx6bN8gP6X9CHh4nHEaZUVNm+LcNfY57awxNN4z92fpgK61jFBWP39oow1C94cUogGsuVl4AKY7Iit2LDfq1O51S8s5g6iYjxF55LoUgPG8dsBnFBmxfwR60BstUgYIViX7cfwD+lpOVFJ3FkaRBYMYOqSXn8Gk7vC4Dy7VUTGCPbIjdPebNMxB0G2QgSo9z672aaGMfmrVMvPMpZirW4InIqEeJ+WbKeQ/VZjnw1N+d6jI4s8Oi7qBR/6ldgM+qSy/2uJIYbjCLnHEDcRNEqRzTB0wSq7KGuMaGYoFpBFBCqM0QCQK8Nc/R1U9KZktBwZk6HGChASl+XKaeKNcmYIN8xtmyjYnIhtWJZvR47epS3e0swh64d2Uv1+94DaPpOeIRJUTohmvyOT4Lxriphe/ETnSUpya/+bMPfLUakPS/zJ0HaDX9q31rrARC24MqAKQ/Y+H+9Qfj5+uQYu716FL2BoTIwAMmaznZkMMaKdti4BjA1PWtY3F7Fp2vdhjGcEv2BXpRP0VMnbqyAx96EW8JQYlZQDKc3M6MCo4ezb3k78qTSvdLZxemd10qevgWBf//4jd+Dy+6Ej18XW10MvMuQLndrqDVGHlYc4KIBYt/JLf1YXkZAo9mfV2xx2zN5pKuhGrc/gXVDqL6er+GDjNaGzqnmUCqsINUdAxkW3//C7KCXtxpjsZjhNcvU9VFdoZww+6d1ldJs1ECnpoK5qpYQtZARFm70e6xLIw2L9M0HO0tRcoiQXsvXJ3TvbvgPLko+FDlPby3+TJyeEr6ODbT+3vwGUvf0lO8OLZD8uyK0EpGI+vysN4PnpwMdSWZbCwFk27W/GoZV6I1I+SMyHif7r9diM2YWQ9Y0BE6JR7Pqs3SxbpKPXV/NLDaLnMyhCV/t+YdDGytMOSd/Z1Gvfn3w6OgWyyDN9qKrFZ1gS/iDt9eU63wkW7eBjzoveA09RXwzcRBIMJqmHVyngs/aAnqpDduyA6CWTngWiKwAWD/hTkCRBSbgrWU1Gkxi0Ae6deDfxu7+avqa3J+fZgzDRJk+zBrnV7Ra5znvMQpUF55sNKt9QQHpedVhwzdnhASPDUc8u3FkWPFVYjGerYItCvpdupaiqHy+bWT6jqa8rvSRxor/CqV/WYy1D57BTAlLJbY2HlVS+UzY4FpT9itq9z2Y5PPWB8jE2M9jm1unkJ1Mw7A5a5xVNqU2GsrMQD0bj1umLKyYIEnZgp8f7+inlXzsgTrWYQoyt57KFnRv1NEZY1O99F0OFKW1Tu3w68kqIhGSRtkJiTO0pUTHwWGpWJN3f9me5h9a+p53P/ETfgtn7HoVnOaSmIB9RZgxGwFQ7mLiJ19thkLCeb3+D1IsAMDg4svsZs+fIPW6XQWX/kn882udNtJXwp5NaYoKi2AFG50x8idqhrligOXmlQlq+1GZvgBYMJUPIQ8dNdlioqz1L4v64h8Cq81Vno/Bk+nFKuTCrcWeMJthnLksBTTnCksXfGevulvzoaIAla7wFXhjnae/JHZuOjEt/r0/FuHqoHDiU5Z2iOT4TD7wb96atu/T15QQEeR4fLMNgMKRTWC/cyCy3oXkTPunP++CQOz9pCefqqu+/+jMID62VCO+n9Q0HMKrkyImIVc6UgCSu8MQhcmS/0rw0X7nfwJ0uaKmMJYVJP7Ei8P8ngPkYmuQaKetssPqWuB9mO5KEFWehccQOSGyj1Hw+y8lCiMZNmcL6yOuMJVymbSjKWhocoa1dOf1HVDc/BPR9vVnIfq9Gx4h1ze2nbF/TfJX/N0R1Ld3ZGeuu29bsbvFFqrNRhdZJh633UC1SLCSBK+1Bn5AgAi6BGR2J3oRVF2SnG/Ww8toCQz45uwWkCp1QuRBxHhmKZ6Ygk+RnzJpDGgtOZ+hs3S2ynaia2X454z8Jl4zVJ8M8h1rP2dg6qkNIJ9fxllRF3hAI11aqos7Wv/3SzA+E8NAmf/wqpfdPVwu4Cj7f+a11KYJEl6WdVC63G1RZaINxds4Ln274OMGvNiwLphKc94LuJb83zFzBKxx1wfvCBtw6Y+RAIurMD9O0nA04EvmoTxbY/AWU6yOdIsqM6XzDCsU1hK6+9CW6bYmrKf/slP0kl4Z1B0zuRdJm963EUDrHHZHsAiBWEa9J+owyvPwLbCvTDNrvH+ObZjxBA92TJ51sq89RIz7umR5k8na53Pe85pV3ZCyWnSJnHZHk11V0HNjTw7bO/1fu+MYCMWAwzbtLvRMj9OX2pFVF9HCaWt5HtzFIBwi7ReH/h0CHy76kMe9imkAYMot4cxz1QA62pdsok/2bWzfBBj+pHEtdjiAKvBYY/y219Uan6OiwI+XCxldnvzY/I1WOOr1Naz7bE7NUOoVfgo8G5ldESvg8MKC/M5MeKpaM66Rhg7AebrrYc02beB8ydXmZAOrFpgBwpqqAvwqY49Ylm21OLSmDjIhJ8hh/pYACx8osOgpd2VH7/D6S/4y/y/Mpi7UxYJRx3Dr0oMYAt62BgD4WryAea1garPXsn6OkaOwyIR7lbrChfwbgxy8HMOZHLOX5MFIkWm47c7zAbww53L8tnDGZrnFySlg1cqhj6qE5cYDwpzL4nubPWExC9pOxrT0yYi7Ns9dIaFplHXsQ0N37KPW9a/fMaoAMXH0imUwSJbFyBm+FQPDjfhQBNy41f/N8ezGmFu8Dfzu7tAlJTr1gLnc/leDbZa9xhY49bThpddRUBF840JZAia6BroQ00258dEnT7GtSSBejV1ziwSjOsbuq9GqqNNHxTbTkq2cSnN8BlfULJRM+z112SuX3JBqENlJRFIxeKP8OVdFTKMGGuKKQSZV9HGd2MVSY+vd7iNQjxuPl8Xa0H+AKY7ih79nJe3BcX7nR9d1CAzFvRwn3UCWaCYj58qxTaHv5sv/ZQHnurAMp+BgHX0vnvmtNEtjngeUjhxaPuzkNn8Ll4UXayd/nwFkQ8nqqnGm9QBWl7Pemn1mCMBGYjBacUtAlO2CUtRNMojWRwiuWcaRv6lRu5PoSmTqj0+quTInsOU+JQ1oZTZwlV0EMaHqdN2/tTXGs4s5hPzXTX+izPYyulKaVeKOVuUXY48ePY1ZPtzbMUpTrcBo6gndlof+t4arydunpYO5sjmA4V2QV+/Y/4/w/j8SFUEhAmHc5+Dmr4a5jMwT/pXQm0BaVBh/s8DAgdL9kcGgT452Bl4FQB1DOELNrIaY+FakpwWnSa9Hm2NRIO5yZ7ZbBtl8WtQLvTCRz20yJoLSlJaqb7XMLqpI82iT2Nuq63Uih6x/a712ESY0Axv6obxiQKVNjQCB/sA3ypr1EGr/wOr/i7IK///zq3a0YKOvLkZIAINYFyYvVDTwMqh7Sn/ASsxXt5+wF0KIsQ8nC2pO2UYWC/8R8TbJOgspY5MAEBME63c1PlVihDrmgNnmNLYyTbcZ4jd1nFBDuR9c2+TT4GQIYcFKB8rJ3PIMF7WVk0T0pWZMJQKV+Hw5jdWBHy3Btz1P/HDX5TO2kd7x30v7pNBQoFdFYA+r/tzzI2Hpfgx0G7BXREljnUj7hAHTHNPxIj4C4+U+TeDKeSB5arKAoci9vE87bOwfxGX59KhPZcc3slP6aX6hA76sXuxcg3a8akDRjz6Ldn3QntfWbzqbBqoFeNCApg8T7IA8M11tfCFEWwcu1oRw9iKWhFuTlj6j21r6q24kq6K7c1RJMfWoplKeSS6s1Lt6ludeN6dLHxJzbkUr4Zdy8lb/sqypXHdGcXKoYbz42NEuu3j0vMYafIdA2P9N/fzy/I0A0iQOFgTsbiKGM9e68OGkEsGCuy51esu/vtIEo4jHmcmH/XBQ1d8DHzvpqP9ykgDHR6tF0rfpNTUD8p9Z0ZmEAypZHhMvK2i+ED3sIayp6Ab5jyNT9bI0jwrmn5NQA2ciFZrblsvA8jHsEB0kjcnw5jZJhcCvXo5mURkSxzpaa1fbBpe0/J8uU6t3a75f3JkaKvGWrs8AFzKQldHr1QdYATnVWHH2MYsrasI8Kdm2udEwilC/jHsQ5Zv+yLQQXTJEkt7gS6xKBiaBXg85Q6M5Q2zRDnejN9z/0uAbTNP5os5lnHasYuJ7xjNzOClwu7hvZRHEeLtHvqe6X4BsCHkD/Hlriu3EbMWIcmp1GKQnmDmidaw1HjA8Ha9aHMwTRmwEIDHnLiZTgvJ9NY95jlFt8vt/DKzbCvzulADfdOA+OWsHgzSQTu8FByI4MPD19wWq5S4ZwJ4xzRVnICqAMp6FElVMAYa682q84RC3jUMz0yrgIDTOMwY7ECxxiHZjsxrx8C8b3rq3j89R3u1zw+Ptfr+kYZgE8Io5BjcFEUsVvVF93SAkspaljfeGbitA0jygucNSWUnqNZN3+OPV3ZBFYlNYKezy3XQfUb7p6b4A1z/J1d84IvE15AqvGj6b282R+MDzTs50s/mA9v9WSHeqoE90ObqUz841BsreMH2GHquFHWu8FtzeDeHke4oO761RFlc48CQSG/xcWVnPSQg2UGMOuWJ9bQsomCEYCYMbsT+tk9Ymx1VtaBC6TUhehJS2ES2KpOgo6T2Rv4XyXPdTqOzIROFICMM6EjbC77WOs8YH0bzD/rnvx95vJ6OgGub8g2ZXvJtD+q0fIOeIVXuoFsNlCFzzgrbVj4t5Z2mZU/p8Az1vGuTRuW03uBL6Rtsb4XQtqeE0ow4Bhi5cWPeS9vS2Ku2SH80xcs/XX1N0EcLBSdDlju1lO9gUNedtnPwKixMO5J22lIwDQPMx6cK6sZwtDWsZq/7kwxODf9uQIvJlcb8CikmT0pBTVMP+FO0QVxQaz1CCDiiXQTt9oiWUMWDjOK2my17MA6EmD/mSNeAT+0f8YQhKH/7R+++weB4PykjKaKDVvNU36JxD4NOCIo6rpj+TTWljvDMcLZZu8Sf5ONXiKzg6X2PO7NNLZwL2y4XloAxu3a2T8P+IVel/fNyrdpIivo4qihX+spoGXvez6bSzujcOoRsRhQRxgR8L3MlkcCNwZ5W5f0nTeuBnd0RxK1fpYi7tgmUm3rrB8AHsJG67EkUP/l7ZWLok1w5yJi+QOb+06J44e6g5GFa9jbyumxrGbdlKwAVLq6HOqpSY/f5ZeEtFzRMWlLWEjB55XJph3U7TD5vODgme4jlYTVKgfPT5sJVE5G1fGMcwzRve/KMlIVI8MtW0sfpmNdHMFrxBxpnnFvNP2bT7InUC1jCbfeUvMMGNPp2BKTjmMaiEsw027jjy8FUfE9zMwiv2nGgKSzVhLeFbcpQn62gjwgM+lRTMgnsmcPzDzfr8+lIVTe7LN/ho2V01o5D1qg2/96o7D1docMTwslBhzR8uqDRDob+tOGj8kR+058LAAin6zxSoOrsYY/fJnh/iT3n4kU83qsmQANTHCt7mHqpfK52T/RLYfBcpnJj9AzEkYnOxhPtdM+2AkqIG/43dPby18JAbAmp1pCba4nmucZTW8GqW6eti+lurM7eoPnpXRayNrFvvhxm8POfmzaEq2EFEjeOuScbYT9XG+oBCtrx5Ar14YjJpzdvPd5+VxSyT2CXOAr18YdignlYPVHVFXc7HEvsvlheXjy6E41rwQMqn6rcVJjO7sBqAwlnqHrtSl8UtwObU6gmO4Dy2pnaDApRXJAcChL9TwPI8HtiDG/nvb3YW0spH7yotLfrjDXVkaP5vVaeNBge/ti2RGeaA5GTdd0ElmZPdETUz8bTb/w0kaihd7V1uqQkm5Fg1q9K0gAARFohTgP+eLO6DKYuTEQFQFzhdXVEVw3mpGMXXzWgWmM9F9iw69T321RHqkQ7ZR4Mf4xJQFrDyUWoB77TECqPR4jXxifoRdz1Aq7gtPfk98e5s37/MLHOCG2eOwvqX6iOs25Zf7GaQVrpoznQkkgTZ0FBSdsDvvLUHBHMD4ZPEujF3/0e51b3w2hkCzYe1PEHlmxP3Rer5IQzgxCXkwhctdcqio1xhlw/3qW3ErLAJBxCEjf8+QAgErihcE40fw1CVO3K14+ZCcn1iYIuidPPXIEfv10vJtivJ+DVG/kfPAMlV8NJOjSg//xnqukQ6bSkNgDmkrvr/gOB77Vf6XWm4Joh7uIXaBNL8CjvuYbHJITJvm/uGFc7f+2oqME2usJh53FoW4bEWdJ3Y1x7N3fubS5DghNd1wkOqxzNA/NOuHAomnlnNpN+MG8Lfq5UpRmJEuzDa68ozOlp92Lpy6XNumxzppUPumE/CrcsuN9vBp+CpZ9ytPO6hKeosjwA92gRHpMBmKuEPe6Ovhl8vGAgGRSFIVvG9lmOVoFHIiuaXa/mS0ackniBH1n8Cpcn6zYpnNqo63evXdCMrpgwA0bfNnAXNBlz5QdeEiMptpar6TZyLYLlIR3QCPg/WR5zIg7VAzzxiexyvZpgbW7agjexTTWVZrHUqnT0EHFX1cZESG163OuvKZYjCMwMthass3YB8V/m+pwKL7DVxCOVAN5pCTaHXvoR9DwyzkkWX5gVV1OSiBt0Q4vVIz88zSuzDpm7Uch24uPJPwwRTws5+2kImjABw3whzpN9YKvAdRuEV8Amp8ocw9YjZGj2bwXkcy5fWp5KjbRWcQCkZJybJZw2XchsEJTGYGKjnW0pVGPVSK46s9rlYJcy9CH1pyIN0pj+ub/32dElvdtDRl9X2ju6pwQ/mLStBzKutCsQGSmhCNfgzmkuOOCnGB73wGNxRzkDp/pqWLFxQbxaxI69FKiw4kTBnofDHEfKD5c5EgV9M6c4BojqIcggQeyyIhMBDcKdVuAsM7xfXnG8CZWCa/6rRJ3cCJ8W8gKelecdMBip22+AArUFAc0kudYFZ9QEV3t3RoyGFV1OpKsyueR9znBhUE8AXXlUom33km6bxtjVpC2dyt9ksFNu6vTO1JjdCc/b1DQUvm6x24YU6SRXOTkDYFi9PqbXIK9/SaiTTN4o6VE/z0QwBROoYoHTZd0mU8d5QosXjUM3umTZcLgbaasfo4MnXMgDYefz4dj5cC9rvN/UCLdWEg5nEM687RoxA4EfoaWD1rs+pQ8/ngGpYY9SBc8etRvF6NS/aY/8Xd+hKE9e2hMaAa1jBfaWGDZ7vjb879zI68lVvE9APNGnay6c7hGbFcV9kKgxmIex3OKNOYQkncZUIQcds+e4nROLZpYLuvN07UUjYz5QYmRFov7/rdJJLJZ88ZKVmvI9Bw2B5CetcUfQaYLyHzGe2igCMUl7o0migQNzus75/Bn7JkzE5x7UWI7kknAfEDFsBqx66FoR9ccrTyJBMcHffVxUSo0Run4orR2HTRgq4KbEAxzCUQ5OlstY/3ULmvVxuu/6XGJP4MFRpipssUJU2Vq1KepZGSJ5pk7zyxv3OhrZSqZukW6Eta9THONhQjZ8F7r8Woga3oB/GOk719E5fBPukxXaVfIQAFdOmfnrjaqSmwSiBh/htxULMgO4BWG5lgRN7pUr62Drnrjwb4a46atYJ4mTS+/WGhgYZ1fzR5o/feNB/OaDvMun8XVidu+ZCduQm6Xrv6c98igUv6JQL/tn7jrOIpOUK9b06i1lQahaVed0FieB98Q9GA0SSa6zKoB3CDE7FtKHxwm+2jGiMHoxgw8q7c2nGIaER37gSerEFzzp5ekmneqBcl+UT8c4VYOiI4Sj3TjVapnZG2Uuv9UX8HOMmsr4gSRPYkvHUfHimU17tR/BlY83WyB1Pn6ighUGLCZIg5e0O5bZ1kNMH2B1gWygs3TyIP0PxmlWC0hkw9o18Aw66iZ0lrtnCFto6oWQrKvMWtzkjW2OzXQq6MN9ZH81csY85WPXQ02yu/VfbZj26hQRIKXcFPMD9GTllHKySbhs3HH9yEJTVsOjnY7cI8Us57Xwzt6PWqrWabYcdsunqu5F+aqvOCAXCtNl9/TspX34ZKWiHAFgvBltPX0gtqlIrpa60Ehdqr8OKxG3pyCkheB+bl29C4zr3PBK65nmD+MR3/skYCH4iukff4VxMNUg1lYRvyMoLzBDCz9UQPb8iKQYQXYOozUg17cVyA1c1WW8btO0IOSfiFQEKdWS6asIm2359YnLUn41LZvf6cJg4FjFjOa14/RrPcWa2JTNPWyvi9BHbB1MihGckhdouvSvnSfi3hdB+kTxwUpCS9aV0GsvKVmujN+kacQM92mUwQeG4CrFFznhGZx8854AAAyix65DV/2k2TaErMP47K/YzDpDQ7UykQfH3PQFWIvgnLHiTjS7A/bdIZccnGA4R08Kef5SGBTpNzfzJGxnnbkk5F3T0JCrjZv7ePPUfJhhq0slgOoA0cyJe4nimcPjBRKW+Bvgn6KZsfU+Pa0bhG0wRecm9K5En/l0sxvUibbQBWWvuAACYp9FOpPhYdavCgNvl9+9Ni4PIMKHqlRlzgGZp/Q5iIVa57WvRIaiLkGDlcR75ML1UqXCjHQoqHWnUK0Q9eCLLhcQ1akgDVRbUTL+osMZWkZ3iQx0mKNg+tmsrcaTdAm4fnwaNU9LrBKWvlzSu5vOwrAFq67g6F7HLRRDUUGsQT4Zsf/h+4+VJZikCAH9Z4OTSUXsnaRJPBZvnQ/VG1jIpTl5VTyjF1XWtVhbqHDLCkqOck4OXQdBILS9hpM2t2lybHk0Y9djzvs85ioQJuwbHybAqI39i58+hSq4nMqAUTGiJAVOlCtsKiK4guZnTipbxi6+IvPWnVp2NfKkq6mGHBNm1lppTUoLyvKAfWz38HGltjl7YvAnYf+gLzihG7QD2oAY6o3r1+InNLfYKfssxGz/y+Dr7+WfNnwww9R8csroxXHcPaBxJQmzRR25rAri5QjG81BbO/wG3FMKavmEPycTdEy7uvJyE0PLO+cLdwtEq5+jebO6YUqrEi2/R259vY37bUI6EjZTczf8UpgYg2iDdV6n2thpXASQi2crqADa2B8OeZ0OTvE3omMiuThcA/pKVQJbCWbldiMbtqoPxsNwPvMM4AAAA79n1eV3hGjFGBja8JJLN9yeyvIjHH9g5Nbh1AZebIZ5qU1n5fwsx/eIrhsQDK1BFW/CkNiC5mn0LYto+1zQM8Tgi+vGrAJEs07HegcYaL9FUEFSQMuPSsEa6SrRw40r5GP9649+yz7+gbBJmwmjz3o/nh7N5JE+9r8l1OXseW7Q5aChPSxPXGKhb3OyHOFmpLTVBf25J9+gQMUUoAMs+7Z7f/kP/m4jS15/80Ve8Uus/6f/bvnn6x/l8UXz6Dn/n1vFn9/8+s2MJYZe8yx3hehyFL7SL9Ch7OfqOgX9DFKazS7qGHTRgQ+BRDyX76g0FRmIjCrmeQVRu5Orbc1oLCMpuL4Vjyf7Cd7g+b4k9UcjiG5hPpXi3mRD8RjhAPlAIvsexaVNgHESccoIyRXTwP1WQgJm7LFxCmsH+9rZ6Xx952EB8RPo+mH3moaRdGmocqvltkHi+02r8b2WurR271nl04ErMo0myjmGRrS1RcDq3YiGxZyW+WySZU3leXoGalyduU16F9IZtR9REE642qnVbwzmP/g2lbDx8hEMWY0maJmVFQAAAhEdtPlotBFM23/D758q3QbBzCBRPFwQWs+Jf6sxjSb2846e+WVG/G5FZ+TV3mnyJ9nBK0QIb6smJCDnXDRpJsY1vUD7r69pD8xt+xvAPP2UBhffIzpgQd16NbqmnT3TyuN90HYIGYJ5th5NFL0J5B1TzW9+/UA2h1RViy9HK3RaKRpihb6OLY+A+ikfjgH+EbXq1oljr1HDrZjFY670txckJIpirh+83zJfhiuY7GSO2QQ8nUyEItcrTYcZrvbva9Ptm+rrbpPGwTUGyp3mEarc6RSOMasqXinfl9B6/zcAAAAAA";

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
      loading: { logi: false, hotels: false, itin: false },
      errs: { logi: false, hotels: false, itin: false }, nextDay: 1 });
    setScreen("plan"); setTab("flights");
    const brief = tripBrief(form);
    loadLogi(brief); loadHotels(brief); loadDays(1, brief);
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
        `${brief}\nהחזר JSON: {"area":"האזור המומלץ ביותר ללינה ולמה, משפט אחד","hotels":[{"name":"שם אמיתי","area":"אזור","rating":4.5,"price":"$$","pros":["יתרון","יתרון"],"cons":["חיסרון"],"fit":"למי מתאים, קצר"}] בדיוק 3 מלונות,"attractions":[{"name":"שם","desc":"משפט אחד","cat":"קטגוריה","must":true/false}] בדיוק 6 אטרקציות מותאמות לפרופיל. תמציתי מאוד}`
      }], JSON_SYS, 1000, FAST);
      const j = parseJSON(t);
      if (!Array.isArray(j.hotels) || !Array.isArray(j.attractions)) throw new Error("shape");
      patchPlan(run, p => ({ hotels: j, attractions: j.attractions, loading: { ...p.loading, hotels: false } }));
    } catch {
      patchPlan(run, p => ({ loading: { ...p.loading, hotels: false }, errs: { ...p.errs, hotels: true } }));
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
              <div className="eyebrow rise" style={D(1)}>AI Trip Builder</div>
              <h1 className="rise" style={D(2)}>סוכן הנסיעות<br />האישי שלך.</h1>
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
              {plan.errs.hotels && <Retry msg="לא הצלחנו לטעון את האטרקציות." onRetry={() => loadHotels(tripBrief(form))} />}
              {plan.loading.hotels && <div className="shimmer" style={{ height: 200 }} />}
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
