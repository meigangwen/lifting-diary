# UI Coding Standards

## Component Usage
- Only use shadcn/ui components for all UI in this project.
- Do not create custom UI components.
- Do not copy or fork shadcn/ui components into new local variants.
- If a needed UI pattern is missing, add the appropriate shadcn/ui
  component and use it as-is.

## Date Formatting
- Use date-fns for all date formatting.
- Format dates with day ordinals like:
  - 1st Sep 2025
  - 2nd Aug 2025
  - 3rd Jan 2026
  - 4th Jun 2024
- Recommended date-fns format string: `do MMM yyyy`.
