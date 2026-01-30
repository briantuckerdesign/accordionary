/**
 * Accordionary - Accordion Initialization
 *
 * Handles parsing component and item-level configuration from
 * HTML attributes and orchestrates item initialization.
 */

import { initItem } from "./init-item";
import { getAttr, select, selectAll } from "./select-util";

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
 */
export function initAccordion(component: HTMLElement) {
  // Prevent double initialization
  if (component.hasAttribute("data-accordionary-initialized")) return;
  component.setAttribute("data-accordionary-initialized", "true");

  // Parse component-level configuration
  const openAttr = getAttr(component, "open");
  const multipleAttr = getAttr(component, "multiple");
  const speedAttr = getAttr(component, "speed");
  const easingAttr = getAttr(component, "easing");

  const config: AccordionConfig = {
    openDefault:
      openAttr === "all" || openAttr === "first" ? openAttr : "none",
    allowMultiple: multipleAttr !== "false",
    speed: speedAttr ? parseInt(speedAttr, 10) : 300,
    easing: easingAttr || "ease",
    reduceMotion: prefersReducedMotion,
  };

  // Collect all items with their elements and configuration
  const items: Item[] = [];
  const itemElements = selectAll("item", component);

  for (const itemElement of itemElements) {
    const headingElement = select("header", itemElement);
    const contentElement = select("content", itemElement);
    const iconElement = select("icon", itemElement);

    // Parse item-level configuration
    const itemOpenAttr = getAttr(itemElement, "open");
    const itemDisableAttr = getAttr(itemElement, "disable");

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
}
