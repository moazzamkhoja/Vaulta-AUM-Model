# Vaulta AUM Model

A standalone model for **Vaulta Invest** — the tokenized-investment product — built to answer one
question: **does AUM fee revenue overtake the T-bill sleeve in Years 3–5?**

Two views of the same model:

- **▶ [Live interactive model](https://moazzamkhoja.github.io/Vaulta-AUM-Model/)** (`index.html`) —
  every lever is a slider; charts, tables and the verdict recompute live. Push the rollover multiple
  or the AUM fee far enough and the verdict flips to YES, which is the point of the exercise.
- **`Vaulta_AUM_Model_v1.xlsx`** — the same model as a 9-sheet workbook, for auditing the formulas
  cell by cell.

Rebuild the workbook with `python tools/build_aum_model.py`. Both are verified: the workbook by full
recalculation in Excel (**0 error cells**), and `index.html` by running its `model()` in Node against
the workbook's figures — **worst difference 0.012%**.

---

## The model

AUM is a **stock that accumulates**, not a balance you assume:

```
Closing AUM = Opening AUM
            + initial rollover at signup   (new investors x wallet balance x rollover multiple)
            + contributions                (investors x wallet balance x contribution % x 3 months)
            - redemptions                  (opening AUM x redemption rate / 4)
            - churn leakage                (opening AUM x quarterly churn)
            + market return                (on opening plus half of inflows)

AUM fee revenue = average AUM x AUM fee / 4
```

Run per segment, per quarter, over 20 quarters. Every lever is per segment on **Assumptions**.

### Levers, per segment

| Segment | CAC | Wallet balance | Monthly churn | AUM adoption | Contribution %/mo | Rollover at signup |
|---|---|---|---|---|---|---|
| 1 — Underbanked Active | $40 | $900 | 3.25% | 8% | 1.0% | 0.25x |
| 2 — Dissatisfied Banked | $57.50 | $2,500 | 2.25% | 25% | 2.0% | 0.60x |
| 3 — Primary Bank Switcher | $70 | $4,250 | 1.25% | 40% | 2.5% | 1.00x |
| 4 — Crypto-Curious Investor | $47.50 | $6,000 | 1.50% | 70% | 3.5% | 2.00x |

Adoption uses **one** mechanism: effective adoption = segment ceiling x product-availability ramp
(0% / 45% / 70% / 90% / 100% by year). This deliberately avoids the two-conflicting-schedules
problem in the Pay-Model.

## The answer: no, and the reason is structural

Set AUM fee revenue equal to NIM revenue and the user counts cancel out entirely:

```
AUM x fee = balances x t-bill rate x sleeve
AUM / balances = (0.048 x 0.20) / 0.005 = 1.92x
```

**Total AUM must exceed 1.92x total wallet balances.** This is a pure ratio — it does not depend on
how many customers Vaulta has, so growth alone never triggers the crossover.

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| T-bill NIM (20% sleeve) | $72,866 | $412,112 | $1,421,256 | $3,752,693 | $8,252,607 |
| Transaction fees | $38,255 | $216,359 | $746,160 | $1,970,164 | $4,332,619 |
| AUM fee | $0 | $41,461 | $198,105 | $682,298 | $1,695,039 |
| Total retained revenue | $111,121 | $669,932 | $2,365,521 | $6,405,155 | $14,280,265 |
| AUM as % of revenue | 0% | 6.2% | 8.4% | 10.7% | 11.9% |
| **AUM / NIM** | — | **0.10x** | **0.14x** | **0.18x** | **0.21x** |
| AUM / balances | — | 0.21x | 0.28x | 0.36x | **0.40x** |

AUM reaches **0.40x** balances by Year 5 against the 1.92x needed — a **4.8x shortfall**. AUM does
grow as a share of retained revenue (6.2% → 11.9%), but it does not overtake.

### What would close the gap

Year 5 AUM per investor is **$4,033** in the model. The crossover needs **$19,383**. For scale:

- Acorns, the closest mass-market analogue: **$2,142** average balance
- Betterment / Wealthfront, the primary-brokerage tier: **~$66,000**

So the model is already more optimistic than Acorns, and the crossover sits about a quarter of the
way to Betterment. **The monthly drip is not the lever** — at 1–3.5% of balance per month,
contributions move the AUM/balance ratio by roughly `adoption x rate x months`, which is far too
slow. The lever that moves it is the **initial rollover**: money transferred in from an existing
bank or brokerage at signup. Vaulta Invest has to be a primary investment account, not a round-up
feature.

The second lever is price. At **0.50%** Vaulta undercuts Acorns' effective rate on a typical balance
by roughly 3x, so there is real headroom. At 1.00% the required ratio halves to 0.96x — within
sight of where the model already lands.

## The cost of the 20/80 sleeve

Handing the consumer 80% of T-bill income gives them a **3.84% effective reward rate**, which beats
Chime's 3.75% APY (and Chime's requires $3,000/month in direct deposits). It is a genuine
acquisition weapon. It also cuts Vaulta's NIM to 0.96% of balances, and the unit economics do not
survive it intact:

