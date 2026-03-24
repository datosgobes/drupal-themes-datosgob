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

(function () {
  'use strict';

  let outsideClickListenerAttached = false;

  Drupal.behaviors.languageSwitcher = {
    attach: function (context) {
      const languageSwitcher = context.querySelector('.language');

      if (languageSwitcher && !languageSwitcher.dataset.listenerAttached) {
        languageSwitcher.dataset.listenerAttached = 'true';
        const submenu = languageSwitcher.nextElementSibling;

        languageSwitcher.setAttribute('tabindex', '0');
        languageSwitcher.setAttribute('aria-haspopup', 'true');
        languageSwitcher.setAttribute('aria-expanded', 'false');

        const toggleMenu = () => {
          const isOpen = languageSwitcher.classList.contains('is-open');
          closeMenu();

          if (!isOpen) {
            languageSwitcher.classList.add('is-open');
            submenu?.classList.add('show');
            languageSwitcher.setAttribute('aria-expanded', 'true');
          }
        };

        languageSwitcher.addEventListener('click', function (event) {
          event.preventDefault();
          toggleMenu();
        });

        languageSwitcher.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
          }
        });

        if (!outsideClickListenerAttached) {
          document.addEventListener('click', function (event) {
            const openSwitcher = document.querySelector('.language.is-open');
            if (openSwitcher && !event.target.closest('.language')
            ) {
              closeMenu();
            }
          });

          outsideClickListenerAttached = true;
        }

        function closeMenu() {
          const openSwitcher = document.querySelector('.language.is-open');
          if (openSwitcher) {
            openSwitcher.classList.remove('is-open');
            openSwitcher.setAttribute('aria-expanded', 'false');
            openSwitcher.nextElementSibling?.classList.remove('show');
          }
        }
      }
    }
  };
})();
