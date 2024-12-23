$(document).ready(function () {
  
  tblRegistroVentas.on('responsive-resize', function(e, datatable, columns) {
    datatable.rows().every(function(rowIdx, tableLoop, rowLoop) {
      var row = datatable.row(rowIdx).node();
      var data = datatable.row(rowIdx).data();
      var ruc = $('#hRUC').val();
      $(row).attr('data-ruc', ruc);
      $(row).attr('data-tipodocto', data.tipodocto);
      $(row).attr('data-serie', data.serie);
      $(row).attr('data-numero', data.numero);
      $(row).attr('data-carpeta', data.carpetafiles);

      if (data.sunat_codigo != 0 || data.estado == 'ANULADO') {
        $(row).find('.btnCDR, .btnXML, .btnPDF').prop('disabled', true);
      }

      if (data.estado == 'ANULADO') {
        $(row).css('background-color', '#bd0003').css('color', 'white');
      }
    });
  });
  
})

tblRegistroVentas = $('#tblRegistroVentas')
var fila //capturar la fila para editar o borrar el registro
var gSerie

$('#btnRegistroVentas').click(function(){
    $valores = $('#cbociaRegistroVentas').val() //codcia
    $fechai = FechaMilitarSQL($('#dpDesde').val())
    $fechaf = FechaMilitarSQL($('#dpHasta').val())
    if ($fechai == 'NaN') {
      swal.fire({
        type: 'error',
        title: 'Debe ingresar la fecha inicial.',
      })
      return
    }
    if ($fechaf == 'NaN') {
      swal.fire({
        type: 'error',
        title: 'Debe ingresar la fecha final.',
      })
      return
    }
    //valida que no envie la opcion todos
    $cantidad = $valores.length
    if ($cantidad == 0) {
      swal.fire({
        type: 'error',
        title: 'Debe elegir alguna Empresa.',
      })
    } else {
      if ($cantidad > 1 && $valores[0] == -1) {
        swal.fire({
          type: 'error',
          title: 'No debe marcar la opcion (TODOS) cuando eliga alguna empresa.',
        })
      } else {
        tblRegistroVentas.destroy()
        RegistroVentas()
      }
    }
  })

function RegistroVentas() {
    if ($('#hLOAD').val() == 0) {
      if ($('#dpDesde').val() == '') {
        fechai = ''
        fechaf = ''
      } else {
        fechai = FechaMilitarSQL($('#dpDesde').val())
        fechaf = FechaMilitarSQL($('#dpHasta').val())
      }
    } else {
      fechai = FechaMilitarActual()
      fechaf = FechaMilitarActual()
    }
    $valores = $('#cbociaRegistroVentas').val() //codcia
    $codcias = ''
    $valores.forEach(function (vdatos, index) {
      $codcias = $codcias + vdatos + ','
    })
    $codcias = $codcias.substring(0, $codcias.length - 1)
    $ruc = $('#hRUC').val();
    
  
    tblRegistroVentas = $('#tblRegistroVentas').DataTable({
      footerCallback: function (row, data, start, end, display) {
        var api = this.api();
        // api.column(13).visible(true);
        // Remove the formatting to get integer data for summation
        var intVal = function (i) {
          return typeof i === 'string'
            ? i.replace(/[\$,]/g, '') * 1
            : typeof i === 'number'
            ? i
            : 0
        }
  
        // Total over all pages
        total = api
          .column(10,{page: 'all', search: 'applied'})
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b)
          }, 0)
  
        // Total over this page
        pageTotal = api
          .column(10, { page: 'current', search: 'applied' })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b)
          }, 0)
  
        // Update footer
        api.column(10, {page: 'current'}).footer().innerHTML =
        'S/.' + pageTotal + ' ( S/.' + parseFloat(total).toFixed(2)  + ' total)';

            // api.column(13).visible(false);
      },
      language: {
        lengthMenu: 'Mostrar _MENU_ registros',
        zeroRecords: 'No se encontraron resultados',
        info:
          'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        sSearch: 'Buscar:',
        oPaginate: {
          sFirst: 'Primero',
          sLast: 'Último',
          sNext: 'Siguiente',
          sPrevious: 'Anterior',
        },
        // processing:
        //   '<div class="fa fa-spinner fa-spin" style="font-size:24px;color:rgb(75, 183, 245);"></div>',
      },
      processing: true,
      //para usar los botones
      responsive: true,
      dom,
      buttons,
      ajax: {
        url: '../bd/rpt_registroventas.php',
        method: 'POST', //usamos el metodo POST
        dataType: 'json',
        data: {
          fini: fechai,
          ffin: fechaf,
          ccia: $codcias,
          ruc: $ruc,
        }, //enviamos opcion 4 para que haga un SELECT
        dataSrc: function (json) {
          if (json['codigo'] != 0) {
            swal.fire({
              type: 'error',
              title: json['mensaje'],
            })
          }
          return json['datos']
        },
        // beforeSend: function () {
        //   $('#loading_screen').show()
        // },
        error: function (xhr, error, code) {
          console.log(xhr, code)
        },
      },
      columns: [
        { data: 'orden' },
        { data: 'fecha' },
        { data: 'tipodocto' },
        { data: 'serie' },
        { data: 'numero' },
        { data: 'cliente_tipodocto' },
        { data: 'cliente_numero' },
        { data: 'cliente_nombre' },
        { data: 'subtotal' },
        { data: 'igv' },
        { data: 'total' },
        { data: 'estado' },
        { data: 'estado_sunat' },
        {
          data: null,
          className: 'dt-center',
          defaultContent:
          '<div class="text-center"><div class="btn-group">'+
          '<button class="btn btn-primary btnCDR">CDR</button>'+
          '<button class="btn btn-danger btnXML">XML</button>'+
          '<button class="btn btn-warning btnPDF">PDF</button>'+
          '</div></div>',
          orderable: false,
        },
        // { data: 'sunat_codigo', visible: false },
        // { data: 'carpetafiles', visible: false },
        
      ],
      createdRow: function (row, data, dataIndex) {
        if (data.sunat_codigo  != 0 || data.estado == 'ANULADO') { // Ajusta 'valor' al campo que deseas evaluar
        //   $(row).find('.btnCDR').prop('disabled', false); // Habilita el botón
        // } else {
          $(row).find('.btnCDR').prop('disabled', true); // Deshabilita el botón
          $(row).find('.btnXML').prop('disabled', true); // Deshabilita el botón
          $(row).find('.btnPDF').prop('disabled', true); // Deshabilita el botón
        }
        // Pintar la fila de rojo si data.estado es 'ANULADO'
    if (data.estado == 'ANULADO') {
      $(row).css('background-color', '#bd0003');
      $(row).css('color', 'white'); // Cambiar color del texto a blanco
  }
    },
    });

    $('#hLOAD').val(0) //coloca 0 para que indique que no es la primera vez que carga
  }


 $(document).on('click', '.btnCDR', function () {
    var rutafiles = $('#hRUTAFILES').val();
    var trActual = $(this).closest('tr');
    var trAnterior = trActual.prev('tr');
    var ruc = '';
    var tipodocto = '';
    var serie = '';
    var numero = 0;
    var carpeta = '';
    if (trAnterior.length > 0 && trAnterior.hasClass('dt-hasChild parent')){
      ruc = trAnterior.data('ruc');
      tipodocto = trAnterior.data('tipodocto');
      serie = trAnterior.data('serie');
      numero = trAnterior.data('numero');
      carpeta = trAnterior.data('carpeta');
    }
    else{
      ruc = trActual.data('ruc');
      tipodocto = trActual.data('tipodocto');
      serie = trActual.data('serie');
      numero = trActual.data('numero');
      carpeta = trActual.data('carpeta');
    }

    var fileName = `R-${ruc}-${tipodocto}-${serie}-${numero}.xml`;
    var baseURL = `${rutafiles}${carpeta}/files/facturacion_electronica/CDR/${fileName}`;

  fetch(baseURL)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.blob();
  })
  .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });

 })
