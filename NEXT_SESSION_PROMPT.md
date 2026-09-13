# Next Session Prompt — Vaulta AUM Model

**Copy this whole file into a new session to pick up where we left off.**

---

## Where things stand

`C:\Projects\Vaulta-AUM-Model` → github.com/moazzamkhoja/Vaulta-AUM-Model (public, Pages on).
Live: **https://moazzamkhoja.github.io/Vaulta-AUM-Model/**

`index.html` is the model and is authoritative — a single file, Chart.js from CDN, no build step.
`Vaulta_AUM_Model_v1.xlsx` in the repo is **stale** (an early 5-year build) and should be ignored or
regenerated. Read `SESSION_NOTES.md` first for the full decision log.

**I want HTML, not spreadsheets.** A workbook in a repo is not something I can look at.

## The model in one paragraph

Consumer-only, 10 years, four segments, five revenue lines, two cost lines. Vaulta is a
money-management business on-chain riding Dinari's white-label broker-dealer rails. Revenue is:
consumer T-bill sleeve (20% of 4.8% on balances), merchant float (20% of a month's collections at a
30% sleeve), payment margin (0.5% on all spend), card interchange (1.5%, Vaulta is the issuer), and
the AUM fee (0.25%). Costs are a variable cost per customer plus a fixed cost derived from the
headcount build on the Team tab. Marketing is CAC × gross adds. Year 10 reaches 4.3m customers —
half of Chime — with $791M revenue and EBITDA positive from Year 6.

## The one open question: AUM

**This is what we agreed to sleep on. Start here.**

AUM is only ~3% of revenue and the reason is structural, not a bad assumption:

- Vaulta acquires **wallet** customers who then adopt investing **from zero**. Wealthfront acquires
  **investment-first** clients who arrive with balances. That difference is the whole gap.
- A single tenured customer contributing $200/month reaches $27,678 in ten years — past
  Wealthfront's $26,071 average. But the **book average** is $5,189, because at 98% Series C growth
  most investors joined recently at a near-zero balance.
- **Faster growth makes this worse, not better.** Book average falls from $7,783 at 45% growth to
  $5,271 at 100%. Growth and maturity pull in opposite directions.
- So AUM matures *beyond* the ten-year horizon on the current acquisition motion.

**Options worth modelling next time** (none decided):

1. **A fifth, investment-first segment** — acquired specifically for tokenized investing, arriving
   with an opening balance, higher CAC ($200–400, the robo benchmark), much lower churn (Wealthfront
   is 0.43%/month), and Wealthfront-like balances. This is the direct fix.
2. **Raise the AUM fee.** At 0.25% Vaulta charges Betterment's price to customers who cannot access
   Betterment. The growth-adjusted parity fee against the wallet sleeve is 0.84%. At 1.0% the AUM
   line roughly quadruples with no behavioural assumption.
3. **Extend the horizon to 15 years** so the book has time to mature, and show the AUM share rising.
4. **Accept it** — treat AUM as a retention and positioning asset rather than a revenue line, and
   lead with the deposit spread plus interchange, which is what Chime and Wealthfront actually do.

## Also open

- **Is the org too lean?** All-in opex per customer is ~$67 against Chime's $254 and Wealthfront's
  $138. The 49% Year-10 EBITDA margin follows from that, not from a better business.
- **Is 57% blended adoption into investing defensible?** Probably high. No neobank discloses a
  cross-sell rate anywhere near it. Note that adoption does **not** change the per-investor balance —
  it scales investors and AUM together — so it moves total fee revenue only.
- **The Durbin dependency.** Interchange at 1.5% requires a sponsor bank under $10bn in assets. It
  is 55% of revenue. If that exemption ever closes, or if Vaulta ends up on a Rain-style programme at
  0.35%, the model changes materially.

## House rules learned the hard way

- **CAC is per funded customer.** Chime's $109 and Nubank's $7.40 already embed non-funding signups.
  Do not divide by a funding rate again.
- **Spend is a flow, balance is a stock.** Spend above 100% of balance per month is turnover, not
  drawdown, and is correct for a transaction account.
- **Revenue lines use average balances; stock-versus-stock ratios use period-end.** Mixing them
  flatters the ratio.
- **Interchange is revenue, not a cost** — Vaulta issues the card.
- Verify any change by extracting the last `<script>` block from `index.html` and running `model()`
  in Node against a stubbed DOM. It catches arithmetic the browser hides. There are working harness
  scripts from the last session in the scratchpad pattern described in `SESSION_NOTES.md`.
- No `gh` CLI on this machine. Create repos via `git credential fill` then the GitHub API.
- Pages caches — append `?v=<sha>` when verifying a deploy.

## Benchmarks to hold the model against

| | Chime | Wealthfront |
|---|---|---|
| Revenue / customer | $257 | $261 |
| Primary line | Interchange 69% | Cash NIM **74%** |
| AUM fee share | none | 25% |
| Invested / client | none | $26,071 |
| CAC | $109 at scale | $200–400 |
| Churn | M12 retention 28% | 0.43%/mo |
| Customers | 8.6m (12 yrs) | 1.4m (17 yrs) |

Neither earns most of its money from its namesake activity. That is the single most useful fact
found last session and it should anchor any argument about what Vaulta's primary line ought to be.
