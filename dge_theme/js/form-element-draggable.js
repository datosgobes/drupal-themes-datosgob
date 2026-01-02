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
    function applyWidth() {
      if (window.innerWidth >= 768) {
        document.querySelectorAll(
          'table[id^="field-url-aplicacion-values"].field-multiple-table tbody tr td:nth-child(2), ' +
          'table[id^="field-url-catalogo-values"].field-multiple-table tbody tr td:nth-child(2)'
        ).forEach((td) => {
          td.style.cssText = "width: 100% !important; display: table-cell !important;";
        });
      }
    }

    function attachClickListener() {
      let addButtons = document.querySelectorAll(
        'input[data-drupal-selector="edit-field-url-aplicacion-add-more"], ' +
        'input[data-drupal-selector="edit-field-url-catalogo-add-more"]'
      );

      addButtons.forEach((addButton) => {
        addButton.addEventListener("click", function () {
          applyWidth();
        });

        if (!sessionStorage.getItem("ajaxInitialized") && window.innerWidth >= 768) {
          addButton.click();
          sessionStorage.setItem("ajaxInitialized", "true");
        }
      });
    }

    Drupal.behaviors.applyTableWidth = {
      attach: function (context, settings) {
        attachClickListener();
      }
    };

    $(document).ajaxComplete(function (event, xhr, settings) {
      if (
        settings.extraData &&
        (settings.extraData._triggering_element_name === "field_url_aplicacion_add_more" ||
         settings.extraData._triggering_element_name === "field_url_catalogo_add_more")
      ) {
        applyWidth();
      }
    });

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
          let newButtons = document.querySelectorAll(
            'input[data-drupal-selector="edit-field-url-aplicacion-add-more"], ' +
            'input[data-drupal-selector="edit-field-url-catalogo-add-more"]'
          );

          newButtons.forEach((newButton) => {
            newButton.addEventListener("click", function () {
              applyWidth();
            });
          });

          observer.disconnect();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

})(jQuery, Drupal);