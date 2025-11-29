# Design System Guide

This document outlines the design aesthetic and principles used throughout this project. Follow these guidelines to maintain design consistency.

## Design Philosophy

**Refined Minimalism**: The design embraces a sophisticated, editorial aesthetic inspired by high-quality publishing. Every element is intentional, with generous spacing and careful typography creating a sense of calm and focus.

**Key Principles**:
- Clarity over decoration
- Typography as the primary design element
- Generous negative space
- Subtle, purposeful animations
- Accessibility and readability first
- Dark mode as a first-class citizen

## Typography System

### Font Families
```css
/* Always import these fonts */
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');

font-family: 'Crimson Pro', serif;  /* For headings and titles */
font-family: 'DM Sans', -apple-system, sans-serif;  /* For body text */
```

### Typography Scale
```css
/* Large Display Titles */
.hero-title {
  font-family: 'Crimson Pro', serif;
  font-size: 56px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Page Titles */
.page-title {
  font-family: 'Crimson Pro', serif;
  font-size: 42px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Section Titles */
.section-title {
  font-family: 'Crimson Pro', serif;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

/* Card/Item Titles */
.item-title {
  font-family: 'Crimson Pro', serif;
  font-size: 22px-28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

/* Body Text */
.body-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px-16px;
  line-height: 1.7-1.8;
  color: #666;
}

/* Small Labels */
.label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
}

/* Metadata */
.meta {
  font-size: 13px;
  color: #666;
}
```

## Color Palette

### Light Mode (Default)
```css
/* Backgrounds */
--bg-primary: #fafafa;
--bg-secondary: white;
--bg-tertiary: #f5f5f5;

/* Text */
--text-primary: #1a1a1a;
--text-secondary: #666;
--text-tertiary: #999;

/* Borders */
--border-primary: #e0e0e0;
--border-hover: #999;
--border-active: #1a1a1a;

/* Accents */
--accent-subtle: #f5f5f5;
```

### Dark Mode
```css
/* Backgrounds */
--bg-primary: #1a1a1a;
--bg-secondary: #1a1a1a;
--bg-tertiary: #2a2a2a;

/* Text */
--text-primary: #fafafa;
--text-secondary: #999;
--text-tertiary: #666;

/* Borders */
--border-primary: #333;
--border-hover: #666;
--border-active: #fafafa;

/* Accents */
--accent-subtle: #2a2a2a;
```

### Implementation
```css
/* Always include dark mode support */
@media (prefers-color-scheme: dark) {
  .component {
    background: #1a1a1a;
    color: #fafafa;
    border-color: #333;
  }
}
```

## Spacing System

Use multiples of 4px for consistency:

```css
/* Micro spacing */
gap: 8px;
padding: 12px;

/* Small spacing */
gap: 16px;
padding: 20px 24px;

/* Medium spacing */
gap: 24px;
margin-bottom: 32px;
padding: 32px;

/* Large spacing */
gap: 40px;
margin-bottom: 48px;
padding: 48px 60px;

/* Extra large spacing */
margin-bottom: 60px;
padding: 80px 40px;
```

## Layout Patterns

### Single Column (Reading-focused)
```css
.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 40px 120px;
}
```

### Two-Column Split (45/55)
```css
.two-column {
  display: flex;
}

.left-column {
  position: fixed;
  left: 0;
  top: 0;
  width: 45%;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
}

.right-column {
  margin-left: 45%;
  width: 55%;
  padding: 48px 40px 48px 60px;
}
```

### Grid Layout
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
}
```

## Animation System

### Standard Fade-In
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

### Staggered Animations
```vue
<div
  v-for="(item, index) in items"
  class="fade-in"
  :style="`animation-delay: ${0.3 + index * 0.1}s`"
