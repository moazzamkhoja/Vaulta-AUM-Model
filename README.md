# Vaulta AUM Model

A 10-year **consumer-only** model for Vaulta as a money-management business on-chain — a blockchain
broker-dealer riding [Dinari's](https://dinari.com/work-with-dinari) white-label rails rather than
registering its own BD.

**▶ [Live interactive model](https://moazzamkhoja.github.io/Vaulta-AUM-Model/)** — every lever is
editable and the whole model recomputes live.

> **`Vaulta_AUM_Model_v1.xlsx` is stale.** It is the original 5-year build and does not match
> `index.html`. Treat the HTML as authoritative until the workbook is regenerated.

---

## What this model is

Revenue model from **pre-pivot** (consumer wallet), cost structure from **post-pivot** (v7,
`afca2dc`), harmonised for a consumer business:

| Line | Basis |
|---|---|
| T-bill NIM | wallet balances × 4.8% × 20% sleeve |
| QR payments | balances × spend%/mo × 12 × **QR share of spend** × 0.5% |
| AUM fee | average AUM × 0.25%, less the Dinari revenue share |

Card and Apple Pay interchange is **pass-through** and excluded from the P&L entirely — Vaulta only
earns where it controls settlement.

## The four segments

Editable on the Customer Profiles tab. Seed is Unsatisfied Banked and Crypto Enthusiast only;
Unbanked and International switch on at Series A.

| Segment | CAC | Balance | Spend %/mo | AUM adoption | Contribution | Churn/mo | Funding rate |
|---|---|---|---|---|---|---|---|
| Unsatisfied Banked | $55 | $2,500 | 120% | 25% | $50/mo | 2.25% | 65% |
| Unbanked | $120 | $800 | 200% | 5% | $10/mo | 3.50% | 40% |
| Crypto Enthusiast | $45 | $6,000 | 40% | 70% | $200/mo | 1.50% | 80% |
| International (EM) | $25 | $1,800 | 15% | 60% | $75/mo | 2.00% | 55% |

CAC is per **funded** customer, matching how Chime ($109) and Nubank ($7.40) report it — the signups
that never funded are already inside those figures, so the funding rate is a diagnostic rather than
a second multiplier. Stages: Seed = Yr 1, Series A = Yrs 2–3, Series B = Yrs 4–6, Series C = Yrs 7–10,
with a growth-rate grid per segment per stage.

Marketing expense is **CAC × gross adds** and nothing else. Gross adds replace churned customers as
well as adding net new.

## Results at the defaults

| | Yr 3 | Yr 6 | Yr 10 |
|---|---|---|---|
| Funded customers | 18,525 | 213,576 | 909,353 |
| Wallet balances | $49.4M | $516M | $2.10B |
| T-bill NIM | $475K | $4.95M | $20.19M |
| QR payments | $537K | $5.40M | $22.67M |
| AUM fee (net) | $9K | $197K | $1.33M |
| **Net revenue** | **$1.02M** | **$10.55M** | **$44.19M** |
| EBITDA | −$3.66M | −$5.73M | +$336K |
| Total AUM | — | $216M | $904M |

Enterprise value **−$16.2M**, EBITDA positive in **Year 10**, blended LTV:CAC **1.91x**.

### Unit economics, Year 10 (per customer per month)

| Segment | Revenue | Net contribution | CAC | LTV | LTV:CAC | Payback |
|---|---|---|---|---|---|---|
| Unsatisfied Banked | $5.80 | $4.90 | $55 | $125 | **2.27x** | 11 mo |
| Unbanked | $2.64 | $1.75 | $120 | $35 | **0.29x** | 69 mo |
| Crypto Enthusiast | $8.55 | $7.65 | $45 | $229 | **5.09x** | 6 mo |
| International (EM) | $1.96 | $1.06 | $25 | $28 | **1.14x** | 24 mo |
| **Blended** | **$4.07** | **$3.18** | **$43** | **$83** | **1.91x** | 14 mo |

## What the model actually says

**The sleeve is still the dominant lever, not AUM.** Each column re-runs all ten years:

| Sleeve | 10% | **20%** | 30% | 40% | 50% | 58% |
|---|---|---|---|---|---|---|
| Consumer reward | 4.32% | **3.84%** | 3.36% | 2.88% | 2.40% | 2.02% |
| LTV : CAC | 1.35x | **1.91x** | 2.48x | 3.05x | 3.61x | 4.06x |
| EBITDA positive | never | **Yr 10** | Yr 8 | Yr 7 | Yr 6 | Yr 6 |
| Enterprise value | −$34.6M | **−$16.2M** | +$2.1M | +$20.5M | +$38.8M | +$53.5M |

Value turns positive around a **30%** sleeve; LTV:CAC clears 3x at about **40%**.

**QR acceptance is the second-biggest swing, and it is an assumption not a fact.** The model applies
0.5% only to the share of spend that runs through Solana Pay — default 25%, because on a card
transaction the merchant already pays the networks 1.5–2.5% and cannot also absorb 0.5% unless
Vaulta is the acquirer.

| QR share of spend | 10% | **25%** | 50% | 100% |
|---|---|---|---|---|
| Yr 10 payment revenue | $9.1M | **$22.7M** | $45.3M | $90.7M |
| Enterprise value | −$40.9M | **−$16.2M** | +$24.8M | +$106.8M |
| LTV : CAC | 1.18x | **1.91x** | 3.15x | 5.61x |

Total Year 10 customer spend is $18.1bn, so 0.5% on all of it would be $90.7M. Note that even at
25%, payments are already **51% of Year 10 revenue** — larger than the T-bill sleeve. That sits
oddly with framing this as a money-management business and is worth a decision.

**Unbanked is value-destructive at every setting.** Highest CAC, lowest balance, lowest AUM
adoption, highest churn, worst funding rate — LTV:CAC of 0.29x means roughly $85 destroyed per
customer acquired. It is also a shrinking pool: the FDIC has unbanked households at **4.2%** and
falling. Removing the segment entirely improves EV from −$16.2M to −$12.3M and blended LTV:CAC from
1.91x to 2.13x. Worth serving for mission reasons; it will not carry the P&L.

**International has the best CAC and the worst balance.** $25 CAC against Nubank's actual $7.40 is
defensible, and the demand signal is real — Turkey rose to #5 in the Q1-2026 crypto adoption index,
growing 7% YoY to $40bn on lira debasement while the US contracted 11% and Germany 25%. But at a
$1,800 balance and 15% monthly spend it only reaches 1.14x LTV:CAC. It carries the highest AUM share
of contribution of any segment (16.8%), so it improves as the AUM line grows — it is the segment the
investing product is actually for.

## Cost-structure review — what changed and why

| Change | Reason |
|---|---|
| **Removed** local + enterprise BD deal engine | A bill-pay motion, not a consumer one. It was also why CAC looked strange — acquisition cost fell out of BD headcount rather than a per-customer number |
| **Removed** brand marketing % of revenue, and activation $/customer | Both now sit inside segment CAC. Keeping them alongside CAC × gross adds would double-count acquisition |
| **Kept** one alliance hire | Dinari, sponsor bank and payment rails need an owner; a sales team does not |
| **Tightened** customers per CS rep, 30,000 → 15,000 | Investment accounts generate materially more support contact than a stored-value wallet |
| **Broke out and ramped** compliance / BSA-AML | Was buried in G&A at 1–3 heads; now its own payroll line at 1–6, for suitability and cross-border KYC |
| **Added** Dinari revenue share | The cost of not being a broker-dealer |
| **Added** international licensing per live market | Reg S and local partner cost, scaling with markets opened |
| **Excluded** card / Apple Pay interchange | Pass-through — interchange received and processor cost offset |

**Still unresolved:** FX spread on international funding and withdrawal is not modelled and could be
a real *revenue* line rather than a cost. Same for a sponsor-bank fee on the US wallet side.

## Research basis

Full detail with citations on the Research tab.

- **CAC** — Chime $109 at scale (S-1 2024), $30–50 early ([Forbes/Cornerstone](https://www.forbes.com/sites/ronshevlin/2025/03/23/what-are-banks-and-fintechs-real-customer-acquisition-costs/));
  Nubank **$7.40** in 2025 with 80–90% word-of-mouth ([Nu Holdings 20-F](https://www.sec.gov/Archives/edgar/data/1691493/000129281426002166/nuform20f_2025.htm));
  Revolut ~£10 (2021) → ~£20 (2023)
- **Unbanked** — 4.2% of US households, lowest since 2009; 14.2% underbanked ([FDIC via Banking Dive](https://www.bankingdive.com/news/underbanked-us-population-grows-fdic-survey-unbanked-households/732820/))
- **International demand** — Turkey #5 and +7% YoY to $40bn; US −11%, Korea −28%, UK −17%, Germany −25% ([TRM Labs Q1 2026](https://www.trmlabs.com/resources/blog/q1-2026-global-crypto-adoption-index))
- **Tokenized equities** — ~$1.7bn market by June 2026, +149% YTD, $6.7bn monthly volume; DTC to create blockchain "digital twins" of US equities from 2026 ([crypto.com](https://crypto.com/en/research/tokenized-stocks-jun-2026))
- **Dinari** — first broker-dealer registration for tokenized stocks; white-label API lets fintechs embed tokenized equities without registering ([Yahoo Finance](https://finance.yahoo.com/news/dinari-granted-first-broker-dealer-153706691.html))
- **AUM fee 0.25%** — Betterment Basic and Wealthfront both charge 0.25%; **return 8.5%** — historical S&P 500 nominal ~10.4%, forward forecasts 3.9–5.9%
- **Contribution $50/mo** — Acorns reports most customers investing $50–60/month ([investingintheweb](https://investingintheweb.com/brokers/acorn-statistics/))

**Three numbers are judgements, not research**, all flagged in red on the Research tab: the Unbanked
CAC (nobody discloses one), the Dinari revenue share (not public), and redemption/liquidation.

## Tabs

1. **Model** — value KPIs, four charts, summary by year, sleeve sensitivity
2. **Customer Profiles** — editable segment grid, growth-rate grid by stage, customers by year
3. **Unit Economics** — revenue and contribution per customer, LTV, LTV:CAC, payback, by segment and by year
4. **P&L & Cash** — full P&L, headcount, funding, valuation
5. **AUM Engine** — quarterly roll-forward and the crossover algebra
6. **Research** — every default with citation, findings, and the cost-structure review

## Related

[`Vaulta-Pay-Model`](https://github.com/moazzamkhoja/Vaulta-Pay-Model) — the bill-pay model this cost
structure comes from, plus the `rebuild-v3` branch.
