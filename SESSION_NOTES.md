# Session Notes — 14 September 2026

Third build, one correction: the interchange line is gone. Vaulta is a payment facilitator, not a
card issuer, and the previous session's 1.5% issuer interchange — 55% of revenue — rested on an
assumption about Vaulta's structure that was wrong. This session removed it, replaced it with the
Rain card cost it should have been, and built the levers the open questions needed.

Live model: https://moazzamkhoja.github.io/Vaulta-AUM-Model/ · `index.html` is authoritative.
Harness: `node tools/harness.js [id=value ...]` runs `model()` from the HTML in Node.

---

## What changed

**Removed:** `Card interchange` revenue line and the `i_ic` slider.

**Added, payments:** one merchant fee (0.5%) on all spend; Rain cost per card transaction (`i_rc`,
$0.13); average card ticket (`i_tx`, $48, sets transactions per dollar); card issuance per customer
per month (`i_iss`, $0.21). Payment contribution = fee − Rain cost on the (1 − QR) share of spend.
The sensitivity table is now sleeve × QR share, and a rail-economics table on the Unit Economics tab
shows one transaction on each rail.

**Added, AUM:** an optional fifth segment, Investment-First (`i_if`, off by default) with an
`open` column on every segment — the balance a new investor brings on day one. Opening balances
enter the AUM roll-forward as gross adds × adoption × opening. An "AUM options" table on the Model
tab re-runs the model for Options 1, 2 and 1+2.

**Added, costs:** opex stress test (`i_ox`): forces all-in opex per customer (fixed + variable +
marketing) up to $138 or $254, with the Team tab's derived cost as the floor. A comparison table on
the P&L tab shows all three levels.

Selects fire `change`, not `input`; the document listener now handles both.

## Where it lands — the honest model

Year 10: 4.3m customers, **$258M revenue** (was $791M), EBITDA **−$122M** and never positive within
ten years, EV **−$266M**, blended LTV:CAC **1.2x**, revenue per customer **$60** against Chime's
$257 and Wealthfront's $261.

The $533M of lost Year 10 revenue is $443M of interchange Vaulta does not earn and $91M of Rain cost
on the card rail. No line was invented to recover it.

Revenue mix Year 10: consumer NIM 59%, payment contribution 28%, AUM 9%, merchant float 3%.

## Findings

**QR is the high-margin rail, and the earlier finding was backwards.** At $48 the merchant pays
$0.24 on either rail; QR costs Solana's $0.00025 and nets $0.24, the Rain card costs $0.13 and nets
$0.11. The card rail breaks even at a $26 ticket. EV moves from −$266M at 10% QR to −$135M at 100%.
The previous session's "QR is worth less to us" rested entirely on the interchange error.

**Rain cost is 55% of the merchant fee at the default 90% card share.** $91M against $164M in Year
10. This is the number the card rail has to justify as an acceptance convenience.

**The sleeve is still the dominant lever.** EV turns positive at a 50% sleeve (consumer reward
falls from 3.84% to 2.40%), or at 30% with all spend on QR. Neither is the default.

**The lean org is a requirement, not an assumption.** All-in opex is $88 per customer in Year 10.
At Wealthfront's $138 EBITDA is −$339M; at Chime's $254 it is −$841M. The prior session asked
whether the org was too lean; at $60 of revenue per customer it cannot be anything else.

**Option 1 (investment-first segment) does not pay at robo CAC.** $5,000 opening × 0.25% is
$2.20/month against a $300 CAC — 0.36x LTV:CAC; 1.04x at a 1.0% fee. Switching it on makes EV
worse (−$331M). Wealthfront's motion works because 74% of its revenue is cash NIM on balances it
did not acquire for investing. Defaults for the segment are a first guess — edit on the Customers
tab.

**Option 2 (fee to 1.0%) is the only AUM lever that moves the line on its own.** AUM revenue
$24M → $94M, share 9% → 29%, EV −$266M → −$152M. It is a pricing decision, not a modelling one.

**CAC does not pay for itself at this revenue rate.** Marketing is the largest cost line in every
year — $238M in Year 10 against $258M of revenue. Blended $90 CAC against $60 of annual revenue and
$4.40 of monthly net contribution gives 1.2x.

## Open — for next session

Everything below is a decision for the owner, not a modelling gap:

1. **Sleeve.** 20% is the default and the business is under water at it. The model says 50%, or
   30% plus QR. What does the consumer reward have to be to win the deposit?
2. **QR share.** 10% is a placeholder. What does merchant enrolment actually look like by year?
3. **AUM fee.** 0.25% is Betterment's price to customers who cannot reach Betterment. 1.0% is the
   only lever that makes AUM matter.
4. **Investment-first segment.** Off. Defaults are a guess and it loses money at them; either
   find inputs at which it works or leave it off.
5. **Adoption.** Blended ~57% into investing is probably high. Edit the adoption column to see
   20% and 35%.
6. **Rain's actual pricing.** $0.13 and $5/card are from the brief. Confirm against the contract;
   EV moves ~$25M per cent of per-transaction cost.

---

# Session Notes — 12 September 2026

Rebuilt the Vaulta AUM model from scratch three times over this session as the business
definition changed. This records what was decided, what was found, and what is still open.

Live model: https://moazzamkhoja.github.io/Vaulta-AUM-Model/ · `index.html` is authoritative.

---

## What the model is now

