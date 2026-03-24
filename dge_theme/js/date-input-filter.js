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

(function ($, Drupal) {
    Drupal.behaviors.setNativeDateInput = {
      attach: function (context) {
        $('input[name="field_fecha_de_publicacion"]', context).attr('type', 'date');
        $('input[name="field_fecha_de_publicacion_1"]', context).attr('type', 'date');
        $('input[name="field_fecha_publicacion_contenid"]', context).attr('type', 'date');
        $('input[name="field_fecha_publicacion_contenid_1"]', context).attr('type', 'date');
        $('input[name="field_fecha_publicacion_contenid_value"]', context).attr('type', 'date');
        $('input[name="field_fecha_publicacion_contenid_value_1"]', context).attr('type', 'date');
        $('.views-exposed-form input[name="changed"]', context).attr('type', 'date');
        $('.views-exposed-form input[name="changed_1"]', context).attr('type', 'date');
        $('input[name="field_fecha_evento"]', context).attr('type', 'date');
        $('input[name="field_fecha_evento_1"]', context).attr('type', 'date');
        $('input[name="created_1"]', context).attr('type', 'date');
        $('input[name="created"]', context).attr('type', 'date');
      }
    };
  })(jQuery, Drupal);
  