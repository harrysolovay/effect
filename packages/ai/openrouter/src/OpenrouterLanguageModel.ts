/**
 * @since 1.0.0
 */
import { AiError } from "@effect/ai/AiError"
import type * as AiInput from "@effect/ai/AiInput"
import * as AiLanguageModel from "@effect/ai/AiLanguageModel"
import * as AiModel from "@effect/ai/AiModel"
import * as AiResponse from "@effect/ai/AiResponse"
import { addGenAIAnnotations } from "@effect/ai/AiTelemetry"
import { Array, Schema } from "effect"
import * as Arr from "effect/Array"
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Encoding from "effect/Encoding"
import { absurd, dual, identity } from "effect/Function"
import * as Layer from "effect/Layer"
import * as Option from "effect/Option"
import * as Predicate from "effect/Predicate"
import * as Stream from "effect/Stream"
import type { Span } from "effect/Tracer"
import type { Mutable, Simplify } from "effect/Types"
import * as InternalUtilities from "./internal/utilities.js"
import { OpenrouterClient } from "./OpenrouterClient.js"
import {
  type ChatRequest,
  type ChatResponse,
  type ContentPart,
  type KnownModelId,
  type Message,
  type ModelId,
  NonStreamingChoice,
  type StopReason,
  type ToolChoice
} from "./OpenrouterSchema.js"

const constDisableValidation = { disableValidation: true }

/**
 * @since 1.0.0
 * @category Models
 */
export type Model = typeof KnownModelId.Encoded

// =============================================================================
// Configuration
// =============================================================================

/**
 * @since 1.0.0
 * @category Context
 */
export class Config extends Context.Tag(
  "@effect/ai-openrouter/OpenrouterLanguageModel/Config"
)<Config, Config.Service>() {
  /**
   * @since 1.0.0
   */
  static readonly getOrUndefined: Effect.Effect<typeof Config.Service | undefined> = Effect.map(
    Effect.context<never>(),
    (context) => context.unsafeMap.get(Config.key)
  )
}

/**
 * @since 1.0.0
 */
export declare namespace Config {
  /**
   * @since 1.0.0
   * @category Configuration
   */
  export interface Service {
    // TODO
    modelId: typeof ModelId.Encoded
  }
}

// =============================================================================
// Open Router Provider Metadata
// =============================================================================

/**
 * @since 1.0.0
 * @category Context
 */
export class ProviderMetadata extends Context.Tag(InternalUtilities.ProviderMetadataKey)<
  ProviderMetadata,
  ProviderMetadata.Service
>() {}

/**
 * @since 1.0.0
 */
export declare namespace ProviderMetadata {
  /**
   * @since 1.0.0
   * @category Provider Metadata
   */
  export interface Service {} // TODO
}

// =============================================================================
// Open Router Language Model
// =============================================================================

/**
 * @since 1.0.0
 * @category AiModels
 */
export const model = (
  model: (string & {}) | Model,
  config?: Omit<Config.Service, "model">
): AiModel.AiModel<AiLanguageModel.AiLanguageModel, OpenrouterClient> => AiModel.make(layer({ model, config }))

/**
 * @since 1.0.0
 * @category Constructors
 */
export const make = Effect.fnUntraced(function*(options: {
  readonly model: (string & {}) | Model
  readonly config?: Omit<Config.Service, "model">
}) {
  const client = yield* OpenrouterClient

  const makeRequest = Effect.fnUntraced(
    function*(method: string, { prompt, system /* toolChoice, tools */ }: AiLanguageModel.AiLanguageModelOptions) {
      // const context = yield* Effect.context<never>()
      // const useStructured = tools.length === 1 && tools[0].structured
      // let tool_choice: typeof ToolChoice.Encoded = { auto: {} }
      // if (useStructured) {
      //   tool_choice = { tool: { name: tools[0].name } }
      // } else if (tools.length > 0) {
      //   if (toolChoice === "required") {
      //     tool_choice = { any: {} }
      //   } else if (typeof toolChoice === "object") {
      //     tool_choice = { tool: { name: toolChoice.tool } }
      //   }
      // }

      const messages = yield* makeMessages(method, Option.getOrUndefined(system), prompt)

      return identity<typeof ChatRequest.Encoded>({
        model: options.model,
        // ...options.config,
        // ...context.unsafeMap.get(Config.key),
        messages
        // toolConfig: tools.length === 0 ? undefined : {
        //   toolChoice: tool_choice,
        //   tools: tools.map((tool) => ({
        //     toolSpec: {
        //       name: tool.name,
        //       description: tool.description,
        //       inputSchema: { json: tool.parameters }
        //     }
        //   }))
        // }
      })
    }
  )

  return yield* AiLanguageModel.make({
    generateText: Effect.fnUntraced(
      function*(_options) {
        const request = yield* makeRequest("generateText", _options)
        annotateRequest(_options.span, request)
        const rawResponse = yield* client.client.converse(request)
        const context = yield* Effect.context<never>()
        const model = Option.match(Context.getOption(context, Config), {
          onNone: () => options.model,
          onSome: ({ modelId }) => modelId ?? options.model
        })
        annotateChatResponse(_options.span, model, rawResponse)
        const response = yield* makeResponse(rawResponse, model)
        return response
      },
      Effect.catchAll((cause) =>
        AiError.is(cause) ? cause : new AiError({
          module: "OpenrouterLanguageModel",
          method: "generateText",
          description: "An error occurred",
          cause
        })
      )
    ),
    streamText(_options) {
      return makeRequest("streamText", _options).pipe(
        Effect.tap((request) => annotateRequest(_options.span, request)),
        Effect.map(client.stream),
        Stream.unwrap,
        Stream.map((response) => {
          annotateStreamResponse(_options.span, response)
          return response
        }),
        Stream.catchAll((cause) =>
          AiError.is(cause) ? Effect.fail(cause) : Effect.fail(
            new AiError({
              module: "OpenrouterLanguageModel",
              method: "streamText",
              description: "An error occurred",
              cause
            })
          )
        )
      )
    }
  })
})

