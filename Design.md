---
name: State Civic Modern
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dadf'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#ebeef3'
  surface-container-high: '#e5e8ee'
  surface-container-highest: '#e0e3e8'
  on-surface: '#181c20'
  on-surface-variant: '#3f4a3a'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eef1f6'
  outline: '#6f7a68'
  outline-variant: '#becab5'
  surface-tint: '#056e00'
  primary: '#056c00'
  on-primary: '#ffffff'
  primary-container: '#138808'
  on-primary-container: '#fbfff3'
  inverse-primary: '#72de5c'
  secondary: '#8f4e00'
  on-secondary: '#ffffff'
  secondary-container: '#fe9832'
  on-secondary-container: '#683700'
  tertiary: '#235da4'
  on-tertiary: '#ffffff'
  tertiary-container: '#4276be'
  on-tertiary-container: '#fffdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#8dfc75'
  primary-fixed-dim: '#72de5c'
  on-primary-fixed: '#012200'
  on-primary-fixed-variant: '#035300'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#ffb77a'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#6d3a00'
  tertiary-fixed: '#d5e3ff'
  tertiary-fixed-dim: '#a7c8ff'
  on-tertiary-fixed: '#001b3c'
  on-tertiary-fixed-variant: '#004689'
  background: '#f7f9ff'
  on-background: '#181c20'
  surface-variant: '#e0e3e8'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system is engineered for public sector excellence, focusing on trust, accessibility, and authoritative clarity. The brand personality is institutional yet progressive—moving away from legacy bureaucratic aesthetics toward a "Modern Civic" style. It utilizes a **Corporate / Modern** framework characterized by high legibility, structured layouts, and a palette that evokes national pride and official reliability. The emotional response should be one of confidence and ease, ensuring citizens feel supported by a stable and transparent digital infrastructure.

## Colors
The palette is rooted in the authoritative green and saffron of the civic identity, ensuring immediate brand recognition. 

- **Primary (#138808):** Used for primary actions, success states, and brand reinforcement.
- **Secondary (#FF9933):** Used as an accent for notifications, highlights, and interactive elements that require citizen attention without the urgency of an error.
- **Tertiary (#004B91):** A deep blue introduced for links and secondary navigation to maintain high-contrast accessibility.
- **Neutral (#212529):** A heavy slate used for typography and structural borders to ensure maximum readability against the white background.

Surface colors utilize very light tints of the primary green (e.g., #F0F7F0) to distinguish content sections without compromising the clean, white-space-heavy aesthetic.

## Typography
This design system utilizes **Public Sans**, an open-source typeface designed specifically for government interfaces. It is neutral, professional, and highly legible across all digital displays. 

Headlines use bold weights to establish a clear information hierarchy, while body text maintains a generous line height to assist users with cognitive or visual impairments. For mobile devices, the `display` and `headline-lg` styles scale down to prevent excessive word-breaking and ensure the content remains readable in a single-column view.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to ensure content density remains professional and easy to scan.

- **Desktop:** 12-column grid, 1140px max-width, 24px gutters.
- **Tablet:** 8-column fluid grid, 24px margins.
- **Mobile:** 4-column fluid grid, 16px margins.

The spacing rhythm is based on a 4px baseline. Components like cards and input groups should use `md` (16px) or `lg` (24px) padding to maintain an open, approachable feel. Large vertical sections are separated by `xl` (40px) to clearly define different service areas.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Low-contrast outlines** rather than heavy shadows, maintaining a clean, "flat" modern aesthetic.

1.  **Level 0 (Floor):** Pure white background (#FFFFFF).
2.  **Level 1 (Cards):** Use a subtle 1px border (#E0E0E0). No shadow.
3.  **Level 2 (Interactive):** When hovered, cards or buttons may gain a soft, diffused ambient shadow (8px blur, 4% opacity, neutral tint) to indicate "lift."
4.  **Level 3 (Modals):** These use a stronger shadow to separate from the background, paired with a semi-transparent dark overlay to focus user attention.

## Shapes
The design system uses a **Soft** shape language. This provides a balance between the "strict" sharp corners of traditional government forms and the "playful" roundedness of consumer apps. 

Standard components like buttons and inputs use a 4px (`0.25rem`) radius. Containers and cards use an 8px (`0.5rem`) radius. This subtle rounding humanizes the interface while retaining a sense of structured formality.

## Components
- **Buttons:** Primary buttons use a solid Primary Green (#138808) background with white text. Secondary buttons use an outline of the Primary Green. Interactive states (hover/active) should slightly darken the green.
- **Chips:** Used for filtering schemes; use a light tint of Secondary Saffron (#FFF5EB) with saffron text.
- **Input Fields:** High-contrast borders (1px solid #6C757D) that turn Primary Green on focus. Labels must always be visible above the field.
- **Cards:** White background with an 8px corner radius and a 1px neutral border. Use for grouping service links or news items.
- **Status Indicators:** 
    - *Success:* Primary Green.
    - *Pending:* Secondary Saffron.
    - *Warning/Error:* Standard high-visibility red (#D32F2F).
- **Data Tables:** Clean, no vertical borders, using a light green tint for the header background to reinforce the civic identity.