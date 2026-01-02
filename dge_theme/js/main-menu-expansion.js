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

(function () {
  'use strict';

  Drupal.behaviors.expandableMenu = {
    attach: function (context) {
      if (!document.documentElement.dataset.expandableMenuListenersAttached) {
        document.documentElement.dataset.expandableMenuListenersAttached = 'true';

        document.addEventListener('click', function (event) {
          if (!event.target.closest('.menu-item--expanded')) {
            closeAllMenus();
          }
        });

        document.addEventListener('keydown', function (event) {
          if (event.key === 'Escape') {
            closeAllMenus();
          }
        });
      }

      document.querySelectorAll('.menu-item--expanded').forEach(function (menuItem) {
        if (menuItem.dataset.listenerAttached) return;
        menuItem.dataset.listenerAttached = 'true';

        let trigger = menuItem.querySelector('.menu-trigger');
        let submenu = menuItem.querySelector('.menu');

        if (trigger) {
          trigger.setAttribute('tabindex', '0');

          trigger.addEventListener('click', function (event) {
            event.preventDefault();
            setTimeout(() => {
              toggleMenu(menuItem, submenu);
            }, 0);
          });

          trigger.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggleMenu(menuItem, submenu);
            }
          });
        }
      });
    }
  };

  function toggleMenu(menuItem, submenu) {
    let isOpen = menuItem.classList.contains('is-open');
    closeAllMenus(menuItem);

    if (!isOpen) {
      menuItem.classList.add('is-open');
      submenu?.classList.add('show');
    } else {
      menuItem.classList.remove('is-open');
      submenu?.classList.remove('show');
    }
  }

  function closeAllMenus(exception = null) {
    document.querySelectorAll('.menu-item--expanded.is-open').forEach(function (menuItem) {
      if (!exception || exception !== menuItem) {
        menuItem.classList.remove('is-open');
        menuItem.querySelector('.menu')?.classList.remove('show');
      }
    });
  }
})();
