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
| **Merchant fee** | 1.25% | One rate on every transaction, whatever the rail. The decision. |
| **QR share of spend** | 10% | The rest runs on the Rain debit card. The other decision. |
| **CAC per funded customer** | $100 | One blended number; each segment carries a multiplier on the Customers tab (110% / 200% / 80% / 60%) |
| **Customers in Year 10** | 4.3M | One number; the segment mix (48 / 4 / 6 / 42%) and the growth shape by stage are on the Customers tab |

Everything else — T-bill rate, sleeve, Rain's pricing, average ticket, AUM fee, market return,
discount rate — is on the **Assumptions** tab: editable there if a better number turns up, but not
a lever.

## What Vaulta is — and is not

Vaulta is **not a bank and not a card issuer**. It charges merchants one fee on every transaction.
What differs by rail is Vaulta's *cost*, and the cost is derived from the customers' spend:

| Rail | Merchant fee | Vaulta's cost | Net at a $48 ticket, 1.25% fee |
|---|---|---|---|
| QR / Android NFC — direct Solana Pay | 1.25% | ~$0.00025 network fee | **$0.60 (1.25%)** |
| Rain debit card — Visa/Mastercard, Apple Pay | 1.25% | ~$0.13 per transaction + ~$0.21/customer/month issuance | **$0.47 (0.98%)** |

Card transactions = card spend ÷ average ticket; Rain cost = transactions × $0.13 + issuance.
Interchange the merchant pays on a card transaction goes to their acquirer and the issuing bank.
**Vaulta is never in that flow and earns no interchange.** The card rail breaks even at a $10 ticket.

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
| Merchant fee 1.25% | $2.4M | $28.1M | $406.7M |
| *less rail cost* | *−$0.5M* | *−$6.2M* | *−$90.2M* |
| Payment contribution | $1.8M | $21.9M | $316.6M |
| AUM fee | $0.1M | $1.4M | $23.9M |
| **Revenue** | **$2.9M** | **$35.0M** | **$501.4M** |
| Marketing (CAC × gross adds) | $1.8M | $18.4M | $236.4M |
| Fixed operating cost | $5.4M | $20.2M | $109.2M |
| **EBITDA** | **−$4.6M** | **−$6.8M** | **+$109.4M** |

Revenue per customer **$117** against Chime's $257 and Wealthfront's $261. Blended LTV:CAC **2.5x**.
EBITDA positive in **Year 9**, 22% margin in Year 10; enterprise value **+$137M**. Revenue is 31%
NIM, 63% payment contribution, 5% AUM — at this fee, payments are the primary line.

### Unit economics by segment — Year 5 (on the Model tab)

| | Unsatisfied Banked | Unbanked | Crypto Enthusiast | International | Blended |
|---|---|---|---|---|---|
| CAC | $110 | $200 | $80 | $60 | $93 |
| Revenue / mo | $13.25 | $6.95 | $13.93 | $5.38 | $10.20 |
| Discounted LTV | $315 | $95 | $350 | $114 | $236 |
| **LTV : CAC** | **2.86x** | **0.48x** | **4.37x** | **1.90x** | **2.54x** |
| Payback | 9 mo | 33 mo | 6 mo | 13 mo | 10 mo |

## What the levers do

**Fee × QR share** — the only sensitivity table in the model, EV, each cell a full re-run:

| fee \ QR | 10% | 25% | 50% | 75% | 100% |
|---|---|---|---|---|---|
| 0.50% | −$262M | −$240M | −$204M | −$168M | −$132M |
| 0.75% | −$129M | −$107M | −$71M | −$35M | +$1M |
| 1.00% | +$4M | +$26M | +$62M | +$98M | +$133M |
| **1.25%** | **+$137M** | +$159M | +$195M | +$230M | +$266M |

Each 0.25% of fee is worth ~$133M of EV; each 25 points of QR share ~$36M. **Customers in Year 10**
barely moves EV (at 0.75%: 2M → −$136M, 8.6M → −$115M) — marketing and support scale with the base,
so scale does not rescue the unit economics; fee, QR share and CAC do. At the 0.75% fee the model
was under water (EV −$129M) and crossed zero at 1.0%; the default is now 1.25%.

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
| Revenue / customer | $257 | $261 | $117 |
| Primary line | Interchange 69% — *it is the issuer* | Cash NIM 74% | Payment contribution 63% |
| AUM fee share | none | 25% | 5% |
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
