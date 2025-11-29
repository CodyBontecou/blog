---
title: Hosting Open Source AI Models with Hugging Face
draft: false
topics:
  - ai
  - open-source
  - huggingface
created_at: 2025-04-13T10:19
last_modified: 2025-04-13T11:10
---

Open-source AI is an exciting space.
There is a lot of research and innovation is taking place here.

These models can be ran locally and privately.
Sometimes we need a bit more hardware to accelerate the task we are working on.

I've found Hugging Face's [Inference Endpoints](https://huggingface.co/inference-endpoints/dedicated) to be the best solution to deploy models to the web and interacting with them via an HTTP endpoint.

Hugging Face provides:

- Clear pricing ($/hr)
- One-click deployments
- Development SDK's
- Well-documented

Make sure you have a Hugging Face account and added a valid payment method before continuing.
You can check [billing](https://huggingface.co/settings/billing) to ensure you have an active payment method.

Hugging Face provides a [Model Catalog](https://endpoints.huggingface.co/catalog) to chose from a selection of popular models.
We'll be deploying Facebook's [seamless-m4t-v2-large](https://huggingface.co/facebook/seamless-m4t-v2-large?inference_provider=hf-inference) model, a slightly more niche model which is not shown within the Model Catalog.

![hugging face model catalog](https://cln.sh/76HXDqnd+)

Click the "Deploy from Hugging Face" button.
This opens a modal, allowing us to search through Hugging Face's [Model Hub](https://huggingface.co/models).

> At the time of writing this, the Model Hub contains 1,598,698 models!

Search for seamless-m4t-v2-large.
Click "Import model".

![Hugging Face Hub search input](https://cln.sh/TQBtQkhs+)

This navigates us to a configuration page where we can selection CPU/GPU, region, security level, Autoscaling options, and more.

Our goal with seamless-m4t-v2-large is text-to-text translation.
Click the "More options" dropdown and change the Task of the model to Translation.

![model task adjusted to Translation](https://cln.sh/vChF6xBd+)

Configure the endpoint to use the hardware and region needed and click "Create Endpoint".
It will take a few minutes for the model to be deployed.

It's ready to used once the green "Running" tag is showing:

![running endpoint](https://cln.sh/64S0kKV3+)

> Some models require custom deployment solutions. If you see "Error" instead of "Running", check the Logs tab.

The Playground's API tab has examples you can plug in to quickly interact with your endpoint:

![Playground example](https://cln.sh/pW6fHrBs+)

Replace `Bearer hf_XXXXX` with your [Access Token](https://huggingface.co/settings/tokens/new?tokenType=fineGrained) and enjoy!

The model will autoscale to 0, stopping resource usage and cost, after 15 minutes when using the default settings.

Clicking "Pause" will immediately scale to 0 as well.

[Billing](https://huggingface.co/settings/billing) shows Inference and Compute Usage.
