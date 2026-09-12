# Vaulta AUM Model

A 10-year model for **Vaulta Invest** — the tokenized-investment product — built on the
**post-pivot Vaulta-Pay-Model cost structure**. Only the revenue model differs: T-bill NIM +
transaction fees + AUM fee.

**▶ [Live interactive model](https://moazzamkhoja.github.io/Vaulta-AUM-Model/)** — every lever is a
slider, all five tabs recompute live.

> **Note on `Vaulta_AUM_Model_v1.xlsx`:** that workbook is the earlier **5-year** build on the
> pre-pivot cost structure. It has not been regenerated against the current 10-year model and its
> numbers no longer match `index.html`. Treat `index.html` as authoritative until the workbook is
> rebuilt.

---

## The AUM engine

AUM is an accumulating stock, run per segment per quarter over 40 quarters:

```
Closing AUM = Opening
            + rollover at signup   (gross new investors × rollover amount)
            + contributions        (investors × monthly contribution × 3)
            − redemptions          (opening × redemption rate ÷ 4)
            − churn leakage        (opening × quarterly churn × liquidation share)
            + market return        (on opening plus half of inflows, net of the AUM fee)
```

Gross new investors = investors this quarter − last quarter's investors surviving churn. Using net
adds understates rollovers, because it silently nets off the investors who left — that was why AUM
per investor previously looked flat. It now grows from ~$1,115 in Year 2 to **$2,983 by Year 10**,
passing the ~$2,142 Acorns actually reports.

### Segment levers

| Segment | Wallet balance | AUM adoption | Contribution $/mo | Rollover at signup |
|---|---|---|---|---|
| 1 — Underbanked Active | $900 | 8% | $15 | $0 |
| 2 — Dissatisfied Banked | $2,500 | 25% | $50 | $250 |
| 3 — Primary Bank Switcher | $4,250 | 40% | $100 | $750 |
| 4 — Crypto-Curious Investor | $6,000 | 70% | $200 | $2,000 |

Contribution can be switched to a % of balance. Adoption = segment ceiling × availability ramp
(0 / 45 / 70 / 90 / 100% by year) — one mechanism, no conflicting schedules.

## Cost structure — post-pivot (v7), unchanged

Carried over from `Vaulta-Pay-Model` main (`afca2dc`): headcount by function (engineering, CS,
leadership, legal, security, compliance), BD comp split local vs enterprise off deals-per-rep,
brand marketing as a % of revenue (opex, not CAC), activation $ per new customer (in CAC), G&A as a
% of revenue with a $400k floor, referrals, fixed infra, legal retainer, KYC. Regulatory capital
($6M) is a balance-sheet raise, excluded from the P&L.

**Revenue is presented net**, as in the post-pivot model: revenue is the sleeve Vaulta keeps plus
fees plus the AUM fee. Vaulta Rewards are netted out before revenue and shown as a memo line — not
a COGS item. COGS is variable infra only.

## Results at the defaults (20/80 sleeve, 0.25% fee, 8.5% return)

| | Yr 3 | Yr 5 | Yr 7 | Yr 10 |
|---|---|---|---|---|
| Consumers | 49,863 | 173,084 | 337,212 | 616,682 |
| T-bill NIM | $1.14M | $3.95M | $7.70M | $14.08M |
| Transaction fees | $597K | $2.07M | $4.04M | $7.39M |
| AUM fee | $18K | $140K | $371K | $969K |
| Net revenue | $1.75M | $6.16M | $12.11M | $22.43M |
| EBITDA | −$2.56M | −$3.21M | −$3.83M | **$2.65M** |
| AUM per investor | $1,449 | $1,852 | $2,293 | **$2,983** |
| AUM % of net revenue | 1.0% | 2.3% | 3.1% | 4.3% |

Enterprise value **−$6.7M**, EBITDA positive in **Year 9**, blended LTV:CAC **1.63x**
(CAC $38.45, derived from the cost structure itself as BD comp + activation ÷ new consumers).

## The finding: the sleeve is the dominant value lever, not AUM

Each column below re-runs the whole 10-year model:

| Vaulta sleeve | 10% | **20%** | 30% | 40% | 50% | 58% |
|---|---|---|---|---|---|---|
| Consumer effective reward | 4.32% | **3.84%** | 3.36% | 2.88% | 2.40% | 2.02% |
| LTV : CAC | 1.02x | **1.63x** | 2.24x | 2.85x | 3.46x | 3.95x |
| EBITDA positive | never | **Year 9** | Year 6 | Year 5 | Year 5 | Year 5 |
| Enterprise value | −$20.5M | **−$6.7M** | +$7.1M | +$20.9M | +$34.6M | +$45.7M |

At 20/80 the business does not clear this cost structure. Value turns positive at roughly a **30%**
sleeve and LTV:CAC clears 3x at around **45–50%**. The 3.84% consumer reward is a genuine
acquisition weapon — it beats Chime's 3.75% APY, which requires $3,000/month in direct deposits —
but it is paid out of Vaulta's own margin, and at 20% there is not enough margin left.

### Two further findings

**The return assumption barely matters.** Moving it from 4% to 10.4% changes Year 10 AUM per
investor only from $2,733 to $3,097 — about 13%. At these balance sizes contribution flow and
leakage dominate compounding, so the 5.5%-vs-8.5% question is not where the value sits.

**Rollover at signup is the real AUM lever.** Multiplying it 8x takes Year 10 AUM per investor from
$2,983 to $7,280 and the AUM line from 4.3% to 10.1% of net revenue. The monthly drip does far less.

Dropping the fee from 0.50% to 0.25% halves the AUM line and doubles the crossover hurdle from
1.92x to 3.84x of wallet balances. It is the right competitive price — it matches Betterment Basic
and Wealthfront — but it is the single biggest reduction to this revenue line.

## Research basis

Every default is sourced on the **Research** tab. Headlines:

- **AUM fee 0.25%** — Betterment Basic and Wealthfront both charge 0.25%. Acorns' flat $1–3/month is
  ~1.7% of its $2,142 average balance.
  ([unbiased.com](https://www.unbiased.com/discover/financial-advice/best-robo-advisors))
- **S&P 500 return 8.5%** — historical nominal total return with dividends reinvested is ~10.4%
  since 1957 and ~10.3–10.5% over the last 30 years; forward forecasts are 3.9–5.9% (Vanguard) and
  ~5% (BlackRock). 8.5% sits below history, above forecast.
  ([officialdata.org](https://www.officialdata.org/us/stocks/s-p-500) ·
  [Fidelity](https://www.fidelity.com/learning-center/trading-investing/sp-500-average-return) ·
  [Vanguard](https://corporate.vanguard.com/content/dam/corp/research/pdf/isg_vemo_2026.pdf))
- **Contribution $50/mo** — Acorns reports most customers investing ~$50–60/month into core accounts.
  ([investingintheweb.com](https://investingintheweb.com/brokers/acorn-statistics/))
- **Reference balance $2,142** — Acorns held $30bn across 14m registered users (Jul 2026), up from
  $1,876 in 2025 and $1,439 in 2024.
- **Affluent ceiling ~$66,000** — Betterment ~$65bn across 1m+ clients; Wealthfront $95bn across 1.4m+.
  ([sacra.com](https://sacra.com/research/wealthfront-betterment-robo-advisor-resurrection/))
- **The product is real** — Dinari launched 724 tokenized US stocks including the full S&P 500 for US
  self-custody wallets, USDC-settled across 4 chains, each dShare backed 1:1 (Aug 2026).
  ([CoinDesk](https://www.coindesk.com/business/2026/08/04/dinari-brings-tokenized-u-s-stocks-to-american-investors-as-equity-race-heats-up))

**Two defaults are not sourced** and are flagged in red on the Research tab: rollover at signup, and
redemption (8%/yr) plus churn liquidation share (100%). They are the two levers that most move AUM,
and both are set at the conservative end.

## Tabs

1. **Model** — value KPIs, AUM strip, four charts, summary by year, sleeve value-driver table
2. **P&L & Cash** — full P&L, headcount by function, funding and cash, valuation
3. **Unit Economics** — by segment and by year, showing the AUM line growing
4. **AUM Deep Dive** — the engine, roll-forward, crossover algebra and sensitivity
5. **Research** — every default with its basis and citation, plus findings

## Related

[`Vaulta-Pay-Model`](https://github.com/moazzamkhoja/Vaulta-Pay-Model) holds the bill-pay model this
cost structure comes from, plus the `rebuild-v3` branch.