>
```

### Hover Transitions
```css
.interactive {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive:hover {
  transform: translateY(-2px);
  border-color: #999;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}
```

### Loading Spinner
```css
.spinner {
  width: 48px;
  height: 48px;
  border: 2px solid #e0e0e0;
  border-top-color: #1a1a1a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## Component Patterns

### Cards
```css
.card {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
  border-color: #999;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}
```

### Links
```css
.link {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.link:hover {
  opacity: 0.6;
}
```

### Buttons
```css
.button {
  padding: 12px 24px;
  background: #1a1a1a;
  color: #fafafa;
  border: 1px solid #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.button:hover {
  opacity: 0.8;
}
```

### Section Labels
```css
.section-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
  margin-bottom: 16px;
}
```

## Borders & Dividers

```css
/* Standard border */
border: 1px solid #e0e0e0;

/* Section divider */
border-bottom: 1px solid #e0e0e0;
padding-bottom: 32px;
margin-bottom: 32px;

/* Hover border */
.card:hover {
  border-color: #999; /* or #1a1a1a for stronger emphasis */
}
```

## Custom Scrollbars

```css
.scrollable::-webkit-scrollbar {
  width: 6px;
}

.scrollable::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 3px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
```

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .content-wrapper {
    padding: 32px 24px;
  }

  /* Convert two-column to single column */
  .left-column {
    position: relative;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }

  .right-column {
    margin-left: 0;
    width: 100%;
    padding: 32px 24px;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  /* Typically handle two-column layouts */
}
```

## Code Style Guidelines

### Vue Component Structure
```vue
<script setup lang="ts">
// Imports
// Component logic
// Refs and computed properties
// Functions
</script>

<template>
  <!-- Always include animations on page load -->
  <div class="component-name fade-in">
    <!-- Content -->
  </div>
</template>

<style scoped>
/* Import fonts at top */
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');

/* Animation definitions */
/* Base styles */
/* Component-specific styles */
/* Dark mode */
/* Responsive */
</style>
```

### CSS Organization
```css
/* 1. Animations */
@keyframes fadeInUp { }

/* 2. Layout/Container */
.component-wrapper { }

/* 3. Typography */
.title { }
.subtitle { }

/* 4. Interactive elements */
.button { }
.link { }

/* 5. States */
.loading { }
.error { }

/* 6. Dark mode */
@media (prefers-color-scheme: dark) { }

/* 7. Responsive */
@media (max-width: 768px) { }
```

## Don'ts

❌ Don't use rounded corners (border-radius) except for small elements like badges
❌ Don't use shadows except on hover states
❌ Don't use bright or saturated colors
❌ Don't use multiple font families beyond Crimson Pro and DM Sans
❌ Don't skip dark mode implementation
❌ Don't forget staggered animations on lists
❌ Don't use Tailwind classes—use custom CSS for full control

## Quick Reference

When creating a new page or component:

1. ✅ Import Crimson Pro + DM Sans fonts
2. ✅ Set background to #fafafa (light) or #1a1a1a (dark)
3. ✅ Use fade-in animations with staggered delays
4. ✅ Apply proper typography scale (Crimson Pro for headings, DM Sans for body)
5. ✅ Use 1px borders with #e0e0e0 (light) or #333 (dark)
6. ✅ Add hover states with subtle transforms and opacity changes
7. ✅ Implement full dark mode support
8. ✅ Test responsive behavior at 768px and 1024px breakpoints

## Example Implementation

```vue
<script setup lang="ts">
const items = ref([])
const loading = ref(true)
</script>

<template>
  <div class="page-wrapper">
    <!-- Header -->
    <header class="page-header fade-in">
      <h1 class="page-title">Page Title</h1>
      <p class="page-subtitle">Descriptive subtitle</p>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="loading-state fade-in" style="animation-delay: 0.2s">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Content -->
    <div v-else class="content-wrapper">
      <div class="section-label">Section Label</div>
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="item-card fade-in"
        :style="`animation-delay: ${0.3 + index * 0.1}s`"
      >
        <h2 class="item-title">{{ item.title }}</h2>
        <p class="item-description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.page-wrapper {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', -apple-system, sans-serif;
}

.page-header {
  padding: 48px 40px;
  border-bottom: 1px solid #e0e0e0;
}

.page-title {
  font-family: 'Crimson Pro', serif;
  font-size: 56px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.page-subtitle {
  font-size: 18px;
  font-style: italic;
  color: #666;
  margin: 0;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
}

.section-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
  margin-bottom: 24px;
}

.item-card {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 32px;
  margin-bottom: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.item-card:hover {
  transform: translateY(-2px);
  border-color: #999;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.item-title {
  font-family: 'Crimson Pro', serif;
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  letter-spacing: -0.01em;
}

.item-description {
  font-size: 15px;
  color: #666;
  line-height: 1.7;
  margin: 0;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 40px;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 2px solid #e0e0e0;
  border-top-color: #1a1a1a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  font-size: 14px;
  color: #999;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .page-wrapper {
    background: #1a1a1a;
  }

  .page-header {
    border-color: #333;
  }

  .page-title,
  .item-title {
    color: #fafafa;
  }

  .page-subtitle,
  .item-description {
    color: #999;
  }

  .section-label,
  .loading-state p {
    color: #666;
  }

  .item-card {
    background: #1a1a1a;
    border-color: #333;
  }

  .item-card:hover {
    border-color: #666;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    padding: 32px 24px;
  }

  .page-title {
    font-size: 40px;
  }

  .content-wrapper {
    padding: 40px 24px;
  }

  .item-card {
    padding: 24px;
  }

  .item-title {
    font-size: 24px;
  }
}
</style>
```

---

**Remember**: This design system prioritizes clarity, elegance, and timelessness. Every design decision should enhance readability and user focus. When in doubt, simplify.
