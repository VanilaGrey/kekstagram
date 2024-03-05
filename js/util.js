import { MESSAGES } from './const.js';

// Функция checkStringLength для проверки максимальной длины строки:
function checkStringLength(string, length) {
  return string.length <= length;
}

function getRandomPositiveInteger(a, b) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}

// Функция для выбора случайного элемента
const getRandomElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

// Функция для случайного выбора одного или двух предложений
const generateRandomMessage = () => {
  // Случайным образом определяем количество предложений
  const numberOfSentences = Math.random() < 0.5 ? 1 : 2;

  // Случайным образом выбираем предложения из массива MESSAGE
  const selectedSentences = [];
  for (let i = 0; i < numberOfSentences; i++) {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    selectedSentences.push(MESSAGES[randomIndex]);
  }

  // Объединяем выбранные предложения в одну строку
  const commentText = selectedSentences.join(" ");

  return commentText;
};

// функция входа в полноэкранный режим
function openBigPicture() {
  const bigPicture = document.querySelector('.big-picture');
  const commentCount = bigPicture.querySelector('.social__comment-count');
  const commentLoader = bigPicture.querySelector('.comments-loader');
  commentLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscPress); // Добавляем обработчик события
}

// функция выхода из полноэкранного режима
function closeBigPicture() {
  const bigPicture = document.querySelector('.big-picture');
  const commentCount = bigPicture.querySelector('.social__comment-count');
  const commentLoader = bigPicture.querySelector('.comments-loader');
  const closeBigPhoto = bigPicture.querySelector('.big-picture__cancel');
  closeBigPhoto.addEventListener('click', closeBigPicture);
  commentLoader.classList.remove('hidden');
  commentCount.classList.remove('hidden');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress); // Удаляем обработчик события
}

// Обработчик события для закрытия окна по нажатию на клавишу Esc
function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

export {
  checkStringLength,
  getRandomPositiveInteger,
  getRandomElement,
  generateRandomMessage,
  openBigPicture,
  closeBigPicture,
  onEscPress,
};
