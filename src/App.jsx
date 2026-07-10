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
@keyframes spinDots{to{transform:rotate(360deg)}}
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
.topbar{display:flex;justify-content:center;padding:20px 0 10px}
.logo-plate{background:rgba(255,255,255,.94);border-radius:20px;padding:12px 22px;
  box-shadow:0 10px 34px -10px rgba(3,20,34,.5);backdrop-filter:blur(8px)}
.logo-plate img{width:188px;display:block}
.home-hero h1{font-size:42px;margin-top:26px}
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
.home-body{padding:22px 18px 10px}

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
.sec-eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.22em;color:var(--faint);margin:22px 6px 10px;text-transform:uppercase}

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
async function askClaude(messages, system) {
  const res = await fetch("/.netlify/functions/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system, messages }),
  });
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
  const [genErr, setGenErr] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (k, v) => setForm(f => ({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] }));
  useEffect(() => { set("days", daysBetween(form.depart, form.ret)); }, [form.depart, form.ret]);

  async function generate() {
    setGenErr("");
    setPlan({ logi: null, hotels: null, attractions: null, days: [], loading: { logi: true, hotels: true, itin: true }, nextDay: 1 });
    setScreen("plan"); setTab("flights");
    const brief = tripBrief(form);

    askClaude([{ role: "user", content:
      `${brief}\nהחזר JSON: {"flights":{"advice":"המלצה קצרה על טיסות מישראל","airlines":["חברה1","חברה2","חברה3"],"times":"שעות טיסה מומלצות","price":"טווח מחיר משוער לאדם בדולרים"},"car":{"needed":true/false,"reason":"נימוק קצר","type":"סוג רכב מומלץ או null","pickup":"היכן לאסוף ולהחזיר או null"}}`
    }], JSON_SYS)
      .then(t => { const j = parseJSON(t); setPlan(p => ({ ...p, logi: j, loading: { ...p.loading, logi: false } })); })
      .catch(() => setPlan(p => ({ ...p, loading: { ...p.loading, logi: false } })));

    askClaude([{ role: "user", content:
      `${brief}\nהחזר JSON: {"area":"האזור המומלץ ביותר ללינה ולמה, משפט אחד","hotels":[{"name":"שם אמיתי","area":"אזור","rating":4.5,"price":"$$","pros":["יתרון","יתרון"],"cons":["חיסרון"],"fit":"למי מתאים, קצר"}] בדיוק 3 מלונות,"attractions":[{"name":"שם","desc":"משפט אחד","cat":"קטגוריה","must":true/false}] בדיוק 6 אטרקציות מותאמות לפרופיל}`
    }], JSON_SYS)
      .then(t => { const j = parseJSON(t); setPlan(p => ({ ...p, hotels: j, attractions: j.attractions, loading: { ...p.loading, hotels: false } })); })
      .catch(() => setPlan(p => ({ ...p, loading: { ...p.loading, hotels: false } })));

    loadDays(1, brief);
  }

  async function loadDays(from, briefArg) {
    const brief = briefArg || tripBrief(form);
    const to = Math.min(from + CHUNK - 1, form.days || from);
    setPlan(p => ({ ...p, loading: { ...p.loading, itin: true } }));
    try {
      const t = await askClaude([{ role: "user", content:
        `${brief}\nבנה מסלול יומי חכם לימים ${from} עד ${to} מתוך ${form.days}. התחשב במרחקים (רצף גיאוגרפי הגיוני), שעות פתיחה, עומס תיירים${form.kids ? ", גילאי הילדים" : ""}${form.prefs.includes("אוכל כשר") ? ", מסעדות כשרות בלבד" : ""}.\nהחזר JSON: {"days":[{"d":${from},"title":"כותרת היום","m":{"t":"פעילות בוקר","d":"פירוט קצר"},"n":{"t":"צהריים + מסעדה","d":"פירוט"},"e":{"t":"פעילות ערב","d":"פירוט"}}]}`
      }], JSON_SYS);
      const j = parseJSON(t);
      setPlan(p => ({ ...p, days: [...p.days, ...(j.days || [])], nextDay: to + 1, loading: { ...p.loading, itin: false } }));
    } catch {
      setPlan(p => ({ ...p, loading: { ...p.loading, itin: false } }));
      setGenErr("חלק מהמסלול לא נטען — נסו לטעון שוב.");
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
              <div className="topbar rise"><div className="logo-plate"><img src={LOGO} alt="KOREN AI — AI Trip Builder" /></div></div>
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
          <div className="home-body" />
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
              <div className="fld riseS" style={D(1)}><label><Ic n="users" s={14} /> מספר מבוגרים</label><input type="number" min="1" value={form.adults} onChange={e => set("adults", +e.target.value)} /></div>
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
              : <button className="cta" onClick={generate}><Ic n="spark" s={18} /> בנו לי תוכנית טיול</button>}
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
            {genErr && <div className="err">{genErr}</div>}

            {/* — טיסות ורכב — */}
            {tab === "flights" && <>
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
      const history = [...msgs, userMsg].slice(-8).map(m => ({
        role: m.role,
        content: m.image
          ? [{ type: "image", source: { type: "base64", media_type: m.imageType, data: m.image } }, { type: "text", text: m.text }]
          : m.text,
      }));
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
