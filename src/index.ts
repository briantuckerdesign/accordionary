/**
 * Accordionary - Entry Point
 *
 * Auto-initializes all accordion components on the page.
 * Waits for DOM ready if needed, then finds and initializes
 * all elements with [accordionary="component"].
 */

import { initAccordion } from "./init-accordion";
import { selectAll } from "./select-util";

/**
 * Finds and initializes all accordion components on the page.
 */
function main() {
  const components = selectAll("component");
  for (const component of components) initAccordion(component);
}

// Initialize on DOM ready, or immediately if already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
