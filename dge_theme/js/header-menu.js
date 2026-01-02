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

window.addEventListener('scroll', function() {
  var firstheader = document.querySelector('.banner-container');
  var fixedheader = document.querySelector('.banner-fixed');
  var navBurgerMenu = document.getElementById('nav-burger-menu');
  var searchMenu = document.getElementById('search-menu-icon');
  if (window.scrollY > 65) { 
      fixedheader?.classList.add('show-banner-fixed');
      firstheader?.classList.add('space-banner-fixed');
      navBurgerMenu?.classList.add('show-menu-fixed');
      searchMenu?.classList.add('show-menu-fixed');
  } else {
      fixedheader?.classList.remove('show-banner-fixed');
      firstheader?.classList.remove('space-banner-fixed');
      navBurgerMenu?.classList.remove('show-menu-fixed');
      searchMenu?.classList.remove('show-menu-fixed');
  }
});

function toggleAriaExpanded() {
  var button = document.getElementById('nav-burger-menu');
  var menu = document.querySelector('.nav-burger-menu + ul.menu');
  var isExpanded = button.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
      closeMenu();
  } else {
      openMenu();
  }
}

function openMenu() {
  var button = document.getElementById('nav-burger-menu');
  button.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; 
  document.addEventListener('click', closeOnClickOutside);
}

function closeMenu() {
  var button = document.getElementById('nav-burger-menu');
  button.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = ''; // Restaurar scroll
  document.removeEventListener('click', closeOnClickOutside);
}

function closeOnClickOutside(event) {
  var button = document.getElementById('nav-burger-menu');
  var menu = document.querySelector('.nav-burger-menu + ul.menu');

  if (!button.contains(event.target) && !menu.contains(event.target)) {
      closeMenu();
  }
}
