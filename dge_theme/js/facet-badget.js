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


(function ($, Drupal, once) {
    Drupal.behaviors.facetBadget = {
      attach: function (context, settings) {

            $(once('facets-blocks', '.facets-widget-searchbox_checkbox')).each(
                function (){
                    const badgeContainer = $('.tags .badge-group');
                    const activeSearchboxFacets = $('.facet-item a.is-active', $(this));

                    if (activeSearchboxFacets?.length) {
                        activeSearchboxFacets.each(function (facet) {
                            var badge = createSearchboxCheckboxFacetBadge($(this));
                            badgeContainer.append(badge);
                            badgeContainer.parent().removeClass('hide');
                            badgeContainer.parent().addClass('flex');
                        });
                    }
                }
            )

            $(once('facets-blocks-dropdown', '.facets-widget-dropdown')).each(
                function (){

                    const badgeContainer = $('.tags .badge-group');
                    const activeSearchboxFacets = $('.facet-item a.is-active', $(this));

                    if (activeSearchboxFacets?.length) {
                        activeSearchboxFacets.each(function (facet) {
                            var badge = createSearchboxCheckboxFacetBadge($(this));
                            badgeContainer.append(badge);
                            badgeContainer.parent().removeClass('hide');
                            badgeContainer.parent().addClass('flex');
                        });
                    }
                }
            )

            $(once('facets-blocks-fulltext', '.form-item-search-api-fulltext')).each(
                function (){

                    const badgeContainer = $('.tags .badge-group');
                    const valueFullText = $('input', $(this));
                    if(valueFullText.val() && !$('.badge-fulltext', badgeContainer).length>0){
                        var badge = createFulltextBadge(valueFullText);
                        badgeContainer.append(badge);
                        badgeContainer.parent().removeClass('hide');
                        badgeContainer.parent().addClass('flex');
                    }
                }
            )
        
            createClearAllFiltersButton();
        }
    };   

    function createSearchboxCheckboxFacetBadge(facet) {
        const badge = $('<a>').addClass('badge');
        const facetValue = $(facet).find('.facet-item__value').text();
        const badgeContent = $('<span>').text(`${facetValue} `);
        badge.append(badgeContent);
    
        var closeSpan = createRemoveBadgeSpan();
        
        const facetUrlParam = facet.attr('href');
        badge.attr('href', facetUrlParam)

        badge.append(closeSpan);
    
        return badge;
    }

    
    function createFulltextBadge(fulltextInput) {
        const badge = $('<div>').addClass('badge').addClass('badge-fulltext');
    
        const fulltextValue = $(fulltextInput).val();
        const badgeContent = $('<span>').text(`${fulltextValue} `);
        badge.append(badgeContent);
    
        var closeSpan = createRemoveBadgeSpan();
        $(closeSpan).on('click', function (event) {
            event.preventDefault();
            removeFulltextFilter(fulltextValue);
        });
          
        badge.append(closeSpan);

        return badge;
    }

  
  })(jQuery, Drupal, once);