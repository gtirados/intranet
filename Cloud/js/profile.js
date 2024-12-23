$(document).ready(function () {
  $idusuario = $('#idusuario').val()
  $.ajax({
    type: 'POST',
    datatype: 'json',
    url: '../bd/usuario.php',
    data: {
      user: $idusuario,
    },
    success: function (response) {
      var dato = JSON.parse(response)
      if (dato.codigo == '0') {
        console.log('dato', dato)
        dataUser = dato.datos
        //    console.log('dato1',dataUser);
        for (x of dataUser) {
          //  console.log(x.user);
          $('#txtUserName').val(x.user);
          $('#txtRuc').val(x.ruc);
          // $('#cbocia').append(
          //   '<option value=' + x.codigo + '>' + x.nombre + '</option>',
          // )
        }
      } else {
        Swal.fire({
          type: 'error',
          title: dato.mensaje,
        })
      }
    },
    error: function (params) {
      alert('error')
    },
  })

  // alert($idusuario);

  $('#btnSaveProfile').click(function () {
    $idusuario = $('#idusuario').val()
    $pwd = $('#txtPassword').val()
    $pwdc = $('#txtPasswordConfirm').val()
    if ($pwd != '' || $pwdc != '') {
      if ($pwd != $pwdc) {
        Swal.fire({
          type: 'warning',
          title: 'Las contraseñas deben ser iguales',
        })
      } else {
        $.ajax({
          type: 'POST',
          datatype: 'json',
          url: '../bd/usuario_profile.php',
          data: {
            id: $idusuario,
            pwd: $pwd
          },
          success: function (response) {
            var dato = JSON.parse(response)
            console.log(dato.codigo);
            if (dato.codigo == '0'){
                Swal.fire({
                    type: 'success',
                    title: dato.mensaje,
                  })
            }
            else {
                Swal.fire({
                    type: 'error',
                    title: dato.mensaje,
                  })		

            }
            
          },
          error: function (params) {
            alert('error')
          },
        })
      }
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Debe ingresar la nueva contraseña',
      })
    }
  })

  //   $('#cbocia').on('change', function () {
  //     var valor = this.value
  //     var texto = $(this).find('option:selected').text()

  //     // localStorage.setItem("codcia",valor);
  //     sessionStorage.empresaElegida = valor
  //   })
})