/**
 * @since 1.0.0
 * @category Layers
 */
export const layer = (options: {
  readonly model: (string & {}) | Model
  readonly config?: Omit<Config.Service, "model">
}): Layer.Layer<AiLanguageModel.AiLanguageModel, never, OpenrouterClient> =>
  Layer.effect(AiLanguageModel.AiLanguageModel, make({ model: options.model, config: options.config }))

// /**
//  * @since 1.0.0
//  * @category Layers
//  */
// export const layerWithTokenizer = (options: {
//   readonly model: (string & {}) | Model
//   readonly config?: Omit<Config.Service, "model">
// }): Layer.Layer<AiLanguageModel.AiLanguageModel | Tokenizer.Tokenizer, never, AnthropicClient> =>
//   Layer.merge(layer(options), AnthropicTokenizer.layer)

/**
 * @since 1.0.0
 * @category Configuration
 */
export const withConfigOverride: {
  (config: Config.Service): <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>
  <A, E, R>(self: Effect.Effect<A, E, R>, config: Config.Service): Effect.Effect<A, E, R>
} = dual<
  (config: Config.Service) => <A, E, R>(self: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>,
  <A, E, R>(self: Effect.Effect<A, E, R>, config: Config.Service) => Effect.Effect<A, E, R>
>(2, (self, overrides) =>
  Effect.flatMap(
    Config.getOrUndefined,
    (config) => Effect.provideService(self, Config, { ...config, ...overrides })
  ))

// =============================================================================
// Utilities
// =============================================================================

type MessageGroup = AssistantMessageGroup | UserMessageGroup

interface AssistantMessageGroup {
  readonly type: "assistant"
  readonly messages: Array<AiInput.AssistantMessage>
}

interface UserMessageGroup {
  readonly type: "user"
  readonly messages: Array<AiInput.ToolMessage | AiInput.UserMessage>
}

const groupMessages = (prompt: AiInput.AiInput): Array<MessageGroup> => {
  const messages: Array<MessageGroup> = []
  let current: MessageGroup | undefined = undefined
  for (const message of prompt.messages) {
    switch (message._tag) {
      case "AssistantMessage": {
        if (current?.type !== "assistant") {
          current = { type: "assistant", messages: [] }
          messages.push(current)
        }
        current.messages.push(message)
        break
      }
      case "ToolMessage":
      case "UserMessage": {
        if (current?.type !== "user") {
          current = { type: "user", messages: [] }
          messages.push(current)
        }
        current.messages.push(message)
        break
      }
    }
  }
  return messages
}

// const fileCounter = 0

const makeMessages = Effect.fnUntraced(
  function*(
    method: string,
    system: string | undefined,
    prompt: AiInput.AiInput
  ) {
    const messages: Array<typeof Message.Encoded> = []
    if (system) {
      messages.push({
        role: "system",
        content: system
      })
    }
    const groups = groupMessages(prompt)
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]
      switch (group.type) {
        case "assistant": {
          const content: Array<typeof ContentPart.Encoded> = []
          messages.push({ role: "assistant", content })
          break
        }
        case "user": {
          const content: Array<typeof ContentPart.Encoded> = []
          for (let j = 0; j < group.messages.length; j++) {
            const message = group.messages[j]
            switch (message._tag) {
              case "ToolMessage": {
                // TODO:
                // for (let k = 0; k < message.parts.length; k++) {
                // const part = message.parts[k]
                // TODO: support advanced tool result content parts
                // content.push({
                //   toolResult: {
                //     toolUseId: part.id,
                //     content: [{ text: JSON.stringify(part.result) }]
                //   }
                // })
                // }
                break
              }
              case "UserMessage": {
                for (let k = 0; k < message.parts.length; k++) {
                  const part = message.parts[k]
                  switch (part._tag) {
                    case "FilePart": {
                      return yield* new AiError({
                        module: "OpenrouterLanguageModel",
                        method,
                        description: "FilePart is not supported at this time"
                      })
                      break
                    }
                    case "FileUrlPart": {
                      // TODO: maybe auto-download images from URL
                      return yield* new AiError({
                        module: "OpenrouterLanguageModel",
                        method,
                        description: "File URLs are not supported at this time"
                      })
                    }
                    case "ImagePart": {
                      return yield* new AiError({
                        module: "OpenrouterLanguageModel",
                        method,
                        description: "Image parts are not supported at this time"
                      })
                      // content.push({
                      //   image: {
                      //     format: part.mediaType.split("/")?.[1] as ImageFormat,
                      //     source: {
                      //       bytes: Encoding.encodeBase64(part.data)
                      //     }
                      //   }
                      // })
                      break
                    }
                    case "ImageUrlPart": {
                      // TODO: maybe auto-download images from URL
                      return yield* new AiError({
                        module: "OpenrouterLanguageModel",
                        method,
                        description: "Image URLs are not supported at this time"
                      })
                    }
                    case "TextPart": {
                      content.push({
                        type: "text",
                        text: part.text
                      })
                      break
                    }
                  }
                }
                break
              }
            }
          }
          messages.push({ role: "user", content })
          break
        }
      }
    }
    if (Arr.isNonEmptyReadonlyArray(messages)) {
      return messages
    }
    return yield* new AiError({
      module: "OpenrouterLanguageModel",
      method,
      description: "Prompt contained no messages"
    })
  }
)

