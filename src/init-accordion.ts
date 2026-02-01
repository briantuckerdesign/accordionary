/**
 * Accordionary - Accordion Initialization
 *
 * Handles parsing component and item-level configuration from
 * HTML attributes and orchestrates item initialization.
 */

import { initItem } from "./init-item";
import { error, getAttr, select, selectAll, warn } from "./select-util";
import type {
  AccordionConfig,
  AccordionController,
  Item,
  ItemConfig,
  ItemController,
} from "./types";

/** Check if user prefers reduced motion */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/**
 * Initializes an accordion component.
 *
 * Reads configuration from HTML attributes:
 * - accordionary-open: "all" | "first" | "none" (default: "none")
 * - accordionary-multiple: "true" | "false" (default: "true")
 * - accordionary-speed: number in ms (default: 300)
 * - accordionary-easing: CSS easing function (default: "ease")
 *
 * @param component - The accordion component element
 * @returns Controller object with methods to control the accordion, or null if already initialized
 */
export function initAccordion(
  component: HTMLElement,
): AccordionController | null {
  // Prevent double initialization
  if (component.hasAttribute("data-accordionary-initialized")) return null;
  component.setAttribute("data-accordionary-initialized", "true");

  // Parse component-level configuration
  const openAttr = getAttr(component, "open");
  const multipleAttr = getAttr(component, "multiple");
  const speedAttr = getAttr(component, "speed");
  const easingAttr = getAttr(component, "easing");
  const linkAttr = getAttr(component, "link");

  // Validate accordionary-open attribute
  if (openAttr && !["all", "first", "none"].includes(openAttr)) {
    warn(
      `Invalid accordionary-open="${openAttr}". Expected "all", "first", or "none". Defaulting to "none".`,
      component,
    );
  }

  // Validate accordionary-multiple attribute
  if (multipleAttr && !["true", "false"].includes(multipleAttr)) {
    warn(
      `Invalid accordionary-multiple="${multipleAttr}". Expected "true" or "false". Defaulting to "true".`,
      component,
    );
  }

  // Validate accordionary-link attribute
  if (linkAttr && !["true", "false"].includes(linkAttr)) {
    warn(
      `Invalid accordionary-link="${linkAttr}". Expected "true" or "false". Defaulting to "false".`,
      component,
    );
  }

  // Validate accordionary-speed attribute
  const parsedSpeed = speedAttr ? parseInt(speedAttr, 10) : 300;
  if (speedAttr && (isNaN(parsedSpeed) || parsedSpeed < 0)) {
    warn(
      `Invalid accordionary-speed="${speedAttr}". Expected a positive number in milliseconds. Defaulting to 300.`,
      component,
    );
  }

  const config: AccordionConfig = {
    openDefault:
      openAttr === "all" || openAttr === "first" ? openAttr : "none",
    allowMultiple: multipleAttr !== "false",
    speed: isNaN(parsedSpeed) || parsedSpeed < 0 ? 300 : parsedSpeed,
    easing: easingAttr || "ease",
    reduceMotion: prefersReducedMotion,
    linked: linkAttr === "true",
  };

  // Collect all items with their elements and configuration
  const items: Item[] = [];
  const itemElements = selectAll("item", component);

  // Warn if no items found
  if (itemElements.length === 0) {
    warn(
      `No items found. Add elements with accordionary="item" inside your component.`,
      component,
    );
    return null;
  }

  for (const itemElement of itemElements) {
    const headingElement = select("header", itemElement);
    const contentElement = select("content", itemElement);
    const iconElement = select("icon", itemElement);

    // Validate required child elements
    if (!headingElement) {
      error(
        `Missing header element. Add accordionary="header" inside this item.`,
        itemElement,
      );
      continue;
    }
    if (!contentElement) {
      error(
        `Missing content element. Add accordionary="content" inside this item.`,
        itemElement,
      );
      continue;
    }
    if (!iconElement) {
      error(
        `Missing icon element. Add accordionary="icon" inside your header.`,
        itemElement,
      );
      continue;
    }

    // Parse item-level configuration
    const itemOpenAttr = getAttr(itemElement, "open");
    const itemDisableAttr = getAttr(itemElement, "disable");

    // Validate item-level accordionary-open attribute
    if (itemOpenAttr && !["true", "false"].includes(itemOpenAttr)) {
      warn(
        `Invalid accordionary-open="${itemOpenAttr}" on item. Expected "true" or "false".`,
        itemElement,
      );
    }

    const itemConfig: ItemConfig = {
      openOverride:
        itemOpenAttr === "true"
          ? true
          : itemOpenAttr === "false"
            ? false
            : null,
      disabled: itemDisableAttr === "true",
    };

    items.push({
      element: itemElement,
      headingElement,
      contentElement,
      iconElement,
      config: itemConfig,
    });
  }

  // Initialize each item with shared context
  items.forEach((item, index) => {
    initItem(item, config, index === 0, items);
  });

  // Build item controllers
  const itemControllers: ItemController[] = items.map((item) => ({
    element: item.element,
    open: () => item.open?.(),
    close: () => item.close?.(),
    toggle: () => item.toggle?.(),
  }));

  // Return accordion controller
  return {
    element: component,
    openAll: () => {
      for (const item of items) item.open?.();
    },
    closeAll: () => {
      for (const item of items) item.close?.();
    },
    open: (index: number) => {
      items[index]?.open?.();
    },
    close: (index: number) => {
      items[index]?.close?.();
    },
    toggle: (index: number) => {
      items[index]?.toggle?.();
    },
    items: itemControllers,
  };
}
