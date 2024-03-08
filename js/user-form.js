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

// 2.4. Комментарий:
// комментарий не обязателен;
// длина комментария не может составлять больше 140 символов;
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
// На расширенном тарифе часть про фокус можно не делать.
import { openBigPicture, closeBigPicture } from "./util.js";
import { EFFECTS } from './const.js'

const formElement = document.querySelector(".img-upload__form");
const uploadElement = formElement.querySelector("#upload-file");
const overlayElement = formElement.querySelector(".img-upload__overlay");
const controlSmallerElement = formElement.querySelector(".scale__control--smaller");
const controlBiggerElement = formElement.querySelector( ".scale__control--bigger");
const controlValueElement = formElement.querySelector("[name=scale]");
const cancelElement = formElement.querySelector("#upload-cancel");
const previewElement = formElement.querySelector(".img-upload__preview img");
const effectsElement = formElement.querySelector(".img-upload__effects");
const radioElement = formElement.querySelector('[name="effect]');
const hashtagsElement = formElement.querySelector('.text__hashtags');

let scaleValue = 100;
const STEP_CONTROL = 25;
const MAX_HASHTAGS = 5;
const FIELDS = ['input', 'textarea'];

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__form__element',
  errorTextParent: 'img-upload__form__element'
});

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;


const validateHashtags = () => {
  const hashtags = hashtagsElement.value.split(' ');
  const hasInvalid = !hashtags.every((tag) => re.test(tag));
  const isLimit = hashtags.length < MAX_HASHTAGS;
  if (isLimit || hasInvalid) {
    errorTextParent = "Максимальное количество хэш-тегов не должно превышать 5."
  }
}
  pristine.addValidator(hashtagsElement, validateHashtags)

hashtagsElement.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation(); // Предотвращает дальнейшее распространение события
  }
});


const updateImageScale = () => {
  const scale = scaleValue / 100;
  previewElement.style.transform = `scale(${scale})`;
};

  function openForm() {
  uploadElement.addEventListener("change", () => {
    let [file] = uploadElement.files; // Получаем выбранный файл
    previewElement.src = URL.createObjectURL(file);
    overlayElement.classList.remove("hidden");
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", onUserModalEscKeydown);
  })
}

function closeForm() {
  cancelElement.addEventListener("click", () => {
    overlayElement.classList.add("hidden");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", onUserModalEscKeydown);
  })
}

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



export { openForm };