A **consumer-only, 10-year** model for Vaulta as a money-management business on-chain, riding
[Dinari's](https://dinari.com/work-with-dinari) white-label broker-dealer rails rather than
registering its own BD.

**Five revenue lines**, all per customer:

| Line | Basis |
|---|---|
| Consumer T-bill sleeve | balance × 4.8% × 20% sleeve |
| Merchant float | (spend × 12 × 20% retained) × 4.8% × 30% sleeve |
| Payment margin | spend × 0.5%, on **all** rails |
| Card interchange | spend × card share × 1.5% — Vaulta is the **issuer** |
| AUM fee | average AUM × 0.25% |

**Two cost lines**: a variable cost per customer, and a fixed operating cost derived from the
headcount build on the Team tab. Marketing is CAC × gross adds and nothing else.

## Decisions taken

| Decision | Choice | Why |
|---|---|---|
| Business shape | Consumer only | The enterprise/merchant deal engine was a bill-pay motion and was why CAC looked wrong — acquisition cost fell out of BD headcount, not a per-customer number |
| Revenue model | Pre-pivot | Consumer wallet economics |
| Cost structure | Post-pivot (v7) | Substantially more detail |
| Broker-dealer | Ride Dinari | Dinari holds the first BD registration for tokenized stocks and licenses rails so fintechs need not register |
| International | Non-US emerging markets | Turkey +7% YoY to $40bn on lira debasement while the US fell 11% |
| Stages | 1 / 2 / 3 / 4 years | Seed, Series A, B, C over ten years |
| Payments | "0.5% + cost" | Merchant pays 0.50% on QR or 2.00% on card, against ~2.5–2.9% at Stripe |
| Interchange | Revenue at 1.5% | Vaulta issues the card; requires a Durbin-exempt sponsor bank |
| Scale | 50% of Chime by Yr 10 | ~4.3m customers |
| CAC | Anchored to Chime's $109 | $110 / $200 / $80 / $60, blending near $90 |

## Errors found and corrected

These were mine, found by challenge during the session:

**CAC was being double-counted for drop-outs.** Chime's $109 and Nubank's $7.40 are per *funded*
customer — the signups that never funded are already inside those figures. Dividing by a funding
rate again understated LTV:CAC by roughly 40%.

**Spend was modelled at 20% of balance per month**, far too low for a primary transaction account.
Balance is a stock and spend is a flow; a balance replenished by direct deposit turns over more than
once a month. Now a dollar figure, directly comparable to Chime's ~$970.

**Interchange was excluded entirely** on the reading that it was a pass-through. It is not — Vaulta
is the issuer, so the merchant's acquirer pays interchange *to* Vaulta. It is now 55% of revenue and
was the difference between a business that worked and one that didn't.

**Three defaults were making AUM economically irrelevant**: the AUM fee was priced below the wallet
yield (0.175% net against 0.96%, so moving a dollar into the fund destroyed 82% of the revenue on
it); Dinari was modelled as a 30% revenue share rather than a basis-point platform spread; and 100%
liquidation on churn made outflows 2.6x the investment return. Fixing all three took AUM from 3% to
42% of revenue at the time, and made the S&P return slider actually move enterprise value.

**Churn was flat and too low.** Chime's M12 retention is 28% and consumer fintech runs 3–5% monthly,
but established digital banks churn only 10.8% a year. Flat rates understate year-one losses and
overstate mature ones. Now a mature rate with year one at 4x.

**Merchant float accrued only on QR volume**, not all spend, and used a stage-transplanted 3-day
retention. Merchants receive the whole settlement whatever rail it ran on.

**Fixed cost stepped only by stage**, which showed a 71% EBITDA margin at 4.3m customers — higher
than Visa's. Customer service and compliance now scale with the customer base.

## Findings that survived

**The wallet-versus-AUM arithmetic.** A wallet dollar earns t-bill × sleeve. An AUM dollar earns the
fee less the platform spread. Price AUM below that and moving cash into the fund *destroys* revenue.
Growth-adjusted — a wallet dollar stays a dollar while an AUM dollar compounds — the parity fee is
0.84% rather than 0.96% static.

**Neither comparable earns most of its money from its namesake activity.** Chime is 69% interchange.
Wealthfront is **74% deposit spread and only 25% advisory fees**, on $26,071 of invested assets per
client. A pure 0.25% money-management model does not exist at scale.

**Faster growth cannot mature an AUM book — it dilutes it.** Book average falls from $7,783 at 45%
Series C growth to $5,271 at 100%, even as total AUM more than doubles. Wealthfront's $26,071 is an
artefact of a seventeen-year-old slow-growing book. Compare tenured cohorts, not book to book.

**$188/month reaches Wealthfront's balance for a single tenured customer in ten years** — less than
three of our four segments already contribute. The book average lags purely because of dilution.

**Unbanked is value-destructive under every configuration tested** — currently 0.89x LTV:CAC. Also a
shrinking pool: the FDIC has unbanked households at 4.2% and falling.

**QR is an acquisition tool, not a revenue line.** Every dollar moved from card to QR takes Vaulta
from 2.00% to 0.50%. Good for the merchant, expensive for us — which is precisely why it pulls them.

## Where it lands

Year 10: 4.3m customers, $791M revenue, EBITDA positive from Year 6, blended LTV:CAC ~4.2x,
revenue per customer $188 against Chime's $257 and Wealthfront's $261.

## Open — for next session

**The AUM question is parked, not resolved.** AUM is ~3% of revenue. Vaulta acquires wallet
customers who then adopt investing from zero; Wealthfront acquires investment-first clients who
arrive with balances. That is the structural reason AUM lags, and it does not resolve inside a
ten-year horizon on the current acquisition motion.

Also open: whether the org is too lean (all-in opex per customer sits under Chime's $254), and
whether blended adoption of 57% into investing is defensible.
