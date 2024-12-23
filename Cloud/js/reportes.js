tblResumenVentasArticulos = $('#tblResumenVentasArticulos')
tblListadoArticulosVendidosClientes = $('#tblListadoArticulosVendidosClientes')
tblDetalleVentasMozos = $('#tblDetalleVentasMozos')
tblResumenCaja = $('#tblResumenCaja')

$('#btnResumenVentasArticulos').click(function () {
  $valores = $('#cbociaResumenVentasArticulos').val() //codcia
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
      tblResumenVentasArticulos.destroy()
      ResumenVentasArticulo()
    }
  }
})

$('#btnListadoArticulosVendidos').click(function () {
  $valores = $('#cbociaListadoArticulos').val() //codcia
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
      tblListadoArticulosVendidosClientes.destroy()
      ListadoArticulosVendidos()
    }
  }
})

$('#btnDetalleVentasMozos').click(function () {
    $valores = $('#cbociaDetVentasMozos').val() //codcia
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
      tblDetalleVentasMozos.destroy()
      DetalleVentasMozos()
    }
  }
})

$('#btnResumenCaja').click(function () {
  $valores = $('#cbociaResumenCaja').val() //codcia
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
      tblResumenCaja.destroy()
      ResumenCaja()
    }
  }
})

//TODO REPORTE - DETALLE DE VENTAS POR MOZO
function DetalleVentasMozos() {
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
  $valores = $('#cbociaDetVentasMozos').val() //codcia
  $codcias = ''
  $valores.forEach(function (vdatos, index) {
    $codcias = $codcias + vdatos + ','
  })
  $codcias = $codcias.substring(0, $codcias.length - 1)
  let groupColumn1 = 1
  tblDetalleVentasMozos = $('#tblDetalleVentasMozos').DataTable({
    columnDefs: [{ visible: false, targets: [1, 2] }],
    order: [
      [1, 'asc'],
      [2, 'asc'],
    ],
    rowGroup: {
      startRender: function (rows, group) {
        return $('<tr/>').append(
          '<td colspan="6" style="background-color: steelblue; color: white;">RESUMEN >> ' +
            group +
            '</td>',
        )
        // .append( '<td style="background-color: steelblue; color: white;">'+rows.data()+'</td>' );
      },
      endRender: function (rows, group) {
        var salaryAvg = rows
          .data()
          .pluck('total')
          .reduce(function (a, b) {
            return a + b * 1
          }, 0)
        salaryAvg = $.fn.dataTable.render
          .number(',', '.', 0, 'S/.')
          .display(salaryAvg)
        // var ageAvg = rows
        //     .data()
        //     .pluck(3)
        //     .reduce( function (a, b) {
        //         return a + b*1;
        //     }, 0) / rows.count();

        return $('<tr/>')
          .append(
            '<td colspan="5" style="background-color: steelblue; color: white;">TOTAL SUMA >>> ' +
              group +
              '</td>',
          )
          .append(
            '<td style="background-color: steelblue; color: white;">' +
              salaryAvg +
              '</td>',
          )
      },
      dataSrc: ['rs', 'mozo'],
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
    displayLength: 25,
    processing: true,
    //para usar los botones
    responsive: true,
    dom,
    buttons,
    ajax: {
      url: '../bd/rpt_detallevtamozos.php',
      method: 'POST', //usamos el metodo POST
      dataType: 'json',
      data: {
        fini: fechai,
        ffin: fechaf,
        ccia: $codcias,
      },
      dataSrc: function (json) {
        //  console.log('datos',json['datos']);
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
      { data: 'fecha' },
      { data: 'rs' },
      { data: 'mozo' },
      { data: 'comanda' },
      { data: 'docto' },
      { data: 'mesa' },
      { data: 'est' },
      { data: 'total' },
    ],
  })
  $('#hLOAD').val(0) //coloca 0 para que indique que no es la primera vez que carga

  // Order by the grouping
  $('#tblDetalleVentasMozos tbody').on('click', 'tr.group', function () {
    var currentOrder = tblDetalleVentasMozos.order()[0]
    if (currentOrder[0] === groupColumn1 && currentOrder[1] === 'asc') {
      tblDetalleVentasMozos.order([groupColumn1, 'desc']).draw()
    } else {
      tblDetalleVentasMozos.order([groupColumn1, 'asc']).draw()
    }
  })
}
//TODO REPORTE - RESUMEN DE CAJA
function ResumenCaja() {
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
  $valores = $('#cbociaResumenCaja').val() //codcia
  $codcias = ''
  $valores.forEach(function (vdatos, index) {
    $codcias = $codcias + vdatos + ','
  })
  $codcias = $codcias.substring(0, $codcias.length - 1)
  $ruc = $('#hRUC').val();
  //  console.log('ruc=>',$ruc);
  //  console.log('codcias=>',$codcias);
  tblResumenCaja = $('#tblResumenCaja').DataTable({
    columnDefs: [{ visible: false, targets: [0, 1] }],
    order: [
      [0, 'asc'],
      [1, 'asc'],
    ],
    // rowsGroup:[0]
    rowGroup: {
      startRender: function (rows, group) {
        return $('<tr/>').append(
          '<td colspan="3" style="background-color: steelblue; color: white;">RESUMEN >> ' +
            group +
            '</td>',
        )
      },
      endRender: function (rows, group) {
        var salaryAvg = rows
          .data()
          .pluck('total')
          .reduce(function (a, b) {
            return a + b * 1
          }, 0)
        salaryAvg = $.fn.dataTable.render
          .number(',', '.', 0, 'S/.')
          .display(salaryAvg)
        return $('<tr/>')
          .append(
            '<td colspan="2" style="background-color: steelblue; color: white;">TOTAL SUMA >>> ' +
              group +
              '</td>',
          )
          .append(
            '<td style="background-color: steelblue; color: white;">' +
              salaryAvg +
              '</td>',
          )
      },
      dataSrc: ['rs', 'fp'],
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
    displayLength: 25,
    processing: true,
    //para usar los botones
    responsive: true,
    dom,
    buttons,
    ajax: {
      url: '../bd/rpt_resumencaja.php',
      method: 'POST', //usamos el metodo POST
      dataType: 'json',
      data: {
        fini: fechai,
        ffin: fechaf,
        codcia: $codcias,
        ruc : $ruc
      }, //enviamos opcion 4 para que haga un SELECT
      dataSrc: function (json) {
        // console.log('caja',json['datos']);
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
      { data: 'rs' },
      { data: 'fp' },
      { data: 'fecha' },
      { data: 'docto' },
      { data: 'total' },
    ],
  })

  $('#hLOAD').val(0) //coloca 0 para que indique que no es la primera vez que carga
}
//TODO REPORTE - LISTADO DE ARTICULOS VENDIDOS A CLIENTES
function ListadoArticulosVendidos() {
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
  $valores = $('#cbociaListadoArticulos').val() //codcia
  $codcias = ''
  $valores.forEach(function (vdatos, index) {
    $codcias = $codcias + vdatos + ','
  })
  $codcias = $codcias.substring(0, $codcias.length - 1)
  $ruc = $('#hRUC').val();
  tblListadoArticulosVendidosClientes = $(
    '#tblListadoArticulosVendidosClientes',
  ).DataTable({
    footerCallback: function (row, data, start, end, display) {
      var api = this.api(),
        data

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
        .column(5)
        .data()
        .reduce(function (a, b) {
          return intVal(a) + intVal(b)
        }, 0)

      // Total over this page
      pageTotal = api
        .column(5, { page: 'current' })
        .data()
        .reduce(function (a, b) {
          return intVal(a) + intVal(b)
        }, 0)

      // Update footer
      $(api.column(5).footer()).html(
        'S/.' +
          pageTotal +
          ' ( S/.' +
          parseFloat(total).toFixed(2) +
          ' total )',
      )
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
    displayLength: 25,
    processing: true,
    //para usar los botones
    responsive: true,
    dom,
    buttons,
    ajax: {
      url: '../bd/rpt_listadoartvend.php',
      method: 'POST', //usamos el metodo POST
      dataType: 'json',
      data: {
        fini: fechai,
        ffin: fechaf,
        ccia: $codcias,
        ruc: $ruc
      },
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
      { data: 'fec' },
      { data: 'docto' },
      { data: 'prod' },
      { data: 'cant' },
      { data: 'pre' },
      { data: 'monto' },
      { data: 'hora' },
    ],
  })
  $('#hLOAD').val(0) //coloca 0 para que indique que no es la primera vez que carga
}
//TODO REPORTE - RESUMEN DE VENTAS DE ARTICULO
function ResumenVentasArticulo() {
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
  $valores = $('#cbociaResumenVentasArticulos').val() //codcia
  $codcias = ''
  $valores.forEach(function (vdatos, index) {
    $codcias = $codcias + vdatos + ','
  })
  $codcias = $codcias.substring(0, $codcias.length - 1)
  $ruc = $('#hRUC').val();
  // console.log('ruc=>',$ruc);
  // console.log('codcias=>',$codcias);
  tblResumenVentasArticulos = $('#tblResumenVentasArticulos').DataTable({
    footerCallback: function (row, data, start, end, display) {
      var api = this.api(),
        data

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
        .column(4)
        .data()
        .reduce(function (a, b) {
          return intVal(a) + intVal(b)
        }, 0)

      // Total over this page
      pageTotal = api
        .column(4, { page: 'current' })
        .data()
        .reduce(function (a, b) {
          return intVal(a) + intVal(b)
        }, 0)

      // Update footer
      $(api.column(4).footer()).html(
        'S/.' +
          pageTotal +
          ' ( S/.' +
          parseFloat(total).toFixed(2) +
          ' total )',
      )
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
    responsive: 'true',
    dom,
    buttons,
    ajax: {
      url: '../bd/rpt_resumenvtaart.php',
      method: 'POST', //usamos el metodo POST
      dataType: 'json',
      data: {
        fini: fechai,
        ffin: fechaf,
        ccia: $codcias,
        ruc: $ruc
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
      { data: 'ide' },
      { data: 'nom' },
      { data: 'um' },
      { data: 'cant' },
      { data: 'mont' },
    ],
  })
  $('#hLOAD').val(0) //coloca 0 para que indique que no es la primera vez que carga
}