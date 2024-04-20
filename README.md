# Prisoner's Dilemma: Bots Tournament

A reinterpretation of Robert Axelrod's *Evolution of Cooperation* bots tournament, as [presented by Veritasium](https://www.youtube.com/watch?v=mScpHTIi-kM), written in Typescript.


## How to Run
```bash
ts-node tournament.ts
```

## How to Add Bots
Append them to `candidates.ts`.

## Example Output
```text
 average points bot[row] got playing against bot[column]
┌──────────────┬───────────┬──────────┬─────────┬────────┬──────────────┬────────────┐
│ (index)      │ TitForTat │ ScrewYou │ NiceGuy │ Random │ CassandraBot │ OzStrategy │
├──────────────┼───────────┼──────────┼─────────┼────────┼──────────────┼────────────┤
│ TitForTat    │ 3         │ 1        │ 3       │ 2.25   │ 2.5          │ 3          │
│ ScrewYou     │ 1         │ 1        │ 5       │ 3      │ 5            │ 1.02       │
│ NiceGuy      │ 3         │ 0        │ 3       │ 1.5    │ 0            │ 3          │
│ Random       │ 2.25      │ 0.5      │ 4       │ 2.25   │ 3.56         │ 0.53       │
│ CassandraBot │ 2.5       │ 0        │ 5       │ 1.69   │ 2.5          │ 0.02       │
│ OzStrategy   │ 3         │ 1        │ 3       │ 2.98   │ 4.98         │ 3          │
└──────────────┴───────────┴──────────┴─────────┴────────┴──────────────┴────────────┘

 average points bots got on total
┌──────────────┬─────────┐
│ (index)      │ Average │
├──────────────┼─────────┤
│ OzStrategy   │ 2.99    │
│ ScrewYou     │ 2.67    │
│ TitForTat    │ 2.46    │
│ Random       │ 2.18    │
│ CassandraBot │ 1.95    │
│ NiceGuy      │ 1.75    │
└──────────────┴─────────┘
```