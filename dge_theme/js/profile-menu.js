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
document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.profile-link');
  var sections = document.querySelectorAll('.profile-section');
  function hideSections() {
    sections.forEach(function(section) {
      section.style.display = 'none';
    });
  }
  function deactivateLinks() {
    links.forEach(function(link) {
      link.classList.remove('active');
    });
  }
  hideSections();
  var firstSection = document.querySelector('.profile-section.active');
  if (firstSection) {
    firstSection.style.display = 'block';
  }
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      if (!link.classList.contains('redirect-link')) {
        event.preventDefault();
        deactivateLinks();
        this.classList.add('active');
        hideSections();
        var target = document.querySelector(this.getAttribute('data-target'));
        if (target) {
          target.style.display = 'block';
          target.classList.add('active');
        }
      }
    });
  });
});