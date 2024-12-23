$(document).ready(function () {
  $('#dpDesde').val(FechaActual())
  $('#dpHasta').val(FechaActual())

  jQuery('#dpDesde').datetimepicker({
    timepicker: false,
    format: 'd/m/Y',
  })

  jQuery('#dpHasta').datetimepicker({
    timepicker: false,
    format: 'd/m/Y',
  })

  jQuery.datetimepicker.setLocale('es')

  function FechaActual() {
    var hoy = new Date()
    var dd = hoy.getDate()
    var mm = hoy.getMonth() + 1
    var yyyy = hoy.getFullYear()

    dd = addZero(dd)
    mm = addZero(mm)

    var fechafinal = dd + '/' + mm + '/' + yyyy

    return fechafinal
  }

  function addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
})
