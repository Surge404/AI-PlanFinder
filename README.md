




````markdown
# 💡 AI-Powered Benefits Discovery Flow

An intelligent, interactive web application that leverages **Google Gemini AI** to help users instantly discover and understand their health and wellness benefits. Built with a modern, non-traditional UI and stunning animations for an engaging user experience.

<img src="https://via.placeholder.com/800x400.png?text=Screenshot+of+Input+Screen+with+Glassmorphism+and+Gradient+Background" alt="Conceptual screenshot of the AI-Powered Benefits Discovery Flow application's input screen with a glassmorphism card over a vibrant gradient background."/>

---

## 1. Project Setup & Demo

### Tech Stack Highlights

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **UI Framework** | **React 18** | High-performance user interface |
| **Styling** | **Tailwind CSS** | Utility-first, rapid styling |
| **State** | **Recoil** | Efficient, modern state management |
| **Animation** | **Framer Motion** | Smooth, dynamic UI transitions |
| **AI** | **Google Gemini AI** | Classification and content generation |

### Quick Start

**Prerequisites**: Node.js 16+ and npm

```bash
# Clone the repository (if not already done)
# git clone <your-repo-link>
# cd <repo-folder>

# Install dependencies
npm install

# Start development server
npm start
# App will be available at http://localhost:5173
````

### 🚀 Demo

A hosted demo or screen recording showcasing the full flow is available:

  - **Web Demo**: [Link to your hosted application]
  - **Screen Recording**: [Link to your screen recording]

-----

## 2\. Problem Understanding

The core problem this application solves is **user confusion and friction in benefits utilization**. Employees often have comprehensive benefit packages but struggle to:

1.  **Determine Relevancy**: Which benefit applies to their specific need (e.g., is "back pain" an OPD or a Mental Health issue)?
2.  **Understand Next Steps**: What is the exact process to *use* the benefit (e.g., whom to call, what documents are needed)?

**Assumptions Made:**

  * **Fixed Categories**: The AI classification is limited to the four defined categories: **Dental, OPD, Vision, and Mental Health**.
  * **Client-Side Data**: Benefit details are served from a static mock JSON file (`benefits.mock.json`), implying the system currently has no live backend for benefit management.
  * **API Key Management**: For this demonstration, the Gemini API key is stored client-side in `aiService.js`. **In a production environment, all API calls must be proxied through a secure backend.**

-----

## 3\. AI Prompts & Iterations

The application uses **Google Gemini AI** for three distinct and critical tasks. The prompts are aggressively engineered to force a predictable, structured output for reliable client-side processing.

### Task 1: Intelligent Classification

**Goal**: Pinpoint the benefit category from ambiguous user text.
**Key Constraint**: Must return **ONLY** the category name to simplify matching with mock data.

| Prompt Type | Initial Prompt Draft | Refined Prompt Used |
| :--- | :--- | :--- |
| **Classification** | "What category is this: {user\_input}? Choose from Dental, OPD, Vision, Mental Health." | **"Return ONLY one of these category names — Dental, OPD, Vision, Mental Health — that best matches the user text. Output exactly the category name and nothing else. If the text is ambiguous or none match, output 'UNRECOGNIZED'."** |

### Task 2: Clarification Question

**Goal**: Get necessary information when the initial classification fails (`UNRECOGNIZED`).
**Key Constraint**: Must return **ONLY** a single, concise question.

| Prompt Type | Initial Prompt Draft | Refined Prompt Used |
| :--- | :--- | :--- |
| **Clarification** | "The user needs more help. Ask them a question about {user\_input} to get to Dental, OPD, Vision, or Mental Health." | **"The user wrote: '{user\_input}'. Ask a single concise clarifying question that will help classify this into Dental, OPD, Vision, or Mental Health. Return ONLY the clarifying question sentence."** |

### Task 3: Personalized Action Plan Generation

**Goal**: Create a structured, easy-to-follow 3-step plan for the selected benefit.
**Key Constraint**: Must return **STRICT JSON** matching the defined schema for safe parsing.

| Prompt Type | Initial Prompt Draft | Refined Prompt Used |
| :--- | :--- | :--- |
| **Action Plan** | "Generate 3 steps to use this benefit: {benefit} for this problem: {user\_input}. Include required documents and time." | **(See full JSON prompt below)** |

> The final Action Plan prompt requires the AI to return a JSON object **exactly** in this shape (no extra text):
>
> ```json
> {
>   "steps": [
>     {
>       "step": 1,
>       "title": "Short title (max 6 words)",
>       "description": "Action description (1-2 sentences).",
>       "estimatedTime": "e.g. 1-2 days or 1 hour",
>       "requiredDocs": ["list","of","docs"]
>     },
>     {
>       "step": 2,
>       "title": "...",
>       "description": "...",
>       "estimatedTime": "...",
>       "requiredDocs": [...]
>     },
>     {
>       "step": 3,
>       "title": "...",
>       "description": "...",
>       "estimatedTime": "...",
>       "requiredDocs": [...]
>     }
>   ],
>   "notes": "One-sentence extra note if needed, otherwise empty string"
> }
> ```

-----

## 4\. Architecture & Code Structure

The application follows a clean, component-based, and modular React architecture.

### Directory Structure

```
src/
├── components/           # Reusable UI components (Input, Cards, Details)
│   ├── BenefitInput.jsx      # Initial input screen
│   ├── ProcessingScreen.jsx  # Loading/classification screen
│   └── BenefitDetails.jsx    # Benefit details & action plan view
├── data/
│   └── **benefits.mock.json** # Static benefit data source
├── services/
│   └── **aiService.js** # Single point of contact for all Gemini API calls
├── state/
│   └── **atoms.js** # Central Recoil state definitions
├── **App.jsx** # Main application component & screen router
└── main.jsx
```

### State Management: Recoil

**Recoil** is used for efficient global state to manage the application's linear flow. Key atoms defined in `state/atoms.js` include:

  * `userInputState`: Stores the user's initial query.
  * `classificationState`: Stores the AI's category result (`Dental`, `OPD`, etc.).
  * `selectedBenefitState`: Stores the benefit the user clicks to view the plan for.
  * `actionPlanState`: Stores the structured JSON object generated by the AI for the action plan.
  * `currentScreenState`: Manages the application's active view (Input -\> Processing -\> Benefits -\> Details).

### AI Integration: `services/aiService.js`

This service file is the single interface for all AI operations. It abstracts the API calls, constructs the three specific prompts, and handles the necessary data formatting, ensuring that components only deal with clean data and state updates.

-----

## 5. Screenshots / Screen Recording

| **Screen** | **Description** |
| :--- | :--- |
| **Input Screen** | Creative UI with floating elements, **Dark Mode** toggle, and a clear call-to-action for the user query. |
| <img width="1920" alt="Input Screen" src="https://github.com/user-attachments/assets/b6248a68-1ce8-4add-81cb-875f1113bb1b" /> |  |
| **Processing Screen** | Engaging loading state with **Framer Motion** animations to mask AI latency. |

| <img width="1920" alt="Processing Screen 2" src="https://github.com/user-attachments/assets/721bb6a4-c492-459d-91a6-f8fcf89e40c1" /> |  |
| **Benefits List** | Dynamically filtered benefit cards with coverage badges and category tags based on AI classification. |
| <img width="1920" alt="Benefits List" src="https://github.com/user-attachments/assets/8cf39f32-7614-48db-b1ce-54110ff3133a" /> |  |
| **Benefit Details** | Full benefit overview alongside the structured, **3-step AI-generated action plan**. |
| <img width="1920" alt="Benefit Details" src="https://github.com/user-attachments/assets/d742d4e2-8571-406d-82b6-e6053e6d7fe1" /> |  |
https://github.com/user-attachments/assets/79d19cab-7657-40aa-aed3-b892604ef609
## 6\. Known Issues / Improvements

### Known Issues

  * **AI Format Drift**: The Gemini API occasionally deviates slightly from the strict JSON structure for the Action Plan. Robust client-side error handling/parsing is required.
  * **No Persistence**: Dark mode preference and past user inputs are not saved across sessions (no local storage integration).
  * **Security Risk**: The API key is exposed client-side in `aiService.js`.

### Future Improvements

1.  **Backend & Security**: Implement a server-side proxy (e.g., using a simple Express server) to **securely store the Gemini API key** and proxy all AI calls.
2.  **Multi-Turn Conversation**: Integrate a context-aware chat flow using the Gemini API's conversational abilities to handle follow-up questions more naturally.
3.  **Accessibility (A11Y)**: Enhance keyboard navigation and add ARIA Live Regions to dynamically announce status changes on the `ProcessingScreen` for screen reader users.

-----

## 7\. Bonus Work

The project features significant polish and enhancements:

✨ **Stunning Animations**: Extensive use of **Framer Motion** for all screen transitions, floating elements, and interactive micro-interactions (e.g., card hover effects).

🌙 **Seamless Dark Mode**: Full support for a dark theme with beautifully contrasting gradients, managed efficiently via a **Recoil** state atom.

🎨 **Modern UI/UX**: The design employs a creative aesthetic featuring **Glassmorphism** cards and custom gradient backgrounds for a unique, premium feel.

```
```
