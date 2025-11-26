<script setup lang="ts">
import {
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
} from "../../constants/animation";
import logo from "../../assets/limesharp-logo.svg";
import heroImage from "../../assets/Fixed-image.jpg";

interface Props {
  showHeroImage?: boolean;
  showLogo?: boolean;
  showSubtitle?: boolean;
  heroInstantToggle?: boolean;
  enableIntroAnimation?: boolean;
}

withDefaults(defineProps<Props>(), {
  showHeroImage: true,
  showLogo: true,
  showSubtitle: true,
  heroInstantToggle: false,
  enableIntroAnimation: true,
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <main class="">
      <div class="flex flex-col md:flex-row min-h-screen md:gap-6">
        <aside
          class="md:w-1/2 h-100 md:h-dvh md:sticky hero-image"
          :class="{ 'hero-instant': heroInstantToggle }"
          :style="{
            opacity: showHeroImage ? 1 : 0,
            pointerEvents: showHeroImage ? 'auto' : 'none',
          }"
        >
          <div class="relative w-full h-full">
            <img
              :src="heroImage"
              alt="Architectural design hero image"
              class="w-full h-full object-cover"
            />
          </div>
        </aside>

        <section class="md:w-1/2 px-6 py-6 md:pl-0 md:overflow-auto md:h-dvh">
          <div
            class="intro-element mb-24 md:mb-32 xl:mb-[258px]"
            :style="{
              opacity: showLogo ? 1 : 0,
              transform:
                enableIntroAnimation && !showLogo
                  ? 'translateY(20px)'
                  : 'translateY(0)',
            }"
          >
            <img :src="logo" alt="Limesharp" class="w-full" />
          </div>

          <div
            class="intro-element text-black mb-12"
            :style="{
              opacity: showSubtitle ? 1 : 0,
              transform:
                enableIntroAnimation && !showSubtitle
                  ? 'translateY(20px)'
                  : 'translateY(0)',
            }"
          >
            <h2 class="text-[22px] leading-6.5 text-center font-sans">
              Redefining the future of
              <span class="block text-[24px] leading-6.5 font-serif italic"
                >Digital Commerce</span
              >
            </h2>
          </div>

          <slot />
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.hero-image {
  transition: opacity v-bind("`${ANIMATION_DURATIONS.CARD_FADE}ms`")
    v-bind("ANIMATION_EASINGS.LINEAR");
}

.hero-image.hero-instant {
  transition: none !important;
}

.intro-element {
  transition: opacity v-bind("`${ANIMATION_DURATIONS.CARD_FADE}ms`")
      v-bind("ANIMATION_EASINGS.LINEAR"),
    transform v-bind("`${ANIMATION_DURATIONS.CARD_FADE}ms`")
      v-bind("ANIMATION_EASINGS.EASE_OUT");
}

.intro-element.intro-instant {
  transition: none !important;
}
</style>
