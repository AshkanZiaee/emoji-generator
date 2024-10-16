# Project Overview

    Use this guide to build a web app where users can give a text
    prompt to generate emoji using model hosted on Replicate.

# Feature Requirements

- we will use next.js, shadcn, Lucid, superbase, Clerk
- Create a form where users can put in proppt, and clicking on
  button that calls the replicate model to generate emoji
- have a nce UI & animation when emoji is blank or generating
- Display all the images ever generated in grid
- When hover each emoj img, an icon for download, ad an icon
  button for like should show up

# Relevant Docs

## How to use replicate emoji generator model

    Run fofr/sdxl-emoji with an API

Table of Contents

Node.js

Get started
Use one of our client libraries to get started quickly.

Node.js

Python

HTTP
Set the REPLICATE_API_TOKEN environment variable

export REPLICATE_API_TOKEN=<paste-your-token-here>

Visibility

Copy
Learn more about authentication

Install Replicate’s Node.js client library

npm install replicate

Copy
Learn more about setup
Run fofr/sdxl-emoji using Replicate’s API. Check out the model's schema for an overview of inputs and outputs.

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
prompt: "A TOK emoji of a man",
apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });
console.log(output)
//=> ["https://replicate.delivery/pbxt/a3z81v5vwlKfLq1H5uBqpVm...

# Current File Structure

    cursor-test/

├── .next/
├── app/
│ ├── fonts/
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ ├── page.tsx
│ └── components/ui/
│ ├── button.tsx
│ └── input.tsx
├── lib/
│ └── utils.ts
├── node_modules/
├── requirements/
│ └── front-end-requirements.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules

    - All new components should go in /components and be named lik example-component.tsx unless otherwise specified
    - all new pages go in / app
    - dont touch the .env.local api token
