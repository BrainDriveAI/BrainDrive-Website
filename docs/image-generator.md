# BrainDrive Marketing Image Generator – Coding Agent Plan

Here’s a full plan for the coding agent and the tool, based on your attached brand docs and the dark-mode palette.

---

## 1. Goals & assumptions

**Goal:**  
Build a BrainDrive marketing image generator page that:

1. Always bakes in BrainDrive’s brand + image aesthetic (no re-pasting spec).
2. Lets you type a rough concept → AI cleans it up into a polished image prompt.
3. Uses Google’s “nano banana pro” image API to generate images.
4. Lets you request edits/variations via natural language.
5. Is easy to extend later (templates for “blog hero”, “video side graphic”, etc.).

**Assumptions (baked into the plan instead of asking questions):**

- BrainDrive website can host a small backend (Node/Next/FastAPI/etc.) to call the Google API.
- The front-end is React-ish (or can be; if it’s Webflow you can still embed via React widget or iframe).
- You’re okay with a small LLM step (local or remote) to:
  - Refine concepts into prompts.
  - Turn edit requests into updated prompts.

---

## 2. UX spec for the Image Generator page

### 2.1 Page layout (dark mode–first)

**Sections:**

1. **Header**
   - Title: **BrainDrive Image Studio** (or similar).
   - Short subtitle: “Generate on-brand images for BrainDrive in a few seconds.”

2. **Concept → Prompt panel (left column)**
   - **Input: “Describe the image you want”**
     - Multiline textbox where you type messy human idea:
       - e.g. “blog hero about freedom vs big tech ai, side by side comparison”
   - **Optional dropdown: “Use case”**
     - `Blog hero (16:9)`
     - `In-article graphic (16:9)`
     - `Video side graphic (16:9 with safe left side)`
     - `Social tile (square)`
   - **Toggle:** “Include BrainDrive Guide character”
   - **Button:** `Generate Prompt`
   - **Read-only prompt preview box** (after generation):
     - Shows the refined prompt that will be sent to nano banana.
     - Also shows optional “negative prompt” / constraints if you want.

3. **Generated images panel (right column)**

   - When you click **Generate Image**:
     - Show loading state (skeleton card + spinner).
   - On success:
     - Show a grid (e.g. 2x2) of generated images.
     - Each image card includes:
       - Thumbnail (click to open larger modal).
       - “Select as final” button.
       - “Request edits to this version” button.
   - On error:
     - Friendly error message and link to logs/ID for debugging.

4. **Edits panel (appears when you click “Request edits”)**

   - Textbox: “What would you like changed?”
     - Example placeholders:
       - “Make the BrainDrive side brighter and more hopeful.”
       - “Move the character to the right and leave more space for text on the left.”
       - “Less busy, fewer blocks.”
   - Button: `Apply Edits & Regenerate`
   - Under the hood, this sends:
     - Original refined prompt
     - Edit text
     - (Optionally) previous image ID  
     → to an LLM that returns an updated prompt, then to nano banana again.

---

## 3. Hard-wiring brand & aesthetic

Instead of re-pasting docs each time, have the coding agent build a **machine-readable brand config** that both the LLM and image generator use.

### 3.1 Brand image config (single source of truth)

Create e.g. `config/brainImageStyle.ts` (or `.json`):

```ts
export const brainImageStyle = {
  palette: {
    // Dark mode colors from your Visual Brand Guidelines
    primaryBg: "#03050A",    // Deep Blue – primary dark background
    secondaryBg: "#0A152A",  // Midnight Blue – secondary dark background
    cardBg: "#1E2A3B",       // Gray Blue – cards
    accent1: "#325D87",      // Steel Blue – secondary UI
    accent2: "#7CA7D1",      // Sky Blue – highlights
    accentText: "#C5DAED",   // Light Blue – text/UI
    cta: "#FFFFFF"           // CTA White – key actions
  },
  personality: {
    adjectives: ["geeky", "friendly", "minimalist", "playful"],
    emotionalGoal: "People should feel empowered and relieved – 'oh wow, I get this now.'"
  },
  composition: {
    defaultAspectRatio: "16:9",
    sideGraphicFriendly: true,
    guidance: [
      "One clear focal idea with 2–4 supporting elements max.",
      "Leave generous negative space, especially on one side for text.",
      "Target 4/10 on busyness."
    ]
  },
  character: {
    enabledByDefault: true,
    description: "Realistic cartoon BrainDrive Guide: gender-neutral geeky builder, casual hoodie or t-shirt + jeans, simple friendly face (eyes/eyebrows/mouth), not hyper-realistic.",
  },
  dos: [
    "Dark-mode first with deep/midnight blues and clean vector/line-art style.",
    "Use simple visual metaphors (blocks, tiles, flows, side-by-side comparisons).",
    "Keep images minimal, warm, human, with clear structure."
  ],
  donts: [
    "No corporate stock photo people.",
    "No neon rainbow chaos; keep palette restrained.",
    "No icons purely as decoration; only use when they communicate a specific idea."
  ],
  textLabels: {
    allowed: true,
    maxLabels: 6,
    examples: ["Ownership", "Freedom", "Big Tech", "Plugins", "Core", "Privacy"],
  }
};
```

