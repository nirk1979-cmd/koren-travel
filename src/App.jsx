import React, { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   KOREN AI · AI TRIP BUILDER — Premium 2026 Edition
   Deep-ocean glass aesthetic · Mobile-first · RTL Hebrew
   AI: Anthropic API (claude-sonnet-4-6) · Vision · Progressive plan
   ══════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700;900&family=Heebo:wght@300;400;500;600;700;800&display=swap');

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
.kt h1,.kt h2,.kt .display{font-family:'Frank Ruhl Libre',serif}
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
.hero h1{font-weight:900;line-height:1.08;letter-spacing:-.01em}
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
.logo-hero{width:132px;display:block;filter:drop-shadow(0 10px 26px rgba(2,16,28,.55)) drop-shadow(0 0 22px rgba(20,176,184,.22))}
.home-hero h1{font-family:'Heebo',sans-serif;font-weight:800;font-size:34px;letter-spacing:-.02em;margin-top:20px}
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
.wiz-hero h2{font-size:30px;font-weight:900;margin-top:18px;line-height:1.15}
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
.pass-top .dest{font-family:'Frank Ruhl Libre',serif;font-size:23px;font-weight:900;color:var(--navy);letter-spacing:-.01em}
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
  color:#FFC98A;font-family:'Frank Ruhl Libre',serif;font-weight:900;font-size:18px;
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
.big-amount{font-family:'Frank Ruhl Libre',serif;font-size:38px;font-weight:900;color:var(--navy);letter-spacing:-.02em;line-height:1}
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
const CHUNK = 3;

/* ── שכבת AI ───────────────────────────────────────── */
/* כתובת ה-AI: בפרודקשן עוברת דרך פונקציית Netlify (המפתח שמור בצד השרת).
   הערה לפיתוח מקומי: `npm run dev` לא מריץ פונקציות Netlify — לבדיקת AI מקומית
   התקינו netlify-cli והריצו `netlify dev`, או בדקו ישירות באתר החי. */
const API_URL = "/.netlify/functions/ai";

async function askClaude(messages, system, maxTokens = 1000) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: maxTokens, system, messages }),
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
      }], JSON_SYS, 1200);
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
        `${brief}\nהחזר JSON: {"area":"האזור המומלץ ביותר ללינה ולמה, משפט אחד","hotels":[{"name":"שם אמיתי","area":"אזור","rating":4.5,"price":"$$","pros":["יתרון","יתרון"],"cons":["חיסרון"],"fit":"למי מתאים, קצר"}] בדיוק 3 מלונות,"attractions":[{"name":"שם","desc":"משפט אחד","cat":"קטגוריה","must":true/false}] בדיוק 6 אטרקציות מותאמות לפרופיל}`
      }], JSON_SYS, 1500);
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
        `${brief}\nבנה מסלול יומי חכם לימים ${from} עד ${to} מתוך ${form.days}. התחשב במרחקים (רצף גיאוגרפי הגיוני), שעות פתיחה, עומס תיירים${form.kids ? ", גילאי הילדים" : ""}${form.prefs.includes("אוכל כשר") ? ", מסעדות כשרות בלבד" : ""}.\nהחזר JSON: {"days":[{"d":${from},"title":"כותרת היום","m":{"t":"פעילות בוקר","d":"פירוט קצר"},"n":{"t":"צהריים + מסעדה","d":"פירוט"},"e":{"t":"פעילות ערב","d":"פירוט"}}]}`
      }], JSON_SYS, 1500);
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
              <div className="topbar rise"><img className="logo-hero" src={LOGO} alt="KOREN AI — AI Trip Builder" /></div>
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
