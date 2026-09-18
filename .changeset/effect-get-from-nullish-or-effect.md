---
"effect": patch
---

Add `Effect.get` and `Effect.fromNullishOrEffect`.

`Effect.get` selects a property from an effect's success value, as a shorthand
for `Effect.map(self, (a) => a[key])`. It supports both data-first and
pipeable forms.

`Effect.fromNullishOrEffect` runs an effect and fails with
`NoSuchElementError` when the success value is `null` or `undefined`, as a
shorthand for `Effect.flatMap(self, Effect.fromNullishOr)`.

```ts
import { Effect } from "effect"

const user = Effect.succeed({ id: 1, name: "Alice" })

const name = user.pipe(Effect.get("name"))
// Effect<string>

const users: Record<string, string> = {}
const found = Effect.fromNullishOrEffect(Effect.sync(() => users["1"]))
// Effect<string, NoSuchElementError>
```