The coding agent should:

- Create this file from your uploaded specs.
- Use it in both:
  - Prompt-refinement LLM instructions.
  - Final text prompt sent to nano banana.

### 3.2 Prompt style template

The agent will build a **prompt template** (string builder) that always injects brand style:

```ts
function buildImagePrompt(userConcept: string, useCase: UseCase, includeCharacter: boolean) {
  const { palette } = brainImageStyle;

  const base = `
  Dark-mode marketing illustration for BrainDrive, an open-source, user-owned AI system.
  Style: ${brainImageStyle.personality.adjectives.join(", ")}; minimal, warm, human.
  Color palette: deep blue primary background (${palette.primaryBg}),
  midnight blue secondary (${palette.secondaryBg}),
  steel and sky blue accents (${palette.accent1}, ${palette.accent2}),
  light blue text/UI (${palette.accentText}), white CTAs (${palette.cta}).
  Composition: ${brainImageStyle.composition.guidance.join(" ")}
  Metaphor-first, one clear idea, 2–4 supporting elements max.
  Allow short text labels when they clarify ideas (e.g., Ownership, Freedom, Big Tech, Plugins, Core).
  Avoid corporate stock photos or generic office scenes.
  `;

  const character = includeCharacter
    ? "Include the BrainDrive Guide: a realistic cartoon geeky builder, friendly, casual hoodie or t-shirt + jeans."
    : "Do not include any human or character; focus on abstract but clear metaphor.";

  const useCaseHint = useCaseToInstructions(useCase); // e.g. side-space on left, etc.

  return `${base}
  Use case: ${useCaseHint}
  Concept: ${userConcept}
  ${character}
  `;
}
```

This function is what ultimately gets sent (after LLM refinement) to nano banana.

---

## 4. Concept → prompt → image pipeline

### 4.1 Step 1 – Concept refinement (LLM)

**Input:**  
- Raw concept from textbox  
- Selected use case  
- Include/omit character flag

**Process:**  
Call an LLM with instructions like:

“You are an expert prompt writer for a text-to-image model, creating on-brand images for BrainDrive.  
BrainDrive’s visual style and constraints:  
- [Inject summary from `brainImageStyle`]  
The user’s rough idea is: “{{userConcept}}”.  
The use case is: {{useCase}}.  
Rewrite this as a single, clear, richly descriptive prompt for a modern image generator.  
- Keep it 1–2 paragraphs max.  
- Do NOT mention “text to image” or “prompt” in the output.  
- Use the BrainDrive dark-mode palette and minimal, metaphor-first style.”

**Output:**  
- `refinedPrompt: string`
- Optional `negativePrompt: string` (e.g. “no photo-real people, no corporate stock photography”).

Store this along with `useCase`, `includeCharacter`.

### 4.2 Step 2 – Build final prompt for nano banana

The backend combines:

- `refinedPrompt`
- `brainImageStyle` fields
- Use case & character hints

via `buildImagePrompt()` and calls the nano banana API.

### 4.3 Step 3 – Edit requests

When you click “Request edits” on an image:

**Input:**

- `previousPrompt` (the full text sent to nano banana)
- `editInstruction` (what you typed)
- Optional metadata (use case, seed, other params)

**Process (LLM again):**

Prompt template (in natural language):

“You’re modifying an existing image prompt for BrainDrive.  
Original prompt: {{previousPrompt}}  
BrainDrive’s style and constraints:  
- [summary from `brainImageStyle`]  
The user wants these edits: {{editInstruction}}  
Produce a revised prompt that:  
- Keeps anything that still matches the request and brand style.  
- Adjusts or removes elements to satisfy the requested edits.  
Output only the new prompt text.”

**Output:**  
- `updatedPrompt` → sent to nano banana for a new image.

Optionally store previous versions so you can compare “before/after” or roll back.

---

## 5. Backend/API design

### 5.1 Endpoints

Assuming a small backend service:

