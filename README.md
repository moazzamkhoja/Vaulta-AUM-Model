# Vaulta AUM Model

A 10-year **consumer-only** model for Vaulta as a blockchain-based **payment facilitator** and
money-management business: consumer balances held in vUSD, invested in T-bills for NIM, payments
routed over Solana Pay or a third-party debit card, and tokenized investing on
[Dinari's](https://dinari.com/work-with-dinari) white-label broker-dealer rails.

**▶ [Live interactive model](https://moazzamkhoja.github.io/Vaulta-AUM-Model/)** — `index.html` is
the model and is authoritative. Single file, Chart.js from CDN, no build step.

> **`Vaulta_AUM_Model_v1.xlsx` is stale.** Ignore it. HTML only; no spreadsheets.

---

## Four levers, everything else fixed

The model is deliberately simple. At this stage most inputs are unknowns, so they are held as fixed
assumptions on a back tab and the front has four sliders:

| Lever | Default | What it is |
|---|---|---|
| **Merchant fee** | 0.75% | One rate on every transaction, whatever the rail. The decision. |
| **QR share of spend** | 10% | The rest runs on the Rain debit card. The other decision. |
| **CAC per funded customer** | $100 | One blended number; each segment carries a multiplier on the Customers tab (110% / 200% / 80% / 60%) |
| **Customers in Year 10** | 4.3M | One number; the segment mix (48 / 4 / 6 / 42%) and the growth shape by stage are on the Customers tab |

Everything else — T-bill rate, sleeve, Rain's pricing, average ticket, AUM fee, market return,
discount rate — is on the **Assumptions** tab: editable there if a better number turns up, but not
a lever.

## What Vaulta is — and is not

Vaulta is **not a bank and not a card issuer**. It charges merchants one fee on every transaction.
What differs by rail is Vaulta's *cost*, and the cost is derived from the customers' spend:

| Rail | Merchant fee | Vaulta's cost | Net at a $48 ticket, 0.75% fee |
|---|---|---|---|
| QR / Android NFC — direct Solana Pay | 0.75% | ~$0.00025 network fee | **$0.36 (0.75%)** |
| Rain debit card — Visa/Mastercard, Apple Pay | 0.75% | ~$0.13 per transaction + ~$0.21/customer/month issuance | **$0.23 (0.48%)** |

Card transactions = card spend ÷ average ticket; Rain cost = transactions × $0.13 + issuance.
Interchange the merchant pays on a card transaction goes to their acquirer and the issuing bank.
**Vaulta is never in that flow and earns no interchange.** The card rail breaks even at a $17 ticket.

## Revenue lines

| Line | Basis |
|---|---|
| Consumer T-bill sleeve | balances × 4.8% × 20% sleeve |
| Merchant float | (spend/12 × 20% retained) × 4.8% × 30% sleeve |
| Payment contribution | spend × fee, **less** rail cost |
| AUM fee | average AUM × 0.25% |

Two cost lines — a variable cost per customer and a fixed operating cost built from headcount on the
Team tab — plus marketing at **CAC × gross adds** and nothing else.

## Results at the defaults

| | Yr 3 | Yr 6 | Yr 10 |
|---|---|---|---|
| Customers | 23,258 | 297,954 | 4,300,000 |
| Consumer T-bill sleeve | $0.9M | $11.2M | $153.1M |
| Merchant fee 0.75% | $1.4M | $16.9M | $244.0M |
| *less rail cost* | *−$0.5M* | *−$6.2M* | *−$90.2M* |
| Payment contribution | $0.9M | $10.6M | $153.9M |
| AUM fee | $0.1M | $1.4M | $23.9M |
| **Revenue** | **$2.0M** | **$23.8M** | **$338.7M** |
| Marketing (CAC × gross adds) | $1.8M | $18.4M | $236.4M |
| Fixed operating cost | $5.3M | $19.5M | $99.4M |
| **EBITDA** | **−$5.5M** | **−$17.4M** | **−$43.6M** |

Revenue per customer **$79** against Chime's $257 and Wealthfront's $261. Blended LTV:CAC **1.7x**.
EBITDA is **not positive within ten years**; enterprise value **−$129M**. Revenue is 45% NIM, 45%
payment contribution, 7% AUM.

### Unit economics by segment — Year 5 (on the Model tab)

| | Unsatisfied Banked | Unbanked | Crypto Enthusiast | International | Blended |
|---|---|---|---|---|---|
| CAC | $110 | $200 | $80 | $60 | $93 |
| Revenue / mo | $8.40 | $3.95 | $10.93 | $4.13 | $6.97 |
| Discounted LTV | $191 | $48 | $269 | $82 | $155 |
| **LTV : CAC** | **1.74x** | **0.24x** | **3.36x** | **1.37x** | **1.67x** |
| Payback | 15 mo | 66 mo | 8 mo | 19 mo | 15 mo |

## What the levers do

**Fee × QR share** — the only sensitivity table in the model, EV, each cell a full re-run:

| fee \ QR | 10% | 25% | 50% | 75% | 100% |
|---|---|---|---|---|---|
| 0.50% | −$262M | −$240M | −$204M | −$168M | −$132M |
| **0.75%** | **−$129M** | −$107M | −$71M | −$35M | +$1M |
| 1.00% | +$4M | +$26M | +$62M | +$98M | +$133M |
| 1.25% | +$137M | +$159M | +$195M | +$230M | +$266M |

**CAC**: $50 → EV +$78M, LTV:CAC 3.3x, EBITDA positive Year 9. $75 → −$26M. $100 → −$129M.
$150 → −$335M.

**Customers in Year 10** barely moves EV: 2M → −$136M, 4.3M → −$129M, 8.6M → −$115M. Marketing and
support scale with the base, so scale does not rescue the unit economics — fee, QR share and CAC do.

EV crosses zero at a **1.0% fee**, at **~$70 CAC**, or at **0.75% with all spend on QR**.

## House rules

- **Interchange is not Vaulta revenue.** Vaulta is a payment facilitator, not a card issuer.
- **One merchant fee on all rails.** Cost varies by rail; the fee does not. More QR always helps.
- **Four levers on the front. Everything else is an assumption on the back tab**, not a new slider.
- **CAC is per funded customer.** Do not divide by a funding rate again.
- **Spend is a flow, balance is a stock.** Spend above 100% of balance per month is turnover.
- **Revenue lines use average balances; stock-versus-stock ratios use period-end.**
- Verify any change with `node tools/harness.js [id=value ...]` — it runs `model()` from the HTML
  against a stubbed DOM. Example: `node tools/harness.js i_vm=0.01 i_qr=0.5 i_cac=75`.

## Benchmarks

| | Chime | Wealthfront | Vaulta (Yr 10) |
|---|---|---|---|
| Revenue / customer | $257 | $261 | $79 |
| Primary line | Interchange 69% — *it is the issuer* | Cash NIM 74% | NIM 45% / payments 45% |
| AUM fee share | none | 25% | 7% |
| Invested / client | none | $26,071 | $5,189 |
| CAC | $109 at scale | $200–400 | $93 blended |
| Customers | 8.6M (12 yrs) | 1.4M (17 yrs) | 4.3M (10 yrs) |

## Tabs

1. **Model** — four levers, what follows from them, unit economics by segment, P&L charts, summary, fee × QR sensitivity
2. **Customers** — segment mix and CAC multipliers, balances and spend, growth shape by stage, customers by year
3. **Unit Economics** — rail economics per transaction, revenue and contribution per customer, LTV
4. **P&L** — full P&L with rail cost broken out, funding, valuation
5. **Team** — headcount by function and stage; fixed cost derived from it
6. **Assumptions** — every fixed input with its basis, benchmarks, sources, findings

## Related

[`Vaulta-Pay-Model`](https://github.com/moazzamkhoja/Vaulta-Pay-Model) — the bill-pay model the cost
structure comes from.
