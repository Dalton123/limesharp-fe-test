import { ref } from "vue";
import { ANIMATION_DURATIONS } from "../constants/animation";
import { delayFrame } from "../utils/animationFrame";

export function useIntroAnimation() {
  const showLogo = ref(false);
  const showContent = ref(false);
  const isIntroComplete = ref(false);

  const playIntro = async () => {
    showLogo.value = false;
    showContent.value = false;
    isIntroComplete.value = false;

    requestAnimationFrame(async () => {
      showLogo.value = true;

      await delayFrame(ANIMATION_DURATIONS.INTRO_STAGGER);
      showContent.value = true;

      await delayFrame(ANIMATION_DURATIONS.INTRO_CONTENT);
      isIntroComplete.value = true;
    });
  };

  const resetIntro = () => {
    showLogo.value = false;
    showContent.value = false;
    isIntroComplete.value = false;
  };

  return {
    showLogo,
    showContent,
    isIntroComplete,
    playIntro,
    resetIntro,
  };
}
