import type * as AiResponse from "@effect/ai/AiResponse"
import * as Predicate from "effect/Predicate"
import type { StopReason } from "../OpenrouterSchema.js"

/** @internal */
export const ProviderMetadataKey = "@effect/ai-openrouter/OpenrouterLanguageModel/ProviderMetadata"

const finishReasonMap: Record<typeof StopReason.Encoded, AiResponse.FinishReason> = {
  content_filter: "content-filter",
  stop: "stop",
  error: "content-filter",
  length: "length",
  tool_calls: "tool-calls"
}

/** @internal */
export const resolveFinishReason = (stopReason: typeof StopReason.Encoded): AiResponse.FinishReason => {
  const reason = finishReasonMap[stopReason]
  return Predicate.isUndefined(reason) ? "unknown" : reason
}
