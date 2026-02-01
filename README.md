# accordionary

[![npm version](https://badge.fury.io/js/accordionary.svg)](https://badge.fury.io/js/accordionary)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)

A lightweight, accessible, vanilla JavaScript accordion with zero dependencies. Perfect for Webflow, static sites, or anywhere you need a simple accordion.

## Features

- Zero dependencies
- ARIA compliant
- Keyboard navigation (Enter/Space)
- Smooth, customizable animations
- Respects `prefers-reduced-motion`
- Configurable via HTML attributes
- Programmatic API for full control
- Generate accordions from JSON data (package manager only)
- TypeScript support
- ~4KB minified

## Installation

### Browser (Auto-Initialize)

Download `dist/accordionary.js` and include it in your HTML:

```html
<script src="your-url/accordionary.js"></script>
```

Or link directly from GitHub (replace `v1.0.2` with the desired version):

```html
<script src="https://cdn.jsdelivr.net/npm/accordionary@1.0.2/dist/accordionary.js"></script>
```

This version auto-initializes all accordions on page load.

### npm / bun / etc

```bash
npm install accordionary
```

```bash
bun install accordionary
```

```typescript
import Accordionary from "accordionary";

// Initialize a single accordion
const accordion = Accordionary.init("#my-accordion");

// Or initialize all accordions on the page
const accordions = Accordionary.initAll();
```

## Usage

### Basic Structure

```html
<div accordionary="component">
  <div accordionary="item">
    <div accordionary="header">
      <span>Section Title</span>
      <span accordionary="icon">▼</span>
    </div>
    <div accordionary="content">
      <p>Your content here.</p>
    </div>
  </div>
  <!-- More items... -->
</div>
```

### Minimal CSS

Add some basic styles to make it look nice:

```css
[accordionary="component"] {
  border: 1px solid #ddd;
  border-radius: 4px;
}

[accordionary="item"] {
  border-bottom: 1px solid #ddd;
}

[accordionary="item"]:last-child {
  border-bottom: none;
}

[accordionary="header"] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f5f5f5;
}

[accordionary="header"]:hover {
  background: #eee;
}

[accordionary="header"]:focus {
  outline: 2px solid #0066cc;
  outline-offset: -2px;
}

[accordionary="content"] {
  padding: 0 1rem;
}

[accordionary="content"] > * {
  padding: 1rem 0;
}
```

## Configuration

All configuration is done via HTML attributes. No JavaScript required.

### Component-Level Attributes

| Attribute               | Values                 | Default | Description                         |
| ----------------------- | ---------------------- | ------- | ----------------------------------- |
| `accordionary-open`     | `all`, `first`, `none` | `none`  | Which items to open by default      |
| `accordionary-multiple` | `true`, `false`        | `true`  | Allow multiple items open at once   |
| `accordionary-speed`    | number (ms)            | `300`   | Animation duration in milliseconds  |
| `accordionary-easing`   | CSS easing             | `ease`  | Animation easing function           |
| `accordionary-link`     | `true`, `false`        | `false` | Link all items: open/close together |

### Item-Level Attributes

| Attribute              | Values          | Default    | Description                         |
| ---------------------- | --------------- | ---------- | ----------------------------------- |
| `accordionary-open`    | `true`, `false` | (inherits) | Override component-level open state |
| `accordionary-disable` | `true`, `false` | `false`    | Prevent toggling, hide icon         |

## Examples

### Open First Item by Default

```html
<div accordionary="component" accordionary-open="first">
  <!-- items -->
</div>
```

### Open All Items by Default

```html
<div accordionary="component" accordionary-open="all">
  <!-- items -->
</div>
```

### Single Open Only (Classic Accordion)

```html
<div
  accordionary="component"
  accordionary-multiple="false"
  accordionary-open="first"
>
  <!-- items -->
</div>
```

### Linked Items (Open/Close Together)

```html
<div accordionary="component" accordionary-link="true">
  <!-- Clicking any item open opens all; clicking any item closed closes all -->
</div>
```

Disabled items are excluded from linking — they remain in their current state.

### Force Specific Item Open

```html
<div accordionary="component">
  <div accordionary="item" accordionary-open="true">
    <!-- This item starts open -->
  </div>
  <div accordionary="item">
    <!-- This item starts closed -->
  </div>
</div>
```

### Always-Open Disabled Item

```html
<div accordionary="component" accordionary-open="all">
  <div accordionary="item" accordionary-disable="true">
    <!-- Cannot be closed, icon hidden -->
  </div>
</div>
```

### Custom Animation

```html
<div
  accordionary="component"
  accordionary-speed="500"
  accordionary-easing="ease-in-out"
>
  <!-- Slower animation with ease-in-out -->
</div>
```

## Programmatic API

When installed via package manager, you get full programmatic control over accordions.

### Initialization

```typescript
import Accordionary from "accordionary";

// Initialize by selector
const accordion = Accordionary.init("#my-accordion");

// Initialize by element
const element = document.querySelector("#my-accordion");
const accordion = Accordionary.init(element);

// Initialize all accordions on page
const accordions = Accordionary.initAll();
```

### Accordion Controller

The `init()` function returns an `AccordionController` with these methods:

```typescript
const accordion = Accordionary.init("#my-accordion");

// Open/close all items
accordion.openAll();
accordion.closeAll();

// Control specific items by index
accordion.open(0); // Open first item
accordion.close(1); // Close second item
accordion.toggle(2); // Toggle third item

// Access individual item controllers
accordion.items[0].open();
accordion.items[0].close();
accordion.items[0].toggle();

// Access the DOM element
accordion.element; // HTMLElement
```

### TypeScript Support

Full TypeScript definitions are included:

```typescript
import Accordionary, {
  type AccordionController,
  type ItemController,
} from "accordionary";

const accordion: AccordionController | null =
  Accordionary.init("#my-accordion");
```

## Generating Accordions from JSON

When installed via package manager, you can generate accordion HTML from structured JSON data using the `generateAccordionary` function.

### Basic Usage

```typescript
import { generateAccordionary } from "accordionary";

const data = {
  items: [
    {
      heading: "Question 1",
      content: "Answer 1",
    },
    {
      heading: "Question 2",
      content: "Answer 2",
    },
  ],
};

// Generate the accordion element
const element = generateAccordionary(data);

// Append to DOM
document.body.appendChild(element);

// Initialize it
const accordion = Accordionary.init(element);
```

### Configuration Options

```typescript
const element = generateAccordionary(data, {
  icon: "▼", // HTML string for icon (default: "▼")
  openDefault: "none", // "all" | "first" | "none" (default: "none")
  allowMultiple: true, // Allow multiple items open (default: true)
  speed: 300, // Animation duration in ms (default: 300)
  easing: "ease", // CSS easing function (default: "ease")
  linked: false, // Link all items open/close together (default: false)
  classes: {
    component: ["my-accordion"], // Custom classes for component
    item: ["my-item"], // Custom classes for items
    heading: ["my-heading"], // Custom classes for headings
    content: ["my-content"], // Custom classes for content
    icon: ["my-icon"], // Custom classes for icons
  },
});
```

### Custom Icon

You can provide any HTML string for the icon - emoji, SVG, or image tag:

```typescript
// Emoji
const element = generateAccordionary(data, {
  icon: "👇",
});

// SVG
const element = generateAccordionary(data, {
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"/>
  </svg>`,
});

