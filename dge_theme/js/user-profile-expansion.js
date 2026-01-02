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

  let outsideClickListenerAttached = false;

  Drupal.behaviors.userMenu = {
    attach: function (context) {
      const userProfileItems = context.querySelectorAll('.user-profile');

      userProfileItems.forEach(function (menuItem) {
        const submenu = menuItem.querySelector('ul.menu');

        if (!menuItem.dataset.listenerAttached) {
          menuItem.dataset.listenerAttached = 'true';

          menuItem.setAttribute('tabindex', '0');
          menuItem.setAttribute('aria-haspopup', 'true');
          menuItem.setAttribute('aria-expanded', 'false');

          const toggleMenu = () => {
            const isOpen = menuItem.classList.contains('is-open');
            closeMenu();

            if (!isOpen) {
              menuItem.classList.add('is-open');
              submenu?.classList.add('show');
              menuItem.setAttribute('aria-expanded', 'true');
            }
          };

          menuItem.addEventListener('click', function (event) {
            const isLink = event.target.closest('a');
            if (isLink) {
              return;
            }

            event.preventDefault();
            toggleMenu();
          });

          menuItem.addEventListener('keydown', function (event) {
            const activeElement = document.activeElement;
            const isLink = activeElement && activeElement.tagName === 'A';

            if ((event.key === 'Enter' || event.key === ' ') && !isLink) {
              event.preventDefault();
              toggleMenu();
            }
          });

          if (!outsideClickListenerAttached) {
            document.addEventListener('click', function (event) {
              const openMenu = document.querySelector('.user-profile.is-open');
              if (openMenu && !event.target.closest('.user-profile')) {
                closeMenu();
              }
            });

            outsideClickListenerAttached = true;
          }
        }
      });
    }
  };

  function closeMenu() {
    const openMenu = document.querySelector('.user-profile.is-open');
    if (openMenu) {
      openMenu.classList.remove('is-open');
      openMenu.setAttribute('aria-expanded', 'false');
      openMenu.querySelector('ul.menu')?.classList.remove('show');
    }
  }
})();
