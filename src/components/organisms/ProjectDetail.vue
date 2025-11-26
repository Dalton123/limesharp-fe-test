<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Project } from "../../types";
import CTALink from "../atoms/CTALink.vue";
import { useFocusTrap } from "../../composables/useFocusTrap";
import {
  Z_INDEX,
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
} from "../../constants/animation";

interface Props {
  project: Project;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const containerRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);

// Control content visibility for exit animation
const showContent = ref(true);

// Enable focus trapping (disable auto-restore since parent will handle it)
const focusTrap = useFocusTrap(containerRef, { autoRestore: false });

// Expose methods for parent component
const triggerContentExit = () => {
  showContent.value = false;
};

defineExpose({
  imageElement: imageRef,
  triggerContentExit,
  getPreviouslyFocusedElement: focusTrap.getPreviouslyFocusedElement,
});

// Prevent body scroll when detail view is open
onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  // Restore body scroll
  document.body.style.overflow = "";
});
</script>

<template>
  <div
    ref="containerRef"
    class="fixed inset-0 flex items-center justify-center bg-white overflow-auto"
    :style="{ zIndex: Z_INDEX.DETAIL }"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="`project-title-${project.id}`"
  >
    <div class="flex flex-col md:flex-row w-full h-full">
      <div class="md:w-1/2 h-100 md:h-full">
        <img
          ref="imageRef"
          :src="project.imageUrl"
          :alt="project.title"
          class="w-full h-full object-cover"
          style="view-transition-name: project-image"
        />
      </div>

      <Transition name="content-exit">
        <div v-if="showContent" class="h-full md:w-1/2">
          <div
            class="px-6 py-6 md:px-16 lg:px-24 md:pt-24 mx-auto flex flex-col justify-between items-center min-h-full text-center text-black gap-y-32 overflow-hidden"
          >
            <div class="detail-heading">
              <h2
                :id="`project-title-${project.id}`"
                class="text-[58px] leading-[70px] font-sans"
              >
                {{ project.title }}
              </h2>

              <time
                :datetime="project.date"
                class="text-2xl font-serif leading-6.5"
              >
                {{ project.date }}
              </time>
            </div>

            <p class="text-[22px] leading-6.5 font-sans detail-description">
              {{ project.description }}
            </p>

            <div class="detail-link">
              <CTALink @click="$emit('close')">Go Back</CTALink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@keyframes detail-entrance {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-heading {
  animation: detail-entrance
    v-bind("`${ANIMATION_DURATIONS.DETAIL_CONTENT_DURATION}ms`")
    v-bind("ANIMATION_EASINGS.FLIP")
    v-bind("`${ANIMATION_DURATIONS.DETAIL_HEADING_DELAY}ms`") forwards;
  opacity: 0;
}

.detail-description {
  animation: detail-entrance
    v-bind("`${ANIMATION_DURATIONS.DETAIL_CONTENT_DURATION}ms`")
    v-bind("ANIMATION_EASINGS.FLIP")
    v-bind("`${ANIMATION_DURATIONS.DETAIL_DESCRIPTION_DELAY}ms`") forwards;
  opacity: 0;
}

.detail-link {
  animation: detail-entrance
    v-bind("`${ANIMATION_DURATIONS.DETAIL_CONTENT_DURATION}ms`")
    v-bind("ANIMATION_EASINGS.FLIP")
    v-bind("`${ANIMATION_DURATIONS.DETAIL_LINK_DELAY}ms`") forwards;
  opacity: 0;
}

.content-exit-leave-active {
  transition: opacity v-bind("`${ANIMATION_DURATIONS.DETAIL_EXIT_FADE}ms`")
    v-bind("ANIMATION_EASINGS.EASE_OUT");
}

.content-exit-leave-to {
  opacity: 0;
}
</style>
