# accordionary

A lightweight, accessible, vanilla JavaScript accordion with zero dependencies. Perfect for Webflow, static sites, or anywhere you need a simple accordion.

## Features

- Zero dependencies
- ARIA compliant
- Keyboard navigation (Enter/Space)
- Smooth, customizable animations
- Respects `prefers-reduced-motion`
- Configurable via HTML attributes
- Programmatic API for full control
- TypeScript support
- ~4KB minified

## Installation

### Browser (Auto-Initialize)

Download `dist/accordionary.js` and include it in your HTML:

```html
<script src="your-url/accordionary.js"></script>
```

Or link directly from GitHub (replace `v1.0.0` with the desired version):

```html
<script src="https://cdn.jsdelivr.net/gh/briantucker/accordionary@v1.0.0/dist/accordionary.js"></script>
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

| Attribute               | Values                 | Default | Description                        |
| ----------------------- | ---------------------- | ------- | ---------------------------------- |
| `accordionary-open`     | `all`, `first`, `none` | `none`  | Which items to open by default     |
| `accordionary-multiple` | `true`, `false`        | `true`  | Allow multiple items open at once  |
| `accordionary-speed`    | number (ms)            | `300`   | Animation duration in milliseconds |
| `accordionary-easing`   | CSS easing             | `ease`  | Animation easing function          |

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
