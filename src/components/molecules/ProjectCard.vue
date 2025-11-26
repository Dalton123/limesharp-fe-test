<script setup lang="ts">
import { ref } from "vue";
import type { Project } from "../../types";
import {
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
} from "../../constants/animation";

interface Props {
  project: Project;
  isSelected?: boolean;
  isFaded?: boolean;
  isAnimating?: boolean;
}

withDefaults(defineProps<Props>(), {
  isSelected: false,
  isFaded: false,
  isAnimating: false,
});

defineEmits<{
  select: [id: number];
}>();

const imageContainerRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);

const handleKeyPress = (
  event: KeyboardEvent,
  id: number,
  emit: (event: "select", id: number) => void
) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    emit("select", id);
  }
};

defineExpose({
  imageElement: imageContainerRef,
  cardElement: cardRef,
});
</script>

<template>
  <article
    ref="cardRef"
    role="button"
    tabindex="0"
    :aria-label="`Open ${project.title} details`"
    class="group relative cursor-pointer"
    :class="{
      'pointer-events-none': isFaded || isSelected || isAnimating,
    }"
    @click="$emit('select', project.id)"
    @keydown="handleKeyPress($event, project.id, $emit)"
  >
    <div
      ref="imageContainerRef"
      class="aspect-4/3 overflow-hidden"
      :style="{
        transition: `opacity ${ANIMATION_DURATIONS.CARD_FADE}ms ${ANIMATION_EASINGS.LINEAR}`,
        opacity: isFaded ? 0 : 1,
      }"
    >
      <img
        :src="project.imageUrl"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0,0.2,0.2,1)] group-hover:scale-110"
        loading="lazy"
        :style="{
          viewTransitionName: isSelected ? 'project-image' : undefined,
        }"
      />
    </div>

    <div
      class="flex text-black justify-between items-center mt-2"
      :style="{
        transition: `opacity ${ANIMATION_DURATIONS.CARD_FADE}ms ${ANIMATION_EASINGS.LINEAR}`,
        opacity: isFaded || isSelected ? 0 : 1,
      }"
    >
      <h3 class="text-sm font-sans leading-4">
        {{ project.title }}
      </h3>
      <time :datetime="project.date" class="text-sm font-serif leading-4">
        {{ project.date }}
      </time>
    </div>
  </article>
</template>
