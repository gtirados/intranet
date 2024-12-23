$('#formLogin').submit(function (e) {
  e.preventDefault()
  var usuario = $.trim($('#usuario').val())
  var password = $.trim($('#password').val())
  var ruc = $.trim($('#ruc').val())

  if (usuario == 'caleta' && password == '123123') {
    var datos = new FormData()
    datos.append('ruc', ruc)
    datos.append('usuario', usuario)
    datos.append('password', password)
    $.ajax({
      url: 'bd/login.php',
      method: 'POST',
      data: datos,
      cache: false,
      contentType: false,
      processData: false,
      datatype: 'json',
      success: function (respuesta) {
        const myrequest = JSON.parse(respuesta)
        // console.log('data',myrequest['datos']['usuario']);
        // console.log('data',respuesta);
        if (myrequest['codigo'] == '0') {
          Swal.fire({
            type: 'success',
            title: '¡Conexión exitosa!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ingresar',
          }).then((result) => {
            if (result.value) {
              //window.location.href = "vistas/pag_inicio.php";
              window.location.href = 'pages/usuario.php'
            }
          })
        } else {
          //   console.log('data', myrequest['mensaje'])
          Swal.fire({
            type: 'error',
            title: myrequest['mensaje'],
          })
        }
      },
    })
  } else {
    if (usuario.length == '' || password == '' || ruc == '') {
      Swal.fire({
        type: 'warning',
        title: 'Debe ingresar un ruc y/o usuario y/o password',
      })
      return false
    } else {
      var datos = new FormData()
      datos.append('ruc', ruc)
      datos.append('usuario', usuario)
      datos.append('password', password)
      $.ajax({
        url: 'bd/login.php',
        method: 'POST',
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        datatype: 'json',
        success: function (respuesta) {
          const myrequest = JSON.parse(respuesta)
          // console.log('data',myrequest['datos']['usuario']);
          // console.log('data',respuesta);
          if (myrequest['codigo'] == '0') {
            Swal.fire({
              type: 'success',
              title: '¡Conexión exitosa!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ingresar',
            }).then((result) => {
              if (result.value) {
                //window.location.href = "vistas/pag_inicio.php";
                window.location.href = 'pages/rpt_regventas.php'
              }
            })
          } else {
            //   console.log('data', myrequest['mensaje'])
            Swal.fire({
              type: 'error',
              title: myrequest['mensaje'],
            })
          }
        },
      })
    }
  }
})
