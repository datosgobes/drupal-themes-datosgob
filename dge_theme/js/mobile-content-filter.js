/**
  * Copyright (C) 2025 Entidad Pública Empresarial Red.es
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

document.addEventListener("DOMContentLoaded", function() {
  var filterContainer = document.getElementById("filter-container");
  var filterButton = document.getElementById("filter-container__button");
  var closeButton = document.getElementById("close-filter");

  filterButton?.addEventListener("click", function(event) {
    event.preventDefault();
    filterContainer?.classList.toggle("open");
    toggleScroll();
    scrollToTop(); 
  });

  closeButton?.addEventListener("click", function(event) {
    event.preventDefault();
    filterContainer?.classList.remove("open");
    toggleScroll();
  });

  window.addEventListener("resize", handleResize);

  function handleResize() {
    if (filterContainer?.classList.contains("open")) {
      toggleScroll();
    }
    if (window.innerWidth > 768) {
      filterContainer?.classList.remove("open");
      document.body.style.overflow = "auto";
    }
  }

  function toggleScroll() {
    document.body.style.overflow = filterContainer?.classList.contains("open") ? "hidden" : "auto";
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  }
});