/**
 * Accordionary - Item Initialization
 *
 * Handles individual accordion item setup including:
 * - Initial open/closed state
 * - Accessibility attributes (ARIA)
 * - Animation styles
 * - Click and keyboard event handlers
 */

import type { AccordionConfig, Item } from "./types";

/** Counter for generating unique IDs across items */
let itemIdCounter = 0;

/**
 * Initializes a single accordion item.
 *
 * Sets up accessibility, animations, and event handlers.
 * Handles item-level config overrides and coordinates with
 * sibling items for single-open mode.
 *
 * @param item - The item object with elements and config
 * @param accordionConfig - Component-level configuration
 * @param isFirst - Whether this is the first item (for "first" open mode)
 * @param allItems - All sibling items (for closing others in single mode)
 */
export function initItem(
  item: Item,
  accordionConfig: AccordionConfig,
  isFirst: boolean,
  allItems: Item[],
) {
  const { headingElement, contentElement, iconElement, config } = item;

  // Generate unique IDs for ARIA relationships
  const itemId = `accordionary-${itemIdCounter++}`;
  const headerId = `${itemId}-header`;
  const contentId = `${itemId}-content`;

  // Determine initial open state (item override > component default)
  let shouldOpenInitially = false;
  if (config.openOverride !== null) {
    shouldOpenInitially = config.openOverride;
  } else {
    if (accordionConfig.openDefault === "all") {
      shouldOpenInitially = true;
    } else if (accordionConfig.openDefault === "first" && isFirst) {
      shouldOpenInitially = true;
    }
  }

  let isOpen = shouldOpenInitially;

  // Build transition string (disabled if user prefers reduced motion)
  const { speed, easing, reduceMotion } = accordionConfig;
  const transition = reduceMotion ? "none" : `height ${speed}ms ${easing}`;
  const iconTransition = reduceMotion
    ? "none"
    : `transform ${speed}ms ${easing}`;

  // Configure content panel styles
  contentElement.style.overflow = "hidden";
  contentElement.style.transition = transition;
  contentElement.style.height = isOpen ? "auto" : "0px";

  // Make closed content non-focusable
  if (!isOpen) {
    contentElement.inert = true;
  }

  // Configure icon styles
  iconElement.style.transition = iconTransition;
  if (config.disabled) {
    iconElement.style.visibility = "hidden";
  } else if (isOpen) {
    iconElement.style.transform = "rotate(180deg)";
  }

  // Set up heading accessibility
  headingElement.id = headerId;
  headingElement.setAttribute("tabindex", config.disabled ? "-1" : "0");
  headingElement.setAttribute("role", "button");
  headingElement.setAttribute("aria-expanded", isOpen ? "true" : "false");
  headingElement.setAttribute("aria-controls", contentId);
  headingElement.style.cursor = config.disabled ? "default" : "pointer";

  if (config.disabled) {
    headingElement.setAttribute("aria-disabled", "true");
  }

  // Set up content panel accessibility
  contentElement.id = contentId;
  contentElement.setAttribute("role", "region");
  contentElement.setAttribute("aria-labelledby", headerId);

  /**
   * Expands the content panel with animation.
   */
  function open() {
    if (isOpen) return;
    isOpen = true;
    contentElement.inert = false;
    contentElement.style.height = `${contentElement.scrollHeight}px`;
    iconElement.style.transform = "rotate(180deg)";
    headingElement.setAttribute("aria-expanded", "true");
  }

  /**
   * Collapses the content panel with animation.
   */
  function close() {
    if (!isOpen) return;
    isOpen = false;
    contentElement.inert = true;
    // Set explicit height first (can't animate from "auto")
    contentElement.style.height = `${contentElement.scrollHeight}px`;
    contentElement.offsetHeight; // Force reflow
    contentElement.style.height = "0px";
    iconElement.style.transform = "rotate(0deg)";
    headingElement.setAttribute("aria-expanded", "false");
  }

  /**
   * Toggles the item open/closed.
   * In linked mode, syncs all non-disabled items to the same state.
   * In single-open mode, closes other items first.
   */
  function toggle() {
    if (config.disabled) return;

    if (accordionConfig.linked) {
      // Linked mode: all non-disabled items match this item's new state
      if (isOpen) {
        for (const otherItem of allItems) {
          if (!otherItem.config.disabled) otherItem.close?.();
        }
      } else {
        for (const otherItem of allItems) {
          if (!otherItem.config.disabled) otherItem.open?.();
        }
      }
    } else if (isOpen) {
      close();
    } else {
      // Close siblings in single-open mode
      if (!accordionConfig.allowMultiple) {
        for (const otherItem of allItems) {
          if (otherItem !== item && otherItem.close) {
            otherItem.close();
          }
        }
      }
      open();
    }
  }

  // Expose control functions for external access
  item.open = open;
  item.close = close;
  item.toggle = toggle;

  // Event: click to toggle
  headingElement.addEventListener("click", toggle);

  // Event: keyboard navigation (Enter/Space)
  headingElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  });

  // Event: set height to "auto" after expand animation completes
  contentElement.addEventListener("transitionend", () => {
    if (isOpen) {
      contentElement.style.height = "auto";
    }
  });
}
