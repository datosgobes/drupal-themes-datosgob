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
  Drupal.behaviors.commentDeepLink = {
    attach: function (context, settings) {

      // Solo una vez
      if (context !== document) {
        return;
      }

      if (!window.location.hash) {
        return;
      }

      const hash = window.location.hash.substring(1);
      if (!hash.startsWith('comment-')) {
        return;
      }

      const targetComment = document.getElementById(hash);
      if (!targetComment) {
        return;
      }

      // Esperamos a que Drupal core termine su scroll
      setTimeout(function () {

        // Abrir replies padres
        let parent = targetComment.parentElement;
        while (parent) {
          if (parent.classList && parent.classList.contains('replies')) {
            parent.style.display = 'block';

            const commentId = parent.id.replace('replies-', '');
            const toggleLink = document.querySelector(
              '.toggle-replies[data-comment-id="' + commentId + '"]'
            );

            if (toggleLink) {
              toggleLink.textContent =
                toggleLink.getAttribute('data-hide-text');
              toggleLink.classList.add('active');
            }
          }
          parent = parent.parentElement;
        }

        targetComment.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        targetComment.classList.add('comment-highlight');

      }, 600); 

    }
  };
})(Drupal);
