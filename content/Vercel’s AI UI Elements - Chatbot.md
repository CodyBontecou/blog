---
title: Vercel AI UI Elements - Chatbot
draft: false
ignore: false
topics:
  - ai
created_at: 2025-11-17T01:19
last_modified: 2025-11-17T04:34
---

In this article, we'll be exploring Vercel's latest UI library - [AI Elements](https://vercel.com/changelog/introducing-ai-elements) - a component library and custom registry built on top of [shadcn/ui](https://ui.shadcn.com/) to help you build AI-native applications faster.

By the end of this tutorial, you'll have a beautifully styled chat interface to chose from and interact with many AI models.

![Beautifully designed chat interface with an LLM](https://cln.sh/HRlztHYF+)
## Prerequisites

Before using AI Elements, ensure your project meets these requirements:

- **Node.js** 18 or later
- **Next.js** project with [AI SDK](https://ai-sdk.dev/) installed
- **shadcn/ui** initialized in your project (`npx shadcn@latest init`)
- **Tailwind CSS** configured (AI Elements supports CSS Variables mode only)

## Installation

First, set up a new Next.js repo and `cd` into it by running the following command:

```
npx create-next-app@latest ai-chatbot && cd ai-chatbot
```

Then, run this command to install AI Elements alongside shadcn/ui if it's not already installed:

```
npx ai-elements@latest
```

And for the ai-related integration:

```
npm i ai @ai-sdk/react zod
```

> Vercel's `ai` SDK is not a requirement to use AI Elements, but they work seamlessly with one another and it's highly recommended.

## UI Integration

In your `app/page.tsx`, replace the code with the snippet below:

```tsx
// app/page.tsx
'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { Fragment, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { CopyIcon, GlobeIcon, RefreshCcwIcon } from 'lucide-react';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';
const models = [
  {
    name: 'GPT 4o',
    value: 'openai/gpt-4o',
  },
  {
    name: 'Deepseek R1',
    value: 'deepseek/deepseek-r1',
  },
];
const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status, regenerate } = useChat();
  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);
    if (!(hasText || hasAttachments)) {
      return;
    }
    sendMessage(
      { 
        text: message.text || 'Sent with attachments',
        files: message.files 
      },
      {
        body: {
          model: model,
          webSearch: webSearch,
        },
      },
    );
    setInput('');
  };
  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'assistant' && message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                  <Sources>
                    <SourcesTrigger
                      count={
                        message.parts.filter(
                          (part) => part.type === 'source-url',
                        ).length
                      }
                    />
                    {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                      <SourcesContent key={`${message.id}-${i}`}>
                        <Source
                          key={`${message.id}-${i}`}
                          href={part.url}
                          title={part.url}
                        />
                      </SourcesContent>
                    ))}
                  </Sources>
                )}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <Message key={`${message.id}-${i}`} from={message.role}>
                          <MessageContent>
                            <MessageResponse>
                              {part.text}
                            </MessageResponse>
                          </MessageContent>
                          {message.role === 'assistant' && i === messages.length - 1 && (
                            <MessageActions>
                              <MessageAction
                                onClick={() => regenerate()}
                                label="Retry"
                              >
                                <RefreshCcwIcon className="size-3" />
                              </MessageAction>
                              <MessageAction
                                onClick={() =>
                                  navigator.clipboard.writeText(part.text)
                                }
                                label="Copy"
                              >
                                <CopyIcon className="size-3" />
                              </MessageAction>
                            </MessageActions>
                          )}
                        </Message>
                      );
                    case 'reasoning':
                      return (
                        <Reasoning
                          key={`${message.id}-${i}`}
                          className="w-full"
                          isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
          <PromptInputHeader>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              <PromptInputButton
                variant={webSearch ? 'default' : 'ghost'}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
              <PromptInputSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputSelectTrigger>
                  <PromptInputSelectValue />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  {models.map((model) => (
                    <PromptInputSelectItem key={model.value} value={model.value}>
                      {model.name}
                    </PromptInputSelectItem>
                  ))}
                </PromptInputSelectContent>
              </PromptInputSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input && !status} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBotDemo;
```


The primary components we are bringing in are:
- [Conversation](https://ai-sdk.dev/elements/components/conversation)
- [Message](https://ai-sdk.dev/elements/components/message)
- [Prompt Input](https://ai-sdk.dev/elements/components/prompt-input)
- [Sources](https://ai-sdk.dev/elements/components/sources)
- [Reasoning](https://ai-sdk.dev/elements/components/reasoning)

With this snippet in place, run your dev server. It should look like this:

![Blank chat interface with no response from AI](https://cln.sh/HqWTKTc5+)

You can now input text into the text area, rendering your message.
But, you will not get a response from the LLM.

## AI SDK

Create a new route handler at `app/api/chat/route.ts` to accept our user input and send it to the AI model.

```tsx
// app/api/chat/route.ts

import { streamText, UIMessage, convertToModelMessages } from 'ai';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
  }: { 
    messages: UIMessage[]; 
    model: string; 
    webSearch: boolean;
  } = await req.json();
  const result = streamText({
    model: webSearch ? 'perplexity/sonar' : model,
    messages: convertToModelMessages(messages),
    system:
      'You are a helpful assistant that can answer questions and help with tasks',
  });
  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}

```

## AI Gateway

Vercel's [AI Gateway](https://vercel.com/ai-gateway) service provides access to hundreds of AI models.
The `streamText` function from the [AI SDK](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text) just expects a `model` parameter from a supported model.

> Give their [Model Catalog](https://vercel.com/ai-gateway/models) a look. It makes navigating the models nice, quickly showing price per million tokens, providers, and more.

We will be using this service to hook our chat's UI to Vercel's AI SDK, completing the end-to-end pipeline.

1. Navigate to https://vercel.com/ai-gateway and create an api key.
2. Create a `.env` file in your project's root directory
3. Paste the key in. It should look similar to:

```
AI_GATEWAY_API_KEY=vck_...
```

Refresh your dev server and now it should work!

## Conclusion

This is just the tip of the iceberg with AI Elements. Be sure to read their [Github Repo](https://github.com/vercel/ai-elements/blob/main/README.md) and explore their docs further.

We tapped into ~5 of their components. But as of November 17, 2025, this is a list of the components they provide:

| Component          | Description                                             |
| ------------------ | ------------------------------------------------------- |
| **Chatbot**        |                                                         |
| `actions`          | Interactive action buttons for AI responses             |
| `branch`           | Branch visualization for conversation flows             |
| `chain-of-thought` | Display AI reasoning and thought processes              |
| `code-block`       | Syntax-highlighted code display with copy functionality |
| `context`          | Display Context consumption                             |
| `conversation`     | Container for chat conversations                        |
| `image`            | AI-generated image display component                    |
| `inline-citation`  | Inline source citations                                 |
| `loader`           | Loading states for AI operations                        |
| `message`          | Individual chat messages with avatars                   |
| `open-in-chat`     | Open in chat button for a message                       |
| `plan`             | Plan and task planning display component                |
| `prompt-input`     | Advanced input component with model selection           |
| `queue`            | Message and todo queue with attachments                 |
| `reasoning`        | Display AI reasoning and thought processes              |
| `response`         | Formatted AI response display                           |
| `shimmer`          | Text shimmer animation effect                           |
| `sources`          | Source attribution component                            |
| `suggestion`       | Quick action suggestions                                |
| `task`             | Task completion tracking                                |
| `tool`             | Tool usage visualization                                |
| `confirmation`     | Tool execution approval workflows                       |
| **Vibe-Coding**    |                                                         |
| `artifact`         | Display a code or document                              |
| `web-preview`      | Embedded web page previews                              |
| **Workflow**       |                                                         |
| `canvas`           | ReactFlow canvas for workflow visualizations            |
| `connection`       | Connection line component for workflow edges            |
| `controls`         | Flow controls for canvas (zoom, fit view, etc.)         |
| `edge`             | Edge component for connections between workflow nodes   |
| `node`             | Node component for workflow graphs                      |
| `panel`            | Panel component for canvas overlays                     |
| `toolbar`          | Node toolbar for workflow elements                      |
