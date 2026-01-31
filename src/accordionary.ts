/**
 * Accordionary - Module Entry Point
 *
 * Exports the API for programmatic control of accordions.
 * Use this when installing via NPM for manual initialization.
 */

import { initAccordion } from "./init-accordion";
import { selectAll } from "./select-util";
import { generateAccordionary } from "./generate-accordion";
import type {
  AccordionController,
  ItemController,
  AccordionData,
  AccordionItemData,
  AccordionItemConfig,
  GeneratorConfig,
  GeneratorClasses,
} from "./types";

export type {
  AccordionController,
  ItemController,
  AccordionData,
  AccordionItemData,
  AccordionItemConfig,
  GeneratorConfig,
  GeneratorClasses,
};

/**
 * Initialize a single accordion component.
 *
 * @param element - The accordion component element or CSS selector
 * @returns Controller object with methods to control the accordion
 *
 * @example
 * const accordion = Accordionary.init('#my-accordion');
 * accordion.openAll();
 * accordion.close(0);
 */
export function init(
  element: HTMLElement | string,
): AccordionController | null {
  const el =
    typeof element === "string"
      ? (document.querySelector(element) as HTMLElement)
      : element;

  if (!el) {
    console.error(`[Accordionary] Element not found: ${element}`);
    return null;
  }

  return initAccordion(el);
}

/**
 * Initialize all accordion components on the page.
 *
 * @returns Array of controller objects for each accordion
 *
 * @example
 * const accordions = Accordionary.initAll();
 * accordions[0].openAll();
 */
export function initAll(): AccordionController[] {
  const components = selectAll("component");
  const controllers: AccordionController[] = [];

  for (const component of components) {
    const controller = initAccordion(component);
    if (controller) controllers.push(controller);
  }

  return controllers;
}

// Re-export the generator function
export { generateAccordionary };

// Default export for convenient importing
export default { init, initAll, generateAccordionary };
