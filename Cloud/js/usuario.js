tblUsuarios = $('#tblUsuarios')
var fila //capturar la fila para editar o borrar el registro

$('#btnNuevo').click(function () {
  $('#formUsuario').trigger('reset')
  $('#hIDusuario').val(0)
  $('#modalHeader').css('background-color', '#1cc88a')
  $('#modalHeader').css('color', 'white')
  $('#modalTitle').text('Nuevo Usuario')
  $('#modalCRUD').modal('show')
})

function cargarUsuarios() {
  tblUsuarios = $('#tblUsuarios').DataTable({
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
    ajax: {
      url: '../bd/usuario_list.php',
      method: 'POST', //usamos el metodo POST
      dataType: 'json',
      data: {},
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
      { data: 'id' },
      { data: 'ruc' },
      { data: 'usuario' },
      { data: 'activo' },
      {
        data: null,
        className: 'dt-center',
        defaultContent:
          '<div class="text-center"><div class="btn-group"><button class="btn btn-primary btnEditar">Editar</button><button class="btn btn-danger btnBorrar">Borrar</button></div></div>',
        orderable: false,
      },
    ],
  })
}

//botón EDITAR
$(document).on('click', '.btnEditar', function () {
  $('#formUsuario').trigger('reset')
  fila = $(this).closest('tr')
  id = parseInt(fila.find('td:eq(0)').text())
  ruc = fila.find('td:eq(1)').text()
  usuario = fila.find('td:eq(2)').text()
  activo = fila.find('td:eq(3)').text()

  $('#hIDusuario').val(id)
  $('#txtRuc').val(ruc)
  $('#txtUsuario').val(usuario)

  if (activo == 'SI') {
    $('#cboActivo').val(1)
  } else {
    $('#cboActivo').val(0)
  }

  $('#modalHeader').css('background-color', '#4e73df')
  $('#modalHeader').css('color', 'white')
  $('#modalTitle').text('Editar Usuario')
  $('#modalCRUD').modal('show')
})

//GRABA USUARIO
$('#btnGuardar').click(function () {
  //    alert('graba');
  id = $.trim($('#hIDusuario').val())
  ruc = $.trim($('#txtRuc').val())
  usuario = $.trim($('#txtUsuario').val())
  clave1 = $.trim($('#txtClave').val())
  clave2 = $.trim($('#txtConfirmarClave').val())
  estado = $('#cboActivo').val()

  if (ruc === '') {
    swal.fire({
      type: 'error',
      title: 'Debe ingresar el Ruc del Cliente.',
    })
    return
  }
  if (usuario === '') {
    swal.fire({
      type: 'error',
      title: 'Debe ingresar el Usuario para el Cliente.',
    })
    return
  }
  if (clave1 === '' && id === 0) {
    swal.fire({
      type: 'error',
      title: 'Debe ingresar la clave para el usuario',
    })
    return
  }
  if (clave1 != '' || clave2 != '') {
    if (clave1 != clave2) {
      swal.fire({
        type: 'error',
        title: 'Las claves no coinciden',
      })
      return
    }
  }
  //   alert('graba');
  $.ajax({
    url: '../bd/usuario_proccess.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id: id,
      ruc: ruc,
      usuario: usuario,
      clave: clave1,
      estado: estado,
    },
    success: function (data) {
      //   console.log(data)
      //   console.log(data.codigo)
      //   console.log(data.idsalida)
      //   console.log(estado);
      var strEstado = estado == 1 ? 'Si' : 'No'
      if (data.codigo == 0) {
        if (id == 0) {
            tblUsuarios.row.add({
              id: data.idsalida,
              ruc: ruc,
              usuario: usuario,
              activo: strEstado
            }).draw();
          } else {
            tblUsuarios.row(fila).data({
              id: data.idsalida,
              ruc: ruc,
              usuario: usuario,
              activo: strEstado
            }).draw();
          }
        $('#modalCRUD').modal('hide')
      } else {
        swal.fire({
          type: 'error',
          title: data.mensaje,
        })
      }
    },
  })
})
