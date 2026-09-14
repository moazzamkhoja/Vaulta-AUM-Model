# Next Session Prompt — Vaulta AUM Model v5

**Copy this whole file into a new Cowork or Claude Code session to continue.**

---

## Where things stand

`C:\Projects\Vaulta-AUM-Model` → github.com/moazzamkhoja/Vaulta-AUM-Model (public, Pages on).
Live: **https://moazzamkhoja.github.io/Vaulta-AUM-Model/**

`index.html` is the model and is authoritative — a single file, Chart.js from CDN, no build step.
`Vaulta_AUM_Model_v1.xlsx` is **stale**; ignore it. **HTML only. No spreadsheets.**

Read `SESSION_NOTES.md` (newest entry at the top) and `README.md` before touching anything.
Verify any change with `node tools/harness.js [id=value ...]` — it runs `model()` from the HTML
against a stubbed DOM. Example: `node tools/harness.js i_vm=0.01 i_qr=0.5 i_cac=75`.

---

## The model is now deliberately simple — keep it that way

**Four levers on the front:**

| id | Lever | Default |
|---|---|---|
| `i_vm` | Merchant fee, all rails | 0.75% |
| `i_qr` | QR share of spend | 10% |
| `i_cac` | CAC per funded customer (one number) | $100 |
| `i_cn` | Customers in Year 10 (one number) | 4.3M |

CAC and customers are shaped on the **Customers** tab: a CAC multiplier % and a Yr-10 mix % per
segment. Growth by stage sets the shape of the ramp; the Yr-10 lever and mix set the level.

**Everything else is a fixed assumption** on the **Assumptions** tab (`ASSUME` array in the code;
`A(id)` reads it unit-aware). Editable there, but **do not promote anything to a slider** unless the
owner asks. The last two sessions went the other way and the owner asked for it to be undone.

**Costs are derived, not set:** card transactions = spend × (1 − QR) ÷ $48 ticket; Rain cost =
transactions × $0.13 + $0.21/customer/month issuance; QR cost = transactions × $0.00025.

---

## At the defaults

Year 10: $339M revenue (NIM 45% / payments 45% / AUM 7%), EBITDA −$44M and never positive,
EV −$129M, LTV:CAC 1.7x, $79 revenue per customer vs Chime's $257.

**What crosses zero:** fee 1.0% (at 10% QR) · CAC ~$70 · fee 0.75% with 100% QR.
**What doesn't:** the customer count. 2M → −$136M, 8.6M → −$115M. Scale is not the story.

---

## Next session agenda

1. **Get the owner's numbers for the four levers** and set them as defaults. That is the whole
   agenda. Fee and QR are decisions; CAC and scale are beliefs.
2. If they want it, a **one-line "what you'd need to believe" readout** on the Model tab: the fee at
   which EV = 0 given the other three levers, and the CAC at which EV = 0. Both are a bisection over
   `model()`; cheap to add, and it answers the question the sensitivity table makes them read off.
3. Only if a fixed assumption is known to be wrong, change it on the Assumptions tab and note why
   in `SESSION_NOTES.md`.

Things removed in this pass that are recoverable from commit `4b0dc97` if ever wanted: the
investment-first fifth segment, the AUM options table, the opex stress test.

---

## House rules (do not violate)

- **Interchange is NOT Vaulta revenue.** Vaulta is a payment facilitator, not a card issuer.
- **One merchant fee rate on all transactions.** Cost varies by rail; revenue rate does not.
- **More QR must always improve the model.**
- **Four levers on the front, assumptions on the back.** Do not add sliders.
- **Do not invent a revenue line to recover what interchange was.**
- **CAC is per funded customer.** Do not divide by a funding rate again.
- **Spend is a flow, balance is a stock.** Spend above 100% of balance per month is turnover.
- **Revenue lines use average balances; stock-versus-stock ratios use period-end.**
- Bash heredocs containing `'` break in this shell — write patch scripts with the Write tool.
- No `gh` CLI on this machine. Pages caches — append `?v=<sha>` when verifying a deploy.
- Preview server: `aum-model` entry in `C:\Users\zdd251\.claude\launch.json` (python http.server :4322).

---

## Benchmarks

| | Chime | Wealthfront | Vaulta (Yr 10 defaults) |
|---|---|---|---|
| Revenue / customer | $257 | $261 | $79 |
| Primary line | Interchange 69% — *it is the issuer* | Cash NIM 74% | NIM 45% / payments 45% |
| AUM fee share | none | 25% | 7% |
| CAC | $109 at scale | $200–400 | $93 blended |
| Customers | 8.6M (12 yrs) | 1.4M (17 yrs) | 4.3M (10 yrs) |
