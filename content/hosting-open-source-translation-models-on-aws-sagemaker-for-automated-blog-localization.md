---
title: Hosting Open-Source Translation Models on AWS SageMaker for Automated Blog Localization
slug: hosting-open-source-translation-models-on-aws-sagemaker-for-automated-blog-localization
draft: false
ignore: false
lang: eng
translate: true
translated_to: 
topics:
  - aws
  - sagemaker
  - ai
  - localization
  - i18n
  - huggingface
date: 2025-01-14T17:43
created_at: 2025-01-14T17:43
last_modified: 2025-01-20T08:20
---

## Introduction

Creating multilingual content is often tedious and expensive. Let’s automate it into our blog's build process!

In this post, we’ll take a deep dive into deploying an open-source text-to-text translation (T2TT) model on AWS SageMaker and seamlessly integrating it into a Nuxt Content blog. Better yet, we’ll automate the workflow through a CI pipeline powered by GitHub Actions.

Using these modern tools, we'll be able to fully automate the internationalization of our blog, enabling it to be read in nearly **100 languages**.

## Why AWS SageMaker?

SageMaker is AWS's managed platform that simplifies building, training, and deploying machine learning models for developers and data scientists.

* Flexibility: Easily host pre-trained models like Hugging Face transformers.
* Scalability: Automated scaling and easy to scale via compute options.
* Cost-efficient: Pay only for what you use & auto-shutdown.
* Integration with AWS ecosystem: Perfect for end-to-end workflows.
* Developer Experience: Well-documented and easy to use SDK's.

## Setting up the translation model

We'll be using the pre-trained model SeamlessM4T-v2 for our translations. It is a multimodal and multilingual AI translation model built and released by Meta.

SeamlessM4T-v2 supports:

- Speech recognition for nearly 100 languages
- Speech-to-text translation for nearly 100 input and output languages
- Speech-to-speech translation, supporting nearly 100 input languages and 36 (including English) output languages
- Text-to-text translation for nearly 100 languages
- Text-to-speech translation, supporting nearly 100 input languages and 35 (including English) output languages

What I'm interesting in is it's text-to-text translations capabilities. According to my simple *vibe-based* development experience, SeamlessM4T-v2 is the most capable open-source model for the problem we are solving.

### AWS SageMaker permissions

To create an AWS IAM role for your SageMaker application, follow these steps:

#### Step 1: Log in to AWS Management Console

1. Go to the **IAM** service in the AWS Management Console.

#### Step 2: Create a New Role

1. In the IAM dashboard, click on **Roles** in the left-hand menu.
2. Click the **Create Role** button.

#### Step 3: Select the Trusted Entity

1. Choose **AWS Service** as the trusted entity type.
2. Under "Use case," select **SageMaker** and click **Next**.

#### Step 4: Attach Policies

1. Attach the necessary policies to allow SageMaker to access resources like S3 and other AWS services:
	- **AmazonSageMakerFullAccess**: Provides full access to SageMaker features.
2. Click **Next**.

#### Step 5: Name and Review

1. Give your role a meaningful name, e.g., `SageMakerExecutionRole`.
2. Review the details and click **Create Role**.

#### Step 6: Copy the Role ARN

1. Find your new role in the list of roles on the IAM dashboard.
2. Click on the role name to open its details.
3. Copy the **Role ARN** (it will look something like `arn:aws:iam::123456789012:role/SageMakerExecutionRole`).

Here's a .gif to showcase this role creation process:

![AWS Sagemaker signup flow](https://i.imgur.com/ZGeYKTK.gif)

## The model - SeamlessM4T v2

####  SeamlessM4T supports:

- 101 languages for speech input
- 96 languages for text input/output
- 35 languages for speech output

#### SeamlessM4T tasks:

* Speech recognition (ASR)
* Speech-to-text translation (S2TT)
* Speech-to-speech (S2ST)
* Text-to-text (T2TT)
* Text-to-speech (T2ST)

####  Differences in FB T2TT models

Performance comparison between Facebooks main T2TT models. A future project may want to use both models, utilizing the benefits of both via dynamic mapping of the model to the particular language translation direction.

Ex:
- Translate using whichever model has the higher chrf++ score.
- Translate to language pairs that is unique to the model.


 > ChrF++ (Character n-gram F-score) is a metric used to evaluate machine translation quality that builds upon the original ChrF metric.

| Direction | facebook/seamless-m4t-v2-large | facebook/nllb-200-3.3B | Difference |
|-----------|-----------------|------------|------------|
| eng-afr   | 64.47          | 64.7       | -0.23      |
| eng-amh   | 38.31          | 37.9       | +0.41      |
| eng-arb   | 54.92          | 55.0       | -0.08      |
| eng-ary   | 37.31          | 36.1       | +1.21      |
| eng-arz   | 44.85          | 44.8       | +0.05      |


[SeamslessM4T v2 metrics](https://dl.fbaipublicfiles.com/seamless/metrics/seamlessM4T_large_v2.zip)

[nllb-200 dense 3b metrics](https://dl.fbaipublicfiles.com/large_objects/nllb/models/nllb_200_dense_3b/metrics.csv)


### Deploying the model

We'll use SageMaker's SDK to deploy the model. At the time of writing this, the Javascript SDK does not support model deployment, so I had to resort to using Python.

Hugging Face and SageMaker make deploying the model simple enough to manage within a single script, so delegating this piece of the project to Python is acceptable.

I prefer to use [uv](https://docs.astral.sh/uv/) for my python dependency management. But you are free to use whatever you're most comfortable here.

```zsh
uv venv --python 3.11.6
source .venv/bin/activate
uv add sagemaker
```

> **Note**: The SageMaker SDK only [supports](https://github.com/aws/sagemaker-python-sdk?tab=readme-ov-file#supported-python-versions) Python versions 3.8, 3.9, 3.10, and 3.11.

One of my favorite parts of the SageMaker's SDK is that it has first-class Hugging Face support. Providing the `HuggingFaceModel` a Hugging Face model ID is enough to define and work with the model within our code.

Then all it takes is a simple `.deploy()` call with our desired instance count and instance type and within a few minutes, our model is online!

The cherry on top is that Hugging Face provides most of code for us! Just click the `deploy` button on the [facebook/seamless-m4t-v2-large](https://huggingface.co/facebook/seamless-m4t-v2-large) page and copy the code over.

![Hugging Face's autogenerated code snippets](https://i.imgur.com/4u2HH1H.gif)

We are going to make a few adjustments, to personalize the code for us. In the snippet provided, they are using the `'HF_TASK':'automatic-speech-recognition'`. Due to the model's multimodal behavior, we have to be explicit here and instead provide `'HF_TASK':'translation'`

```python
import sagemaker
import boto3
from sagemaker.huggingface import HuggingFaceModel

try:
    role = sagemaker.get_execution_role()
except ValueError:
    iam = boto3.client("iam")
    role = iam.get_role(RoleName="SageMakerExecutionRole")["Role"]["Arn"]

# Hub Model configuration. https://huggingface.co/models
hub = {
    "HF_MODEL_ID": "facebook/seamless-m4t-v2-large",
    "HF_TASK": "translation",
}

# create Hugging Face Model Class
huggingface_model = HuggingFaceModel(
    transformers_version="4.37.0",
    pytorch_version="2.1.0",
    py_version="py310",
    env=hub,
    role=role,
)

# deploy model to SageMaker Inference
predictor = huggingface_model.deploy(
    initial_instance_count=1,  # number of instances
    instance_type="ml.m5.xlarge",  # ec2 instance type
)
```

It's worth browsing the [source code](https://github.com/aws/sagemaker-python-sdk/blob/master/src/sagemaker/huggingface/model.py#L111) and [documentation](https://sagemaker.readthedocs.io/en/stable/frameworks/huggingface/sagemaker.huggingface.html) around the `HuggingFaceModel` class. The snippet I provided is the bare-minimum to get our model online, but it's worth knowing that there are a handful of parameters you can manage within this class instantiation to customize your model's deployment.

## Interacting with the model during Nuxt content build

With our model online, all that is left is to interact with it via our blog's build process. There are a few bits of configuration needed to allow our client to talk to our AWS SageMaker endpoint.

Start by creating your Nuxt app with the required dependencies:

```zsh
npx nuxi@latest init content-app -t content
npx nuxi module add i18n
npm install @aws-sdk/client-sagemaker-runtime
```

### Nuxt config and .env variables

If you didn't get the endpoint name when running the deploy script, run this command in your terminal and it should output the endpoint name:

```zsh
aws sagemaker list-endpoints --query "Endpoints[].EndpointName" --output table
```

Create a `.env` file to manage the environmental variables we require. In it, store the endpoint name that was logged at the end of our deploy script as well as the region you configured.

```
AWS_ENDPOINT_NAME='huggingface-pytorch-inference-2025-01-14-22-34-04-107'
AWS_REGION='us-west-2'
```

Update your `nuxt.config.ts` file with these env variables. Here's a barebones of example of our nuxt config file so far:

```ts
export default defineNuxtConfig({
    modules: ['@nuxt/content', '@nuxtjs/i18n'],

    runtimeConfig: {
        AWS_ENDPOINT_NAME: process.env.AWS_ENDPOINT_NAME,
        AWS_REGION: process.env.AWS_REGION,
    },

    compatibilityDate: '2025-01-14',
})
```

### Invoking our SageMaker endpoint

With our environment in place, we are ready to interact with our hosted endpoint using the [AWS SageMaker's Javascript SDK](https://github.com/aws/aws-sdk-js-v3). This SDK handles a lot of the heavy-lifting, taking care of aspects like authentication, so we can use the model easily.

Just make sure you have the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and you have authenticated there using the `aws configure` command. After that, the SDK will let you work with any of your hosted models within a few simple method calls.

Here we create a utility function, `invokeSageMakerEndpoint`, to initialize a [SageMakerRuntimeClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sagemaker-runtime/) as well as a [InvokeEndpointCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sagemaker-runtime/command/InvokeEndpointCommand/).

Once initialized, we can `.send()` the command to our deployed model and receive the response in JSON.

```ts
import {
    SageMakerRuntimeClient,
    InvokeEndpointCommand,
} from '@aws-sdk/client-sagemaker-runtime'

export async function invokeSageMakerEndpoint(
    endpointName: string,
    region: string,
    inputText: string,
    srcLang: string,
    targetLang: string
) {
    // Initialize the SageMaker Runtime Client
    const client = new SageMakerRuntimeClient({ region })

    // Create the command to invoke the endpoint
    const command = new InvokeEndpointCommand({
        EndpointName: endpointName,
        Body: JSON.stringify({
            inputs: inputText,
            // These parameter's are specific to the model we are using
            parameters: {
                src_lang: srcLang,
                tgt_lang: targetLang,
            },
        }),
    })

    // Send the command and get the response
    const response = await client.send(command)
    const decodedResponse = JSON.parse(new TextDecoder().decode(response.Body))

    return decodedResponse
}
```

### Hooking into our blog's build hooks

Originally I was going to hook into my blog's build hooks using a custom [Nitro plugin](https://nitro.build/guide/plugins). I've struggled to get this to work, but if you can figure it out, please let me know! I think it would provide a cleaner solution.

Instead, I opted for a [prebuild script](https://docs.npmjs.com/cli/v10/using-npm/scripts#pre--post-scripts). I placed this script in a dedicated scripts directory `scripts/translate-content.ts`. 

Install the [tsx](https://www.npmjs.com/package/tsx) dependency as a dev-dependency to compile the ts file.

```zsh
npm install -D tsx
```

The majority of this script does the same as the Nuxt Content [content:file:beforeParse hook](https://v2.content.nuxt.com/recipes/hooks), just prior to the build. This is **key**. We need the files to be create prior to the build of the site so that these newly created files are a part of the site generation.

In the `translate-content.ts` script, we iterate over our `content` directory, extracting all of the markdown files. We read in the body of the file, passing it to the `invokeSageMakerEndpoint` function and with the response, we write it in a new file.

In this case, I am hardcoding the `lang.src` and `lang.tgt`, but it shouldn't be too difficult to expand on this and target all of the languages that the model(s) support.

> **Note:** Model language codes may be different. i.e. [nllb-200](https://huggingface.co/facebook/nllb-200-distilled-600M/raw/main/README.md) requires `eng_Latn` for English, but SeamlessM4T-v2 uses `eng`. 


```ts
// scripts/translate-content.ts
import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { invokeSageMakerEndpoint } from '../server/utils/invokeSageMakerEndpoint'
import { config } from 'dotenv'

// Load environment variables
config()

const AWS_ENDPOINT_NAME = process.env.AWS_ENDPOINT_NAME
const AWS_REGION = process.env.AWS_REGION

if (!AWS_ENDPOINT_NAME || !AWS_REGION) {
    throw new Error('Missing required AWS configuration')
}

const CONTENT_DIR = join(process.cwd(), 'content')

const lang = {
    src: 'eng',
    tgt: 'spa',
}

async function handleTranslation(filePath: string): Promise<void> {
    try {
        // Read the file content
        const content = await readFile(filePath, 'utf-8')

        // Skip if it's already a Spanish translation
        if (filePath.includes('/spa/')) {
            return
        }

        // Get translation from SageMaker
        const response: [{ translation_text: string }] =
            await invokeSageMakerEndpoint(
                AWS_ENDPOINT_NAME,
                AWS_REGION,
                content,
                lang.src,
                lang.tgt
            )

        // Create the Spanish version path
        const relativePath = filePath.replace(CONTENT_DIR, '')
        const spanishPath = join(CONTENT_DIR, 'spa', relativePath)

        // Ensure the directory exists
        await mkdir(dirname(spanishPath), { recursive: true })

        // Write the translated content
        await writeFile(spanishPath, response[0].translation_text)

        console.log(`Translated ${relativePath} to Spanish`)
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error)
    }
}

async function* walkContent(dir: string): AsyncGenerator<string> {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
        const path = join(dir, entry.name)

        if (entry.isDirectory()) {
            // Skip the spa directory to avoid processing translations
            if (entry.name === 'spa') continue
            yield* walkContent(path)
        } else {
            // Only process content files
            if (entry.name.endsWith('.md') || entry.name.endsWith('.yaml')) {
                yield path
            }
        }
    }
}

async function main() {
    try {
        for await (const filePath of walkContent(CONTENT_DIR)) {
            await handleTranslation(filePath)
        }
        console.log('Translation completed successfully')
    } catch (error) {
        console.error('Translation failed:', error)
        process.exit(1)
    }
}

main()
```

## Deployment

There are two parts to the deployment process.

1. Setup, build, and commit the newly created files back to Github.
2. Utilizing Vercel's automatic deployment process.

Running `npm run build` within the action hits our pre-build script, generating the newly translated blog posts.

With these newly created files, we need to add, commit, and push them to our Github repository without re-running this action (avoiding an infinite loop). Our git commit message's `[skip ci]` text ensures the new commit does not run our Github Action again.

If you browse your repository after this point, you should see the newly created files within `content/spa/*`.

```yml
name: Build and Deploy to Vercel
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

concurrency:
  group: ${{ github.ref_name }}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: package-lock.json

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: ${{ secrets.AWS_REGION }}
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Install dependencies
        run: npm ci

      - name: Generate content
        env:
          AWS_ENDPOINT_NAME: ${{ secrets.AWS_ENDPOINT_NAME }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: npm run build

      - name: Commit translated files
        run: |
          git config --global user.name 'github-actions[bot]'
          git config --global user.email 'github-actions[bot]@users.noreply.github.com'
          git add .
          git diff --quiet && git diff --staged --quiet || (git commit -m "Add translated content [skip ci]" && git push)
          git push
        working-directory: ${{ github.workspace }}

```

Now, with Vercel's auto-build and deploy settings, the site should be online with our newly translated content!
## Scaling down resources to avoid costs

Make sure to run the following command once you are done to avoid unnecessary charges from Amazon:

```zsh
aws sagemaker delete-endpoint --endpoint-name <ENDPOINT_NAME>
```

## Conclusion

We've walked through the complete process of automating multilingual content generation for your Nuxt Content blog using AWS SageMaker. By leveraging the power of Meta's SeamlessM4T-v2 model, AWS's scalable infrastructure, and Nuxt's flexible content system, we've created a workflow that automatically translates your content into nearly 100 languages during the build process.

This automation brings several key benefits:

- Eliminates the manual effort of managing translations
- Significantly reduces localization costs
- Expands your blog's reach to a global audience
- Maintains content consistency across all languages
- Scales effortlessly as your content grows

The best part? Once set up, this system requires minimal maintenance. Your content creators can focus on writing great content in their primary language, while the automation handles the rest.

For the sake of keeping this tutorial focussed, I decided to opt-out of going to in-depth on the post-processing of our markdown content.  This could be expanded to include frontmatter and handle edge cases that the AI-model may introduce such as linking, images, alt-text, etc.

You can find all the code from this tutorial in our [GitHub repository](https://github.com/CodyBontecou/sagemaker-huggingface), complete with a working demo and additional documentation. Feel free to fork it, customize it, and make it your own.

I'm curious to hear how you might adapt this workflow for your needs. Could this automate documentation translation for your open-source project? Perhaps help with internationalizing your marketing materials? Or maybe you're thinking about using it for something entirely different?

Remember to clean up your AWS resources when you're done experimenting by deleting your endpoint, as shown in the cleanup section above.

What language will your next blog post speak? With this setup, the answer might just be "all of them."