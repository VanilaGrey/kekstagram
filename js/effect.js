import { createSlider } from './slider.js'
//изменение эффекта фотографии при клике
const effectElement = document.querySelector('.effects');
const previewElement = document.querySelector(".img-upload__preview img");

const changeEffectPhoto = () => {
  const effectClasses = ["chrome", "sepia", "marvin", "phobos", "heat"];
  previewElement.classList.add(".effects__preview--none");
  effectElement.addEventListener('change', (evt) => {
    if (evt.target.classList.contains('effects__radio')) {
      const selectedEffect = evt.target.value;
      effectClasses.forEach((effectClass) => {
        previewElement.classList.remove(`effects__preview--${effectClass}`);
      });
      previewElement.classList.add(`effects__preview--${selectedEffect}`);
    }
  });
  createSlider();
};

export { changeEffectPhoto }
