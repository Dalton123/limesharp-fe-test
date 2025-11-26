/**
 * Composable for managing focus trapping in modal/overlay views
 * Ensures keyboard navigation stays within the active element
 */

import { onMounted, onUnmounted } from "vue";

interface FocusTrapOptions {
  autoRestore?: boolean;
}

/**
 * Traps focus within a container element
 *
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 */
export function useFocusTrap(
  containerRef: { value: HTMLElement | null },
  options: FocusTrapOptions = {}
) {
  const { autoRestore = true } = options;
  let previouslyFocusedElement: HTMLElement | null = null;

  const getFocusableElements = (): HTMLElement[] => {
    if (!containerRef.value) return [];

    const selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const elements = containerRef.value.querySelectorAll<HTMLElement>(selector);

    return Array.from(elements).filter(
      (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
    );
  };

  const handleTabKey = (event: KeyboardEvent) => {
    const focusableElements = getFocusableElements();

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key !== "Tab" || !firstElement || !lastElement) return;

    // Shift + Tab
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    }
    // Tab
    else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  onMounted(() => {
    // Store currently focused element
    previouslyFocusedElement = document.activeElement as HTMLElement;

    // Focus first focusable element
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    if (firstElement) {
      firstElement.focus();
    }

    // Add event listener
    document.addEventListener("keydown", handleTabKey);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleTabKey);

    // Only auto-restore if enabled
    if (autoRestore && previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  });

  // Return helper to access stored element for manual focus management
  return {
    getPreviouslyFocusedElement: () => previouslyFocusedElement,
  };
}
