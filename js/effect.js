//изменение эффекта фотографии при клике
const Effect = {
  none: {
    max: 100,
    step: 1,
    filter: "none",
  },
  chrome: {
    filter: "grayscale",
  },
  sepia: {
    filter: "sepia",
  },
  marvin: {
    max: 100,
    step: 1,
    filter: "invert",
    measure: "%",
  },
  phobos: {
    max: 3,
    filter: "blur",
    measure: "px",
  },
  heat: {
    max: 3,
    filter: "brightness",
  },
};

const initEffects = (formElement) => {
  const effectElement = formElement.querySelector(".effects");
  const sliderElement = formElement.querySelector(".effect-level__slider");
  const sliderValueElement = formElement.querySelector(".effect-level__value");

  const rangeElement = formElement.querySelector(".img-upload__effect-level");
  const previewElement = formElement.querySelector(".img-upload__preview img");

  const controlValueElement = formElement.querySelector("[name=scale]");
  const controlSmallerElement = formElement.querySelector(".scale__control--smaller");
  const controlBiggerElement = formElement.querySelector(".scale__control--bigger");

  let currentEffect = "none";
  let scaleValue = 100;
  const STEP_CONTROL = 25;

  const getEffect = () => {
    const { min = 0, max = 1, step = 0.1 } = Effect[currentEffect];

    return {
      range: {
        min,
        max,
      },
      start: max,
      step,
    };
  };

  const slider = noUiSlider.create(sliderElement, getEffect());

  // Скрыть слайдер при инициализации
  rangeElement.classList.add("hidden");

  effectElement.addEventListener("change", (evt) => {
    if (evt.target.classList.contains("effects__radio")) {
      currentEffect = evt.target.value;
      previewElement.className = `effects__preview--${currentEffect}`;
      if (currentEffect === "none") {
        previewElement.style.filter = "none";
        rangeElement.classList.add("hidden");
      } else {
        slider.updateOptions(getEffect());
        rangeElement.classList.remove("hidden");
      }
    }
  });

  slider.on("update", () => {
    const value = slider.get();
    const { filter, measure = "" } = Effect[currentEffect];
    sliderValueElement.value = value;
    previewElement.style.filter = `${filter}(${value}${measure})`;
  });

  // изменение размера загружаемой картинки
  controlSmallerElement.addEventListener("click", () => {
    scaleValue = Math.max(scaleValue - STEP_CONTROL, 25);
    controlValueElement.value = `${scaleValue}%`;
    updateImageScale();
  });
  controlBiggerElement.addEventListener("click", () => {
    scaleValue = Math.min(scaleValue + STEP_CONTROL, 100);
    controlValueElement.value = `${scaleValue}%`;
    updateImageScale();
  });

  const updateImageScale = () => {
    const scale = scaleValue / 100;
    previewElement.style.transform = `scale(${scale})`;
  };
};

export { initEffects };
