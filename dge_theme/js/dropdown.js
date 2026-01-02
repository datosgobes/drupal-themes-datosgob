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

document.addEventListener("DOMContentLoaded", function() {
  var label = document.querySelector("label[for='edit-field-year-create-reuse-co-0-value-year']");
  if (label) {
    label.style.display = "none"; 
   
  }
  var dropdownButtons = document.querySelectorAll(".dropdown-button");

  dropdownButtons = Array.from(dropdownButtons).filter(function(button) {
    return !button.classList.contains("facet-dropdown-button");
  });

  dropdownButtons.forEach(function(button) {
    var selectId = button.getAttribute("id").replace("-dropdown", "");
    var parent = button.parentElement;
    if (parent.hasAttribute('disabled')) {
      button.setAttribute('disabled', 'disabled');
    }

    button.addEventListener("click", function(event) {
      event.preventDefault();
      var dropdown = event.currentTarget.parentNode.querySelector(".dropdown-menu");
      toggleDropdown(dropdown, button);

      if (selectId === "edit-field-year-create-reuse-co-0-value-year") {
        var dropdown = button.parentNode.querySelector(".dropdown-menu");
        positionDropdownOnCurrentYear(dropdown);
      }
    });

    button.addEventListener("keydown", function(event) {
      if (event.target !== button) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        var dropdown = button.parentNode.querySelector(".dropdown-menu");
        toggleDropdown(dropdown, button);
        var items = Array.from(dropdown.querySelectorAll(".dropdown-item"));
        var validItems = items.filter(function(item) {
          return item.getAttribute("data-value").trim() !== "";
        });

        if (validItems.length > 0) {
          validItems[0].focus();
        }

        if (selectId === "edit-field-year-create-reuse-co-0-value-year") {
          positionDropdownOnCurrentYear(dropdown);
        }
      }
    });
    
  });

  var dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownItems.forEach(function (item) {
    item.setAttribute("tabindex", "0");

    item.addEventListener("keydown", function(event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusNextItem(item);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusPrevItem(item);
      } else if (event.key === "Escape") {
        event.preventDefault();
        var dropdown = item.closest(".dropdown-menu");
        closeDropdown(dropdown);
        var button = dropdown.previousElementSibling;
        if (button) {
          button.focus();
        }
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        item.click();
      }
    });

    var checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox) {
      item.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleCheckboxSelection(event);
      });
    } else {
      item.addEventListener("click", function (event) {
        updateDropdown(event);
      });
    }
  });

  document.addEventListener("click", function(event) {
    var target = event.target;
    var isDropdownButton = target.closest(".dropdown-button");
    var isDropdownItem = target.closest(".dropdown-item");
    var isDropdownMenu = target.closest(".dropdown-menu");

    if (!isDropdownButton && !isDropdownItem && !isDropdownMenu) {
      closeDropdowns();
    }
  }); 
});

function positionDropdownOnCurrentYear(dropdown) {
  var currentYear = new Date().getFullYear();
  var selectedItem = Array.from(dropdown.querySelectorAll(".dropdown-item")).find(
    item => parseInt(item.dataset.value) === currentYear
  );

  if (selectedItem) {
    setTimeout(() => {
      selectedItem.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 100);
  }
}

function toggleDropdown(dropdown, button) {
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
    if (button) {
    button.setAttribute("aria-expanded", "false");
    }
  } else {
    dropdown.style.display = "block";
    if (button) {
    button.setAttribute("aria-expanded", "true");
    }
  }
}

function closeDropdown(dropdown) {
  dropdown.style.display = "none";
  var button = dropdown.previousElementSibling;
  if (button) {
    button.setAttribute("aria-expanded", "false");
  }
}

function focusNextItem(currentItem) {
  var items = Array.from(currentItem.closest(".dropdown-menu").querySelectorAll(".dropdown-item"));
  var currentIndex = items.indexOf(currentItem);
  var nextIndex = (currentIndex + 1) % items.length;
  items[nextIndex].focus();
}

function focusPrevItem(currentItem) {
  var items = Array.from(currentItem.closest(".dropdown-menu").querySelectorAll(".dropdown-item"));
  var currentIndex = items.indexOf(currentItem);
  var prevIndex = (currentIndex - 1 + items.length) % items.length;
  items[prevIndex].focus();
}

function updateDropdown(event) {
  var selected = event.currentTarget.innerHTML;
  var id = event.currentTarget.getAttribute("idParent");
  document.getElementById(id).textContent = selected;

  var value = event.currentTarget.dataset.value;
  var selectId = event.currentTarget.getAttribute("idSelect");
  document.getElementById(selectId).value = value;

  var select = document.getElementById(selectId);
  fireEvent(select, "change");

  var dropdown = event.currentTarget.closest(".dropdown-menu");
  toggleDropdown(dropdown, dropdown.previousElementSibling);
}

function toggleCheckboxSelection(event) {
  var item = event.currentTarget;
  var checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;

  var dropdown = item.closest(".dropdown-multiselect");
  var dropdownButton = dropdown.querySelector(".dropdown-button");
  var selectId = dropdownButton.getAttribute("id").replace("-dropdown", "");
  var selectElement = document.getElementById(selectId);

  var noneValues = ['- Ninguno -', '- None -', '- Cap -', '- Ningún -', '- Bat ere ez -'];
  var selectedOptions = [];
  var defaultText = Drupal.t("Seleccionar..."); 

  dropdown.querySelectorAll('input[type="checkbox"]:checked').forEach(function (checkedInput) {
    var optionText = checkedInput.closest(".dropdown-item").textContent.trim();
    if (!noneValues.includes(optionText)) {
      selectedOptions.push(optionText);
    }
  });

  if (selectedOptions.length === 0) {
    dropdownButton.textContent = defaultText; 
  } else {
    dropdownButton.textContent = selectedOptions.join(", ");
  }

  Array.from(selectElement.options).forEach(function (option) {
    if (noneValues.includes(option.textContent.trim())) {
      option.selected = selectedOptions.length === 0;
    } else {
      option.selected = selectedOptions.includes(option.textContent.trim());
    }
  });

  fireEvent(selectElement, "change");
}

function fireEvent(element, event){
  if (document.createEventObject){
    var evt = document.createEventObject();
    return element.fireEvent("on" + event, evt);
  } else {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true);
    return !element.dispatchEvent(evt);
  }
}

function closeDropdowns() {
  var dropdownMenus = document.querySelectorAll(".dropdown-menu");
  dropdownMenus.forEach(function(menu) {
    menu.style.display = "none";
    var button = menu.previousElementSibling;
    if (button) {
      button.setAttribute("aria-expanded", "false");
    }
  });
}