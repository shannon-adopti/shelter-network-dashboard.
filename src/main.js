import { runHistory } from './data/runHistory.js';

const architectureCallouts = [
  { number: 1, title: 'Your system of record stays.', body: 'Adopti reads from Shelterluv, PetPoint, Chameleon, or any browser-accessible shelter platform. We do not replace it. We do not require an API.', x: 15, y: 12 },
  { number: 2, title: 'Read-only by default.', body: 'Shadow mode is the factory setting. Write-back requires explicit administrator authorization — four steps, fully logged, revocable at any time.', x: 68, y: 37 },
  { number: 3, title: 'Not general-purpose RPA.', body: "UiPath and similar tools have no shelter-specific adapters, no shadow-mode default, and no per-system module architecture. Adopti's adapters are purpose-built for welfare systems and patented.", x: 51, y: 84 },
];

const journeyCallouts = [
  { number: 1, title: 'Identity is the first event.', body: 'Before anything else happens, the subject is anchored to a Persistent Identity Record. Every downstream event keys to this one record.', x: 12, y: 27 },
  { number: 2, title: 'Custody is the anchor moment.', body: 'GPS coordinates plus biometric scan confirmation must both verify before the state machine advances. This is where welfare systems often lose continuity.', x: 39, y: 47 },
  { number: 3, title: 'The 90 days are visible.', body: 'OVESS Claim 23 requires no return, health certification, and government registration to simultaneously verify at Day 90.', x: 58, y: 62 },
  { number: 4, title: 'Settlement teaches routing.', body: 'Every verified outcome feeds back as a probability weight. Partners with higher Day-90 stability rise in future rankings.', x: 79, y: 75 },
];

const rpaComparison = {
  title: 'Why not general-purpose RPA?',
  leftHeading: 'General-purpose RPA (UiPath, Automation Anywhere)',
  rightHeading: 'Adopti PCSIA (Claim 21)',
  leftItems: ['No shelter-specific adapters', 'No shadow-mode default', 'No per-system modules', 'Generic data extraction'],
  rightItems: ['Per-system adapter modules (Shelterluv, PetPoint, Chameleon, 24PetWatch)', 'Shadow-mode read-only by default', 'Administrator-gated write-back authorization'],
  footnote: 'USPTO 64/045,063 · PCSIA Claim 21 anchor',
};

const softwareComparison = {
  title: 'Why not existing shelter management software?',
  leftHeading: 'Shelterluv / PetPoint / Chameleon',
  rightHeading: 'Adopti Orchestration Layer',
  leftItems: ['Single-organization scope', 'Static intake triage', 'Placement fee on adoption only', 'No execution state machine'],
  rightItems: ['Cross-organization continuity (PCSIA Claim 21)', 'Temporal trajectory routing (DSRE Claim 22)', 'Outcome-verified escrow at Day 90 (OVESS Claim 23)', 'Six-state PEX with verified handoffs (PEX Claim 25)'],
  footnote: 'USPTO 64/045,063 · 25 claims · 6 families',
};

const claimFamilies = [
  { code: 'PCSIA', name: 'Persistent Cross-System Subject Identity Architecture', tagline: 'One verified record per subject, aggregated across every organization that touches them.', anchor: 'Claim 21 anchor', links: ['Identity', 'LostFound', 'AnimalRecord', 'PaperToDigital', 'ShadowBridge'] },
  { code: 'DSRE', name: 'Dual-Score Routing Engine', tagline: 'Routing that learns. Compatibility score plus temporal trajectory — decisions get better as outcomes settle.', anchor: 'Claim 22 anchor', links: ['SmartIntake', 'Routing'] },
  { code: 'OVESS', name: 'Outcome-Verified Escrow Settlement System', tagline: 'Settlement only after verified Day-90 stability. The system never holds funds.', anchor: 'Claim 23 anchor', links: ['Settlement', 'Outcomes'] },
  { code: 'TMRRE', name: 'Temporal Multi-Record Reconciliation Engine', tagline: 'Conflicting records reconciled by custody-period multiplier — physical custody is a provenance signal.', anchor: 'Claim 24 anchor', links: ['Cross-cutting, no dedicated page'] },
  { code: 'PVDTS', name: 'Pre-Intake Voice Diversion Triage System', tagline: 'Intercept surrender calls before physical intake. The save happens before the clock starts.', anchor: 'Claims 16–18', links: ['Diversion', 'Intake'] },
  { code: 'PEX', name: 'Placement Execution State Machine', tagline: 'Six-state deterministic handoff between routing and settlement. Every transition timestamped, every exception re-routes.', anchor: 'Claim 25 anchor', links: ['Walkthrough', 'Packet', 'TransportLive', 'Holds', 'Exceptions'] },
];

