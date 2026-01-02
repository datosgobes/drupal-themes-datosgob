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


function createRemoveBadgeSpan() {

  const closeImg = document.createElement('img');
  closeImg.src = '/themes/custom/dge_theme/images/icons/close.svg';
  closeImg.alt = 'Close icon';

  const closeSpan = document.createElement('span');
  closeSpan.classList.add('badge__close', 'decoration-arrow');
  closeSpan.appendChild(closeImg);

  return closeSpan;
}


function createClearAllFiltersButton() {
  const isRemoveFiltersBtn = document.querySelector('.remove-filter');
  const badgeClearBtnContainer = document.querySelector('.tags .badge-clear-all');
  const tagsContainer = document.querySelector('.tags');

  if (!badgeClearBtnContainer || !tagsContainer) {
    return;
  }

  if (tagsContainer.classList.contains('hide')) {
    tagsContainer.classList.remove('hide');
  }

  const activeFacets = document.querySelectorAll('.tags .badge-group .badge');

  const activeTextInputs = Array.from(document.querySelectorAll('input[type="text"], input[type="date"]')).filter(input => input.value.trim() !== "");

  const autoCompleteFields = document.querySelectorAll('input[data-drupal-selector="edit-text"]');
  let hasAutoCompleteValue = false;
  
  autoCompleteFields.forEach(field => {
    if (field.value.trim() !== "") {
      hasAutoCompleteValue = true;
    }
  });

  const hasActiveFilters = activeFacets.length > 0 || activeTextInputs.length > 0 || hasAutoCompleteValue;

  if (!isRemoveFiltersBtn && hasActiveFilters) {
    const divLink = document.createElement('div');
    divLink.classList.add('link', 'link--primary');
    const divFieldItem = document.createElement('div');
    divFieldItem.classList.add('field__item');

    const clearBtn = document.createElement('a');
    clearBtn.textContent = Drupal.t('Delete filters');
    const spanRemoveFilter = document.createElement('span');
    spanRemoveFilter.classList.add('remove-filter');
    const removeIcon = document.createElement('img');
    removeIcon.src = '/themes/custom/dge_theme/images/icons/trash-can.svg';
    removeIcon.alt = 'remove icon';

    spanRemoveFilter.appendChild(removeIcon);
    clearBtn.appendChild(spanRemoveFilter);
    divFieldItem.appendChild(clearBtn);
    divLink.appendChild(divFieldItem);

    badgeClearBtnContainer.appendChild(divLink);

    badgeClearBtnContainer.style.display = 'block';

    clearBtn.addEventListener('click', function (event) {
      event.preventDefault();

      var urlActual = window.location.href;

      var urlSinParametros = urlActual.split('?')[0];
      var urlBase;

      if (urlSinParametros.includes("site-search")) {
        var segmentos = urlSinParametros.split('/');
        var urlBase = segmentos.slice(0, 4).join('/'); 
        const idiomasPermitidos = ['es', 'en', 'gl', 'ca', 'eu'];
        if (segmentos.length > 4 && idiomasPermitidos.includes(segmentos[3])) {
          urlBase = segmentos.slice(0, 6).join('/');
        }

        let urlObj = new URL(urlActual, window.location.origin); 
        let parametros = new URLSearchParams(urlObj.search); 
        let valorText = parametros.get("text");
        urlBase = urlBase + '?text=' + valorText; 

      } else if (urlSinParametros.includes("conocimiento") && urlSinParametros.includes("tipo"))  {
        var indexConocimiento = urlSinParametros.indexOf('/conocimiento');
        if (indexConocimiento !== -1) {
          var indexTipo = urlSinParametros.indexOf('/tipo', indexConocimiento);
          if (indexTipo !== -1) {
            var basePart = urlSinParametros.substring(0, indexConocimiento + '/conocimiento'.length);
            var filtersPart = urlSinParametros.substring(indexTipo);
            urlBase = basePart + filtersPart;
          } else {
            urlBase = urlSinParametros;
          }
        }
      } else {
        var segmentos = urlSinParametros.split('/');
        var urlBase = segmentos.slice(0, 4).join('/'); 
        const idiomasPermitidos = ['es', 'en', 'gl', 'ca', 'eu'];
        if (segmentos.length > 4 && idiomasPermitidos.includes(segmentos[3])) {
          urlBase = segmentos.slice(0, 5).join('/'); 
        }
      }
      window.location.href = urlBase;
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(createClearAllFiltersButton, 500);
});


function removeFulltextFilter(fulltextValue) {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  for (const [key, value] of params.entries()) {
    if (key === "search_api_fulltext" && value === fulltextValue) {
      params.delete(key);
      break; 
    }
  }

  const cleanUrl = url.toString();
  window.location.href = cleanUrl;
}
