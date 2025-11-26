<script setup lang="ts">
/**
 * CTA Link Component
 * Reusable text link with underline contraction animation on hover
 * Can be used as a navigation link or as a button with click events
 */
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from "../../constants/animation";

interface Props {
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  href: "#",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.href || props.href === "#") {
    event.preventDefault();
    emit("click", event);
  }
};
</script>

<template>
  <a
    :href="href"
    class="relative inline-block font-sans text-[22px] leading-6.5 text-black no-underline cursor-pointer cta-link focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    @click="handleClick"
  >
    <slot />
  </a>
</template>

<style scoped>
.cta-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform-origin: right;
  transition: transform v-bind("ANIMATION_DURATIONS.CTA_UNDERLINE + 'ms'") v-bind("ANIMATION_EASINGS.CTA_CURVE");
}

.cta-link:hover::after {
  transform: scaleX(0);
}
</style>
