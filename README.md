# Vaulta AUM Model

A 10-year **consumer-only** model for Vaulta as a blockchain-based **payment facilitator** and
money-management business: consumer balances held in vUSD, invested in T-bills for NIM, payments
routed over Solana Pay or a third-party debit card, and tokenized investing on
[Dinari's](https://dinari.com/work-with-dinari) white-label broker-dealer rails.

**▶ [Live interactive model](https://moazzamkhoja.github.io/Vaulta-AUM-Model/)** — every lever is
editable and the whole model recomputes live. `index.html` is the model and is authoritative.

> **`Vaulta_AUM_Model_v1.xlsx` is stale.** It is the original 5-year build and does not match
> `index.html`. Ignore it. HTML only; no spreadsheets.

---

## What Vaulta is — and is not

Vaulta is **not a bank and not a card issuer**. It charges merchants **one fee, 0.5%, on every
transaction whatever the rail**. What differs by rail is Vaulta's *cost*:

| Rail | Merchant fee | Vaulta's cost | Net at a $48 ticket |
|---|---|---|---|
| QR / Android NFC — direct Solana Pay | 0.5% | ~$0.00025 network fee | **$0.24 (0.50%)** |
| Rain debit card — Visa/Mastercard, Apple Pay | 0.5% | ~$0.13 per transaction + ~$0.21/customer/month card issuance | **$0.11 (0.23%)** |

The interchange a merchant pays on a card transaction goes to their acquirer and the issuing bank.
**Vaulta is never in that flow and earns no interchange.** An earlier build booked 1.5% issuer
interchange to Vaulta — 55% of revenue — on the assumption it would issue through a Durbin-exempt
sponsor bank. That assumption was wrong for the business as defined, and the line is gone.

QR earns roughly twice the contribution of a card transaction, so **a higher QR share improves the
model**. The Rain rail breaks even at a $26 ticket.

## The four revenue lines

| Line | Basis |
|---|---|
| Consumer T-bill sleeve | balances × 4.8% × 20% sleeve — **primary** |
| Merchant float | (spend/12 × 20% retained) × 4.8% × 30% sleeve |
| Payment contribution | spend × 0.5%, **less** Rain's cost on the card share of spend |
| AUM fee | average AUM × 0.25% |

Two cost lines — a variable cost per customer and a fixed operating cost built from headcount on the
Team tab — plus marketing at **CAC × gross adds** and nothing else.

## The segments

Four wallet-first segments, and an optional fifth (Option 1, off by default):

| Segment | CAC | Balance | Spend/mo | Invest adoption | Contribution | Opening invest | Churn/mo |
|---|---|---|---|---|---|---|---|
| Unsatisfied Banked | $110 | $4,000 | $970 | 40% | $150 | — | 0.80% |
| Unbanked | $200 | $1,200 | $600 | 10% | $40 | — | 1.80% |
| Crypto Enthusiast | $80 | $8,000 | $600 | 80% | $400 | — | 0.70% |
| International (EM) | $60 | $3,000 | $250 | 75% | $200 | — | 0.80% |
| *Investment-First (Option 1)* | $300 | $2,000 | $300 | 100% | $200 | $5,000 | 0.43% |

CAC is per **funded** customer, as Chime ($109) and Nubank ($7.40) report it. Growth is calibrated to
~4.3m customers in Year 10, half of Chime's 8.6m. Stages: Seed = Yr 1, Series A = Yrs 2–3,
Series B = Yrs 4–6, Series C = Yrs 7–10.

## Results at the defaults — the honest model

| | Yr 3 | Yr 6 | Yr 10 |
|---|---|---|---|
| Customers | 23,125 | 298,200 | 4,325,555 |
| Wallet balances | $96M | $1.15B | $15.9B |
| Consumer T-bill sleeve | $0.9M | $11.1M | $152.9M |
| Merchant fee 0.5% | $0.9M | $11.3M | $163.9M |
| *less Rain card cost* | *−$0.5M* | *−$6.2M* | *−$90.8M* |
| Payment contribution | $0.4M | $5.0M | $73.1M |
| AUM fee | $0.1M | $1.4M | $23.7M |
| **Revenue** | **$1.5M** | **$18.0M** | **$257.6M** |
| Marketing (CAC × gross adds) | $1.8M | $18.4M | $238.3M |
| Fixed operating cost | $5.3M | $19.2M | $94.9M |
| **EBITDA** | **−$5.9M** | **−$22.9M** | **−$122.3M** |
| Total AUM | $47M | $772M | $12.5B |

Revenue per customer **$60** against Chime's $257 and Wealthfront's $261. Blended LTV:CAC **1.2x**.
EBITDA is **not positive within ten years**; enterprise value **−$266M**. Year 10 revenue was $791M
in the prior build; $443M of that was interchange Vaulta does not earn, and a further $91M is Rain's
cost on the card rail.

No new line has been invented to recover it. This is what the business as defined earns.

## What moves it

**The sleeve is the dominant lever, then QR share.** Each cell is a full ten-year re-run (EV):

| sleeve \ QR share | 10% | 25% | 50% | 100% |
|---|---|---|---|---|
| 10% | −$391M | −$369M | −$333M | −$260M |
| **20%** | **−$266M** | −$244M | −$208M | −$135M |
| 30% | −$140M | −$119M | −$82M | −$10M |
| 50% | +$110M | +$132M | +$168M | +$241M |

Value turns positive at a **50% sleeve** — the consumer then earns 2.4% instead of 3.84% — or at a
30% sleeve with essentially all spend on QR. Both are within the model's range; neither is the
default.

**The org cannot be anything but lean.** All-in opex per customer is $88 in Year 10. Forcing it up to
a comparable's level (P&L tab, "Opex stress test"):

| All-in opex / customer | Year 10 EBITDA | Margin | EV |
|---|---|---|---|
| **$88 — model-derived** | **−$122M** | **−47%** | **−$266M** |
| $138 — Wealthfront | −$339M | −132% | −$611M |
| $254 — Chime | −$841M | −327% | −$1.47B |

At $60 of revenue per customer, Chime's cost structure is not survivable. The lean org is a
requirement of the revenue rate, not a choice.

## The AUM question — four options, none chosen

AUM is 9% of Year 10 revenue. Vaulta acquires wallet customers who adopt investing from zero;
Wealthfront acquires investors who arrive with balances. A single tenured customer contributing
$200/mo passes Wealthfront's $26,071 in year ten, but the book average is $5,189 because at ~100%
growth most investors are new — faster growth dilutes the book rather than maturing it.

| Year 10 | Total AUM | AUM / investor | AUM fee | AUM share | EBITDA | LTV:CAC | EV |
|---|---|---|---|---|---|---|---|
| **Base** | $12.5B | $5,189 | $23.7M | 9% | −$122M | 1.18x | −$266M |
| 1 · Investment-first segment on | $16.5B | $6,029 | $31.5M | 12% | −$157M | 1.03x | −$331M |
| 2 · AUM fee 1.0% | $12.4B | $5,131 | $93.6M | 29% | −$57M | 1.68x | −$152M |
| 1 + 2 together | $16.3B | $5,957 | $124.5M | 34% | −$70M | 1.59x | −$179M |
| 3 · Extend to 15 years | *not a lever — a horizon question; AUM share keeps rising after year ten* | | | | | | |
| 4 · Accept it | *AUM is retention and positioning; lead with NIM plus payment contribution* | | | | | | |

**Option 1 does not pay at robo CAC.** An investment-first customer arriving with $5,000 earns
$2.20/month of fee at 0.25% against a $300 CAC — 0.36x LTV:CAC; even at a 1.0% fee it is 1.04x.
Wealthfront's motion works because 74% of its revenue is cash NIM on balances it did not pay to
acquire for investing. **Option 2 is the only one that moves the AUM line materially** on its own,
and it is a pricing decision — 1.0% against Betterment's 0.25%, to customers who cannot reach
Betterment.

Both are levers in the sidebar and both are off in the base case.

## House rules

- **Interchange is not Vaulta revenue.** Vaulta is a payment facilitator, not a card issuer.
- **One merchant fee, 0.5%, on all rails.** Cost varies by rail; the fee does not.
- **QR is the high-margin rail.** More QR should always improve the model.
- **CAC is per funded customer.** Do not divide by a funding rate again.
- **Spend is a flow, balance is a stock.** Spend above 100% of balance per month is turnover.
- **Revenue lines use average balances; stock-versus-stock ratios use period-end.**
- Verify any change with `node tools/harness.js` — it extracts the model from `index.html` and runs
  it against a stubbed DOM. Pass `id=value` overrides, e.g. `node tools/harness.js i_qr=0.5 i_cs=0.3`.

## Benchmarks

| | Chime | Wealthfront | Vaulta (Yr 10) |
|---|---|---|---|
| Revenue / customer | $257 | $261 | $60 |
| Primary line | Interchange 69% — *it is the issuer* | Cash NIM 74% | Consumer NIM 59% |
| AUM fee share | none | 25% | 9% |
| Invested / client | none | $26,071 | $5,189 |
| CAC | $109 at scale | $200–400 | ~$90 blended |
| Churn | M12 retention 28% | 0.43%/mo | 0.7–1.8%/mo mature |
| Customers | 8.6M (12 yrs) | 1.4M (17 yrs) | 4.3M (10 yrs) |

Neither comparable earns most of its money from its namesake activity. Chime earns interchange
because it *is* the issuer through a bank partner; Vaulta is not, and its equivalent primary line is
NIM on the T-bill sleeve.

## Tabs

1. **Model** — value KPIs, four charts, summary by year, the AUM options table
2. **Customers** — editable segment grid (nine inputs), growth by stage, customers by year
3. **Unit Economics** — rail economics per transaction, revenue and contribution per customer, LTV, sleeve × QR sensitivity
4. **P&L** — full P&L with Rain cost broken out, opex stress test, funding, valuation
5. **Team** — headcount by function and stage; fixed cost derived from it
6. **Benchmarks** — Chime and Wealthfront, sources, findings

## Related

[`Vaulta-Pay-Model`](https://github.com/moazzamkhoja/Vaulta-Pay-Model) — the bill-pay model the cost
structure comes from.