const flowScenarios = {
  baseline: {
    label: 'Clean settlement',
    subject: 'ADOPTI-ID 7F4A2C',
    summary: 'A standard placement advances from intake to Day-90 verification with no exception branch.',
    steps: [
      { state: 'T0', layer: 'PCSIA', title: 'Intake anchors identity', body: 'The subject enters Shelter A. Adopti creates or updates one persistent identity record before routing begins.', actor: 'Origin: Shelter A', audit: 'PIR upsert · hash 8f31 · source Shelterluv shadow adapter', claim: 'PCSIA Claim 21', tone: 'identity' },
      { state: 'T1', layer: 'DSRE', title: 'Match scores candidates', body: 'Compatibility and temporal trajectory scores rank partners without changing the shelter system of record.', actor: 'DSRE confidence 0.84', audit: 'Route scored · Rescue B ranked #1 · inputs sealed', claim: 'DSRE Claim 22', tone: 'routing' },
      { state: 'T2', layer: 'PEX', title: 'Partner commits', body: 'Rescue B accepts the placement packet and the execution state machine locks the handoff plan.', actor: 'Partner: Rescue B', audit: 'Commit event · packet v3 · admin view read-only', claim: 'PEX Claim 25', tone: 'transport' },
      { state: 'T3', layer: 'PEX', title: 'Dispatch verifies custody', body: 'Transport begins only after the custody event has a timestamp, GPS coordinate, and handler confirmation.', actor: 'Transport leg 1', audit: 'Dispatch · GPS 34.05,-118.24 · biometric pending', claim: 'PEX Claim 25', tone: 'transport' },
      { state: 'T4', layer: 'PEX', title: 'In-transit remains visible', body: 'The subject is between organizations, but the state is still auditable and linked to the same PIR.', actor: '07:00 PT → 13:42 PT', audit: 'In-transit heartbeat · chain-of-custody continuous', claim: 'PEX Claim 25', tone: 'transport' },
      { state: 'T5', layer: 'PCSIA', title: 'Delivery closes the handoff', body: 'GPS plus biometric confirmation verifies the receiving organization before the observation clock starts.', actor: 'GPS + biometric verified', audit: 'Delivery accepted · custody transferred · no record split', claim: 'PCSIA Claim 21', tone: 'identity' },
      { state: 'T6', layer: 'OVESS', title: 'Day-90 gate settles', body: 'No return, health certification, and government registration satisfy the AND gate; settlement instructions are transmitted.', actor: '3-condition AND gate ✓', audit: 'Settlement instruction sent · Partner B success rate +0.03', claim: 'OVESS Claim 23', tone: 'settlement' },
    ],
  },
  reroute: {
    label: 'Exception → re-route → settle',
    subject: 'ADOPTI-ID 3B81D9',
    summary: 'The high-value case: a Day-14 return opens a PEX exception, DSRE re-routes, and OVESS settles the retry.',
    steps: [
      { state: 'T0', layer: 'PCSIA', title: 'Intake preserves behavioral context', body: 'The subject starts with a behavioral flag, but still receives the same persistent identity anchor.', actor: 'Origin: Shelter A', audit: 'PIR created · resource guarding flag · hash 19ac', claim: 'PCSIA Claim 21', tone: 'identity' },
      { state: 'T1', layer: 'DSRE', title: 'First route selected', body: 'Foster X is selected from the candidate pool with a moderate confidence score.', actor: 'DSRE confidence 0.71', audit: 'Candidate pool sealed · Foster X selected', claim: 'DSRE Claim 22', tone: 'routing' },
      { state: 'T5', layer: 'PEX', title: 'Placement begins', body: 'The placement state opens after delivery. The same PIR watches Day 3, Day 7, and Day 14 signals.', actor: 'Foster X placement', audit: 'Observation window opened · check-in schedule written', claim: 'PEX Claim 25', tone: 'transport' },
      { state: 'EX', layer: 'PEX', title: 'Day-14 exception fires', body: 'A failed check-in opens an exception state instead of losing the subject between organizations.', actor: 'Return: behavior incompatible', audit: 'PEX exception · return event · PIR re-opened', claim: 'PEX Claim 25', tone: 'exception' },
      { state: "T1'", layer: 'DSRE', title: 'Routing learns from the failure', body: 'Foster X is excluded for 90 days, the behavioral fact is weighted, and Rescue Y rises as a specialist partner.', actor: 'Partner Y +14% Q1 trajectory', audit: 'Re-route request · Foster X cooldown · Rescue Y ranked #1', claim: 'DSRE Claim 22', tone: 'routing' },
      { state: "T3'", layer: 'PEX', title: 'Retry handoff completes', body: 'The state machine executes a second verified transport without creating a duplicate subject record.', actor: 'Transport completed Apr 03', audit: 'Retry dispatch · custody verified · prior PIR continues', claim: 'PEX Claim 25', tone: 'transport' },
      { state: 'T6', layer: 'OVESS', title: 'Settlement pays the right partner', body: 'Day-90 verification settles to Rescue Y, not Foster X, and both partner weights are updated.', actor: 'Partner Y settled', audit: 'Full settlement · Foster X −0.04 · Rescue Y +0.03', claim: 'OVESS Claim 23', tone: 'settlement' },
    ],
  },
  diversion: {
    label: 'Pre-intake diversion',
    subject: 'PROVISIONAL-ID PT-0042',
    summary: 'A surrender call is intercepted before physical intake and leaves a future-loadable event record.',
    steps: [
      { state: 'T-1', layer: 'PVDTS', title: 'Inbound surrender intent detected', body: 'The caller describes lost housing. Voice diversion classifies owner-surrender intent above threshold.', actor: 'Intent confidence 0.91', audit: 'TCPA channel · call event · provisional subject PT-0042', claim: 'PVDTS Claims 16–18', tone: 'diversion' },
      { state: "T-1'", layer: 'PVDTS', title: 'Resources ranked before intake', body: 'Emergency boarding, food bank pickup, and low-cost veterinary referrals are ranked against the stated need.', actor: 'Diversion risk 0.83', audit: 'Resource ranking · threshold 0.65 exceeded', claim: 'PVDTS Claims 16–18', tone: 'diversion' },
      { state: "T-1''", layer: 'PCSIA', title: 'Referral becomes durable context', body: 'No physical intake occurs, but the pre-intake event will load if the animal later reaches a participating shelter.', actor: 'SMS · voicemail · email sent', audit: 'Pre-intake event appended · 12-month surrender-risk flag', claim: 'PCSIA Claim 21', tone: 'identity' },
    ],
  },
  partial: {
    label: 'Day-60 partial settlement',
    subject: 'ADOPTI-ID A4F09B',
    summary: 'A medical return fails the Day-90 AND gate, triggers a prorated tier, and re-enters routing without partner penalty.',
    steps: [
      { state: 'T0', layer: 'PCSIA', title: 'Senior feline intake', body: 'A chronic kidney disease flag is anchored to the subject record before specialist routing.', actor: 'Origin: Shelter A', audit: 'PIR created · medical profile sealed', claim: 'PCSIA Claim 21', tone: 'identity' },
      { state: 'T1', layer: 'DSRE', title: 'Specialist partner selected', body: 'The routing engine selects Foster Z because senior-cat outcomes are stronger for the medical profile.', actor: 'Partner: Foster Z', audit: 'Medical-specialist route · candidate rationale logged', claim: 'DSRE Claim 22', tone: 'routing' },
      { state: 'T5', layer: 'PEX', title: 'Observation stable through Day 30', body: 'Check-ins remain stable until a Day-60 medical deterioration event opens a failed verification branch.', actor: 'Day 3/7/14/30 stable', audit: 'Observation events · no disputes through Day 59', claim: 'PEX Claim 25', tone: 'transport' },
      { state: 'T6', layer: 'OVESS', title: 'Partial tier applies', body: 'The no-return condition fails at Day 60, so the Day-90 AND gate is not satisfied and a 67% prorated settlement is triggered.', actor: '60/90 = 67% tier', audit: 'Partial settlement · dispute flag · no DSRE penalty', claim: 'OVESS Claim 23', tone: 'settlement' },
    ],
  },
};

