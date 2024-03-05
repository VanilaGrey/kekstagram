import {
  checkStringLength,
  getRandomPositiveInteger,
  getRandomElement,
  generateRandomMessage
} from "./util.js";

import { COARD_AMOUNT, DESCRIPTION, MESSAGE, NAMES } from "./const.js";

const COMMENTS = [
  {
    id: getRandomPositiveInteger(1, 25),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: generateRandomMessage(MESSAGE),
    name: getRandomElement(NAMES),
  },
];

const createPhoto = () => {
  return {
    id: getRandomPositiveInteger(1, 25),
    url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getRandomPositiveInteger(15, 200),
    comment: COMMENTS
  };
};

const createPhotos = () => Array.from({ length: COARD_AMOUNT }, createPhoto);

export { createPhotos };
