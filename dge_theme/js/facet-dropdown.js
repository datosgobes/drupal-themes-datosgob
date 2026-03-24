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


(function (Drupal, once) {
  Drupal.behaviors.customFacetDropdown = {
    attach: function (context, settings) {
      
      var dropdownFacets = once('facets-widget-dropdown', '.facets-widget-dropdown', context);
      if (dropdownFacets.length === 0 && context !== document) {
        dropdownFacets = once('facets-widget-dropdown', '.facets-widget-dropdown', document);
      }
      
      dropdownFacets.forEach(function (facet) {
        
        var config = { childList: true, subtree: true };
  
        var callback = function (mutationsList, observer) {
          for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {

              var addedNodes = Array.from(mutation.addedNodes);
             
              var selectElement = addedNodes.find(node => node.classList && node.classList.contains('facets-dropdown'));
              var ulElement = facet.querySelector('.js-facets-dropdown-links.item-list__dropdown');
              if (selectElement && ulElement) {
                
                observer.disconnect();
                
                var facetId = selectElement.getAttribute('data-drupal-facet-id');
                if (facetId) {
                  selectElement.setAttribute('id', facetId);
                  selectElement.style.display = 'none';
      
                  var selectedOption = selectElement.options[selectElement.selectedIndex];
      
                  var newDivElement = document.createElement('div');
                  newDivElement.classList.add('form-select', 'dropdown');
      
                  var buttonElement = document.createElement('button');
                  buttonElement.classList.add('btn', 'dropdown-button', 'facet-dropdown-button');
                  buttonElement.setAttribute('href', '#');
                  buttonElement.setAttribute('role', 'button');
                  buttonElement.setAttribute('id', 'facet-custom-dropdown-' + facetId);
                  buttonElement.setAttribute('data-toggle', 'dropdown');
                  buttonElement.setAttribute('aria-haspopup', 'true');
                  buttonElement.setAttribute('aria-expanded', 'false');
      
                  if (selectedOption.index !== 0) {
                    buttonElement.innerText = selectedOption.innerText.split('(')[0].trim();
                  } else {
                    buttonElement.innerText = Drupal.t('Select...');
                  }
      
                  var ulElementNew = document.createElement('ul');
                  ulElementNew.classList.add('dropdown-menu');
                  ulElementNew.setAttribute('aria-labelledby', 'facet-custom-dropdown-' + facetId);
      
                  ulElement.querySelectorAll('li').forEach(function (liElement) {
                    if (!liElement.classList.contains('default-option')) {
                      var value = liElement.querySelector('.facet-item__value').innerText.trim();
                      var count = liElement.querySelector('.facet-item__count')?.innerText.trim();
      
                      var aElement = document.createElement('a');
                      aElement.classList.add('dropdown-item', 'facet-dropdown-item');
                      aElement.setAttribute('href', liElement.querySelector('a').getAttribute('href'));
                      aElement.setAttribute('idparent', 'facet-custom-dropdown-' + facetId);
                      aElement.setAttribute('idselect', facetId);
                      aElement.innerText = value + count;
      
                      var liNewElement = document.createElement('li');
                      liNewElement.appendChild(aElement);
                      ulElementNew.appendChild(liNewElement);
                    }
                  });
      
                  newDivElement.appendChild(buttonElement);
                  newDivElement.appendChild(ulElementNew);
      
                  ulElement.parentElement.appendChild(newDivElement);
                  facetDropdownAddEventListeners(context);
                }
              }      
            }
          }
        };

        var observer = new MutationObserver(callback);
        observer.observe(facet, config);

      });
    },
    weight: 99999999
  };

  function facetDropdownAddEventListeners(context) {
    var dropdownButtons = once('facet-dropdown-button', ".facet-dropdown-button", context);
    if (dropdownButtons.length === 0 && context !== document) {
      dropdownButtons = once('facet-dropdown-button', '.facet-dropdown-button', document);
    }
    dropdownButtons.forEach(function (button) {
      addFacetDropdownArrowIcon(button);
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var dropdown = event.currentTarget.nextElementSibling;
        toggleDropdown(dropdown);
      });
    });

    var dropdownItems = once('facet-dropdown-item', ".facet-dropdown-item", context);
    if (dropdownItems.length === 0 && context !== document) {
      dropdownItems = once('facet-dropdown-item', '.facet-dropdown-item', document);
    }
    dropdownItems.forEach(function (item) {
      item.addEventListener("click", function (event) {
        updateDropdown(event);
      });
    });

    document.addEventListener("click", function (event) {
      var target = event.target;
      var isDropdownButton = target?.closest(".dropdown-button");
      var isDropdownItem = target?.closest(".dropdown-item");
      var isDropdownMenu = target?.closest(".dropdown-menu");

      if (!isDropdownButton && !isDropdownItem && !isDropdownMenu) {
        closeDropdowns();
      }
    });
  }

  function addFacetDropdownArrowIcon(button) {
    var arrowSpan = document.createElement('span');
    arrowSpan.classList.add('input-arrow');
    var arrowImg = document.createElement('img');
    arrowImg.src = '/themes/custom/dge_theme/images/icons/blue-arrow.svg';
    arrowImg.alt = '';
    arrowSpan.appendChild(arrowImg);
    button.appendChild(arrowSpan);
  }

})(Drupal, once);