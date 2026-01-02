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

document.addEventListener("DOMContentLoaded", function () {
  const maxLines = 6;
  const elements = document.querySelectorAll(
    ".layout--cta-themes .layout__region--second .block-block-content .field--type-text-with-summary p, .layout--cta-themes .layout__region--second .block-inline-blocktematicas .field--type-text-with-summary p"
  );

  elements.forEach((el) => {
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * maxLines;

    const originalText = el.textContent;
    const words = originalText.split(" ");
    let truncatedText = "";

    el.textContent = "";

    for (let i = 0; i < words.length; i++) {
      const testText = truncatedText + words[i] + "...";
      el.textContent = testText;

      if (el.offsetHeight > maxHeight) {
        el.textContent = truncatedText.trim() + "...";
        break;
      }

      truncatedText += words[i] + " ";
    }
  });
});
