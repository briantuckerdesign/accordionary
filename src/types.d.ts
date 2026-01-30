/**
 * Accordionary - Type Definitions
 */

/**
 * Component-level configuration parsed from HTML attributes.
 */
interface AccordionConfig {
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
interface ItemConfig {
  /** Override for initial open state (null = inherit from component) */
  openOverride: boolean | null;
  /** Whether the item is non-interactive and always open */
  disabled: boolean;
}

/**
 * Represents an accordion item with its DOM elements and configuration.
 */
interface Item {
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
}
