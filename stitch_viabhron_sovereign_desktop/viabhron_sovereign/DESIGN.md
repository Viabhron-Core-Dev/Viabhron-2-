# Design System Strategy: The Obsidian Command

## 1. Overview & Creative North Star

The creative North Star for this design system is **"The Obsidian Command."** 

We are moving away from the "flat web" of the last decade and returning to a high-fidelity, tactile "Retro-Future" aesthetic. This system imagines a world where high-end hardware interfaces meet editorial precision. It is an "Operating System" for the sophisticated user—one that values the depth of space, the clarity of light, and the precision of a terminal.

To achieve this, we break the "template" look through **Atmospheric Depth**. Instead of standard grids and boxes, we use intentional asymmetry and overlapping layers. Elements should feel like they are floating in a dark, pressurized void, illuminated by the soft glow of a distant indigo star. We favor high-contrast typography scales where massive headlines meet minuscule, hyper-legible technical data.

## 2. Colors & Atmospheric Layering

Our palette is anchored in the deep obsidian of the void, punctuated by high-energy indigo and organic forest accents to provide "soul" to the machine.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts or subtle tonal transitions.
*   **Wrong:** A card with a grey border.
*   **Right:** A `surface-container-low` card sitting on a `surface` background, creating a soft edge through light alone.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of glass. We use the Material surface tiers to define "altitude":
*   **Surface Lowest (#070d1f):** The "Floor." Used for the deepest background or the most recessed areas.
*   **Surface (#0c1324):** The standard workspace.
*   **Surface Container High (#23293c):** Elevated platforms, sidebars, or navigation zones.
*   **Surface Container Highest (#2e3447):** Floating modals or primary action cards.

### The "Glass & Gradient" Rule
To capture the "Sovereign" feel, floating elements should use **Glassmorphism**. Apply a 10–20% opacity to `surface-container` colors and pair them with a heavy `backdrop-filter: blur(24px)`. 

### Signature Textures
Main CTAs and Hero elements should never be a flat color. Use a subtle linear gradient (45-degree angle) transitioning from `primary` (#c3c0ff) to `primary-container` (#4f46e5). This mimics the way light catches on a curved glass screen.

## 3. Typography: The Editorial Tech-Stack

We employ a three-tier typographic system to balance "high-end editorial" with "deep-tech functionality."

*   **Display & Headlines (Space Grotesk):** Use for large headers and high-impact statements. The geometric nature of Space Grotesk provides the "Retro-Future" vibe. Use `headline-lg` (2rem) for section titles to command attention.
*   **Functional UI (Inter):** All buttons, labels, and body text use Inter. It is the "workhorse" that ensures legibility. Use `body-md` (0.875rem) for standard content to maintain a sleek, professional feel.
*   **The Data Layer (JetBrains Mono):** This is our signature move. Any time the UI displays "system data," "logs," "code," or "status readouts," use JetBrains Mono. This reinforces the "Deep-Tech" aesthetic.

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved by "stacking" surface tiers. For example, place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural "sunken" or "lifted" effect without needing a shadow.

### Ambient Shadows
When a floating effect (like a dropdown) is required, shadows must be **extra-diffused**:
*   **Blur:** 30px to 60px.
*   **Opacity:** 4%–8%.
*   **Color:** Use a tinted version of `primary` (#c3c0ff) rather than black. This creates a "glow" rather than a "shadow."

### The "Ghost Border" Fallback
If accessibility requires a container edge, use a **Ghost Border**:
*   Token: `outline-variant` (#464555).
*   Opacity: 15% Max.
*   Effect: It should feel like a catch-light on the edge of a lens, not a structural line.

## 5. Components

### Buttons
*   **Primary:** A gradient-fill from `primary` to `primary-container`. Text should be `on-primary` (#1d00a5). Use `full` roundedness (capsule) for a futuristic look.
*   **Secondary:** Glass-morphic. Transparent background with a `backdrop-filter` and a 10% `outline` Ghost Border.

### Cards & Lists
*   **Forbid Divider Lines:** Use vertical white space or a subtle shift from `surface-container-low` to `surface-container-high` to separate items.
*   **Nesting:** A card should always be one "tier" higher than the surface it sits on.

### The "Status Log" (Custom Component)
A specific component for this design system. A translucent pane using `surface-container-lowest` with a 50% opacity, featuring `JetBrains Mono` text in `tertiary` (forest green) for system logs. It should feel like a terminal window integrated into a high-end luxury app.

### Input Fields
*   **State:** Default state should be `surface-container-lowest` with no border.
*   **Focus State:** The background remains dark, but a subtle glow of `primary` (#c3c0ff) at 20% opacity should fill the container, with a `primary` indicator on the left edge.

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align high-level titles to the left but allow data logs to sit in unconventional, right-aligned grids to create a "custom" feel.
*   **Use Massive Negative Space:** Let the `surface` (obsidian) color breathe. It provides the "premium" feeling.
*   **Mix Fonts:** Use Inter for the label, but JetBrains Mono for the actual user input or data value.

### Don’t:
*   **Never use 100% opaque borders:** They kill the glassmorphism and make the UI look like a generic bootstrap template.
*   **Avoid "Pure" Black:** Always use the Slate-950/`surface` (#0c1324) palette. Pure black (#000000) lacks the depth required for this system.
*   **Don't over-use the Indigo accent:** Treat `Indigo-600` as a light source. If everything glows, nothing is important. Keep it for CTAs and critical status indicators.