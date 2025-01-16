---
type: post
author:
  name: Cody Bontecou
  image: /assets/img/cody.64b57256.jpg
date: 2023-08-13
last_modified_date: 2023-08-13
title: Mocking HTTP Responses in Elixir and Phoenix
description: A quick walkthrough of the configuration needed to support mocks and modules only used within your Elixir tests
slug: mocking-http-responses-in-elixir-and-phoenix
dropdown: Elixir
meta:
  - name: og:description
    content: A quick walkthrough of the configuration needed to support mocks and modules only used within your Elixir tests
  - name: og:image
    content: https://codybontecou.com/images/mocking-http-responses-in-elixir-and-phoenix.png
  - name: og:image:alt
    content: A quick walkthrough of the configuration needed to support mocks and modules only used within your Elixir tests
  - name: og:title
    content: Mocking HTTP Responses in Elixir and Phoenix
  - name: twitter:title
    content: Mocking HTTP Responses in Elixir and Phoenix
  - name: twitter:text:title
    content: Mocking HTTP Responses in Elixir and Phoenix
canonicalUrl: https://codybontecou.com/mocking-http-responses-in-elixir-and-phoenix.html
topics:
  - elixir
  - testing
  - mocking
created_at: 2024-10-31T14:26
last_modified: 2025-01-15T17:38
---
I just came across this error while attempting to mock the response of a 3rd party api:

`** (UndefinedFunctionError) function LeagueInfoMocks.get_live/0 is undefined (module LeagueInfoMocks is not available)`

## The Problem

I couldn't wrap my head around it. I have this simple mock module defined:

```elixir
defmodule LeagueInfoMocks do
  def get_live do
    %{...}
  end
end

```

And a test module to interact with the get_live function:

```elixir
defmodule LeagueInfoTest do
  use ExUnit.Case
  test "format_info" do
    data = LeagueInfoMocks.get_live()

    [match | _tail] = data

    assert LeagueInfo.format_info(data) == %{...}
  end
end

```

But running `mix test` would consistently give me the `** (UndefinedFunctionError) function LeagueInfoMocks.get_live/0 is undefined (module LeagueInfoMocks is not available)`.

## The Solution

Most articles and threads mentioned moving the `LeagueInfoMocks` module in the `test/support/*` directory, so I did. This didn't change the error message.

I eventually found [this](https://stackoverflow.com/a/73967553/6642089) Stackoverflow comment that mentioned some configuration needed in the `mix.exs` file.

Supposedly, `mix phx.new` adds the `test/support/*` support when a Phoenix project is created. In my case, I'm building off of a simple Elixir application. This required me to configure my `mix.exs` file to look like so:

```elixir
defmodule LolesportsConsumer.MixProject do
  use Mix.Project

  def project do
    [
      app: :lolesports_consumer,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      elixirc_paths: elixirc_paths(Mix.env())
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:httpoison, "~> 2.1"},
      {:jason, "~> 1.4"}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]
end

```

The key differences were:
1. Adding `elixirc_paths: elixirc_paths(Mix.env())` to `project`
2. Adding these two lines to the file:
   - `defp elixirc_paths(:test), do: ["lib", "test/support"]`
   - `defp elixirc_paths(_), do: ["lib"]`


## Conclusion

With these configuration changes, I am able to properly call `LeagueInfoMocks.get_live()` and write tests against an expected HTTP response.
