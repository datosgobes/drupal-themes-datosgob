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


(function ($, Drupal, once) {
  Drupal.behaviors.customFacetSearchboxCheckbox = {
    attach: function (context, settings) {

      var facetsRegion = context.querySelector('.region.region-content-list-filters');
      if (facetsRegion) {
        var config = { childList: true, subtree: true };

        var callback = function (mutationsList, observer) {
          for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
              observer.disconnect();

              var searchboxContainers = once('facets-widget-searchbox-checkbox', '.facets-widget-searchbox_checkbox', context);
              if (searchboxContainers.length) {
                searchboxContainers.forEach(function (container) {
                  var searchboxInput = container.querySelector('.facets-widget-searchbox');
                  var checkboxList = container.querySelector('ul');

                  once('searchbox-input-click', searchboxInput).forEach(function () {
                    searchboxInput.addEventListener('click', function (event) {
                      event.stopPropagation();
                      document.querySelectorAll('.facets-widget-searchbox_checkbox ul.show').forEach(function (otherList) {
                        if (otherList !== checkboxList) {
                          otherList.classList.remove('show');
                        }
                      });
                      checkboxList?.classList.toggle('show');
                    });
                    updatePlaceholder(searchboxInput);
                  });

                  once('searchbox-input-keydown', searchboxInput).forEach(function () {
                    searchboxInput.addEventListener('keydown', function (event) {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        event.stopPropagation();
                        document.querySelectorAll('.facets-widget-searchbox_checkbox ul.show').forEach(function (otherList) {
                          if (otherList !== checkboxList) {
                            otherList.classList.remove('show');
                          }
                        });
                        checkboxList?.classList.toggle('show');
                        
                        if (checkboxList && checkboxList.classList.contains('show')) {
                          setTimeout(function(){
                            var firstCheckbox = checkboxList.querySelector('input.facets-checkbox');
                            if(firstCheckbox) {
                              firstCheckbox.focus();
                            }
                          }, 0);
                        }
                      }
                    });
                  });
                  
                  
                });

                once('facet-checkbox-keydown', '.facets-checkbox', context).forEach(function (checkbox) {
                  checkbox.setAttribute('tabindex', '0');
                  checkbox.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      checkbox.click();
                    }
                    else if (event.key === 'Escape') {
                      event.preventDefault();
                      event.stopPropagation();
                      var container = checkbox.closest('.facets-widget-searchbox_checkbox');
                      if (container) {
                        var ul = container.querySelector('ul');
                        if (ul) {
                          ul.classList.remove('show');
                        }
                        var input = container.querySelector('.facets-widget-searchbox');
                        if (input) {
                          input.focus();
                        }
                      }
                    }
                  });
                });
                

                document.addEventListener('click', function () {
                  document.querySelectorAll('.facets-widget-searchbox_checkbox ul.show').forEach(function (list) {
                    list.classList.remove('show');
                  });
                });

                document.querySelectorAll('.facets-checkbox').forEach(function(checkbox) {
                  checkbox.addEventListener('change', function() {
                    if (checkbox.checked) {
                      checkbox.classList.add('checked');
                    } else {
                      checkbox.classList.remove('checked');
                    }
                  });
                });
                document.querySelectorAll('.facet-item input.facets-checkbox').forEach(function(checkbox) {
                  checkbox.addEventListener('focus', function() {
                    checkbox.closest('.facet-item').classList.add('focused');
                  });
                  checkbox.addEventListener('blur', function() {
                    checkbox.closest('.facet-item').classList.remove('focused');
                  });
                });
              }
            }
          }
        };

        var observer = new MutationObserver(callback);
        observer.observe(facetsRegion, config);
      }
    }
  };


  function updatePlaceholder(input) {
    var selectedValues = [];
    var checkboxes = Array.prototype.slice.call(input.parentNode.querySelectorAll('.facets-checkbox'));

    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        var labelText = checkbox.labels[0].innerText.trim();
        labelText = labelText.replace(/\(\d+\)$/, '').trim();
        selectedValues.push(labelText);
      }
    });

    addArrowIcon(input);

    if (selectedValues.length > 0) {
      input.setAttribute('placeholder', selectedValues.join(', ') + ' ');
    } else {
      input.setAttribute('placeholder', Drupal.t('Select...'));
    }
  }


  function addArrowIcon(input) {
    var existingArrow = input.parentNode.querySelector('.input-arrow');
  
    if (!existingArrow) {
      var arrowSpan = document.createElement('span');
      arrowSpan.classList.add('input-arrow');
      arrowSpan.setAttribute('aria-hidden', 'true');
      arrowSpan.setAttribute('tabindex', '-1');
      arrowSpan.style.cursor = 'pointer';
  
      var arrowImg = document.createElement('img');
      arrowImg.src = '/themes/custom/dge_theme/images/icons/blue-arrow.svg';
      arrowImg.alt = '';
      arrowImg.setAttribute('aria-hidden', 'true');
      arrowImg.setAttribute('tabindex', '-1');
  
      arrowSpan.appendChild(arrowImg);
      input.parentNode.insertBefore(arrowSpan, input.nextSibling);
  
      arrowSpan.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        input.dispatchEvent(new Event('click', { bubbles: true }));
      });
    }
  }
})(jQuery, Drupal, once);
