import {
  checkStringLength,
  getRandomPositiveInteger,
  getRandomElement,
  generateRandomMessage
} from "./util.js";

import { COARD_AMOUNT, DESCRIPTIONS, MESSAGES, NAMES } from "./const.js";

const COMMENTS = [
  {
    id: getRandomPositiveInteger(1, 25),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: generateRandomMessage(MESSAGES),
    name: getRandomElement(NAMES),
  },
  {
    id: getRandomPositiveInteger(1, 25),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: generateRandomMessage(MESSAGES),
    name: getRandomElement(NAMES),
  },
  {
    id: getRandomPositiveInteger(1, 25),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: generateRandomMessage(MESSAGES),
    name: getRandomElement(NAMES),
  },
  {
    id: getRandomPositiveInteger(1, 25),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: generateRandomMessage(MESSAGES),
    name: getRandomElement(NAMES),
  },
];

const createPhoto = () => {
  return {
    id: getRandomPositiveInteger(1, 25),
    url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comment: COMMENTS
  };
};

const createPhotos = () => Array.from({ length: COARD_AMOUNT }, createPhoto);

export { createPhotos };
