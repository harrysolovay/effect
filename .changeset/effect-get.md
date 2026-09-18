---
"effect": patch
---

Add `Effect.get`, which selects a property from an effect's success value as a
shorthand for `Effect.map(self, (a) => a[key])`. It supports both data-first
and pipeable forms.

```ts
import { Effect } from "effect"

const user = Effect.succeed({ id: 1, name: "Alice" })

const name = user.pipe(Effect.get("name"))
// Effect<string>
```
