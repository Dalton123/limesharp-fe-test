<script setup lang="ts">
import { onMounted, ref, nextTick, watch } from "vue";
import { useProjects } from "./composables/useProjects";
import { useProjectNavigation } from "./composables/useProjectNavigation";
import { useIntroAnimation } from "./composables/useIntroAnimation";
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from "./constants/animation";
import { delayFrame } from "./utils/animationFrame";
import MainLayout from "./components/templates/MainLayout.vue";
import ProjectGrid from "./components/organisms/ProjectGrid.vue";
import ProjectDetail from "./components/organisms/ProjectDetail.vue";
import CTALink from "./components/atoms/CTALink.vue";

const { projects, loading, error, loadProjects } = useProjects();
const {
  selectedProjectId,
  isDetailViewOpen,
  isAnimating,
  openProject,
  closeProject,
  getSelectedProject,
} = useProjectNavigation();

const { showLogo, showContent, playIntro } = useIntroAnimation();

const showDetail = ref(false);

const isOpenAnimating = ref(false);

const isClosing = ref(false);

const isIntroMode = ref(true);

const showSubtitle = ref(false);

const detailRef = ref<InstanceType<typeof ProjectDetail> | null>(null);
const gridRef = ref<InstanceType<typeof ProjectGrid> | null>(null);

watch(showContent, (newValue) => {
  if (isIntroMode.value) {
    showSubtitle.value = newValue;
  }
});

onMounted(async () => {
  await loadProjects();
  playIntro();
});

const handleCardAnimating = async () => {
  isOpenAnimating.value = true;

  await delayFrame(ANIMATION_DURATIONS.CARD_FADE);

  await delayFrame(50);

  if ("startViewTransition" in document) {
    const transition = (document as any).startViewTransition(() => {
      showDetail.value = true;
    });
    await transition.finished;
  } else {
    showDetail.value = true;
    await delayFrame(ANIMATION_DURATIONS.CARD_FLIP);
  }

  isOpenAnimating.value = false;
};

const handleSelectProject = (id: number) => {
  isIntroMode.value = false;

  showLogo.value = false;
  showSubtitle.value = false;

  openProject(id);
};

const handleCloseProject = async () => {
  isClosing.value = true;

  isIntroMode.value = true;

  showContent.value = false;

  if (detailRef.value) {
    detailRef.value.triggerContentExit();
  }

  await delayFrame(ANIMATION_DURATIONS.DETAIL_EXIT_FADE);

  showDetail.value = false;

  // Store the project ID before closing (so we can restore focus)
  const projectIdToFocus = selectedProjectId.value;

  closeProject();

  await delayFrame(100);

  requestAnimationFrame(() => {
    showLogo.value = true;
  });

  await nextTick();

  await delayFrame(ANIMATION_DURATIONS.CLOSE_SUBTITLE_DELAY);
  showSubtitle.value = true;
  showContent.value = true;

  isClosing.value = false;

  // Restore focus to the card after all animations complete
  await nextTick();
  if (projectIdToFocus !== null && gridRef.value) {
    gridRef.value.focusCard(projectIdToFocus);
  }
};
</script>

<template>
  <div class="relative">
    <MainLayout
      :show-hero-image="!isDetailViewOpen"
      :show-logo="showLogo"
      :show-subtitle="showSubtitle"
      :hero-instant-toggle="isClosing"
      :enable-intro-animation="isIntroMode"
    >
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="">Loading projects...</div>
      </div>

      <div v-else-if="error" class="flex items-center justify-center py-20">
        <div class="text-red-600">
          <p class="font-semibold mb-2">Error loading projects</p>
          <p class="text-sm">{{ error.message }}</p>
        </div>
      </div>

      <div v-else-if="!showDetail">
        <ProjectGrid
          ref="gridRef"
          :projects="projects"
          :selected-project-id="selectedProjectId"
          :show-grid="showContent"
          :disable-transitions="isOpenAnimating"
          :enable-intro-animation="isIntroMode"
          :is-animating="isAnimating"
          @select-project="handleSelectProject"
          @card-animating="handleCardAnimating"
        />

        <div
          class="intro-element mt-12 text-center"
          :class="{
            'intro-visible': showContent,
            'no-transform': !isIntroMode,
          }"
        >
          <CTALink href="mailto:hello@limesharp.com"> Get in Touch </CTALink>
        </div>
      </div>
    </MainLayout>

    <ProjectDetail
      v-if="showDetail && getSelectedProject(projects)"
      ref="detailRef"
      :project="getSelectedProject(projects)!"
      @close="handleCloseProject"
    />
  </div>
</template>

<style scoped>
.intro-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity v-bind("`${ANIMATION_DURATIONS.INTRO_CONTENT}ms`")
      v-bind("ANIMATION_EASINGS.EASE_OUT"),
    transform v-bind("`${ANIMATION_DURATIONS.INTRO_CONTENT}ms`")
      v-bind("ANIMATION_EASINGS.EASE_OUT");
}

.intro-element.intro-visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-element.no-transform {
  transform: translateY(0) !important;
  transition: opacity v-bind("`${ANIMATION_DURATIONS.INTRO_CONTENT}ms`")
    v-bind("ANIMATION_EASINGS.EASE_OUT");
}
</style>