| Segment | Net contribution / mo | LTV | LTV:CAC | Payback |
|---|---|---|---|---|
| 1 — Underbanked Active | $0.61 | $13 | **0.32x** | 66 mo |
| 2 — Dissatisfied Banked | $2.73 | $70 | **1.21x** | 21 mo |
| 3 — Primary Bank Switcher | $5.52 | $175 | **2.50x** | 13 mo |
| 4 — Crypto-Curious Investor | $10.50 | $315 | **6.62x** | 5 mo |
| **Blended (Year 3 mix)** | **$2.80** | **$78** | **1.47x** | 19 mo |

Blended LTV:CAC of 1.47x sits well under the 3x bar investors underwrite to. Segment 1 destroys
value outright — it costs $40 to acquire a customer worth $13. A sleeve sensitivity on the
unit-economics sheet shows the trade-off across 10%–58%.

Note the tension: a lower sleeve makes the AUM crossover *easier* (1.92x instead of 5.57x), but it
gets there by shrinking the NIM line rather than by growing AUM.

## Research basis

Every default is sourced on the **Research & Sources** sheet. Headlines:

- **AUM fee 0.50%** — Betterment Basic and Wealthfront both charge 0.25%; Acorns' flat $3/month is
  ~1.7% of its $2,142 average balance and ~2.5% on a $1,425 balance.
  ([unbiased.com](https://www.unbiased.com/discover/financial-advice/best-robo-advisors), [acorns.com](https://www.acorns.com/learn/investing/acorns-vs-percentage-based-apps/))
- **Reference balance $2,142** — Acorns held $30bn across 14m registered users (Jul 2026), up from
  $1,876 in 2025 and $1,439 in 2024.
  ([investingintheweb.com](https://investingintheweb.com/brokers/acorn-statistics/))
- **Contribution ~$50/mo for segment 2** — Acorns reports most customers investing roughly $50–60
  per month into core accounts; modelled as a % of wallet balance so it scales with segment wealth.
- **Contribution 1.0–3.5%/mo** — the US personal saving rate was 2.7–3.0% of income in mid-2026;
  top-quintile earners save 15–25% while bottom-quintile saving is negative.
  ([tradingeconomics.com](https://tradingeconomics.com/united-states/personal-saving-rate-percent-m-saar-fed-data.html))
- **Investment return 5.5%/yr** — Vanguard's Dec-2025 10-year US equity forecast is 3.9–5.9%;
  BlackRock's was just over 5%. Both sit well below the historical ~10%.
  ([Vanguard VEMO 2026](https://corporate.vanguard.com/content/dam/corp/research/pdf/isg_vemo_2026.pdf), [Morningstar](https://www.morningstar.com/markets/experts-forecast-stock-bond-returns-2026-edition))
- **Affluent ceiling ~$66,000** — Betterment ~$65bn across 1m+ clients; Wealthfront $95bn across
  1.4m+. ([sacra.com](https://sacra.com/research/wealthfront-betterment-robo-advisor-resurrection/))
- **The product is real** — Dinari launched 724 tokenized US stocks including the full S&P 500 for
  US self-custody wallets, settled in USDC across 4 chains, each dShare backed 1:1 in regulated
  custody (Aug 2026). ([CoinDesk](https://www.coindesk.com/business/2026/08/04/dinari-brings-tokenized-u-s-stocks-to-american-investors-as-equity-race-heats-up), [The Block](https://www.theblock.co/post/410588/dinari-tokenized-sp-500-stocks-self-custody-wallets-using-usdc))

**One default is not researched.** Redemption/leakage at 8%/yr is a modelling judgement — there is
no clean public disclosure of micro-investing redemption rates. It is flagged in red on the
Research sheet and is the weakest number in the workbook.

## A note on averages vs period-end

Revenue lines use **average** balances, because income accrues across the quarter. The crossover
ratio uses **end-of-period** balances, because it compares two stocks (AUM against wallet balances).
Mixing the two understates the denominator and flatters the ratio — an earlier draft of the workbook
did exactly that and reported 0.43x instead of 0.40x.

## Sheets

1. **Cover** — the answer, annual revenue by line, unit economics, findings
2. **Research & Sources** — every default with its basis and citation
3. **Assumptions** — all levers (blue = input)
4. **Consumer Model** — quarterly ramp by segment
5. **AUM Engine** — the roll-forward, per segment and total
6. **Revenue Comparison** — AUM vs NIM vs transaction fees, quarterly and annual
7. **Crossover Analysis** — the algebra, where the model lands, what closes the gap
8. **Segment Unit Economics** — LTV/CAC at the 20/80 sleeve, with sleeve sensitivity
9. **Sensitivity** — AUM/balance ratio vs rollover and contribution rate; revenue vs fee rate

## Relationship to the Pay-Model

Separate repo, separate question. [`Vaulta-Pay-Model`](https://github.com/moazzamkhoja/Vaulta-Pay-Model)
holds the full P&L, cash and valuation build (`rebuild-v3` branch). This repo isolates the AUM
engine so its levers can be pushed without disturbing that model. The two share segment definitions
and the consumer ramp but nothing else.