const pexStates = ['T-1', "T-1'", "T-1''", 'T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'EX', "T1'", "T3'", 'T6'];


function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function layerDiagram() {
  const layers = [
    ['L5', 'Compliance & Transparency'], ['L4', 'Settlement (OVESS)'], ['L3', 'Transport (PEX)'],
    ['L2', 'Routing (DSRE + TMRRE)'], ['L1', 'Identity (PCSIA + PVDTS)'], ['L0', 'Automation Bridge (Shadow-Mode RPA)'],
  ];
  return `<svg class="layer-diagram" viewBox="0 0 620 520" role="img" aria-labelledby="layer-title layer-desc">
    <title id="layer-title">Six-layer Adopti architecture</title><desc id="layer-desc">Layered architecture above existing shelter systems without replacing them.</desc>
    ${layers.map(([code, label], index) => {
      const y = 34 + index * 58;
      return `<g><rect x="38" y="${y}" width="544" height="46" rx="14" class="layer-box"/><text x="72" y="${y + 30}" class="layer-code">${code}</text><text x="132" y="${y + 30}" class="layer-label">— ${label}</text></g>`;
    }).join('')}
    <line x1="64" x2="556" y1="394" y2="394" class="system-rule"/><text x="310" y="434" text-anchor="middle" class="systems-note">[Existing systems below L0, not replaced]</text><text x="310" y="468" text-anchor="middle" class="systems-row">Shelterluv · PetPoint · Chameleon · 24PetWatch</text>
  </svg>`;
}



function autonomousFlow() {
  const options = Object.entries(flowScenarios).map(([key, scenario]) => `<option value="${key}">${esc(scenario.label)}</option>`).join('');
  return `<section class="live-flow section-wrap" aria-labelledby="live-flow-heading">
    <div class="flow-intro">
      <p class="eyebrow">Live autonomous flow</p>
      <h2 id="live-flow-heading">Watch the orchestration layer run itself.</h2>
      <p>Choose a sample trajectory, press play, or step one event at a time. The white-space interface shows the active state, the layer making the decision, and the audit row created by each transition.</p>
    </div>
    <div class="flow-shell" data-flow-shell>
      <div class="flow-toolbar" aria-label="Workflow simulation controls">
        <label>Scenario <select data-scenario-select>${options}</select></label>
        <div class="flow-buttons">
          <button type="button" data-flow-action="prev">Back</button>
          <button type="button" class="primary" data-flow-action="play">Autoplay</button>
          <button type="button" data-flow-action="next">Next step</button>
        </div>
      </div>
      <div class="flow-canvas">
        <div class="flow-path" data-flow-path></div>
        <article class="flow-panel" data-flow-panel></article>
        <aside class="audit-panel" aria-live="polite">
          <p class="audit-label">Hash-chained audit rows</p>
          <div data-audit-feed></div>
        </aside>
      </div>
    </div>
  </section>`;
}

function initAutonomousFlow() {
  const shell = document.querySelector('[data-flow-shell]');
  if (!shell) return;

  const select = shell.querySelector('[data-scenario-select]');
  const playButton = shell.querySelector('[data-flow-action="play"]');
  const path = shell.querySelector('[data-flow-path]');
  const panel = shell.querySelector('[data-flow-panel]');
  const auditFeed = shell.querySelector('[data-audit-feed]');
  let scenarioKey = select.value;
  let activeIndex = 0;
  let timer = null;

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
    playButton.textContent = 'Autoplay';
    playButton.classList.remove('is-playing');
  };

  const render = () => {
    const scenario = flowScenarios[scenarioKey];
    const step = scenario.steps[activeIndex];
    const visitedStates = new Set(scenario.steps.slice(0, activeIndex + 1).map((item) => item.state));
    path.innerHTML = `<div class="flow-subject"><span>${esc(scenario.subject)}</span><strong>${esc(scenario.summary)}</strong></div>
      <div class="state-rail">${pexStates.map((state) => {
        const stateIndex = scenario.steps.findIndex((item) => item.state === state);
        const isActive = step.state === state;
        const isVisited = visitedStates.has(state);
        const isAvailable = stateIndex !== -1;
        return `<button type="button" class="state-node ${isActive ? 'active' : ''} ${isVisited ? 'visited' : ''} ${isAvailable ? '' : 'muted'}" data-state="${esc(state)}" ${isAvailable ? '' : 'disabled'}><span>${esc(state)}</span></button>`;
      }).join('')}</div>`;

    panel.innerHTML = `<p class="flow-layer ${esc(step.tone)}">${esc(step.layer)} · ${esc(step.claim)}</p>
      <h3>${esc(step.title)}</h3>
      <p>${esc(step.body)}</p>
      <dl>
        <div><dt>Current actor</dt><dd>${esc(step.actor)}</dd></div>
        <div><dt>State</dt><dd>${esc(step.state)}</dd></div>
      </dl>`;

    auditFeed.innerHTML = scenario.steps.slice(0, activeIndex + 1).map((item, index) => `<article class="audit-row ${index === activeIndex ? 'current' : ''}">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <div><strong>${esc(item.state)} · ${esc(item.layer)}</strong><p>${esc(item.audit)}</p></div>
    </article>`).join('');

    path.querySelectorAll('[data-state]').forEach((button) => {
      button.addEventListener('click', () => {
        const targetIndex = scenario.steps.findIndex((item) => item.state === button.dataset.state);
        if (targetIndex >= 0) {
          activeIndex = targetIndex;
          stop();
          render();
        }
      });
    });
  };

  shell.addEventListener('click', (event) => {
    const action = event.target.closest('[data-flow-action]')?.dataset.flowAction;
    if (!action) return;
    const scenario = flowScenarios[scenarioKey];
    if (action === 'next') {
      activeIndex = (activeIndex + 1) % scenario.steps.length;
      stop();
      render();
    }
    if (action === 'prev') {
      activeIndex = (activeIndex - 1 + scenario.steps.length) % scenario.steps.length;
      stop();
      render();
    }
    if (action === 'play') {
      if (timer) {
        stop();
        return;
      }
      playButton.textContent = 'Pause';
      playButton.classList.add('is-playing');
      timer = window.setInterval(() => {
        activeIndex = (activeIndex + 1) % flowScenarios[scenarioKey].steps.length;
        render();
      }, 1800);
    }
  });

  select.addEventListener('change', () => {
    scenarioKey = select.value;
    activeIndex = 0;
    stop();
    render();
  });

  render();
}
function annotatedFigure(image, caption, callouts) {
  return `<figure class="annotated-figure"><div class="figure-stage"><img src="${image}" alt="${esc(caption)}"/>${callouts.map((c) => `<div class="callout" style="left:${c.x}%;top:${c.y}%"><span class="callout-badge">${c.number}</span><strong>${esc(c.title)}</strong><p>${esc(c.body)}</p></div>`).join('')}</div><figcaption>${esc(caption)}</figcaption></figure>`;
}