// inicio btnXMl
 $(document).on('click','.btnXML', function () {

  var rutafiles = $('#hRUTAFILES').val();
  var trActual = $(this).closest('tr');
  var trAnterior = trActual.prev('tr');
  var ruc = '';
  var tipodocto = '';
  var serie = '';
  var numero = 0;
  var carpeta = '';
  if (trAnterior.length > 0 && trAnterior.hasClass('dt-hasChild parent')){
    ruc = trAnterior.data('ruc');
    tipodocto = trAnterior.data('tipodocto');
    serie = trAnterior.data('serie');
    numero = trAnterior.data('numero');
    carpeta = trAnterior.data('carpeta');
  }
  else{
    ruc = trActual.data('ruc');
    tipodocto = trActual.data('tipodocto');
    serie = trActual.data('serie');
    numero = trActual.data('numero');
    carpeta = trActual.data('carpeta');
  }

  var fileName = `${ruc}-${tipodocto}-${serie}-${numero}.xml`;
  var baseURL = `${rutafiles}${carpeta}/files/facturacion_electronica/FIRMA/${fileName}`;


  fetch(baseURL)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.blob();
  })
  .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
 })

 $(document).on('click','.btnPDF', function () {
  var rutafiles = $('#hRUTAFILES').val();
  var trActual = $(this).closest('tr');
  var trAnterior = trActual.prev('tr');
  var ruc = '';
  var tipodocto = '';
  var serie = '';
  var numero = 0;
  var carpeta = '';
  if (trAnterior.length > 0 && trAnterior.hasClass('dt-hasChild parent')){
    ruc = trAnterior.data('ruc');
    tipodocto = trAnterior.data('tipodocto');
    serie = trAnterior.data('serie');
    numero = trAnterior.data('numero');
    carpeta = trAnterior.data('carpeta');
  }
  else{
    ruc = trActual.data('ruc');
    tipodocto = trActual.data('tipodocto');
    serie = trActual.data('serie');
    numero = trActual.data('numero');
    carpeta = trActual.data('carpeta');
  }

  var fileName = `${ruc}-${tipodocto}-${serie}-${numero}.pdf`;
  var baseURL = `${rutafiles}${carpeta}/files/facturacion_electronica/PDF/${fileName}`;

  fetch(baseURL)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.blob();
  })
  .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
 })