# Front-End Test

A responsive project gallery application built with Vue 3, TypeScript, and Tailwind CSS, featuring smooth animations powered by the View Transitions API.

## 🎯 Project Overview

This application displays a collection of architecture projects in a grid layout. When a project is selected, it smoothly morphs to a full-screen detail view using modern web animation techniques. The implementation follows atomic design principles and emphasizes accessibility, performance, and clean code organization.

## 🛠 Tech Stack

- **Vue 3.5.24** - Composition API with script setup syntax
- **TypeScript 5.9.3** - Strict type safety throughout
- **Vite 7.2.4** - Fast build tool and dev server
- **Tailwind CSS 4.1.17** - Utility-first CSS framework (v4 with CSS-first config)
- **View Transitions API** - Native browser morphing animations

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/              # Basic building blocks
│   │   └── CTALink.vue
│   ├── molecules/          # Simple combinations
│   │   └── ProjectCard.vue
│   ├── organisms/          # Complex sections
│   │   ├── ProjectGrid.vue
│   │   └── ProjectDetail.vue
│   └── templates/          # Page layouts
│       └── MainLayout.vue
├── composables/            # Reusable composition functions
│   ├── useProjects.ts      # Project data management
│   ├── useProjectNavigation.ts  # Navigation state
│   ├── useIntroAnimation.ts     # Intro sequence
│   └── useFocusTrap.ts          # Accessibility helper
├── constants/
│   └── animation.ts        # Animation timing & easing constants
├── services/
│   └── api.ts              # Mock API service
├── types/
│   └── index.ts            # TypeScript interfaces
├── utils/
│   └── animationFrame.ts   # Animation coordination helpers
├── App.vue                 # Root component
├── main.ts                 # Application entry
└── style.css              # Global styles & Tailwind config
```

## 🎨 Component Architecture

Following **Atomic Design** principles for scalable component organization:

- **Atoms**: `CTALink.vue` - Reusable link with hover animation
- **Molecules**: `ProjectCard.vue` - Project thumbnail with image, title, and date
- **Organisms**: `ProjectGrid.vue`, `ProjectDetail.vue` - Complex layouts
- **Templates**: `MainLayout.vue` - Overall page structure with hero section

## 🎭 Key Implementation Methods

### View Transitions API

The core animation feature uses the **View Transitions API**, a modern browser standard that automatically morphs elements between states.

**Why View Transitions over FLIP?**

- **Simpler implementation**: Browser handles position/transform calculations automatically
- **Smoother animations**: GPU-optimized morphing by the browser
- **Less code**: No manual element cloning or position tracking
- **Better performance**: Native browser feature designed for this use case

**How it works:**

1. Selected card image is tagged with `view-transition-name: project-image`
2. Detail view image has the same `view-transition-name`
3. When transitioning, `document.startViewTransition()` morphs between them
4. Custom CSS configures timing (800ms) and easing (cubic-bezier)
5. Graceful fallback for browsers without support

### State Management with Composables

Using Vue 3's Composition API for clean, reusable state logic:

- **useProjects**: Handles async data fetching, loading, and error states
- **useProjectNavigation**: Manages selected project and navigation state
- **useIntroAnimation**: Orchestrates page intro sequence (logo → subtitle → grid)
- **useFocusTrap**: Ensures keyboard focus stays within modal detail view

No external state management library needed - composables handle all reactive state.

### Animation Coordination

JavaScript coordinates timing while CSS handles visual transitions:

- **Centralized constants**: All timing values in `constants/animation.ts`
- **Animation frame utilities**: Helpers wrap `requestAnimationFrame` for precise timing
- **Sequenced animations**: Intro, card-to-detail, and exit animations carefully orchestrated
- **GPU acceleration**: Only `transform` and `opacity` properties animated

### Mock API Service

Simulates CMS data fetching with:

- 6 project records with CDN-style image URLs
- Full TypeScript type safety

## ♿ Accessibility Features

Built with accessibility as a priority, not an afterthought:

- ✅ **Keyboard navigation**: Full Tab, Enter support
- ✅ **Focus management**: Focus trap in detail view, restored on close
- ✅ **ARIA labels**: Descriptive labels for screen readers
- ✅ **Semantic HTML**: Proper use of `<article>`, `<nav>`, `<time>`, etc.
- ✅ **Motion preferences**: Respects `prefers-reduced-motion` (reduces animations to 0.01ms)

## 🎯 Key Design Decisions

**Tailwind CSS v4**: Chose modern CSS-first configuration for cleaner architecture and better developer experience

**Composition API**: Vue 3's recommended approach for better TypeScript inference, code reusability, and clear separation of concerns

**No External Libraries for Animations**: Leveraging native browser features (View Transitions API) reduces bundle size and improves performance

**Atomic Design**: Scalable component structure makes it easy to understand hierarchy and maintain consistency

## 🔧 Development

### TypeScript Configuration

- Strict mode enabled for maximum type safety
- No implicit `any` types allowed
- Clear interfaces for all data structures

### Performance Optimizations

- Native lazy loading for images (`loading="lazy"`)
- GPU-accelerated animations (transform + opacity only)
- Tree-shaking via Vite (only used Tailwind utilities included)
- Font-display: swap for custom fonts (Inter, Cormorant)
