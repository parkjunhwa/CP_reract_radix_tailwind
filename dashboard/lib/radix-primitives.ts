export type RadixPrimitive = {
  slug: string;
  title: string;
  description: string;
};

export const RADIX_PRIMITIVES: readonly RadixPrimitive[] = [
  { slug: "accordion", title: "Accordion", description: "Reveal content sections under headings." },
  { slug: "alert-dialog", title: "Alert Dialog", description: "Interrupt the user with important content." },
  { slug: "aspect-ratio", title: "Aspect Ratio", description: "Maintain content within a desired ratio." },
  { slug: "avatar", title: "Avatar", description: "User image with a fallback." },
  { slug: "checkbox", title: "Checkbox", description: "Toggle between checked and not checked." },
  { slug: "collapsible", title: "Collapsible", description: "Expand/collapse a panel." },
  { slug: "context-menu", title: "Context Menu", description: "Menu triggered by right click or long press." },
  { slug: "dialog", title: "Dialog", description: "Modal window rendered in a portal." },
  { slug: "dropdown-menu", title: "Dropdown Menu", description: "Actions menu triggered by a button." },
  { slug: "form", title: "Form", description: "Collect input with validation rules." },
  { slug: "hover-card", title: "Hover Card", description: "Preview rich content behind a link." },
  { slug: "label", title: "Label", description: "Accessible label for controls." },
  { slug: "menubar", title: "Menubar", description: "Persistent desktop-style command menus." },
  { slug: "navigation-menu", title: "Navigation Menu", description: "A collection of links for navigating websites." },
  { slug: "one-time-password-field", title: "One-Time Password Field", description: "Single-character inputs for OTP verification." },
  { slug: "password-toggle-field", title: "Password Toggle Field", description: "Password input with a visibility toggle button." },
  { slug: "popover", title: "Popover", description: "Rich content in a portal triggered by a button." },
  { slug: "progress", title: "Progress", description: "Progress indicator for a task." },
  { slug: "radio-group", title: "Radio Group", description: "Single selection from a set of options." },
  { slug: "scroll-area", title: "Scroll Area", description: "Customizable scroll container." },
  { slug: "select", title: "Select", description: "Pick an option from a list." },
  { slug: "separator", title: "Separator", description: "Visually or semantically separate content." },
  { slug: "slider", title: "Slider", description: "Select a value within a range." },
  { slug: "switch", title: "Switch", description: "Two-state toggle control." },
  { slug: "tabs", title: "Tabs", description: "Layered sections of content shown one at a time." },
  { slug: "toast", title: "Toast", description: "Succinct, temporary messages." },
  { slug: "toggle", title: "Toggle", description: "Two-state button that can be on or off." },
  { slug: "toggle-group", title: "Toggle Group", description: "Set of toggle buttons." },
  { slug: "toolbar", title: "Toolbar", description: "Group controls like buttons and menus." },
  { slug: "tooltip", title: "Tooltip", description: "Popup info on hover or focus." },
] as const;

export function getRadixPrimitive(slug: string): RadixPrimitive | undefined {
  return RADIX_PRIMITIVES.find((p) => p.slug === slug);
}

