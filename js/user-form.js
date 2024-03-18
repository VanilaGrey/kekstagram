import { checkStringLength } from "./util.js";
import { changeEffectPhoto } from './effect.js'
import { updateImageScale } from './photo-size.js'

const formElement = document.querySelector(".img-upload__form");
const uploadElement = formElement.querySelector("#upload-file");
const cancelElement = formElement.querySelector("#upload-cancel");

const overlayElement = formElement.querySelector(".img-upload__overlay");
const submitElement = formElement.querySelector(".img-upload__submit");
const previewElement = formElement.querySelector(".img-upload__preview img");

const hashtagsElement = formElement.querySelector(".text__hashtags");
const descriptionElement = formElement.querySelector(".text__description");


const MAX_HASHTAGS = 5; //колличество хэштегов
const MAX_HASHTAG_SIZE = 20; // макс длина хэштега
const FIELDS = ["input", "textarea"];

const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i; //выражение хэштега

const pristine = new Pristine(formElement, {
  classTo: "img-upload__text",
  errorTextParent: "img-upload__text",
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

changeEffectPhoto();

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

pristine.addValidator(hashtagsElement, validateHashtagsHashable, "Хэштег начинается с #.", 1002, true);

// валидация максимального кол-ва символов в теге
const validateHashtagsSizes = (value) => {
  const hashtags = value.split(" ");
  return hashtags.every((tag) => tag.length <= MAX_HASHTAG_SIZE);
};

pristine.addValidator(hashtagsElement, validateHashtagsSizes, "Длина хэштега не более 20 символов.", 1001, true);

// валидация формата тега
const validateHashtagsFormat = (value) => {
  const hashtags = value.split(" ");
  return hashtags.every((tag) => RE.test(tag));
};

pristine.addValidator(hashtagsElement, validateHashtagsFormat, "Хэштег состоит из букв или цифр.", 1000);

// валидация уникальности тега
const validateHashtagsUnique = (value) => {
  const hashtags = value.split(" ");
  const uniqueHashtags = new Set(hashtags);

  if (hashtags.length !== uniqueHashtags.size) {
    return false;
  }

  return true;
};

pristine.addValidator(hashtagsElement, validateHashtagsUnique, "Хэштеги должны быть уникальными", 1004);

// валидация длины комментария
const validateDescription = () => {
  return checkStringLength(descriptionElement.value, 140);
};

pristine.addValidator(descriptionElement, validateDescription, "Максимальная длина комментария 140 символов", 1007);

//отправка формы
submitElement.addEventListener("click", (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  formElement.submit();
});

const blockSubmitButton = () => {
  submitElement.setAttribute('disabled', true);
  submitElement.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitElement.disabled = false;
  submitElement.textContent = 'Опубликовать';
};

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          closeForm();
          createMessageSuccess();
          unblockSubmitButton();
        },
        () => {
          createMessageError();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { setUserFormSubmit }
