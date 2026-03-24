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

function adjustAllNextDivsMargin() {
  const allDivs = document.querySelectorAll('div.layout');
  let accumulatedHeight = 0;

  for (let i = 0; i < allDivs.length; i++) {
    const div = allDivs[i];

    if (accumulatedHeight > 0) {
      div.style.marginTop = `${accumulatedHeight - 2}px`;
    }

    if (div.classList.contains('layout--full')) {
      accumulatedHeight += div.offsetHeight;
    } else {
      accumulatedHeight = 0;
    }
  }
}

document.addEventListener("DOMContentLoaded", adjustAllNextDivsMargin);
