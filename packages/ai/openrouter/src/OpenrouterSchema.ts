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
 * TODO
 * ```
 *
 * @since 1.0.0
 * @category Schemas
 */
export class KnownModelId extends Schema.Literal("amazon.titan-tg1-large") {}

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
export class Stop extends Schema.Union(Schema.String, Schema.Array(Schema.String)) {}

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
export class FinishReason extends Schema.Literal("tool_calls", "stop", "length", "content_filter", "error") {}

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
  finish_reason: Schema.Union(Schema.String, Schema.Null),
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
  finish_reason: Schema.Union(Schema.String, Schema.Null),
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
  finish_reason: Schema.Union(Schema.String, Schema.Null),
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
