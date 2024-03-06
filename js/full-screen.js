import { openBigPicture, closeBigPicture } from "./util.js";

export const openBigPhoto = (photo) => {
  console.log(photo);
  const bigPicture = document.querySelector(".big-picture");
  bigPicture.querySelector(".big-picture__img img").src = photo.url;
  bigPicture.querySelector(".likes-count").textContent = photo.likes;
  bigPicture.querySelector(".social__comments").innerHTML = photo.comments.map(
    (comment) => `
   <li class="social__comment">
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.autor}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>`
  );
  bigPicture.querySelector(".social__caption").textContent = photo.description;
  closeBigPicture();
  openBigPicture();
};
