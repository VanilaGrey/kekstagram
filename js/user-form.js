// 2.2. Наложение эффекта на изображение:
// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс,
// соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
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
// На расширенном тарифе регулировку интенсивности эффекта можно не делать, достаточно применить к изображению только эффект. Слайдер при этом нужно скрыть,
// библиотеку noUiSlider подключать к странице не нужно.

import { openBigPicture, closeBigPicture } from "./util.js";
import { EFFECTS } from "./const.js";
import { checkStringLength } from "./util.js";

const formElement = document.querySelector(".img-upload__form");
const uploadElement = formElement.querySelector("#upload-file");
const overlayElement = formElement.querySelector(".img-upload__overlay");
const controlSmallerElement = formElement.querySelector(
  ".scale__control--smaller"
);
const controlBiggerElement = formElement.querySelector(
  ".scale__control--bigger"
);
const controlValueElement = formElement.querySelector("[name=scale]");
const cancelElement = formElement.querySelector("#upload-cancel");
const previewElement = formElement.querySelector(".img-upload__preview img");
const effectsElement = formElement.querySelector(".img-upload__effects");
const radioElement = formElement.querySelector('[name="effect]');
const hashtagsElement = formElement.querySelector(".text__hashtags");
const submitElement = formElement.querySelector(".img-upload__submit");
const descriptionElement = formElement.querySelector(".text__description");

let scaleValue = 100;
const STEP_CONTROL = 25;
const MAX_HASHTAGS = 5; //колличество хэштегов
const MAX_HASHTAG_SIZE = 20; // макс длина хэштега

const FIELDS = ["input", "textarea"];
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1-19}$/i; //выражение хэштега

const pristine = new Pristine(formElement, {
  classTo: "text",
  errorTextParent: "text",
});

// открытие формы

uploadElement.addEventListener("change", () => {
  let [file] = uploadElement.files; // Получаем выбранный файл
  previewElement.src = URL.createObjectURL(file);
  overlayElement.classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", onUserModalEscKeydown);
});

// закрытие формы

function closeForm() {
  cancelElement.addEventListener("click", () => {
    overlayElement.classList.add("hidden");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", onUserModalEscKeydown);
  });
}

// закрытие на клавишу esc
function onUserModalEscKeydown(evt) {
  const tagName = document.activeElement.tagName.toLowerCase();
  if (FIELDS.includes(tagName)) {
    return;
  }

  if (evt.key === "Escape") {
    evt.preventDefault();
    closeForm();
  }
}

cancelElement.addEventListener("click", () => {
  closeForm();
});

// изменение размера загружаемой картинки
const updateImageScale = () => {
  const scale = scaleValue / 100;
  previewElement.style.transform = `scale(${scale})`;
};

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

// валидация максимального кол-ва тегов
const validateHashtagsCount = (value) => {
  const hashtags = value.split(" ");
  return hashtags.length <= MAX_HASHTAGS;
};

pristine.addValidator(
  hashtagsElement,
  validateHashtagsCount,
  "Максимальное количество хэш-тегов не должно превышать 5.",
  1003,
  true
);

// валидация начала тега
const validateHashtagsHashable = (value) => {
  const hashtags = value.split(" ");
  return hashtags.every((tag) => tag.startsWith("#"));
};

pristine.addValidator(
  hashtagsElement,
  validateHashtagsHashable,
  "Хэштег начинается с #.",
  1002,
  true
);

// валидация формата тега
const validateHashtagsFormat = (value) => {
  const hashtags = value.split(" ");
  return hashtags.every((tag) => RE.test(tag));
};

pristine.addValidator(
  hashtagsElement,
  validateHashtagsFormat,
  "Хэштег состоит из букв или цифр.",
  1000,
  true
);

// валидация максимального кол-ва символов в теге
const validateHashtagsSizes = (value) => {
  const hashtags = value.split(" ");
  return hashtags.every((tag) => tag.length <= MAX_HASHTAG_SIZE);
};

pristine.addValidator(
  hashtagsElement,
  validateHashtagsSizes,
  "Длина хэштега не более 20 символов.",
  1001
);

const validateHashtagsUnique = (value) => {
  const hashtags = value.split(" ");
  const uniqueHashtags = new Set(hashtags);

  if (hashtags.length !== uniqueHashtags.size) {
    return false;
  }

  return true;
};

pristine.addValidator(
  hashtagsElement,
  validateHashtagsUnique,
  "Хэштеги должны быть уникальными",
  1004
);

const validateDescription = () => {
  return checkStringLength(descriptionElement.value, 140);
};

pristine.addValidator(
  descriptionElement,
  validateDescription,
  "Максимальная длина комментария 140 символов",
  1007
);

submitElement.addEventListener("click", (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  submitElement.submit();
});