function comparisonBlock(comparison) {
  return `<aside class="comparison-block"><h3>${esc(comparison.title)}</h3><div class="comparison-grid"><div class="comparison-column prior-art"><h4>${esc(comparison.leftHeading)}</h4><ul>${comparison.leftItems.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></div><div class="comparison-column adopti-column"><h4>${esc(comparison.rightHeading)}</h4><ul>${comparison.rightItems.map((item) => `<li>${esc(item)}</li>`).join('')}</ul><p class="comparison-footnote">${esc(comparison.footnote)}</p></div></div></aside>`;
}

function runCard(run) {
  return `<article class="${run.featured ? 'run-card run-card-featured' : 'run-card'}"><p class="run-kicker">${esc(run.title)}</p><h3>${esc(run.subject)}</h3>${run.species ? `<p class="run-meta">${esc(run.species)}</p>` : ''}${run.preface ? `<p class="run-meta">${esc(run.preface)}</p>` : ''}<pre>${esc(run.timeline.join('\n'))}</pre><div class="run-outcome">${run.outcome.map((line) => `<p>${esc(line)}</p>`).join('')}</div><p class="run-claims">Patent claims demonstrated: ${esc(run.claimsDemonstrated)}</p></article>`;
}

function claimGrid() {
  return `<div class="claim-grid">${claimFamilies.map((family) => `<article class="claim-card" id="claim-${family.code.toLowerCase()}"><p class="claim-code">${family.code}</p><h3>${esc(family.name)}</h3><p>${esc(family.tagline)}</p><p class="claim-anchor">USPTO 64/045,063 · ${esc(family.anchor)}</p><p class="claim-links">→ ${family.links.map(esc).join(' · ')}</p></article>`).join('')}</div>`;
}

