/**
 * Accordionary - DOM Selection Utilities
 *
 * Helper functions for selecting elements and reading attributes
 * using the accordionary attribute naming convention.
 */

/** Attribute prefix for all accordionary selectors */
const prefix = "accordionary";

/**
 * Gets a configuration attribute value from an element.
 *
 * @param element - The element to read from
 * @param name - The attribute name (without prefix)
 * @returns The attribute value, or null if not set
 *
 * @example
 * // Reads "accordionary-open" attribute
 * getAttr(element, "open")
 */
export function getAttr(element: HTMLElement, name: string): string | null {
  return element.getAttribute(`${prefix}-${name}`);
}

/**
 * Selects a single element by accordionary attribute value.
 *
 * @param selector - The attribute value to match
 * @param parent - The parent element to search within (default: document)
 * @returns The matching element
 * @throws Error if no matching element is found
 *
 * @example
 * // Finds [accordionary="header"] within an item
 * select("header", itemElement)
 */
export function select(
  selector: string,
  parent: HTMLElement | Document = document,
): HTMLElement {
  const element = parent.querySelector(
    `[${prefix}="${selector}"]`,
  ) as HTMLElement;

  if (!element) {
    throw new Error(`Element not found using selector: ${selector}`);
  }

  return element;
}

/**
 * Selects all elements matching an accordionary attribute value.
 *
 * @param selector - The attribute value to match
 * @param parent - The parent element to search within (default: document)
 * @returns NodeList of matching elements
 *
 * @example
 * // Finds all [accordionary="item"] within a component
 * selectAll("item", componentElement)
 */
export function selectAll(
  selector: string,
  parent: HTMLElement | Document = document,
): NodeListOf<HTMLElement> {
  return parent.querySelectorAll(
    `[${prefix}="${selector}"]`,
  ) as NodeListOf<HTMLElement>;
}
