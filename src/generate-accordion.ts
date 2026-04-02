/**
 * Accordionary - Accordion Generator
 *
 * Generates accordion HTML elements from structured JSON data.
 * For use with package managers only (not browser implementation).
 */

import type { AccordionData, AccordionItemData, GeneratorConfig } from "./types";

/**
 * Generates an accordion element from JSON data.
 *
 * @param data - The accordion data with items array
 * @param config - Optional configuration for the accordion
 * @returns An HTMLElement ready to be appended to the DOM and initialized
 *
 * @example
 * ```typescript
 * const data = {
 *   items: [
 *     {
 *       heading: "Question 1",
 *       content: "Answer 1",
 *     },
 *     {
 *       heading: "Question 2",
 *       content: "Answer 2",
 *       config: { openOverride: true }
 *     }
 *   ]
 * };
 *
 * const element = generateAccordionary(data, {
 *   icon: "▼",
 *   openDefault: "none",
 *   allowMultiple: true,
 *   speed: 300,
 *   easing: "ease",
 *   classes: {
 *     component: ["my-accordion"],
 *     item: ["my-item"],
 *   }
 * });
 *
 * document.body.appendChild(element);
 * const accordion = Accordionary.init(element);
 * ```
 */
export function generateAccordionary(data: AccordionData, config: GeneratorConfig = {}): HTMLElement {
    const { icon = "▼", iconOpen, iconClose, openDefault = "none", allowMultiple = true, speed = 300, easing = "ease", linked = false, classes = {} } = config;

    // Determine icon mode: swap (iconOpen + iconClose provided) vs rotate (default)
    const useSwapMode = iconOpen !== undefined && iconClose !== undefined;

    // Create the component container
    const component = document.createElement("div");
    component.setAttribute("accordionary", "component");

    // Set component-level attributes
    if (openDefault !== "none") {
        component.setAttribute("accordionary-open", openDefault);
    }
    if (!allowMultiple) {
        component.setAttribute("accordionary-multiple", "false");
    }
    if (speed !== 300) {
        component.setAttribute("accordionary-speed", speed.toString());
    }
    if (easing !== "ease") {
        component.setAttribute("accordionary-easing", easing);
    }
    if (linked) {
        component.setAttribute("accordionary-link", "true");
    }

    // Add custom classes to component
    if (classes.component) {
        component.classList.add(...classes.component);
    }

    // Generate items
    for (const itemData of data.items) {
        const item = generateItem(itemData, useSwapMode ? "" : icon, useSwapMode ? iconOpen! : undefined, useSwapMode ? iconClose! : undefined, classes);
        component.appendChild(item);
    }

    return component;
}

/**
 * Generates a single accordion item element.
 *
 * @param itemData - Data for the item (heading, content, config)
 * @param icon - HTML string for the icon (rotate mode)
 * @param iconOpen - HTML string for the open icon (swap mode)
 * @param iconClose - HTML string for the close icon (swap mode)
 * @param classes - Optional class names to apply
 * @returns An HTMLElement representing the accordion item
 */
function generateItem(itemData: AccordionItemData, icon: string, iconOpen: string | undefined, iconClose: string | undefined, classes: NonNullable<GeneratorConfig["classes"]>): HTMLElement {
    const { heading, content, config = {} } = itemData;

    // Create item container
    const item = document.createElement("div");
    item.setAttribute("accordionary", "item");

    // Set item-level attributes
    if (config.openOverride !== undefined) {
        item.setAttribute("accordionary-open", config.openOverride.toString());
    }
    if (config.disabled) {
        item.setAttribute("accordionary-disable", "true");
    }

    // Add custom classes to item
    if (classes.item) {
        item.classList.add(...classes.item);
    }

    // Create header
    const header = document.createElement("div");
    header.setAttribute("accordionary", "header");
    header.innerHTML = heading;

    // Add custom classes to header
    if (classes.heading) {
        header.classList.add(...classes.heading);
    }

    // Create icon
    const iconElement = document.createElement("span");
    iconElement.setAttribute("accordionary", "icon");

    if (iconOpen !== undefined && iconClose !== undefined) {
        // Swap mode: create open and close child elements
        const iconOpenElement = document.createElement("span");
        iconOpenElement.setAttribute("accordionary", "icon-open");
        iconOpenElement.innerHTML = iconOpen;

        const iconCloseElement = document.createElement("span");
        iconCloseElement.setAttribute("accordionary", "icon-close");
        iconCloseElement.innerHTML = iconClose;

        iconElement.appendChild(iconOpenElement);
        iconElement.appendChild(iconCloseElement);
    } else {
        // Rotate mode: single icon content
        iconElement.innerHTML = icon;
    }

    // Add custom classes to icon
    if (classes.icon) {
        iconElement.classList.add(...classes.icon);
    }

    // Append icon to header
    header.appendChild(iconElement);

    // Create content
    const contentElement = document.createElement("div");
    contentElement.setAttribute("accordionary", "content");
    contentElement.innerHTML = content;

    // Add custom classes to content
    if (classes.content) {
        contentElement.classList.add(...classes.content);
    }

    // Assemble item
    item.appendChild(header);
    item.appendChild(contentElement);

    return item;
}
