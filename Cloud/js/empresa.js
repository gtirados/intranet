// $(document).ready(function () {


  
// });

document.addEventListener('DOMContentLoaded',(event) => {
    // ruc = $('#ruc').val();
    // var miVariable = "<?php echo $_SESSION['s_ruc']; ?>";
    var hRUC = document.getElementById('hRUC');
    // console.log('calor ruc',hRUC.value);

    $.ajax({
        type:"POST",
        datatype:"json",
        data: {ruc:hRUC.value},
        url:"../bd/empresa.php",
        success: function (response) {
            
        var dato = JSON.parse(response)
        // console.log('dato',dato);
        // console.log('dato2',dato.datos);

        if (dato.codigo == 0){
            for(x of dato.datos){
                // console.log(x.codcia);
                $('#cbociaResumenCaja').append('<option value='+x.ide+'>'+x.rs+'</option>');
                $('#cbociaResumenVentasArticulos').append('<option value='+x.ide+'>'+x.rs+'</option>');
                $('#cbociaListadoArticulos').append('<option value='+x.ide+'>'+x.rs+'</option>');
                $('#cbociaDetVentasMozos').append('<option value='+x.ide+'>'+x.rs+'</option>');
                $('#cbociaRegistroVentas').append('<option value='+x.ide+'>'+x.rs+'</option>');
            }
        }else {
            Swal.fire({
                type: 'error',
                title: dato.mensaje,
              })
        }
          

            // $('#cbocia').val(localStorage.getItem("codcia"));   //ASIGNA EL VALOR DE CODCIA PREVIAMENTE ELEGIDO
            // if (sessionStorage.empresaElegida == null){
            //     sessionStorage.empresaElegida=0;
            // }
            // // console.log(sessionStorage.empresaElegida);
            // $('#cbocia').val(sessionStorage.empresaElegida);

        },
        error: function (params) {
            alert('error');
            
        }
    });
})