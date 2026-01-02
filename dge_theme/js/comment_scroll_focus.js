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


(function ($, Drupal) {
  Drupal.behaviors.focusCommentFormAfterLoad = {
    attach: function (context, settings) {
      
      $(document).ready(function () {
        if (window.location.href.includes("comment#comment-form")) {

          $('html, body').css({
            'overflow': 'hidden',
            'scroll-behavior': 'auto'
          });

          setTimeout(function () {
            var form = $('#comment-form');
            if (form.length) {

              let finalScrollPosition = form.offset().top - 110;

              $('html, body').stop(true, true).animate(
                { scrollTop: finalScrollPosition }, 
                500, 
                function () {
                  window.scrollTo(0, finalScrollPosition);
                  setTimeout(() => {
                    $('html, body').css('overflow', '');
                  }, 1000);

                  setTimeout(() => {
                    let nameInput = $('#edit-name');
                    let commentTextarea = $('#edit-comment-body-0-value');
                    
                    if (nameInput.length) {
                      nameInput.focus();
                    } else if (commentTextarea.length) {
                      commentTextarea.focus();                      
                    }
                  }, 200);
                }
              );

            }
          }, 500); 
        }
      });

    }
  };
})(jQuery, Drupal);
