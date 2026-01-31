/**
 * Accordionary - Type Definitions
 */

/**
 * Component-level configuration parsed from HTML attributes.
 */
export interface AccordionConfig {
  /** Which items to open by default: "all", "first", or "none" */
  openDefault: "all" | "first" | "none";
  /** Whether multiple items can be open simultaneously */
  allowMultiple: boolean;
  /** Animation duration in milliseconds */
  speed: number;
  /** CSS easing function for animations */
  easing: string;
  /** Whether to disable animations (respects prefers-reduced-motion) */
  reduceMotion: boolean;
}

/**
 * Item-level configuration parsed from HTML attributes.
 */
export interface ItemConfig {
  /** Override for initial open state (null = inherit from component) */
  openOverride: boolean | null;
  /** Whether the item is non-interactive and always open */
  disabled: boolean;
}

/**
 * Represents an accordion item with its DOM elements and configuration.
 */
export interface Item {
  /** The item container element */
  element: HTMLElement;
  /** The clickable header element */
  headingElement: HTMLElement;
  /** The collapsible content panel */
  contentElement: HTMLElement;
  /** The expand/collapse indicator icon */
  iconElement: HTMLElement;
  /** Item-specific configuration */
  config: ItemConfig;
  /** Close function exposed for sibling coordination */
  close?: () => void;
  /** Open function exposed for external control */
  open?: () => void;
  /** Toggle function exposed for external control */
  toggle?: () => void;
}

/**
 * Control methods for an individual accordion item.
 */
export interface ItemController {
  /** The item's container element */
  element: HTMLElement;
  /** Open this item */
  open: () => void;
  /** Close this item */
  close: () => void;
  /** Toggle this item open/closed */
  toggle: () => void;
}

/**
 * Control methods for an accordion component.
 */
export interface AccordionController {
  /** The accordion's container element */
  element: HTMLElement;
  /** Open all items */
  openAll: () => void;
  /** Close all items */
  closeAll: () => void;
  /** Open item at index */
  open: (index: number) => void;
  /** Close item at index */
  close: (index: number) => void;
  /** Toggle item at index */
  toggle: (index: number) => void;
  /** Get all item controllers */
  items: ItemController[];
}

/**
 * Configuration for a single accordion item in generated data.
 */
export interface AccordionItemConfig {
  /** Override for initial open state */
  openOverride?: boolean;
  /** Whether the item is non-interactive and always open */
  disabled?: boolean;
}

/**
 * Data for a single accordion item.
 */
export interface AccordionItemData {
  /** HTML content for the heading */
  heading: string;
  /** HTML content for the collapsible content */
  content: string;
  /** Optional item-specific configuration */
  config?: AccordionItemConfig;
}

/**
 * Data structure for accordion generation.
 */
export interface AccordionData {
  /** Array of accordion items */
  items: AccordionItemData[];
}

/**
 * CSS class names to apply to generated accordion elements.
 */
export interface GeneratorClasses {
  /** Classes for the accordion component container */
  component?: string[];
  /** Classes for each accordion item */
  item?: string[];
  /** Classes for each accordion heading */
  heading?: string[];
  /** Classes for each accordion content panel */
  content?: string[];
  /** Classes for each accordion icon */
  icon?: string[];
}

/**
 * Configuration options for accordion generation.
 */
export interface GeneratorConfig {
  /** HTML string for the expand/collapse icon (default: "▼") */
  icon?: string;
  /** Which items to open by default: "all", "first", or "none" (default: "none") */
  openDefault?: "all" | "first" | "none";
  /** Whether multiple items can be open simultaneously (default: false) */
  allowMultiple?: boolean;
  /** Animation duration in milliseconds (default: 300) */
  speed?: number;
  /** CSS easing function for animations (default: "ease") */
  easing?: string;
  /** Optional CSS class names to apply to elements */
  classes?: GeneratorClasses;
}
