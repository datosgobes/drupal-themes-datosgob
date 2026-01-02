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
    function focusInput() {
        let input = document.querySelector("input[data-drupal-selector='edit-text']");
        if (input && input.value.trim() !== "") {
            input.focus();

            let length = input.value.length;
            input.setSelectionRange(length, length);
        }
    }

    window.addEventListener("load", function () {
        focusInput();
    });

    let observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                focusInput();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