// Image
const element = generateAccordionary(data, {
  icon: '<img src="/chevron.svg" alt="">',
});
```

### Item-Level Configuration

Individual items can have their own configuration:

```typescript
const data = {
  items: [
    {
      heading: "Normal Item",
      content: "This item follows component defaults",
    },
    {
      heading: "Force Open Item",
      content: "This item starts open regardless of component settings",
      config: {
        openOverride: true,
      },
    },
    {
      heading: "Disabled Item",
      content: "This item cannot be toggled and is always visible",
      config: {
        disabled: true,
      },
    },
  ],
};
```

### HTML in Content

Both `heading` and `content` accept HTML strings:

```typescript
const data = {
  items: [
    {
      heading: '<div class="font-bold">Rich <em>Heading</em></div>',
      content: `
        <img src="/image.jpg" alt="Description">
        <p>Paragraph with <strong>bold text</strong></p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
        </ul>
      `,
    },
  ],
};
```

### TypeScript Support

Full type definitions are included:

```typescript
import {
  generateAccordionary,
  type AccordionData,
  type GeneratorConfig,
} from "accordionary";

const data: AccordionData = {
  items: [
    {
      heading: "Question",
      content: "Answer",
    },
  ],
};

const config: GeneratorConfig = {
  openDefault: "first",
  classes: {
    component: ["custom-accordion"],
  },
};

const element = generateAccordionary(data, config);
```

## Accessibility

Accordionary is built with accessibility in mind:

- Headers have `role="button"` and are keyboard focusable
- `aria-expanded` indicates open/closed state
- `aria-controls` links headers to content panels
- Content panels have `role="region"` and `aria-labelledby`
- Full keyboard support (Enter and Space to toggle)
- Disabled items have `aria-disabled="true"`
- Respects `prefers-reduced-motion` (disables animations automatically)

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## License

GPL-3.0-or-later
