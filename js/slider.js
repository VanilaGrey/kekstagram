// 2.2. Наложение эффекта на изображение:
// Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реалиDзуется сторонней библиотекой для реализации слайдеров noUiSlider.
//Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта (предоставляется API слайдера),
//CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:

// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер скрывается.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
// слайдер

const sliderElement = document.querySelector(".effect-level__slider");
const sliderValueElement = document.querySelector(".effect-level__value");
const previewElement = document.querySelector(".img-upload__preview img");

const PERCENT_MAX = 100;
const DEFAULT_EFFECT = "none";

const Effect = {
  [DEFAULT_EFFECT]: {
    max: PERCENT_MAX,
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
    max: PERCENT_MAX,
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

let currentEffect = DEFAULT_EFFECT;

// Создание слайдера
const createSlider = () => {
  // Проверяем, инициализирован ли слайдер
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: "lower",
  });
  // Обработчик события 'update'
  sliderElement.noUiSlider.on("update", () => {
    const value = sliderElement.noUiSlider.get();
    const { filter, measure = "" } = Effect[currentEffect];
    sliderValueElement.value = value;
    previewElement.style.filter = `${filter}(${value}${measure})`;
  });
};

export { createSlider };
