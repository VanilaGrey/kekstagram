// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:
// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:
// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>
// Описание фотографии description вставьте строкой в блок .social__caption.
// После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
// После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
// Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
// Подключите модуль в проект.

import { openBigPicture, closeBigPicture } from "./util.js";

export const openBigPhoto = (photo) => {
  console.log(photo);
  const bigPicture = document.querySelector(".big-picture");
  bigPicture.querySelector(".big-picture__img img").src = photo.url;
  bigPicture.querySelector(".likes-count").textContent = photo.likes;
  bigPicture.querySelector(".social__comments").innerHTML = photo.comment.map(
    (comment) => `
  <img src="${comment.avatar}" alt="">
  <p>${comment.description}</p>
`
  );
  bigPicture.querySelector(".social__caption").textContent = photo.description;
  closeBigPicture();
  openBigPicture();
};
