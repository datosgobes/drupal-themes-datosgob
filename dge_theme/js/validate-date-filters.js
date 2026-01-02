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

(function ($, Drupal) {
    Drupal.behaviors.validateDateFilters = {
      attach: function (context, settings) {
        const $form = $('.views-exposed-form', context);
        if (!$form.length) return;
  
        function validarRangoFechas($desde, $hasta, mensajeDesde, mensajeHasta) {
          if (!$desde.length || !$hasta.length) return;
  
          $desde.on('change', function (e) {
            const desdeVal = new Date($desde.val());
            const hastaVal = new Date($hasta.val());
  
            if ($desde.val() && $hasta.val() && desdeVal > hastaVal) {
              $desde.closest('.form-item').find('.form-item--error-message').remove();
              const errorMsg = $('<div class="form-item--error-message error-message-dates-label">' + mensajeDesde + '</div>');
              $desde.closest('.form-item').append(errorMsg);
              $desde.addClass('error');
  
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            } else {
              $desde.closest('.form-item').find('.form-item--error-message').remove();
              $desde.removeClass('error');
            }
          });
  
          $hasta.on('change', function (e) {
            const desdeVal = new Date($desde.val());
            const hastaVal = new Date($hasta.val());
  
            if ($desde.val() && $hasta.val() && hastaVal < desdeVal) {
              $hasta.closest('.form-item').find('.form-item--error-message').remove();
              const errorMsg = $('<div class="form-item--error-message error-message-dates-label">' + mensajeHasta + '</div>');
              $hasta.closest('.form-item').append(errorMsg);
              $hasta.addClass('error');
  
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            } else {
              $hasta.closest('.form-item').find('.form-item--error-message').remove();
              $hasta.removeClass('error');
            }
          });
        }
  
        const $fechaDesde = $('#edit-field-fecha-publicacion-contenid--2', context);
        const $fechaHasta = $('#edit-field-fecha-publicacion-contenid-1--2', context);
        validarRangoFechas(
          $fechaDesde,
          $fechaHasta,
          'La "Fecha publicación desde" no puede ser posterior a la "Fecha publicación hasta".',
          'La "Fecha publicación hasta" no puede ser anterior a la "Fecha publicación desde".'
        );
  
        const $createdDesde = $('#edit-created--2', context);
        const $createdHasta = $('#edit-created-1--2', context);
        validarRangoFechas(
          $createdDesde,
          $createdHasta,
          'La "Fecha solicitud desde" no puede ser posterior a la "Fecha solicitud hasta".',
          'La "Fecha solicitud hasta" no puede ser anterior a la "Fecha solicitud desde".'
        );
  
        const $eventoDesde = $('#edit-field-fecha-evento--2', context);
        const $eventoHasta = $('#edit-field-fecha-evento-1--2', context);
        validarRangoFechas(
          $eventoDesde,
          $eventoHasta,
          'La "Fecha evento desde" no puede ser posterior a la "Fecha evento hasta".',
          'La "Fecha evento hasta" no puede ser anterior a la "Fecha evento desde".'
        );

        const $adminPanelPublicacionDesde = $('#edit-field-fecha-publicacion-contenid-value--2', context);
        const $adminPanelPublicacionHasta = $('#edit-field-fecha-publicacion-contenid-value-1--2', context);
        validarRangoFechas(
          $adminPanelPublicacionDesde,
          $adminPanelPublicacionHasta,
          'La "Fecha publicación desde" no puede ser posterior a la "Fecha publicación hasta".',
          'La "Fecha publicación hasta" no puede ser anterior a la "Fecha publicación desde".'
        );


         const $adminPanelActualizacionDesde = $('#edit-changed--2', context);
         const $adminPanelActualizacionHasta = $('#edit-changed-1--2', context);
         validarRangoFechas(
           $adminPanelActualizacionDesde,
           $adminPanelActualizacionHasta,
           'La "Fecha actualización desde" no puede ser posterior a la "Fecha actualización hasta".',
           'La "Fecha actualización hasta" no puede ser anterior a la "Fecha actualización desde".'
         );

      }
    };
  })(jQuery, Drupal);
  