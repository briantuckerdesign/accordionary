import { test, expect, beforeAll } from "bun:test";
import { Window } from "happy-dom";
import { generateAccordionary } from "./generate-accordion";
import type { AccordionData } from "./types";

// Set up DOM environment
beforeAll(() => {
  const window = new Window();
  global.document = window.document as any;
  global.HTMLElement = window.HTMLElement as any;
});

test("generates basic accordion with default config", () => {
  const data: AccordionData = {
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

  const element = generateAccordionary(data);

  expect(element.tagName).toBe("DIV");
  expect(element.getAttribute("accordionary")).toBe("component");
  expect(element.children.length).toBe(2);

  // Check first item
  const firstItem = element.children[0] as HTMLElement;
  expect(firstItem.getAttribute("accordionary")).toBe("item");

  const header = firstItem.querySelector('[accordionary="header"]');
  expect(header).not.toBeNull();
  expect(header?.textContent).toContain("Question 1");

  const content = firstItem.querySelector('[accordionary="content"]');
  expect(content).not.toBeNull();
  expect(content?.innerHTML).toBe("Answer 1");

  const icon = firstItem.querySelector('[accordionary="icon"]');
  expect(icon).not.toBeNull();
  expect(icon?.innerHTML).toBe("▼");
});

test("applies custom config to component", () => {
  const data: AccordionData = {
    items: [
      {
        heading: "Test",
        content: "Content",
      },
    ],
  };

  const element = generateAccordionary(data, {
    openDefault: "first",
    allowMultiple: false,
    speed: 500,
    easing: "ease-in-out",
  });

  expect(element.getAttribute("accordionary-open")).toBe("first");
  expect(element.getAttribute("accordionary-multiple")).toBe("false");
  expect(element.getAttribute("accordionary-speed")).toBe("500");
  expect(element.getAttribute("accordionary-easing")).toBe("ease-in-out");
});

test("applies item-level config", () => {
  const data: AccordionData = {
    items: [
      {
        heading: "Normal",
        content: "Content",
      },
      {
        heading: "Open Override",
        content: "Content",
        config: {
          openOverride: true,
        },
      },
      {
        heading: "Disabled",
        content: "Content",
        config: {
          disabled: true,
        },
      },
    ],
  };

  const element = generateAccordionary(data);

  const items = element.children;
  const itemA = items[0] as Element;
  const itemB = items[1] as Element;
  const itemC = items[2] as Element;

  // First item should have no overrides
  expect(itemA.getAttribute("accordionary-open")).toBeNull();
  expect(itemA.getAttribute("accordionary-disable")).toBeNull();

  // Second item should have open override
  expect(itemB.getAttribute("accordionary-open")).toBe("true");

  // Third item should be disabled
  expect(itemC.getAttribute("accordionary-disable")).toBe("true");
});

test("applies custom classes", () => {
  const data: AccordionData = {
    items: [
      {
        heading: "Test",
        content: "Content",
      },
    ],
  };

  const element = generateAccordionary(data, {
    classes: {
      component: ["my-accordion", "custom-class"],
      item: ["my-item"],
      heading: ["my-heading"],
      content: ["my-content"],
      icon: ["my-icon"],
    },
  });

  expect(element.classList.contains("my-accordion")).toBe(true);
  expect(element.classList.contains("custom-class")).toBe(true);

  const item = element.children[0] as Element;
  expect(item.classList.contains("my-item")).toBe(true);

  const header = item.querySelector('[accordionary="header"]');
  expect(header?.classList.contains("my-heading")).toBe(true);

  const content = item.querySelector('[accordionary="content"]');
  expect(content?.classList.contains("my-content")).toBe(true);

  const icon = item.querySelector('[accordionary="icon"]');
  expect(icon?.classList.contains("my-icon")).toBe(true);
});

test("sets accordionary-link attribute when linked is true", () => {
  const data: AccordionData = {
    items: [
      {
        heading: "Test",
        content: "Content",
      },
    ],
  };

  // linked defaults to false — attribute should not be present
  const elementDefault = generateAccordionary(data);
  expect(elementDefault.getAttribute("accordionary-link")).toBeNull();

  // linked set to true — attribute should be present
  const elementLinked = generateAccordionary(data, { linked: true });
  expect(elementLinked.getAttribute("accordionary-link")).toBe("true");
});

test("uses custom icon HTML", () => {
  const data: AccordionData = {
    items: [
      {
        heading: "Test",
        content: "Content",
      },
    ],
  };

  const customIcon = "<svg>test</svg>";
  const element = generateAccordionary(data, {
    icon: customIcon,
  });

  const icon = element.querySelector('[accordionary="icon"]');
  expect(icon?.innerHTML).toBe(customIcon);
});

test("handles HTML in heading and content", () => {
  const data: AccordionData = {
    items: [
      {
        heading: '<div class="weight-medium">Question <strong>1</strong></div>',
        content: "<p>Answer with <em>emphasis</em></p>",
      },
    ],
  };

  const element = generateAccordionary(data);

  const header = element.querySelector('[accordionary="header"]');
  expect(header?.innerHTML).toContain('<div class="weight-medium">');
  expect(header?.innerHTML).toContain("<strong>1</strong>");

  const content = element.querySelector('[accordionary="content"]');
  expect(content?.innerHTML).toBe("<p>Answer with <em>emphasis</em></p>");
});
