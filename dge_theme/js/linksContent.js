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


document.addEventListener('DOMContentLoaded', function () {
  var enlaces = document.querySelectorAll('a');
  var hostActual = window.location.hostname;

  enlaces.forEach(function (enlace) {
    var href = enlace.getAttribute('href');
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('javascript:') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return; 
    }
    var link = document.createElement('a');
    link.href = href;
    var enlaceHost = link.hostname;
    var esInterno = (
      enlaceHost === hostActual ||
      enlaceHost.endsWith('.' + hostActual) ||
      enlaceHost === 'datos.gob.es'
    );
    if (!esInterno) {
      if (!enlace.hasAttribute('target') || enlace.getAttribute('target') !== '_blank') {
        enlace.setAttribute('target', '_blank');
        enlace.setAttribute('rel', 'noopener noreferrer');
      }
    }
  });
});