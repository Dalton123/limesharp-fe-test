<script setup lang="ts">
import { computed, ref } from "vue";
import type { Project, ProjectId } from "../../types";
import ProjectCard from "../molecules/ProjectCard.vue";
import {
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
} from "../../constants/animation";

interface Props {
  projects: Project[];
  selectedProjectId: ProjectId;
  showGrid?: boolean;
  disableTransitions?: boolean;
  enableIntroAnimation?: boolean;
  isAnimating?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showGrid: true,
  disableTransitions: false,
  enableIntroAnimation: true,
  isAnimating: false,
});

const emit = defineEmits<{
  selectProject: [id: number];
  cardAnimating: [];
}>();

// Store refs for each card
const cardRefs = ref<Record<number, InstanceType<typeof ProjectCard>>>({});

const handleCardSelect = (projectId: number) => {
  emit("selectProject", projectId);
  emit("cardAnimating");
};

const isCardFaded = computed(() => {
  return (projectId: number) => {
    return (
      props.selectedProjectId !== null && props.selectedProjectId !== projectId
    );
  };
});

const isCardSelected = computed(() => {
  return (projectId: number) => {
    return props.selectedProjectId === projectId;
  };
});

// Method to focus a specific card
const focusCard = (projectId: number) => {
  const card = cardRefs.value[projectId];
  if (card?.cardElement) {
    card.cardElement.focus();
  }
};

defineExpose({
  focusCard,
});
</script>

<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 gap-6 intro-grid"
    :class="{
      'intro-grid-visible': showGrid,
      'no-transitions': disableTransitions,
    }"
    role="list"
    aria-label="Project gallery"
  >
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :ref="(el) => { if (el) cardRefs[project.id] = el as InstanceType<typeof ProjectCard>; }"
      :project="project"
      :is-selected="isCardSelected(project.id)"
      :is-faded="isCardFaded(project.id)"
      :is-animating="isAnimating"
      role="listitem"
      @select="handleCardSelect"
    />
  </div>
</template>

<style scoped>
.intro-grid {
  opacity: 0;
  transform: v-bind(
    "props.enableIntroAnimation ? 'translateY(20px)' : 'translateY(0)'"
  );
  transition: opacity v-bind("`${ANIMATION_DURATIONS.INTRO_CONTENT}ms`")
      v-bind("ANIMATION_EASINGS.EASE_OUT"),
    transform
      v-bind(
        "props.enableIntroAnimation ? `${ANIMATION_DURATIONS.INTRO_CONTENT}ms ${ANIMATION_EASINGS.EASE_OUT}` : 'none'"
      );
}

.intro-grid.intro-grid-visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-grid.no-transitions {
  transition: none !important;
}
</style>