const makeResponse = Effect.fnUntraced(
  function*(response: ChatResponse, modelId: string) {
    const parts: Array<AiResponse.Part> = []
    parts.push(
      new AiResponse.MetadataPart({
        model: modelId
      }, constDisableValidation)
    )
    const [choice] = response.choices
    if (!Schema.is(NonStreamingChoice)(choice)) {
      return yield* new AiError({
        module: "OpenrouterLanguageModel",
        method: "TODO",
        description: "Response contained no choices"
      })
    }
    const initialFinishReason = (() => {
      const initialFinishReason = choice.finish_reason
      if (typeof initialFinishReason === "string") {
        return initialFinishReason
      } else if (Array.isArray(initialFinishReason)) {
        return initialFinishReason[0] as typeof StopReason.Encoded
      }
      return "stop"
    })()

    const finishReason = InternalUtilities.resolveFinishReason(initialFinishReason)
    const metadata: Mutable<ProviderMetadata.Service> = {
      // metrics: response.metrics
    }
    // if (Predicate.isNotUndefined(response.trace)) {
    //   metadata.trace = response.trace
    // }
    // if (Predicate.isNotUndefined(response.performanceConfig)) {
    //   metadata.performanceConfig = response.performanceConfig
    // }

    parts.push(
      new AiResponse.FinishPart({
        reason: finishReason,
        usage: {
          // TODO: under what conditions does OpenRouter not return these values?
          inputTokens: response.usage!.prompt_tokens,
          outputTokens: response.usage!.completion_tokens,
          totalTokens: response.usage!.total_tokens,
          reasoningTokens: 0, // TODO
          cacheReadInputTokens: 0, // TODO
          cacheWriteInputTokens: 0 // TODO
        },
        providerMetadata: { [InternalUtilities.ProviderMetadataKey]: metadata }
      }, constDisableValidation)
    )
    if (choice.message.tool_calls) {
      // TODO
      throw 0
    }
    if (choice.message.content) {
      parts.push(
        new AiResponse.TextPart({
          text: choice.message.content
        }, constDisableValidation)
      )
    }
    return new AiResponse.AiResponse({
      parts
    }, constDisableValidation)
  }
)

const annotateRequest = (
  span: Span,
  request: typeof ChatRequest.Encoded
): void => {
  addGenAIAnnotations(span, {
    system: "anthropic",
    operation: { name: "chat" },
    request: {
      model: request.model
      // TODO:
      // temperature: request.inferenceConfig?.temperature,
      // topP: request.inferenceConfig?.topP,
      // maxTokens: request.inferenceConfig?.maxTokens,
      // stopSequences: request.inferenceConfig?.stopSequences ?? []
    }
  })
}

const annotateChatResponse = (
  span: Span,
  modelId: string,
  response: ConverseResponse
): void => {
  addGenAIAnnotations(span, {
    response: {
      model: modelId,
      finishReasons: response.stopReason ? [response.stopReason] : undefined
    },
    usage: {
      inputTokens: response.usage.inputTokens,
      outputTokens: response.usage.outputTokens
    }
  })
}

const annotateStreamResponse = (
  span: Span,
  response: AiResponse.AiResponse
) => {
  const metadataPart = response.parts.find((part) => part._tag === "MetadataPart")
  const finishPart = response.parts.find((part) => part._tag === "FinishPart")
  addGenAIAnnotations(span, {
    response: {
      id: metadataPart?.id,
      model: metadataPart?.model,
      finishReasons: finishPart?.reason ? [finishPart.reason] : undefined
    },
    usage: {
      inputTokens: finishPart?.usage.inputTokens,
      outputTokens: finishPart?.usage.outputTokens
    }
  })
}