1. `POST /api/brain-image/prompt`
   - Body: `{ concept, useCase, includeCharacter }`
   - Steps:
     - Call LLM to refine concept → `refinedPrompt`.
     - Build final prompt string (but don’t call nano banana yet if you want a 2-step UX).
   - Returns:
     - `{ refinedPrompt, fullPrompt, useCase, includeCharacter }`

2. `POST /api/brain-image/generate`
   - Body: `{ fullPrompt, useCase, includeCharacter, options }`
   - Calls nano banana image API (text-to-image).
   - Returns:
     - `{ images: [{id, url, metadata}], fullPrompt }`

3. `POST /api/brain-image/edit`
   - Body: `{ previousPrompt, editInstruction, useCase, includeCharacter, targetImageId? }`
   - Steps:
     - Call LLM to create `updatedPrompt`.
     - Call nano banana with `updatedPrompt`.
   - Returns:
     - `{ images, updatedPrompt, previousPrompt }`

4. (Optional) `GET /api/brain-image/history`  
   - For browsing past prompts and images for re-use.

### 5.2 Nano banana integration

The coding agent should:

- Create a `NanoBananaClient` module:
  - Reads API key from env (`NANO_BANANA_API_KEY`).
  - Wraps HTTP calls:
    - `generateImage({ prompt, aspectRatio, model, seed })`
    - `editImage({ prompt, imageId?, mask? })` if supported.
- Handle:
  - Rate limit errors.
  - Timeouts.
  - Clear error messages returned to frontend.

---

## 6. Front-end implementation details

The coding agent should build a small front-end app/page, e.g. `/tools/image-studio`.

### 6.1 State model

Front-end state:

```ts
type ImageState = {
  id: string;
  url: string;
  promptUsed: string;
  createdAt: string;
};

type StudioState = {
  concept: string;
  useCase: UseCase;
  includeCharacter: boolean;
  refinedPrompt: string | null;
  fullPrompt: string | null;
  images: ImageState[];
  selectedImageId: string | null;
  isGeneratingPrompt: boolean;
  isGeneratingImage: boolean;
  isEditing: boolean;
  error: string | null;
};
```

### 6.2 Components

- `<ConceptForm />`
  - Textarea, dropdown, toggle, **Generate prompt** button.
- `<PromptPreview />`
  - Shows refined prompt; **Generate Image** button.
- `<ImageGrid />`
  - Renders thumbnails, selection state, **Request edits** button.
- `<EditDialog />`
  - Textarea + button to submit edit.
- `<HistorySidebar />` (optional)
  - Past generated prompts/images for quick reuse.

Styling: reuse your dark palette (Deep Blue backgrounds, Gray Blue cards, Sky Blue/Light Blue accents) directly in CSS or Tailwind config.

---

## 7. Coding agent work plan (step-by-step)

This is what you can paste (adapted) as instructions for the coding agent doing the implementation.

1. **Understand the repo**
   - Inspect BrainDrive website codebase.
   - Identify:
     - Front-end framework (React/Next/Webflow embed).
     - Backend (Next API routes, Node/Express, FastAPI, etc.).
   - Locate existing brand/config files.

2. **Create brand image config**
   - Add `config/brainImageStyle.(ts|json)` as described.
   - Populate from the “Image Aesthetic Spec” and “Visual Brand Guidelines” docs (dark-mode palette).
   - Export it so both frontend & backend can import the same config.

3. **Add nano banana client**
   - Create `lib/nanoBananaClient.(ts|py)` depending on stack.
   - Implement:
     - `generateImage(params)` and, if possible, `editImage(params)`.
   - Read API key from env and provide clear error if missing.

4. **Implement backend endpoints**
   - Add `/api/brain-image/prompt`, `/generate`, `/edit` as above.
   - Integrate with:
     - Your chosen LLM client for prompt refinement.
     - `NanoBananaClient` for image generation.
   - Add basic validation and logging.

5. **Build the Image Studio page**
   - Route: `/tools/image-studio` (or similar).
   - Implement components:
     - Concept form, prompt preview, image grid, edit dialog.
   - Wire up to API endpoints.
   - Ensure layout respects:
     - 16:9 preview framing.
     - Dark mode palette and minimal design.

6. **Respect brand aesthetic**
   - Use `brainImageStyle.palette` for background, cards, buttons.
   - For the UI text, reflect brand tone: geeky, friendly, minimal, playful.

7. **Add minimal tests & examples**
   - Unit tests for:
     - `buildImagePrompt`.
     - `NanoBananaClient` (mocked).
   - Example usage:
     - Pre-fill concept with 1–2 sample ideas so you can demo quickly.

8. **Docs & usage guide**
   - Add a short doc page in your docs site:
     - What the tool does.
     - How to use it.
     - Constraints and tips for good concepts.
