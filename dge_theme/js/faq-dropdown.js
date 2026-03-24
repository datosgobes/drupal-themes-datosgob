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
  
  function toggleVisibility(element) {
  const parent = element.parentElement;
  const content = parent.querySelector('.views-row__content');
  const arrow = element.querySelector('.arrow');
  const isVisible = content.style.display === 'block';

  document.querySelectorAll('.views-row__content').forEach(el => {
    el.style.display = 'none';
  });
  document.querySelectorAll('.arrow').forEach(el => {
    el.classList.remove('rotated');
  });

  if (!isVisible) {
    content.style.display = 'block';
    arrow.classList.add('rotated');

    const faqId = element.getAttribute('id');
    if (faqId && faqId.startsWith('faq-')) {
      history.replaceState(null, null, '#' + faqId);
    }
  }
}


  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      toggleVisibility(event.target);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash) {
    let hash = window.location.hash.substring(1);
    let question = document.getElementById(hash);
    let content = question ? question.nextElementSibling : null;

    if (question && content) {
      content.style.display = "block";
      question.querySelector(".arrow").classList.add("rotated");

      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      setTimeout(() => {
        let scrollOffset = question.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: scrollOffset, behavior: "smooth" });
      }, 300);
    }
  }
});