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

(function ($,once, Drupal) {
    Drupal.behaviors.customDataTable= {
        attach: function (context, settings) {   
$(once('customDataTable','#dataset-comments',context).forEach(function(){

    var table = $('#dataset-comments').DataTable( {
        
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'csv',
                text: 'Descargar CSV',
                className: 'exportCSV feed-icon'
            }
        ],
        
        "columnDefs": [
            { "orderable": false, "targets": -1 }
        ],
        "bDestroy": true,
        
        "ajax":{
            "type": "GET",
            "url" :"/comments/dge/data_comments",
            "error": function(xhr, error, thrown) {
                console.log(xhr, error, thrown);
            }
        }
        
        ,
        "columns": [
       
            { 
                "data": "Comment_content",
                "className": 'details-control',
                "render": function(data, type, row) {
                    
                   
                    return '<div class="truncated" >'+data+'</div>';
              
                }
            },
            { "data": "Comment_username" },
            { "data": "Package_title" },
            { "data": "Comment_email" },
            { 
                "data": "Comment_created_at.max",
                "render": function(data, type, row) {
                    if(type === 'display' || type === 'filter') {
                        var date = new Date(data);
                        return date.toLocaleDateString("es-ES");
                    }
                   
                    return data;
                }
            },
            
            { 
                "data": "Comment_state",
                "render": function(data, type, row) {
                    if(data === "approved") {
                        return "Aprobado";
                    } else if(data === "draft") {
                        return "Borrador";
                    } else {
                        return data;
                    }
                }
            },
            { "data": "Package_name", "name": "Package_name",
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                if(oData.Package_name) {
                    $(nTd).html("<a href='/catalogo/"+oData.Package_name+ '?commentId='+ oData.Comment_id+  "'>"+'Ver más'+"</a>");
                }
            },
            
        },
          
        ],
        "order": [[4, 'desc']],
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
    
      
    } );

    $('#date-max').on('change', function(e) {


        var min = $('#date-min').val() || null;
        var max = $('#date-max').val() || null;

        $('#date-max').closest('.form-item').find('.form-item--error-message').remove();
        $('#date-max').removeClass('error');

        if (min && max && new Date(max) < new Date(min)) {
            const errorMsg = $('<div class="form-item--error-message error-message-dates-label">' + 'La fecha "Actualizado desde" no puede ser posterior a la fecha "Actualizado hasta".' + '</div>');

            $('#date-max').closest('.form-item').append(errorMsg);
            $('#date-max').addClass('error');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;

          
        }else {
            $('#date-max').closest('.form-item').find('.form-item--error-message').remove();
            $('#date-max').removeClass('error');
       
          }

        $.fn.dataTable.ext.search.pop();

        $.fn.dataTable.ext.search.push(
            function(settings, data, dataIndex) {

                var min = $('#date-min').val() || null;
                var max = $('#date-max').val() || null;

                var dateParts = data[4].split('/');
                var dateStr = dateParts[2] + '-' + ('0' + dateParts[1]).slice(-2) + '-' + ('0' + dateParts[0]).slice(-2);

                if (
                    (!min || dateStr >= min) &&
                    (!max || dateStr <= max)   
                ) {
                    return true;
                }
                return false;
            }
        );

        table.draw();
    });

    $('#date-min').on('change', function(e) {

        var min = $('#date-min').val() || null;
        var max = $('#date-max').val() || null;

        $('#date-min').closest('.form-item').find('.form-item--error-message').remove();
        $('#date-min').removeClass('error');

         if (min && max && new Date(min) > new Date(max)  ) {
            const errorMsg = $('<div class="form-item--error-message error-message-dates-label">' + 'La fecha "Actualizado desde" no puede ser posterior a la fecha "Actualizado hasta".' + '</div>');

            $('#date-min').closest('.form-item').append(errorMsg);
            $('#date-min').addClass('error');
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;

          
        } else {
            $('#date-min').closest('.form-item').find('.form-item--error-message').remove();
            $('#date-min').removeClass('error');
       
        }

        $.fn.dataTable.ext.search.pop();
        $.fn.dataTable.ext.search.push(
            function(settings, data, dataIndex) {

                var min = $('#date-min').val() || null;
                var max = $('#date-max').val() || null;

                var dateParts = data[4].split('/');
                var dateStr = dateParts[2] + '-' + ('0' + dateParts[1]).slice(-2) + '-' + ('0' + dateParts[0]).slice(-2);

                if (
                    (!min || dateStr >= min) && 
                    (!max || dateStr <= max) 
                ) {
                    return true;
                }
                return false;
            }
        );

        table.draw();
    }
    );

    $('.exportCSV').detach().appendTo('#dge-custom-csv');

    $('#asunto').on('keyup', function() {
        table.column(0).search(this.value).draw();
    });
    $('#autor').on('keyup', function() {
        table.column(1).search(this.value).draw();
    });
    $('#dataset').on('keyup', function() {
        table.column(2).search(this.value).draw();
    });
    $('#email').on('keyup', function() {
        table.column(3).search(this.value).draw();
    });
    $('#state').on('keyup', function() {
        table.column(5).search(this.value).draw();
    });

    function format (data) {
        return '<div class="child-row">' + data.Comment_content + '</div>';
    }

    $(table.table().container()).on('keyup', 'thead input', function () {
        table
            .column($(this).data('index'))
            .search(this.value)
            .draw();
    });

     $('thead input').click(function(e) {
        e.stopPropagation();
    });
}))
       
    }};
})(jQuery,once, Drupal);