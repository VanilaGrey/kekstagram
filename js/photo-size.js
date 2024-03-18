const controlSmallerElement = document.querySelector(".scale__control--smaller");
const controlBiggerElement = document.querySelector(".scale__control--bigger");
const controlValueElement = document.querySelector("[name=scale]");
const previewElement = document.querySelector(".img-upload__preview img");


let scaleValue = 100;
const STEP_CONTROL = 25;

// изменение размера загружаемой картинки

controlSmallerElement.addEventListener("click", () => {
  scaleValue = Math.max(scaleValue - STEP_CONTROL, 25);
  controlValueElement.value = `${scaleValue}%`;
  updateImageScale();
});
controlBiggerElement.addEventListener("click", () => {
  scaleValue = Math.min(scaleValue + STEP_CONTROL, 100);
  controlValueElement.value = `${scaleValue}%`;
  updateImageScale(evt);
});

const updateImageScale = () => {
  const scale = scaleValue / 100;
  previewElement.style.transform = `scale(${scale})`;
};

export { updateImageScale }