const app = document.querySelector('#app');
app.innerHTML = `
  <header class="page-header" id="workflow"><p class="eyebrow">PLACEMENT EXECUTION STATE MACHINE · PEX — CLAIM 25 ANCHOR</p><h1>Workflow</h1><p class="caption">Every subject flows through the same six-state machine. Triggers, conditions, loops, and settlement events — auditable end-to-end.</p></header>
  <section class="hero-section section-wrap"><div><h2>A subject moves across organizations. Most welfare systems lose them. Adopti is the layer that doesn't.</h2><p>Six integrated inventions — persistent identity, dual-score routing, outcome-verified settlement, custody-weighted reconciliation, voice diversion, and a placement execution state machine — operating as one orchestration layer above existing systems of record.</p></div>${layerDiagram()}</section>
  ${autonomousFlow()}
  <section class="sticky-story section-wrap" aria-labelledby="architecture-heading"><div class="section-copy"><p class="eyebrow">Section 2</p><div><h2 id="architecture-heading">The Architecture</h2><p>Adopti reads above existing shelter management systems through per-system browser automation adapters operating in shadow mode by default — no replacement, no integration cost, no risk to your system of record.</p></div></div>${annotatedFigure('/src/assets/img-5006-architecture.svg', 'Architecture reference · L0 Automation Bridge · Adopti, Inc.', architectureCallouts)}${comparisonBlock(rpaComparison)}</section>
  <section class="sticky-story section-wrap" aria-labelledby="journey-heading"><div class="section-copy"><p class="eyebrow">Section 3</p><div><h2 id="journey-heading">A Subject&apos;s Journey</h2><p>One animal moving from intake to verified outcome — and every system around them keeping continuity. Each step writes a timestamped, hash-chained event that downstream layers consume.</p></div></div>${annotatedFigure('/src/assets/img-5007-transaction.svg', 'Transaction reference · T0 Intake → T6 Settlement · Adopti, Inc.', journeyCallouts)}${comparisonBlock(softwareComparison)}</section>
  <section class="run-history section-wrap" aria-labelledby="run-history-heading"><div class="section-copy"><p class="eyebrow">Section 4</p><div><h2 id="run-history-heading">Run History</h2><p>Five anonymized sample runs from pilot precursor data. Each card shows a subject moving through the six-state machine and the resulting settlement outcome.</p></div></div><div class="run-strip" aria-label="Anonymized workflow run history cards">${runHistory.map(runCard).join('')}</div></section>
  <section class="section-wrap" aria-labelledby="claims-heading"><div class="section-copy"><p class="eyebrow">Section 5</p><div><h2 id="claims-heading">Six Integrated Inventions</h2><p>Each family below corresponds to one or more product pages. Click through for the working interface.</p></div></div>${claimGrid()}</section>
  <footer class="compliance-footer"><p>AB 631-native · Chain-of-custody verified · Audit-ready exports · Read-only regulator review</p><p>USPTO Provisional Application 64/045,063 · Filed April 21, 2026</p><p>Twenty-five claims across six invention families · Five continuation anchors filed</p><p>Inventor: Shannon Swindell · Assignee: Adopti, Inc. (Delaware C-Corp)</p><p>Verifiable at <a href="https://patentcenter.uspto.gov/applications/64045063">patentcenter.uspto.gov/applications/64045063</a></p></footer>
`;

initAutonomousFlow();
