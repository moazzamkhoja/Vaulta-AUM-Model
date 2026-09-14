# Next Session Prompt — Vaulta AUM Model v4

**Copy this whole file into a new Cowork or Claude Code session to continue.**

---

## Where things stand

`C:\Projects\Vaulta-AUM-Model` → github.com/moazzamkhoja/Vaulta-AUM-Model (public, Pages on).
Live: **https://moazzamkhoja.github.io/Vaulta-AUM-Model/**

`index.html` is the model and is authoritative — a single file, Chart.js from CDN, no build step.
`Vaulta_AUM_Model_v1.xlsx` is **stale**; ignore it. **HTML only. No spreadsheets.**

Read `SESSION_NOTES.md` (14 Sept entry at the top) and `README.md` before touching anything.

Verify any change with `node tools/harness.js [id=value ...]` — it runs `model()` from the HTML
against a stubbed DOM. Example: `node tools/harness.js i_cs=0.5 i_qr=0.5`.

---

## What was done last session (14 Sept 2026)

- **Interchange removed.** Vaulta is a payment facilitator, not a card issuer. The 1.5% issuer
  interchange line (55% of prior revenue) is gone.
- **Rain card cost added** on the card share of spend: $0.13/transaction at a $48 ticket, plus
  $0.21/customer/month issuance. Payment contribution = 0.5% fee − Rain cost. QR is now correctly
  the high-margin rail (nets 0.50% vs 0.23% on card).
- **AUM options table** on the Model tab; **Option 1** (investment-first fifth segment) and
  **Option 2** (fee slider) are levers, both off by default.
- **Opex stress test** at $138 / $254 per customer on the P&L tab.

**The honest result at the defaults:** Year 10 revenue $258M (was $791M), EBITDA −$122M and never
positive, EV −$266M, LTV:CAC 1.2x, revenue per customer $60 vs Chime $257.

---

## Decisions the owner needs to make — these are not modelling gaps

Every one of these is a lever already in the model. The next session should start by getting an
answer to each, not by building anything.

| # | Question | Default | What the model says |
|---|---|---|---|
| 1 | **Consumer sleeve** | 20% (consumer earns 3.84%) | EV positive at 50% (consumer earns 2.40%), or 30% + all-QR |
| 2 | **QR share of spend** | 10% | Every 10 pts of QR ≈ +$15M EV; 100% QR → EV −$135M |
| 3 | **AUM fee** | 0.25% | 1.0% is the only lever that makes AUM matter: 9% → 29% of revenue |
| 4 | **Investment-first segment** | Off | Loses money at robo CAC ($300) and $5,000 opening — 0.36x |
| 5 | **Investing adoption** | ~57% blended | Probably high; no neobank discloses anything near it |
| 6 | **Rain pricing** | $0.13/tx, $5/card | From the brief; confirm against the contract |

Once those are answered, set the defaults to the decided values and re-run. Only then does it make
sense to look at anything else.

---

## Things worth checking if there is time

- **Card issuance is charged on every customer**, including International (EM) where a Rain card
  may not be issued. If that is wrong, either scale `i_iss` by card share or add a per-segment flag.
- **Opening balances enter as gross adds × adoption × opening.** Churned investors' balances leave
  via the redemption rate, not explicitly. Fine at 6% redemption; revisit if the fifth segment is on.
- **Year-one churn is 4× mature for every segment**, including investment-first at 0.43%. Wealthfront
  probably does not see 1.7% first-year monthly churn; consider a per-segment multiplier.
- **The 15-year horizon (Option 3)** is not implemented. Growth is per stage and Series C runs 7–10;
  extending it needs a taper, not another four years at 98%.

---

## House rules (do not violate)

- **Interchange is NOT Vaulta revenue.** Vaulta is a payment facilitator, not a card issuer.
- **One merchant fee rate: 0.5% on all transactions.** Cost varies by rail; revenue rate does not.
- **QR ≈ zero cost; Rain card ≈ $0.13/transaction.** More QR must always improve the model.
- **Do not invent a revenue line to recover what interchange was.** Show what the business earns.
- **CAC is per funded customer.** Do not divide by a funding rate again.
- **Spend is a flow, balance is a stock.** Spend above 100% of balance per month is turnover.
- **Revenue lines use average balances; stock-versus-stock ratios use period-end.**
- No `gh` CLI on this machine. Create repos via `git credential fill` then the GitHub API.
- Pages caches — append `?v=<sha>` when verifying a deploy.
- Selects in the sidebar fire `change`, not `input`; both are wired to `render()`.

---

## Benchmarks (hold every model variant against these)

| | Chime | Wealthfront | Vaulta (Yr 10 defaults) |
|---|---|---|---|
| Revenue / customer | $257 | $261 | $60 |
| Primary line | Interchange 69% — *it is the issuer* | Cash NIM 74% | Consumer NIM 59% |
| AUM fee share | none | 25% | 9% |
| Invested / client | none | $26,071 | $5,189 |
| CAC | $109 at scale | $200–400 | ~$90 |
| Churn | M12 retention 28% | 0.43%/mo | 0.7–1.8%/mo |
| Customers | 8.6M (12 yrs) | 1.4M (17 yrs) | 4.3M (10 yrs) |

Neither Chime nor Wealthfront earns most of its money from its namesake activity. Chime earns
interchange because it *is* the card issuer through a bank partner. Vaulta is not; its equivalent
primary line is NIM on the T-bill sleeve.
