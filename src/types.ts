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
