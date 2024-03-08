import { createPhotos } from "./offers.js";
import { openBigPhoto } from "./full-screen.js";

const picturesContainer = document.querySelector(".pictures");
const pictureTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture");
const similarPhotos = createPhotos();

const createsimilarPhotos = () => {
  similarPhotos.forEach(({ likes, url, description, comments, autor }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(".picture__img").src = url;
    pictureElement.querySelector(".picture__likes").textContent = likes;
    pictureElement.querySelector(".picture__comments").textContent = comments.length;
    pictureElement
      .querySelector(".picture__img")
      .addEventListener("click", () =>
        openBigPhoto({ likes, url, description, comments, autor})
      );
    picturesContainer.append(pictureElement);
  });
};

export { createsimilarPhotos };
