import {
  checkStringLength,
  getRandomPositiveInteger,
  getRandomElement,
  generateRandomMessage,
} from "./util.js";

import {
  DESCRIPTIONS,
  MESSAGES,
  NAMES,
  COMMENTS_LIMIT,
  LIKES_LIMIT,
  PHOTOS_LIMIT,
} from "./const.js";

const createComment = () => ({
  id: getRandomPositiveInteger(1, 25),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: generateRandomMessage(MESSAGES),
  autor: getRandomElement(NAMES),
});

const createPhotos = () =>
  Array.from(
    {
      length: PHOTOS_LIMIT,
    },
    (_item, id) => ({
      id,
      url: `photos/${id + 1}.jpg`,
      description: getRandomElement(DESCRIPTIONS),
      likes: getRandomPositiveInteger(0, LIKES_LIMIT),
      comments: Array.from(
        {
          length: getRandomPositiveInteger(0, COMMENTS_LIMIT),
        },
        createComment
      ),
    })
  );

export { createPhotos };
