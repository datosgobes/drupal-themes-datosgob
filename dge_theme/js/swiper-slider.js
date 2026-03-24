
/**
  * Copyright (C) 2026 Entidad Pública Empresarial Red.es
  *
  * This file is part of "dge_theme (datos.gob.es)".
  *
  * This program is free software: you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation, either version 2 of the License, or
  * (at your option) any later version.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  * GNU General Public License for more details.
  *
  * You should have received a copy of the GNU General Public License
  * along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
if (typeof Swiper !== 'undefined') {
  const swiper = new Swiper('.swiper--screenshots', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      "@0.00": {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      "@0.50": {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      "@0.75": {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      "@1.00": {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      "@1.50": {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  });
}
