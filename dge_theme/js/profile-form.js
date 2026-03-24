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

(function (Drupal) {
  'use strict';

  Drupal.behaviors.customFormTabValidation = {
    attach: function (context, settings) {

      const form = context.querySelector('form.user-form');
      if (!form) {
        return;
      }

      const submitButton = form.querySelector('#edit-submit');

      if (!submitButton) {
        return;
      }

      submitButton.addEventListener('click', function (event) {
        if (form.checkValidity()) {
          return;
        }

        event.preventDefault();

        const firstInvalidField = form.querySelector(':invalid');

        if (firstInvalidField) {
          const errorTab = firstInvalidField.closest('.profile-section');

          if (errorTab) {
            const errorTabId = errorTab.id;

            form.querySelectorAll('.profile-section').forEach(section => {
              section.classList.remove('active');
              section.style.display = 'none'; 
            });

            form.querySelectorAll('.profile-link').forEach(link => {
              link.classList.remove('active');
            });

            errorTab.classList.add('active');
            errorTab.style.display = 'block';

            form.querySelectorAll('.profile-section').forEach(section => section.classList.remove('active'));
            form.querySelectorAll('.profile-link').forEach(link => link.classList.remove('active'));

            errorTab.classList.add('active');

            const correspondingLink = form.querySelector(`.profile-link[data-target="#${errorTabId}"]`);
            if (correspondingLink) {
              correspondingLink.classList.add('active');
            }

            form.reportValidity();
          }
        }
      });
    }
  };
})(Drupal);