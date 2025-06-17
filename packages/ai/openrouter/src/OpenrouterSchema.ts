/**
 * @since 1.0.0
 */
import * as Schema from "effect/Schema"

const prefix = "@effect/ai-openrouter"

const makeIdentifier = (name: string) => `${prefix}/${name}`

/**
 * The foundation models supported by Open Router.
 *
 * An up-to-date list can be generated with the following command:
 *
 * ```sh
 * curl -s -H "Authorization: Bearer <TOKEN>" https://openrouter.ai/api/v1/models | jq -r '.data[].id'
 * ```
 *
 * @since 1.0.0
 * @category Schemas
 */
export class KnownModelId extends Schema.Literal(
  "openai/o3-pro",
  "mistralai/magistral-small-2506",
  "mistralai/magistral-medium-2506",
  "mistralai/magistral-medium-2506:thinking",
  "google/gemini-2.5-pro-preview",
  "sentientagi/dobby-mini-unhinged-plus-llama-3.1-8b",
  "deepseek/deepseek-r1-distill-qwen-7b",
  "deepseek/deepseek-r1-0528-qwen3-8b:free",
  "deepseek/deepseek-r1-0528-qwen3-8b",
  "deepseek/deepseek-r1-0528:free",
  "deepseek/deepseek-r1-0528",
  "sarvamai/sarvam-m:free",
  "thedrummer/valkyrie-49b-v1",
  "anthropic/claude-opus-4",
  "anthropic/claude-sonnet-4",
  "mistralai/devstral-small:free",
  "mistralai/devstral-small",
  "google/gemma-3n-e4b-it:free",
  "google/gemini-2.5-flash-preview-05-20",
  "google/gemini-2.5-flash-preview-05-20:thinking",
  "openai/codex-mini",
  "meta-llama/llama-3.3-8b-instruct:free",
  "nousresearch/deephermes-3-mistral-24b-preview:free",
  "mistralai/mistral-medium-3",
  "google/gemini-2.5-pro-preview-05-06",
  "arcee-ai/caller-large",
  "arcee-ai/spotlight",
  "arcee-ai/maestro-reasoning",
  "arcee-ai/virtuoso-large",
  "arcee-ai/coder-large",
  "arcee-ai/virtuoso-medium-v2",
  "arcee-ai/arcee-blitz",
  "microsoft/phi-4-reasoning-plus:free",
  "microsoft/phi-4-reasoning-plus",
  "microsoft/phi-4-reasoning:free",
  "inception/mercury-coder-small-beta",
  "opengvlab/internvl3-14b:free",
  "opengvlab/internvl3-2b:free",
  "deepseek/deepseek-prover-v2:free",
  "deepseek/deepseek-prover-v2",
  "meta-llama/llama-guard-4-12b",
  "qwen/qwen3-30b-a3b:free",
  "qwen/qwen3-30b-a3b",
  "qwen/qwen3-8b:free",
  "qwen/qwen3-8b",
  "qwen/qwen3-14b:free",
  "qwen/qwen3-14b",
  "qwen/qwen3-32b:free",
  "qwen/qwen3-32b",
  "qwen/qwen3-235b-a22b:free",
  "qwen/qwen3-235b-a22b",
  "tngtech/deepseek-r1t-chimera:free",
  "thudm/glm-z1-rumination-32b",
  "microsoft/mai-ds-r1:free",
  "thudm/glm-z1-32b:free",
  "thudm/glm-z1-32b",
  "thudm/glm-4-32b:free",
  "thudm/glm-4-32b",
  "google/gemini-2.5-flash-preview",
  "google/gemini-2.5-flash-preview:thinking",
  "openai/o4-mini-high",
  "openai/o3",
  "openai/o4-mini",
  "shisa-ai/shisa-v2-llama3.3-70b:free",
  "openai/gpt-4.1",
  "openai/gpt-4.1-mini",
  "openai/gpt-4.1-nano",
  "eleutherai/llemma_7b",
  "alfredpros/codellama-7b-instruct-solidity",
  "arliai/qwq-32b-arliai-rpr-v1:free",
  "agentica-org/deepcoder-14b-preview:free",
  "moonshotai/kimi-vl-a3b-thinking:free",
  "x-ai/grok-3-mini-beta",
  "x-ai/grok-3-beta",
  "nvidia/llama-3.3-nemotron-super-49b-v1:free",
  "nvidia/llama-3.3-nemotron-super-49b-v1",
  "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
  "nvidia/llama-3.1-nemotron-ultra-253b-v1",
  "meta-llama/llama-4-maverick:free",
  "meta-llama/llama-4-maverick",
  "meta-llama/llama-4-scout:free",
  "meta-llama/llama-4-scout",
  "all-hands/openhands-lm-32b-v0.1",
  "deepseek/deepseek-v3-base:free",
  "scb10x/llama3.1-typhoon2-70b-instruct",
  "google/gemini-2.5-pro-exp-03-25",
  "qwen/qwen2.5-vl-32b-instruct:free",
  "qwen/qwen2.5-vl-32b-instruct",
  "deepseek/deepseek-chat-v3-0324:free",
  "deepseek/deepseek-chat-v3-0324",
  "featherless/qwerky-72b:free",
  "openai/o1-pro",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "mistralai/mistral-small-3.1-24b-instruct",
  "open-r1/olympiccoder-32b:free",
  "google/gemma-3-1b-it:free",
  "google/gemma-3-4b-it:free",
  "google/gemma-3-4b-it",
  "ai21/jamba-1.6-large",
  "ai21/jamba-1.6-mini",
  "google/gemma-3-12b-it:free",
  "google/gemma-3-12b-it",
  "cohere/command-a",
  "openai/gpt-4o-mini-search-preview",
  "openai/gpt-4o-search-preview",
  "rekaai/reka-flash-3:free",
  "google/gemma-3-27b-it:free",
  "google/gemma-3-27b-it",
  "thedrummer/anubis-pro-105b-v1",
  "thedrummer/skyfall-36b-v2",
  "microsoft/phi-4-multimodal-instruct",
  "perplexity/sonar-reasoning-pro",
  "perplexity/sonar-pro",
  "perplexity/sonar-deep-research",
  "deepseek/deepseek-r1-zero:free",
  "qwen/qwq-32b:free",
  "qwen/qwq-32b",
  "nousresearch/deephermes-3-llama-3-8b-preview:free",
  "openai/gpt-4.5-preview",
  "google/gemini-2.0-flash-lite-001",
  "anthropic/claude-3.7-sonnet",
  "anthropic/claude-3.7-sonnet:beta",
  "anthropic/claude-3.7-sonnet:thinking",
  "perplexity/r1-1776",
  "mistralai/mistral-saba",
  "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
  "cognitivecomputations/dolphin3.0-mistral-24b:free",
  "meta-llama/llama-guard-3-8b",
  "openai/o3-mini-high",
  "deepseek/deepseek-r1-distill-llama-8b",
  "google/gemini-2.0-flash-001",
  "qwen/qwen-vl-plus",
  "aion-labs/aion-1.0",
  "aion-labs/aion-1.0-mini",
  "aion-labs/aion-rp-llama-3.1-8b",
  "qwen/qwen-vl-max",
  "qwen/qwen-turbo",
  "qwen/qwen2.5-vl-72b-instruct:free",
  "qwen/qwen2.5-vl-72b-instruct",
  "qwen/qwen-plus",
  "qwen/qwen-max",
  "openai/o3-mini",
  "deepseek/deepseek-r1-distill-qwen-1.5b",
  "mistralai/mistral-small-24b-instruct-2501:free",
  "mistralai/mistral-small-24b-instruct-2501",
  "deepseek/deepseek-r1-distill-qwen-32b:free",
  "deepseek/deepseek-r1-distill-qwen-32b",
  "deepseek/deepseek-r1-distill-qwen-14b:free",
  "deepseek/deepseek-r1-distill-qwen-14b",
  "perplexity/sonar-reasoning",
  "perplexity/sonar",
  "liquid/lfm-7b",
  "liquid/lfm-3b",
  "deepseek/deepseek-r1-distill-llama-70b:free",
  "deepseek/deepseek-r1-distill-llama-70b",
  "deepseek/deepseek-r1:free",
  "deepseek/deepseek-r1",
  "minimax/minimax-01",
  "mistralai/codestral-2501",
  "microsoft/phi-4",
  "deepseek/deepseek-chat:free",
  "deepseek/deepseek-chat",
  "sao10k/l3.3-euryale-70b",
  "openai/o1",
  "eva-unit-01/eva-llama-3.33-70b",
  "x-ai/grok-2-vision-1212",
  "x-ai/grok-2-1212",
  "cohere/command-r7b-12-2024",
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct",
  "amazon/nova-lite-v1",
  "amazon/nova-micro-v1",
  "amazon/nova-pro-v1",
  "qwen/qwq-32b-preview",
  "eva-unit-01/eva-qwen-2.5-72b",
  "openai/gpt-4o-2024-11-20",
  "mistralai/mistral-large-2411",
  "mistralai/mistral-large-2407",
  "mistralai/pixtral-large-2411",
  "x-ai/grok-vision-beta",
  "infermatic/mn-inferor-12b",
  "qwen/qwen-2.5-coder-32b-instruct:free",
  "qwen/qwen-2.5-coder-32b-instruct",
  "raifle/sorcererlm-8x22b",
  "eva-unit-01/eva-qwen-2.5-32b",
  "thedrummer/unslopnemo-12b",
  "anthropic/claude-3.5-haiku:beta",
  "anthropic/claude-3.5-haiku",
  "anthropic/claude-3.5-haiku-20241022:beta",
  "anthropic/claude-3.5-haiku-20241022",
  "neversleep/llama-3.1-lumimaid-70b",
  "anthracite-org/magnum-v4-72b",
  "anthropic/claude-3.5-sonnet:beta",
  "anthropic/claude-3.5-sonnet",
  "x-ai/grok-beta",
  "mistralai/ministral-8b",
  "mistralai/ministral-3b",
  "qwen/qwen-2.5-7b-instruct:free",
  "qwen/qwen-2.5-7b-instruct",
  "nvidia/llama-3.1-nemotron-70b-instruct",
  "inflection/inflection-3-productivity",
  "inflection/inflection-3-pi",
  "google/gemini-flash-1.5-8b",
  "thedrummer/rocinante-12b",
  "anthracite-org/magnum-v2-72b",
  "liquid/lfm-40b",
  "meta-llama/llama-3.2-3b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct",
  "meta-llama/llama-3.2-1b-instruct:free",
  "meta-llama/llama-3.2-1b-instruct",
  "meta-llama/llama-3.2-90b-vision-instruct",
  "meta-llama/llama-3.2-11b-vision-instruct:free",
  "meta-llama/llama-3.2-11b-vision-instruct",
  "qwen/qwen-2.5-72b-instruct:free",
  "qwen/qwen-2.5-72b-instruct",
  "neversleep/llama-3.1-lumimaid-8b",
  "openai/o1-preview",
  "openai/o1-preview-2024-09-12",
  "openai/o1-mini",
  "openai/o1-mini-2024-09-12",
  "mistralai/pixtral-12b",
  "cohere/command-r-plus-08-2024",
  "cohere/command-r-08-2024",
  "qwen/qwen-2.5-vl-7b-instruct:free",
  "qwen/qwen-2.5-vl-7b-instruct",
  "sao10k/l3.1-euryale-70b",
  "microsoft/phi-3.5-mini-128k-instruct",
  "nousresearch/hermes-3-llama-3.1-70b",
  "nousresearch/hermes-3-llama-3.1-405b",
  "openai/chatgpt-4o-latest",
  "sao10k/l3-lunaris-8b",
  "aetherwiing/mn-starcannon-12b",
  "openai/gpt-4o-2024-08-06",
  "meta-llama/llama-3.1-405b:free",
  "meta-llama/llama-3.1-405b",
  "nothingiisreal/mn-celeste-12b",
  "perplexity/llama-3.1-sonar-small-128k-online",
  "perplexity/llama-3.1-sonar-large-128k-online",
  "meta-llama/llama-3.1-8b-instruct:free",
  "meta-llama/llama-3.1-8b-instruct",
  "meta-llama/llama-3.1-405b-instruct",
  "meta-llama/llama-3.1-70b-instruct",
  "mistralai/mistral-nemo:free",
  "mistralai/mistral-nemo",
  "openai/gpt-4o-mini",
  "openai/gpt-4o-mini-2024-07-18",
  "google/gemma-2-27b-it",
  "alpindale/magnum-72b",
  "google/gemma-2-9b-it:free",
  "google/gemma-2-9b-it",
  "01-ai/yi-large",
  "anthropic/claude-3.5-sonnet-20240620:beta",
  "anthropic/claude-3.5-sonnet-20240620",
  "sao10k/l3-euryale-70b",
  "cognitivecomputations/dolphin-mixtral-8x22b",
  "qwen/qwen-2-72b-instruct",
  "mistralai/mistral-7b-instruct:free",
  "mistralai/mistral-7b-instruct",
  "nousresearch/hermes-2-pro-llama-3-8b",
  "mistralai/mistral-7b-instruct-v0.3",
  "microsoft/phi-3-mini-128k-instruct",
  "microsoft/phi-3-medium-128k-instruct",
  "neversleep/llama-3-lumimaid-70b",
  "google/gemini-flash-1.5",
  "openai/gpt-4o",
  "openai/gpt-4o:extended",
  "meta-llama/llama-guard-2-8b",
  "openai/gpt-4o-2024-05-13",
  "neversleep/llama-3-lumimaid-8b",
  "sao10k/fimbulvetr-11b-v2",
  "meta-llama/llama-3-8b-instruct",
  "meta-llama/llama-3-70b-instruct",
  "mistralai/mixtral-8x22b-instruct",
  "microsoft/wizardlm-2-8x22b",
  "google/gemini-pro-1.5",
  "openai/gpt-4-turbo",
  "cohere/command-r-plus",
  "cohere/command-r-plus-04-2024",
  "sophosympatheia/midnight-rose-70b",
  "cohere/command",
  "cohere/command-r",
  "anthropic/claude-3-haiku:beta",
  "anthropic/claude-3-haiku",
  "anthropic/claude-3-opus:beta",
  "anthropic/claude-3-opus",
  "anthropic/claude-3-sonnet:beta",
  "anthropic/claude-3-sonnet",
  "cohere/command-r-03-2024",
  "mistralai/mistral-large",
  "openai/gpt-3.5-turbo-0613",
  "openai/gpt-4-turbo-preview",
  "nousresearch/nous-hermes-2-mixtral-8x7b-dpo",
  "mistralai/mistral-medium",
  "mistralai/mistral-small",
  "mistralai/mistral-tiny",
  "mistralai/mistral-7b-instruct-v0.2",
  "mistralai/mixtral-8x7b-instruct",
  "neversleep/noromaid-20b",
  "anthropic/claude-2.1:beta",
  "anthropic/claude-2.1",
  "anthropic/claude-2:beta",
  "anthropic/claude-2",
  "undi95/toppy-m-7b",
  "alpindale/goliath-120b",
  "openrouter/auto",
  "openai/gpt-3.5-turbo-1106",
  "openai/gpt-4-1106-preview",
  "openai/gpt-3.5-turbo-instruct",
  "mistralai/mistral-7b-instruct-v0.1",
  "pygmalionai/mythalion-13b",
  "openai/gpt-3.5-turbo-16k",
  "mancer/weaver",
  "anthropic/claude-2.0:beta",
  "anthropic/claude-2.0",
  "undi95/remm-slerp-l2-13b",
  "gryphe/mythomax-l2-13b",
  "openai/gpt-3.5-turbo",
  "openai/gpt-3.5-turbo-0125",
  "openai/gpt-4",
  "openai/gpt-4-0314"
) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ModelId extends Schema.Union(Schema.String, KnownModelId) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class TextContent extends Schema.Class<TextContent>(makeIdentifier("TextContent"))({
  type: Schema.Literal("text"),
  text: Schema.String
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ImageContentPart extends Schema.Class<ImageContentPart>(makeIdentifier("ImageContentPart"))({
  type: Schema.Literal("image_url"),
  image_url: Schema.Struct({
    url: Schema.String,
    detail: Schema.optional(Schema.String)
  })
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ContentPart extends Schema.Union(TextContent, ImageContentPart) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class NonToolMessage extends Schema.Class<NonToolMessage>(makeIdentifier("NonToolMessage"))({
  role: Schema.Literal("user", "assistant", "system"),
  content: Schema.Union(Schema.String, Schema.Array(ContentPart)),
  name: Schema.optional(Schema.String)
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ToolMessage extends Schema.Class<ToolMessage>(makeIdentifier("ToolMessage"))({
  role: Schema.Literal("tool"),
  content: Schema.String,
  tool_call_id: Schema.String,
  name: Schema.optional(Schema.String)
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class Message extends Schema.Union(NonToolMessage, ToolMessage) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class FunctionDescription extends Schema.Class<FunctionDescription>(makeIdentifier("FunctionDescription"))({
  description: Schema.optional(Schema.String),
  name: Schema.String,
  parameters: Schema.Unknown
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class Tool extends Schema.Class<Tool>(makeIdentifier("Tool"))({
  type: Schema.Literal("function"),
  function: FunctionDescription
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ToolChoice extends Schema.Union(
  Schema.Literal("none", "auto"),
  Schema.Struct({
    type: Schema.Literal("function"),
    function: Schema.Struct({
      name: Schema.String.pipe(
        Schema.minLength(1),
        Schema.maxLength(64),
        Schema.pattern(/^[a-zA-Z0-9_-]+$/)
      )
    })
  })
) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ResponseFormat extends Schema.Union(
  Schema.Struct({
    type: Schema.Literal("json_object")
  }),
  Schema.Struct({
    type: Schema.Literal("json_schema"),
    json_schema: Schema.Unknown
  })
) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class StopReason extends Schema.Literal("tool_calls", "stop", "length", "content_filter", "error") {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class Stop extends Schema.Union(StopReason, Schema.Array(StopReason)) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
class Plugin extends Schema.Class<Plugin>("Plugin")({
  // TODO: index signature specificity? How does one achieve this with Effect Schema?
  id: Schema.String
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ChatRequest extends Schema.Class<Request>(makeIdentifier("ChatRequest"))({
  messages: Schema.optional(Schema.Array(Message)),
  prompt: Schema.optional(Schema.String),

  model: Schema.optional(ModelId),

  response_format: Schema.optional(ResponseFormat),

  stop: Schema.optional(Stop),
  stream: Schema.optional(Schema.Boolean),

  max_tokens: Schema.optional(Schema.Int),
  temperature: Schema.optional(Schema.Number.pipe(Schema.between(0, 2))),

  tools: Schema.optional(Schema.Array(Tool)),
  tool_choice: Schema.optional(ToolChoice),

  seed: Schema.optional(Schema.Int),
  top_p: Schema.optional(Schema.Number.pipe(Schema.between(0, 1))),
  top_k: Schema.optional(Schema.Int.pipe(Schema.between(1, Infinity))),
  frequency_penalty: Schema.optional(Schema.Number.pipe(Schema.between(-2, 2))),
  presence_penalty: Schema.optional(Schema.Number.pipe(Schema.between(-2, 2))),
  repetition_penalty: Schema.optional(Schema.Number.pipe(Schema.between(0, 2))),
  logit_bias: Schema.optional(Schema.Record({
    key: Schema.String,
    value: Schema.Number
  })),
  top_logprobs: Schema.optional(Schema.Int),
  min_p: Schema.optional(Schema.Number.pipe(Schema.between(0, 1))),
  top_a: Schema.optional(Schema.Number.pipe(Schema.between(0, 1))),

  prediction: Schema.optional(Schema.Struct({
    type: Schema.Literal("content"),
    content: Schema.String
  })),

  transforms: Schema.optional(Schema.Array(Schema.String)),
  models: Schema.optional(Schema.Array(ModelId)),
  provider: Schema.optional(Schema.Struct({
    sort: Schema.String // TODO: are there a fixed set of string literals for sort preference?
  })),
  reasoning: Schema.optional(Schema.Struct({
    effort: Schema.optional(Schema.Literal("high", "medium", "low")),
    max_tokens: Schema.optional(Schema.Int),
    exclude: Schema.optional(Schema.Boolean)
  })),
  usage: Schema.optional(Schema.Struct({
    include: Schema.optional(Schema.Boolean)
  })),

  user: Schema.optional(Schema.String),
  plugins: Schema.optional(Schema.Array(Plugin))
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ErrorResponse extends Schema.Class<ErrorResponse>(makeIdentifier("ErrorResponse"))({
  code: Schema.Int,
  message: Schema.String,
  metadata: Schema.Record({
    key: Schema.String,
    value: Schema.Unknown
  })
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ResponseUsage extends Schema.Class<ResponseUsage>(makeIdentifier("ResponseUsage"))({
  prompt_tokens: Schema.Number,
  completion_tokens: Schema.Number,
  total_tokens: Schema.Number
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class FunctionCall extends Schema.Class<FunctionCall>(makeIdentifier("FunctionCall"))({
  // TODO: other properties?
  name: Schema.String,
  arguments: Schema.Record({
    key: Schema.String,
    value: Schema.Unknown
  })
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ToolCall extends Schema.Class<ToolCall>(makeIdentifier("ToolCall"))({
  id: Schema.String,
  type: Schema.Literal("function"),
  function: FunctionCall
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class NonStreamingChoice extends Schema.Class<NonStreamingChoice>(makeIdentifier("NonStreamingChoice"))({
  finish_reason: Schema.Union(Stop, Schema.Null),
  native_finish_reason: Schema.Union(Schema.String, Schema.Null),
  message: Schema.Struct({
    content: Schema.Union(Schema.String, Schema.Null),
    role: Schema.String,
    tool_calls: Schema.optional(Schema.Array(ToolCall))
  }),
  error: Schema.optional(ErrorResponse)
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class StreamingChoice extends Schema.Class<StreamingChoice>(makeIdentifier("StreamingChoice"))({
  finish_reason: Schema.Union(Stop, Schema.Null),
  native_finish_reason: Schema.Union(Schema.String, Schema.Null),
  delta: Schema.Struct({
    content: Schema.Union(Schema.String, Schema.Null),
    role: Schema.optional(Schema.String),
    tool_calls: Schema.optional(Schema.Array(ToolCall))
  }),
  error: Schema.optional(ErrorResponse)
}) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class NonChatChoice extends Schema.Class<NonChatChoice>(makeIdentifier("NonChatChoice"))({
  finish_reason: Schema.Union(Stop, Schema.Null),
  text: Schema.String,
  error: Schema.optional(ErrorResponse)
}) {}

export class Choice extends Schema.Union(NonStreamingChoice, StreamingChoice, NonChatChoice) {}

/**
 * @since 1.0.0
 * @category Schemas
 */
export class ChatResponse extends Schema.Class<Request>(makeIdentifier("ChatResponse"))({
  id: Schema.String,
  choices: Schema.Array(Choice),
  created: Schema.Int,
  model: ModelId,
  object: Schema.Literal("chat.completion", "chat.completion.chunk"),
  system_fingerprint: Schema.optional(Schema.String),
  usage: Schema.optional(ResponseUsage)
}) {}
